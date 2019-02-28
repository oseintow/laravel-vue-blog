import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Blog from '@/components/blog/Blog'
import TestHelpers from '@/test/test-helpers'
// import { getters, mutations, actions } from '@/store/modules/auth'
import flushPromises from 'flush-promises'
import eventBus from '@/plugins/event-bus'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(eventBus)
const router = new VueRouter()

describe('Blog', () => {

    let wrapper
    let h

    beforeEach(() => {
        wrapper = shallowMount(Blog, {
            localVue,
            store,
            router,
            stubs: {
                bModal: true
            }
        })
        h = new TestHelpers(wrapper, expect)
        jest.useFakeTimers()
    })

    it('should expect true to be truthy', () => {
        expect(true).toBeTruthy()
    });

    it('can navigate to users blogs', async () => {
        h.click('.users-blogs')

        await flushPromises()

    });
})