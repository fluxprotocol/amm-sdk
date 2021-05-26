# getParticipatedMarkets
Gets all the markets that a user has interacted with

```TypeScript
sdkInstance.getParticipatedMarkets(accountId: string, options?: GetParticipatedMarketsOptions): Promise<Pagination<ParticipatedMarket>>
```

## Parameters
|Key|Type|Description|
|---|---|---|
|accountId|string|The id of the account|
|options|GetParticipatedMarketsOptions|Options for the query (Used for pagination)|

### GetParticipatedMarketsOptions

|Key|Type|Description|
|---|---|---|
|limit|number / undefined|How many entries you want back|
|offset|number / undefined|How many entries you want to skip (pagination)|

## Returns
|Key|Type|Description|
|---|---|---|
|items|ParticipatedMarket[]|An array of participated markets|
|total|number|The total amount of transactions available (for pagination)|

### ParticipatedMarket

|Key|Type|Description|
|---|---|---|
|participated_date|string|The date the user has participated in the market|
|market|MarketGraphData|The market graph data without the pool parameter. For more info see here​|

## Example

```TypeScript
const result = await sdk.getParticipatedMarkets('myAccount.near', {
    limit: 10,
    offset: 0,
});
```
