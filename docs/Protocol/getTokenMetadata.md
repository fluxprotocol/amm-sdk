# getTokenMetadata

Allows you fetch the metadata of a specific token that implements the ft_metadata interface.

```TypeScript
sdkInstance.getTokenMetadata(collateralTokenId: string): Promise<TokenMetadata>
```

## Parameters

|Key|Type|Description|
|---|---|---|
|collateralTokenId|string|The account id on the near blockchain that implements the NEP-145 standard|

## Returns

|Type|Description|
|---|---|
|Promise<TokenMetadata>|The token metadata containing "version", "name", "symbol", "reference" and "decimals"|

## Example

```TypeScript
const tokenMetadata = await sdk.getTokenMetadata('token.flux-dev');
```
