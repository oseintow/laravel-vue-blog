<template>
    <div>
        <button @click="authenticate('facebook')" class="facebook-signin">Facebook</button>
        <button @click="authenticate('google')" class="google-signin">Google</button>
    </div>
</template>

<script>
export default {
    name: "SignIn-Page",
    methods: {
        authenticate(provider) {
            this.$store.dispatch('auth/socialLogin', provider)
                .then(() => this.$router.push({name: 'home'}))
                .catch(error => console.error(error))
        }
    }
}

</script>

<style scoped>

</style>