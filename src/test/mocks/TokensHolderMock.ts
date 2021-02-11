

const TokensHolderMock = jest.fn((tokenContractMock) => {
    return {
        getTokenContract: jest.fn(() => {
            return tokenContractMock;
        }),
    }
});

export default TokensHolderMock;
