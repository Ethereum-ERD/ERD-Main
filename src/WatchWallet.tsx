import { useEffect } from "react";
import { observer } from "mobx-react";

import { saveWallet } from 'src/wallet';
import { useStore } from "src/hooks";

export default observer(function WatchWallet() {
    const { store } = useStore();

    const { isInit, onboard, onAccountChange, onChainChange, onProviderChange } = store;

    useEffect(() => {
        if (!isInit || !onboard) return;

        const state = onboard.state.select('wallets');
        // @ts-ignore
        const { unsubscribe } = state.subscribe(([wallet]) => {
            if (wallet) {
                const { label, accounts, provider, chains } = wallet;
                saveWallet(label);
                onChainChange(chains);
                onProviderChange(provider);
                onAccountChange(accounts);
            } else {
                onChainChange([]);
                onAccountChange([]);
            }
        });
        return unsubscribe;
    }, [isInit, onboard, onAccountChange, onChainChange, onProviderChange]);

    return null;
});
