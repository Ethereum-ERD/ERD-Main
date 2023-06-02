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
    interest: number
    basicDebt: number
    arrayIndex: number
    status: UserTroveStatus
    shares: Array<{ token: string; amount: number }>
    stakes: Array<{ token: string; amount: number }>
    collateral: Array<SupportAssetsItem & { amount: number }>
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
