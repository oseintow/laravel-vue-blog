export const update = jest.fn(() => {
    return Promise.resolve({data: { user: 'user data'}})
})