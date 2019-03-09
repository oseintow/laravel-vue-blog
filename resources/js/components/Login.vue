<template>
    <div>
        <form novalidate>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="text"
                       v-model="user.email"
                       name="email"
                       class="form-control"
                       id="email"
                       placeholder=""
                       data-vv-as="email"
                       v-validate="'required|email'">
                <error v-show="errors.has('email')">{{ errors.first('email') }}</error>
            </div>


            <div class="form-group">
                <label for="password">password:</label>
                <input type="password"
                       v-model="user.password"
                       name="password"
                       class="form-control"
                       id="password"
                       ref="password"
                       placeholder="">
            </div>

            <div class="float-right">
                <a href="" @click="resetPassword">Forgot Your Password?</a>
            </div>

            <button type="submit" class="btn btn-primary submit" @click="submit">Submit</button>
        </form>
    </div>
</template>

<script>
    import AuthenticationMixin from '@/mixins/AuthenticationMixin'

    export default {
        name: "Login",
        mixins: [AuthenticationMixin],
        data() {
            return {
                user: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            submit(e) {
                e.preventDefault()
                this.$validator.validateAll()
                if (this.errors.any()) return;

                this.login(this.user)
                    .then(() => {
                        this.user = {
                            email: '',
                            password: ''
                        }
                        this.$nextTick(() => this.$validator.reset())
                    })
                    .catch((error) => {
                        this.$flash.error({title: 'Login', text: "Email or password incorrect"})
                    })
            },
            resetPassword(e) {
                e.preventDefault()
                this.$emit('reset-password')
            }
        }
    }
</script>

<style scoped>

</style>