import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

import blog from './modules/blog'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        blog
    },
    plugins: [createPersistedState()]
})