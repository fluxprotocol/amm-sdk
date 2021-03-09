import { Account, Contract } from "near-api-js";
import { MAX_GAS, STORAGE_BASE } from "../config";
import { SdkConfig } from "../models/SdkConfig";
import { TokenMetadata } from "../models/TokenMetadata";
import { TransactionParams } from "../models/TransactionParams";

export default class TokenContract {
    contract: Contract;
    sdkConfig: SdkConfig;

    constructor(account: Account, tokenAccountId: string, sdkConfig: SdkConfig) {
        this.sdkConfig = sdkConfig;
        this.contract = new Contract(account, tokenAccountId, {
            viewMethods: ['ft_balance_of', 'ft_metadata'],
            changeMethods: ['ft_transfer_call'],
        });
    }

    async getMetadata(): Promise<TokenMetadata> {
        // @ts-ignore
        return this.contract.ft_metadata();
    }

    async getBalance(accountId: string): Promise<string> {
        // @ts-ignore
        return this.contract.ft_balance_of({ account_id: accountId });
    }

    async transferCall(amount: string, msg: string, txParams?: TransactionParams): Promise<void> {
        const finalTxParams: TransactionParams = {
            gas: MAX_GAS.toString(),
            value: STORAGE_BASE.toString(),
            ...txParams,
        };

        // @ts-ignore
        return this.contract.ft_transfer_call({
            receiver_id: this.sdkConfig.protocolContractId,
            amount,
            msg,
        }, finalTxParams.gas, finalTxParams.value);
    }
}
