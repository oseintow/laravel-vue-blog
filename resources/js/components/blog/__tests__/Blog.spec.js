const mockSentence = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

jest.mock('quill', () => {
    return jest.fn().mockImplementation(() => ({
        setContents: jest.fn(),
        getText: jest.fn(() => mockSentence)
    }));
})

import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Blog from '@/components/blog/Blog'
import TestHelpers from '@/test/test-helpers'
import flushPromises from 'flush-promises'
import eventBus from '@/plugins/event-bus'
import Quill from 'quill'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(eventBus)
const router = new VueRouter()

describe('Blog', () => {

    let wrapper
    let store
    let h
    let spy = jest.fn()

    jest.mock("moment", () => () => ({
        fromNow: () => "a few seconds ago"
    }))

    beforeEach(() => {
        wrapper = shallowMount(Blog, {
            localVue,
            router,
            propsData: {
                data: {
                    title: 'foobar',
                    slug: 'foo-bar',
                    cover_image: 'for-image',
                    created_at: Date.now(),
                    body: {ops: {insert: ['a','b']}},
                    author: {
                        name: 'baz',
                        nickname: 'baz-123'
                    },
                    category: {
                        name: 'for-category'
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

    it('should display title', () => {
        h.see('foobar', '#title')
    })

    it('should display time blog was created', () => {
        h.see('a few seconds ago...', '.age')
    })

    it('should limit body of block to 200 characters', async () => {
        h.see(mockSentence.substring(0,200) + '...', '#body')
    })

    it('can navigate to users blogs', async () => {
        wrapper.vm.$router.push = spy;
        h.click('.users-blogs')

        await flushPromises()
        expect(spy).toHaveBeenCalledWith({ name: 'users-blogs', params: {nickname: "baz-123"}});
    });
})