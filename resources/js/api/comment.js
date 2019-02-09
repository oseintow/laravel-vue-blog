import axios from 'axios'

export function getComments(payload) {
    return axios.get(`/v1/blogs/${payload.slug}/comments`)
}