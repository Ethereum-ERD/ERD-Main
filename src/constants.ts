import { ethers } from 'ethers';

export const MAIN_CHAIN_ID = 1;

export const PRIVATE_CHAIN_ID = 10086;

export const MAINNET_RPC_URL = 'https://eth-mainnet.g.alchemy.com/v2/LWSwBcoKgtbYnEYGp6Rxl_aFwDyOlgJq';

export const PRIVATE_RPC_URL = 'https://rpc.kyoko.finance/hardhat';

export const ROW_PER_PAGE = 10;

export const BN_ZERO = ethers.BigNumber.from(0);

export const MOCK_ETH_ADDR = '0x' + '0'.repeat(40);

export enum SORT_BY {
    DescCollateralRatio = 1,
    AscCollateralRatio
}

export const Routes = [
    {
        path: '/',
        name: 'Borrow'
    },
    {
        path: '/deposit',
        name: 'Deposit'
    },
    {
        path: '/liquidate',
        name: 'Liquidate'
    },
    {
        path: '/redeem',
        name: 'Redemption'
    }
];

export const EmptyObject = Object.create(null);

export const EMPTYADDRESS = ethers.constants.AddressZero;

export type UserTroveStatus =
    | "nonExistent"
    | "open"
    | "closedByOwner"
    | "closedByLiquidation"
    | "closedByRedemption";

export const RANDOM_SEED = 31337;

export const WETH_ADDR = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'.toLowerCase();

export const BN_ETHER = ethers.BigNumber.from(1 + '0'.repeat(18));
