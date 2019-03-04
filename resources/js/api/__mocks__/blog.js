import axios from 'axios'

export const saveBlog = jest.fn()

export const updateBlog =jest.fn()

export const getBlog = jest.fn(() => {
    return Promise.resolve({data: 'mocked blog'})
})

export const deleteBlog = jest.fn()

export const getBlogs = jest.fn(() => {
    return Promise.resolve({data: 'mocked blogs'})
})

export const getUserBlogs = jest.fn(() => {
    return Promise.resolve({data: 'mocked user blogs'})
})

export const getUserBlog = jest.fn(() => {
    return Promise.resolve()
})
