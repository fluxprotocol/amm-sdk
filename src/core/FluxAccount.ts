import { Account, WalletConnection } from "near-api-js";
import { AccountBalance } from "near-api-js/lib/account";
import { SdkConfig } from "../models/SdkConfig";
import TokensHolder from "./TokensHolder";

export class FluxAccount {
    tokens: TokensHolder;
    nearAccount: Account;
    walletConnection: WalletConnection;
    sdkConfig: SdkConfig;

    constructor(tokensHolder: TokensHolder, walletConnection: WalletConnection, sdkConfig: SdkConfig) {
        this.tokens = tokensHolder;
        this.nearAccount = walletConnection.account();
        this.walletConnection = walletConnection;
        this.sdkConfig = sdkConfig;
    }

    /**
     * Sign the user in
     *
     * @memberof FluxSdk
     */
    signIn() {
        if (!this.walletConnection) throw new Error("Not yet connected");
        if (this.walletConnection.getAccountId()) throw new Error(`Already signedin with account: ${this.nearAccount?.accountId}`);

        this.walletConnection.requestSignIn(this.sdkConfig.nullContractId, "Flux Protocol");
    }

    /**
     * Sign the user out
     *
     * @memberof FluxSdk
     */
    signOut() {
        this.walletConnection?.signOut();
    }

    /**
     * Checks whether the use is logged in or not
     *
     * @return {boolean}
     * @memberof FluxSdk
     */
    isSignedIn(): boolean {
        return this.walletConnection?.isSignedIn() ?? false;
    }

    /**
     * Gets the logged in account
     *
     * @return {(string)}
     * @memberof FluxSdk
     */
    getAccountId(): string {
        return this.nearAccount.accountId;
    }

    /**
     * Gets the current token balance for a specific account
     *
     * @param {string} collateralTokenId
     * @param {string} accountId
     * @return {Promise<string>}
     * @memberof FluxSdk
     */
    async getTokenBalance(collateralTokenId: string, accountId: string): Promise<string> {
        const tokenContract = this.tokens.getTokenContract(collateralTokenId);
        return tokenContract.getBalance(accountId);
    }

    async getNearBalance(): Promise<AccountBalance> {
        return this.walletConnection.account().getAccountBalance();
    }
}
