import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Blogs from '@/components/blog/Blogs'
import TestHelpers from '@/test/test-helpers'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()

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
                    ...blog
                }
            }
        })

        wrapper = mount(Blogs, {
            store,
            stubs: {
                Blog: "<div class='blog'></div>"
            }
        })
    })

    it('should get all blogs', () => {

    })
})