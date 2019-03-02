const mockSentence = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Blog from '@/components/blog/Blog'
import TestHelpers from '@/test/test-helpers'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()

jest.mock('quill', () => {
    return jest.fn().mockImplementation(() => ({
        setContents: jest.fn(),
        getText: jest.fn(() => mockSentence)
    }));
})

describe('Blog', () => {

    let wrapper
    let h
    let spy = jest.fn()

    beforeEach(() => {
        wrapper = shallowMount(Blog, {
            localVue,
            router,
            propsData: {
                data: {
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
            }
        })

        h = new TestHelpers(wrapper, expect)
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it('component mounts without errors', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should show blogs category in capital letters', () => {
        h.doNotSee('foo-category')
        h.see('FOO-CATEGORY', '#category')
    })

    it('should display title', () => {
        h.see('foobar', '#title')
    })

    it('should display time blog was created', () => {
        jest.mock("moment",  () => ({
            fromNow: () => "a few seconds ago"
        }))

        h.see('a few seconds ago...', '.age')
    })

    it('should limit body of blog to 200 characters', () => {
        h.see(mockSentence.substring(0,200) + '...', '#body')
    })

    it('should see blogs author\s name', () => {
        h.see('baz', '#author')
    })

    it('image src should have correct image url', () => {
        h.hasAttribute('.cover_image_url', 'src')
    })

    it('can navigate to users blogs', async () => {
        wrapper.vm.$router.push = spy;
        h.click('.users-blogs')

        expect(spy).toHaveBeenCalledWith({ name: 'users-blogs', params: {nickname: "baz-123"}});
    });

    it('should navigate to user\'s blog', async () => {
        wrapper.vm.$router.push = spy;
        h.click('.user-blog')

        expect(spy).toHaveBeenCalledWith({
            name: 'user-blog',
            params: {
                nickname: "baz-123",
                slug: 'foo-bar'
            }
        });
    });
})