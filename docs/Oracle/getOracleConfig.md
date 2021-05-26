# getOracleConfig

Allows you to fetch the current active oracle config. Can be used to show the amount of bond that needs to be payed.

```TypeScript
sdkInstance.getOracleConfig(): Promise<OracleConfig>
```

## Returns

`Promise<OracleConfig>`

### OracleConfig

|Key|Type|Description|
|---|---|---|
|gov|string|The current gov account id
|final_arbitrator| string | The final arbitrator for resolving requests
|stake_token| string | The token used for staking on a data request
|bond_token| string | The bond token used for creating a data request
|validity_bond| string | The amount required for creating a data request (In our case it's required for creating a market)
|max_outcomes| number | The maximum amount of outcomes a market can have
|default_challenge_window_duration| string | The default duration for a challenge window, in nano seconds
|min_initial_challenge_window_duration| string | The minimum length for a challenge window in nano seconds
|final_arbitrator_invoke_amount| string | Amount of tokens that when bonded in a single `ResolutionWindow` should trigger the final arbitrator
|resolution_fee_percentage| number | Fee percentage

## Example

```TypeScript
const config = await sdkInstance.getOracleConfig();
console.log(config);
```
