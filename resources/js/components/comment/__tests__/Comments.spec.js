import Vuex from 'vuex'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import Comments from '@/components/comment/Comments'
import Comment from '@/components/comment/Comment'
import TestHelpers from '@/test/test-helpers'
import eventBus from '@/plugins/event-bus'
import InfiniteLoading from 'vue-infinite-loading'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(eventBus)

const comment = {
    actions: {
        getComments: () => {
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

describe('Comments', () => {
    let store
    let wrapper
    let h

    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                comment: {
                    namespaced: true,
                    ...comment
                }
            }
        })

        wrapper = mount(Comments, {
            localVue,
            store,
            propsData: {
                slug: 'foo-bar',
                newComments: [],
                enableInfiniteLoading: true
            },
            stubs: {
                Comment: "<div class='comment'></div>",
                InfiniteLoading: true
            },
            sync: false
        })

        h = new TestHelpers(wrapper, expect)
    })

    it('should get all comments', async () => {
        h.find(InfiniteLoading).vm.$emit('infinite', {
            loaded: jest.fn(),
            completed: jest.fn()
        })
        await flushPromises()
        const comments = h.findAll('.comment')

        expect(comments.length).toBe(2)
    })
})