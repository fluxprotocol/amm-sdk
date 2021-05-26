# calcBuyAmountInShares

Calculates the amount of shares you can buy with the given collateral
```TypeScript
FluxSdk.utils.calcBuyAmountInShares(investmentAmount: Big, outcomeIndex: number, poolBalances: Big[], fee: number, denomination: number): Big;
```

## Parameters
|Key|Type|Description
|---|---|---|
|investmentAmount|Big|The amount of collateral you want to put in
|outcomeIndex|number|The outcome id
|poolBalances|Big[]|The AMM pool balances. The index of the array is the outcome id
|fee|number|The fee this market uses.
|denomination|number|The amount of decimals the collateral has

## Returns
A Big.js number containing the numbers of shares you can get out.

## Example

```TypeScript
const amountOut = FluxSdk.utils.calcBuyAmountInShares(
    new Big('1000000000000000000000000'),
    outcomeId,
    // The current pool balances as Big.js numbers
    [
        new Big('100000000000000000000000000'),
        new Big('100000000000000000000000000'),
    ],
    // 2% fee
    0.02,
    // Amount of decimals the token has
    24,
);
```
