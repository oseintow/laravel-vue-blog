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
        hideModal() {
            this.show = false
        }
    }
}