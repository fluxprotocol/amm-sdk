# getNearBalance

Gets the amount NEAR available

## Example

```TypeScript
const balance = await sdk.getNearBalance();
console.log('You currently have: ', balance.available);
```

## Returns

|Type|Description|
|---|---|
|Promise<AccountBalance>| Current account balance of the NEAR account. Gives you back the full balance of available, staked, etc. For accurate information, you should use the  `available` property.|
