export default jest.fn(() => ({
    charges: {
        create: jest.fn().mockResolvedValue({
            id: 'ch_123',
            amount: 1000,
            currency: 'usd'
        })
    }
}));