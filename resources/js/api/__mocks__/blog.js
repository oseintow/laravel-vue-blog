import axios from 'axios'

export const saveBlog = jest.fn()

export const updateBlog =jest.fn()

export const getBlog = jest.fn(() => {
    return Promise.resolve()
})

export const deleteBlog = jest.fn(() => {
    return Promise.resolve()
})

export const getBlogs = jest.fn(() => {
    return Promise.resolve()
})

export const getUserBlogs = jest.fn(() => {
    return Promise.resolve()
})

export const getUserBlog = jest.fn(() => {
    return Promise.resolve()
})
