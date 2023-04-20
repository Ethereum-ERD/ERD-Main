import RocketPool from 'src/asset/rocketpool.svg';
import Coinbase from 'src/asset/coinbase.svg';
import Lido from 'src/asset/lido.svg';
import Frax from 'src/asset/frax.svg';
import ETH from 'src/asset/eth.svg';

import { SupportAssetsItem } from 'src/types';
import { MOCK_ETH_ADDR } from 'src/constants';

export const SupportAssets: Array<SupportAssetsItem> = [
    {
        assetName: 'Lido',
        tokenName: 'stETH',
        icon: Lido,
        tokenDecimals: 18,
        tokenAddr: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84'.toLowerCase()
    },
    // {
    //     assetName: 'Frax',
    //     tokenName: 'fraxETH',
    //     icon: Frax,
    //     tokenDecimals: 18,
    //     tokenAddr: '0x5E8422345238F34275888049021821E8E08CAa1f'.toLowerCase()
    // },
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
        tokenAddr: '0xae78736Cd615f374D3085123A210448E74Fc6393'.toLowerCase()
    },
    {
        assetName: 'Ethereum',
        tokenName: 'ETH',
        icon: ETH,
        tokenDecimals: 18,
        tokenAddr: MOCK_ETH_ADDR.toLowerCase()
    }
];
