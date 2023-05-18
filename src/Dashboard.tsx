import { observer } from 'mobx-react';
import { Popover } from "antd";
import cx from 'classnames';

import CircleHelp from 'src/components/common/CircleHelp';
import { formatUnits, translateUint, truncateDecimal } from 'src/util';
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
                            <Popover arrow={false} title='' content={<div className='tipsModal'>The Total Value Locked (TVL) is the total value of Ether locked as collateral in the system, given in ETH and USD.</div>}>
                                <div className={s.help}>
                                    <CircleHelp />
                                </div>
                            </Popover>
                        </div>
                        <p className={s.indexValue}>
                            {(protocolValInETH).toFixed(0)} <span>ETH</span>
                            <span>($ {valueInUSD}{valueInUSDUint})</span>
                        </p>
                    </div>
                    <div className={s.indexItem}>
                        <div className={s.indexName}>
                            Minting Fee
                            <Popover arrow={false} title='' content={<div className='tipsModal'>An amount set aside to cover the liquidator’s gas costs if your Trove needs to be liquidated. The amount increases your debt and is refunded if you close your Trove by fully paying off its net debt.</div>}>
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
                            <Popover arrow={false} title='' content={<div className='tipsModal'>The total number of active Troves in the system.</div>}>
                                <div className={s.help}>
                                    <CircleHelp />
                                </div>
                            </Popover>
                        </div>
                        <p className={s.indexValue}>{troveAmount}</p>
                    </div>
                    <div className={s.indexItem}>
                        <div className={s.indexName}>
                            {stableCoinName} Supply
                            <Popover arrow={false} title='' content={<div className='tipsModal'>The total {stableCoinName} minted by the ERD Protocol.</div>}>
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
                            {stableCoinName} in Stability Pool
                            <Popover arrow={false} title='' content={<div className='tipsModal'>The total {stableCoinName} currently held in the Stability Pool, expressed as an amount and a fraction of the {stableCoinName} supply.</div>}>
                                <div className={s.help}>
                                    <CircleHelp />
                                </div>
                            </Popover>
                        </div>
                        <p className={s.indexValue}>
                            {spOwn}
                            <span>{spOwnUint}</span>
                        </p>
                    </div>
                    <div className={s.indexItem}>
                        <div className={s.indexName}>
                            TCR
                            <Popover arrow={false} title='' content={<div className='tipsModal'>The ratio of the Dollar value of the entire system collateral at the current ETH:USD price, to the entire system debt.</div>}>
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
