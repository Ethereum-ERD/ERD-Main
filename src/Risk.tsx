import { observer } from 'mobx-react';

import s from './Risk.module.scss';

export default observer(function Risk() {
    return (
        <div className={s.wrap}>
            <p className={s.title}>Risk Disclaimer</p>
            <p>
                Ethereum Reserve Dollar, “ERD,” protocol enables users to mint USDE using a selection of crypto-tokenized collaterals (adding new ones are subject to approval). Positions are managed passively: if the collateral's price decreases, the system automatically sells off collateral in a ‘soft liquidation mode.’ If the collateral's price increases, the system recovers the collateral. This process could lead to some losses due to liquidation and de-liquidation.
            </p>
            <p>Please consider the following risk disclaimers when using the ERD protocol:</p>
            <ol className={s.list}>
                <li className={s.first}>
                    <ol>
                        <li>
                            If your collateral enters soft-liquidation mode, you cannot withdraw it or add more collateral to your position.
                        </li>
                        <li>
                            Should the price of the collateral change drop sharply over a short time interval, it can result in large losses that may reduce your loan's health.
                        </li>
                        <li>
                            If you are in soft-liquidation mode and the price of the collateral increases sharply, this can result in de-liquidation losses on the way up. If your loan's health is low, rising collateral value could potentially reduce your underwater loan's health.
                        </li>
                        <li>
                            If the health of your loan drops to zero or below, your position will get hard-liquidated with no option of de-liquidation. Please choose your leverage wisely, as you would with any collateralized debt position.
                        </li>
                    </ol>
                </li>
                <li>
                    The USDE stablecoin and its underlying protocol are currently in beta testing. As a result, investing in USDE carries high risk and could lead to partial or complete loss of your investment due to its experimental nature. You are responsible for understanding the associated risks of buying, selling, and using USDE and its underlying protocol.
                </li>
                <li>
                    The value of USDE can fluctuate due to stablecoin market volatility or rapid changes in the liquidity of the stablecoin.
                </li>
                <li>
                    USDE is exclusively issued by smart contracts, without an intermediary. However, the parameters that ensure the proper operation of the USDE stablecoin and its underlying protocol are subject to updates. Users must stay informed about any parameter changes in the stablecoin infrastructure.
                </li>
            </ol>
        </div>
    );
});
