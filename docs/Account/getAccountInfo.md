# getAccountInfo

Gets the account its outcome balances and earned fees for all the markets

```TypeScript
sdkInstance.getAccountInfo(accountId: string, options?: GetAccountInfoOptions): Promise<{
    balances: AccountBalance[];
    earned_fees: AccountFeeBalance[];
}>;
```

## Parameters
|Key|Type|Description|
|---|---|---|
|accountId|string|The account you want to fetch the balances of|
|options|GetAccountInfoOptions|Extra options for filtering|

### GetAccountInfoOptions

|Key|Type|Description|
|---|---|---|
|removeZeroBalances|boolean|Removes the balances that are equal to 0. defaults to true|
|removeClaimedBalances|boolean|Remove all the markets that are already claimed. defaults to true|

## Returns

An object containing the following:

|Key|Type|Description|
|---|---|---|
|balances|AccountBalance[]|An array of balance info|
|earned_fees|AccountFeeBalance[]|An array of all the pool token balances and fees the user earned|

### AccountBalance
|Key|Type|Description|
|---|---|---|
|balance|string|Balance of shares|
|outcome_id|number|The outcome id|
|pool_id|number|The pool id (same as market id)|
|spent|string|The amount of collateral a user has spent|
|market|AccountBalanceMarket|Information about the market|

### AccountBalanceMarket

|Key|Type|Description|
|---|---|---|
|description|string|Description of the market|
|outcome_tags|string[]|The tags attached to the outcome. The index is the outcome id.
|end_time|string|The timestamp when the market ends|
|finalized|boolean|Whether or not the market has been finalized.|
|payout_numerator|string[] / null| The market payout per outcome. Available when the market is finalized. If the market is finalized and the value is null it means the market was invalid.|
|is_scalar|boolean|Whether or not this market is a scalar market|
|pool|Pool|Info about the AMM pool. See doc​|

### AccountFeeBalance
|Key|Type|Description|
|balance|string|The number of pool tokens|
|fees|string|The amount of fees the user has earned.|
|outcomeId|number|Outcome ID of the pool token|
|poolId|string|The pool id (same as market id)|
|market|AccountFeeBalanceMarket|Partial information about the market|

### AccountFeeBalanceMarket
|Key|Type|Description
|---|---|---|
|description|string|Description of the market|
|is_scalar|boolean|Whether or not this market is a scalar market|
|pool| ```{ collateral_token_id: string }``` |An object containing only the collateral token id|

## Example
```TypeScript
sdkInstance.getAccountInfo("myAwesomeaccount.near", {
    removeClaimedBalances: true,
    removeZeroBalances: true,
});
```
