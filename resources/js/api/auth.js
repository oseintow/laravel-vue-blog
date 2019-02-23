import axios from 'axios'

export function register(payload) {
    return axios.post('v1/register', payload)
}

export function logout() {
    return axios.get('v1/logout')
}