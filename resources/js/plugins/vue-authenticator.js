import {VueAuthenticate} from "vue-authenticate";
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export const getVueAuthenticate = () => {
    return new VueAuthenticate(Vue.prototype.$http, {
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
}

