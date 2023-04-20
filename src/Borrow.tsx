import { observer } from "mobx-react";
import { Spin } from 'antd';

import UserTroveShow from "src/components/Borrow/UserTroveShow";
import AdjustTrove from "src/components/Borrow/AdjustTrove";
import OpenTrove from "src/components/Borrow/OpenTrove";
import Repay from "src/components/Borrow/Repay";
import NewUser from 'src/components/Borrow/New';

import { useStore } from "src/hooks";

import s from "./Borrow.module.scss";
import { addCommas } from "./util";

const RightUI = observer(function RightUI() {
    const { store } = useStore();
    const { userTrove, startAdjustTrove, startBorrowStableCoin, startRepayStablecoin } = store;

    if (startAdjustTrove) {
        return <AdjustTrove />;
    }

    if (startRepayStablecoin) {
        return <Repay />;
    }

    if (startBorrowStableCoin) {
        return <OpenTrove />;
    }

    if (Boolean(userTrove)) {
        return <UserTroveShow />;
    }

    return <NewUser />;
})

function Borrow() {

    const { store } = useStore();
    const { supportAssets, isLoadingAssetSupport, protocolAssetsInfo, collateralValueInfo } = store;

    return (
        <div className={s.wrap}>
            <div className={s.left}>
                <p className={s.title}>Support Collateral</p>
                {isLoadingAssetSupport && (
                    <div className={s.loadingWrap}>
                        <Spin />
                    </div>
                )}
                {!isLoadingAssetSupport && (
                    <div className={s.assets}>
                        {supportAssets.map(asset => {
                            const assetPrice = collateralValueInfo[asset.tokenAddr] || 0;
                            const assetAmountInfo = protocolAssetsInfo.find(pa => pa.tokenAddr === asset.tokenAddr);

                            const value = assetPrice * (assetAmountInfo?.balance || 0);

                            return (
                                <div key={asset.assetName} className={s.asset}>
                                    <div className={s.assetName}>
                                        <img src={asset.icon} alt='asset icon' />
                                        <p>{asset.assetName}</p>
                                    </div>
                                    <div className={s.tokenInfo}>
                                        <p className={s.tokenTitle}>Token</p>
                                        <p className={s.tokenContent}>{asset.tokenName}</p>
                                    </div>
                                    <div className={s.depositInfo}>
                                        <p className={s.depositTitle}>Total Deposit</p>
                                        <p className={s.depositContent}>${" "}{addCommas(value)}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className={s.right}>
                <RightUI />
            </div>
        </div>
    );
}

export default observer(Borrow);
