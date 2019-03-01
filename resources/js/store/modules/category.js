import { getCategories } from "@/api/category";

export const state = {
    categories: []
}

export const mutations = {
    CATEGORIES: (state, payload) => {
        state.categories = payload
    }
}

export const actions = {
    getCategories({commit}){
        return new Promise((resolve, reject) => {
            getCategories()
                .then(({data}) =>{
                    commit('CATEGORIES', data.categories)
                    resolve(data)
                })
                .catch(error => reject(error))
        })
    }

}

export const getters = {
    categories : state => {
        return state.categories
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}