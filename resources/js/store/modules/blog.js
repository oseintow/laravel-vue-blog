import {
    saveBlog,
    updateBlog,
    deleteBlog,
    getBlogs,
    getBlog,
    getUserBlog,
    getUserBlogs
} from '@/api/blog'

export const state = {
    blog: [],
    blogs: []
}

export const mutations = {
    BLOGS: (state, payload) => {
        let blogs = state.blogs
        blogs.push(...payload.data)
        state.blogs = blogs
    },

    BLOG: (state, payload) => state.blog = payload
}

export const actions = {
    saveBlog({commit}, payload) {
        return new Promise((resolve, reject) => {
            saveBlog(payload)
                .then(({data}) => {
                    resolve(data)
                })
                .catch(error => reject(error))

        })
    },

    updateBlog({commit}, payload) {
        return new Promise((resolve, reject) => {
            updateBlog(payload)
                .then(({data}) => {
                    resolve(data)
                })
                .catch(error => reject(error))

        })
    },

    deleteBlog({commit}, payload) {
        return new Promise((resolve, reject) => {
            deleteBlog(payload)
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
    },

    getBlog({commit}, payload) {
        return new Promise((resolve, reject) => {
            getBlog(payload)
                .then(({data}) => {
                    commit('BLOG', data)
                    resolve(data)
                })
                .catch(error => reject(error))
        })
    },

    getUserBlog({commit}, payload) {
        return new Promise((resolve, reject) => {
            getUserBlog(payload)
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

export const getters = {
    blogs : state => {
        return state.blogs
    },

    blog: state => state.blog
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}