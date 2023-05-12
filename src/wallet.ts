import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';

import { MAIN_CHAIN_ID, GOERLI_CHAIN_ID, MAINNET_RPC_URL, GOERLI_RPC_URL } from 'src/constants';

const WalletSavedKey = "ErdSelectedWallet";

export const getSaveWallet = () => {
    return window.localStorage.getItem(WalletSavedKey) || "";
};

export const saveWallet = (wallet: string) => {
    window.localStorage.setItem(WalletSavedKey, wallet);
};

export const clearWallet = () => {
    window.localStorage.removeItem(WalletSavedKey);
};

const injected = injectedModule();

export function createBoard() {
    return Onboard({
        wallets: [injected],
        chains: [
            {
                id: `0x${(MAIN_CHAIN_ID).toString(16)}`,
                token: 'ETH',
                label: 'Ethereum Mainnet',
                rpcUrl: MAINNET_RPC_URL
            },
            {
                id: `0x${(GOERLI_CHAIN_ID).toString(16)}`,
                token: 'ETH',
                label: 'Goerli NetWork',
                rpcUrl: GOERLI_RPC_URL
            }
        ],

        appMetadata: {
            name: 'ERD',
            icon: `
            <svg width="88" height="80" viewBox="0 0 88 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M72.9819 52.5923L44.0277 11L14.9819 52.6103L44.1194 69L72.9819 52.5923ZM42.2135 37.2952L22.477 48.4367L42.2135 19.8487V37.2952ZM45.8786 19.8487L65.6151 48.4367L45.8786 37.2952V19.8487ZM61.0154 55.2613L43.9911 45.6603L40.4176 47.6844L57.442 57.2854L52.7873 59.9364L35.763 50.3354L31.7497 52.6103L48.774 62.2112L44.1194 64.8623L22.4037 52.6103L43.9728 40.3582L65.6701 52.6103L61.0154 55.2613Z" fill="#226CFF"/>
            </svg>
            `,
            description: 'Ethereum reserve dollar',
            recommendedInjectedWallets: [
                { name: "MetaMask", url: "https://metamask.io" }
            ],
        },
        accountCenter: {
            desktop: {
                enabled: false
            },
            mobile: {
                enabled: false
            }
        }
    });
}
