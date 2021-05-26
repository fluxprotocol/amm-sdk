# getPoolTokenBalance

Fetches the pool token balance (including fees) of a market.

```TypeScript
sdkInstance.getPoolTokenBalance(accountId: string, marketId: string): Promise<GetPoolTokenBalanceResponse | null>
```

## Parameters
|Key|Type|Description|
|---|---|---|
|accountId|string|The account you want to know the pool token balance of|
|marketId|string|The market ID|

## Returns

Gives back null if the user has no pool tokens or `GetPoolTokenBalanceResponse`

### GetPoolTokenBalanceResponse
|Key|Type|Description|
|fees|string|The amount of fees earned in collateral|
|outcomeId|number|The outcome id of the pool token (not really used)|
|poolId|string|Same as marketID|
|balance|string|The amount of pool tokens the user has|
|market|PoolTokenBalanceMarket|Partial information about the market|

### PoolTokenBalanceMarket
|Key|Type|Description
|---|---|---|
|is_scalar|boolean|Whether or not the market is a scalar market
|description|string|The description of the market
|pool| `{ collateral_token_id: string }` |An object only containing the collateral token id

## Example

```TypeScript
const poolToken = await sdkInstance.getPoolTokenBalance("myAccount.near", "8");
console.log(poolToken);
```
