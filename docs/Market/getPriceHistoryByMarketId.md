# getPriceHistoryByMarketId

Gets the price history for a specific period with different date points.

```Typescript
sdkInstance.getPriceHistoryByMarketId(marketId: string, options: PriceHistoryOptions): Promise<PriceHistoryData[]>
```

## Params

|Key|Type|Description
|---|---|---|
|marketId|string|The market ID
|options|PriceHistoryOptions|Options for pricing

### PriceHistoryOptions
|Key|Type|Description
|---|---|---|
|beginDate|Date|The date from where the price history should start|
|endDate|Date / undefined|The end date where the price history should stop. Defaults to the current Date|
|metric|DateMetric|The amount of time each data point is apart. Can be one of the following: <br> DateMetric.minute <br> DateMetric.hour <br> DateMetric.day <br> DateMetric.week <br> DateMetric.month <br> DateMetric.year |

## Returns
An array of PriceHistoryData

### PriceHistoryData
|Key|Type|Description|
|---|---|---|
|pointKey|string|Encoded information about which date the prices are
|dataPoints|PriceForOutcome[]|Information about each outcome and its price

### PriceForOutcome
|Key|Type|Description
|---|---|---|
|price|string|The price of the outcome token/share
|outcome|number|The outcome id

## Example

```TypeScript
import { DateMetric } from '@fluxprotocol/amm-sdk';
​
sdkInstance.getPriceHistoryByMarketId("6", {
    // Since the begin
    beginDate: new Date(1),
    metric: DateMetric.hour
});
```
