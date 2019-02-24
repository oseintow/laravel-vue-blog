import axios from 'axios'

export function saveBlog(payload) {
    return axios.post('/v1/blogs', payload)
}

/*
Laravel does not support formData PUT request
So _method: PUT has to be added to the form data
and send your PUT request as POST request
 */
export function updateBlog({slug, formData}) {
    return axios.post(`/v1/blogs/${slug}`, formData)
}

export function getBlog({slug}) {
    return axios.get(`/v1/blogs/${slug}`)
}

export function getBlogs(payload) {
    return axios.get('/v1/blogs', { params: payload})
}

export function getUserBlogs(payload) {
    return axios.get(`/v1/users/${payload.params.nickname}/blogs`, {params: payload.query})
}

export function getUserBlog({nickname, slug}) {
    return axios.get(`/v1/users/${nickname}/blogs/${slug}`)
}
