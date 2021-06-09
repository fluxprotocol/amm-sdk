import Big from "big.js";
import { WalletConnection } from "near-api-js";
import { MAX_GAS } from "../config";
import cache from "../utils/cache";
import { TransactionOption } from "./NearService";

/**
 * Gets the minimum amount storage required for a oracle transaction
 *
 * @export
 * @param {WalletConnection} walletConnection
 * @return {Promise<Big>}
 */
export async function getMinimumStorage(contractId: string, walletConnection: WalletConnection): Promise<Big> {
    try {
        const result = await cache(`${contractId}_minimum_storage_balance`, async () => {
            const account = walletConnection.account();
            const minimumBalance = await account.viewFunction(contractId, 'storage_balance_bounds', {});
            return Big(minimumBalance.min);
        });

        return result;
    } catch (error) {
        console.error('[getMinimumStorage]', error);
        return new Big(0);
    }
}

/**
 * Get the current storage balance of the specific account
 *
 * @export
 * @param {WalletConnection} walletConnection
 * @return {Promise<{ total: Big, available: Big }>}
 */
export async function getStorageBalance(contractId: string, accountId: string, walletConnection: WalletConnection): Promise<{ total: Big, available: Big }> {
    try {
        const account = walletConnection.account();
        const storage = await account.viewFunction(contractId, 'storage_balance_of', {
            account_id: accountId,
        });

        return {
            total: storage ? new Big(storage.total) : new Big(0),
            available: storage ? new Big(storage.available) : new Big(0),
        };
    } catch (error) {
        console.error('[getStorageBalance]', error);
        return {
            total: new Big(0),
            available: new Big(0),
        };
    }
}

/**
 * Creates a storage deposit transaction if it's required
 *
 * @export
 * @param {string} contractId
 * @param {string} accountId
 * @param {WalletConnection} walletConnection
 * @param {Big} extraStorage Can be used for calls that require way more than the minimum storage requirements
 * @return {(Promise<TransactionOption | null>)}
 */
export async function createStorageTransaction(contractId: string, accountId: string, walletConnection: WalletConnection, extraStorage: Big = new Big(0)): Promise<TransactionOption | null> {
    const minimumStorageRequired = await getMinimumStorage(contractId, walletConnection);
    const storageBalance = await getStorageBalance(contractId, accountId, walletConnection);
    const storageRequired = minimumStorageRequired.add(extraStorage);

    if (storageBalance.available.lt(storageRequired)) {
        return {
            receiverId: contractId,
            transactionOptions: [{
                amount: storageRequired.sub(storageBalance.available).toString(),
                gas: MAX_GAS.toString(),
                methodName: 'storage_deposit',
                args: {
                    accountId,
                }
            }],
        };
    }

    return null;
}
