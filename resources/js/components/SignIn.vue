<template>
    <div>
        <b-modal v-model="show" id="authentication-modal" hide-footer size="lg" centered title="">
            <div class="row">
                <div class="col-sm-12">
                    <div class="col-sm-6">
                        <login></login>
                    </div>
                    <div class="col-sm-6">
                        <button @click="socialLogin('facebook')" class="facebook-signin">Facebook</button>
                        <button @click="socialLogin('google')" class="google-signin">Google</button>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import AuthenticationMixin from '@/mixins/AuthenticationMixin'
import Login from '@/components/Login'

export default {
    name: "SignIn",
    mixins: [AuthenticationMixin],
    components: {
        Login
    },
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