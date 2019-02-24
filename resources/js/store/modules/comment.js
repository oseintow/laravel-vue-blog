import { getComments, saveComment, updateComment, deleteComment } from '@/api/comment'

const state = {
}

const mutations = {
}

const actions = {
    getComments({commit}, payload) {
        return new Promise((resolve, reject) => {
            getComments(payload)
                .then(({data}) => {
                    resolve(data)
                })
                .catch(error => reject(error))
        })
    },
    saveComment({commit}, payload) {
        return new Promise((resolve, reject) => {
            saveComment(payload)
                .then(({data}) => {
                    resolve(data)
                })
                .catch(error => reject(error))
        })
    },
    updateComment({commit}, payload) {
        return new Promise((resolve, reject) => {
            updateComment(payload)
                .then(({data}) => {
                    resolve(data)
                })
                .catch(error => reject(error))
        })
    },
    deleteComment({commit}, payload) {
        return new Promise((resolve, reject) => {
            deleteComment(payload)
                .then(({data}) => {
                    resolve(data)
                })
                .catch(error => reject(error))
        })
    }
}

const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
