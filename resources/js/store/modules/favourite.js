import { saveFavourite, deleteFavourite } from '@/api/favourite'

export const actions = {
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

export default {
    namespaced: true,
    actions,
}
