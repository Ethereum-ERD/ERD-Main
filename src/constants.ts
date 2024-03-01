import { ethers } from 'ethers';

import { WETH_ADDR, ST_ETH_ADDR, R_ETH_ADDR, CB_ETH_ADDR, USDE_ADDR, CURRENT_CHAIN_ID } from 'src/env';

import { MAIN_CHAIN_ID } from './chain-id';

export { WETH_ADDR, ST_ETH_ADDR, R_ETH_ADDR, CB_ETH_ADDR, USDE_ADDR };

const GOERLI_LEADER_BOARD_START_TIME = '2023-09-08';
const MAINNET_LEADER_BOARD_START_TIME = '2023-12-06';

let leaderBoardStartTime = GOERLI_LEADER_BOARD_START_TIME;

if (CURRENT_CHAIN_ID === MAIN_CHAIN_ID) {
    leaderBoardStartTime = MAINNET_LEADER_BOARD_START_TIME;
}

export const ETH_USD_PAIR    = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419';

export const rETH_ETH_PAIR  = '0x536218f9E9Eb48863970252233c8F271f554C2d0';

export const stETH_ETH_PAIR = '0x86392dC19c0b719886221c78AB11eb8Cf5c52812';

export const LEADER_BOARD_START_TIME = leaderBoardStartTime;

export const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;

export const MAINNET_RPC_URL = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

export const GOERLI_RPC_URL = `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

export const ROW_PER_PAGE = 10;

export const BN_ZERO = ethers.BigNumber.from(0);

export const BN_ONE = ethers.BigNumber.from(1);

export const EMPTY_ADDRESS = ethers.constants.AddressZero;

export const MOCK_ETH_ADDR = EMPTY_ADDRESS;

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
    }
];

export const RANDOM_SEED = 31337;

export const TOKEN_IMG_URL = {
    [WETH_ADDR]: 'https://etherscan.io/token/images/weth_28.png',
    [R_ETH_ADDR]: 'https://etherscan.io/token/images/rocketpooleth_32.png?v=2',
    [ST_ETH_ADDR]: 'https://etherscan.io/token/images/lido-steth_32.png',
    [CB_ETH_ADDR]: 'https://etherscan.io/token/images/cbeth_32.png',
    [USDE_ADDR]: 'https://erd-fe-storage.s3.amazonaws.com/etherscan/USDE.png',
    [EMPTY_ADDRESS]: 'https://etherscan.io/images/svg/brands/ethereum-original.svg'
};

export const BN_ETHER = ethers.BigNumber.from(1 + '0'.repeat(18));

export const TERMS_SAVED_KEY = "DidYouAgreeERDTerms";

export const DO_NOT_SHOW_AGAIN_KEY = 'DoNotShowAgain';

export const MAINNET_ETHER_SCAN_URL_PREFIX = 'https://etherscan.io';

export const GOERLI_ETHER_SCAN_URL_PREFIX  = 'https://goerli.etherscan.io';

export const SECONDS_PER_YEAR = 365 * 24 * 60 * 60;

export const RAY = 1e27;
