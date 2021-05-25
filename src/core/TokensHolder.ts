import { Account, WalletConnection } from "near-api-js";
import TokenContract from "../contracts/TokenContract";
import { SdkConfig } from "../models/SdkConfig";
import { TokenMetadata } from "../models/TokenMetadata";

export default class TokensHolder {
    tokens: Map<string, TokenContract> = new Map();
    metadata: Map<string, TokenMetadata> = new Map();
    private account: Account;
    private sdkConfig: SdkConfig;
    private walletConnection: WalletConnection;

    constructor(account: Account, sdkConfig: SdkConfig, walletConnection: WalletConnection) {
        this.account = account;
        this.sdkConfig = sdkConfig;
        this.walletConnection = walletConnection;
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
            tokenContract = new TokenContract(this.account, collateralTokenId, this.sdkConfig, this.walletConnection);
            this.tokens.set(collateralTokenId, tokenContract);
        }

        return tokenContract;
    }

    async getTokenMetadata(collateralTokenId: string): Promise<TokenMetadata> {
        const token = this.getTokenContract(collateralTokenId);
        let metadata = this.metadata.get(collateralTokenId);

        if (!metadata) {
            metadata = await token.getMetadata();
            this.metadata.set(collateralTokenId, metadata);
        }

        return metadata;
    }
}
