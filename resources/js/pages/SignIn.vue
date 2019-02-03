<template>
    <div>
        <button @click="authenticate('facebook')" class="facebook-signin">Facebook</button>
        <button @click="authenticate('google')" class="google-signin">Google</button>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    name: "SignIn",
    methods: {
        authenticate(provider) {
            this.$store.dispatch('auth/login', provider)
                .then(() => this.$router.push({name: 'home'}))
                .catch(error => console.error(error))
        }
    },
    computed: {
        ...mapGetters('auth', ['authUser'])
    }
}

</script>

<style scoped>

</style>