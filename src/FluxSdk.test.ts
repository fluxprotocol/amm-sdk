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

    describe('signIn', () => {
        let fluxSdk: FluxSdk;

        beforeEach(() => {
            fluxSdk = new FluxSdk();
        });

        it('should try to sign in', async () => {
            await fluxSdk.connect();
            const spy = jest.spyOn(fluxSdk.walletConnection!, 'requestSignIn');

            fluxSdk.signIn();

            expect(spy).toHaveBeenCalled();
        });

        it('should not be able to sign in when no connection was made', async () => {
            const result = () => {
                fluxSdk.signIn();
            };


            expect(result).toThrow(Error);
        });
    });

    describe('signOut', () => {
        let fluxSdk: FluxSdk;

        beforeEach(() => {
            fluxSdk = new FluxSdk();
        });

        it('should be able to sign out', async () => {
            await fluxSdk.connect();
            const spy = jest.spyOn(fluxSdk.walletConnection!, 'signOut');

            fluxSdk.signOut();

            expect(spy).toHaveBeenCalled();
        });
    });

    describe('createMarket', () => {
        let fluxSdk: FluxSdk;

        beforeEach(() => {
            fluxSdk = new FluxSdk();
        });

        it('should be able to create a market', async () => {
            await fluxSdk.connect();

            // @ts-ignore
            fluxSdk.protocol?.createMarket = jest.fn();
            const date = new Date();

            fluxSdk.createMarket({
                description: 'test',
                outcomes: ['test2'],
                endDate: date,
                extraInfo: 'test_info',
                swapFee: '100000000',
                collateralTokenId: 'mytoken',
            });

            expect(fluxSdk.protocol?.createMarket).toHaveBeenCalledWith(
                'test',
                ['test2'],
                [],
                date,
                'test_info',
                '100000000',
                'mytoken'
            );
        });
    });
});
