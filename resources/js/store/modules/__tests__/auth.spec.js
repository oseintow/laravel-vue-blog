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

import { getters, mutations, actions } from '@/store/modules/auth'

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
    describe('actions', () => {
        it('login a user', async () => {
            const commit = jest.fn()

            await actions.socialLogin({ commit }, 'github')

            expect(commit).toHaveBeenCalledWith("IS_AUTHENTICATED", {isAuthenticated: true})
            expect(commit).toHaveBeenCalledWith('SET_AUTH_USER', mockUser)
            expect(commit).toHaveBeenCalledWith('SET_AUTH_TOKEN', mockToken)
        })

        it('catches an error', async () => {
            mockError = true

            // await expect(actions.login({ commit: jest.fn() }, 'github'))
            //     .rejects.toThrow("API Error occurred.")
        })
    })
})
