import { observer } from 'mobx-react';
import { Routes, Route } from 'react-router-dom';

import LeaderBoard from 'src/LeaderBoard';
import Dashboard from 'src/Dashboard';
import Liquidate from "src/Liquidate";
import NotMatch from 'src/NotMatch';
import Deposit from "src/Deposit";
import Redeem from "src/Redeem";
import Mint from "src/Mint";

export default observer(function RouterComp() {
    return (
        <Routes>
            <Route index element={<Mint />} />
            <Route path='/liquidate' element={<Liquidate />} />
            <Route path='/deposit' element={<Deposit />} />
            <Route path='/redeem' element={<Redeem />} />
            <Route path='/statistics' element={<Dashboard />} />
            <Route path='/leaderboard' element={<LeaderBoard />} />
            <Route path='*' element={<NotMatch />} />
        </Routes>
    );
})
