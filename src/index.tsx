import React from "react";
import ReactDOM from "react-dom/client";
import { Buffer } from 'buffer';

import { BrowserRouter } from "react-router-dom";
import { Web3Modal } from '@web3modal/react';
import { Provider } from "mobx-react";
import { WagmiConfig } from 'wagmi';
import { WalletConnectModalAuth } from '@walletconnect/modal-auth-react';

import WalletConfig from 'src/wallet-v2';
import Store from "src/store";
import App from "src/App";

import "./index.css";

// @ts-ignore
// just for walletConnect wallet v1 version
window.Buffer = window.Buffer || Buffer;

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const MetadataConfig = {
    name: 'ERD',
    description: 'Ethereum reserve dollar',
    url: 'https://app.erd.xyz',
    icons: ['https://erd-fe-storage.s3.amazonaws.com/erd.svg']
};

function WalletComponent() {
    return (
        <>
            <BrowserRouter>
                <Provider store={new Store()}>
                    <App />
                </Provider>
            </BrowserRouter>
            <WalletConnectModalAuth
                projectId={WalletConfig.projectId}
                metadata={MetadataConfig}
            />
        </>
    );
}

root.render(
    <React.StrictMode>
        <WalletComponent />
    </React.StrictMode>
);
