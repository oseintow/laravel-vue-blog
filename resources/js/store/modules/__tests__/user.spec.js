import { getters, mutations, actions } from '@/store/modules/user'

jest.mock('@/api/user')


describe('user store module', () => {

    describe('actions', () => {
        it('can update user details', async () => {
            const commit = jest.fn()
            await actions.update({commit}, {})

            expect(commit).toHaveBeenCalledWith('auth/SET_AUTH_USER', 'user data', {root: true})
        })
    })

})
