<template>
    <div class="d-flex flex-md-row align-items-center p-3 px-md-4 mb-1 bg-white border-bottom shadow-sm">
        <div class="container">
            <nav class="my-2 my-md-0 mr-md-3 nav">
                <h5 class="my-0 mr-md-auto font-weight-normal nav mt-2">OSEINTOW</h5>
                <div class="nav  justify-content-end">
                    <a class="p-2 text-dark" @click.preventDefault="stories" v-if="$auth.check">Stories</a>
                    <a class="p-2 text-dark" @click.preventDefault="newStory" v-if="$auth.check">New Story</a>
                    <a class="p-2 text-dark" @click.preventDefault="signIn" v-if="!$auth.check">Sign in</a>
                    <a class="p-2 text-dark" @click.preventDefault="logout" v-if="$auth.check" >Logout</a>

                </div>
                <button class="btn btn-outline-primary justify-content-end"
                        @click="signUp"
                        v-if="!$auth.check">
                    Get started
                </button>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TopicsMenu",
        methods: {
            signIn() {
                this.$eventBus.signIn()
            },
            signUp() {
                this.$eventBus.signUp()
            },
            logout() {
                this.$store.dispatch('auth/logout')
            },
            stories() {
                return this.$router.push(`/@${this.$auth.user.nickname}`)
            },
            newStory() {
                return this.$router.push({name: 'new-blog'})
            }
        }
    }
</script>

<style scoped>

</style>