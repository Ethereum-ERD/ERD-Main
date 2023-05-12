import { observer } from "mobx-react";
import { Popover } from "antd";

import CircleHelp from "src/components/common/CircleHelp";
import { formatUnits, truncateDecimal } from 'src/util';
import { useStore } from "src/hooks";

import s from "./index.module.scss";

export default observer(function FeeInfo({
    totalDebt,
    fee
}: {
    totalDebt: number
    fee: number
}) {
    const { store } = useStore();
    const { gasCompensation, stableCoinName, stableCoinDecimals, mintingFeeRatio, interestRatio } = store;

    return (
        <div className={s.wrap}>
            <div className={s.item}>
                <div>
                    <p>Liquidation Reserve</p>
                    <Popover title='' content={<div className={s.tipsModal}>An amount set aside to cover the liquidator’s gas costs if your Trove needs to be liquidated. The amount increases your debt and is refunded if you close your Trove by fully paying off its net debt.</div>}>
                        <div style={{ cursor: 'help' }}>
                            <CircleHelp />
                        </div>
                    </Popover>
                </div>
                <p>
                    {formatUnits(gasCompensation, stableCoinDecimals)}
                    {"\u00A0"}
                    <span>{stableCoinName}</span>
                </p>
            </div>
            <div className={s.item}>
                <p>Total debt</p>
                <p>
                    {formatUnits(totalDebt, stableCoinDecimals)}
                    {"\u00A0"}
                    <span>{stableCoinName}</span>
                </p>
            </div>
            <div className={s.item}>
                <p>Interest Rate</p>
                <p>{truncateDecimal(interestRatio * 100)}%</p>
            </div>
            <div className={s.item}>
                <p>Minting Fee</p>
                <p>
                    {(fee).toFixed(0)}
                    {"\u00A0"}
                    <span>{stableCoinName}({truncateDecimal(mintingFeeRatio * 100)}%)</span>
                </p>
            </div>
        </div>
    );
});
