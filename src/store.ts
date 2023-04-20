import { ethers } from 'ethers';
import { computed, makeAutoObservable, reaction, runInAction } from 'mobx';

import { ROW_PER_PAGE, EmptyObject, EMPTYADDRESS, RANDOM_SEED,
    PRIVATE_CHAIN_ID, PRIVATE_RPC_URL, WETH_ADDR, BN_ZERO,
    MOCK_ETH_ADDR, BN_ETHER
} from 'src/constants';

import {
    ExternalProvider, UserTrove, SupportAssetsItem,
    UserCollateralItem, UserDepositRewardsItem,
    ProtocolCollateralItem, RPCProvider
} from 'src/types';

import { formatUnits, toBN } from 'src/util';

import { createBoard, getSaveWallet } from 'src/wallet';
import { SupportAssets } from 'src/AssetsHelp';
import ContractConfig from 'src/contract';

export default class Store {
    chainId = 0;

    isInit = false;

    walletAddr = '';

    onboard = null as any;

    web3Provider = null as any as ExternalProvider;

    rpcProvider: RPCProvider = new ethers.providers.JsonRpcProvider(PRIVATE_RPC_URL);

    currentRoutePath = '';

    contractMap: {
        [key: string]: ethers.Contract
    } = EmptyObject;

    collateralValueInfo: {
        [key: string]: number
    } = EmptyObject;

    /* stable coin info */
    stableCoinName = '';

    stableCoinDecimals = 0;

    /* user own eUSD info */
    userStableCoinBalance = 0;

    /* user trove info */
    userTrove: UserTrove = null as unknown as UserTrove;

    /* user deposit info */
    userDepositAmount = 0;

    /* contract info */
    supportAssets: Array<SupportAssetsItem> = [];

    gasCompensation = 0;

    minBorrowAmount = 0;

    borrowFeeRatio = 0;

    redeemFeeRatio = 0;

    systemTCR = 0;

    systemMCR = 0;

    systemCCR = 0;

    protocolAssetsInfo: Array<ProtocolCollateralItem> = [];

    /* user collateral info */
    userCollateralInfo: Array<UserCollateralItem> = [];

    /* user deposit rewards info */
    userDepositRewardsInfo: Array<UserDepositRewardsItem> = [];

    startDeposit = false;

    startWithdraw = false;

    startClaimRewards = false;

    startBorrowStableCoin = false;

    startRepayStablecoin = false;

    startAdjustTrove = false;

    /* trove list info */
    troveAmount = 0;

    troveList: Array<UserTrove> = [];

    /* stability pool info */
    spTVL = 0;

    /* system status control */
    isPreLoadTroves = false;

    isLoadingTroves = false;

    isLiquidateIng = false;

    isClaimRewardToTroveIng = false;

    isClaimRewardIng = false;

    isLoadingAssetSupport = false;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });

        reaction(() => {
            return [
                this.walletAddr,
                this.contractMap.ERC20,
                this.supportAssets.length
            ];
        }, this.queryUserAssets);

        reaction(() => this.contractMap.StableCoin, this.queryStableCoinInfo);

        reaction(() => {
            return [
                this.walletAddr,
                this.contractMap,
                this.chainId
            ];
        }, this.initUserInfo);

        reaction(() => {
            return [
                this.walletAddr,
                this.supportAssets.length,
                this.contractMap,
                this.chainId
            ];
        }, this.initUserInfoWhenAssetDone);

        reaction(() => this.supportAssets, (assetList) => {
            this.queryCollateralValue(assetList);
            this.queryProtocolAssetInfo(assetList);
        });

        reaction(() => this.contractMap, this.initSystemKeyInfo);
    }

    @computed get didUserDeposited() {
        return this.userDepositAmount > 0;
    }

    @computed get isNormalMode() {
        return this.systemTCR >= this.systemCCR;
    }

    @computed get displayWallet() {
        const { walletAddr } = this;
        if (!walletAddr) return 'Connect App';
        const len = walletAddr.length;

        return walletAddr.slice(0, 3) + '....' + walletAddr.slice(len - 4);
    }

    init() {
        if (this.isInit) return;
        const onboard = createBoard();
        runInAction(() => {
            this.isInit = true;
            this.onboard = onboard;
        });
        this.initContract();
    }

    async connectWallet() {
        if (!this.onboard || this.walletAddr) return;
        try {
            const wallet = getSaveWallet();
            if (wallet) {
                await this.onboard.connectWallet({ autoSelect: wallet });
            } else {
                await this.onboard.connectWallet();
            }
            await this.onboard.setChain({
                chainId: `0x${PRIVATE_CHAIN_ID.toString(16)}`,
            });
        } catch {
            // do nothing
        }
    }

    initContract() {
        const contractMap = Object.keys(ContractConfig).reduce((config, name) => {
            const { abi, addr } = ContractConfig[name];
            config[name] = new ethers.Contract(addr, abi, this.rpcProvider);

            return config;
        }, EmptyObject);

        runInAction(() => {
            this.contractMap = contractMap;
        });
    }

    initSystemKeyInfo(map: { [key: string]: ethers.Contract }) {
        if (Object.keys(map).length > 0) {
            this.getTroveNumbers();
            this.querySystemInfo();
            this.queryStabilityPoolTVL();
            this.querySupportCollateral();
        }
    }

    initUserInfo([wallet, map, chainId]: Array<any>) {
        if (
            !wallet ||
            Object.keys(map).length < 1 ||
            chainId !== PRIVATE_CHAIN_ID
        ) return;
        this.queryUserTokenInfo();
        this.queryUserDepositInfo();
    }

    initUserInfoWhenAssetDone([wallet, supportAssets, map, chainId]: Array<any>) {
        if (
            !wallet ||
            supportAssets.length < 1 ||
            Object.keys(map).length < 1 ||
            chainId !== PRIVATE_CHAIN_ID
        ) return;
        this.getUserTroveInfo(true);
        this.queryUserDepositGain();
    }

    async querySystemTCR(setStore = false) {
        const { TroveManager, PriceFeeds } = this.contractMap;
        if (!TroveManager || !PriceFeeds) return 0;
        const ethPrice = await PriceFeeds.fetchPrice_view();
        const TCR = await TroveManager.getTCR(ethPrice);

        if (setStore) {
            runInAction(() => {
                this.systemTCR = +(TCR / +BN_ETHER);
            });
        }

        return TCR;
    }

    async querySystemInfo() {
        const { CollateralManager } = this.contractMap;
        if (!CollateralManager) return;
        const [MCR, gasCompensation, minDebt, systemCCR, redeemFeeFloor, borrowFeeFloor] = await Promise.all([
            CollateralManager.getMCR(),
            CollateralManager.getEUSDGasCompensation(),
            CollateralManager.getMinNetDebt(),
            CollateralManager.getCCR(),
            CollateralManager.getRedemptionFeeFloor(),
            CollateralManager.getBorrowingFeeFloor()
        ]);

        this.querySystemTCR(true);

        runInAction(() => {
            this.minBorrowAmount = +minDebt;
            this.systemCCR = systemCCR / 1e18;
            this.systemMCR = +(MCR / +BN_ETHER);
            this.gasCompensation = +gasCompensation;
            this.borrowFeeRatio = borrowFeeFloor / 1e18;
            this.redeemFeeRatio = redeemFeeFloor / 1e18;
        });
    }

    async queryUserAssets() {
        const { supportAssets, walletAddr, contractMap, web3Provider } = this;
        if (supportAssets.length < 1 || !walletAddr) return;
        if (!contractMap.ERC20) return;
        runInAction(() => {
            this.isLoadingAssetSupport = true;
        });
        const balances = await Promise.all(
            supportAssets.map(asset => {
                if (asset.tokenAddr === MOCK_ETH_ADDR) {
                    return web3Provider.getBalance(walletAddr);
                }
                return contractMap.ERC20.attach(asset.tokenAddr).balanceOf(walletAddr)
            })
        );

        runInAction(() => {
            this.userCollateralInfo = supportAssets.map((info, idx) => {
                return {
                    ...info,
                    balance: +balances[idx]
                }
            });
            this.isLoadingAssetSupport = false;
        });
    }

    async queryStableCoinInfo() {
        const { StableCoin } = this.contractMap;
        if (!StableCoin) return;
        const [symbol, decimals] = await Promise.all([
            StableCoin.symbol(),
            StableCoin.decimals()
        ]);
        runInAction(() => {
            this.stableCoinName = symbol;
            this.stableCoinDecimals = decimals;
        });
    }

    async querySupportCollateral() {
        // const { CollateralManager } = this.contractMap;
        // if (!CollateralManager) return;
        // const supportList: Array<string> = await CollateralManager.getCollateralSupport();
        // const lowerCaseSupportList = supportList.map(key => key.toLowerCase());
        const lowerCaseSupportList = SupportAssets.map(a => a.tokenAddr);

        const wethIdx = lowerCaseSupportList.findIndex(s => s === WETH_ADDR);

        if (wethIdx !== -1) {
            lowerCaseSupportList.splice(wethIdx, 1, MOCK_ETH_ADDR);
        }

        const displayList = SupportAssets.filter(asset => {
            return lowerCaseSupportList.includes(asset.tokenAddr);
        });

        runInAction(() => {
            this.supportAssets = displayList;
        });
    }

    async queryCollateralValue(assetList: Array<SupportAssetsItem>) {
        const { CollateralManager, PriceFeeds } = this.contractMap;
        if (!CollateralManager || !PriceFeeds) return;

        if (assetList.length < 1) return;

        const tokenAddr = assetList.map(asset => asset.tokenAddr);

        const collateralInfo = await Promise.all(
            tokenAddr.map(t => CollateralManager.getCollateralParams(t === MOCK_ETH_ADDR ? WETH_ADDR : t))
        );

        const oracles = collateralInfo.map(c => c.oracle);

        const prices = await Promise.all(
            oracles.map(o => {
                if (o === EMPTYADDRESS) {
                    return 0;
                }
                return PriceFeeds.attach(o).fetchPrice_view()
            })
        );

        runInAction(() => {
            this.collateralValueInfo = tokenAddr.reduce((v, t, i) => {
                v[t] = +prices[i] / 1e18;

                return v;
            }, {} as { [key: string]: number });
        });
    }

    async queryUserTokenInfo() {
        const { walletAddr, contractMap } = this;
        const { StableCoin } = contractMap;
        if (!StableCoin || !walletAddr) return;
        const balance = await StableCoin.balanceOf(walletAddr);
        runInAction(() => {
            this.userStableCoinBalance = +balance;
        });
    }

    async queryProtocolAssetInfo(assetList: Array<SupportAssetsItem>) {
        const { TroveManager } = this.contractMap;
        if (!TroveManager || assetList.length < 1) return;
        const [
            tokenAddrList,
            amountInfo
        ]: [Array<string>, Array<ethers.BigNumber>] = await TroveManager.getEntireSystemColl();

        const tokenList = tokenAddrList
            .map(c => c.toLowerCase())
            .map((c, i) => ({ tokenAddr: c, amount: amountInfo[i] }));
        
        const protocolAssetsInfo: Array<ProtocolCollateralItem> = [];

        assetList.forEach(a => {
            const tokenAddr = a.tokenAddr === MOCK_ETH_ADDR ? WETH_ADDR : a.tokenAddr;
            const assetInfo = tokenList.find(a => a.tokenAddr === tokenAddr);
            if (assetInfo) {
                protocolAssetsInfo.push({
                    ...a,
                    balance: +formatUnits(+assetInfo.amount, a.tokenDecimals)
                });
            }
        });

        runInAction(() => {
            this.protocolAssetsInfo = protocolAssetsInfo;
        });
    }

    async queryStabilityPoolTVL() {
        const { StabilityPool } = this.contractMap;
        if (!StabilityPool) return;
        const data = await StabilityPool.getTotalEUSDDeposits();
        runInAction(() => {
            this.spTVL = +data;
        });
    }

    async queryUserDepositInfo() {
        const { walletAddr, contractMap } = this;
        const { StabilityPool } = contractMap;
        if (!walletAddr || !StabilityPool ) return;
        const data = await StabilityPool.deposits(walletAddr);
        runInAction(() => {
            this.userDepositAmount = +data.initialValue;
        });
    }

    async queryUserDepositGain() {
        const { walletAddr, contractMap, supportAssets } = this;
        const { StabilityPool } = contractMap;
        if (!walletAddr || !StabilityPool || supportAssets.length < 1) return;
        const [
            collateral,
            gains
        ]: [Array<string>, Array<ethers.BigNumber>] = await StabilityPool.getDepositorCollateralGain(walletAddr);

        const formatCollateral = collateral
            .map(c => c.toLowerCase())
            .map((c, idx) => {
                const token = c === WETH_ADDR ? MOCK_ETH_ADDR : c;
                const asset = supportAssets.find(asset => asset.tokenAddr === token);
                return {
                    ...asset!,
                    rewards: +gains[idx]
                };
            });

        runInAction(() => {
            this.userDepositRewardsInfo = formatCollateral;
        });
    }

    fetchWrappedETH2USD(wrappedETH: Array<{ token: string; amount: number }>) {
        return wrappedETH.reduce((totalValue, asset) => {
            const v: number = this.collateralValueInfo[asset.token] || 0;
            return totalValue + asset.amount * v;
        }, 0);
    }

    onRouteChange(route: string) {
        runInAction(() => {
            this.currentRoutePath = route;
        });
    }

    onAccountChange(accounts: Array<{ address: string }>) {
        const account = (accounts[0] || { address: '' }).address;
        runInAction(() => {
            this.walletAddr = account.toLowerCase();
        });
    }

    onChainChange(chains: Array<{ id: string }>) {
        runInAction(() => {
            this.chainId = +(chains[0] || { id: '0' }).id;
        });
    }

    onProviderChange(provider: ExternalProvider) {
        runInAction(() => {
            // @ts-ignore
            this.web3Provider = new ethers.providers.Web3Provider(provider);
        });
    }

    toggleStartDeposit() {
        runInAction(() => {
            this.startDeposit = !this.startDeposit;
        });
    }

    toggleStartWithdraw() {
        runInAction(() => {
            this.startWithdraw = !this.startWithdraw;
        });
    }

    toggleStartClaimRewards() {
        runInAction(() => {
            this.startClaimRewards = !this.startClaimRewards;
        });
    }

    toggleStartBorrow() {
        runInAction(() => {
            this.startBorrowStableCoin = !this.startBorrowStableCoin;
        });
    }

    toggleStartRepay() {
        runInAction(() => {
            this.startRepayStablecoin = !this.startRepayStablecoin;
        });
    }

    toggleStartAdjustTrove() {
        runInAction(() => {
            this.startAdjustTrove = !this.startAdjustTrove;
        });
    }

    toggleIsLoadingTroves() {
        runInAction(() => {
            this.isPreLoadTroves = !this.isPreLoadTroves;
        });
    }

    async getBorrowerOpsListHint(
        collaterals: Array<{ token: string; amount: ethers.BigNumber }>,
        debt: ethers.BigNumber
    ): Promise<[string, string]> {
        const { HintHelpers, PriceFeeds, SortTroves } = this.contractMap;

        const ethPrice = await PriceFeeds.fetchPrice_view();
        const formatCollateral = collaterals.map(c => {
            return {
                ...c,
                token: c.token === MOCK_ETH_ADDR ? WETH_ADDR : c.token
            };
        });

        const newICR = await HintHelpers['computeCR(address[],uint256[],uint256,uint256)'](
            formatCollateral.map(c => c.token),
            formatCollateral.map(c => c.amount),
            debt,
            ethPrice
        );

        const {
            hintAddress: approxfullListHint
        } = await HintHelpers.getApproxHint(newICR, 5, RANDOM_SEED, ethPrice);

        const {
            0: upperHint,
            1: lowerHint
          } = await SortTroves.findInsertPosition(
            newICR,
            approxfullListHint,
            approxfullListHint
        )

        return [lowerHint, upperHint];
    }

    async getTroveNumbers() {
        const { contractMap } = this;
        const { SortTroves } = contractMap;
        if (!SortTroves) return;
        const troves = +(await SortTroves.getSize());
        runInAction(() => {
            this.troveAmount = troves;
        });
    }

    async getUserTroveInfo(setStore = false): Promise<UserTrove | undefined> {
        const { contractMap, walletAddr, supportAssets } = this;
        const { TroveManager, HintHelpers, PriceFeeds, CollateralManager, TroveDebt } = contractMap;
        if (!TroveManager || !HintHelpers || !PriceFeeds || !CollateralManager || !walletAddr || !TroveDebt || supportAssets.length < 1) return;

        try { 
            const [
                    [
                        debt,
                        collateralsAmount,
                        ,
                        ,
                        collaterals
                ],
                troveData,
                debtInfo,
                gasCompensation
            ] = await Promise.all([
                TroveManager.getEntireDebtAndColl(walletAddr),
                TroveManager.Troves(walletAddr),
                TroveDebt.scaledBalanceOf(walletAddr),
                CollateralManager.getEUSDGasCompensation()
            ]);

            const troveCollateralInfo: Array<{
                token: string
                amount: ethers.BigNumber
            }> = collateralsAmount
                .map((c: string, index: number) => {
                    return {
                        token: collaterals[index].toLowerCase(),
                        amount: c
                    };
                })
                .filter((c: { token: string; amount: ethers.BigNumber }) => c.amount.gt(BN_ZERO));
    
            const assetInfo: Array<SupportAssetsItem & { amount: ethers.BigNumber }> =
                troveCollateralInfo.map((c: any) => {
                    const tokenAddr = c.token === WETH_ADDR ? MOCK_ETH_ADDR : WETH_ADDR;
                    const asset = supportAssets.find(asset => asset.tokenAddr === tokenAddr);
                    return {
                        ...asset!,
                        amount: c.amount
                    };
            });

            const queryAssetList = assetInfo.map(asset => {
                if (asset.tokenAddr === MOCK_ETH_ADDR) {
                    return {
                        ...asset,
                        tokenAddr: WETH_ADDR
                    };
                }
                return asset;
            });

            const assetValue = await CollateralManager.getTotalValue(
                queryAssetList.map(asset => asset.tokenAddr),
                queryAssetList.map(asset => asset.amount)
            );

            // means user no trove in our system
            if (debt.eq(BN_ZERO)) {
                runInAction(() => {
                    this.userTrove = null as unknown as UserTrove;
                });
                return;
            }

            const interest = +debt - +gasCompensation - +debtInfo;

            const trove: UserTrove = {
                interest,
                debt: +debt,
                shares: [],
                stakes: [],
                owner: walletAddr,
                ICR: assetValue / +debt,
                collateral: assetInfo.map(x => {
                    return {
                        ...x,
                        amount: +x.amount
                    };
                }),
                status: troveData.status,
                arrayIndex: +troveData.arrayIndex,
            };
    
            if (setStore) {
                runInAction(() => {
                    this.userTrove = trove;
                });
            }
    
            return trove;
        } catch {}
    }

    async approve(
        tokenAddr: string,
        spender: string,
        value: ethers.BigNumber
    ) {
        try {
            if (tokenAddr === MOCK_ETH_ADDR) return true;
            const { ERC20 } = this.contractMap;
            const allowance = await ERC20
                .attach(tokenAddr)
                .allowance(
                    this.walletAddr,
                    spender
                );
            if (allowance.lt(value)) {
                const { hash } = await ERC20
                    .attach(tokenAddr)
                    .connect(this.web3Provider.getSigner())
                    .approve(
                        spender,
                        ethers.constants.MaxUint256
                    );
                const result = await this.web3Provider.waitForTransaction(hash);
                return result.status === 1;
            }
            return true;
        } catch {
            return false;
        }
    }

    async createdTrove(
        collateral: Array<{ token: string; amount: number }>,
        stableCoinAmount: number,
        maxFeePercentage = 1e18
    ) {
        try {
            const { supportAssets, contractMap, web3Provider } = this;
            const { BorrowerOperation } = contractMap;

            const debtAmount = toBN(stableCoinAmount);
            const maxFeePerAmount = toBN(maxFeePercentage);

            const formatCollateral = collateral
                .filter(c => c.amount > 0)
                .map(c => {
                    const asset = supportAssets.find(asset => asset.tokenAddr === c.token);
                    return {
                        token: c.token,
                        amount: toBN(c.amount * Math.pow(10, asset!.tokenDecimals))
                    };
            });

            const tokenAddr = formatCollateral.map(c => c.token);
            const approveList = await Promise.all(
                tokenAddr.map((token, idx) => this.approve(token, BorrowerOperation.address, formatCollateral[idx].amount))
            );

            if (!approveList.every(x => x)) {
                return;
            }

            const [lowerHint, upperHint] = await this.getBorrowerOpsListHint(
                formatCollateral,
                debtAmount
            );
            
            const override = { value: BN_ZERO };

            const ethCollateralIdx = formatCollateral.findIndex(c => c.token === MOCK_ETH_ADDR);
            
            if (ethCollateralIdx !== -1) {
                override.value = formatCollateral[ethCollateralIdx].amount;
            }

            const pass2ContractCollateral = formatCollateral.filter((_, idx) => idx !== ethCollateralIdx);

            const { hash } = await BorrowerOperation
                    .connect(web3Provider.getSigner())
                    ['openTrove(address[],uint256[],uint256,uint256,address,address)'](
                        pass2ContractCollateral.map(c => c.token),
                        pass2ContractCollateral.map(c => c.amount),
                        maxFeePerAmount,
                        debtAmount,
                        lowerHint,
                        upperHint,
                        override
                );
            const result = await web3Provider.waitForTransaction(hash);

            if (result.status === 1) {
                this.getUserTroveInfo(true);
            }
            return result.status === 1;
        } catch {
            return false;
        }
    }

    async adjustTrove(
        newCollateral: Array<{ token: string; amount: number }>,
        newStableCoinAmount: number,
        maxFeePercentage = 1e18
    ) {
        try {
            const { contractMap, walletAddr, supportAssets, web3Provider } = this;
            const { TroveManager, BorrowerOperation } = contractMap;
            if (!TroveManager || !BorrowerOperation) return false;
    
            const [
                debt,
                collateralsAmount,
                ,
                ,
                collaterals
            ] = await TroveManager.getEntireDebtAndColl(walletAddr);

            const maxFeePerAmount = toBN(maxFeePercentage);
            const newDebtAmount = toBN(newStableCoinAmount);
    
            const oldTroveCollateralInfo: Array<{
                token: string
                amount: ethers.BigNumber
            }> = collateralsAmount
                .filter((c: ethers.BigNumber) => c.gt(BN_ZERO))
                .map((c: string, index: number) => {
                    const tokenLowerCase = collaterals[index].toLowerCase();
                    const tokenAddr = tokenLowerCase === WETH_ADDR ? MOCK_ETH_ADDR : tokenLowerCase;
                    return {
                        token: tokenAddr,
                        amount: c
                    };
                });

            const newTroveCollateralInfo: Array<{
                token: string
                amount: ethers.BigNumber
            }> = newCollateral
                .filter(c => c.amount > 0)
                .map(c => {
                    const asset = supportAssets.find(asset => asset.tokenAddr === c.token);
                    return {
                        token: c.token,
                        amount: toBN(c.amount * Math.pow(10, asset!.tokenDecimals))
                    };
            });

            const isDebtIncrease = newDebtAmount.gt(debt);
    
            const stableCoinChange = newDebtAmount.gt(debt) ? newDebtAmount.sub(debt) : BN_ZERO;
    
            const collIn: Array<{ token: string; amount: ethers.BigNumber }> = [];
            const collOut: Array<{ token: string; amount: ethers.BigNumber }> = [];
    
            newTroveCollateralInfo.forEach(c => {
                const { token, amount } = c;
                const collateralInOld = oldTroveCollateralInfo.find(i => i.token === token);
                if (!collateralInOld) {
                    collIn.push(c);
                } else if (amount.gt(collateralInOld.amount)) {
                    collIn.push({ ...c, amount: amount.sub(collateralInOld.amount) });
                } else if (amount.lt(collateralInOld.amount)) {
                    collOut.push({ ...c, amount: collateralInOld.amount.sub(amount) });
                }
            });

            const [lowerHint, upperHint] = await this.getBorrowerOpsListHint(
                newTroveCollateralInfo.map(c => ({ ...c, amount: c.amount })),
                newDebtAmount
            );

            const approveList = await Promise.all(
                collIn.map(c => this.approve(c.token, BorrowerOperation.address, c.amount))
            );
            
            if (!approveList.every(x => x)) return false;

            const override = { value: BN_ZERO };

            const ethCollateralIdx = collIn.findIndex(c => c.token === MOCK_ETH_ADDR);

            if (ethCollateralIdx !== -1) {
                override.value = collIn[ethCollateralIdx].amount;
            }
            const pass2ContractCollateral = collIn.filter((_, idx) => idx !== ethCollateralIdx);

            const passOutContractCollateral = collOut.map(c => {
                if (c.token === MOCK_ETH_ADDR) {
                    return {
                        ...c,
                        token: WETH_ADDR
                    };
                }
                return c;
            });

            const { hash } = await BorrowerOperation
                    .connect(web3Provider.getSigner())
                    .adjustTrove(
                        pass2ContractCollateral.map(c => c.token),
                        pass2ContractCollateral.map(c => c.amount),
                        passOutContractCollateral.map(c => c.token),
                        passOutContractCollateral.map(c => c.amount),
                        maxFeePerAmount,
                        stableCoinChange,
                        isDebtIncrease,
                        upperHint,
                        lowerHint,
                        override
                    );
            const result = await web3Provider.waitForTransaction(hash);
            if (result.status === 1) {
                this.getUserTroveInfo(true);
            }
            return result.status === 1;
        } catch {
            return false;
        }
    }

    async closeTrove() {
        const { BorrowerOperation } = this.contractMap;
        if (!BorrowerOperation) return false;
        try {
            const { web3Provider } = this;
            const { hash } = await BorrowerOperation
                    .connect(web3Provider.getSigner())
                    .closeTrove();
            const result = await web3Provider.waitForTransaction(hash);

            if (result.status === 1) {
                this.getUserTroveInfo(true);
            }
            return result.status === 1; 
        } catch {
            return false;
        }
    }

    async redeem(amount: number) {
        const { web3Provider, contractMap } = this;
        const { TroveManager, HintHelpers, PriceFeeds, SortTroves } = contractMap;
        if (!TroveManager || !HintHelpers || !PriceFeeds) return false;
        try {
            const ethPrice = await PriceFeeds.fetchPrice_view();
            const redeemAmountBN = toBN(amount);

            const {
                firstRedemptionHint,
                partialRedemptionHintICR
            } = await HintHelpers.getRedemptionHints(redeemAmountBN, ethPrice, 0);

            const {
                hintAddress: approxfullListHint
            } = await HintHelpers.getApproxHint(partialRedemptionHintICR, 5, RANDOM_SEED, ethPrice);

            const {
                0: upperHint,
                1: lowerHint
              } = await SortTroves.findInsertPosition(
                partialRedemptionHintICR,
                approxfullListHint,
                approxfullListHint
            );

            const { hash } = await TroveManager
                .connect(web3Provider.getSigner())
                .redeemCollateral(
                    redeemAmountBN,
                    firstRedemptionHint,
                    upperHint,
                    lowerHint,
                    partialRedemptionHintICR,
                    BN_ETHER,
                    BN_ETHER
                );
            const result = await web3Provider.waitForTransaction(hash);
            if (result.status === 1) {
                this.getUserTroveInfo(true);
            }
            return result.status === 1;
        } catch {
            return false;
        }
    }

    async liquidate(borrowerList: Array<string> | number) {
        const { web3Provider, contractMap, isLiquidateIng } = this;
        const { TroveManager } = contractMap;
        if (!TroveManager || isLiquidateIng) return;
        runInAction(() => {
            this.isLiquidateIng = true;
        });
        try {
            let hash = '';
            if (typeof borrowerList === 'number') {
                const trans = await TroveManager
                    .connect(web3Provider.getSigner())
                    .liquidateTroves(borrowerList);
                hash = trans.hash;
            } else {
                const res = await TroveManager
                    .connect(web3Provider.getSigner())
                    .batchLiquidateTroves(borrowerList);
                hash = res.hash;
            }

            const result = await web3Provider.waitForTransaction(hash);

            return result.status === 1;
        } catch {
            return false;
        } finally {
            runInAction(() => {
                this.isLiquidateIng = false;
            });
        }
    }

    async depositToStabilityPool(amount: number) {
        const { web3Provider, contractMap } = this;
        const { StabilityPool, StableCoin } = contractMap;
        if (!StabilityPool) return false;
        try {
            const amountBN = toBN(amount);

            const approved = await this.approve(
                StableCoin.address,
                StabilityPool.address,
                amountBN
            );

            if (!approved) return false;

            const { hash } = await StabilityPool
                .connect(web3Provider.getSigner())
                .provideToSP(
                    amountBN,
                    EMPTYADDRESS
                );
            const result = await web3Provider.waitForTransaction(hash);

            if (result.status === 1) {
                this.queryUserTokenInfo();
                this.queryStabilityPoolTVL();
            }
            return result.status === 1;
        } catch {
            return false;
        }
    }

    async withdrawFromStabilityPool(amount: number) {
        const { web3Provider, contractMap } = this;
        const { StabilityPool } = contractMap;
        if (!StabilityPool) return false;
        try {
            const amountBN = toBN(amount);

            const { hash } = await StabilityPool
                .connect(web3Provider.getSigner())
                .withdrawFromSP(amountBN);

            const result = await web3Provider.waitForTransaction(hash);
            if (result.status === 1) {
                this.queryStabilityPoolTVL();
                this.queryUserDepositInfo();
                this.queryUserTokenInfo();
            }
            return result.status === 1;
        } catch {
            return false;
        }
    }

    async claimDepositReward() {
        const { web3Provider, contractMap } = this;
        const { StabilityPool } = contractMap;
        if (!StabilityPool) return false;

        runInAction(() => {
            this.isClaimRewardIng = true;
        });

        try {
            const { hash } = await StabilityPool
                .connect(web3Provider.getSigner())
                .withdrawFromSP('0');
            const result = await web3Provider.waitForTransaction(hash);

            return result.status === 1;
        } catch {
            return false;
        } finally {
            runInAction(() => {
                this.isClaimRewardIng = false;
            });
        }
    }

    async claimRewardAndMoveToTrove() {
        const { contractMap, web3Provider } = this;
        const { StabilityPool } = contractMap;
        if (!StabilityPool) return false;
        runInAction(() => {
            this.isClaimRewardToTroveIng = true;
        });
        try {
            const { hash } = await StabilityPool
                .connect(web3Provider.getSigner())
                .withdrawCollateralGainToTrove(EMPTYADDRESS, EMPTYADDRESS);

            const result = await web3Provider.waitForTransaction(hash);

            return result.status === 1;
        } catch {
            return false;
        } finally {
            runInAction(() => {
                this.isClaimRewardToTroveIng = false;
            });
        }
    }

    async getTroves(params: { startingAt?: number }) {
        const { troveAmount, contractMap, isLoadingTroves } = this;
        const { MultiTroveGetter } = contractMap;
        if (!MultiTroveGetter || troveAmount < 1 || isLoadingTroves) return;
        runInAction(() => {
            this.isPreLoadTroves = false;
            this.isLoadingTroves = true;
        });
        try {
            const backendTroves = await MultiTroveGetter.getMultipleSortedTroves(
                params.startingAt ?? 0,
                ROW_PER_PAGE
            );
            const troves = this.mapBackendTroves(backendTroves);

            const existTroves = this.troveList.map(t => t.owner);

            const newTroves = troves.filter(t => {
                return !existTroves.includes(t.owner);
            });

            runInAction(() => {
                // @ts-ignore
                this.troveList = [
                    ...this.troveList,
                    ...newTroves
                ];
            });
        } finally {
            runInAction(() => {
                this.isLoadingTroves = false;
            });
        }
    }

    mapBackendTroves = (troves: Array<{
        owner: string
        debt: ethers.BigNumber
        colls: Array<ethers.BigNumber>
        collaterals: Array<string>
        shares: Array<ethers.BigNumber>
        stakes: Array<ethers.BigNumber>
        snapshotColls: Array<ethers.BigNumber>
        snapshotEUSDDebts: Array<ethers.BigNumber>
    }>) => {
        const { supportAssets, collateralValueInfo, stableCoinDecimals } = this;

        return troves.map((trove) => {
            const {
                owner,
                debt,
                collaterals,
                colls
            } = trove;

            // const formatCollateral = collaterals.map((c, idx) => {
            //     const token = c.toLowerCase() === WETH_ADDR ? MOCK_ETH_ADDR : c.toLowerCase();

            //     const asset = supportAssets.find(asset => asset.tokenAddr === token);
            //     return {
            //         ...asset,
            //         amount: colls[idx]
            //     };
            // });
            const formatCollateral = supportAssets.map(asset => {
                const token = asset.tokenAddr === MOCK_ETH_ADDR ? WETH_ADDR : asset.tokenAddr;
                const idx = collaterals.findIndex(c => c.toLowerCase() === token);
                if (idx > -1) {
                    return {
                        ...asset,
                        amount: colls[idx]
                    };
                }

                return {
                    ...asset,
                    amount: 0
                };
            });

            const assetValue = formatCollateral.reduce((v, i) => {
                const valueInfo = collateralValueInfo[i.tokenAddr!] || 0;
                const amount = +formatUnits(+i.amount, i.tokenDecimals);
                return v + amount * valueInfo;
            }, 0);

            return {
                owner: owner,
                status: "open",
                arrayIndex: 0,
                interest: 0,
                ICR: assetValue / +formatUnits(+debt, stableCoinDecimals),
                collateral: formatCollateral,
                debt: +debt,
                stakes: [],
                shares: []
            }
        });
    }
}