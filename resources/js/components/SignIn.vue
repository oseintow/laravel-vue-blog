<template>
    <div>
        <b-modal v-model="show" id="modal-center" hide-footer size="lg" centered title="">
            <button @click="authenticate('facebook')" class="facebook-signin">Facebook</button>
            <button @click="authenticate('google')" class="google-signin">Google</button>
        </b-modal>
    </div>
</template>

<script>
import AuthenticationMixin from '@/mixins/AuthenticationMixin'

export default {
    name: "SignIn",
    mixins: [AuthenticationMixin],
    created() {
        this.$eventBus.$on('sign-in', () => this.showSignIn())
    },
    methods: {
        showSignIn() {
            this.show = true
        }
    }
}

</script>

<style scoped>

</style>