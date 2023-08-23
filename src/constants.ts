import { ethers } from 'ethers';

export const MAIN_CHAIN_ID = 1;

export const GOERLI_CHAIN_ID = 5;

export const ALCHEMY_API_KEY = 'LPyMvM3tqV6T2WdroN8QKJ8y3B5DNm6d';

export const MAINNET_RPC_URL = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

export const GOERLI_RPC_URL = `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

export const ROW_PER_PAGE = 10;

export const BN_ZERO = ethers.BigNumber.from(0);

export const BN_ONE = ethers.BigNumber.from(1);

export const MOCK_ETH_ADDR = '0x' + '0'.repeat(40);

export const MAX_MINTING_FEE = 0.05;

export const MAX_ITERATIONS = 0;

export const MAX_FEE = '1000000000000000000';

export const CONTRACT_ERROR_PREFIX = 'execution reverted:';

export enum SORT_BY {
    DescCollateralRatio = 1,
    AscCollateralRatio
}

export const Routes = [
    {
        path: '/',
        name: 'Mint'
    },
    {
        path: '/deposit',
        name: 'Deposit SP'
    },
    {
        path: '/liquidate',
        name: 'Liquidate'
    },
    {
        path: '/redeem',
        name: 'Redeem'
    },
    {
        path: '/statistics',
        name: 'Statistics'
    },
    {
        path: '/leaderboard',
        name: 'Leaderboard'
    },
    {
        path: '/test',
        name: 'Test'
    }
];

export const EMPTY_ADDRESS = ethers.constants.AddressZero;

export type UserTroveStatus =
    | "nonExistent"
    | "open"
    | "closedByOwner"
    | "closedByLiquidation"
    | "closedByRedemption";

export const RANDOM_SEED = 31337;

// @TODO: will remove this line when deploy to mainnet
export const WETH_ADDR   = '0x23Cb0c6C75df5A88F559fE998b079C4069F14837'.toLowerCase();
export const R_ETH_ADDR  = '0x10963DeA0a7bAe56Cd4C822bd2a58dACe5A88e7c'.toLowerCase();
export const ST_ETH_ADDR = '0xF5Edf26C26028BB921344B7F394CB731307AB2F5'.toLowerCase();
export const CB_ETH_ADDR = '0xBe9895146f7AF43049ca1c1AE358B0541Ea49704'.toLowerCase();

// export const WETH_ADDR   = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'.toLowerCase();
// export const ST_ETH_ADDR = '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84'.toLowerCase();
// export const R_ETH_ADDR  = '0xae78736Cd615f374D3085123A210448E74Fc6393'.toLowerCase();
// export const CB_ETH_ADDR = '0xBe9895146f7AF43049ca1c1AE358B0541Ea49704'.toLowerCase();

export const BN_ETHER = ethers.BigNumber.from(1 + '0'.repeat(18));

export const TERMS_SAVED_KEY = "DidYouAgreeERDTerms";

export const DO_NOT_SHOW_AGAIN_KEY = 'DoNotShowAgain';
