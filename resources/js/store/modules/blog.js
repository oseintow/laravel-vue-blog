import { saveBlog, getBlogs } from '@/api/blog'

const state = {
    blogs: []
}

const mutations = {
    BLOGS: (state, payload) => {
        // console.log(...payload.data);
        state.blogs.push(...payload.data)
        // console.log(state.blogs);
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
    blogs : state => {
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