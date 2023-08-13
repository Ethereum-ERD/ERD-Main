import { ethers } from 'ethers';

import { UserTroveStatus } from 'src/constants';

export type ExternalProvider = ethers.providers.Web3Provider;

export type RPCProvider = ethers.providers.JsonRpcProvider;

export enum CollateralStatus {
    NotSupport = 0,
    Active,
    Pause
}

export enum CollRationLevel {
    Health = 1,
    Ordinary,
    Emergency
}

export type UserTrove = {
    ICR: number
    debt: number
    owner: string
    arrayIndex: number
    status: UserTroveStatus
    collateral: Array<SupportAssetsItem & { amount: ethers.BigNumber }>
}; 

export interface ProtocolCollateralItem extends SupportAssetsItem {
    balance: number
}

export interface UserCollateralItem extends SupportAssetsItem {
    balance: number
}

export interface UserDepositRewardsItem extends SupportAssetsItem {
    rewards: number
}

export interface SupportAssetsItem {
    icon: string
    tokenAddr: string
    tokenDecimals: number
    assetName: string
    tokenName: string
    status: CollateralStatus
}

export interface BorrowItem {
    token: string
    amount: number
}

export interface RankItem {
    rank: number;
    user: string;
    score: number;
    invite: number;
    amount: number;
}
