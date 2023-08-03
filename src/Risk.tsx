import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Modal, Checkbox } from 'antd';
import cx from 'classnames';

import {
    getUserAgreeTerms,
    setUserAgreeTerms,
    getDoNotShowAgain,
    setDoNotShowAgain,
    clearDoNotShowAgain
} from 'src/util';

import s from './Risk.module.scss';

export default observer(function Risk() {
    const [termsA, setTermsA] = useState(false);
    const [termsB, setTermsB] = useState(false);
    const [neverShow, setNeverShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const neverShow = getDoNotShowAgain();
        if (!!neverShow) {
            return setShowAlert(false);
        }
        const didAgreeTerms = getUserAgreeTerms();
        setShowAlert(!didAgreeTerms);
    }, []);

    const handleAgree = () => {
        if (!termsA || !termsB) return;
        setUserAgreeTerms('Yes');
        setShowAlert(false);
    };

    const handleToggleDoNotShowAgain = (v: boolean) => {
        setNeverShow(v);
        if (v) {
            setDoNotShowAgain('true');
        } else {
            clearDoNotShowAgain();
        }
    };

    return (
        <Modal
            centered
            footer={null}
            closable={false}
            open={showAlert}
            wrapClassName={s.outWrap}
        >
            <div className={s.wrap}>
                <p className={s.title}>Risk Disclaimer</p>
                <div className={s.content}>
                    <p>
                        Ethereum Reserve Dollar, "ERD", protocol enables users to mint USDE using a selection of crypto-tokenized collaterals (adding new ones are subject to approval). Positions are managed passively: if the collateral's price decreases, the system automatically sells off collateral in a 'soft liquidation mode'. If the collateral's price increases, the system recovers the collateral. This process could lead to some losses due to liquidation and de-liquidation.
                    </p>
                    <br />
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
                <div className={s.termsArea}>
                    <div className={s.terms}>
                        <Checkbox checked={termsA} onChange={(e) => setTermsA(e.target.checked)} />
                        <p onClick={() => setTermsA(c => !c)}>I confirm that I have read, understand and accept the Terms of Use and the Risks Statement</p>
                    </div>
                    <div className={s.terms}>
                        <Checkbox checked={termsB} onChange={(e) => setTermsB(e.target.checked)} />
                        <p onClick={() => setTermsB(c => !c)}>I confirm that I do not fall under any of these exclusions</p>
                    </div>
                    <div className={s.terms}>
                        <Checkbox checked={neverShow} onChange={(e) => handleToggleDoNotShowAgain(e.target.checked)} />
                        <p onClick={() => handleToggleDoNotShowAgain(!neverShow)}>Don't show again</p>
                    </div>
                    <div
                        className={cx(s.btn, { [s.disable]: !termsA || !termsB })}
                        onClick={handleAgree}
                    >
                        Yes, I understand the risks.
                    </div>
                </div>
                <div className={s.audits}>
                    <p>Audits:{"\u00A0"}</p>
                    <a
                        href='https://github.com/Ethereum-ERD/ERD-Audits/blob/main/PeckShield-Audit-Report-ERD-v1.0.pdf'
                        rel="noreferrer noopenner"
                        target="_blank"
                    >
                        PeckShield
                    </a>
                    ,{"\u00A0"}
                    <a
                        href='https://github.com/Ethereum-ERD/ERD-Audits/blob/main/ERD_Ethereum_Reserve_Dollar_Smart_Contract_Security_Assessment_Report_Halborn_Final.pdf'
                        rel="noreferrer noopenner"
                        target="_blank"
                    >
                        Halborn
                    </a>
                </div>
            </div>
        </Modal>
    );
});
