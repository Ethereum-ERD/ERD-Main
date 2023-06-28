import { useEffect } from 'react';
import { observer } from 'mobx-react';

import { useStore } from 'src/hooks';

export default observer(function LoopQuerySystemInfo() {
    const { store: { isInit, querySystemTCR, queryUserDepositGain, querySystemTotalValueAndDebt } } = useStore();

    useEffect(() => {
        if (!isInit) return;

        const fn = () => {
            querySystemTCR(true);
            queryUserDepositGain();
            querySystemTotalValueAndDebt();
        };

        fn();

        const timer = setInterval(fn, 15 * 1000);

        return () => clearInterval(timer);
    }, [isInit, querySystemTCR, queryUserDepositGain, querySystemTotalValueAndDebt]);

    return null;
});
