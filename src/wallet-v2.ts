import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { configureChains, createConfig } from 'wagmi';
import { goerli } from 'wagmi/chains';

const chains = [goerli];

const projectId = '713e3f7b3e63b09197a8bf045a9471f9';

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({
        projectId,
        chains,
    }),
    publicClient
});

const ethereumClient = new EthereumClient(wagmiConfig, chains)

const WalletConfig = { wagmiConfig, ethereumClient, projectId };

export default WalletConfig;
