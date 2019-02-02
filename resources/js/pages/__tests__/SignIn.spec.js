import Vuex from 'vuex'
import { shallow, createLocalVue } from '@vue/test-utils'
import SignIn from '@/pages/SignIn'
import TestHelpers from 'test/test-helpers'

jest.mock('@/plugins/vue-authenticator', () => ({
    getVueAuthenticate: jest.fn(() => {
        return {
            authenticate() {
                return {
                    token: 'xxx-xxx', user: {name: 'foo', email: 'foo@bar.com'}
                }
            }
        }
    })
}))

import { getters, mutations, actions } from '@/store/modules/auth'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('', () => {
    it('should ds', function () {
        expect(true).toBeTruthy()
    });
})