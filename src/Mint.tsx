import { observer } from "mobx-react";

import UserTroveShow from "src/components/Mint/UserTroveShow";
import AdjustTrove from "src/components/Mint/AdjustTrove";
import OpenTrove from "src/components/Mint/OpenTrove";
import Repay from "src/components/Mint/Repay";
import NewUser from 'src/components/Mint/New';

import { useStore } from "src/hooks";

import s from "./Mint.module.scss";

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

export default observer(function Mint() {

    return (
        <div className={s.wrap}>
            <div className={s.container}>
                <RightUI />
            </div>
        </div>
    );
});
