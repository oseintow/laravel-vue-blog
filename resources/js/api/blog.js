import axios from 'axios'

export function saveBlog(payload) {
    return axios.post('v1/blogs', payload)
}

export function getBlogs(payload) {
    return axios.get('v1/blogs', { params: payload})
}

export function getUserBlogs(payload) {
    return axios.get(`v1/users/${payload.params.nickname}/blogs`, {params: payload.query})
}

export function getBlog({nickname, slug}) {
    return axios.get(`v1/users/${nickname}/blogs/${slug}`)
}
