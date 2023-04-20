import { useEffect } from 'react';
import { observer } from 'mobx-react';

import { useStore } from 'src/hooks';

export default observer(function WatchConnect() {
    const { store: { isInit, walletAddr, connectWallet } } = useStore();

    useEffect(() => {
        if (isInit && !walletAddr) {
            connectWallet();
        }
    }, [isInit, walletAddr, connectWallet]);

    return null;
});
