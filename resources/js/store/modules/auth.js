import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import { VueAuthenticate } from 'vue-authenticate'
import axios from 'axios';

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const vueAuth = new VueAuthenticate(Vue.prototype.$http, {
    baseUrl: 'http://localhost:8000'
})


const state= {
    isAuthenticated: false
}

// You can use it as a state getter function (probably the best solution)
const getters= {
    isAuthenticated: () => vueAuth.isAuthenticated()
}

// Mutation for when you use it as state property
const mutations = {
    isAuthenticated: (state, payload) => {
        state.isAuthenticated = payload.isAuthenticated
    }
}

const actions= {

    // Perform VueAuthenticate login using Vuex actions
    login(context, payload) {
        vueAuth.login(payload.user, payload.requestOptions).then((response) => {
            context.commit('isAuthenticated', {
                isAuthenticated: vueAuth.isAuthenticated()
            })
        })
    },

    authenticate({commit}, provider) {
        this.$auth.authenticate(provider).then((response) => {
            // Execute application logic after successful social authentication
            console.log(response)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}