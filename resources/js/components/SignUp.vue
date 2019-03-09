<template>
    <div>
        <b-modal v-model="show" id="authentication-modal" hide-footer size="lg" centered title="">
            <h3 class="mb-4" style="text-align: center">Create Account</h3>
            <div class="row">
                <div class="col-md-12">
                    <div class="col-md-6 float-left">
                        <register></register>
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