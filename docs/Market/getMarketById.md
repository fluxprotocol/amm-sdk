# getMarketById

Gets a specific market by it's id

```TypeScript
sdkInstance.getMarketById(marketId: string, accountId?: string): Promise<MarketDetailGraphData>
```

## Parameters
|Key|Type|Description
|---|---|---|
|marketId|string|The market id you want to fetch
|accountId|string / undefined|The account id you want to know the info of. (Mostly used whether or not a user has claimed their earnings)

## Returns
An object containing [`MarketDetailGraphData​`](../Types/MarketDetailGraphData.md)

## Example

```TypeScript
const market = await sdkInstance.getMarketById('1', 'myAwesomeAccount.near');
console.log(market);
```
