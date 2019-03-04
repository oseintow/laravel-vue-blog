import { actions } from '@/store/modules/favourite'

import {saveFavourite, deleteFavourite} from '@/api/favourite'
jest.mock('@/api/favourite')


describe('favourite store module', () => {

    describe('actions', () => {
        it('can save favourite', async () => {
            saveFavourite.mockResolvedValue({data: true})

            const commit = jest.fn()
            await actions.saveFavourite({commit}, {})

            expect(saveFavourite.mock.calls).toHaveLength(1)
        })

        it('can delete favourite', async () => {
            deleteFavourite.mockResolvedValue({data: true})

            const commit = jest.fn()
            await actions.deleteFavourite({commit}, {})

            expect(deleteFavourite.mock.calls).toHaveLength(1)
        })
    })

})
