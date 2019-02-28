import { getCategories } from "@/api/category";

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
                .then(({data}) =>{
                    console.log(data)
                    commit('CATEGORIES', data.categories)
                    resolve(data)
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