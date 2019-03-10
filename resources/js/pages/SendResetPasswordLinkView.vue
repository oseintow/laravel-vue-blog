<template>
    <div>
        <form novalidate>
            <div class="row justify-content-md-center">
                <div class="row col-md-8">
                    <ul class="list-group" style="width: 100%">
                        <li class="list-group-item"><h6>Reset Password</h6></li>
                        <li class="list-group-item">
                            <div class="form-group row">
                                <label for="email" class="col-sm-3 col-form-label" style="font-size: 14px">Email Address:</label>
                                <div class="col-sm-9">
                                    <div>
                                        <input type="text"
                                               v-model="email"
                                               name="email"
                                               class="form-control"
                                               id="email"
                                               data-vv-as="email"
                                               v-validate="'required|email'">
                                    </div>
                                    <div>
                                        <error v-if="errors.has('email')">{{ errors.first('email') }}</error>
                                    </div>
                                    <div>
                                        <button type="submit"
                                                class="btn btn-primary mt-3 send-password-reset-link"
                                                @click="sendPasswordResetLink">
                                            Send Password Reset Link
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "SendResetPasswordLinkView",
        data() {
            return {
                email: ''
            }
        },
        methods: {
            sendPasswordResetLink(e) {
                e.preventDefault()
                this.$validator.validateAll()
                if (this.errors.any()) return;

                this.$store.dispatch('auth/sendPasswordResetLink', { email: this.email })
                    .then(() => {
                        this.$flash.success({title: 'Reset Password Link', text: 'Password reset Link sent successfully'})
                    })
                    .catch(() => {
                        this.$flash.error({title: 'Reset Password', text: 'Error occured sending password reset link. Try again'})
                    })
            }
        }
    }
</script>

<style scoped>

</style>