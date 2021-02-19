import { Near, WalletConnection } from "near-api-js";

import * as sdkUtils from './core/FluxSdkUtils';
import { ProtocolContract } from "./contracts/ProtocolContract";
import { ConnectConfig, createConnectConfig } from "./models/ConnectConfig";
import { createSdkConfig, SdkConfig } from "./models/SdkConfig";
import { connectNear } from "./services/NearService";
import FluxPool from "./core/FluxPool";
import TokensHolder from "./core/TokensHolder";
import { FluxAccount } from "./core/FluxAccount";
import FluxMarket from "./core/FluxMarket";
import { getMarketById, getMarkets, MarketFilters } from "./services/MarketService";
import { Pagination } from "./models/Pagination";
import { MarketDetailGraphData, MarketGraphData } from "./models/Market";
import { AccountBalance, AccountFeeBalance, AccountMarketBalanceGraphData } from "./models/AccountData";
import { getAccountBalancesForMarket, getAccountInfo } from "./services/AccountService";
import { AccountBalance as NearAccountBalance } from "near-api-js/lib/account";
import { getPriceHistoryByMarketId, Period } from "./services/PriceHistoryService";
import { PriceHistoryData } from "./models/PriceHistoryData";
import { queryGraph } from "./services/GraphQLService";
import { TokenMetadata } from "./models/TokenMetadata";

export default class FluxSdk {
    sdkConfig: SdkConfig;

    near?: Near;
    walletConnection?: WalletConnection;
    protocol?: ProtocolContract;
    pool?: FluxPool;
    tokens?: TokensHolder;
    account?: FluxAccount;
    market?: FluxMarket;

    /**
     * Utils that can be used with your application
     *
     * @readonly
     * @static
     * @memberof FluxSdk
     */
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
        if (this.near) {
            return;
        }

        const connectConfig = createConnectConfig(config);

        this.near = await connectNear(connectConfig, this.sdkConfig);
        this.walletConnection = connectConfig.walletInstance ?? new WalletConnection(this.near, this.sdkConfig.nullContractId);
        const nearAccount = this.walletConnection.account();

        this.tokens = new TokensHolder(nearAccount, this.sdkConfig);
        this.account = new FluxAccount(this.tokens, this.walletConnection, this.sdkConfig);
        this.protocol = new ProtocolContract(nearAccount, this.sdkConfig);
        this.pool = new FluxPool(this.protocol, this.tokens);
        this.market = new FluxMarket(this.protocol, this.tokens);
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
     * @return {(string)}
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
    async createMarket(market: {
        description: string,
        outcomes: string[],
        categories?: string[],
        endDate: Date,
        extraInfo: string,
        swapFee?: string,
        collateralTokenId?: string,
    }) {
        return this.market?.createMarket(market);
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
     * Fetches token metadata
     *
     * @param {string} collateralTokenId
     * @return {Promise<TokenMetadata>}
     * @memberof FluxSdk
     */
    async getTokenMetadata(collateralTokenId: string): Promise<TokenMetadata> {
        if (!this.tokens) throw new Error('Not connected');
        const token = this.tokens.getTokenContract(collateralTokenId);
        return token.getMetadata();
    }

    /**
     * Gets the current NEAR balance
     *
     * @return {(Promise<NearAccountBalance | undefined>)}
     * @memberof FluxSdk
     */
    async getNearBalance(): Promise<NearAccountBalance> {
        if (!this.account) throw new Error('Not connected');
        return this.account.getNearBalance();
    }

    /**
     * Adds liquidity to the pool in exchange for pool tokens
     * Adding the weights parameter is only possible when the total supply of the pool is 0
     *
     * @param {string} collateralTokenId
     * @param {string} marketId
     * @param {string} amountIn
     * @param {number[]} weights the weights of the pool for each outcome. Together should equal 100(%)
     * @memberof FluxSdk
     */
    async addLiquidity(collateralTokenId: string, marketId: string, amountIn: string, weights?: number[]) {
        return this.pool?.addLiquidity(collateralTokenId, marketId, amountIn, weights);
    }

    /**
     * Allows you to exit the pool for a specific market
     *
     * @param {string} marketId
     * @param {string} totalIn Amount of pool tokens
     * @return {Promise<void>}
     * @memberof FluxSdk
     */
    async exitPool(marketId: string, totalIn: string) {
        return this.pool?.exitPool(marketId, totalIn);
    }

    /**
     * Buys a share for a specific outcome
     *
     * @param {{
     *         collateralTokenId: string,
     *         marketId: string,
     *         outcomeId: number,
     *         amountOut: string,
     *         amountIn: string,
     *         slippage?: number,
     *     }} buyParams
     * @memberof FluxSdk
     */
    async buy(buyParams: {
        collateralTokenId: string,
        marketId: string,
        outcomeId: number,
        amountOut: string,
        amountIn: string,
        slippage?: number,
    }) {
        return this.market?.buy(buyParams);
    }

    /**
     * Sells shares for a specific outcome
     *
     * @param {{
     *         marketId: string,
     *         amountOut: string,
     *         amountIn: string,
     *         outcomeId: number,
     *         slippage?: number,
     *     }} sellParams
     * @memberof FluxSdk
     */
    async sell(sellParams: {
        marketId: string,
        amountOut: string,
        amountIn: string,
        outcomeId: number,
        slippage?: number,
    }) {
        return this.market?.sell(sellParams);
    }

    /**
     * Burns outcome tokens for the collateral token
     * Requires the account to have a balance of each outcome
     * and can only burn the lowest balance
     *
     * @param {string} marketId
     * @param {string} toBurn
     * @return {*}
     * @memberof FluxSdk
     */
    async burnOutcomeTokensRedeemCollateral(marketId: string, toBurn: string) {
        return this.market?.burnOutcomeTokensRedeemCollateral(marketId, toBurn);
    }

    /**
     * Allows you to claim your earnings after a market has ended
     *
     * @param {string} marketId
     * @memberof FluxSdk
     */
    async claimEarnings(marketId: string) {
        return this.market?.claimEarnings(marketId);
    }

    /**
     * Gets markets
     * Allows you to fetch expired, finalized and open markets.
     *
     * @param {MarketFilters} filters
     * @return {Promise<Pagination<MarketGraphData>>}
     * @memberof FluxSdk
     */
    async getMarkets(filters: MarketFilters = {}): Promise<Pagination<MarketGraphData>> {
        return getMarkets(this.sdkConfig, filters);
    }

    /**
     * Get a market
     *
     * @param {string} marketId
     * @param {string} [accountId]
     * @return {Promise<MarketDetailGraphData>}
     * @memberof FluxSdk
     */
    async getMarketById(marketId: string, accountId?: string): Promise<MarketDetailGraphData> {
        return getMarketById(this.sdkConfig, marketId, accountId);
    }

    /**
     * Fetches the balances of a market for a specific account
     *
     * @param {string} marketId
     * @param {string} accountId
     * @return {Promise<AccountMarketBalanceGraphData>}
     * @memberof FluxSdk
     */
    async getAccountBalancesForMarket(marketId: string, accountId: string): Promise<AccountMarketBalanceGraphData[]> {
        return getAccountBalancesForMarket(this.sdkConfig, marketId, accountId);
    }

    /**
     * Gets the balances and earned fees that the user has participated in
     *
     * @param {string} accountId
     * @memberof FluxSdk
     */
    async getAccountInfo(accountId: string): Promise<{
        balances: AccountBalance[],
        earned_fees: AccountFeeBalance[];
    }> {
        return getAccountInfo(this.sdkConfig, accountId);
    }

    /**
     * Gets the price history for a spec
     *
     * @param {string} marketId
     * @param {Period} period
     * @return {*}  {Promise<PriceHistoryData>}
     * @memberof FluxSdk
     */
    async getPriceHistoryByMarketId(marketId: string, period: Period): Promise<PriceHistoryData[]> {
        return getPriceHistoryByMarketId(this.sdkConfig, marketId, period);
    }

    /**
     * Querys the GraphQL server
     * Usefull when the default given querys are not enough and you want to fine tune your data
     *
     * @param {{
     *         query: string,
     *         operationName?: string,
     *         variables?: {
     *             [key: string]: any,
     *         },
     *     }} params
     * @return {Promise<any>}
     * @memberof FluxSdk
     */
    async query(params: {
        query: string,
        operationName?: string,
        variables?: {
            [key: string]: any,
        },
    }) {
       queryGraph(this.sdkConfig.graphApiUrl, params);
    }
}
