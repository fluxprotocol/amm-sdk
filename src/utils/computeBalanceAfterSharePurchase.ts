import Big from 'big.js';
import computeBalanceAfterTrade from "./computeBalanceAfterTrade";
import { mulBN } from './bigMath';

/**
 * Taken from https://github.com/TokenUnion/amm-maths/blob/master/src/utils.ts adjusted where needed
 * Computes the market maker's balances of outcome tokens after a trade to buy shares of a particular outcome
 * @param initialPoolBalances - the market maker's balances of outcome tokens before the trade
 * @param outcomeIndex - the index of the outcome token being bought
 * @param investmentAmountAfterFees - the amount of collateral being converted into outcome tokens (i.e. post fees)
 * @param sharesBoughtAmount - the amount of outcome tokens being removed from the market maker
 * @param fees - the percentage fees taken by the market maker on each trade
 */
const computeBalanceAfterSharePurchase = (
    initialPoolBalances: Big[],
    outcomeIndex: number,
    investmentAmount: Big,
    sharesBoughtAmount: Big,
    fees: number,
): Big[] =>
    computeBalanceAfterTrade(
        initialPoolBalances,
        outcomeIndex,
        fees !== 1 ? mulBN(investmentAmount, 1 - fees) : new Big(0),
        sharesBoughtAmount,
    );

export default computeBalanceAfterSharePurchase;
