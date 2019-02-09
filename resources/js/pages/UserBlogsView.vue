<template>
    <div>
        <user-blogs :nickname="params.nickname" v-if="params.nickname"></user-blogs>
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