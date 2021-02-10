import { Account, Near, WalletConnection } from "near-api-js";

import * as sdkUtils from './core/FluxSdkUtils';
import { DEFAULT_FUNGIBLE_TOKEN_CONTRACT_ID, DEFAULT_SWAP_FEE } from "./config";
import { ProtocolContract } from "./contracts/ProtocolContract";
import { ConnectConfig, createConnectConfig } from "./models/ConnectConfig";
import { createSdkConfig, SdkConfig } from "./models/SdkConfig";
import { connectNear } from "./services/NearService";
import FluxPool from "./core/FluxPool";
import TokensHolder from "./core/TokensHolder";
import { FluxAccount } from "./core/FluxAccount";

export default class FluxSdk {
    sdkConfig: SdkConfig;

    near?: Near;
    walletConnection?: WalletConnection;
    protocol?: ProtocolContract;
    pool?: FluxPool;
    tokens?: TokensHolder;
    account?: FluxAccount;

    static get utils() {
        return sdkUtils;
    }

    /**
     * Creates an instance of FluxSdk.
     *
     * @param {SdkConfig} config
     * @memberof FluxSdk
     */
    constructor(config: Partial<SdkConfig> = {}) {
        this.sdkConfig = createSdkConfig(config);
    }

    /**
     * Connects your application with NEAR
     *
     * @param {Partial<ConnectConfig>} config
     * @memberof FluxSdk
     */
    async connect(config: Partial<ConnectConfig> = {}) {
        const connectConfig = createConnectConfig(config);

        this.near = await connectNear(connectConfig, this.sdkConfig);
        this.walletConnection = connectConfig.walletInstance ?? new WalletConnection(this.near, this.sdkConfig.nullContractId);
        const nearAccount = this.walletConnection.account();

        this.tokens = new TokensHolder(nearAccount, this.sdkConfig);
        this.account = new FluxAccount(this.tokens, this.walletConnection, this.sdkConfig);
        this.protocol = new ProtocolContract(nearAccount, this.sdkConfig);
        this.pool = new FluxPool(this.protocol, this.tokens);
    }

    /**
     * Sign the user in
     *
     * @memberof FluxSdk
     */
    signIn() {
        if (!this.account) throw new Error('Not connected');
        this.account.signIn();
    }

    /**
     * Sign the user in and allows for transactions to be done by the application itself
     *
     * @memberof FluxSdk
     */
    oneClickTxSignIn() {
        if (!this.near) throw new Error('Not connected with Near');
        if (!this.walletConnection) throw new Error("No wallet connection");
        if (this.walletConnection.getAccountId()) throw new Error(`Already signedin with account: ${this.walletConnection.getAccountId()}`);
        if (!this.protocol) throw new Error('No protocol contract found');
        if (!this.tokens) throw new Error('Not connected');

        this.walletConnection = new WalletConnection(this.near, this.protocol.contract.contractId);
        this.account = new FluxAccount(this.tokens, this.walletConnection, this.sdkConfig);
        this.walletConnection.requestSignIn(this.protocol.contract.contractId, 'Flux Protocol');
    }

    /**
     * Sign the user out
     *
     * @memberof FluxSdk
     */
    signOut() {
        this.account?.signOut();
    }

    /**
     * Gets the logged in account if it's available
     *
     * @return {(string | undefined)}
     * @memberof FluxSdk
     */
    getAccountId(): string | undefined {
        return this.account?.getAccountId();
    }

    /**
     * Checks whether the use is logged in or not
     *
     * @return {boolean}
     * @memberof FluxSdk
     */
    isSignedIn(): boolean {
        return this.account?.isSignedIn() ?? false;
    }

    /**
     * Creates a market on the Flux protocol
     *
     * @param {{
     *         description: string,
     *         outcomes: string[],
     *         categories?: string[],
     *         endDate: Date,
     *         extraInfo: string,
     *         swapFee?: string,
     *         collateralTokenId?: string,
     *     }} market
     * @memberof FluxSdk
     */
    createMarket(market: {
        description: string,
        outcomes: string[],
        categories?: string[],
        endDate: Date,
        extraInfo: string,
        swapFee?: string,
        collateralTokenId?: string,
    }) {
        if (!this.protocol) throw new Error('Cannot create a market without connecting first');

        this.protocol.createMarket(
            market.description,
            market.outcomes,
            market.categories || [],
            market.endDate,
            market.extraInfo,
            market.swapFee || DEFAULT_SWAP_FEE,
            market.collateralTokenId || DEFAULT_FUNGIBLE_TOKEN_CONTRACT_ID,
        );
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
        return this.account?.getTokenBalance(collateralTokenId, accountId) ?? '0';
    }

    /**
     * Seeds the market pool
     *
     * @param {{
     *         marketId: string,
     *         totalIn: string,
     *         weights: number[],
     *     }} pool
     * @memberof FluxSdk
     */
    seedPool(pool: {
        marketId: string,
        totalIn: string,
        weights: number[],
    }) {
        this.pool?.seedPool(pool);
    }

    /**
     * Publish the pool (Only possible when the market was already seeded)
     *
     * @param {string} collateralTokenId
     * @param {string} marketId
     * @param {string} amountIn This should match the current total supply of the market
     * @memberof FluxSdk
     */
    publishPool(collateralTokenId: string, marketId: string, amountIn: string) {
        this.pool?.publishPool(collateralTokenId, marketId, amountIn);
    }

    /**
     * Joins a specific pool to provide liquidity
     *
     * @param {string} collateralTokenId
     * @param {string} marketId
     * @param {string} amountIn
     * @memberof FluxSdk
     */
    joinPool(collateralTokenId: string, marketId: string, amountIn: string) {
        this.pool?.joinPool(collateralTokenId, marketId, amountIn);
    }
}
