# ​calcSellAmountInCollateral

Calculates the amount of shares you can sell

```TypeScript
FluxSdk.utils.calcSellAmountInCollateral(
    sharesToSell: Big,
    outcomeId: number,
    poolBalances: Big[],
    fee: number,
): Big | null
```

## Parameters
|Key|Type|Description
|---|---|---|
|sharesToSell|Big|The number of shares that need to be sold
|outcomeId|number|The outcome id you want to sell
|poolBalances|Big[]|The AMM pool balances. The index of the array is the outcome id
|fee|number|The fee of the market maker, between 0 and 1

## Returns
A Big.js number containing the amount of collateral you get back. null when the amount could not be calculated.

## Example

```TypeScript
const amountOut = FluxSdk.utils.calcSellAmountInCollateral(
    new Big('1000000000000000000000000'),
    outcomeId,
    // The current pool balances as Big.js numbers
    [
        new Big('100000000000000000000000000'),
        new Big('100000000000000000000000000'),
    ],
    // 2% fee
    0.02,
);
```
