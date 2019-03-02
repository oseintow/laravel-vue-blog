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

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Authentication)
localVue.use(VueRouter)
const router = new VueRouter()

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

    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                blog: {
                    actions: {
                        deleteBlog: jest.fn(() => {
                            return new Promise((resolve, reject) => {
                                resolve(true)
                            })
                        })
                    }
                }
            }
        })

        wrapper = mount(UserBlog, {
            store,
            router,
            propsData: {
                data:  {
                    title: 'foobar',
                    slug: 'foo-bar',
                    cover_image_url: 'foo-image.jpg',
                    created_at: Date.now(),
                    body: {ops: {insert: ['a','b']}},
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
                Avatar: '<img src="blog.author.avatar" />'
            },
            sync: false
        })

        h = new TestHelpers(wrapper, expect)
    })

    it('should render users avatar image', () => {
        h.exists(Avatar)
    })

    it('should display authors name', () => {
        h.see('baz', '.author-name')
    })
})