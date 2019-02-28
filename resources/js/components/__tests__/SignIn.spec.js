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
import SignIn from '@/components/SignIn'
import TestHelpers from '@/test/test-helpers'
import { getters, mutations, actions } from '@/store/modules/auth'
import flushPromises from 'flush-promises'
import eventBus from '@/plugins/event-bus'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(eventBus)
const router = new VueRouter()

describe('Sign In', () => {
    let wrapper
    let store
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
            router,
            stubs: {
                bModal: true
            }
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

    it('should be able to response to sign-in event', async () => {
        expect(wrapper.vm.$data.show).toBe(false)
        wrapper.vm.$eventBus.signIn()
        expect(wrapper.vm.$data.show).toBe(true)
    })

    it('should be able to login using google social account', async () => {
        const spy = jest.fn();
        wrapper.setMethods({hideModal : spy})
        h.click('.google-signin')

        await flushPromises()
        expect(spy).toHaveBeenCalled();
    });

    it('should be able to login using facebook social account', async () => {
        const spy = jest.fn();
        wrapper.setMethods({hideModal : spy})
        h.click('.facebook-signin')

        await flushPromises()
        expect(spy).toHaveBeenCalled();
    });
})