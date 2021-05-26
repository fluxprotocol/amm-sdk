# getMarkets
Allows you to query the markets available on Flux

```Typescript
sdkInstance.getMarkets(filters: MarketFilters = {}): Promise<Pagination<MarketGraphData>>
```

## Parameters
|Key|Type|Description|
|---|---|---|
|filters|MarketFilters / undefined|Filters for which markets you want to return|

### MarketFilters
|Key|Type|Description
|---|---|---|
|categories|string[] / undefined|Categories you want back.
|expired| boolean / undefined|Only include expired markets (That are past their end time)
|finalized| boolean / undefined|Only include markets that are finalized
|limit|number|The number of markets to get back
|offset|number|Skip a number of markets. Used for pagination

## Returns

`Promise<Pagination<MarketGraphData>>`

### Pagination

|Key|Type|Description
|---|---|---|
|items|MarketGraphData[]|An array containing all the markets
|total|number|The total amount of markets available for this filter. Can be used for pagination


For details about MarketGraphData please go to the specific doc: [MarketGraphData](../Types/MarketGraphData.md)
