const flash = {
    install(Vue, options) {
        Vue.prototype.$flash = new Vue({
            methods: {
                success({title, text}) {
                    this.notify({title, text, type: 'success'})
                },
                error({title, text}) {
                    this.notify({title, text, type: 'error'})
                },
                info({title, text}) {
                    this.notify({title, text, type: 'info'})
                },
                warn({title, text}) {
                    this.notify({title, text, type: 'warn'})
                },
                notify({title, text, type}) {
                    this.$notify({
                        group: 'app',
                        title,
                        text,
                        type
                    });
                }
            }
        })
    }
}

export default flash