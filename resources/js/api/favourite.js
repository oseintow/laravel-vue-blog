import axios from 'axios'

export function saveFavourite({endpoint}) {
    return axios.post(endpoint)
}

export function deleteFavourite({endpoint}) {
    return axios.delete(endpoint)
}