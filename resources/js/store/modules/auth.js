import { getVueAuthenticate } from "@/plugins/vue-authenticator"
import { register, login, logout, sendPasswordResetLink, resetPassword } from '@/api/auth'

let vueAuth = getVueAuthenticate()

export const state= {
    isAuthenticated: false,
    user: null,
    token: null
}

// Mutation for when you use it as state property
export const mutations = {
    IS_AUTHENTICATED: (state, payload) => {
        state.isAuthenticated = payload.isAuthenticated
    },

    SET_AUTH_USER: (state, payload) => state.user = payload,

    SET_AUTH_TOKEN: (state, payload) => state.token = payload
}

export const actions= {
    register({commit}, payload) {
        return new Promise((resolve, reject) => {
            register(payload)
                .then(({data}) => {
                    commit('IS_AUTHENTICATED', {isAuthenticated: true})
                    commit('SET_AUTH_USER', data['user'])
                    commit('SET_AUTH_TOKEN', data['token'])
                    resolve(data)
                }).catch(error => reject(error))
        })
    },
    login({commit}, payload) {
        return new Promise((resolve, reject) => {
            login(payload)
                .then(({data}) => {
                    commit('IS_AUTHENTICATED', {isAuthenticated: true})
                    commit('SET_AUTH_USER', data['user'])
                    commit('SET_AUTH_TOKEN', data['token'])
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
        })
    },
    // Perform VueAuthenticate login using Vuex actions
    socialLogin({commit}, payload) {
        return new Promise((resolve, reject) => {
            vueAuth.authenticate(payload).then(({data}) => {
                commit('IS_AUTHENTICATED', {isAuthenticated: true})
                commit('SET_AUTH_USER', data['user'])
                commit('SET_AUTH_TOKEN', data['token'])
                resolve(data)
            }).catch(error => reject(error))
        })
    },

    logout({commit}) {
        return new Promise((resolve, reject) => {
            commit('IS_AUTHENTICATED', {isAuthenticated: false})
            commit('SET_AUTH_USER', null)
            commit('SET_AUTH_TOKEN', null)

            logout()
                .then((response) => {
                    resolve()
                })
                .catch(error => reject(error))
        });
    },

    sendPasswordResetLink({commit}, payload) {
        return new Promise((resolve, reject) => {
            sendPasswordResetLink(payload)
                .then(({data}) => {
                    resolve(data)
                })
                .catch(error => reject(error))
        });
    },

    resetPassword({commit}, payload) {
        return new Promise((resolve, reject) => {
            resetPassword(payload)
                .then(({data}) => {
                    commit('IS_AUTHENTICATED', {isAuthenticated: true})
                    commit('SET_AUTH_USER', data['user'])
                    commit('SET_AUTH_TOKEN', data['token'])
                    resolve(data)
                })
                .catch(error => reject(error))
        });
    }

}

// You can use it as a state getter function (probably the best solution)
export const getters= {
    isAuthenticated: state => state.isAuthenticated,

    getToken: state => state.token,

    authUser: state => state.user,

    user: state => state.user
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}