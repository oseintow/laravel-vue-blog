<template>
    <div>
        <div v-for="blog in blogs.data">
            <blog :data="blog"></blog>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from'vuex'
    import Blog from '@/components/blog/Blog'

    export default {
        name: "Blogs",
        components: {
            Blog
        },
        computed: {
            ...mapGetters('blog', ['blogs'])
        },
        mounted() {
            this.$store.dispatch('blog/getBlogs').catch(error => {
                console.error(error)
            })
        }
    }
</script>

<style scoped>

</style>