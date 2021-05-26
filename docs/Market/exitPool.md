# exitPool

Allows a liquidity provider to exit the pool and trades their pool tokens back for the outcome shares. The user can then trade the outcome shares for collateral. Will also transfer the accumulated fees in collateral.

```TypeScript
sdkInstance.exitPool(marketId: string, totalIn: string): Promise<void>
```

## Parameters
|Key|Type|Description
|---|---|---|
|marketId|string|The market ID you want to exit
|totalIn|string|The total amount of pool tokens you put in

## Example
```TypeScript
sdkInstance.exitPool('16', '10000000000');
```
