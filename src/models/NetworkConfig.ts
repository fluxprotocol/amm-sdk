import { ConnectConfig } from "./ConnectConfig";

export interface NetworkConfig {
    networkId: string,
    nodeUrl: string,
    contractName: null,
    walletUrl: string,
    initialBalance: string
}

export function createNetworkConfig(connectConfig: ConnectConfig): NetworkConfig {
    return {
        networkId: 'testnet',
        nodeUrl: connectConfig.customNodeUrl || 'https://rpc.testnet.near.org',
        contractName: null,
        walletUrl: 'https://wallet.testnet.near.org',
        initialBalance: '100000000',
    };
}