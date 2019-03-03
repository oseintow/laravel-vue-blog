const mockToken = 'mocked token';
const mockUser = 'mocked user'
let mockError = false

export const getVueAuthenticate = jest.fn(() => {
    return {
        authenticate() {
            return new Promise((resolve, reject) => {
                if (mockError)
                    reject(new Error('API Error occurred.'))

                resolve({data: {token: mockToken, user: mockUser}})
            })
        }
    }
})