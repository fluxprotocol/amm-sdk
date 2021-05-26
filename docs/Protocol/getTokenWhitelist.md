# getTokenWhitelist

Get's call the collateral tokens that is allowed by the protocol

```TypeScript
sdkInstance.getTokenWhitelist(): Promise<TokenWhitelist[]>
```

## Params
No parameters required

## Returns
An array of objects of the type TokenWhitelist

### TokenWhitelist

|Key|Type|Description|
|---|---|---|
|tokenId|string|The token account id living on the NEAR blockchain|
|decimals|numbers|The number of decimals the token has|

## Example

```TypeScript
const tokens = await sdkInstance.getTokenWhitelist();
console.log(tokens);
```
