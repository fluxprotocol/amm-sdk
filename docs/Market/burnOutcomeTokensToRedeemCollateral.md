# burnOutcomeTokensRedeemCollateral

Burns outcome tokens for the collateral token. Requires the account to have a balance of each outcome and can only burn the lowest balance.

```TypeScript
sdkInstance.burnOutcomeTokensRedeemCollateral(marketId: string, toBurn: string): Promise<void>
```

## Parameters
|Key|Type|Description|
|---|---|---|
|marketId|string|The market ID|
|toBurn|string|The lowest balance of all outcomes you have


## Example

```TypeScript
// Alice has 5 YES shares and 2 NO shares and 1 TIE share.
// The lowest balance is 1 TIE so we can only burn 1 share of each
// in exchange for collateral
sdkInstance.burnOutcomeTokensRedeemCollateral('16', '1000000000000000000000000');
// After this has executed Alice has 4 YES shares and 1 NO share
// Alice cannot burn more shares since she has no TIE shares
```
