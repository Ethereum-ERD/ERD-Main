import { observer } from "mobx-react";
import { notification } from 'antd';

import { useStore } from "src/hooks";

import DepositedOverView from "src/components/Deposit/DepositedOverView";
import ClaimRewards from "src/components/Deposit/ClaimRewards";
import NotDeposit from 'src/components/Deposit/NotDeposit';
import NewDeposit from 'src/components/Deposit/NewDeposit';
import ReDeposit from "src/components/Deposit/ReDeposit";
import Withdraw from "src/components/Deposit/Withdraw";

import s from "./Deposit.module.scss";

const DisplayUI = observer(function DisplayUI() {
    const { store } = useStore();
    const { didUserDeposited, startDeposit, startWithdraw } = store;

    if (didUserDeposited) {
        if (startWithdraw) {
            return <Withdraw />;
        }
        if (startDeposit) {
            return <ReDeposit />;
        }

        return <DepositedOverView />;
    }

    if (startDeposit) {
        return <NewDeposit />;
    }

    return <NotDeposit />;
});

function Deposit() {
    const { store } = useStore();
    const {
        startClaimRewards,
        toggleStartClaimRewards,
        isClaimRewardIng,
        isClaimRewardToTroveIng,
        claimDepositReward,
        claimRewardAndMoveToTrove
    } = store;

    const claimRewards = async () => {
        if (isClaimRewardIng) return;
        const result = await claimDepositReward();
        if (result) {
            notification.success({
                message: "transaction done.",
            });
        } else {
            notification.error({
                message: "transaction failed.",
            });
        }
    };

    const claimRewardsToTrove = async () => {
        if (isClaimRewardToTroveIng) return;
        const result = await claimRewardAndMoveToTrove();
        if (result) {
            notification.success({
                message: "transaction done.",
            });
        } else {
            notification.error({
                message: "transaction failed.",
            });
        }
    };

    return (
        <div className={s.wrap}>
            <DisplayUI />
            <ClaimRewards
                open={startClaimRewards}
                onClose={toggleStartClaimRewards}
                onLeftBtnClick={claimRewardsToTrove}
                onRightBtnClick={claimRewards}
            />
        </div>
    );
}

export default observer(Deposit);