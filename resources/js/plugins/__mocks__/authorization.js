const Authorization = {
    install(Vue, options) {
        Vue.prototype.$can = new Vue({
            methods: {
                update: jest.fn(() => true)
            }
        })
    }
}

export default Authorization
