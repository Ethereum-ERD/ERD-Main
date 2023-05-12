import { useEffect } from 'react';
import { observer } from 'mobx-react';

import { useStore } from 'src/hooks';

export default observer(function LoopQuerySystemInfo() {
    const { store: { isInit, querySystemTCR, querySystemTotalValueAndDebt } } = useStore();

    useEffect(() => {
        if (!isInit) return;
        const timer = setInterval(() => {
            querySystemTCR(true);
            querySystemTotalValueAndDebt();
        }, 15 * 1000);

        return () => clearInterval(timer);
    }, [isInit, querySystemTCR, querySystemTotalValueAndDebt]);

    return null;
});
