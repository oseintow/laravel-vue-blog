import { getters, mutations, actions } from '@/store/modules/blog'
import flushPromises from 'flush-promises'

import { saveBlog, updateBlog, deleteBlog, getUserBlog, getUserBlogs } from '@/api/blog'
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

        it('a blog can be deleted', async () => {

            deleteBlog.mockResolvedValue({data: "Blog data"})
            const commit = jest.fn()
            await actions.deleteBlog({ commit }, {})

            expect(saveBlog.mock.calls).toHaveLength(1)
        })

        it('can get blogs', async () => {
            const commit = jest.fn()
            await actions.getBlogs({ commit }, {})

            expect(commit).toHaveBeenCalledWith('BLOGS', 'mocked blogs')
        })

        it('can get a blog', async () => {
            const commit = jest.fn()
            await actions.getBlog({ commit }, {})

            expect(commit).toHaveBeenCalledWith('BLOG', 'mocked blog')
        })

        it('can get users blogs', async () => {
            getUserBlogs.mockResolvedValue({data: "users blog data"})
            const commit = jest.fn()
            await actions.getUserBlogs({ commit }, {})

            expect(getUserBlogs.mock.calls).toHaveLength(1)
        })

        it('can get a users blog', async () => {
            getUserBlog.mockResolvedValue({data: "users blog data"})
            const commit = jest.fn()
            await actions.getUserBlog({ commit }, {})

            expect(getUserBlog.mock.calls).toHaveLength(1)
        })
    })
})
