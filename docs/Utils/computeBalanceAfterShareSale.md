# computeBalanceAfterShareSale

Computes the new pool balances after an outcome token/share has been sold. Can be used in combination with calcPrice to see how a trade affects the price.

```TypeScript
FluxSdk.utils.computeBalanceAfterShareSale(
    initialPoolBalances: Big[],
    outcomeIndex: number,
    returnAmount: Big,
    sharesSoldAmount: Big,
    fees: number,
): Big[]
```

## Parameters
|Key|Type|Description
|---|---|---|
|initialPoolBalances|Big[]|An array of the current pool balance
|outcomeIndex|number|The outcome index you want to sell
|returnAmount|Big|The amount of collateral you want to have back. You should use calcSellAmountInCollateral for this.
|sharesSoldAmount|Big|The number of shares you are selling. 
|fees|number|Fee percentage between 0 and 1

## Returns
Big.js numbers as new prices where the index is the outcome id.

Can throw an error when the trade is not possible due to not enough liquidity in the market.

## Example

```TypeScript
const poolBalances = [
    new Big('100000000000000000000000000'),
    new Big('100000000000000000000000000'),
];
​
const outcomeIndex = 0;
const amountIn = new Big('1000000000000000000000000');
const amountOut = FluxSdk.utils.calcSellAmountInCollateral(amountIn, outcomeIndex, poolBalances, 0.02);
​
const pricesBeforeTrade = FluxSdk.utils.calcPrice(poolBalances.map(pb => pb.toString()));
const poolBalancesAfterTrade = FluxSdk.utils.computeBalanceAfterShareSale(poolBalances, outcomeIndex, amountOut, amountIn, 0.02);
const pricesAfterTrade = FluxSdk.utils.calcPrice(poolBalancesAfterTrade.map(pb => pb.toString()));
​
console.log('Prices before trade: ', pricesBeforeTrade);
console.log('Prices after trade: ', pricesAfterTrade);
```
