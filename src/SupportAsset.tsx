import { observer } from "mobx-react";

import { Modal } from "antd";

import { addCommas, formatUint } from 'src/util';
import { useStore } from "src/hooks";

import s from './SupportAsset.module.scss';

export default observer(function SupportAsset() {
    const { store } = useStore();
    const { supportAssets, showSupportAsset, collateralValueInfo, protocolAssetsInfo, toggleShowSupportAsset } = store;

    return (
        <Modal
            centered
            footer={null}
            closable={false}
            open={showSupportAsset}
            rootClassName={s.maskRoot}
            onCancel={toggleShowSupportAsset}
        >
            <p className={s.title}>Supported Collateral</p>
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
                                <img src={asset.icon} alt="asset icon" />
                                <p>{asset.assetName}</p>
                            </div>
                            <div className={s.tokenInfo}>
                                <p className={s.tokenTitle}>Token</p>
                                <p className={s.tokenContent}>{asset.tokenName}</p>
                            </div>
                            <div className={s.depositInfo}>
                                <p className={s.depositTitle}>Total Deposited</p>
                                <p className={s.depositContent}>
                                    $ {addCommas(formatUint(value))}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Modal>
    );
});
