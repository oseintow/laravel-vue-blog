import store from '@/store'

const Authorization = {
    install(Vue, options) {
        Vue.prototype.$can = new Vue({
            methods: {
                update(userId) {
                    let user = store.state.auth.user

                    if (!user) return false

                    return userId === user.id ? true : false
                }
            }
        })
    }
}

export default Authorization
