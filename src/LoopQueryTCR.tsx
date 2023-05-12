import { useEffect } from 'react';
import { observer } from 'mobx-react';

import { useStore } from 'src/hooks';

export default observer(function LoopQueryTCR() {
    const { store: { isInit, querySystemTCR } } = useStore();

    useEffect(() => {
        if (!isInit) return;
        const timer = setInterval(() => {
            querySystemTCR(true);
        }, 15 * 1000);

        return () => clearInterval(timer);
    }, [isInit, querySystemTCR]);

    return null;
});
