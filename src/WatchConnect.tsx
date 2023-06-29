import { useEffect } from "react";
import { observer } from "mobx-react";

import { useStore } from "src/hooks";

export default observer(function WatchConnect() {
    const { store: { isInit, connectWallet } } = useStore();

    useEffect(() => {
        if (isInit) {
            connectWallet();
        }
    }, [isInit, connectWallet]);

    return null;
});
