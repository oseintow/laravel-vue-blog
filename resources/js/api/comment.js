import axios from 'axios'

export function getComments({slug, query}) {
    return axios.get(`/v1/blogs/${slug}/comments`, { params: query })
}

export function saveComment({slug, body}) {
    return axios.post(`/v1/blogs/${slug}/comments`, { body })
}