import { observer } from "mobx-react";

import LiquidatedTrove from "src/components/Mint/LiquidatedTrove";
import RedeemedTrove from "src/components/Mint/RedeemedTrove";
import UserTroveShow from "src/components/Mint/UserTroveShow";
import AdjustTrove from "src/components/Mint/AdjustTrove";
import CloseTrove from "src/components/Mint/CloseTrove";
import OpenTrove from "src/components/Mint/OpenTrove";
import NewUser from 'src/components/Mint/New';

import { TroveStatus } from 'src/types';
import { useStore } from "src/hooks";

import s from "./Mint.module.scss";

const RightUI = observer(function RightUI() {
    const { store } = useStore();
    const { userTrove, startAdjustTrove, startBorrowStableCoin, startRepayStablecoin } = store;

    if (startAdjustTrove) {
        return <AdjustTrove />;
    }

    if (startRepayStablecoin) {
        return <CloseTrove />;
    }

    if (startBorrowStableCoin) {
        return <OpenTrove />;
    }

    if (+(userTrove?.status) === TroveStatus.ClosedByRedemption) {
        return <RedeemedTrove />;
    }

    if (+(userTrove?.status) === TroveStatus.ClosedByLiquidation) {
        return <LiquidatedTrove />;
    }

    if (+(userTrove?.status) === TroveStatus.Active) {
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
