const flash = {
    install(Vue, options) {
        Vue.prototype.$flash = new Vue({
            methods: {
                success: jest.fn(),
                error: jest.fn(),
                info: jest.fn(),
                warn: jest.fn(),
                notify: jest.fn()
            }
        })
    }
}

export default flash