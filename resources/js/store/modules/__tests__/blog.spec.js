import { getters, mutations, actions } from '@/store/modules/blog'
import flushPromises from 'flush-promises'

import { saveBlog, updateBlog } from '@/api/blog'
jest.mock('@/api/blog')


describe('blog store module', () => {
    let state

    beforeEach(() => {
        state = {
            blogs: [],
            blog: [],
        }
    })

    describe('getters', () => {
        it('get blogs', () => {
            expect(getters.blogs(state)).toEqual([])
            state.blogs = [{},{}]
            expect(getters.blogs(state)).toEqual([{},{}])
        })

        it('get blog', () => {
            expect(getters.blog(state)).toEqual([])
            state.blog = [{},{}]
            expect(getters.blog(state)).toEqual([{},{}])
        })
    })

    describe('mutations', () => {
        it('set blogs', () => {
            mutations.BLOGS(state, {data: [{name: 'foo'},{name: 'bar'}]})
            expect(state.blogs).toEqual([{name: 'foo'},{name: 'bar'}])
        })

        it('set blog', () => {
            mutations.BLOG(state, {name: 'bar'})
            expect(state.blog).toEqual({name: 'bar'})
        })
    })

    describe('actions', () => {
        // it('login using a social account', async () => {
        //     const commit = jest.fn()
        //
        //     await actions.socialLogin({ commit }, 'github')
        //
        //     expect(commit).toHaveBeenCalledWith("IS_AUTHENTICATED", {isAuthenticated: true})
        //     expect(commit).toHaveBeenCalledWith('SET_AUTH_USER', mockUser)
        //     expect(commit).toHaveBeenCalledWith('SET_AUTH_TOKEN', mockToken)
        // })
        //
        // it('can login using email', async () => {
        //     const commit = jest.fn()
        //
        //     await actions.login({ commit }, {email: 'foo@bar.com', password: '@secret123'})
        //
        //     expect(commit).toHaveBeenCalledWith("IS_AUTHENTICATED", {isAuthenticated: true})
        //     expect(commit).toHaveBeenCalledWith('SET_AUTH_USER', 'mocked user object')
        //     expect(commit).toHaveBeenCalledWith('SET_AUTH_TOKEN', 'mocked token')
        // })
        //
        // it('user can register using personal details', async () => {
        //     const commit = jest.fn()
        //
        //     await actions.register({ commit }, {foo: 'bar'})
        //
        //     expect(commit).toHaveBeenCalledWith("IS_AUTHENTICATED", {isAuthenticated: true})
        //     expect(commit).toHaveBeenCalledWith('SET_AUTH_USER', 'mocked user object')
        //     expect(commit).toHaveBeenCalledWith('SET_AUTH_TOKEN', 'mocked token')
        // })

        it('a blog can be saved', async () => {

            saveBlog.mockResolvedValue({data: "Blog data"})
            const commit = jest.fn()
            await actions.saveBlog({ commit }, {})

            expect(saveBlog.mock.calls).toHaveLength(1)
        })

        it('a blog can be updated', async () => {

            updateBlog.mockResolvedValue({data: "Blog data"})
            const commit = jest.fn()
            await actions.updateBlog({ commit }, {})

            expect(saveBlog.mock.calls).toHaveLength(1)
        })
    })
})
