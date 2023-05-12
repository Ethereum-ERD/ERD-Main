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
        tokenAddr: '0xF1db4c1e30b556e2D08738E7E42B74e1c269b44e'.toLowerCase()
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
        tokenAddr: '0xCcf273a3CA6c4b8a500cf47e0aF2f0cF82163606'.toLowerCase()
    },
    {
        assetName: 'Ethereum',
        tokenName: 'ETH',
        icon: ETH,
        tokenDecimals: 18,
        tokenAddr: MOCK_ETH_ADDR.toLowerCase()
    }
];
