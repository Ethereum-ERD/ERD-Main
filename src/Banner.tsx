import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import cx from 'classnames';

import { Routes } from 'src/constants';
import { useStore } from "src/hooks";

import Logo from 'src/asset/logo.svg';

import s from "./Banner.module.scss";

function Banner() {

    const { store: { displayWallet, currentRoutePath, connectWallet } } = useStore();

    const navigate = useNavigate();

    const handleGo = (path: string) => navigate(path);

    return (
        <div className={s.wrap}>
            <div className={s.leftWrap}>
                <img src={Logo} alt="" />
            </div>
            <div className={s.tabs}>
                {Routes.map(route => {
                    const isActive = currentRoutePath === route.path;
                    return (
                        <p
                            key={route.name}
                            onClick={() => handleGo(route.path)}
                            className={cx(s.tab, { [s.active]: isActive })}
                        >
                            {route.name}
                        </p>
                    );
                })}
            </div>
            <div className={s.walletAddr} onClick={connectWallet}>
                {displayWallet}
            </div>
        </div>
    );
}

export default observer(Banner);
