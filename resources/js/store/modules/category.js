import { getCategories } from "@/api/categories";

const state = {
    categories: []
}

const mutations = {
    CATEGORIES: (state, payload) => {
        state.categories = payload
    }
}

const actions = {
    getCategories({commit}){
        return new Promise((resolve, reject) => {
            getCategories()
                .then(({data}) => {
                    commit('CATEGORIES', data);
                })
                .catch(error => reject(error))
        })
    }

}

const getters = {
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