import { useState } from 'react';
import { observer } from 'mobx-react';
import { InputNumber, notification } from 'antd';
import cx from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';

import StableCoinIcon from 'src/components/common/StableCoinIcon';
import { addCommas, formatUnits } from 'src/util';
import { useStore } from 'src/hooks';

import s from './index.module.scss';
import FeeInfo from '../FeeInfo';

export default observer(function Repay() {
    const { store } = useStore();

    const [repayNum, setRepayNum] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const { userTrove, userStableCoinBalance, stableCoinName, stableCoinDecimals, toggleStartRepay, closeTrove, borrowFeeRatio } = store;

    const onRepayNumChange = (v: any) => {
        if (v == null) {
            return setRepayNum(0);
        }
        const [int, float] = v.split('.');

        let val: number;
        if (!float) {
            val = +int;
        } else {
            val = +[int, '.', float.slice(0, stableCoinDecimals)].join('');
        }

        if (Number(val) < 0) {
            val = 0;
        }

        setRepayNum(+val);
    };

    const setToMax = () => {
        setRepayNum(+formatUnits(userStableCoinBalance, stableCoinDecimals));
    };

    const handleConfirm = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        const result = await closeTrove();
        if (result) {
            notification.success({
                message: 'transaction done.'
            });
            toggleStartRepay();
        } else {
            notification.error({
                message: 'transaction failed.'
            });
        }
        setIsProcessing(false);
    };

    if (!userTrove) return null;

    return (
        <div className={s.wrap}>
            <p className={s.title}>Repay</p>
            <div className={s.inputWrap}>
                <InputNumber
                    controls={false}
                    stringMode
                    onChange={onRepayNumChange}
                    value={repayNum}
                    className={s.input}
                    addonBefore={
                        <p className={s.inputBefore}>
                            <StableCoinIcon />
                            <span>{stableCoinName}</span>
                        </p>
                    }
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    // @ts-ignore
                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                />
            </div>
            <div className={s.help}>
                <p className={s.balance}>
                    <span>Your Balance{'\u00A0'}</span>
                    {addCommas(formatUnits(userStableCoinBalance, stableCoinDecimals))}
                </p>
                <p className={s.max} onClick={setToMax}>Max</p>
            </div>
            {userStableCoinBalance < userTrove.debt && (
                <div className={s.warning}>
                    You do not have enough {stableCoinName} to pay back 😅
                </div>
            )}
            <FeeInfo
                totalDebt={userTrove.debt}
                fee={(userTrove.debt * borrowFeeRatio) / Math.pow(10, stableCoinDecimals)}
            />
            <div className={s.btnArea}>
                <div className={cx(s.btn, s.cancel)} onClick={toggleStartRepay}>Cancel</div>
                <div
                    className={cx(s.btn, {
                        [s.disable]: userStableCoinBalance < userTrove.debt || repayNum < +formatUnits(userTrove.debt, stableCoinDecimals),
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
})
