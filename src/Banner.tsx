import { useMemo, useCallback } from "react";
import { observer } from "mobx-react";
// @ts-ignore
import { generateAvatarURL } from "@cfx-kit/wallet-avatar";
// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate, Link } from "react-router-dom";
import { Dropdown, message } from "antd";
import cx from "classnames";

import { formatNumber, OpenEtherScan } from "src/util";
import { EMPTY_ADDRESS, Routes } from "src/constants";
import { useStore } from "src/hooks";

import Copy from "src/asset/banner/copy-dark.svg";
import View from "src/asset/banner/view-dark.svg";
import Exit from "src/asset/banner/exit-dark.svg";
import MenuIcon from "src/asset/menu-icon.svg";
import Logo from "src/asset/logo.svg";

import s from "./Banner.module.scss";

const items = Routes.map((route) => {
    return {
        key: route.path,
        label: <Link to={route.path}>{route.name}</Link>,
    };
});

const trigger: any = ["click"];

function Banner() {
    const {
        store: {
            userTrove,
            walletAddr,
            userTotalPoints,
            displayWallet,
            connectWallet,
            currentRoutePath,
            disConnectWallet,
            stableCoinDecimals,
            toggleShowMobileAvatarMenu,
        },
    } = useStore();

    const navigate = useNavigate();

    const handleGo = useCallback(
        (path: string) => path && navigate(path),
        [navigate]
    );

    const WalletItems = useMemo(() => {
        return [
            {
                key: "Copy-Address",
                label: (
                    <CopyToClipboard
                        text={walletAddr}
                        onCopy={() => message.success("Copied")}
                    >
                        <div
                            className={cx(s.item, "popMenuItem")}
                            onClick={(e: any) => {
                                e.preventDefault();
                                e.stopPropagation();
                                e.nativeEvent.stopImmediatePropagation();
                            }}
                        >
                            <img src={Copy} alt="copy icon" />
                            Copy Address
                        </div>
                    </CopyToClipboard>
                ),
            },
            {
                key: "View-on-explore",
                label: (
                    <div className={cx(s.item, "popMenuItem")}>
                        <img src={View} alt="view on explore" />
                        <div
                            onClick={() =>
                                OpenEtherScan(`/address/${walletAddr}`)
                            }
                        >
                            View on Explorer
                        </div>
                    </div>
                ),
            },
            {
                key: "Disconnect",
                label: (
                    <div
                        onClick={disConnectWallet}
                        className={cx(s.item, "popMenuItem")}
                    >
                        <img src={Exit} alt="disconnect" />
                        Disconnect
                    </div>
                ),
            },
        ];
    }, [walletAddr, disConnectWallet]);

    return (
        <div className={s.wrap}>
            <div className={s.container}>
                <div className={s.leftWrap}>
                    <div className={s.brandWrap} onClick={() => handleGo("/")}>
                        <img src={Logo} alt="" />
                    </div>
                    <div className={s.tabs}>
                        {Routes.map((route) => {
                            const isActive = currentRoutePath === route.path;
                            return (
                                <p
                                    key={route.name}
                                    onClick={() => handleGo(route.path)}
                                    className={cx(s.tab, {
                                        [s.active]: isActive,
                                    })}
                                >
                                    {route.name}
                                </p>
                            );
                        })}
                    </div>
                </div>
                <div className={s.padTabsWrap}>
                    {Routes.map((route) => {
                        const isActive = currentRoutePath === route.path;
                        return (
                            <p
                                key={route.name}
                                onClick={() => handleGo(route.path)}
                                className={cx(s.tab, {
                                    [s.active]: isActive,
                                })}
                            >
                                {route.name}
                            </p>
                        );
                    })}
                </div>
                <div className={s.rightWrap}>
                    <div className={s.accountInfo}>
                        <div className={s.accountInfoItem}>
                            <span>Total Points</span>
                            <p>{formatNumber(userTotalPoints)}</p>
                        </div>
                        <div className={s.accountInfoItem}>
                            <span>Total Debt</span>
                            <p>
                                {formatNumber(
                                    (userTrove?.debt || 0) /
                                        Math.pow(10, stableCoinDecimals)
                                )}
                            </p>
                        </div>
                    </div>
                    {walletAddr && (
                        <Dropdown
                            arrow={false}
                            menu={{ items: WalletItems }}
                            trigger={trigger}
                            placement="bottomRight"
                            rootClassName={s.popMenuRoot}
                        >
                            <div className={s.walletAddr}>{displayWallet}</div>
                        </Dropdown>
                    )}
                    {!walletAddr && (
                        <div className={s.walletAddr} onClick={connectWallet}>
                            {displayWallet}
                        </div>
                    )}
                </div>
                <div className={s.mobileIcons}>
                    <Dropdown
                        arrow={false}
                        menu={{ items }}
                        trigger={trigger}
                        placement="bottomRight"
                        rootClassName={s.popMenuRoot}
                    >
                        <div className={s.menuIcon}>
                            <img src={MenuIcon} alt="" />
                        </div>
                    </Dropdown>
                    {walletAddr && (
                        <div
                            className={s.avatar}
                            onClick={toggleShowMobileAvatarMenu}
                        >
                            <img src={generateAvatarURL(walletAddr)} alt="" />
                        </div>
                    )}
                    {!walletAddr && (
                        <div className={s.avatar} onClick={connectWallet}>
                            <img
                                src={generateAvatarURL(EMPTY_ADDRESS)}
                                alt=""
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default observer(Banner);
