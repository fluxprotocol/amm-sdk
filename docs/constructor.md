# constructor

The Flux constructors allows for the possibility of some customisation.

```TypeScript
const sdkTestNet = new FluxSdk();
const sdkMainNet = new FluxSdk({
    network: 'mainnet',
});
```
​
|Parameter|Type|Description|Default|
| --- | --- | --- | --- |
|graphApiUrl| string | Flux GraphQL API URL | ​https://api.flux.xyz/graphql​ |
|protocolContractId| string |Flux Protocol contract account id| amm.flux-dev |
|network|string|NEAR network type|testnet|
|keyStore|KeyStore|Custom KeyStore object, this is where signIn credentials are stored. Defaults to browser's local storage, which works only for every web application. This parameter should only be required for custom solutions that don't have access to thewindow object.| BrowserLocalStorageKeyStore() |
|nullContractId|string|Contract that is used to sign in with, this allows every transaction to be explicitly be approved|null_contract.flux-dev|
