import axios from 'axios'

export function register(payload) {
    return axios.post('/v1/register', payload)
}

export function login(payload) {
    return axios.post('/v1/login', payload)
}

export function logout() {
    return axios.get('/v1/logout')
}

export function sendPasswordResetLink(payload) {
    return axios.post('/v1/password/email', payload)
}

export function resetPassword(payload) {
    return axios.post('/v1/password/reset', payload)
}
