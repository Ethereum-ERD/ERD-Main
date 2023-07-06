import { observer } from "mobx-react";
// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate, Link } from "react-router-dom";
import { Dropdown, message } from 'antd';
import cx from 'classnames';

import { Routes } from 'src/constants';
import { useStore } from "src/hooks";

import WalletIcon from 'src/asset/wallet-icon.svg';
import AssetIcon from 'src/asset/asset-icon.svg';
import MenuIcon from 'src/asset/menu-icon.svg';
import Copy from 'src/asset/banner/copy.svg';
import View from 'src/asset/banner/view.svg';
import Exit from 'src/asset/banner/exit.svg';
import Logo from 'src/asset/logo.svg';

import s from "./Banner.module.scss";
import { useMemo } from "react";

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

    const { store: { displayWallet, walletAddr, connectWallet, currentRoutePath, disConnectWallet, toggleShowSupportAsset } } = useStore();

    const navigate = useNavigate();

    const handleGo = (path: string) => path && navigate(path);

    const WalletItems = useMemo(() => {
        return [
            {
                key: 'Copy-Address',
                label: (
                    <CopyToClipboard
                        text={walletAddr}
                        onCopy={() => message.success('Copy successfully')}
                    >
                        <div
                            className={s.item}
                            onClick={(
                                e: any
                            ) => {
                                e.preventDefault();
                                e.stopPropagation();
                                e.nativeEvent.stopImmediatePropagation();
                            }}
                        >
                            <img src={Copy} alt="copy icon" />
                            Copy Address
                        </div>
                    </CopyToClipboard>
                )
            },
            {
                key: 'View-on-explore',
                label: (
                    <div className={s.item}>
                        <img src={View} alt='view on explore' />
                        <a
                            href={`https://goerli.etherscan.io/address/${walletAddr}`}
                            rel="noreferrer noopenner"
                            target="_blank"
                        >
                            View on Explorer
                        </a>
                    </div>
                )
            },
            {
                key: 'disconnect',
                label: (
                    <div onClick={disConnectWallet} className={s.item}>
                        <img src={Exit} alt='disconnect' />
                        Disconnect
                    </div>
                )
            }
        ];
    }, [walletAddr, disConnectWallet]);

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
                {walletAddr && (
                    <Dropdown
                            arrow={false}
                            menu={{ items: WalletItems }}
                            trigger={trigger}
                            placement="bottomRight"
                            rootClassName={s.popMenuRoot}
                        >
                        <div className={s.walletAddr}>
                            {displayWallet}
                        </div>
                    </Dropdown>
                )}

                {!walletAddr && (
                    <div className={s.walletAddr} onClick={connectWallet}>
                        {displayWallet}
                    </div>
                )}
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
                    {walletAddr && (
                        <Dropdown
                            arrow={false}
                            menu={{ items: WalletItems }}
                            trigger={trigger}
                            placement="bottomRight"
                            rootClassName={s.popMenuRoot}
                        >
                            <div>
                                <img src={WalletIcon} alt="" />
                            </div>
                        </Dropdown>
                    )}
                    {!walletAddr && (
                        <div onClick={connectWallet}>
                            <img src={WalletIcon} alt="" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default observer(Banner);
