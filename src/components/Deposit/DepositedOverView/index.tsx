import { observer } from "mobx-react";
import cx from 'classnames';

import { useStore } from "src/hooks";

import AlreadyDeposit from 'src/asset/deposit/already-deposit.png';
import { formatUnits, addCommas } from 'src/util';

import s from "./index.module.scss";

function DepositedOverView() {

    const { store } = useStore();
    const { userDepositAmount, stableCoinName, stableCoinDecimals, spTVL, toggleStartDeposit, toggleStartWithdraw, toggleStartClaimRewards } = store;

    return (
        <div className={s.wrap}>
            <div className={s.overviewTop}>
                <p className={s.title}>Deposit</p>
                <div className={s.claimBtn} onClick={toggleStartClaimRewards}>
                    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.0764 0L6.29967 6.81923L11.0746 8.56903L15.7866 6.81826L11.0764 0ZM11.0718 7.51925L7.89581 6.3554L11.0701 1.82382L14.2013 6.35645L11.0718 7.51925ZM15.9412 7.1587L11.0693 9.25283L6.05882 7.17332L11.0811 13.4839L15.9412 7.1587ZM11.0657 11.8019L9.3056 9.59025L11.0772 10.3255L12.7539 9.60486L11.0657 11.8019Z" fill="#999999"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.5 9.80645C0.5 8.79096 1.32959 7.96774 2.35294 7.96774H5.07059C5.41171 7.96774 5.68824 8.24215 5.68824 8.58065C5.68824 8.91914 5.41171 9.19355 5.07059 9.19355H2.35294C2.01182 9.19355 1.73529 9.46796 1.73529 9.80645V17.1613C1.73529 17.4998 2.01182 17.7742 2.35294 17.7742H19.6471C19.9882 17.7742 20.2647 17.4998 20.2647 17.1613V9.80645C20.2647 9.46795 19.9882 9.19355 19.6471 9.19355H16.9294C16.5883 9.19355 16.3118 8.91914 16.3118 8.58065C16.3118 8.24215 16.5883 7.96774 16.9294 7.96774H19.6471C20.6704 7.96774 21.5 8.79096 21.5 9.80645V17.1613C21.5 18.1768 20.6704 19 19.6471 19H2.35294C1.32959 19 0.5 18.1768 0.5 17.1613V9.80645Z" fill="#999999"/>
                    </svg>
                    <p>Claim</p>
                </div>
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
                    <p>{(userDepositAmount/spTVL * 100).toFixed(2)}%</p>
                </div>
            </div>
            <img className={s.img} src={AlreadyDeposit} alt="" />
            <div className={s.tvlInfo}>
                <p>TVL</p>
                <p className={s.tvlAmount}>
                    {addCommas(formatUnits(spTVL, stableCoinDecimals))}
                    <span>{stableCoinName}</span>
                </p>
            </div>
            <div className={s.btnArea}>
                <div className={cx(s.btn, s.withdrawBtn)} onClick={toggleStartWithdraw}>Withdraw</div>
                <div className={s.btn} onClick={toggleStartDeposit}>Deposit</div>
            </div>
        </div>
    );
}

export default observer(DepositedOverView);
