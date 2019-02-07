<template>
    <div>
        <div class="row col-md-12">
            <search></search>
        </div>
        <div class="row">
            <div class="col-md-8">
                <div class="mr-4">
                    <blogs></blogs>
                </div>
            </div>
            <div class="col-md-4">
                <div class="row">
                    <h4>Placeholder for image</h4>
                </div>
                <div class="row mt-4">
                    <h4>Placeholder for Popular on this Blog Site</h4>
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