<template>
    <div>
        <b-modal v-model="show" id="authentication-modal" hide-footer size="lg" centered title="">
            <div class="row">
                <div class="col-md-12">
                    <div class="col-md-6">
                        <register></register>
                    </div>
                    <div class="col-md-6">
                        <button @click="socialLogin('facebook')" class="btn btn-outline-primary facebook-signin">Facebook</button>
                        <button @click="socialLogin('google')" class="btn btn-outline-danger google-signin">Google</button>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import AuthenticationMixin from '@/mixins/AuthenticationMixin'
    import Register from '@/components/Register'

    export default {
        name: "SignUp",
        mixins: [AuthenticationMixin],
        components: {
            Register
        },
        created() {
            this.$eventBus.$on('sign-up', () => this.showSignUp())
            this.$eventBus.$on('user-registered', () => this.hideModal())
        },
        methods: {
            showSignUp() {
                this.show = true
            }
        }
    }
</script>

<style>
    .modal-backdrop.show { background-color: white !important; opacity: 0.9 }
    .modal-header, .modal-footer { border: 3px }
    .modal-content{ boox-shadow: 5px 10px red !important}
</style>