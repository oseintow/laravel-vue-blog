import axios from 'axios'

export function getComments({slug}) {
    return axios.get(`/v1/blogs/${slug}/comments`)
}

export function saveComment({slug, body}) {
    return axios.post(`/v1/blogs/${slug}/comments`, { body })
}