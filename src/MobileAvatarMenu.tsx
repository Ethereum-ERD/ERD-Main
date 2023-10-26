import { observer } from "mobx-react";

import { Modal } from "antd";

// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";
import { message } from "antd";

import { OpenEtherScan, formatNumber } from "src/util";
import { useStore } from "src/hooks";

import Copy from "src/asset/banner/copy.svg";
import View from "src/asset/banner/view.svg";
import Exit from "src/asset/banner/exit.svg";

import s from "./MobileAvatarMenu.module.scss";

export default observer(function MobileAvatarMenu() {
    const { store } = useStore();
    const {
        userTotalPoints,
        userTrove,
        walletAddr,
        disConnectWallet,
        stableCoinDecimals,
        showMobileAvatarMenu,
        toggleShowMobileAvatarMenu,
    } = store;

    return (
        <Modal
            centered
            footer={null}
            closable={false}
            rootClassName={s.maskRoot}
            open={showMobileAvatarMenu}
            onCancel={toggleShowMobileAvatarMenu}
        >
            <div className={s.accountInfo}>
                <div className={s.accountInfoItem}>
                    <span>Total Points</span>
                    <p>{formatNumber(userTotalPoints)}</p>
                </div>
                <div className={s.accountInfoItem}>
                    <span>Total Debt</span>
                    <p>
                        {formatNumber((userTrove?.debt || 0) / Math.pow(10, stableCoinDecimals))}
                    </p>
                </div>
            </div>
            <div className={s.split} />
            <div className={s.menuList}>
                <CopyToClipboard
                    text={walletAddr}
                    onCopy={() => message.success("Copied")}
                >
                    <div
                        className={s.item}
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
                <div className={s.item}>
                    <img src={View} alt="view on explore" />
                    <div onClick={() => OpenEtherScan(`/address/${walletAddr}`)}>
                        View on Explorer
                    </div>
                </div>
                <div onClick={() => {
                        disConnectWallet();
                        toggleShowMobileAvatarMenu()
                    }}
                    className={s.item}
                >
                    <img src={Exit} alt="disconnect" />
                    Disconnect
                </div>
            </div>
        </Modal>
    );
});
