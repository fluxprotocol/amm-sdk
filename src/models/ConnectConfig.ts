import { Near, WalletConnection } from "near-api-js";
import { NULL_CONTRACT } from "../config";

export interface ConnectConfig {
    accountId?: string;
    nearInstance?: Near;
    walletInstance?: WalletConnection;
    customNodeUrl?: string;
    customWalletUrl?: string;
    network?: 'testnet' | 'mainnet' | 'custom';
}

export function createConnectConfig(connectConfig: Partial<ConnectConfig>): ConnectConfig {
    return connectConfig;
}
