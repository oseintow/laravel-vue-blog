const state = {
    blogs: []
}

const mutations = {
    BLOGS: (state, payload) => {
        state.blogs = payload
    }
}

const actions = {
    blogs({commit}){
        commit('BLOGS', {name: 'shopify'});
    }
}

const getters = {
    getPlatforms : state => {
        return state.blogs
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}