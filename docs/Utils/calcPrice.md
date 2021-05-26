# calcPrice
Calculates the price per outcome using pool balances.

```TypeScript
FluxSdk.utils.calcPrice(poolBalances: string[]): number[];
```

## Parameters
|Key|Type|Description
|---|---|---|
|poolBalances|string[]|An array of the current pool balances

## Returns
An array of numbers where the index is the outcome id.

## Example

```TypeScript
const prices = FluxSdk.utils.calcPrice([
    "1000000000000000000000000",
    "1000000000000000000000000"
]);
​
console.log(prices);
```
