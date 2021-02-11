const TokenContractMock = jest.fn(() => {
    return {
        transferWithVault: jest.fn(() => {

        }),
    };
});

export default TokenContractMock;
