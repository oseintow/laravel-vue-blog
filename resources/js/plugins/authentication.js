import store from '@/store'

const Authentication = {
    install(Vue, options) {
        Vue.prototype.$auth = new Vue({
            computed: {
                user() {
                    return store.state.auth.user
                },
                check() {
                    return store.state.auth.isAuthenticated
                },
                token() {
                    return store.state.auth.token
                }
            }
        })
    }
}

export default Authentication
