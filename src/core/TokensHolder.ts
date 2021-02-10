import { Account } from "near-api-js";
import TokenContract from "../contracts/TokenContract";
import { SdkConfig } from "../models/SdkConfig";

export default class TokensHolder {
    private tokens: Map<string, TokenContract> = new Map();
    private account: Account;
    private sdkConfig: SdkConfig;

    constructor(account: Account, sdkConfig: SdkConfig) {
        this.account = account;
        this.sdkConfig = sdkConfig;
    }

    /**
     * Gets the token contract and creates it if it does not exist
     *
     * @private
     * @param {string} collateralTokenId
     * @return {TokenContract}
     * @memberof FluxSdk
     */
    getTokenContract(collateralTokenId: string): TokenContract {
        if (!this.account) throw new Error('Not connected');

        let tokenContract = this.tokens.get(collateralTokenId);

        if (!tokenContract) {
            tokenContract = new TokenContract(this.account, collateralTokenId, this.sdkConfig);
            this.tokens.set(collateralTokenId, tokenContract);
        }

        return tokenContract;
    }
}
