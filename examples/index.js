import FluxSdk from '../dist/FluxSdk';

async function main() {
    const sdk = new FluxSdk();
    window.sdk = sdk;
    await sdk.connect();

    if (!sdk.isSignedIn()) {
        sdk.signIn();
    }

    const r = await sdk.getAccountInfo("franklinwaller.testnet");

    console.log('[] r -> ', r.earned_fees);
}

main();
