import { useState } from 'react';
import { observer } from "mobx-react";
import { InputNumber, Popover, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import cx from 'classnames';

import { formatUnits, addCommas, OpenEtherScan } from 'src/util';
import DepositTitle from 'src/components/common/DepositTitle';
import CircleHelp from 'src/components/common/CircleHelp';
import { useStore } from "src/hooks";

import s from "./index.module.scss";

function NewDeposit() {

    const { store } = useStore();
    const [depositNum, setDepositNum] = useState('0.00');
    const [isProcessing, setIsProcessing] = useState(false);

    const { userPoolShare, stableCoinName, stableCoinDecimals, userStableCoinBalance, toggleStartDeposit, depositToStabilityPool } = store;

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
                message: 'Transaction complete',
                onClick: () => OpenEtherScan(`https://goerli.etherscan.io/tx/${result.hash}`)
            });
        } else {
            notification.error({
                message: result.msg || 'Transaction failed'
            });
        }
        setDepositNum('0.00');
        setIsProcessing(false);
    };

    return (
        <div className={s.wrap}>
            <DepositTitle />
            <div className={s.depositNumInputWrap}>
                <InputNumber
                    stringMode
                    onChange={onChange}
                    value={depositNum}
                    controls={false}
                    className={s.depositNumInput}
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
            {(+formatUnits(userStableCoinBalance, stableCoinDecimals) < (+depositNum)) && (
                <div className={s.InsufficientToken}>You have insufficient {stableCoinName} balance</div>
            )}
            <div className={s.poolShare}>
                <div className={s.poolShareTitle}>
                    Pool Share
                    <Popover
                        arrow={false}
                        title=''
                        content={
                            <div className={cx('tipsModal', s.popOverWrap)}>
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
                    {(userPoolShare).toFixed(6)}%
                </p>
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
