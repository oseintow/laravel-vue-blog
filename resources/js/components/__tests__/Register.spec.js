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
import Register from '@/components/Register'
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