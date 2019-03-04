export const getCategories = jest.fn(() => {
    return Promise.resolve({data: { categories: 'categories'}})
})