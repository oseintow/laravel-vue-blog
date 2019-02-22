<template>
    <div>
        <div class="row">
            <div class="col-md-8">
                <div class="mr-4">
                    <blogs></blogs>
                </div>
            </div>
            <div class="col-md-4">
                <div class="row">
                    <ul class="list-group d-flex" style="width: 100%">
                        <li class="list-group-item"><h6>Search</h6></li>
                        <li class="list-group-item">
                            <search placeholder="search for blog"></search>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
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