# getOracleDataRequest

Fetches the data request associated with the market. Usefull for when you want to show a link to the Flux Oracle Explorer.

```TypeScript
getOracleDataRequest(marketId: string): Promise<DataRequest | undefined>
```

## Parameters

|Key|Type|Description|
|---|---|---|
|marketId|string|The market id

## Returns

`Promise<DataRequest | undefined>`

`undefined` when the data request could not be found.

### DataRequest

|Key|Type|Description
|---|---|---|
|finalized_outcome| string / null | The finalized outcome. Can be either `"Invalid"` or `"Answer(ANSWER_HERE)"` |
|id| string | The ID of the data request
|date | string | The date the data request has been created
|settlement_time| string | The time in nano seconds when the request will be resolved

## Example

```TypeScript
const dataRequest = await sdkInstance.getOracleDataRequest("12");
console.log(dataRequest);
```
