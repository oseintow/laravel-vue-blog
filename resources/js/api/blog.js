import axios from 'axios'

export function saveBlog(payload) {
    return axios.post('v1/blogs', payload)
}