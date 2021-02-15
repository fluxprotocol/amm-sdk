import { Account, Contract } from "near-api-js";
import { MAX_GAS, STORAGE_BASE } from "../config";
import { SdkConfig } from "../models/SdkConfig";
import { TokenMetadata } from "../models/TokenMetadata";

export default class TokenContract {
    contract: Contract;
    sdkConfig: SdkConfig;

    constructor(account: Account, tokenAccountId: string, sdkConfig: SdkConfig) {
        this.sdkConfig = sdkConfig;
        this.contract = new Contract(account, tokenAccountId, {
            viewMethods: ['get_balance', 'ft_metadata'],
            changeMethods: ['transfer_with_vault'],
        });
    }

    async getMetadata(): Promise<TokenMetadata> {
        // @ts-ignore
        return this.contract.ft_metadata();
    }

    async getBalance(accountId: string): Promise<string> {
        // @ts-ignore
        return this.contract.get_balance({ account_id: accountId });
    }

    async transferWithVault(amount: string, payload: string, storageCost = STORAGE_BASE): Promise<void> {
        // @ts-ignore
        return this.contract.transfer_with_vault({
            receiver_id: this.sdkConfig.protocolContractId,
            amount,
            payload,
        }, MAX_GAS.toString(), storageCost.toString());
    }
}
