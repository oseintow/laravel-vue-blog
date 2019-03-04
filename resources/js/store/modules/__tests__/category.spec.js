import { getters, mutations, actions } from '@/store/modules/category'

jest.mock('@/api/category')


describe('category store module', () => {
    let state

    beforeEach(() => {
        state = {
            categories: [],
        }
    })

    describe('getters', () => {
        it('get categorys', () => {
            expect(getters.categories(state)).toEqual([])
            state.categories = [{name: 'foo'},{name: 'bar'}]
            expect(getters.categories(state)).toEqual([{name: 'foo'},{name: 'bar'}])
        })

    })

    describe('mutations', () => {
        it('set categories', () => {
            mutations.CATEGORIES(state, [{name: 'foo'},{name: 'bar'}])
            expect(state.categories).toEqual([{name: 'foo'},{name: 'bar'}])
        })

    })

    describe('actions', () => {
        it('can get categories', async () => {
            const commit = jest.fn()
            await actions.getCategories({commit})

            expect(commit).toHaveBeenCalledWith('CATEGORIES', 'categories')
        })
    })

})
