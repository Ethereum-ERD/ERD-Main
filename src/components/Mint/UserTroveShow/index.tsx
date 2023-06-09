import { useMemo } from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';

import MintTitle from 'src/components/common/MintTitle';
import { addCommas, formatUnits } from 'src/util';
import { useStore } from 'src/hooks';

import s from './index.module.scss';

export default observer(function UserTroveShow() {
    const { store } = useStore();
    const { userPoolShare, userTrove, stableCoinDecimals, stableCoinName, toggleStartRepay, toggleStartAdjustTrove, spTVL, userDepositAmount, gasCompensation, systemCCR, systemMCR } = store;

    const crClasses = useMemo(() => {
        const classes = [];
        const icr = userTrove.ICR;

        if (icr > systemCCR) {
            classes.push(s.health);
        } else if (icr > systemMCR) {
            classes.push(s.warning);
        } else {
            classes.push(s.emergency);
        }
        return classes;
    }, [userTrove, systemCCR, systemMCR]);

    return (
        <div className={s.wrap}>
            <MintTitle />
            <p className={s.titleDesc}>Deposit collateral to mint {stableCoinName} stablecoin.</p>
            <div className={s.info}>
                <div className={s.item}>
                    <p>Total Debt</p>
                    <p>
                        {addCommas(formatUnits(userTrove.debt, stableCoinDecimals))}
                        <span>{stableCoinName}</span>
                    </p>
                </div>
                <div className={s.item}>
                    <p>Total Interest</p>
                    <p>
                        {addCommas(formatUnits(userTrove.interest, stableCoinDecimals))}
                        <span>{stableCoinName}</span>
                    </p>
                </div>
                <div className={s.item}>
                    <div>
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 3.32082L9.32986 2.10178C11.2131 0.375483 14.25 1.71142 14.25 4.26616C14.25 5.04487 13.9407 5.79168 13.39 6.34232L8 11.7323L2.60997 6.34232C2.05934 5.79169 1.75 5.04487 1.75 4.26616C1.75 1.71142 4.7869 0.375483 6.67014 2.10178L8 3.32082ZM7.5148 1.18034C4.82981 -1.2809 0.5 0.623791 0.5 4.26616C0.5 5.37639 0.941038 6.44115 1.72609 7.2262L7.81787 13.318C7.91846 13.4186 8.08154 13.4186 8.18213 13.318L14.2739 7.2262C15.059 6.44115 15.5 5.37639 15.5 4.26616C15.5 0.62379 11.1702 -1.2809 8.4852 1.18034L8 1.62511L7.5148 1.18034Z" fill="white" fillOpacity="0.7"/>
                        </svg>
                        <p>Collateral ratio</p>
                    </div>
                    <p>
                        <span className={cx(s.cr, crClasses)}>{(userTrove.ICR * 100).toFixed(2)}</span>
                        <span>%</span>
                    </p>
                </div>
                <div className={s.item}>
                    <p>Liquidation Reserve</p>
                    <p>
                        {formatUnits(gasCompensation, stableCoinDecimals)}
                        <span>{stableCoinName}</span>
                    </p>
                </div>
                <div className={s.item}>
                    <p>Stability Pool Share</p>
                    <p>{(userPoolShare).toFixed(6)}<span>%</span></p>
                </div>
                {userTrove.collateral.map(coll => {
                    return (
                        <div key={coll.tokenAddr} className={s.collateralItem}>
                            <div className={s.collateralItemHead}>
                                <img src={coll.icon} alt='' />
                                <p className={s.assetName}>{coll.assetName}</p>
                            </div>
                            <div className={s.collateralItemBody}>
                                {formatUnits(+coll.amount, coll.tokenDecimals)}
                                <span className={s.tokenName}>{coll.tokenName}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={s.btnArea}>
                <div className={cx(s.btn, s.repay)} onClick={toggleStartRepay}>Close</div>
                <div className={s.btn} onClick={toggleStartAdjustTrove}>Adjust</div>
            </div>
        </div>
    );
})
