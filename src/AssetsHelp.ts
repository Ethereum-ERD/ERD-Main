import RocketPool from 'src/asset/rocketpool.svg';
import Coinbase from 'src/asset/coinbase.svg';
import Lido from 'src/asset/lido.svg';
import ETH from 'src/asset/eth.svg';

import { SupportAssetsItem } from 'src/types';
import { MOCK_ETH_ADDR } from 'src/constants';

export const SupportAssets: Array<SupportAssetsItem> = [
    {
        assetName: 'Lido',
        tokenName: 'stETH',
        icon: Lido,
        tokenDecimals: 18,
        tokenAddr: '0xEE43812f94E8FACc9889c57A5e49D2c73c5571Dd'.toLowerCase()
    },
    {
        assetName: 'Coinbase',
        tokenName: 'cbETH',
        icon: Coinbase,
        tokenDecimals: 18,
        tokenAddr: '0xBe9895146f7AF43049ca1c1AE358B0541Ea49704'.toLowerCase()
    },
    {
        assetName: 'Rocketpool',
        tokenName: 'rETH',
        icon: RocketPool,
        tokenDecimals: 18,
        tokenAddr: '0x3F71B13C8D7A14309Dcf163eb14F633CCeEF0dfB'.toLowerCase()
    },
    {
        assetName: 'Ethereum',
        tokenName: 'ETH',
        icon: ETH,
        tokenDecimals: 18,
        tokenAddr: MOCK_ETH_ADDR.toLowerCase()
    }
];
