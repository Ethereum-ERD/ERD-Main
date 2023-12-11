import { useCallback } from "react";
import { observer } from "mobx-react";
import { Popover, Skeleton } from "antd";
import cx from "classnames";

import { formatUnits, translateUint, truncateDecimal, addCommas } from "src/util";
import { TOKEN_IMG_URL, USDE_ADDR, EMPTY_ADDRESS } from 'src/constants';
import CircleHelp from "src/components/common/CircleHelp";
import { useStore } from "src/hooks";

import s from "./Dashboard.module.scss";

const USDE = 'https://erd-fe-storage.s3.amazonaws.com/etherscan/USDE.png';

export default observer(function Dashboard() {
    const { store } = useStore();

    const {
        interestRatio,
        troveAmount,
        systemTCR,
        isNormalMode,
        stableCoinName,
        systemCCR,
        systemMCR,
        mintingFeeRatio,
        stableCoinTotalSupply,
        spOwnStableCoinAmount,
        stableCoinDecimals,
        protocolValInETH,
        systemTotalValueInUSD,
        userCollateralInfo,
        userStableCoinBalance,
        isMetaMask,
        web3Provider
    } = store;

    const [totalSupply, totalSupplyUint] = translateUint(
        +formatUnits(stableCoinTotalSupply, stableCoinDecimals)
    );
    const [spOwn, spOwnUint] = translateUint(
        +formatUnits(spOwnStableCoinAmount, stableCoinDecimals)
    );
    const [valueInUSD, valueInUSDUint] = translateUint(systemTotalValueInUSD);

    const handleAddToWallet = useCallback(async (tokenInfo: any) => {
        if (!isMetaMask) return false;
        if (tokenInfo.tokenAddr === EMPTY_ADDRESS) return;
        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await web3Provider.provider.request!({
                method: 'wallet_watchAsset',
                params: {
                    // @ts-ignore
                    type: 'ERC20',
                    options: {
                        address: tokenInfo.tokenAddr,
                        symbol: tokenInfo.tokenName,
                        decimals: tokenInfo.tokenDecimals,
                        image: TOKEN_IMG_URL[tokenInfo.tokenAddr.toLowerCase()] || '',
                    },
                },
            });
            return wasAdded;
        } catch {
            return false;
        }
    }, [isMetaMask, web3Provider]);

    return (
        <div className={s.wrap}>
            <p className={s.title}>Statistics</p>
            <div className={s.userAssetIndex}>
                <p className={s.indexTitle}>Balances</p>
                <div className={s.userAssetsInfo}>
                    <Skeleton active loading={userCollateralInfo.length < 1}>
                        {userCollateralInfo.map(asset => {
                            return (
                                <div
                                    key={asset.assetName}
                                    className={s.asset}
                                    onClick={() => handleAddToWallet(asset)}
                                >
                                    <div className={s.assetInfo}>
                                        <img src={asset.icon} alt={`${asset.assetName} icon`} />
                                        <p className={s.assetName}>{asset.assetName}</p>
                                    </div>
                                    <div className={s.tokenInfo}>
                                        <p className={s.assetAmount}>{addCommas(formatUnits(asset.balance, asset.tokenDecimals))}</p>
                                        <p className={s.assetTokenName}>{asset.tokenName}</p>
                                    </div>
                                </div>
                            );
                        })}
                        <div
                            key={stableCoinName}
                            className={s.asset}
                            onClick={() => handleAddToWallet({ tokenAddr: USDE_ADDR, tokenName: stableCoinName, tokenDecimals: stableCoinDecimals })}
                        >
                            <div className={s.assetInfo}>
                                <img src={USDE} alt={`${stableCoinName} icon`} />
                                <p className={s.assetName}>{stableCoinName}</p>
                            </div>
                            <div className={s.tokenInfo}>
                                <p className={s.assetAmount}>{addCommas(formatUnits(userStableCoinBalance, stableCoinDecimals))}</p>
                                <p className={s.assetTokenName}>{stableCoinName}</p>
                            </div>
                        </div>
                    </Skeleton>
                </div>
            </div>
            <div className={s.protocolIndex}>
                <p className={s.indexTitle}>ERD Statistics</p>
                <div className={s.indexes}>
                    <div className={s.index}>
                        <div className={s.indexItem}>
                            <div className={s.indexName}>
                                TVL
                                <Popover
                                    arrow={false}
                                    title=""
                                    content={
                                        <div className="tipsModal">
                                            Total Value Locked (TVL) is the total
                                            value of Ether locked as collateral in
                                            the protocol. Measurements are provided
                                            in ETH and {stableCoinName}.
                                        </div>
                                    }
                                >
                                    <div className={s.help}>
                                        <CircleHelp />
                                    </div>
                                </Popover>
                            </div>
                            <div className={s.indexValue}>
                                <p>
                                    {protocolValInETH} <span>ETH</span>
                                    <span>
                                        ($ {valueInUSD}
                                        {"\u00A0"}
                                        {valueInUSDUint})
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className={s.indexItem}>
                            <div className={s.indexName}>
                                Borrow APY
                            </div>
                            <div className={s.indexValue}>
                                <p>{truncateDecimal(interestRatio * 100, 2)}<span>%</span></p>
                            </div>
                        </div>
                    </div>
                    <div className={s.index}>
                        <div className={s.indexItem}>
                            <div className={s.indexName}>
                                Minting Fee
                                <Popover
                                    arrow={false}
                                    title=""
                                    content={
                                        <div className="tipsModal">
                                            The Minting Fee is an amount set aside
                                            to cover gas fees should a borrower's
                                            Trove need to be liquidated. This amount
                                            increases a borrower's Total Debt and is
                                            refunded once any outstanding debt is
                                            repaid and the Trove is closed.
                                        </div>
                                    }
                                >
                                    <div className={s.help}>
                                        <CircleHelp />
                                    </div>
                                </Popover>
                            </div>
                            <div className={s.indexValue}>
                                <p>{truncateDecimal(mintingFeeRatio * 100, 2)}<span>%</span></p>
                            </div>
                        </div>
                        <div className={s.indexItem}>
                            <div className={s.indexName}>
                                Troves
                                <Popover
                                    arrow={false}
                                    title=""
                                    content={
                                        <div className="tipsModal">
                                            The total number of outstanding Troves
                                            on the protocol.
                                        </div>
                                    }
                                >
                                    <div className={s.help}>
                                        <CircleHelp />
                                    </div>
                                </Popover>
                            </div>
                            <div className={s.indexValue}>
                                <p>{troveAmount >= 0 ? troveAmount : 0}</p>
                            </div>
                        </div>
                    </div>
                    <div className={s.index}>
                        <div className={s.indexItem}>
                            <div className={s.indexName}>
                                {stableCoinName} Supply
                                <Popover
                                    arrow={false}
                                    title=""
                                    content={
                                        <div className="tipsModal">
                                            The total amount of {stableCoinName}{" "}
                                            minted by the protocol.
                                        </div>
                                    }
                                >
                                    <div className={s.help}>
                                        <CircleHelp />
                                    </div>
                                </Popover>
                            </div>
                            <div className={s.indexValue}>
                                <p>{totalSupply}<span>{totalSupplyUint}</span></p>
                            </div>
                        </div>
                        <div className={s.indexItem}>
                            <div className={s.indexName}>
                                Stability Pool
                                <Popover
                                    arrow={false}
                                    title=""
                                    content={
                                        <div className="tipsModal">
                                            The total value of {stableCoinName}{" "}
                                            currently deposited into the Stability
                                            Pool.
                                        </div>
                                    }
                                >
                                    <div className={s.help}>
                                        <CircleHelp />
                                    </div>
                                </Popover>
                            </div>
                            <div className={s.indexValue}>
                                <p>
                                    {spOwn}{spOwnUint}<span>{stableCoinName}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={s.index}>
                    <div className={s.indexItem}>
                        <div className={s.indexName}>
                                TCR
                                <Popover
                                    arrow={false}
                                    title=""
                                    content={
                                        <div className="tipsModal">
                                            The Total Collateralization Ratio (TCR)
                                            represents the dollar value of all
                                            deposited collateral against the total
                                            outstanding debt on the protocol. TCR is
                                            shown as a ratio and collateral values
                                            are calculated at the most recent
                                            ETH:USD price.
                                        </div>
                                    }
                                >
                                    <div className={s.help}>
                                        <CircleHelp />
                                    </div>
                                </Popover>
                            </div>
                            <div className={s.indexValue}>
                                <p>{(systemTCR * 100).toFixed(0)}</p>
                                <span>%</span>
                            </div>
                        </div>
                        <div className={s.indexItem}>
                            <div className={s.indexName}>
                                Recovery Mode
                                <Popover
                                    arrow={false}
                                    title=""
                                    content={
                                        <div
                                            className={cx(
                                                "tipsModal",
                                                s.systemModal
                                            )}
                                        >
                                            Recovery Mode is activated when the
                                            Total Collateral Ratio (TCR) falls below{" "}
                                            {(systemCCR * 100).toFixed(0)}%. When
                                            active, your Trove can be liquidated if
                                            its collateral ratio is below the TCR.
                                            The maximum collateral you can lose from
                                            liquidation is capped at{" "}
                                            {(systemMCR * 100).toFixed(0)}% of your
                                            Trove's debt. Operations are also
                                            restricted that would negatively impact
                                            the TCR.
                                        </div>
                                    }
                                >
                                    <div className={s.help}>
                                        <CircleHelp />
                                    </div>
                                </Popover>
                            </div>
                            <p className={cx(s.indexValue, s.systemMode)}>
                                {isNormalMode ? "No" : "Yes"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
