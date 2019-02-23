const eventBus = {
    install(Vue, options) {
        Vue.prototype.$eventBus = new Vue({
            methods: {
                signUp() {
                   this.$emit('sign-up')
                },
                signIn() {
                    this.$emit('sign-in')
                },
                userRegistered() {
                  this.$emit('user-registered')
                },
                userLoggedIn() {
                  this.$emit('user-logged-in')
                },
                search(value) {
                    this.$emit('search', value)
                },
                newComment(value) {
                    this.$emit('new-comment', value)
                }
            }
        })

    }
}

export default eventBus