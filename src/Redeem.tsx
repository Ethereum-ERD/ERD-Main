import { useState, useMemo } from 'react';
import { observer } from "mobx-react";
import cx from 'classnames';
import { InputNumber, Popover, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { formatUnits, addCommas, OpenEtherScan } from 'src/util';
import CircleHelp from 'src/components/common/CircleHelp';
import { useStore } from "src/hooks";

import s from "./Redeem.module.scss";

function Redeem() {

    const { store } = useStore();
    const [redeemNum, setRedeemNum] = useState('0.00');
    const [isProcessing, setIsProcessing] = useState(false);

    const { userStableCoinBalance, stableCoinName, stableCoinDecimals, redeemFeeRatio, systemMCR, systemTCR, redeem } = store;

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
        if (+redeemNum < 1) return;
        setIsProcessing(true);
        const result = await redeem(+redeemNum * Math.pow(10, stableCoinDecimals));
        if (result.status) {
            notification.success({
                message: 'Transaction complete',
                onClick: () => OpenEtherScan(`https://goerli.etherscan.io/tx/${result.hash}`)
            });
        } else {
            notification.error({
                message: result.msg || 'Transaction failed'
            });
        }
        setIsProcessing(false);
    };

    return (
        <div className={s.wrap}>
            <div className={s.container}>
                <p className={s.title}>Redeem</p>
                <p className={s.desc}>Redeem {stableCoinName} for loan collateral on the ERD protocol. The protocol will prioritize collateral from the existing Trove with the lowest Collateral Ratio, and the amount of redeemed {stableCoinName} will be used to partially repay the outstanding Trove balance.</p>
                <div className={s.redeemNumInputWrap}>
                    <InputNumber
                        stringMode
                        onChange={onChange}
                        value={redeemNum}
                        controls={false}
                        className={s.redeemNumInput}
                        addonAfter={<p>{stableCoinName}</p>}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        // @ts-ignore
                        parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                    />
                </div>
                <div className={s.help}>
                    <p className={s.balance}>
                        Balance{'\u00A0'}
                        <span>
                            {addCommas(formatUnits(userStableCoinBalance, stableCoinDecimals))}
                        </span>
                    </p>
                    <p className={s.max} onClick={setToMax}>Max</p>
                </div>
                <div className={cx(s.redeemWarning, { [s.show]: !canRedeem })}>
                    You can't redeem {stableCoinName} when the total collateral ratio is less than {(systemMCR * 100).toFixed(0)}% in Recovery Mode.
                </div>
                <div className={s.feeInfo}>
                    <div className={s.feeInfoTitle}>
                        Redemption Fee{'\u00A0'}
                        <Popover
                            arrow={false}
                            title=''
                            content={<div className={cx('tipsModal', s.redeemFeeTips)}>The Redemption Fee is charged as a percentage of the total value of redeemed collateral. Redemption Fees are based on {stableCoinName} redemption volumes and have a minimum value of 0.5%.</div>}
                        >
                            <div className={s.tipsHelp}>
                                <CircleHelp />
                            </div>
                        </Popover>
                    </div>
                    <p className={s.feeAmount}>
                        <span>{(redeemFee).toFixed(2)}</span>
                        {'\u00A0'}{stableCoinName}{'\u00A0'}
                        ({(redeemFeeRatio * 100).toFixed(2)}%)
                    </p>
                </div>
                <div className={cx(s.btn, {
                            [s.disable]: +redeemNum === 0 || isProcessing,
                            [s.loading]: isProcessing
                        }
                    )}
                    onClick={handleConfirm}
                >
                    {isProcessing && <LoadingOutlined />}
                    Confirm
                </div>
            </div>
        </div>
    );
}

export default observer(Redeem);
