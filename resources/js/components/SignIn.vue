<template>
    <div>
        <b-modal v-model="show" id="authentication-modal" hide-footer size="lg" centered title="">
            <div class="row">
                <div class="col-md-12">
                    <div class="col-md-6 float-left">
                        <login @reset-password="resetPassword"></login>
                    </div>
                    <div class="col-md-1 float-left"></div>
                    <div class="col-md-4 float-left mt-4">
                        <div class="row">
                            <button @click="socialLogin('facebook')" class="btn btn-outline-primary btn-block facebook-signin">Facebook</button>
                        </div>
                        <div class="row">
                            <button @click="socialLogin('google')" class="btn btn-outline-danger btn-block mt-1 google-signin">Google</button>
                        </div>
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
        this.$eventBus.$on('user-logged-in', () => this.hideModal())
    },
    methods: {
        showSignIn() {
            this.show = true
        },
        resetPassword() {
            this.hideModal()
            this.$router.push({name: 'send-reset-password-link'})
        }
    }
}

</script>

<style scoped>

</style>