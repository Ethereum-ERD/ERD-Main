import { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import { Skeleton } from 'antd';
import cx from 'classnames';
import { notification } from 'antd';

import { formatUnits, addCommas, OpenEtherScan } from 'src/util';
import MintTitle from 'src/components/common/MintTitle';
import { useStore } from 'src/hooks';

import s from './index.module.scss';

export default observer(function RedeemedTrove() {
    const { store } = useStore();
    const [isProcessing, setIsProcessing] = useState(false);
    const { stableCoinName, toggleStartBorrow, userCollateralInfo, supportAssets, userHasCollToClaimAfterRedeem, claimExistCollAfterHasBeenRedeemed } = store;

    const handleClick = useCallback(async () => {
        if (isProcessing) return;
        if (!userHasCollToClaimAfterRedeem) {
            toggleStartBorrow();
        } else {
            setIsProcessing(true);
            const result = await claimExistCollAfterHasBeenRedeemed();
            if (result.status) {
                notification.success({
                    message: 'Transaction complete',
                    onClick: () => OpenEtherScan(`/tx/${result.hash}`)
                });
            } else {
                notification.error({
                    message: result.msg || 'Transaction failed'
                });
            }
            setIsProcessing(false);
        }
    }, [
        isProcessing,
        toggleStartBorrow,
        userHasCollToClaimAfterRedeem,
        claimExistCollAfterHasBeenRedeemed
    ]);

    return <div className={s.wrap}>
        <MintTitle />
        <p className={s.titleDesc}>
            Deposit collateral to mint the {stableCoinName} stablecoin.
        </p>
        <div className={s.descWrap}>
            <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 21C16.799 21 21.5 16.299 21.5 10.5C21.5 4.70101 16.799 0 11 0C5.20101 0 0.5 4.70101 0.5 10.5C0.5 16.299 5.20101 21 11 21ZM10.0999 4.5H11.8998V6.29993H10.0999V4.5ZM10.2584 8.25H11.7584V16.4996H10.2584V8.25Z" fill="#666666"/>
            </svg>
            <p className={s.desc}>You have not minted {stableCoinName} yet.</p>
        </div>
        <div className={s.troveTips}>
            {userHasCollToClaimAfterRedeem ? 'Your Trove has been partially redeemed, please claim the remaining collateral as soon as possible.' : 'Your Trove has been fully redeemed.'}
        </div>
        <div className={s.balance}>
            <p className={s.balanceTitle}>Balances</p>
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
                                    <p className={s.assetAmount}>{addCommas(formatUnits(asset.balance, asset.tokenDecimals))}</p>
                                    <p className={s.assetTokenName}>{asset.tokenName}</p>
                                </div>
                            </div>
                        );
                    })}
                </Skeleton>
            </div>
        </div>
        <div
            className={cx(s.btn, s.disable, { [s.disable]: supportAssets.length < 1 })}
            onClick={handleClick}
        >
            {userHasCollToClaimAfterRedeem ? 'Claim' : 'Get Start'}
        </div>
    </div>
})
