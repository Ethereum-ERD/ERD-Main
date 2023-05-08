import { observer } from 'mobx-react';

import { useStore } from 'src/hooks';

import s from './index.module.scss';

export default observer(function DepositTitle() {
    const { store } = useStore();

    const { stableCoinName } = store;

    return (
        <div className={s.wrap}>
            <p className={s.title}>Deposit-SP</p>
            <p className={s.titleDesc}>Deposit {stableCoinName} in the stable pool to earn liquidation income.</p>
        </div>
    );
});
