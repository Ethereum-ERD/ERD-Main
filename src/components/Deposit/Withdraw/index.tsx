import { useState } from 'react';
import { observer } from "mobx-react";
import { InputNumber, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import cx from 'classnames';

import { formatUnits, addCommas, OpenEtherScan } from 'src/util';
import { useStore } from "src/hooks";

import s from "./index.module.scss";

function Withdraw() {

    const { store } = useStore();
    const [withdrawNum, setWithdrawNum] = useState('0.00');
    const [isProcessing, setIsProcessing] = useState(false);

    const { userPoolShare, stableCoinName, stableCoinDecimals, userDepositAmount, toggleStartWithdraw, withdrawFromStabilityPool } = store;

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
        if (result.status) {
            notification.success({
                message: 'Transaction complete',
                onClick: () => OpenEtherScan(`/tx/${result.hash}`)
            });
            toggleStartWithdraw();
        } else {
            notification.error({
                message: result.msg || 'Transaction failed'
            });
        }
        setIsProcessing(false);
    } 

    return (
        <div className={s.wrap}>
            <div className={s.overviewTop}>
                <p className={s.title}>Withdraw</p>
            </div>
            <div className={s.withdrawNumInputWrap}>
                <InputNumber
                    stringMode
                    onChange={onChange}
                    value={withdrawNum}
                    controls={false}
                    className={s.withdrawNumInput}
                    addonAfter={<p>{stableCoinName}</p>}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    // @ts-ignore
                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
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
                    <p>Pool Share</p>
                    <p>{(userPoolShare).toFixed(6)}%</p>
                </div>
            </div>
            <div className={s.btnArea}>
                <div className={cx(s.btn, s.cancel)} onClick={toggleStartWithdraw}>Cancel</div>
                <div className={cx(s.btn, s.disable, {
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
