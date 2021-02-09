import { Account, Near, WalletConnection } from "near-api-js";

import * as sdkUtils from './FluxSdkUtils';
import { DEFAULT_FUNGIBLE_TOKEN_CONTRACT_ID, DEFAULT_SWAP_FEE } from "./config";
import { ProtocolContract } from "./contracts/ProtocolContract";
import { ConnectConfig, createConnectConfig } from "./models/ConnectConfig";
import { createSdkConfig, SdkConfig } from "./models/SdkConfig";
import { connectNear } from "./services/NearService";
import calcDistributionHint from "./utils/calcDistributionHint";

export default class FluxSdk {
    sdkConfig: SdkConfig;

    near?: Near;
    walletConnection?: WalletConnection;
    account?: Account;
    protocol?: ProtocolContract;

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
        this.account = this.walletConnection.account();
        this.protocol = new ProtocolContract(this.account, this.sdkConfig);
    }

    /**
     * Sign the user in
     *
     * @memberof FluxSdk
     */
    signIn() {
        if (!this.walletConnection) throw new Error("Not yet connected");
        if (this.walletConnection.getAccountId()) throw new Error(`Already signedin with account: ${this.account?.accountId}`);

        this.walletConnection.requestSignIn(this.sdkConfig.nullContractId, "Flux-protocol");
    }

    /**
     * Sign the user in and allows for transactions to be done by the application itself
     *
     * @memberof FluxSdk
     */
    oneClickTxSignIn() {
        if (!this.near) throw new Error('Not connected with Near');
        if (!this.walletConnection) throw new Error("No wallet connection");
        if (this.walletConnection.getAccountId()) throw new Error(`Already signedin with account: ${this.account?.accountId}`);
        if (!this.protocol) throw new Error('No protocol contract found');

        this.walletConnection = new WalletConnection(this.near, this.protocol.contract.contractId);
        this.walletConnection.requestSignIn(this.protocol.contract.contractId, 'Flux Protocol');
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
     * Gets the logged in account if it's available
     *
     * @return {(string | undefined)}
     * @memberof FluxSdk
     */
    getAccountId(): string | undefined {
        return this.account?.accountId;
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
        const totalWeights = pool.weights.reduce((prev, current) => prev + current, 0);

        if (totalWeights !== 100) throw new Error('Weights should equal 100 together');
        if (!this.protocol) throw new Error('Cannot create a market without connecting first');

        const denormWeights = calcDistributionHint(pool.weights);

        this.protocol.seedPool(pool.marketId, pool.totalIn, denormWeights.map(w => w.toFixed(0)));
    }
}
