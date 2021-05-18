import { connect, Near, WalletConnection, utils, transactions } from "near-api-js";
import { ConnectConfig } from "../models/ConnectConfig";
import { createNetworkConfig } from "../models/NetworkConfig";
import { SdkConfig } from "../models/SdkConfig";

/**
 * Connects with NEAR
 *
 * @export
 * @param {ConnectConfig} connectConfig
 * @param {SdkConfig} sdkConfig
 * @return {Promise<Near>}
 */
export async function connectNear(connectConfig: ConnectConfig, sdkConfig: SdkConfig): Promise<Near> {
    if (connectConfig.nearInstance) {
        return connectConfig.nearInstance;
    }

    const networkConfig = createNetworkConfig(connectConfig, sdkConfig);

    return connect({
        ...networkConfig,
        deps: {
            keyStore: sdkConfig.keyStore
        },
    });
}

export interface TransactionViewOptions {
    methodName: string;
    args?: object;
}

export interface TransactionCallOptions extends TransactionViewOptions {
    gas: string;
    amount: string;
}

export interface TransactionOption {
    receiverId: string;
    transactionOptions: TransactionCallOptions[];
}

export async function batchSendTransactions(walletConnection: WalletConnection, txs: TransactionOption[], callbackUrl?: string) {
    const accountId = walletConnection.getAccountId();
    const localKey = await walletConnection._near.connection.signer.getPublicKey(accountId, walletConnection._near.connection.networkId);
    const block = await walletConnection._near.connection.provider.block({ finality: 'final' });
    const blockHash = utils.serialize.base_decode(block.header.hash);

    const resultTxs = await Promise.all(txs.map(async ({ receiverId, transactionOptions }, index) => {
        // @ts-ignore
        const actions = transactionOptions.map(tx => transactions.functionCall(tx.methodName, tx.args ?? {}, tx.gas, tx.amount));
        const accessKey = await walletConnection.account().accessKeyForTransaction(receiverId, actions, localKey);

        if (!accessKey) {
            throw new Error(`Cannot find matching key for transaction sent to ${receiverId}`);
        }

        const publicKey = utils.PublicKey.from(accessKey.public_key);
        const nonce = accessKey.access_key.nonce + index + 1;

        return transactions.createTransaction(accountId, publicKey, receiverId, nonce, actions, blockHash);
    }));

    return walletConnection.requestSignTransactions(resultTxs, callbackUrl);
}
