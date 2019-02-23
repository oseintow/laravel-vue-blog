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
                                    <input type="text"
                                           v-model="email"
                                           name="email"
                                           class="form-control"
                                           id="email"
                                           data-vv-as="email"
                                           v-validate="'required|email'">
                                    <error v-show="errors.has('email')">{{ errors.first('email') }}</error>
                                    <button type="submit" class="btn btn-primary mt-3">Send Password Reset Link</button>
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
        name: "ResetPasswordView"
    }
</script>

<style scoped>

</style>