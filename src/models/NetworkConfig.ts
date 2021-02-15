import { ConnectConfig } from "./ConnectConfig";
import { SdkConfig } from "./SdkConfig";

export interface NetworkConfig {
    networkId: string,
    nodeUrl: string,
    contractName?: null,
    walletUrl?: string,
    initialBalance?: string
}

export function createNetworkConfig(connectConfig: ConnectConfig, sdkConfig: SdkConfig): NetworkConfig {
    if (sdkConfig.network === 'mainnet') {
        return {
            networkId: 'mainnet',
            nodeUrl: 'https://rpc.mainnet.near.org',
            walletUrl: 'https://wallet.near.org',
        };
    }

    return {
        networkId: 'testnet',
        nodeUrl: connectConfig.customNodeUrl || 'https://rpc.testnet.near.org',
        contractName: null,
        walletUrl: connectConfig.customWalletUrl || 'https://wallet.testnet.near.org',
        initialBalance: '100000000',
    };
}
