# getTransactions

Fetches all the transactions for a account or market

```TypeScript
sdkInstance.getTransactions(params: GetTransactionsParams): Promise<Pagination<FluxTransaction>>
```

## Parameters

|Key|Type|Description|
|---|---|---|
|params|GetTransactionsParams|object with parameters for the query call|


### GetTransactionsParams
|Key|Type|Description|
|---|---|---|
|accountId|string / undefined|Filter transactions by account id|
|marketId|string / undefined| Filter transactions by market id|
|offset|number / undefined|How many entries you want to skip (pagination)|
|limit|number / undefined|How many entries you want back|

## Returns

An object containing the following:

|Key|Type|Description|
|---|---|---|
|items|FluxTransaction[]|An array of transactions|
|total|number|The total amount of transactions available (for pagination)|

### FluxTransaction

|Key|Type|Description|
|---|---|---|
|account_id|string|The account id|
|input|string|The amount that went in (either outcome shares, pool token, or collateral)|
|output|string|The amount that the account got back (either outcome shares, pool token, or collateral)|
|market_id|string|The market id|
|outcome_id|string|The outcome id (if it's used, otherwise it's "0")|
|date|string|Timestamp in milliseconds|
|type|FluxTransactionType|The type of transaction (see below)|
|pool| ```{ collateral_token_id:string }```|The collateral token token id|
|market|TransactionMarket|Partial market data|


### FluxTransactionType

For each type the input and output are different.

|Key|Description|
|---|---|
|Buy|Buy transaction <br /> input: The amount of collateral <br/> output: The amount of outcome tokens you get back|
|Sell|Sell transaction <br/> input: The amount of shares in <br /> output: The amount of collateral out |
|Redeem|Redeem shares for collateral <br/> input: The amount of each share <br/> output: The amount of collateral out |
|ClaimEarnings | Claim transaction <br /> input: Not used always 0 <br /> output: The amount of collateral claimed|
|AddLiquidity | Add liquidity transaction <br /> input: The amount of collateral in <br /> output: The amount of pool tokens out |
|RemoveLiquidity | Remove liquidity transaction <br /> input: The amount of pool tokens in <br /> output: The amount of fees out |

### TransactionMarket

|Key|Type|Description|
|---|---|---|
|description|string|Description of market|
|outcome_tags|string[]|Outcome tags|
|is_scalar|boolean|Whether the market is scalar or not|

## Example

```TypeScript
const result = await sdk.getTransactions({
    accountId: 'myNearAccount.near',
    limit: 100,
    offset: 0,
});
​```​
