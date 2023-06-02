import RocketPool from 'src/asset/rocketpool.svg';
import Coinbase from 'src/asset/coinbase.svg';
import Lido from 'src/asset/lido.svg';
import ETH from 'src/asset/eth.svg';

import { MOCK_ETH_ADDR, ST_ETH_ADDR, R_ETH_ADDR, CB_ETH_ADDR } from 'src/constants';
import { SupportAssetsItem, CollateralStatus } from 'src/types';

export const SupportAssets: Array<SupportAssetsItem> = [
    {
        assetName: 'Lido',
        tokenName: 'stETH',
        icon: Lido,
        tokenDecimals: 18,
        tokenAddr: ST_ETH_ADDR,
        status: CollateralStatus.NotSupport
    },
    {
        assetName: 'Coinbase',
        tokenName: 'cbETH',
        icon: Coinbase,
        tokenDecimals: 18,
        tokenAddr: CB_ETH_ADDR,
        status: CollateralStatus.NotSupport
    },
    {
        assetName: 'Rocketpool',
        tokenName: 'rETH',
        icon: RocketPool,
        tokenDecimals: 18,
        tokenAddr: R_ETH_ADDR,
        status: CollateralStatus.NotSupport
    },
    {
        assetName: 'Ethereum',
        tokenName: 'ETH',
        icon: ETH,
        tokenDecimals: 18,
        tokenAddr: MOCK_ETH_ADDR,
        status: CollateralStatus.NotSupport
    }
];
