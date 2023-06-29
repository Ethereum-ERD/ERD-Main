import Onboard from '@web3-onboard/core';
import coinbaseWalletModule from '@web3-onboard/coinbase';
import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from '@web3-onboard/walletconnect';

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

const coinbaseWalletSdk = coinbaseWalletModule();

// const walletConnect = walletConnectModule({ version: 1 });
const walletConnect = walletConnectModule({
    version: 2,
    requiredChains: [MAIN_CHAIN_ID],
    // @ts-ignore
    optionalChains: [GOERLI_CHAIN_ID],
    projectId: '713e3f7b3e63b09197a8bf045a9471f9',
});

export function createBoard() {
    return Onboard({
        // @ts-ignore
        wallets: [injected, walletConnect, coinbaseWalletSdk],
        theme: 'dark',
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
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M56 40.1581L28.0442 0L0 40.1754L28.1327 56L56 40.1581ZM26.2926 25.3885L7.23665 36.1458L26.2926 8.54355V25.3885ZM29.8313 8.54355L48.8872 36.1458L29.8313 25.3885V8.54355ZM44.4461 42.735L28.0088 33.4651L24.5586 35.4194L40.9959 44.6893L36.5017 47.2489L20.0645 37.979L16.1896 40.1754L32.6269 49.4453L28.1327 52.0049L7.16588 40.1754L27.9912 28.3459L48.9403 40.1754L44.4461 42.735Z" fill="url(#paint0_linear_4255_13186)"/>
                    <defs>
                        <linearGradient id="paint0_linear_4255_13186" x1="13.4167" y1="53.0833" x2="36.75" y2="5.25" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#863CFF"/>
                            <stop offset="1" stop-color="#FF7878"/>
                        </linearGradient>
                    </defs>
                </svg>
            `,
            logo: `
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M56 40.1581L28.0442 0L0 40.1754L28.1327 56L56 40.1581ZM26.2926 25.3885L7.23665 36.1458L26.2926 8.54355V25.3885ZM29.8313 8.54355L48.8872 36.1458L29.8313 25.3885V8.54355ZM44.4461 42.735L28.0088 33.4651L24.5586 35.4194L40.9959 44.6893L36.5017 47.2489L20.0645 37.979L16.1896 40.1754L32.6269 49.4453L28.1327 52.0049L7.16588 40.1754L27.9912 28.3459L48.9403 40.1754L44.4461 42.735Z" fill="url(#paint0_linear_4255_13186)"/>
                    <defs>
                        <linearGradient id="paint0_linear_4255_13186" x1="13.4167" y1="53.0833" x2="36.75" y2="5.25" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#863CFF"/>
                            <stop offset="1" stop-color="#FF7878"/>
                        </linearGradient>
                    </defs>
                </svg>
            `,
            description: 'Ethereum reserve dollar',
            recommendedInjectedWallets: [
                { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
                { name: "MetaMask", url: "https://metamask.io" }
            ],
            explore: 'https://erd.xyz'
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
