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
import { getEscrowStatus, GetEscrowStatusOptions, getMarketById, getMarketPoolBalances, getMarkets, getPoolTokenBalance, GetPoolTokenBalanceResponse, MarketFilters } from "./services/MarketService";
import { Pagination } from "./models/Pagination";
import { MarketDetailGraphData, MarketGraphData } from "./models/Market";
import { AccountBalance, AccountFeeBalance, AccountMarketBalanceGraphData } from "./models/AccountData";
import { getAccountBalancesForMarket, getAccountInfo, GetAccountInfoOptions, getParticipatedMarkets, GetParticipatedMarketsOptions } from "./services/AccountService";
import { AccountBalance as NearAccountBalance } from "near-api-js/lib/account";
import { DateMetric, getPriceHistoryByMarketId, PriceHistoryOptions } from "./services/PriceHistoryService";
import { PriceHistoryData } from "./models/PriceHistoryData";
import { queryGraph } from "./services/GraphQLService";
import { TokenMetadata } from "./models/TokenMetadata";
import { EscrowStatus } from "./models/EscrowStatus";
import { TokenWhitelist } from "./models/TokenWhitelist";
import { TransactionParams } from "./models/TransactionParams";
import { getTransactions, GetTransactionsParams } from "./services/TransactionService";
import { FluxTransaction, FluxTransactionType } from "./models/FluxTransaction";
import { ParticipatedMarket } from "./models/ParticipatedMarket";
import { getDataRequest, getOracleConfig } from "./services/OracleService";
import { OracleConfig } from "./models/OracleConfig";
import { DataRequest } from "./models/DataRequest";

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
        this.protocol = new ProtocolContract(nearAccount, this.sdkConfig, this.walletConnection);
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
        resolutionDate?: Date,
        extraInfo: string,
        swapFee?: string,
        collateralTokenId?: string,
        isScalar?: boolean,
        challengePeriod?: string,
    }) {
        return this.market?.createMarket(market);
    }

    /**
     * Fetches the oracle config
     * Can be used to see what the current validity bond is
     *
     * @return {Promise<OracleConfig>}
     * @memberof FluxSdk
     */
    async getOracleConfig(): Promise<OracleConfig> {
        if (!this.walletConnection) throw new Error('Not connected');
        return getOracleConfig(this.sdkConfig, this.walletConnection);
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
    async addLiquidity(collateralTokenId: string, marketId: string, amountIn: string, weights?: number[], txParams?: TransactionParams) {
        return this.pool?.addLiquidity(collateralTokenId, marketId, amountIn, weights, txParams);
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
    }, txParams?: TransactionParams) {
        return this.market?.buy(buyParams, txParams);
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
    }, txParams?: TransactionParams) {
        return this.market?.sell(sellParams, txParams);
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
     * Gets the current market pool balances
     *
     * @param {string} marketId
     * @return {*}
     * @memberof FluxSdk
     */
    async getMarketPoolBalances(marketId: string) {
        return getMarketPoolBalances(this.sdkConfig, marketId);
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
    async getAccountInfo(accountId: string, options?: GetAccountInfoOptions): Promise<{
        balances: AccountBalance[],
        earned_fees: AccountFeeBalance[];
    }> {
        return getAccountInfo(this.sdkConfig, accountId, options);
    }

    /**
     * Gets the price history for a period
     *
     * @param {string} marketId
     * @param {PriceHistoryOptions} options
     * @return {Promise<PriceHistoryData[]>}
     * @memberof FluxSdk
     */
    async getPriceHistoryByMarketId(marketId: string, options: PriceHistoryOptions): Promise<PriceHistoryData[]> {
        return getPriceHistoryByMarketId(this.sdkConfig, marketId, options);
    }

    /**
     * Gets the current escrow status of a specific user & market
     *
     * @param {string} accountId
     * @param {string} [marketId]
     * @param {GetEscrowStatusOptions} [options={}]
     * @return {Promise<EscrowStatus[]>}
     * @memberof FluxSdk
     */
    async getEscrowStatus(accountId: string, marketId?: string, options: GetEscrowStatusOptions = {}): Promise<EscrowStatus[]> {
        return getEscrowStatus(this.sdkConfig, accountId, marketId, options);
    }

    /**
     * Gets all the tokens that are whitelisted by the protocol
     *
     * @return {Promise<TokenWhitelist[]>}
     * @memberof FluxSdk
     */
    async getTokenWhitelist(): Promise<TokenWhitelist[]> {
        if (!this.market) throw new Error('Not connected');
        return this.market.getTokenWhitelist();
    }

    /**
     * Gets the balances and earned fees of a account
     *
     * @param {string} accountId
     * @param {string} marketId
     * @return {Promise<GetPoolTokenBalanceResponse | null>}
     * @memberof FluxSdk
     */
    async getPoolTokenBalance(accountId: string, marketId: string): Promise<GetPoolTokenBalanceResponse | null> {
        return getPoolTokenBalance(this.sdkConfig, accountId, marketId);
    }

    /**
     * Gets all the Flux transactions
     *
     * @param {GetTransactionsParams} params
     * @return {Promise<Pagination<FluxTransaction>>}
     * @memberof FluxSdk
     */
    async getTransactions(params: GetTransactionsParams): Promise<Pagination<FluxTransaction>>  {
        return getTransactions(this.sdkConfig, params);
    }

    async getParticipatedMarkets(accountId: string, options?: GetParticipatedMarketsOptions): Promise<Pagination<ParticipatedMarket>> {
        return getParticipatedMarkets(this.sdkConfig, accountId, options);
    }

    /**
     * Fetches the data request associated with the market
     *
     * @param {string} marketId
     * @return {string}
     * @memberof FluxSdk
     */
    async getOracleDataRequest(marketId: string) {
        return getDataRequest(this.sdkConfig, {
            tags: [marketId],
            requestor: this.sdkConfig.protocolContractId,
        });
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

// Some models for exporting
export { DateMetric, FluxTransactionType };
export type { FluxTransaction, ParticipatedMarket, OracleConfig, DataRequest };
