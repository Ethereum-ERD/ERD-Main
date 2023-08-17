import { observer } from 'mobx-react';
import { Popover } from "antd";
import cx from 'classnames';

import { formatUnits, translateUint, truncateDecimal } from 'src/util';
import CircleHelp from 'src/components/common/CircleHelp';
import { useStore } from 'src/hooks';

import s from './Dashboard.module.scss';

export default observer(function Dashboard() {

    const { store } = useStore();

    const { troveAmount, systemTCR, isNormalMode, stableCoinName, systemCCR, systemMCR, mintingFeeRatio, stableCoinTotalSupply, spOwnStableCoinAmount, stableCoinDecimals, protocolValInETH, systemTotalValueInUSD } = store;

    const [totalSupply, totalSupplyUint] = translateUint(+formatUnits(stableCoinTotalSupply, stableCoinDecimals));
    const [spOwn, spOwnUint] = translateUint(+formatUnits(spOwnStableCoinAmount, stableCoinDecimals));
    const [valueInUSD, valueInUSDUint] = translateUint(systemTotalValueInUSD);

    return (
        <div className={s.wrap}>
            <p className={s.title}>ERD Statistics</p>
            <div className={s.indexes}>
                <div className={s.index}>
                    <div className={s.indexItem}>
                        <div className={s.indexName}>
                            TVL
                            <Popover arrow={false} title='' content={<div className='tipsModal'>Total Value Locked (TVL) is the total value of Ether locked as collateral in the protocol. Measurements are provided in ETH and {stableCoinName}.</div>}>
                                <div className={s.help}>
                                    <CircleHelp />
                                </div>
                            </Popover>
                        </div>
                        <p className={s.indexValue}>
                            {(protocolValInETH)} <span>ETH</span>
                            <span>($ {valueInUSD}{"\u00A0"}{valueInUSDUint})</span>
                        </p>
                    </div>
                    <div className={s.indexItem}>
                        <div className={s.indexName}>
                            Minting Fee
                            <Popover arrow={false} title='' content={<div className='tipsModal'>The Minting Fee is an amount set aside to cover gas fees should a borrower's Trove need to be liquidated. This amount increases a borrower's Total Debt and is refunded once any outstanding debt is repaid and the Trove is closed.</div>}>
                                <div className={s.help}>
                                    <CircleHelp />
                                </div>
                            </Popover>
                        </div>
                        <p className={s.indexValue}>{truncateDecimal(mintingFeeRatio * 100, 2)}<span>%</span></p>
                    </div>
                </div>
                <div className={s.index}>
                    <div className={s.indexItem}>
                        <div className={s.indexName}>
                            Troves
                            <Popover arrow={false} title='' content={<div className='tipsModal'>The total number of outstanding Troves on the protocol.</div>}>
                                <div className={s.help}>
                                    <CircleHelp />
                                </div>
                            </Popover>
                        </div>
                        <p className={s.indexValue}>{troveAmount >= 0 ? troveAmount : 0}</p>
                    </div>
                    <div className={s.indexItem}>
                        <div className={s.indexName}>
                            {stableCoinName} Supply
                            <Popover arrow={false} title='' content={<div className='tipsModal'>The total amount of {stableCoinName} minted by the protocol.</div>}>
                                <div className={s.help}>
                                    <CircleHelp />
                                </div>
                            </Popover>
                        </div>
                        <p className={s.indexValue}>
                            {totalSupply}
                            <span>{totalSupplyUint}</span>
                        </p>
                    </div>
                </div>
                <div className={s.index}>
                    <div className={s.indexItem}>
                        <div className={s.indexName}>
                            Stability Pool
                            <Popover arrow={false} title='' content={<div className='tipsModal'>The total value of {stableCoinName} currently deposited into the Stability Pool.</div>}>
                                <div className={s.help}>
                                    <CircleHelp />
                                </div>
                            </Popover>
                        </div>
                        <p className={s.indexValue}>
                            {spOwn}{spOwnUint}
                            <span>{stableCoinName}</span>
                        </p>
                    </div>
                    <div className={s.indexItem}>
                        <div className={s.indexName}>
                            TCR
                            <Popover arrow={false} title='' content={<div className='tipsModal'>The Total Collateralization Ratio (TCR) represents the dollar value of all deposited collateral against the total outstanding debt on the protocol. TCR is shown as a ratio and collateral values are calculated at the most recent ETH:USD price.</div>}>
                                <div className={s.help}>
                                    <CircleHelp />
                                </div>
                            </Popover>
                        </div>
                        <p className={s.indexValue}>{(systemTCR * 100).toFixed(0)}<span>%</span></p>
                    </div>
                </div>
                <div className={s.index}>
                    <div className={s.indexItem}>
                        <div className={s.indexName}>
                            Recovery Mode
                            <Popover arrow={false} title='' content={<div className={cx('tipsModal', s.systemModal)}>Recovery Mode is activated when the Total Collateral Ratio (TCR) falls below {(systemCCR * 100).toFixed(0)}%. When active, your Trove can be liquidated if its collateral ratio is below the TCR. The maximum collateral you can lose from liquidation is capped at {(systemMCR * 100).toFixed(0)}% of your Trove's debt. Operations are also restricted that would negatively impact the TCR.</div>}>
                                <div className={s.help}>
                                    <CircleHelp />
                                </div>
                            </Popover>
                        </div>
                        <p className={cx(s.indexValue, s.systemMode)}>{isNormalMode ? 'No' : 'Yes'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
});
