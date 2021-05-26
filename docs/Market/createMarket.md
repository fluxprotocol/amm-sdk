# createMarket

Allows you to create either a categorical or scalar market. 

```TypeScript
sdkInstance.createMarket(marketParams: MarketParams);
```

## Parameters
|Key|Type|Description
|---|---|---|
|marketParams|MarketParams|The parameters for creating a market

### MarketParams
|Key|Type|Description
|---|---|---|
|description|string|The description of the market. This is the question that is presented to the user.
|endDate|Date|The end date of the market. This will close the market for trading, it will not resolve it.
|resolutionDate|Date| The date the market should be resolved. Defaults to the same as `endDate`.
|extraInfo|string|The information used to resolute the market. Mostly used for the oracle. But also very handy for users.
|outcomes|string[]|An array of outcomes.
|categories|string[]| The categories this market belongs to. Is used for filtering. You should also include your app name (or an encoded name) in order to filter markets only for your app.
|collateralTokenId|string| The collateral token you want to use for trading. This only allows tokens that are whitelisted by the Flux Protocol.
|swapFee|string|Fee per swap that goes to liquidity providers. Denom in collateral token decimals.
|isScalar|boolean|Whether a market is a scalar market or not.
|challengePeriod| string | How long a challenge will take on the oracle in nano seconds (defaults to `43200000000000` or 12 hours)

## Categorical market

Categorical markets are markets that allow the user to pick a specific outcome. This can be a simple as YES/NO or complex like "Who will win the FIFA world cup?" which has the options "The Netherlands/England/Italy/Other".

```TypeScript
sdkInstance.createMarket({
    description: "Will BTC hit $1000000 before the end of December 12th 2021?",
    endDate: new Date(1639353599),
    extraInfo: "This market will resolve using: https://www.coingecko.com/en/coins/bitcoin",
    outcomes: [
        "YES",
        "NO"
    ],
    categories: [
        "crypto",
        "myAwesomeApp"
    ],
    collateralTokenId: 'wrap.near',
    // This is 2% denom in 24 decimals (since wrap.near has 24 decimals)
    swapFee: "20000000000000000000000",
    isScalar: false,
});
```

This will automatically redirect the user to the near wallet and asks the user to sign the transaction.

## Scalar market
Scalar markets work differently in the sense that it uses the outcomes as ranges. This allows you to create prediction markets that predict a numeric value between 2 values. This is incredibly powerful for price prediction, weather prediction, and more.

```TypeScript
sdkInstance.createMarket({
    description: "What will the price of BTC be at the end of December 12th 2021?",
    endDate: new Date(1639353599),
    extraInfo: "This market will resolve using: https://www.coingecko.com/en/coins/bitcoin",
    // Notice how we put the ranges as outcomes instead of actual categories.
    outcomes: [
        "0",
        "1000000"
    ],
    categories: [
        "crypto",
        "myAwesomeApp"
    ],
    collateralTokenId: 'wrap.near',
    // This is 2% denom in 24 decimals (since wrap.near has 24 decimals)
    swapFee: "20000000000000000000000",
    isScalar: true,
});
```
