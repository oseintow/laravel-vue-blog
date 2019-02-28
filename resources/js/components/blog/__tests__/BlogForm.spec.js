import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import BlogForm from '@/components/blog/BlogForm'
import TestHelpers from '@/test/test-helpers'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()

describe('BlogForm', () => {
    let store

    describe('Creating a new Blog', () => {
        store = new vuex.Store({
            modules: {
                blog: {
                    namespace: true,
                    actions
                }
            }
        })
        wrapper = shallowMount(BlogForm, {
            store
        })
    })

    describe('Updating an old Blog', () => {

    })

    it('', () => {
        expect(true).toBeTruthy()
    })
})