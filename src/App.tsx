import { useEffect } from "react";
import { observer } from "mobx-react";

import LoopQuerySystemInfo from "src/LoopQuerySystemInfo";
import MobileAvatarMenu from "src/MobileAvatarMenu";
import SupportAsset from "src/SupportAsset";
import WatchConnect from "src/WatchConnect";
import WatchWallet from "src/WatchWallet";
import RouterComp from 'src/RouterComp';
import { useStore } from "src/hooks";
import Footer from "src/Footer";
import Risk from "src/Risk";

import WatchRoute from 'src/WatchRoute';
import Banner from "src/Banner";

import s from './App.module.scss';

const Content = observer(function Content() {

    return (
        <div className={s.content}>
            <RouterComp />
        </div>
    );
});

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
            <Content />
            <LoopQuerySystemInfo />
            <WatchRoute />
            <WatchWallet />
            <WatchConnect />
            <Risk />
            <SupportAsset />
            <MobileAvatarMenu />
            <Footer />
        </div>
    );
}

export default observer(App);
