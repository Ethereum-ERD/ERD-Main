import { observer } from "mobx-react";

import { addCommas, formatUint } from 'src/util';
import { useStore } from "src/hooks";

import s from './index.module.scss';

export default observer(function SupportAssetPopup() {
    const { store } = useStore();
    const { supportAssets, collateralValueInfo, protocolAssetsInfo } = store;

    return (
        <div className={s.wrap}>
            <p className={s.title}>Supported Collateral</p>
            <div className={s.columnHead}>
                <p className={s.assetNameTitle}>Collateral</p>
                <p className={s.tokenInfoTitle}>Token</p>
                <p className={s.depositInfoTitle}>Total Deposited</p>
            </div>
            <div className={s.assetList}>
                {supportAssets.map((asset) => {
                    const assetPrice = collateralValueInfo[asset.tokenAddr] || 0;
                    const assetAmountInfo = protocolAssetsInfo.find(
                        (pa) => pa.tokenAddr === asset.tokenAddr
                    );

                    const value = assetPrice * (assetAmountInfo?.balance || 0);

                    return (
                        <div key={asset.assetName} className={s.asset}>
                            <div className={s.assetName}>
                                <img src={asset.icon} alt={`${asset.assetName} icon`} />
                                <p>{asset.assetName}</p>
                            </div>
                            <div className={s.tokenInfo}>
                                <p className={s.tokenContent}>{asset.tokenName}</p>
                            </div>
                            <div className={s.depositInfo}>
                                <p className={s.depositContent}>
                                    $ {addCommas(formatUint(value))}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});
