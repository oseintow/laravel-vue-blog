const mockToken = 'xxx-xxx';
const mockUser = {name: 'foo', email: 'foo@bar.com'}
let mockError = false

jest.mock('@/plugins/vue-authenticator', () => ({
    getVueAuthenticate: jest.fn(() => {
        return {
            authenticate() {
                return new Promise((resolve, reject) => {
                    resolve()
                })
            }
        }
    })
}))

import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate';
import SignIn from '@/components/SignIn'
import Login from '@/components/Login'
import Error from '@/components/Error'
import TestHelpers from '@/test/test-helpers'
import { getters, mutations, actions } from '@/store/modules/auth'
import flushPromises from 'flush-promises'
import eventBus from '@/plugins/event-bus'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(eventBus)
localVue.use(VeeValidate)
const router = new VueRouter()

describe('Login', () => {

    let h
    let wrapper
    let store

    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                auth: {
                    namespaced: true,
                    actions: {
                        login: jest.fn()
                    }
                }
            }
        })

        wrapper = shallowMount(Login, {
            localVue,
            store,
            router,
            stubs: {
                Error: true
            },
            sync: false
        })

        h = new TestHelpers(wrapper, expect)
    })

    describe('validate', () => {
        it('email is null' , async () => {
            expect(wrapper.vm.errors.has("email")).toBe(false);
            wrapper.setData({
                user: {
                    email: 'foo@bar.com'
                }
            })

            await flushPromises()
            let email = h.find('input[name="email"]')
            email.setValue("")
            email.trigger('blur')

            await flushPromises()
            expect(wrapper.vm.errors.has("email")).toBe(true);
        })
    })

    it('can login user', async () => {
        wrapper.setData({
            user: {
                email: 'foo@bar.com',
                password: '@secret123'
            }
        })

        await flushPromises()
        h.find('.submit').trigger('click')

        await flushPromises()
        expect(wrapper.vm.$data.user).toEqual({
            email: '',
            password: ''
        })
    })
})