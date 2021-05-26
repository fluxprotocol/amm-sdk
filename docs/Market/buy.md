# buy

Allows you to buy shares on a specific market

```Typescript
sdkInstance.buy(buyParams: BuyParams, txParams?: TransactionParams): Promise<void>
```

## Parameters
|Type|Description|
|---|---|
|BuyParams|Params for buying shares (for details see below)
|TransactionParams / undefined|Customize the gas/value transferred along with this transaction. For detail see the [TransactionParams](../Types/TransactionParams.md) doc.

### BuyParams
An object containing the following:

|Key|Type|Description
|---|---|---|
|collateralTokenId|string|The collateral token that is used in the market.
|marketId|string|The market ID
|outcomeId|number|The outcome share ID you want to buy
|amountOut|string|The minimum amount of shares you want to receive. Best to use in combination with calcBuyAmountInShares()​
|amountIn|string|The amount of collateral you put in
|slippage|number / undefined|The maximum % of slippage that is allowed for a trade to happen. Defaults to 2.

## Example
Buying shares requires you to combine a couple of functions. We use the following:

* [​getMarketById()​](./getMarketById.md)
    * We use this to retrieve the current pool balances in order to use calcBuyAmountInShares()
* [​calcBuyAmountInShares()​](../Utils/calcBuyAmountInShares.md)
  * Allows us to calculate the number of shares you get out based on the current prices.

```TypeScript
import Big from 'big.js';
import FluxSdk from '@fluxprotocol/amm-sdk';
​
async function executeBuy() {
    // Translates to 1 wNEAR
    const amountIn = "1000000000000000000000000";
    const marketId = '16';
    const outcomeId = 0;
    const market = await sdkInstance.getMarketById(marketId);
    
    const amountOut = FluxSdk.utils.calcBuyAmountInShares(
        new Big(amountIn),
        outcomeId,
        // The current pool balances as Big.js numbers
        market.pool.pool_balances.map(pb => new Big(pb.balance)),
        // 2% fee
        0.02,
        // Amount of decimals the token has
        24,
    );
    
    sdkInstance.buy({
        collateralTokenId: 'wrap.near',
        marketId: marketId,
        // The outcome share you want
        outcomeId: outcomeId,
        amountIn: amountIn,
        // The minimum amount you want out. It's best to calculate this
        // using the FluxSdk.utils.calcBuyAmountInShares. This will give
        // the user the best price.
        amountOut: amountOut,
        // A 2% slippage on the amountOut.
        slippage: 2,
    });
}
​
executeBuy();
```
