import axios from 'axios'

export function saveBlog(payload) {
    return axios.post('v1/blogs', payload)
}

export function getBlogs(payload) {
    return axios.get('v1/blogs', { params: payload})
}