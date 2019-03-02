import Vuex from 'vuex'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Blogs from '@/components/blog/Blogs'
import Blog from '@/components/blog/Blog'
import TestHelpers from '@/test/test-helpers'
import eventBus from '@/plugins/event-bus'
import InfiniteLoading from 'vue-infinite-loading'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(eventBus)

const blog = {
    actions: {
        getBlogs: () => {
            return {
                data: [
                    {
                        title: 'foobar',
                        slug: 'foo-bar',
                        cover_image_url: 'foo-image.jpg',
                        created_at: Date.now(),
                        body: {ops: {insert: ['a','b']}},
                        author: {
                            name: 'baz',
                            nickname: 'baz-123'
                        },
                        category: {
                            name: 'foo-category'
                        }
                    },
                    {
                        title: 'foobar',
                        slug: 'foo-bar',
                        cover_image_url: 'foo-image.jpg',
                        created_at: Date.now(),
                        body: {ops: {insert: ['a','b']}},
                        author: {
                            name: 'baz',
                            nickname: 'baz-123'
                        },
                        category: {
                            name: 'foo-category'
                        }
                    }
                ],
                meta: {
                    current_page: 1,
                    last_page: 2
                }
            }
        }
    }
}

describe('Blogs', () => {
    let store
    let wrapper
    let h

    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                blog: {
                    namespaced: true,
                    ...blog
                }
            }
        })

        wrapper = mount(Blogs, {
            localVue,
            store,
            stubs: {
                Blog: "<div class='blog'></div>",
                InfiniteLoading: true
            },
            sync: false
        })

        h = new TestHelpers(wrapper, expect)
    })

    it('should get all blogs', async () => {
        h.find(InfiniteLoading).vm.$emit('infinite', {
            loaded: jest.fn(),
            completed: jest.fn()
        })
        await flushPromises()
        const blogs = h.findAll('.blog')

        expect(blogs.length).toBe(2)
    })

    it('can search for a blog', () => {
        wrapper.vm.$eventBus.search("foo")

        expect(wrapper.vm.$data.query).toEqual({
            page: 1,
            q: 'foo',
            per_page: 5
        })
    })
})