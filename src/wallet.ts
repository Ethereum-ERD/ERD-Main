import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';

import { MAIN_CHAIN_ID, PRIVATE_CHAIN_ID, MAINNET_RPC_URL, PRIVATE_RPC_URL } from 'src/constants';

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
            id: `0x${(PRIVATE_CHAIN_ID).toString(16)}`,
            token: 'ETH',
            label: 'Private NetWork',
            rpcUrl: PRIVATE_RPC_URL
          }
      ],

      appMetadata: {
        name: 'ERD',
        icon: `
        <svg width="55" height="46" viewBox="0 0 55 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.1484 36.061C18.5026 36.061 17.164 37.3871 17.1486 39.0329L17.1116 42.9722C17.096 44.64 18.4437 46.0003 20.1115 46.0003H29.5901C31.6496 46.0003 33.0967 43.9727 32.4272 42.0251L31.073 38.0858C30.6566 36.8744 29.517 36.061 28.236 36.061H20.1484Z" fill="#3083FF"/>
            <path d="M46.7911 0.658236C46.259 0.232156 45.5976 0 44.916 0H30.7988C29.142 0 27.7988 1.34315 27.7988 3V6.93927C27.7988 8.59613 29.142 9.93927 30.7988 9.93927H41.4282C42.1154 9.93927 42.7898 10.1817 43.3239 10.6141C44.0275 11.1836 44.4471 12.0493 44.4471 12.9546V33.0456C44.4471 33.9509 44.0383 34.8078 43.3347 35.3774L43.2353 35.4578C42.7533 35.848 42.1519 36.0609 41.5318 36.0609C39.6731 36.0609 38.3671 37.8908 38.9713 39.6486L40.4587 43.9754C40.8751 45.1868 42.0148 46.0002 43.2958 46.0002H44.916C45.5976 46.0002 46.259 45.768 46.7911 45.342L53.2615 40.1609C53.9725 39.5915 54.3864 38.73 54.3864 37.8191V8.18111C54.3864 7.27024 53.9725 6.40869 53.2615 5.83935L46.7911 0.658236Z" fill="#3083FF"/>
            <path d="M9.93927 12.9393C9.93927 11.2824 11.2824 9.93927 12.9393 9.93927H20.0778C21.7346 9.93927 23.0777 8.59613 23.0777 6.93927V3C23.0777 1.34315 21.7346 0 20.0777 0H3C1.34314 0 0 1.34315 0 3V43.0002C0 44.6571 1.34315 46.0002 3 46.0002H6.87252C8.51902 46.0002 9.85783 44.6732 9.87241 43.0268L9.93927 35.4708V30.9542C9.93927 29.2974 11.2824 27.9542 12.9393 27.9542H34.3033C35.9602 27.9542 37.3033 26.6111 37.3033 24.9542V21.0149C37.3033 19.3581 35.9602 18.0149 34.3033 18.0149H12.9393C11.2824 18.0149 9.93927 16.6718 9.93927 15.0149V12.9393Z" fill="#3083FF"/>
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
