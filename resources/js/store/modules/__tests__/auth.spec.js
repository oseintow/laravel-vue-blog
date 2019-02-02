jest.mock('@/plugins/vue-authenticator', () => ({
    getVueAuthenticate: jest.fn(() => {
        return {
            authenticate() {
                return {
                    token: 'xxx-xxx', user: {name: 'foo', email: 'foo@bar.com'}
                }
            }
        }
    })
}))

import { getters, mutations } from '@/store/modules/auth'

describe('auth store module', () => {
    let state

    beforeEach(() => {
        state = {
            isAuthenticated: false,
            user: null,
            token: null
        }
    })

    describe('getters', () => {
        it('isAuthenticated logic works', () => {
            expect(getters.isAuthenticated(state)).toBe(false)
            state.isAuthenticated = true
            expect(getters.isAuthenticated(state)).toBe(true)
        })
        it('can get token', () => {
            expect(getters.getToken(state)).toBe(null)
            state.token = 'xxx-xxx-xxx'
            expect(getters.getToken(state)).toBe('xxx-xxx-xxx')
        })
        it('can get auth user', () => {
            expect(getters.authUser(state)).toBe(null)
            state.user = {name: 'foo'}
            expect(getters.authUser(state)).toEqual({name: 'foo'})
        })
    })

    describe('mutations', () => {
        it('set is authenticated', () => {
            mutations.IS_AUTHENTICATED(state, {isAuthenticated: true})
            expect(state.isAuthenticated).toBe(true)
        })
        it('set token', () => {
            mutations.SET_AUTH_TOKEN(state, 'xxx-xxx-xxx')
            expect(state.token).toBe('xxx-xxx-xxx')
        })
        it('set authenticated user', () => {
            const user ={name: 'foo', email: 'foo@bar.com'};
            mutations.SET_AUTH_USER(state, user)
            expect(state.user).toBe(user)
        })
    })
})
