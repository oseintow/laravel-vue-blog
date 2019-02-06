import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

import blog from './modules/blog'
import auth from './modules/auth'
import category from './modules/category'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        blog,
        auth,
        category
    },
    plugins: [createPersistedState()]
})