import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import SignIn from '@/components/SignIn'
import Login from '@/components/Login'
import TestHelpers from '@/test/test-helpers'
import { getters, mutations, actions } from '@/store/modules/auth'
import flushPromises from 'flush-promises'
import eventBus from '@/plugins/event-bus'

jest.mock('@/plugins/vue-authenticator')

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
            },
        })
        h = new TestHelpers(wrapper, expect)
    })

    it('component mounts without errors', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should render login form', () => {
        h.exists(Login)
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