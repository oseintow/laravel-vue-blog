<template>
    <div>
        <button @click="authenticate('facebook')">Facebook</button>
        <button @click="authenticate('google')">Google</button>

        <div>{{authUser.name}}</div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    name: "SignIn",
    methods: {
        authenticate(provider) {
            this.$store.dispatch('auth/login', provider)
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