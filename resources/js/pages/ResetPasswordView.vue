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
                                               v-model="user.email"
                                               name="email"
                                               class="form-control"
                                               id="email"
                                               data-vv-as="email"
                                               v-validate="'required|email'">
                                    </div>
                                    <div>
                                        <error v-if="errors.has('email')">{{ errors.first('email') }}</error>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="email" class="col-sm-3 col-form-label" style="font-size: 14px">Password:</label>
                                <div class="col-sm-9">
                                    <div>
                                        <input type="password"
                                               v-model="user.password"
                                               name="password"
                                               class="form-control"
                                               id="password"
                                               ref="password"
                                               placeholder=""
                                               v-validate="'required|min:6|max:50'">
                                    </div>
                                    <div>
                                        <error v-if="errors.has('password')">{{ errors.first('password') }}</error>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="email" class="col-sm-3 col-form-label" style="font-size: 14px">Confirm Password:</label>
                                <div class="col-sm-9">
                                    <div>
                                        <input type="password"
                                               v-model="user.password_confirmation"
                                               name="password_confirmation"
                                               class="form-control"
                                               id="password_confirmation"
                                               placeholder=""
                                               data-vv-as="password"
                                               v-validate="'required|confirmed:password'">
                                    </div>
                                    <div>
                                        <error v-if="errors.has('password_confirmation')">{{ errors.first('password_confirmation') }}</error>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-3"></div>
                                <div class="col-sm-9">
                                    <button type="submit"
                                            class="btn btn-primary mt-2 reset-password"
                                            @click="resetPassword">
                                        Reset Password
                                    </button>
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
        name: "ResetPasswordView",
        data() {
          return {
            user: {
                email: '',
                password: '',
                password_confirmation: '',
                token: this.$route.params.token
            }
          }
        },
        methods: {
            resetPassword(e) {
                e.preventDefault()
                this.$validator.validateAll()
                if (this.errors.any()) return;

                this.$store.dispatch('auth/resetPassword', this.user)
                    .then(() => {
                        this.$flash.success({title: 'Reset Password', text: 'Password reset successfully'})
                        this.$router.push({name: 'home'})
                    })
                    .catch((error) => {
                        this.$flash.error({title: 'Reset Password', text: 'Error occured resetting password. Try again'})
                    })
            }
        }
    }
</script>

<style scoped>

</style>