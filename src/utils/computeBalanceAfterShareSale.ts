import Big from "big.js";
import { mulBN, ZERO } from "./bigMath";
import computeBalanceAfterTrade from "./computeBalanceAfterTrade";

/**
 * Taken from https://github.com/TokenUnion/amm-maths/blob/master/src/fpmm/trading/computeBalanceAfterShareSale.ts adjusted where needed
 * Computes the market maker's balances of outcome tokens after a trade to sell shares of a particular outcome
 * @param initialPoolBalances - the market maker's balances of outcome tokens before the trade
 * @param outcomeIndex - the index of the outcome token being bought
 * @param returnAmountBeforeFees - the amount of collateral being converted into outcome tokens (i.e. post fees)
 * @param sharesSoldAmount - the amount of outcome tokens being removed from the market maker
 * @param fees - the percentage fees taken by the market maker on each trade
 */
const computeBalanceAfterShareSale = (
    initialPoolBalances: Big[],
    outcomeIndex: number,
    returnAmount: Big,
    sharesSoldAmount: Big,
    fees: number,
): Big[] =>
    computeBalanceAfterTrade(
        initialPoolBalances,
        outcomeIndex,
        fees !== 1 ? mulBN(returnAmount, 1 / (1 - fees)).mul(-1) : ZERO,
        sharesSoldAmount.mul(-1),
    );

export default computeBalanceAfterShareSale;
