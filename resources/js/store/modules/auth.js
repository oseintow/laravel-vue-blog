import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import { VueAuthenticate } from 'vue-authenticate'
import axios from 'axios';

Vue.use(Vuex)
Vue.use(VueAxios, axios)

let vueAuth = new VueAuthenticate(Vue.prototype.$http, {
    baseUrl: 'http://localhost:8000',

    providers: {
        facebook: {
            clientId: '245842109488508',
            redirectUri: 'http://localhost:8000/auth/facebook/callback' // Your client app URL
        },

        google: {
            clientId: '340639301402-0u9qst24dn4va778opjhq3o3hcpv6ona.apps.googleusercontent.com',
            redirectUri: 'http://localhost:8000/auth/google/callback' // Your client app URL
        }
    }
})


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

    // Perform VueAuthenticate login using Vuex actions
    login({commit}, payload) {
        vueAuth.authenticate(payload).then(({data}) => {
            this.$auth = {user: data['user'], token: data['token'], check: true}
            commit('IS_AUTHENTICATED', {isAuthenticated: vueAuth.isAuthenticated()})
            commit('SET_AUTH_USER', data['user'])
            commit('SET_AUTH_TOKEN', data['token'])
        })
    }

}

// You can use it as a state getter function (probably the best solution)
export const getters= {
    isAuthenticated: () => vueAuth.isAuthenticated(),

    getToken: state => state.token,

    authUser: state => state.user
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}