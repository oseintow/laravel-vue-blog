import axios from 'axios'

/*
Laravel does not support formData PUT request
So _method: PUT has to be added to the form data
and send your PUT request as POST request
 */
export function update({id, formData}) {
    return axios.post(`/v1/users/${id}`, formData)
}