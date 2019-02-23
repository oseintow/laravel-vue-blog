export default {
    data() {
        return {
            show: false
        }
    },
    methods: {
        authenticate(provider) {
            this.$store.dispatch('auth/login', provider)
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