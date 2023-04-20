import { useEffect } from "react";
import { observer } from "mobx-react";

import WatchConnect from "src/WatchConnect";
import WatchWallet from "src/WatchWallet";
import RouterComp from 'src/RouterComp';
import { useStore } from "src/hooks";

import WatchRoute from 'src/WatchRoute';
import Banner from "src/Banner";

import s from './App.module.scss';

function App() {
    const { store } = useStore();

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            window.store = store;
        }
        if (store.isInit) return;

        store.init();
    }, [store]);

    return (
        <div className={s.wrap}>
            <Banner />
            <div className={s.content}>
                <RouterComp />
            </div>
            <WatchRoute />
            <WatchWallet />
            <WatchConnect />
        </div>
    );
}

export default observer(App);