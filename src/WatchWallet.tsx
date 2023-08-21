import { useEffect } from "react";
import { observer } from "mobx-react";

import { saveWallet } from 'src/wallet';
import { useStore } from "src/hooks";

export default observer(function WatchWallet() {
    const { store } = useStore();

    const { isInit, onboard, onAccountChange, onChainChange, onProviderChange } = store;

    useEffect(() => {
        if (!isInit || !onboard) return;

        const walletSub = onboard.state.select('wallets');
        // @ts-ignore
        const { unsubscribe } = walletSub.subscribe(([wallet]) => {
            if (wallet) {
                const { label, accounts, provider, chains } = wallet;
                saveWallet(label);
                // @ts-ignore
                onProviderChange(provider);
                onAccountChange(accounts);
                onChainChange(chains.map((x: any) => ({ ...x, label })));
            } else {
                onChainChange([]);
                onAccountChange([]);
            }
        });
        return unsubscribe;
    }, [isInit, onboard, onAccountChange, onChainChange, onProviderChange]);

    return null;
});
