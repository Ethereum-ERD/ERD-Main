import { useState, useMemo } from 'react';
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { InputNumber, Popover, notification } from 'antd';

import CircleHelp from 'src/components/common/CircleHelp';
import { formatUnits, addCommas } from 'src/util';
import { useStore } from "src/hooks";

import s from "./Redeem.module.scss";

function Redeem() {

    const { store } = useStore();
    const [redeemNum, setRedeemNum] = useState('0.00');

    const { userStableCoinBalance, stableCoinName, stableCoinDecimals, redeemFeeRatio, isNormalMode, systemMCR, systemTCR, redeem } = store;

    const canRedeem = systemTCR > systemMCR;

    const onChange = (v: string | null) => {
        if (v == null) {
            return setRedeemNum('');
        }
        const [int, float] = v.split('.');

        let val = `${int}`;
        if (float) {
            val += `.${float.slice(0, stableCoinDecimals)}`;
        }

        if (Number(val) < 0) {
            val = '0';
        }

        setRedeemNum(val);
    };

    const setToMax = () => {
        setRedeemNum(formatUnits(userStableCoinBalance, stableCoinDecimals));
    };

    const redeemFee = useMemo(() => {
        return +redeemNum * redeemFeeRatio;
    }, [redeemNum, redeemFeeRatio]);

    const handleConfirm = async () => {
        if (!canRedeem) {
            return notification.error({
                message: `Can't redeem right now.`
            });
        }
        const result = await redeem(+redeemNum * Math.pow(10, stableCoinDecimals));
        if (result) {
            notification.success({
                message: 'transaction done.'
            });
        } else {
            notification.error({
                message: 'transaction failed.'
            });
        }
    };

    return (
        <div className={s.wrap}>
            <div className={s.container}>
                <p className={s.title}>Redeem</p>
                <p className={s.desc}>Redemption is not for repaying your loan. To repay your loan, adjust your Trove on the <span className={s.highlight}><Link to='/'>Borrow</Link></span>.</p>
                <div className={s.redeemNumInputWrap}>
                    <InputNumber
                        stringMode
                        onChange={onChange}
                        value={redeemNum}
                        controls={false}
                        className={s.redeemNumInput}
                        addonAfter={<p>{stableCoinName}</p>}
                    />
                </div>
                <div className={s.help}>
                    <p className={s.balance}>
                        <span>Your Balance{'\u00A0'}</span>
                        {addCommas(formatUnits(userStableCoinBalance, stableCoinDecimals))}
                    </p>
                    <p className={s.max} onClick={setToMax}>Max</p>
                </div>
                <div className={cx(s.redeemWarning, { [s.show]: !canRedeem })}>
                    You can't redeem {stableCoinName} when the total collateral ratio is less than {(systemMCR * 100).toFixed(0)}% in { isNormalMode ? 'Normal Mode' : 'Recovery Mode' }.
                </div>
                <div className={s.feeInfo}>
                    <div className={s.feeInfoTitle}>
                        Redemption Fee{'\u00A0'}
                        <Popover title='' content={<div className={s.redeemFeeTips}>The Redemption Fee is charged as a percentage of the redeemed Ether. The Redemption Fee depends on eUSD redemption volumes and is 0.5% at minimum.</div>}>
                            <div className={s.tipsHelp}>
                                <CircleHelp />
                            </div>
                        </Popover>
                    </div>
                    <p className={s.feeAmount}>
                        <span>{redeemFee}</span>
                        {'\u00A0'}{stableCoinName}
                        ({(redeemFeeRatio * 100).toFixed(2)}%)
                    </p>
                </div>
                <div className={cx(s.btn, { [s.disable]: +redeemNum === 0 })} onClick={handleConfirm}>Confirm</div>
            </div>
        </div>
    );
}

export default observer(Redeem);
