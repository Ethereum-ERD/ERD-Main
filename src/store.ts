import { ethers } from 'ethers';
import { ProviderLabel } from '@web3-onboard/injected-wallets';
import { computed, makeAutoObservable, reaction, runInAction } from 'mobx';
import axios from 'axios';

import {
    EmptyObject, EMPTY_ADDRESS, RANDOM_SEED,
    GOERLI_CHAIN_ID, GOERLI_RPC_URL, WETH_ADDR, BN_ZERO,
    MOCK_ETH_ADDR, BN_ETHER, MAX_FEE, MAX_ITERATIONS
} from 'src/constants';

import {
    ExternalProvider, UserTrove, SupportAssetsItem,
    UserCollateralItem, UserDepositRewardsItem,
    ProtocolCollateralItem, RPCProvider,
    RankItem
} from 'src/types';


import { formatUnits, toBN, fixNumber, getContractErrorMsg } from 'src/util';
import { createBoard, getSaveWallet, clearWallet } from 'src/wallet';
import { SupportAssets } from 'src/AssetsHelp';
import ContractConfig from 'src/contract';

export default class Store {
    chainId = 0;

    walletLabel = '';

    isInit = false;

    walletAddr = '';

    onboard = null as any;

    web3Provider = null as any as ExternalProvider;

    rpcProvider: RPCProvider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);

    currentRoutePath = '';

    contractMap: {
        [key: string]: ethers.Contract
    } = EmptyObject;

    collateralValueInfo: {
        [key: string]: number
    } = EmptyObject;

    latestRandomSeed = toBN(RANDOM_SEED);

    /* stable coin info */
    stableCoinName = 'USDE';

    stableCoinDecimals = 18;

    stableCoinTotalSupply = 0;

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

    mintingFeeRatio = 0;

    redeemFeeRatio = 0;

    interestRatio = 0;

    systemTCR = 0;

    systemMCR = 0;

    systemCCR = 0;

    protocolAssetsInfo: Array<ProtocolCollateralItem> = [];

    systemTotalValueInUSD = 0;

    systemTotalDebtInUSD = 0;

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

    troveAmount = -1;

    troveList: Array<UserTrove> = [];

    /* stability pool info */
    spTVL = 0;

    spOwnStableCoinAmount = 0;

    /* system status control */
    isLoadingSupportAsset = false;

    isLoadingTroveAmount = false;

    isLoadingTroves = false;

    isLiquidateIng = false;

    isClaimRewardToTroveIng = false;

    isClaimRewardIng = false;

    isLoadingAssetSupport = false;

    showSupportAsset = false;

    showMobileAvatarMenu = false;

    weekQuota = 0;

    userScores = 0;

    userRank = -1;

    userInvite = 0;

    isLoadingRankList = false;

    isNoRankData = false;

    rankList: Array<RankItem> = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });

        reaction(() => {
            return [
                this.walletAddr,
                this.contractMap.ERC20,
                this.supportAssets.length
            ];
        }, this.queryUserAssets);

        reaction(() => {
            return [
                this.walletAddr,
                this.contractMap,
                this.chainId
            ];
        }, this.initUserInfo);

        reaction(() => this.walletAddr, this.getUserRankInfo);

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

        reaction(() => this.chainId, this.getWeeklyQuota);
    }

    @computed get isMainNet() {
        return this.chainId === 1;
    }

    @computed get protocolValInETH() {
        const { systemTotalValueInUSD, collateralValueInfo } = this;
        const valueInETH = systemTotalValueInUSD / collateralValueInfo[MOCK_ETH_ADDR];
        if (Number.isNaN(valueInETH)) {
            return 0;
        }

        return valueInETH;
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

    @computed get isMetaMask() {
        return this.walletLabel === ProviderLabel.MetaMask;
    }

    @computed get userPoolShare() {
        const { userDepositAmount, spTVL } = this;
        const share = userDepositAmount / spTVL;
        return Number.isFinite(share) ? share * 100 : 0;
    }

    @computed get userCanClaimDepositRewards() {
        const { userDepositRewardsInfo } = this;

        return userDepositRewardsInfo.some(c => +c.rewards > 0);
    }

    init() {
        if (this.isInit) return;
        const onboard = createBoard();
        runInAction(() => {
            this.isInit = true;
            this.onboard = onboard;
        });
        this.initContract();
        this.querySystemTotalValueAndDebt();
    }

    async getWeeklyQuota() {
        if (!this.isMainNet) return;
        try {
            const res = await axios.get('/api/amount_limit');
            const data = res.data;
            runInAction(() => {
                this.weekQuota = data.amount;
            });
        } catch {}
    }

    async connectWallet() {
        if (!this.onboard) return;
        if (this.walletAddr) {
            return this.disConnectWallet();
        }
        try {
            const wallet = getSaveWallet();
            if (wallet) {
                await this.onboard.connectWallet({ autoSelect: { label: wallet, disableModals: true } });
            } else {
                await this.onboard.connectWallet();
            }
            await this.onboard.setChain({
                chainId: `0x${GOERLI_CHAIN_ID.toString(16)}`,
            });
        } catch {}
    }

    async disConnectWallet() {
        if (!this.onboard || !this.walletAddr) return;
        try {
            clearWallet();
            const [primaryWallet] = this.onboard.state.get().wallets;
            await this.onboard.disconnectWallet({ label: primaryWallet.label });
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
            this.querySystemTotalValueAndDebt();
        }
    }

    initUserInfo([wallet, map, chainId]: Array<any>) {
        if (
            !wallet ||
            Object.keys(map).length < 1 ||
            chainId !== GOERLI_CHAIN_ID
        ) return;
        this.queryUserTokenInfo();
        this.queryUserDepositInfo();
    }

    initUserInfoWhenAssetDone([wallet, supportAssets, map, chainId]: Array<any>) {
        if (
            !wallet ||
            supportAssets.length < 1 ||
            Object.keys(map).length < 1 ||
            chainId !== GOERLI_CHAIN_ID
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
        const { CollateralManager, StableCoin, StabilityPool, TroveManager, TroveInterestRateStrategy } = this.contractMap;
        if (!CollateralManager || !StableCoin || !StabilityPool || !TroveManager || !TroveInterestRateStrategy) return;
        const [
            MCR,
            gasCompensation,
            minDebt,
            systemCCR,
            redeemFee,
            borrowFee,
            stableCoinTotalSupply,
            spOwnStableCoinAmount,
            troveData
        ] = await Promise.all([
            CollateralManager.getMCR(),
            CollateralManager.getUSDEGasCompensation(),
            CollateralManager.getMinNetDebt(),
            CollateralManager.getCCR(),
            TroveManager.getRedemptionRate(),
            TroveManager.getBorrowingRate(),
            StableCoin.totalSupply(),
            StableCoin.balanceOf(StabilityPool.address),
            TroveManager.getTroveData()
        ]);

        this.querySystemTCR(true);

        runInAction(() => {
            this.minBorrowAmount = +minDebt;
            this.systemCCR = systemCCR / 1e18;
            this.systemMCR = +(MCR / +BN_ETHER);
            this.gasCompensation = +gasCompensation;
            this.mintingFeeRatio = borrowFee / 1e18;
            this.redeemFeeRatio = redeemFee / 1e18;
            this.stableCoinTotalSupply = +stableCoinTotalSupply;
            this.spOwnStableCoinAmount = +spOwnStableCoinAmount;
            this.interestRatio = troveData.currentBorrowRate / 1e27;
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

    async querySupportCollateral() {
        const { CollateralManager } = this.contractMap;
        if (!CollateralManager) return;
        runInAction(() => {
            this.isLoadingSupportAsset = true;
        });

        const supportList: Array<string> = await CollateralManager.getCollateralSupport();
        const lowerCaseSupportList = supportList.map(asset => asset.toLowerCase());
        const statusList = await Promise
            .all(
                lowerCaseSupportList.map(c => CollateralManager.collateralParams(c))
            );

        const collateralStatusList = statusList.map(c => c.status);

        const displayList: Array<SupportAssetsItem> = [];

        lowerCaseSupportList.forEach((addr, idx) => {
            const status = collateralStatusList[idx];
            const selectAddr = addr === WETH_ADDR ? MOCK_ETH_ADDR : addr;
            const item = SupportAssets.find(asset => asset.tokenAddr === selectAddr);
            if (item) {
                displayList.push({ ...item, status });
            }
        });

        runInAction(() => {
            this.supportAssets = displayList;
            this.isLoadingSupportAsset = false;
        });
    }

    async queryCollateralValue(assetList: Array<SupportAssetsItem>) {
        const { CollateralManager, PriceFeeds } = this.contractMap;
        if (!CollateralManager || !PriceFeeds) return;

        if (assetList.length < 1) return;

        const tokenAddr = assetList
            .map(asset => asset.tokenAddr)
            .filter(addr => addr !== MOCK_ETH_ADDR);

        const collateralInfo = await Promise.all(
            tokenAddr.map(t => CollateralManager.getCollateralParams(t === MOCK_ETH_ADDR ? WETH_ADDR : t))
        );

        const oracles = collateralInfo.map(c => c.oracle);

        const ethPrice = await PriceFeeds.fetchPrice_view();
        const ethPriceInNormal = +ethPrice / 1e18;

        const prices = await Promise.all(
            oracles.map(o => {
                if (o === EMPTY_ADDRESS) {
                    return 0;
                }
                return PriceFeeds.attach(o).fetchPrice_view()
            })
        );

        runInAction(() => {
            this.collateralValueInfo = tokenAddr.reduce((v, t, i) => {
                v[t] = +prices[i] / 1e18 * ethPriceInNormal;

                return v;
            }, { [MOCK_ETH_ADDR]: ethPriceInNormal } as { [key: string]: number });
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
        const { BorrowerOperation } = this.contractMap;
        if (!BorrowerOperation || assetList.length < 1) return;
        const [
            tokenAddrList,
            amountInfo
        ]: [Array<string>, Array<ethers.BigNumber>] = await BorrowerOperation['getEntireSystemColl()']();

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
        const data = await StabilityPool.getTotalUSDEDeposits();
        runInAction(() => {
            this.spTVL = +data;
        });
    }

    async queryUserDepositInfo() {
        const { walletAddr, contractMap } = this;
        const { StabilityPool } = contractMap;
        if (!walletAddr || !StabilityPool) return;
        const value = await StabilityPool.getCompoundedUSDEDeposit(walletAddr);
        runInAction(() => {
            this.userDepositAmount = +value;
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

        let formatCollateral: Array<UserDepositRewardsItem>;

        if (collateral.length > 0) {
            formatCollateral = collateral
                .map(c => c.toLowerCase())
                .map((c, idx) => {
                    const token = c === WETH_ADDR ? MOCK_ETH_ADDR : c;
                    const asset = supportAssets.find(asset => asset.tokenAddr === token);
                    return {
                        ...asset!,
                        rewards: +gains[idx]
                    };
                });
        } else {
            formatCollateral = supportAssets.map(asset => {
                return {
                    ...asset,
                    rewards: 0
                };
            });
        }

        runInAction(() => {
            this.userDepositRewardsInfo = formatCollateral;
        });
    }

    async querySystemTotalValueAndDebt() {
        const { PriceFeeds, BorrowerOperation } = this.contractMap;
        if (!PriceFeeds || !BorrowerOperation) return [0, 0];
        const ethPrice = await PriceFeeds.fetchPrice_view();
        const [[, , systemCollTotalValue], systemTotalDebt] = await Promise.all([
            BorrowerOperation['getEntireSystemColl(uint256)'](ethPrice),
            BorrowerOperation.getEntireSystemDebt()
        ]);
        runInAction(() => {
            this.systemTotalDebtInUSD = +systemTotalDebt / 1e18;
            this.systemTotalValueInUSD = +systemCollTotalValue / 1e18;
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

    onChainChange(chains: Array<{ id: string; label: string }>) {
        runInAction(() => {
            this.chainId = +(chains[0] || { id: '0' }).id;
            this.walletLabel = (chains[0] || { label: '' }).label;
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

    toggleShowSupportAsset() {
        runInAction(() => {
            this.showSupportAsset = !this.showSupportAsset;
        });
    }

    toggleShowMobileAvatarMenu() {
        runInAction(() => {
            this.showMobileAvatarMenu = !this.showMobileAvatarMenu;
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

        const { 0: upperHint, 1: lowerHint } = await SortTroves.findInsertPosition(
            newICR,
            approxfullListHint,
            approxfullListHint
        );

        return [lowerHint, upperHint];
    }

    async getTroveNumbers() {
        const { contractMap } = this;
        const { SortTroves } = contractMap;
        if (!SortTroves) return;
        runInAction(() => {
            this.isLoadingTroveAmount = true;
        });

        const troves = +(await SortTroves.getSize());
        runInAction(() => {
            this.troveAmount = troves;
            this.isLoadingTroveAmount = false;
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
                troveData
            ] = await Promise.all([
                TroveManager.getEntireDebtAndColl(walletAddr),
                TroveManager.Troves(walletAddr)
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
                troveCollateralInfo
                    .map((c: any) => {
                        const tokenAddr = c.token === WETH_ADDR ? MOCK_ETH_ADDR : c.token;
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

            const trove: UserTrove = {
                debt: +debt,
                owner: walletAddr,
                ICR: assetValue / +debt,
                collateral: assetInfo.map(x => {
                    return {
                        ...x,
                        amount: x.amount
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

    async getApproveAmount(
        tokenAddr: string,
        spender: string,
    ): Promise<ethers.BigNumber> {
        try {
            if (tokenAddr === MOCK_ETH_ADDR) return ethers.constants.MaxUint256;
            const { ERC20 } = this.contractMap;
            const allowance = await ERC20
                .attach(tokenAddr)
                .allowance(
                    this.walletAddr,
                    spender
                );
            return allowance;
        } catch {
            return BN_ZERO;
        }
    }

    async createdTrove(
        collateral: Array<{ token: string; amount: number }>,
        stableCoinAmount: number,
        refer: string,
        maxFeePercentage = 1e18
    ) {
        const checkResult = await this.networkCheck();
        if (!checkResult) {
            return { status: false, hash: '', msg: 'Bad network id' };
        }
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

            const approveAmountList: Array<ethers.BigNumber> = await Promise.all(
                tokenAddr.map(t => this.getApproveAmount(t, BorrowerOperation.address))
            );

            const needNewApproveList = approveAmountList.reduce((list, item, idx) => {
                const collateral = formatCollateral[idx];
                if (collateral.amount.gt(item)) {
                    list.push(collateral.token);
                }

                return list;
            }, [] as Array<string>);

            if (needNewApproveList.length > 0) {
                const approveList = await Promise.all(
                    needNewApproveList.map((t) => this.approve(t, BorrowerOperation.address, ethers.constants.MaxUint256))
                );

                if (!approveList.every(x => x)) {
                    return { status: false, hash: '', msg: '' };
                }
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

            const gasLimit = await BorrowerOperation
                .connect(web3Provider.getSigner())
                .estimateGas
                ['openTrove(address[],uint256[],uint256,uint256,address,address,address)'](
                    pass2ContractCollateral.map(c => c.token),
                    pass2ContractCollateral.map(c => c.amount),
                    maxFeePerAmount,
                    debtAmount,
                    upperHint,
                    lowerHint,
                    refer,
                    override
                );

            const moreGasLimit = +gasLimit * 1.5;

            const { hash } = await BorrowerOperation
                .connect(web3Provider.getSigner())
                ['openTrove(address[],uint256[],uint256,uint256,address,address,address)'](
                    pass2ContractCollateral.map(c => c.token),
                    pass2ContractCollateral.map(c => c.amount),
                    maxFeePerAmount,
                    debtAmount,
                    upperHint,
                    lowerHint,
                    refer,
                    { ...override, gasLimit: toBN(~~moreGasLimit) }
                );
            const result = await this.waitForTransactionConfirmed(hash);

            if (result.status === 1) {
                this.queryUserAssets();
                this.queryUserTokenInfo();
                this.getUserTroveInfo(true);
                this.logOperation(fixNumber(stableCoinAmount), 1);
            }
            return { status: result.status === 1, hash, msg: '' };
        } catch (e) {
            // @ts-ignore
            const msg = getContractErrorMsg(e?.reason || e?.message);
            return { status: false, hash: '', msg };
        }
    }

    async adjustTrove(
        newCollateral: Array<{ token: string; amount: number }>,
        newStableCoinAmount: number,
        maxFeePercentage = 1e18
    ) {
        const checkResult = await this.networkCheck();
        if (!checkResult) {
            return { status: false, hash: '', msg: 'Bad network id' };
        }
        try {
            const { contractMap, walletAddr, supportAssets, web3Provider } = this;
            const { TroveManager, BorrowerOperation } = contractMap;
            if (!TroveManager || !BorrowerOperation) return { status: false, hash: '', msg: '' };

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
                .map(c => {
                    const asset = supportAssets.find(asset => asset.tokenAddr === c.token);
                    return {
                        token: c.token,
                        amount: toBN(c.amount * Math.pow(10, asset!.tokenDecimals))
                    };
                });

            const isDebtIncrease = newDebtAmount.gt(debt);

            const stableCoinChange = isDebtIncrease ? newDebtAmount.sub(debt) : debt.sub(newDebtAmount);

            const collIn: Array<{ token: string; amount: ethers.BigNumber }> = [];
            const collOut: Array<{ token: string; amount: ethers.BigNumber }> = [];

            const compareTarget = [
                ...oldTroveCollateralInfo.map(c => ({ ...c, isOld: true, isNew: false })),
                ...newTroveCollateralInfo.map(c => ({ ...c, isNew: true, isOld: false }))
            ];

            compareTarget.forEach(c => {
                const { token, amount } = c;

                if (c.isOld) {
                    const collateralInNew = newTroveCollateralInfo.find(i => i.token === token);
                    if (!collateralInNew) {
                        collOut.push(c);
                    } else if (amount.gt(collateralInNew.amount)) {
                        collOut.push({ ...c, amount: amount.sub(collateralInNew.amount) });
                    } else if (amount.lt(collateralInNew.amount)) {
                        collIn.push({ ...c, amount: collateralInNew.amount.sub(amount) });
                    }
                } else {
                    const collateralInOld = oldTroveCollateralInfo.find(i => i.token === token);
                    if (!collateralInOld) {
                        collIn.push(c);
                    } else if (amount.gt(collateralInOld.amount)) {
                        collIn.push({ ...c, amount: amount.sub(collateralInOld.amount) });
                    } else if (amount.lt(collateralInOld.amount)) {
                        collOut.push({ ...c, amount: collateralInOld.amount.sub(amount) });
                    }
                }

            });

            const [lowerHint, upperHint] = await this.getBorrowerOpsListHint(
                newTroveCollateralInfo.map(c => ({ ...c, amount: c.amount })),
                newDebtAmount
            );

            const CollInObject = collIn.reduce((map, item) => {
                const { token, amount } = item;
                if (map[token]) {
                    map[token].add(amount);
                } else {
                    map[token] = amount;
                }

                return map;
            }, {} as { [key: string]: ethers.BigNumber });

            const CollOutObject = collOut.reduce((map, item) => {
                const { token, amount } = item;
                if (map[token]) {
                    map[token].add(amount);
                } else {
                    map[token] = amount;
                }

                return map;
            }, {} as { [key: string]: ethers.BigNumber });

            const formatCollIn = Object.keys(CollInObject)
                .map(key => {
                    return { token: key, amount: CollInObject[key] };
                })
                .filter(c => c.amount.gt(BN_ZERO));

            const formatCollOut = Object.keys(CollOutObject)
                .map(key => {
                    return { token: key, amount: CollOutObject[key] };
                })
                .filter(c => c.amount.gt(BN_ZERO));
            
            if (formatCollIn.length > 0) {
                const approveAmountList: Array<ethers.BigNumber> = await Promise.all(
                    formatCollIn.map(t => this.getApproveAmount(t.token, BorrowerOperation.address))
                );

                const needNewApproveList = approveAmountList.reduce((list, item, idx) => {
                    const collateral = formatCollIn[idx];
                    if (collateral.amount.gt(item)) {
                        list.push(collateral.token);
                    }
    
                    return list;
                }, [] as Array<string>);

                if (needNewApproveList.length > 0) {
                    const approveList = await Promise.all(
                        needNewApproveList.map(c => this.approve(c, BorrowerOperation.address, ethers.constants.MaxUint256))
                    );
        
                    if (!approveList.every(x => x)) return { status: false, hash: '' };
                }
            }

            const override = { value: BN_ZERO };

            const ethCollateralIdx = formatCollIn.findIndex(c => c.token === MOCK_ETH_ADDR);

            if (ethCollateralIdx !== -1) {
                override.value = formatCollIn[ethCollateralIdx].amount;
            }

            const pass2ContractCollateral = formatCollIn.filter((_, idx) => idx !== ethCollateralIdx);

            const passOutContractCollateral = formatCollOut
                .map((c) => {
                    if (c.token === MOCK_ETH_ADDR) {
                        return {
                            ...c,
                            token: WETH_ADDR
                        };
                    }
                    const collAtOutListIdx = oldTroveCollateralInfo.findIndex(i => i.token.toLowerCase() === c.token);
                    const collAtNew = newCollateral.find(i => i.token.toLowerCase() === c.token);

                    if (collAtOutListIdx > -1 && collAtNew?.amount === 0) {
                        const idx = oldTroveCollateralInfo.findIndex(i => i.token.toLowerCase() === c.token);
                        return {
                            ...c,
                            amount: oldTroveCollateralInfo[idx].amount
                        };
                    }
                    return c;
                })
                .filter(c => c.amount.gt(BN_ZERO));

            const gasLimit = await BorrowerOperation
                .connect(web3Provider.getSigner())
                .estimateGas
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
                    { ...override, }
                );
            
            const moreGasLimit = +gasLimit * 1.5;

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
                    { ...override, gasLimit: toBN(~~moreGasLimit) }
                );
            const result = await this.waitForTransactionConfirmed(hash);
            if (result.status === 1) {
                this.queryUserAssets();
                this.queryUserTokenInfo();
                this.getUserTroveInfo(true);
            }
            return { status: result.status === 1, hash, msg: '' };
        } catch (e) {
            // @ts-ignore
            const msg = getContractErrorMsg(e?.reason || e?.message);
            return { status: false, hash: '', msg };
        }
    }

    async closeTrove() {
        const { BorrowerOperation } = this.contractMap;
        if (!BorrowerOperation) return { status: false, hash: '', msg: '' };
        const checkResult = await this.networkCheck();
        if (!checkResult) {
            return { status: false, hash: '', msg: 'Bad network id' };
        }
        try {
            const { web3Provider } = this;
            const gasLimit = await BorrowerOperation
                .connect(web3Provider.getSigner())
                .estimateGas
                .closeTrove();

            const moreGasLimit = +gasLimit * 1.5;

            const { hash } = await BorrowerOperation
                .connect(web3Provider.getSigner())
                .closeTrove({ gasLimit: toBN(~~moreGasLimit) });

            const result = await this.waitForTransactionConfirmed(hash);

            if (result.status === 1) {
                this.queryUserAssets();
                this.queryUserTokenInfo();
                this.getUserTroveInfo(true);
            }
            return { status: result.status === 1, hash, msg: '' };
        } catch (e) {
            // @ts-ignore
            const msg = getContractErrorMsg(e?.reason || e?.message);
            return { status: false, hash: '', msg };
        }
    }

    async estimateEligible(EUSDAmount: ethers.BigNumber) {
        const { TroveManagerRedemption, TroveManager } = this.contractMap;
        const [
            totalEUSDSupply,
            decayedBaseRate
        ] = await Promise.all([
            TroveManagerRedemption.getEntireSystemDebt(),
            TroveManager.calcDecayedBaseRate()
        ]);
        const squareTerm = toBN(this.dec(1005, 15)).add(decayedBaseRate); // BR + .5%
        const sqrtTerm = squareTerm.mul(squareTerm); //.div(this.toBN(this.dec(1,18))) // Square term squared, over the precision
        const sqrtTerm2 = ((toBN(this.dec(2, 0))).mul(EUSDAmount)).mul(toBN(this.dec(1, 36))).div(totalEUSDSupply);
        const finalSqrtTerm = this.sqrt((sqrtTerm.add(sqrtTerm2)).mul(toBN(this.dec(1, 18)))); //.div(this.toBN(this.dec(1,9)))

        const finalEUSDAmount = totalEUSDSupply.mul(finalSqrtTerm.sub(squareTerm.mul(toBN(this.dec(1, 9))))).div(toBN(this.dec(1, 27)));
        return finalEUSDAmount;
    }

    async redeem(amount: number) {
        const { web3Provider, contractMap, latestRandomSeed } = this;
        const { TroveManager, HintHelpers, PriceFeeds, SortTroves } = contractMap;
        if (!TroveManager || !HintHelpers || !PriceFeeds) return { status: false, hash: '', msg: '' };
        const checkResult = await this.networkCheck();
        if (!checkResult) {
            return { status: false, hash: '', msg: 'Bad network id' };
        }
        try {
            const ethPrice = await PriceFeeds.fetchPrice_view();
            const redeemAmountBN = toBN(amount);

            let finalEUSDAmount = toBN(0);
            finalEUSDAmount = await this.estimateEligible(redeemAmountBN);

            const redemptionHint = await HintHelpers.getRedemptionHints(finalEUSDAmount, ethPrice, 0);

            const firstRedemptionHint = redemptionHint[0];
            const partialRedemptionNewICR = redemptionHint[1];

            const {
                hintAddress: approxPartialRedemptionHint,
                latestRandomSeed: nextSeed
            } = await HintHelpers.getApproxHint(partialRedemptionNewICR, 50, latestRandomSeed, ethPrice);

            runInAction(() => {
                this.latestRandomSeed = nextSeed;
            });

            const exactPartialRedemptionHint = await SortTroves.findInsertPosition(
                partialRedemptionNewICR,
                approxPartialRedemptionHint,
                approxPartialRedemptionHint
            );
            
            const gasLimit = await TroveManager
                .connect(web3Provider.getSigner())
                .estimateGas
                .redeemCollateral(
                    finalEUSDAmount,
                    firstRedemptionHint,
                    exactPartialRedemptionHint[0],
                    exactPartialRedemptionHint[1],
                    partialRedemptionNewICR,
                    MAX_ITERATIONS,
                    MAX_FEE
                );
            

            const moreGasLimit = +gasLimit * 1.5;

            const { hash } = await TroveManager
                .connect(web3Provider.getSigner())
                .redeemCollateral(
                    finalEUSDAmount,
                    firstRedemptionHint,
                    exactPartialRedemptionHint[0],
                    exactPartialRedemptionHint[1],
                    partialRedemptionNewICR,
                    MAX_ITERATIONS,
                    MAX_FEE,
                    { gasLimit: toBN(~~moreGasLimit) }
            );

            const result = await this.waitForTransactionConfirmed(hash);
            if (result.status === 1) {
                this.queryUserAssets();
                this.queryUserTokenInfo();
                this.getUserTroveInfo(true);
            }
            return { status: result.status === 1, hash, msg: '' };
        } catch (e) {
            // @ts-ignore
            const msg = getContractErrorMsg(e?.reason || e?.message);
            return { status: false, hash: '', msg };
        }
    }

    async liquidate(borrowerList: Array<string> | number) {
        const { web3Provider, contractMap, isLiquidateIng } = this;
        const { TroveManager } = contractMap;
        if (!TroveManager || isLiquidateIng) return { status: false, hash: '', msg: '' };
        const checkResult = await this.networkCheck();
        if (!checkResult) {
            return { status: false, hash: '', msg: 'Bad network id' };
        }
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

            const result = await this.waitForTransactionConfirmed(hash);

            return { status: result.status === 1, hash, msg: '' };
        } catch (e) {
            // @ts-ignore
            const msg = getContractErrorMsg(e?.reason || e?.message);
            return { status: false, hash: '', msg };
        } finally {
            runInAction(() => {
                this.isLiquidateIng = false;
            });
        }
    }

    async depositToStabilityPool(amount: number) {
        const { web3Provider, contractMap } = this;
        const { StabilityPool, StableCoin } = contractMap;
        if (!StabilityPool) return { status: false, hash: '', msg: '' };
        const checkResult = await this.networkCheck();
        if (!checkResult) {
            return { status: false, hash: '', msg: 'Bad network id' };
        }
        try {
            const amountBN = toBN(amount);

            const approveAmount = await this.getApproveAmount(StableCoin.address, StabilityPool.address);

            if (approveAmount.lt(amountBN)) {
                const approved = await this.approve(
                    StableCoin.address,
                    StabilityPool.address,
                    ethers.constants.MaxUint256
                );
    
                if (!approved) return { status: false, hash: '', msg: '' };
            }

            const { hash } = await StabilityPool
                .connect(web3Provider.getSigner())
                .provideToSP(
                    amountBN,
                    EMPTY_ADDRESS
                );
            const result = await this.waitForTransactionConfirmed(hash);

            if (result.status === 1) {
                this.queryUserTokenInfo();
                this.queryUserDepositGain();
                this.queryUserDepositInfo();
                this.queryStabilityPoolTVL();
            }
            return { status: result.status === 1, hash, msg: '' };
        } catch (e) {
            // @ts-ignore
            const msg = getContractErrorMsg(e?.reason || e?.message);
            return { status: false, hash: '', msg };
        }
    }

    async withdrawFromStabilityPool(amount: number) {
        const { web3Provider, contractMap } = this;
        const { StabilityPool } = contractMap;
        if (!StabilityPool) return { status: false, hash: '', msg: '' };
        const checkResult = await this.networkCheck();
        if (!checkResult) {
            return { status: false, hash: '', msg: 'Bad network id' };
        }
        try {
            const amountBN = toBN(amount);

            const { hash } = await StabilityPool
                .connect(web3Provider.getSigner())
                .withdrawFromSP(amountBN);

            const result = await this.waitForTransactionConfirmed(hash);
            if (result.status === 1) {
                this.queryStabilityPoolTVL();
                this.queryUserDepositInfo();
                this.queryUserTokenInfo();
            }
            return { status: result.status === 1, hash, msg: '' };
        } catch (e) {
            // @ts-ignore
            const msg = getContractErrorMsg(e?.reason || e?.message);
            return { status: false, hash: '', msg };
        }
    }

    async claimDepositReward() {
        const { web3Provider, contractMap } = this;
        const { StabilityPool } = contractMap;
        if (!StabilityPool) return { status: false, hash: '', msg: '' };

        const checkResult = await this.networkCheck();
        if (!checkResult) {
            return { status: false, hash: '', msg: 'Bad network id' };
        }

        runInAction(() => {
            this.isClaimRewardIng = true;
        });

        try {
            const { hash } = await StabilityPool
                .connect(web3Provider.getSigner())
                .withdrawFromSP('0');
            const result = await this.waitForTransactionConfirmed(hash);

            if (result.status === 1) {
                this.queryUserAssets();
            }

            return { status: result.status === 1, hash, msg: '' };
        } catch (e) {
            // @ts-ignore
            const msg = getContractErrorMsg(e?.reason || e?.message);
            return { status: false, hash: '', msg };
        } finally {
            runInAction(() => {
                this.isClaimRewardIng = false;
            });
        }
    }

    async claimRewardAndMoveToTrove() {
        const { contractMap, web3Provider } = this;
        const { StabilityPool } = contractMap;
        if (!StabilityPool) return { status: false, hash: '', msg: '' };
        const checkResult = await this.networkCheck();
        if (!checkResult) {
            return { status: false, hash: '', msg: 'Bad network id' };
        }
        runInAction(() => {
            this.isClaimRewardToTroveIng = true;
        });
        try {
            const { hash } = await StabilityPool
                .connect(web3Provider.getSigner())
                .withdrawCollateralGainToTrove(EMPTY_ADDRESS, EMPTY_ADDRESS);

            const result = await this.waitForTransactionConfirmed(hash);

            return { status: result.status === 1, hash, msg: '' };
        } catch (e) {
            // @ts-ignore
            const msg = getContractErrorMsg(e?.reason || e?.message);
            return { status: false, hash: '', msg };
        } finally {
            runInAction(() => {
                this.isClaimRewardToTroveIng = false;
            });
        }
    }

    async waitForTransactionConfirmed(hash: string, block = 1) {
        const { web3Provider } = this;
        const result = await web3Provider.waitForTransaction(hash, block);
        return result;
    }

    async getTroves() {
        const { troveAmount, contractMap, isLoadingTroves, troveList } = this;
        const { MultiTroveGetter } = contractMap;
        if (
            troveList.length >= troveAmount ||
            !MultiTroveGetter ||
            troveAmount < 1 ||
            isLoadingTroves
        ) return;

        runInAction(() => {
            this.isLoadingTroves = true;
        });

        try {
            const backendTroves = await MultiTroveGetter.getMultipleSortedTroves(
                0,
                troveAmount
            );
            const troves = this.mapBackendTroves(backendTroves);

            runInAction(() => {
                // @ts-ignore
                this.troveList = troves.sort((troveA, troveB) => troveA.ICR - troveB.ICR);
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

    async mintTestAsset(asset: string) {
        const { contractMap, web3Provider, walletAddr } = this;
        const { StableCoin } = contractMap;
        if (!StableCoin || !walletAddr) return { status: false, msg: '' };
        const checkResult = await this.networkCheck();
        if (!checkResult) {
            return { status: false, hash: '', msg: 'Bad network id' };
        }
        try {
            const { hash } = await StableCoin
                .attach(asset)
                .connect(web3Provider.getSigner())
                .mint(walletAddr, 1 + '0'.repeat(21));
            const result = await web3Provider.waitForTransaction(hash);

            if (result.status === 1) {
                this.queryUserAssets();
            }

            return { status: result.status === 1, msg: '' };
        } catch {
            return { status: false, msg: '' };
        }
    }

    async addTokenToWallet(token: string) {
        const { supportAssets, web3Provider, isMetaMask } = this;
        if (!isMetaMask) return false;
        const tokenInfo = supportAssets.find(c => c.tokenAddr === token);
        if (!tokenInfo) return false;
        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await web3Provider.provider.request!({
                method: 'wallet_watchAsset',
                params: {
                    // @ts-ignore
                    type: 'ERC20',
                    options: {
                        address: token,
                        symbol: tokenInfo.tokenName,
                        decimals: tokenInfo.tokenDecimals,
                        image: '',
                    },
                },
            });
            return wasAdded;
        } catch {
            return false;
        }
    }

    dec(val: number, scale: 'ether' | 'finney' | number) {
        let zerosCount;
    
        if (scale === 'ether') {
          zerosCount = 18;
        } else if (scale === 'finney')
          zerosCount = 15;
        else {
          zerosCount = scale;
        }
    
        const strVal = val.toString()
        const strZeros = ('0').repeat(zerosCount as number);
    
        return strVal.concat(strZeros)
    }

    sqrt(x: ethers.BigNumber) {
        let z = (x.add(toBN(this.dec(1, 0)))).div(toBN(this.dec(2, 0)));
        let y = x;
        while (z.lt(y)) {
          y = z;
          z = ((x.div(z)).add(z)).div(toBN(this.dec(2, 0)));
        }
        return y;
    }

    logOperation(amount: string, type: any) {
        if (!this.isMainNet) return;
        axios.post('/api/record', {
            addr: this.walletAddr,
            amount,
            type
        }).catch(() => null);
    }

    async networkCheck() {
        const { chainId, onboard } = this;
        try {
            if (chainId !== GOERLI_CHAIN_ID) {
                const switchResult = await onboard.setChain({
                    chainId: `0x${GOERLI_CHAIN_ID.toString(16)}`,
                });
                return switchResult;
            }
            return true;
        } catch {
            return false;
        }
    }

    async getUserRankInfo() {
        try {
            const { walletAddr } = this;
            if (!walletAddr) return;
            const res = await axios.get(`/api/get_my_rank?addr=${walletAddr}`);
            const data = res.data;

            runInAction(() => {
                this.userScores = data.score;
                this.userInvite = data.invite;
                this.userRank   = data.rank;
            });
        } catch {}
    }

    async queryRankList () {
        const { isLoadingRankList } = this;

        if (isLoadingRankList) return;

        runInAction(() => {
            this.isLoadingRankList = true;
        });

        try {
            const res = await axios.get('/api/get_rank_list');

            const list: Array<RankItem> = res.data?.data || [];

            const data: Array<any> = list
                .map(c => {
                    const { user, score, amount } = c;
                    const len = user.length;
                    return {
                        ...c,
                        userFullStr: user,
                        score: +(score.toFixed(2)),
                        amount: +(amount.toFixed(2)),
                        user: user.slice(0, 5) + '...' + user.slice(len - 4)
                    };
                });

            runInAction(() => {
                this.rankList = data;
                this.isNoRankData = data.length < 1;
            });
        } catch {
            runInAction(() => {
                this.isNoRankData = true;
            });
        } finally {
            runInAction(() => {
                this.isLoadingRankList = false;
            });
        }
    }
}
