# connect
Setup a connection between the client and Flux Protocol smart contract.

To connect to the Flux Protocol smart contracts, which are deployed on NEAR protocol, we'll have to call the connect method.

## Parameters
```TypeScript
sdkInstance.connect(connectParams: ConnectParams): Promise<void>;
```

### ConnectParams:

|Parameter|Type|Description|
| --- | --- | --- |
|accountId| string / undefined | The accountId of the account you want to use to interact with the protocol. Only should be provided for server-side applications. |
|customNodeUrl|string / undefined |If you want to connect to a specific near node or network you can pass in the node's endpoint here. (only works for `"custom"` network connections.) |
|customWalletUrl|string / undefined|If you want to connect to a specific near web wallet you can pass in the wallet's endpoint here. (only works for `"custom"` network connections.)|

## Example

```TypeScript
const sdk = new FluxSdk();
​
await sdk.connect({
   customNodeUrl: 'http://MY_CUSTOM_NODE_URL/',
});
```
