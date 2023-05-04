import { useState } from 'react';
import { observer } from "mobx-react";
import { InputNumber, Popover, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import cx from 'classnames';

import CircleHelp from 'src/components/common/CircleHelp';
import { formatUnits, addCommas } from 'src/util';
import { useStore } from "src/hooks";

import s from "./index.module.scss";

function NewDeposit() {

    const { store } = useStore();
    const [depositNum, setDepositNum] = useState('0.00');
    const [isProcessing, setIsProcessing] = useState(false);

    const { stableCoinName, stableCoinDecimals, userStableCoinBalance, toggleStartDeposit, userCollateralInfo, depositToStabilityPool, userDepositAmount, spTVL } = store;

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
        if (result) {
            notification.success({
                message: 'transaction done.'
            });
        } else {
            notification.error({
                message: 'transaction failed.'
            });
        }
        setDepositNum('0.00');
        setIsProcessing(false);
    };

    return (
        <div className={s.wrap}>
            <p className={s.title}>Deposit</p>
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
                    <span>Your Balance{'\u00A0'}</span>
                    {addCommas(formatUnits(userStableCoinBalance, stableCoinDecimals))}
                </p>
                <p className={s.max} onClick={setToMax}>Max</p>
            </div>
            {(+formatUnits(userStableCoinBalance, stableCoinDecimals) < (+depositNum)) && (
                <div className={s.InsufficientToken}>You have no enough {stableCoinName} 😅</div>
            )}
            <div className={s.poolShare}>
                <div className={s.poolShareTitle}>
                    Pool Share
                    <Popover title='' content={
                        <div className={s.popOverWrap}>
                            The ratio of your deposit to the stable pool.
                        </div>
                        }
                    >
                        <div style={{ cursor: 'help' }}>
                            <CircleHelp />
                        </div>
                    </Popover>
                </div>
                <p className={s.poolShareValue}>
                    {(userDepositAmount/spTVL * 100).toFixed(2)}%
                </p>
            </div>
            <div className={s.userCollateral}>
                <p className={s.userCollateralTitle}>Your Collateral</p>
                <div className={s.userCollateralList}>
                    {userCollateralInfo.map((coll) => {
                        return (
                            <div key={coll.tokenAddr} className={s.userCollateralItem}>
                                <div className={s.userCollateralItemHead}>
                                    <img src={coll.icon} alt='' />
                                    <p>{coll.assetName}</p>
                                </div>
                                <div className={s.userCollateralItemBody}>
                                    <p>{formatUnits(coll.balance, coll.tokenDecimals)}</p>
                                    <span>{coll.tokenName}</span>
                                </div>
                            </div>
                        );
                    })}
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

export default observer(NewDeposit);
