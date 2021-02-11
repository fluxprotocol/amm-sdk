const tokenContract = jest.fn(() => {
    return {
        transferWithVault: jest.fn(() => {

        }),
    };
});

export const tokensHolderMock = jest.fn(() => {
    return {
        getTokenContract: jest.fn(() => {
            return tokenContract;
        }),
    }
});
