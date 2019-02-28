import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Blog from '@/components/blog/Blog'
import TestHelpers from '@/test/test-helpers'
// import { getters, mutations, actions } from '@/store/modules/auth'
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

    // const quill = jest.spyOn(Quill, "setContents", "getText");

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

        // Quill = jest.fn().mockImplementation(() => { return {} });
        // Quill.prototype.setContents.mockImplementation(() => {a: 'b'})
        // Quill.prototype.getText.mockImplementation(() => 'c');

        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it('component mounts without errors', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('should see how time blog was created', () => {
        h.see('a few seconds ago...', '.age')
    })

    it('can navigate to users blogs', async () => {

        wrapper.vm.$router.push = spy;
        h.click('.users-blogs')

        await flushPromises()
        expect(spy).toHaveBeenCalledWith({ name: 'users-blogs', params: {nickname: "baz-123"}});
    });
})