<template>
    <div class="d-flex flex-md-row align-items-center p-3 px-md-4 mb-1 bg-white border-bottom shadow-sm">
        <div class="container">
            <nav class="my-2 my-md-0 mr-md-3 nav">
                <h5 class="my-0 mr-md-auto font-weight-normal nav mt-2 home" @click="home">OSEINTOW</h5>
                <div class="nav  justify-content-end">
                    <a class="p-2 text-dark" @click.preventDefault="stories" v-if="$auth.check">Stories</a>
                    <a class="p-2 text-dark" @click.preventDefault="newStory" v-if="$auth.check">New Story</a>
                    <a class="p-2 text-dark" @click.preventDefault="signIn" v-if="!$auth.check">Sign In</a>
                </div>
                <button class="btn btn-outline-primary justify-content-end"
                        @click="signUp"
                        v-if="!$auth.check">
                    Get started
                </button>
                <div class="justify-content-end d-flex" v-if="$auth.check">
                    <div class="dropdown">
                        <div type="button" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="-50,23">
                            <avatar :image="$auth.user.avatar" :width="40" :height="40"></avatar>
                        </div>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                            <a class="dropdown-item" @click.preventDefault="signOut" >Sign Out</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
    import Avatar from '@/components/Avatar'

    export default {
        name: "Header",
        components: {
            Avatar
        },
        methods: {
            signIn() {
                this.$eventBus.signIn()
            },
            signUp() {
                this.$eventBus.signUp()
            },
            signOut() {
                this.$store.dispatch('auth/logout')
            },
            home() {
                return this.$router.push('/')
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
    .home{
        cursor: pointer
    }
</style>