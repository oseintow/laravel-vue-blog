<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <user-blogs :nickname="params.nickname" v-if="params.nickname"></user-blogs>
        </div>
    </div>
</template>

<script>
    import UserBlogs from "@/components/blog/UserBlogs"

    export default {
        name: "UserBlogsView",
        components: {
            UserBlogs
        },
        data() {
            return {
                params: {
                    nickname: this.$route.params.nickname
                }
            }
        }
    }
</script>

<style scoped>

</style>