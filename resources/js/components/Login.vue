<template>
    <div>
        <form novalidate>
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text"
                       v-model="user.name"
                       name="name"
                       class="form-control"
                       id="name"
                       placeholder=""
                       v-validate="'required|min:3|max:100'">
                <error v-show="errors.has('name')">{{ errors.first('name') }}</error>
            </div>

            <div class="form-group">
                <label for="nickname">Nickname:</label>
                <input type="text"
                       v-model="user.nickname"
                       name="nickname"
                       class="form-control"
                       id="nickname"
                       placeholder=""
                       v-validate="'required|min:3|max:50'">
                <error v-show="errors.has('nickname')">{{ errors.first('nickname') }}</error>
            </div>

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
                       placeholder=""
                       v-validate="'required|min:6|max:50'">
                <error v-show="errors.has('password')">{{ errors.first('password') }}</error>
            </div>

            <div class="form-group">
                <label for="password_confirmation">Confirm Password:</label>
                <input type="password"
                       v-model="user.confirm_password"
                       name="password_confirmation"
                       class="form-control"
                       id="password_confirmation"
                       placeholder=""
                       data-vv-as="password"
                       v-validate="'required|confirmed:password'">
                <error v-show="errors.has('password_confirmation')">{{ errors.first('password_confirmation') }}</error>
            </div>

            <button type="submit" class="btn btn-primary" @click="submit">Submit</button>
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
                this.login(this.user)
                    .then(() => {
                        this.user = {
                            email: '',
                            password: ''
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>