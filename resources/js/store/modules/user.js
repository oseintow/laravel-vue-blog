import { update } from '@/api/user'

const state = {
}

const mutations = {
}

const actions = {
    update({commit}, payload) {
        return new Promise((resolve, reject) => {
            update(payload)
                .then(({data}) => {
                    console.log(data.user);
                    commit('auth/SET_AUTH_USER', data.user, { root: true })
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
