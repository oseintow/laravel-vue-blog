import Vuex from 'vuex'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate';
import SendResetPasswordLinkView from '@/pages/SendResetPasswordLinkView'
import Error from '@/components/Error'
import TestHelpers from '@/test/test-helpers'
import { getters, mutations, actions } from '@/store/modules/auth'
import flushPromises from 'flush-promises'

jest.mock('@/plugins/vue-authenticator')

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(VeeValidate)
const router = new VueRouter()

describe('SendResetPasswordLinkView', () => {

    let h
    let store
    let wrapper
    let spy = jest.fn()

    const actions = {
        sendPasswordResetLink: jest.fn(() => {
            return Promise.resolve({response: {}})
        })
    }

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
                    actions
                }
            }
        })

        wrapper = mount(SendResetPasswordLinkView, {
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
        it('email is not a valid email' , async () => {
            expect(wrapper.vm.errors.has("email")).toBe(false);
            wrapper.setData({
                user: {
                    email: 'foo@bar.com'
                }
            })

            await flushPromises()
            let email = h.find('input[name="email"]')
            email.setValue("foo@bar")
            email.trigger('blur')

            await flushPromises()
            expect(wrapper.vm.errors.has("email")).toBe(true);
        })
    })

    it('can request for password reset link', async () => {
        wrapper.vm.$router.push = spy
        wrapper.setData({
            user: {
                email: 'foo@bar.com',
            }
        })

        h.click('.send-password-reset-link')

        await flushPromises()
        expect(actions.sendPasswordResetLink).toHaveBeenCalled()
    })
})