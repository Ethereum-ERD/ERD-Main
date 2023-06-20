import { useState, useMemo } from 'react';
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';
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
                message: 'Transaction failed'
            });
        }
        setIsProcessing(false);
    };

    return (
        <div className={s.wrap}>
            <div className={s.container}>
                <p className={s.title}>Redeem</p>
                <p className={s.desc}>Redemption is not for repaying your loan. To repay your loan, adjust your Trove on the <span className={s.highlight}><Link to='/'>Mint</Link></span>.</p>
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
                        Your Balance{'\u00A0'}
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
                            content={<div className={cx('tipsModal', s.redeemFeeTips)}>The Redemption Fee is charged as a percentage of the redeemed Ether. The Redemption Fee depends on eUSD redemption volumes and is 0.5% at minimum.</div>}
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
