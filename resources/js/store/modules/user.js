import { update } from '@/api/user'

export const actions = {
    update({commit}, payload) {
        return new Promise((resolve, reject) => {
            update(payload)
                .then(({data}) => {
                    commit('auth/SET_AUTH_USER', data.user, { root: true })
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
