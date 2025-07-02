export const natsWrapper = {
    client: {
        publish: jest.fn().mockImplementation(
            (subjcet: string, data: string, callback: () => void) => {
                callback();
            }
        )
    }
}