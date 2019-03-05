const mockSentence = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

import Vuex from 'vuex'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import TestHelpers from '@/test/test-helpers'
import Authentication from '@/plugins/authentication'
import flushPromises from 'flush-promises'
import Favourite from '@/components/Favourite'
import Avatar from '@/components/Avatar'
import UserBlog from '@/components/blog/UserBlog'
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import Authorization from '@/plugins/authorization'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Authentication)
localVue.use(Authorization)
localVue.use(VueRouter)
const router = new VueRouter()

let mockError = false

jest.mock('@/plugins/vue-authenticator')
jest.mock('@/plugins/authorization')

jest.mock('quill', () => {
    return jest.fn().mockImplementation(() => ({
        setContents: jest.fn(),
        getText: jest.fn(() => mockSentence)
    }));
})

describe('UserBlog', () => {
    let h
    let wrapper
    let store
    let spy = jest.fn()

    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                blog: {
                    namespaced: true,
                    actions: {
                        deleteBlog: jest.fn(() => {
                            return new Promise((resolve, reject) => {
                                if (mockError)
                                    reject(new Error('API Error occurred.'))
                                resolve(true)
                            })
                        })
                    }
                }
            }
        })

        wrapper = shallowMount(UserBlog, {
            localVue,
            store,
            router,
            propsData: {
                data:  {
                    title: 'foobar',
                    slug: 'foo-bar',
                    cover_image_url: 'foo-image.jpg',
                    created_at: Date.now(),
                    body: {ops: {insert: ['a','b']}},
                    comments_count: 2,
                    author: {
                        name: 'baz',
                        nickname: 'baz-123',
                        avata: 'profile-image.jpg'
                    },
                    category: {
                        name: 'foo-category'
                    }
                }
            },
            mocks: {
                $auth: {
                    check: true
                }
            },
            stubs: {
                Favourite: true,
                Avatar: '<img src="blog.author.avatar" />',
                FontAwesomeIcon: true
            },
            sync: false
        })

        h = new TestHelpers(wrapper, expect)
    })

    it('should render users avatar image', () => {
        h.exists(Avatar)
    })

    it('should display time blog was created', () => {
        jest.mock("moment",  () => ({
            fromNow: () => "a few seconds ago"
        }))

        h.see('a few seconds ago...', '.created_at')
    })

    it('should hide blog actions', async () => {
        wrapper.vm.$auth.check = false

        await flushPromises()

        h.domHasNot('.blog-actions')
    })

    it('should hide blog actions if user is not authenticated', async () => {
        wrapper.vm.$auth.check = true
        // wrapper.vm.$can.update

        await flushPromises()

        h.domHas('.blog-actions')
    })

    it('can navigate to edit blogs if authenticated and authorized', () => {
        wrapper.vm.$router.push = spy
        h.click('.edit-blog')

        expect(spy).toHaveBeenCalledWith({
            name: 'edit-user-blog',
            params: {
                slug: 'foo-bar'
            }
        });
    })

    it('can delete blog if authenticated and authorized', async () => {
        h.click('.delete-blog')

        await flushPromises()

        expect(wrapper.emitted().deleted).toBeTruthy()
    })

    it('can navigate to users blog', () => {
        wrapper.vm.$router.push = spy;
        h.click('.nav-to-users-blog')

        expect(spy).toHaveBeenCalledWith({
            name: 'user-blog',
            params: {
                nickname: 'baz-123',
                slug: 'foo-bar'
            }
        });
    })

    it('can go to users blog', () => {
        wrapper.vm.$router.push = spy;
        h.click('.nav-to-users-blog')

        expect(spy).toHaveBeenCalledWith({
            name: 'user-blog',
            params: {
                nickname: 'baz-123',
                slug: 'foo-bar'
            }
        });
    })

    it('should see category name in capital letters', () => {
        h.see('FOO-CATEGORY', '.category-name')
    })

    it('should see favourite component', () => {
        h.exists(Favourite)
    })

    it('should see comment count', () => {
        h.see('2 comments', '.comment-count')
    })
})