const flash = {
    install(Vue, options) {
        Vue.prototype.$flash = new Vue({
            success({title, text}) {

            },
            error({title, text}) {

            },
            info({title, text}) {

            },
            warn({title, text}) {

            }
        })
    }
}