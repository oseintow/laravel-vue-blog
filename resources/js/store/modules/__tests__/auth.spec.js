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
        // it('numberOfPosts returns correct count', () => {
        //     expect(getters.numberOfPosts(state)).toBe(0)
        //     state.blogPosts = [{}, {}]
        //     expect(getters.numberOfPosts(state)).toBe(2)
        // })
    })

    describe('mutations', () => {
        // it('adds blog posts correctly', () => {
        //     mutations.saveBlogPosts(state, [{ title: 'New post' }])
        //     expect(state.blogPosts).toEqual([{ title: 'New post' }])
        // })
    })
})
