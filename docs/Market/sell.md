# sell

Allows you to sell shares on a specific market

```Typescript
sdkInstance.sell(sellParams: SellParams, txParams?: TransactionParams): Promise<void>;
```

## Parameters

|Key|Type|Description
|---|---|---|
|sellParams|SellParams|Params for selling shares|
|txParams|TransactionParams / undefined|Customize the gas/value transferred along with this transaction. For detail see the TransactionParams doc.

### SellParams
An `object` containing the following:

|Key|Type|Description|
|---|---|---|
|marketId|string|The id of the market
|amountOut|string|The amount of collateral you want out
|amountIn|string|The amount of shares you want to put in
|outcomeId|number|The outcome id
|slippage|number / undefined|The maximum % of slippage that is allowed for a trade to happen. Defaults to 2.

## Example
Selling shares requires you to combine a couple of functions. We use the following:

* ​[getMarketById()​](../Market/getMarketById.md)
  * We use this to retrieve the current pool balances in order to use calcSellAmountInCollateral()
* [​calcSellAmountInCollateral()​](../Utils/calcSellAmountInCollateral.md)
  * Allows us to calculate the number of collateral you get out based on the current prices.


```TypeScript
import Big from 'big.js';
import FluxSdk from '@fluxprotocol/amm-sdk';
​
async function executeSell() {
    // Translates to 1 share (ex. YES)
    const amountIn = "1000000000000000000000000";
    const marketId = '16';
    const outcomeId = 0;
    const market = await sdkInstance.getMarketById(marketId);
    
    const amountOut = FluxSdk.utils.calcSellAmountInCollateral(
        new Big(amountIn),
        outcomeId,
        // The current pool balances as Big.js numbers
        market.pool.pool_balances.map(pb => new Big(pb.balance)),
        // 2% fee
        0.02,
    );
    
    sdkInstance.sell({
        marketId: marketId,
        // The outcome share you want to sell
        outcomeId: outcomeId,
        amountIn: amountIn,
        // The minimum amount you want out. It's best to calculate this
        // using the FluxSdk.utils.calcSellAmountInCollateral. This will give
        // the user the best price.
        amountOut: amountOut,
        // A 2% slippage on the amountOut.
        slippage: 2,
    });
}
​
executeSell();
```
