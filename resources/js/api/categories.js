import axios from 'axios'

export function getCategories() {
    return axios.get('/v1/categories')
}

