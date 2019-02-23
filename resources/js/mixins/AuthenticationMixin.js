export default {
    data() {
        return {
            show: false
        }
    },
    methods: {
        login(provider) {
            this.$store.dispatch('auth/login', provider)
                .then(() =>{
                    this.$eventBus.userLoggedIn()
                })
                .catch(error => console.error(error))
        },
        socialLogin(provider) {
            this.$store.dispatch('auth/socialLogin', provider)
                .then(() =>{
                    this.hideModal()
                })
                .catch(error => console.error(error))
        },
        register(payload) {
            return new Promise((resolve, reject) => {
                this.$store.dispatch('auth/register', payload)
                    .then(({data}) => {
                        this.$eventBus.userRegistered()
                        return resolve(data)
                    })
                    .catch(error => reject(error))
            })
        },
        hideModal() {
            this.show = false
        }
    }
}