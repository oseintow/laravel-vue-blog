import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate';
import BlogForm from '@/components/blog/BlogForm'
import TestHelpers from '@/test/test-helpers'
import flushPromises from 'flush-promises'
import { state, getters, mutations, actions } from '@/store/modules/blog'
import {
    state as category_state,
    getters as category_getters,
    mutations as category_mutations,
    actions as category_actions
} from '@/store/modules/category'

import Editor from '@/components/blog/Editor'
import Error from '@/components/Error'

let mockError = false;

jest.mock('@/api/category', () => ({
    getCategories: jest.fn(() => {
        return new Promise((resolve, reject) => {
            // if (mockError)
            //     reject(new Error('API Error occurred.'))

            resolve({
                data: {
                    categories: [
                        {
                            id: 1,
                            name: "Laravel",
                            slug: "laravel",
                            created_at: "2019-02-27 20:36:44",
                            updated_at: "2019-02-27 20:36:44"
                        },
                        {
                            id: 2,
                            name: "Vue",
                            slug: "vue",
                            created_at: "2019-02-27 20:36:44",
                            updated_at: "2019-02-27 20:36:44"
                        },
                    ]
                }
            })
        })
    })
}))

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(VeeValidate)
const router = new VueRouter()

describe('BlogForm', () => {
    let store
    let wrapper
    let h

    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                blog: {
                    namespaced: true,
                    state,
                    getters,
                    mutations,
                    actions
                },
                category: {
                    namespaced: true,
                    state: category_state,
                    getters: category_getters,
                    mutations: category_mutations,
                    actions: category_actions
                }
            }
        })
        wrapper = shallowMount(BlogForm, {
            localVue,
            store,
            router,
            stubs: {
                Editor: '<textarea type="text" name="editor"></textarea>',
                Error
            },
            propsData: {
                type: 'new',
                slug: 'foo-bar'
            },
            sync: false
        })

        h = new TestHelpers(wrapper, expect)
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    describe('Creating a new Blog', () => {
        beforeEach(() => {

        })

        it('kk', () => {
            wrapper.setData({
                formType: 'edit',
                slug: 'foo-bar'
            })

            expect(wrapper.vm.$data.formType).toBe('edit')
        })
    })

    // describe('Updating an old Blog', () => {
    //
    // })
    //
    it('', () => {
        expect(true).toBeTruthy()
    })
})