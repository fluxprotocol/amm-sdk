# Getting started
Getting started with the Flux AMM SDK

## Installing the SDK
You can install this package via npm

```Bash
$ npm install @fluxprotocol/amm-sdk
```

## Implementation
Now, all that's left is importing it into your project:

```TypeScript
import FluxSdk from '@fluxprotocol/amm-sdk';
​
async function main() {
    const sdk = new FluxSdk();
    await sdk.connect();
    
    console.log('Connected and ready to go!');
}
​
main();
```
