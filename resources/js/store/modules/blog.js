import { saveBlog } from '@/api/blog'

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
    },

    saveBlog({commit}, payload) {
        return new Promise((resolve, reject) => {
            saveBlog(payload)
                .then(({data}) => {
                    resolve(data)
                })
                .catch(error => reject(error))

        })
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