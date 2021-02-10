import { Account, Contract } from "near-api-js";
import { MAX_GAS, STORAGE_BASE } from "../config";
import { SdkConfig } from "../models/SdkConfig";

export default class TokenContract {
    contract: Contract;
    sdkConfig: SdkConfig;

    constructor(account: Account, tokenAccountId: string, sdkConfig: SdkConfig) {
        this.sdkConfig = sdkConfig;
        this.contract = new Contract(account, tokenAccountId, {
            viewMethods: ['get_balance'],
            changeMethods: ['transfer_with_vault', 'register_account'],
        });
    }

    async getBalance(accountId: string): Promise<string> {
        // @ts-ignore
        return this.contract.get_balance({ account_id: accountId });
    }

    async transferWithVault(amount: string, payload: string): Promise<void> {
        // @ts-ignore
        this.contract.transfer_with_vault({
            receiver_id: this.sdkConfig.protocolContractId,
            amount,
            payload,
        }, MAX_GAS.toString(), STORAGE_BASE.toString());
    }
}
