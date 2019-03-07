import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate';
import SignIn from '@/components/SignIn'
import Register from '@/components/Register'
import Error from '@/components/Error'
import TestHelpers from '@/test/test-helpers'
import { getters, mutations, actions } from '@/store/modules/auth'
import flushPromises from 'flush-promises'
import eventBus from '@/plugins/event-bus'

jest.mock('@/plugins/vue-authenticator')

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(eventBus)
localVue.use(VeeValidate)
const router = new VueRouter()

describe('Register', () => {

    let h
    let wrapper
    let store

    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                auth: {
                    namespaced: true,
                    actions: {
                        register: jest.fn()
                    }
                }
            }
        })

        wrapper = shallowMount(Register, {
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
        it('name is null', async () => {
            expect(wrapper.vm.errors.has("name")).toBe(false);
            wrapper.setData({
                user: {
                    name: 'init name is not null'
                }
            })

            await flushPromises()
            let name = h.find('input[name="name"]')
            name.setValue("")
            name.trigger('blur')

            await flushPromises()
            expect(wrapper.vm.errors.has("name")).toBe(true);

        })

        it('name has less than three characters', async () => {
            expect(wrapper.vm.errors.has("name")).toBe(false);

            wrapper.setData({
                user: {
                    name: 'as'
                }
            })

            await flushPromises()
            expect(wrapper.vm.errors.has("name")).toBe(true);
        })

        it('name is more than hundred characters', async () => {
            expect(wrapper.vm.errors.has("name")).toBe(false);

            wrapper.setData({
                user: {
                    name: 'a'.repeat(101)
                }
            })

            await flushPromises()
            expect(wrapper.vm.errors.has("name")).toBe(true);
        })

        it('nickname is null', async () => {
            expect(wrapper.vm.errors.has("nickname")).toBe(false);
            wrapper.setData({
                user: {
                    nickname: 'init nickname is not null'
                }
            })

            await flushPromises()
            let nickname = h.find('input[name="nickname"]')
            nickname.setValue("")
            nickname.trigger('blur')

            await flushPromises()
            expect(wrapper.vm.errors.has("nickname")).toBe(true);

        })

        it('nickname has less than three characters', async () => {
            expect(wrapper.vm.errors.has("nickname")).toBe(false);

            wrapper.setData({
                user: {
                    nickname: 'as'
                }
            })

            await flushPromises()
            expect(wrapper.vm.errors.has("nickname")).toBe(true);
        })

        it('nickname is more than fifty characters', async () => {
            expect(wrapper.vm.errors.has("nickname")).toBe(false);

            wrapper.setData({
                user: {
                    nickname: 'a'.repeat(51)
                }
            })

            await flushPromises()
            expect(wrapper.vm.errors.has("nickname")).toBe(true);
        })

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

    it('user can register', async () => {
        wrapper.setData({
            user: {
                name: 'foo bar',
                nickname: 'foobar',
                email: 'foo@bar.com',
                password: '@secret123',
                password_confirmation: '@secret123'
            }
        })

        await flushPromises()
        h.find('.submit').trigger('click')

        await flushPromises()
        expect(wrapper.vm.$data.user).toEqual({
            name: '',
            nickname: '',
            email: '',
            password: '',
            password_confirmation: ''
        })
    })
})