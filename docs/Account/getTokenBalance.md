# getTokenBalance
Gets the balance of a NEP-145 compatible token

```TypeScript
sdkInstance.getTokenBalance(collateralTokenId: string, accountId: string): Promise<string>
```

## Parameters
|Key|Type|Description|
|---|---|---|
|collateralTokenId|string|The collateral token id which you want to know the balance of|
|accountId|string|The account you want to know the balance of|

## Returns
Returns the number of tokens the user has as a string.

## Example
```TypeScript
const balance = await sdkInstance.getTokenBalance('wrap.near', 'myAwesomeAccount.near');
console.log(balance);
```
