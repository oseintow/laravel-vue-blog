const state = {
    blogs: []
}

const mutations = {
    BLOGS: (state, payload) => {
        state.blogs = payload
    }
}

const actions = {
    blogs({commit}, payload){
        commit('BLOGS', payload);
    }
}

const getters = {
    getBlogs : state => {
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