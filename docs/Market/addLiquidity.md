# addLiquidity

Adds liquidity to the market. When given weights it seeds the market. Seeding is only possible when the amount of liquidity providers is 0. (Can be seen by using the pool token total_supply).

This also gives the sender back LP tokens. The holder will get a percentage of every trade.

```TypeScript
sdkInstance.addLiquidity(collateralTokenId: string, marketId: string, amountIn: string, weights?: number[], txParams?: TransactionParams): Promise<void>
```

## Parameters
|Key|Type|Description
|---|---|---|
|collateralTokenId|string|The collateral token account ID this market uses
|marketId|string|The market ID you want to add liquidity to
|amountIn|string|The amount of collateral you want to put in
|weights|number[] / undefined|When the market has no liquidity you can pass this param. Weights are in percentages and should be combined 100. Where the index of the array matches the outcomeId.
|txParams|TransactionParams / undefined|Customize the gas/value transferred along with this transaction. For detail see the [TransactionParams](../Types/TransactionParams.md) doc.

## Example
Example for seeding a market:
```TypeScript
sdkInstance.addLiquidity(
    "wrap.near",
    "16", 
    // 1 NEAR as collateral
    "1000000000000000000000000",
    // Seeding the market for a YES/NO market at the odds of 60% / 40%
    [60, 40]
);
```


Example for adding liquidity:
```Typescript
sdkInstance.addLiquidity(
    "wrap.near",
    "16", 
    // 1 NEAR as collateral
    "1000000000000000000000000",
);
```
