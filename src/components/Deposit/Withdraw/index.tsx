import { useState } from 'react';
import { observer } from "mobx-react";
import { InputNumber, Popover, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import cx from 'classnames';

import CircleHelp from 'src/components/common/CircleHelp';
import { formatUnits, addCommas } from 'src/util';
import { useStore } from "src/hooks";

import s from "./index.module.scss";

function Withdraw() {

    const { store } = useStore();
    const [withdrawNum, setWithdrawNum] = useState('0.00');
    const [isProcessing, setIsProcessing] = useState(false);

    const { stableCoinName, stableCoinDecimals, userDepositAmount, toggleStartWithdraw, spTVL, withdrawFromStabilityPool } = store;

    const onChange = (v: string | null) => {
        if (v == null) {
            return setWithdrawNum('');
        }
        const [int, float] = v.split('.');

        let val = `${int}`;
        if (float) {
            val += `.${float.slice(0, stableCoinDecimals)}`;
        }

        if (Number(val) < 0) {
            val = '0';
        }

        setWithdrawNum(val);
    };

    const setToMax = () => {
        setWithdrawNum(formatUnits(userDepositAmount, stableCoinDecimals));
    };

    const handleConfirm = async () => {
        if (isProcessing) return;
        if (+withdrawNum < 1) return;
        if (+withdrawNum > +formatUnits(userDepositAmount, stableCoinDecimals)) return;
        setIsProcessing(true);
        const result = await withdrawFromStabilityPool(+withdrawNum * Math.pow(10, stableCoinDecimals));
        if (result) {
            notification.success({
                message: 'transaction done.'
            });
            toggleStartWithdraw();
        } else {
            notification.error({
                message: 'transaction failed.'
            });
        }
        setIsProcessing(false);
    }

    return (
        <div className={s.wrap}>
            <div className={s.overviewTop}>
                <p className={s.title}>Withdraw</p>
            </div>
            <div className={s.depositNumInputWrap}>
                <InputNumber
                    stringMode
                    onChange={onChange}
                    value={withdrawNum}
                    controls={false}
                    className={s.depositNumInput}
                    addonAfter={<p>{stableCoinName}</p>}
                />
            </div>
            <div className={s.help}>
                <p className={s.max} onClick={setToMax}>Max</p>
            </div>
            <div className={s.depositInfo}>
                <div className={s.depositAmount}>
                    <p>Your Deposit</p>
                    <p>
                        {addCommas(formatUnits(userDepositAmount, stableCoinDecimals))}
                        <span>{stableCoinName}</span>
                    </p>
                </div>
                <div className={s.poolShare}>
                    <div>
                        Pool Share
                        <Popover title='' content={<div className={s.popOverWrap}>The ratio of your deposit to the stable pool.</div>}>
                            <div style={{ cursor: 'help' }}>
                                <CircleHelp />
                            </div>
                        </Popover>
                    </div>
                    <p>{(userDepositAmount/spTVL * 100).toFixed(2)}%</p>
                </div>
            </div>
            <div className={s.btnArea}>
                <div className={s.cancelBtn} onClick={toggleStartWithdraw}>Cancel</div>
                <div className={cx(s.btn, {
                        [s.disable]: +withdrawNum > +formatUnits(userDepositAmount, stableCoinDecimals) || +withdrawNum < 1,
                        [s.loading]: isProcessing
                    })}
                    onClick={handleConfirm}
                >
                    {isProcessing && <LoadingOutlined />}
                    Confirm
                </div>
            </div>
        </div>
    );
}

export default observer(Withdraw);