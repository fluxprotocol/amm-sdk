# calcScalarDistributionPercentages
Calculates the distribution percentages used for creating a market. This can be useful if for example you have a market on a certain asset and want the initial value to be the current price.

```TypeScript
FluxSdk.utils.calcScalarDistributionPercentages(pointerValue: Big, lowerBound: Big, upperBound: Big): number[];
```

## Params
|Key|Type|Description
|---|---|---|
|pointerValue|Big|The initial value of the scalar market
|lowerBound|Big|The lowest outcome value (bound)
|upperBound|Big|The highest outcome value (bound)

## Returns
An array of numbers. These are percentages that can be used for creating a market.

## Example

```TypeScript
// A market on the price of BTC. The initial price will be $52000
const weightsInPercentages = FluxSdk.utils.calcScalarDistributionPercentages(new Big(52000), new Big(100), upperBound: new Big(60000));
​
// Should be used in combination with seeding the market
sdkInstance.addLiquidity("wrap.near", "7", "1000000000000000000000000", weightsInPercentages);
```
