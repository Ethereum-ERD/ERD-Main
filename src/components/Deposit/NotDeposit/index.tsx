import { observer } from "mobx-react";
import cx from 'classnames';
import { Skeleton } from 'antd';

import { useStore } from "src/hooks";

import { formatUnits, addCommas, truncateDecimal } from 'src/util';
import DepositTitle from "src/components/common/DepositTitle";

import s from "./index.module.scss";

function NotDeposit() {

    const { store } = useStore();
    const { stableCoinName, stableCoinDecimals, userStableCoinBalance, toggleStartDeposit, toggleStartClaimRewards, userCanClaimDepositRewards, userDepositRewardsInfo } = store;

    return (
        <div className={s.wrap}>
            <DepositTitle />
            <div className={s.descWrap}>
                <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 21C16.799 21 21.5 16.299 21.5 10.5C21.5 4.70101 16.799 0 11 0C5.20101 0 0.5 4.70101 0.5 10.5C0.5 16.299 5.20101 21 11 21ZM10.0999 4.5H11.8998V6.29993H10.0999V4.5ZM10.2584 8.25H11.7584V16.4996H10.2584V8.25Z" fill="#666666"/>
                </svg>
                <p className={s.desc}>You haven't deposited any {stableCoinName} yet.</p>
            </div>
            <p className={s.tips}>You can borrow {stableCoinName} by depositing collateral. deposit {stableCoinName} to earn liquidation income.</p>
            <div className={s.balanceInfo}>
                <p>Balance</p>
                <p className={s.balanceAmount}>
                    {addCommas(formatUnits(userStableCoinBalance, stableCoinDecimals))}
                    <span>{stableCoinName}</span>
                </p>
            </div>
            <div className={s.rewardInfo}>
                <p className={s.rewardInfoTitle}>Total Unclaimed Rewards</p>
                <Skeleton active loading={userDepositRewardsInfo.length < 1}>
                    <div className={s.rewardList}>
                        {userDepositRewardsInfo.map(token => (
                            <div key={token.tokenAddr} className={s.rewardItem}>
                                    <div className={s.rewardItemHead}>
                                        <img src={token.icon} alt='' />
                                        <p>{token.assetName}</p>
                                    </div>
                                    <div className={s.rewardItemBody}>
                                        <p>{truncateDecimal(+formatUnits(token.rewards, token.tokenDecimals))}</p>
                                        <p>{token.tokenName}</p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </Skeleton>
            </div>
            <div className={s.btnArea}>
                <div
                    className={cx(s.claimBtn, { [s.disable]: !userCanClaimDepositRewards })}
                    onClick={() => {
                        if (!userCanClaimDepositRewards) return;
                        toggleStartClaimRewards();
                    }}
                >
                    Claim Rewards
                </div>
                <div className={s.btn} onClick={toggleStartDeposit}>Deposit</div>
            </div>
        </div>
    );
}

export default observer(NotDeposit);
