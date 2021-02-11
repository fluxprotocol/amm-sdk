import FluxSdk from '../dist/FluxSdk';

async function main() {
    const sdk = new FluxSdk();
    window.sdk = sdk;
    await sdk.connect();

    if (!sdk.isSignedIn()) {
        sdk.signIn();
    }

    const r = await sdk.getPriceHistoryByMarketId('55', '1d');
    console.log('[] r -> ', r);
}

main();
