import { saveBlog, getBlogs, getBlog, getUserBlogs } from '@/api/blog'

const state = {
}

const mutations = {
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
                    resolve(data)
                })
                .catch(error => reject(error))
        })
    },
    getBlog({commit}, payload) {
        return new Promise((resolve, reject) => {
            getBlog(payload)
                .then(({data}) => {
                    resolve(data)
                })
                .catch(error => reject(error))
        })
    },
    getUserBlogs({commit}, payload) {
        return new Promise((resolve, reject) => {
            getUserBlogs(payload)
                .then(({data}) => {
                    resolve(data)
                })
                .catch(error => reject(error))
        })
    },
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