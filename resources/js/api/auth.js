import axios from 'axios'

export function logout() {
    return axios.get('v1/logout')
}