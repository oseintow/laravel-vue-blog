<template>
    <div>
        <blogs></blogs>
        <router-link to="signin">SignIn</router-link>
        <button @click="showSignUp">Show SignUp</button>
        <button @click="showSignIn">Show SignIn</button>
    </div>
</template>

<script>
    import Blogs from '@/components/blog/Blogs'

    export default {
        name: "Home",
        components: {
            Blogs
        },
        methods: {
            showSignUp() {
                this.$eventBus.signUp()
            },
            showSignIn() {
                this.$eventBus.signIn()
            }
        }
    }
</script>

<style scoped>

</style>