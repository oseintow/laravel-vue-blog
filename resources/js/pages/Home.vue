<template>
    <div>
        Hello am in home
        <div>{{ getBlogs }}</div>
        <router-link to="signin">SignIn</router-link>
        <button @click="showSignUp">Show SignUp</button>
        <button @click="showSignIn">Show SignIn</button>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "Home",
        data() {
            return {
                blogs: {}
            }
        },
        computed: {
            ...mapGetters('blog', ['getBlogs'])
        },
        mounted() {
            this.$store.dispatch('blog/blogs', {name: 'shopify'}).catch(error => {
                console.error(error)
            })
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