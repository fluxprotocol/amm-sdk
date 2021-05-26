# getEscrowStatus
Gets all the escrow statuses of a user

```TypeScript
sdkInstance.getEscrowStatus(accountId: string, marketId?: string, options: GetEscrowStatusOptions = {}): Promise<EscrowStatus[]>
```

## Parameters

|Key|Type|Description|
|---|---|---|
|accountId|string|The account id of the user|
|marketId|string / undefined|The id of the market|
|options|GetEscrowStatusOptions / undefined|Options for the fetch|

## GetEscrowStatusOptions

|Key|Type|Description|
|---|---|---|
|onlyActive|boolean|Whether or not to contain active escrows or not|

## Returns

An array with objects with the following contents:

|Key|Type|Description|
|---|---|---|
|total_amount|string|The total amount of collateral in escrow|
|type|'valid_escrow' / 'invalid_escrow'|The type of the escrow|
|market|PartialMarketData|Information about the market|

### PartialMarketData
|Key|Type|Description|
|---|---|---|
|id|string|The id of the market|
|description|string|The description of the market|
|pool| ```{ collateral_token_id: string }```| Information containing the collateral token id|

## Example
```TypeScript
const escrowStatus = await sdk.getEscrowStatus(accountId, undefined, {
    onlyActive: true,
});
```
