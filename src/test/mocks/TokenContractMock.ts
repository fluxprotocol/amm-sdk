const TokenContractMock = jest.fn(() => {
    return {
        transferCall: jest.fn(() => {

        }),
    };
});

export default TokenContractMock;
