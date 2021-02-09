import FluxSdk from '../dist/FluxSdk';

async function main() {
    const sdk = new FluxSdk();
    await sdk.connect();

    if (!sdk.isSignedIn()) {
        sdk.signIn();
    }

    // sdk.createMarket({
    //     description: 'New market',
    //     endDate: new Date(new Date().getTime() + 10000000),
    //     extraInfo: 'Invalid me',
    //     outcomes: ['YES', 'NO'],
    // });
}

main();
