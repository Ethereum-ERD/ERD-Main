import { observer } from 'mobx-react';
import { Routes, Route } from 'react-router-dom';

import Liquidate from "src/Liquidate";
import NotMatch from 'src/NotMatch';
import Deposit from "src/Deposit";
import Redeem from "src/Redeem";
import Borrow from "src/Borrow";

export default observer(function RouterComp() {
    return (
        <Routes>
            <Route index element={<Borrow />} />
            <Route path='/liquidate' element={<Liquidate />} />
            <Route path='/deposit' element={<Deposit />} />
            <Route path='/redeem' element={<Redeem />} />
            <Route path='*' element={<NotMatch />} />
        </Routes>
    );
})
