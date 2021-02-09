import FluxSdk from "./FluxSdk";

describe('FluxSdk', () => {
    describe('contructor', () => {
        it('should be able to generate a sdkConfig with no parameters given', () => {
            const fluxSdk = new FluxSdk();

            expect(fluxSdk.sdkConfig.graphApiUrl).toBeDefined();
        });

        it('should allow changes to be applyed', () => {
            const fluxSdk = new FluxSdk({
                graphApiUrl: 'test',
            });

            expect(fluxSdk.sdkConfig.graphApiUrl).toBe('test');
        });
    });

    describe('connect', () => {
        let fluxSdk: FluxSdk;

        beforeEach(() => {
            fluxSdk = new FluxSdk();
        });

        it('should be able to connect', async () => {
            await fluxSdk.connect();

            expect(fluxSdk.near).toBeDefined();
            expect(fluxSdk.walletConnection).toBeDefined();
            expect(fluxSdk.account).toBeDefined();
            expect(fluxSdk.protocol).toBeDefined();
        });
    });
});