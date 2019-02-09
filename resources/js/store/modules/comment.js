import { getComments } from '@/api/comment'

const state = {
}

const mutations = {
}

const actions = {
    getComments({commit}, payload) {
        return new Promise((resolve, reject) => {
            getComments(payload)
                .then(({data}) => {
                    resolve(data)
                })
                .catch(error => reject(error))
        })
    }
}

const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
