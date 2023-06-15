import { useState } from 'react';
import { observer } from "mobx-react";
import { InputNumber, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import cx from 'classnames';

import { formatUnits, addCommas, OpenEtherScan } from 'src/util';
import { useStore } from "src/hooks";

import s from "./index.module.scss";

function ReDeposit() {

    const { store } = useStore();
    const [depositNum, setDepositNum] = useState('0.00');
    const [isProcessing, setIsProcessing] = useState(false);

    const { stableCoinName, stableCoinDecimals, userStableCoinBalance, toggleStartDeposit, toggleStartClaimRewards, userDepositAmount, depositToStabilityPool, spTVL } = store;

    const onChange = (v: string | null) => {
        if (v == null) {
            return setDepositNum('');
        }
        const [int, float] = v.split('.');

        let val = `${int}`;
        if (float) {
            val += `.${float.slice(0, stableCoinDecimals)}`;
        }

        if (Number(val) < 0) {
            val = '0';
        }

        setDepositNum(val);
    };

    const setToMax = () => {
        setDepositNum(formatUnits(userStableCoinBalance, stableCoinDecimals));
    };

    const handleConfirm = async () => {
        if (isProcessing) return;
        if (+depositNum < 1) return;
        if (+depositNum * Math.pow(10, stableCoinDecimals) > userStableCoinBalance) return;
        setIsProcessing(true);
        const result = await depositToStabilityPool(+depositNum * Math.pow(10, stableCoinDecimals));
        if (result.status) {
            notification.success({
                message: 'transaction done.',
                onClick: () => OpenEtherScan(`https://goerli.etherscan.io/tx/${result.hash}`)
            });
        } else {
            notification.error({
                message: 'transaction failed.'
            });
        }
        setIsProcessing(false);
    };

    return (
        <div className={s.wrap}>
            <div className={s.overviewTop}>
                <p className={s.title}>Deposit-SP</p>
                <div className={s.claimBtn} onClick={toggleStartClaimRewards}>
                    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.0764 0L6.29967 6.81923L11.0746 8.56903L15.7866 6.81826L11.0764 0ZM11.0718 7.51925L7.89581 6.3554L11.0701 1.82382L14.2013 6.35645L11.0718 7.51925ZM15.9412 7.1587L11.0693 9.25283L6.05882 7.17332L11.0811 13.4839L15.9412 7.1587ZM11.0657 11.8019L9.3056 9.59025L11.0772 10.3255L12.7539 9.60486L11.0657 11.8019Z" fill="#999999"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.5 9.80645C0.5 8.79096 1.32959 7.96774 2.35294 7.96774H5.07059C5.41171 7.96774 5.68824 8.24215 5.68824 8.58065C5.68824 8.91914 5.41171 9.19355 5.07059 9.19355H2.35294C2.01182 9.19355 1.73529 9.46796 1.73529 9.80645V17.1613C1.73529 17.4998 2.01182 17.7742 2.35294 17.7742H19.6471C19.9882 17.7742 20.2647 17.4998 20.2647 17.1613V9.80645C20.2647 9.46795 19.9882 9.19355 19.6471 9.19355H16.9294C16.5883 9.19355 16.3118 8.91914 16.3118 8.58065C16.3118 8.24215 16.5883 7.96774 16.9294 7.96774H19.6471C20.6704 7.96774 21.5 8.79096 21.5 9.80645V17.1613C21.5 18.1768 20.6704 19 19.6471 19H2.35294C1.32959 19 0.5 18.1768 0.5 17.1613V9.80645Z" fill="#999999"/>
                    </svg>
                    <p>Claim</p>
                </div>
            </div>
            <p className={s.titleDesc}>Deposit {stableCoinName} in the stable pool to earn liquidation income</p>
            <div className={s.depositNumInputWrap}>
                <InputNumber
                    stringMode
                    onChange={onChange}
                    value={depositNum}
                    controls={false}
                    className={s.depositNumInput}
                    addonAfter={<p>{stableCoinName}</p>}
                />
            </div>
            <div className={s.help}>
                <p className={s.balance}>
                    Your Balance{'\u00A0'}
                    <span>
                        {addCommas(formatUnits(userStableCoinBalance, stableCoinDecimals))}
                    </span>
                </p>
                <p className={s.max} onClick={setToMax}>Max</p>
            </div>
            {(+formatUnits(userStableCoinBalance, stableCoinDecimals) < (+depositNum)) && (
                <div className={s.InsufficientToken}>You have no enough {stableCoinName} 😅</div>
            )}
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
                    <p>{(userDepositAmount/spTVL * 100 || 0).toFixed(6)}%</p>
                </div>
            </div>
            <div className={s.btnArea}>
                <div className={cx(s.btn, s.cancel)} onClick={toggleStartDeposit}>Cancel</div>
                <div className={cx(s.btn, {
                        [s.disable]: +depositNum * Math.pow(10, stableCoinDecimals) > userStableCoinBalance || +depositNum < 1,
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

export default observer(ReDeposit);
