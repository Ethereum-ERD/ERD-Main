import { observer } from 'mobx-react';
import { Skeleton } from 'antd';

import MintTitle from 'src/components/common/MintTitle';
import { formatUnits } from 'src/util';
import { useStore } from 'src/hooks';

import s from './index.module.scss';

export default observer(function New() {
    const { store } = useStore();
    const { stableCoinName, toggleStartBorrow, userCollateralInfo } = store;

    return <div className={s.wrap}>
        <MintTitle />
        <p className={s.titleDesc}>
            Deposit collateral to mint {stableCoinName} stablecoin.
        </p>
        <div className={s.descWrap}>
            <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 21C16.799 21 21.5 16.299 21.5 10.5C21.5 4.70101 16.799 0 11 0C5.20101 0 0.5 4.70101 0.5 10.5C0.5 16.299 5.20101 21 11 21ZM10.0999 4.5H11.8998V6.29993H10.0999V4.5ZM10.2584 8.25H11.7584V16.4996H10.2584V8.25Z" fill="#666666"/>
            </svg>
            <p className={s.desc}>You haven't minted any {stableCoinName} yet.</p>
        </div>
        <p className={s.tips}>You can mint {stableCoinName} by deposit collateral.</p>
        <div className={s.balance}>
            <p className={s.balanceTitle}>Balance</p>
            <div className={s.userAssetList}>
                <Skeleton active loading={userCollateralInfo.length < 1}>
                    {userCollateralInfo.map(asset => {
                        return (
                            <div key={asset.assetName} className={s.asset}>
                                <div className={s.assetInfo}>
                                    <img src={asset.icon} alt={`${asset.assetName} icon`} />
                                    <p className={s.assetName}>{asset.assetName}</p>
                                </div>
                                <div className={s.tokenInfo}>
                                    <p className={s.assetAmount}>{formatUnits(asset.balance, asset.tokenDecimals)}</p>
                                    <p className={s.assetTokenName}>{asset.tokenName}</p>
                                </div>
                            </div>
                        );
                    })}
                </Skeleton>
            </div>
        </div>
        <div className={s.btn} onClick={toggleStartBorrow}>Start</div>
    </div>
})
