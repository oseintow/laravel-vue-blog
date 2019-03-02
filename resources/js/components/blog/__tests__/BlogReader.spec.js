const mockSentence = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

const mockObjectSentennce= {"ops":[{"attributes":{"color":"#000000","bold":true},"insert":"Lorem Ipsum"},{"attributes":{"color":"#000000"},"insert":" is simply dummy text of the printing and typesetting industry"},{"insert":"\n"}]}

import Vuex from 'vuex'
import { shallowMount, createLocalVue, mount, RouterLinkStub } from '@vue/test-utils'
import VueRouter from 'vue-router'
import BlogReader from '@/components/blog/BlogReader'
import TestHelpers from '@/test/test-helpers'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()

jest.mock('quill', () => {
    return jest.fn().mockImplementation(() => ({
        setContents: jest.fn(() => mockObjectSentennce),
        getText: jest.fn(() => mockSentence)
    }));
})

describe.only('BlogReader', () => {
    let wrapper
    let h
    let spy = jest.fn()

    beforeEach(() => {
        wrapper = mount(BlogReader, {
            localVue,
            router,
            propsData: {
                blog: {
                    title: 'foobar',
                    slug: 'foo-bar',
                    cover_image_url: 'foo-image.jpg',
                    created_at: Date.now(),
                    body: {ops: {insert: ['a', 'b']}},
                    author: {
                        name: 'baz',
                        nickname: 'baz-123',
                        avatar: 'profile-image.jpg'
                    },
                    category: {
                        name: 'foo-category'
                    }
                }
            },
            // stubs: {
            //     RouterLink: RouterLinkStub
            // }
        })

        h = new TestHelpers(wrapper, expect)
    })

    it('sees blogs title', () => {
        h.see('foobar', '.title')
    })

    it('sees author\'s name', () => {
        h.see('baz', '.author-name')
    })

    it('sees blog creation date', () => {
        jest.mock("moment",  () => ({
            fromNow: () => "a few seconds ago"
        }))

        h.see('a few seconds ago...', '.created_at')
    })

    it('renders blogs cover image', async () => {
        h.hasAttributeValue('img', 'src', 'profile-image.jpg')
    })

    it('can navigate to users blogs page', async () => {
        wrapper.vm.$router.push = spy;
        h.click('.blog-link')

        await flushPromises()

        expect(spy).toHaveBeenCalledWith({
            name: 'users-blogs',
            params: {
                nickname: "baz-123"
            }
        });
    })
})