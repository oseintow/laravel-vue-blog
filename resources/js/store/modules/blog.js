import { saveBlog, getBlogs } from '@/api/blog'

const state = {
    blogs: []
}

const mutations = {
    BLOGS: (state, payload) => {
        state.blogs = payload
    }
}

const actions = {
    saveBlog({commit}, payload) {
        return new Promise((resolve, reject) => {
            saveBlog(payload)
                .then(({data}) => {
                    resolve(data)
                })
                .catch(error => reject(error))

        })
    },

    getBlogs({commit}, payload) {
        return new Promise((resolve, reject) => {
            getBlogs(payload)
                .then(({data}) => {
                    commit('BLOGS', data)
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