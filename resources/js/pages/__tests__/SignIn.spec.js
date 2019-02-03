const mockToken = 'xxx-xxx';
const mockUser = {name: 'foo', email: 'foo@bar.com'}
let mockError = false

jest.mock('@/plugins/vue-authenticator', () => ({
    getVueAuthenticate: jest.fn(() => {
        return {
            authenticate() {
                return new Promise((resolve, reject) => {
                    if (mockError)
                        reject(new Error('API Error occurred.'))

                    resolve({data: {token: mockToken, user: mockUser}})
                })
            }
        }
    })
}))

import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import SignIn from '@/pages/SignIn'
import TestHelpers from '@/test/test-helpers'
import { getters, mutations, actions } from '@/store/modules/auth'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()

describe('Sign In', () => {
    let wrapper
    let store
    const spy = jest.fn();

    let h
    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                auth: {
                    namespaced: true,
                    state: {
                        isAuthenticated: false,
                        user: null,
                        token: null
                    },
                    getters,
                    mutations,
                    actions
                }
            }
        })
        wrapper = shallowMount(SignIn, {
            localVue,
            store,
            router
        })
        h = new TestHelpers(wrapper, expect)
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it('component mounts without errors', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should be able to login using google social account', async () => {
        wrapper.vm.$router.push = spy;

        expect(true).toBeTruthy()
        h.click('.google-signin')


        await flushPromises()
        jest.runAllTimers()
        expect(spy).toHaveBeenCalledWith({ name: 'home' });
    });
})