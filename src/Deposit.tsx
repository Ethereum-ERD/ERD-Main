import { observer } from "mobx-react";
import { notification } from 'antd';

import { OpenEtherScan } from 'src/util';
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
        claimRewardAndMoveToTrove,
        userCanClaimDepositRewards
    } = store;

    const claimRewards = async () => {
        if (isClaimRewardIng || !userCanClaimDepositRewards) return;
        const result = await claimDepositReward();
        if (result.status) {
            notification.success({
                message: "Transaction complete",
                onClick: () => OpenEtherScan(`https://goerli.etherscan.io/tx/${result.hash}`)
            });
        } else {
            notification.error({
                message: "Transaction failed",
            });
        }
    };

    const claimRewardsToTrove = async () => {
        if (isClaimRewardToTroveIng || !userCanClaimDepositRewards) return;
        const result = await claimRewardAndMoveToTrove();
        if (result.status) {
            notification.success({
                message: "Transaction complete",
                onClick: () => OpenEtherScan(`https://goerli.etherscan.io/tx/${result.hash}`)
            });
        } else {
            notification.error({
                message: "Transaction failed",
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
