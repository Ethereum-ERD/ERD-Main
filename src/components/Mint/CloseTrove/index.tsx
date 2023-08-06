import { useState } from 'react';
import { observer } from 'mobx-react';
import { notification } from 'antd';
import cx from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';

import { formatUnits, OpenEtherScan } from 'src/util';
import { useStore } from 'src/hooks';

import s from './index.module.scss';

export default observer(function CloseTrove() {
    const { store } = useStore();

    const [isProcessing, setIsProcessing] = useState(false);
    const { userTrove, userStableCoinBalance, stableCoinName, stableCoinDecimals, toggleStartRepay, closeTrove } = store;

    const handleConfirm = async () => {
        if (isProcessing) return;
        if (userStableCoinBalance < userTrove.debt) return;
        setIsProcessing(true);
        const result = await closeTrove();
        if (result.status) {
            notification.success({
                message: 'Transaction complete',
                onClick: () => OpenEtherScan(`https://goerli.etherscan.io/tx/${result.hash}`)
            });
            toggleStartRepay();
        } else {
            notification.error({
                message: result.msg || 'Transaction failed'
            });
        }
        setIsProcessing(false);
    };

    if (!userTrove) return null;

    return (
        <div className={s.wrap}>
            <p className={s.title}>Close Trove</p>
            <p className={s.subTitle}>All debts must be repaid, withdraw collateral.</p>
            <div className={s.infoWrap}>
                <div className={s.item}>
                    <p>Total Debt</p>
                    <p>
                        {formatUnits(userTrove.debt, stableCoinDecimals)}
                        {"\u00A0"}
                        <span>{stableCoinName}</span>
                    </p>
                </div>
                <div className={s.item}>
                    <p>Your Balance</p>
                    <p>
                        {formatUnits(userStableCoinBalance, stableCoinDecimals)}
                        {"\u00A0"}
                        <span>{stableCoinName}</span>
                    </p>
                </div>
            </div>
            <div className={s.btnArea}>
                <div className={cx(s.btn, s.cancel)} onClick={toggleStartRepay}>Cancel</div>
                <div
                    className={cx(s.btn, {
                        [s.disable]: userStableCoinBalance < userTrove.debt,
                        [s.loading]: isProcessing
                    })}
                    onClick={handleConfirm}
                >
                    {isProcessing && <LoadingOutlined />}
                    {userStableCoinBalance >= userTrove.debt ? 'Confirm' : 'Insufficient balance'}
                </div>
            </div>
        </div>
    );
})
