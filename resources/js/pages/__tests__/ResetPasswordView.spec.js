import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate';
import ResetPasswordView from '@/pages/ResetPasswordView'
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

describe('ResetPasswordView', () => {

    let h
    let store
    let wrapper
    let spy = jest.fn()

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
                    actions: {
                        resetPassword: jest.fn(() => {
                            return Promise.resolve()
                        })
                    }
                }
            }
        })

        wrapper = shallowMount(ResetPasswordView, {
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

        it('password is null', async () => {
            expect(wrapper.vm.errors.has("password")).toBe(false);
            wrapper.setData({
                user: {
                    password: 'init password is not null'
                }
            })

            await flushPromises()
            let password = h.find('input[name="password"]')
            password.setValue("")
            password.trigger('blur')

            await flushPromises()
            expect(wrapper.vm.errors.has("password")).toBe(true);

        })

        it('password has less than six characters', async () => {
            expect(wrapper.vm.errors.has("password")).toBe(false);

            wrapper.setData({
                user: {
                    password: 'a'.repeat(5)
                }
            })

            await flushPromises()
            expect(wrapper.vm.errors.has("password")).toBe(true);
        })

        it('password is more than fifty characters', async () => {
            expect(wrapper.vm.errors.has("password")).toBe(false);

            wrapper.setData({
                user: {
                    password: 'a'.repeat(51)
                }
            })

            await flushPromises()
            expect(wrapper.vm.errors.has("password")).toBe(true);
        })

        it('password confirmation is null', async () => {
            expect(wrapper.vm.errors.has("password_confirmation")).toBe(false);
            wrapper.setData({
                user: {
                    password_confirmation: 'init password_confirmation is not null'
                }
            })

            await flushPromises()
            let password_confirmation = h.find('input[name="password_confirmation"]')
            password_confirmation.setValue("")
            password_confirmation.trigger('blur')

            await flushPromises()
            expect(wrapper.vm.errors.has("password_confirmation")).toBe(true);

        })

        it('password and password confirmation are not the same', async () => {
            expect(wrapper.vm.errors.has("password_confirmation")).toBe(false);
            wrapper.setData({
                user: {
                    password: '@secret123',
                    password_confirmation: '@secret'
                }
            })

            await flushPromises()
            expect(wrapper.vm.errors.has("password_confirmation")).toBe(true);

        })
    })

    it('can reset users password', async () => {
        wrapper.vm.$router.push = spy
        wrapper.setData({
            user: {
                email: 'foo@bar.com',
                password: 'secret123',
                password_confirmation: 'secret123'
            }
        })

        h.click('.reset-password')

        await flushPromises()
        expect(spy).toHaveBeenCalledWith({ name: 'home'});
    })
})