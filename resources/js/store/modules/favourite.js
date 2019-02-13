import { saveFavourite, deleteFavourite } from '@/api/favourite'

const state = {
}

const mutations = {
}

const actions = {
    saveFavourite({commit}, payload) {
        return new Promise((resolve, reject) => {
            saveFavourite(payload)
                .then(({data}) => {
                    resolve(data)
                })
                .catch(error => reject(error))
        })
    },

    deleteFavourite({commit}, payload) {
        return new Promise((resolve, reject) => {
            deleteFavourite(payload)
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
