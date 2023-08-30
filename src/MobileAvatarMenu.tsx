import { observer } from "mobx-react";

import { Modal } from "antd";

// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";
import { message } from "antd";

import { addCommas, formatUnits } from "src/util";
import { useStore } from "src/hooks";

import Copy from "src/asset/banner/copy.svg";
import View from "src/asset/banner/view.svg";
import Exit from "src/asset/banner/exit.svg";

import s from "./MobileAvatarMenu.module.scss";

export default observer(function MobileAvatarMenu() {
    const { store } = useStore();
    const {
        userScores,
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
                    <span>My Points</span>
                    <p>{userScores}</p>
                </div>
                <div className={s.accountInfoItem}>
                    <span>My Debt</span>
                    <p>
                        {addCommas(
                            formatUnits(
                                userTrove?.debt || 0,
                                stableCoinDecimals || 18
                            )
                        )}
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
                    <a
                        href={`https://goerli.etherscan.io/address/${walletAddr}`}
                        rel="noreferrer noopenner"
                        target="_blank"
                    >
                        View on Explorer
                    </a>
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
