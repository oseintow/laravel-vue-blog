<template>
    <div>
        <b-modal v-model="show" id="modal-center" hide-footer size="lg" centered title="">
            <button @click="authenticate('facebook')" class="facebook-signin">Facebook</button>
            <button @click="authenticate('google')" class="google-signin">Google</button>
        </b-modal>
    </div>
</template>

<script>

export default {
    name: "SignIn",
    data() {
        return {
            show: false
        }
    },
    created() {
        this.$eventBus.$on('sign-in', () => this.showSignIn())
    },
    methods: {
        authenticate(provider) {
            this.$store.dispatch('auth/login', provider)
                .then(() =>{
                    this.hideSignIn()
                    this.$router.push({name: 'home'})
                })
                .catch(error => console.error(error))
        },
        showSignIn() {
            this.show = true
        },
        hideSignIn() {
            this.show = false
        }
    }
}

</script>

<style scoped>

</style>