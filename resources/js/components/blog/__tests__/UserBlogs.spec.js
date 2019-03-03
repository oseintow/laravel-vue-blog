import Vuex from 'vuex'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import TestHelpers from '@/test/test-helpers'
import flushPromises from 'flush-promises'
import UserBlogs from '@/components/blog/UserBlogs'
import UserBlog from '@/components/blog/UserBlog'
import InfiniteLoading from 'vue-infinite-loading';
import eventBus from '@/plugins/event-bus'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(eventBus)

const blogs = {
    actions: {
        getUserBlogs: () => {
            return {
                data: [
                    {id: 1}, {id: 2}
                ],
                meta: {
                    current_page: 1,
                    last_page: 2
                }
            }
        }
    }
}

describe('UserBlogs', () => {

    let h
    let wrapper
    let store

    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                blog: {
                    namespaced: true,
                    ...blogs
                }
            }
        })

        wrapper = shallowMount(UserBlogs, {
            localVue,
            store,
            propsData: {
                nickname: 'baz-123'
            },
            stubs: {
                UserBlog: "<div class='user-blog'></div>",
                InfiniteLoading: true
            }
        })

        h = new TestHelpers(wrapper, expect)
    })

    it('should get all blogs', async () => {
        h.find(InfiniteLoading).vm.$emit('infinite', {
            loaded: jest.fn(),
            completed: jest.fn()
        })

        await flushPromises()
        h.domHasLength('.user-blog', 2)
    })

    it('can search for a blog', async () => {
        wrapper.setData({
            userBlogs: [{},{}]
        })
        wrapper.vm.$eventBus.search("foo")

        expect(wrapper.vm.$data.query).toEqual({
            page: 1,
            q: 'foo',
            per_page: 5
        })
    })

    it('it can remove blog', async () => {
        h.find(InfiniteLoading).vm.$emit('infinite', {
            loaded: jest.fn(),
            completed: jest.fn()
        })

        await flushPromises()
        h.domHasLength(UserBlog, 2)

        const userBlogs = h.findAll(UserBlog)
        userBlogs.at(0).vm.$emit('deleted', 0)

        await flushPromises()
        h.domHasLength(UserBlog, 1)
    })

})