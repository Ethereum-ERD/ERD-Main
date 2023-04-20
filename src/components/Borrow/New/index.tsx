import { observer } from 'mobx-react';

import NewDeposit from 'src/asset/deposit/new.png';
import { useStore } from 'src/hooks';

import s from './index.module.scss';

export default observer(function New() {
    const { store } = useStore();
    const { stableCoinName, toggleStartBorrow } = store;

    return <div className={s.wrap}>
        <p className={s.title}>Borrow</p>
        <div className={s.descWrap}>
            <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 21C16.799 21 21.5 16.299 21.5 10.5C21.5 4.70101 16.799 0 11 0C5.20101 0 0.5 4.70101 0.5 10.5C0.5 16.299 5.20101 21 11 21ZM10.0999 4.5H11.8998V6.29993H10.0999V4.5ZM10.2584 8.25H11.7584V16.4996H10.2584V8.25Z" fill="#666666"/>
            </svg>
            <p className={s.desc}>You haven't borrowed any {stableCoinName} yet.</p>
        </div>
        <p className={s.tips}>You can borrow {stableCoinName} by depositing collateral.</p>
        <img className={s.img} src={NewDeposit} alt="" />
        <div className={s.btn} onClick={toggleStartBorrow}>Start</div>
    </div>
})
