import { observer } from "mobx-react";

import { Modal } from "antd";

import { useStore } from "src/hooks";
import { addCommas } from 'src/util';

import s from './SupportAsset.module.scss';

const maskStyle = {
    background: 'rgba(0, 0, 0, .5)',
    'backdropFilter': 'blur(5px)',
    'WebkitBackdropFilter': 'blur(5px)'
};

const bodyStyle = {
    padding: '20px',
    background: '#fff',
    borderRadius: '20px'
};

export default observer(function SupportAsset() {
    const { store } = useStore();
    const { supportAssets, showSupportAsset, collateralValueInfo, protocolAssetsInfo, toggleShowSupportAsset } = store;

    return (
        <Modal
            centered
            footer={null}
            closable={false}
            maskStyle={maskStyle}
            bodyStyle={bodyStyle}
            open={showSupportAsset}
            onCancel={toggleShowSupportAsset}
        >
            <p className={s.title}>Support Collateral</p>
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
                            <p className={s.depositTitle}>Total Deposit</p>
                            <p className={s.depositContent}>
                                $ {addCommas(value)}
                            </p>
                        </div>
                    </div>
                );
            })}
        </Modal>
    );
});
