import { observer } from "mobx-react";
import { useNavigate, Link } from "react-router-dom";
import { Dropdown } from 'antd';
import cx from 'classnames';

import { Routes } from 'src/constants';
import { useStore } from "src/hooks";

import WalletIcon from 'src/asset/wallet-icon.svg';
import AssetIcon from 'src/asset/asset-icon.svg';
import MenuIcon from 'src/asset/menu-icon.svg';
import Logo from 'src/asset/logo.svg';

import s from "./Banner.module.scss";

const items = Routes.map(route => {
    return {
        key: route.path,
        label: (
            <Link to={route.path}>
                {route.name}
            </Link>
        )
    };
});

const trigger: any = ['click'];

function Banner() {

    const { store: { displayWallet, currentRoutePath, connectWallet, toggleShowSupportAsset } } = useStore();

    const navigate = useNavigate();

    const handleGo = (path: string) => navigate(path);

    return (
        <div className={s.wrap}>
            <div className={s.container}>
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
                <div className={s.mobileIcons}>
                    <div onClick={toggleShowSupportAsset}>
                        <img src={AssetIcon} alt="" />
                    </div>
                    <Dropdown
                        arrow={false}
                        menu={{ items }}
                        trigger={trigger}
                        placement="bottomRight"
                        rootClassName={s.popMenuRoot}
                    >
                        <div>
                            <img src={MenuIcon} alt="" />
                        </div>
                    </Dropdown>
                    <div>
                        <img src={WalletIcon} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default observer(Banner);
