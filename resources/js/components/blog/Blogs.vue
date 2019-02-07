<template>
    <div>
        <div v-for="blog in blogs">
            <div>{{ blog.title }}</div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from'vuex'

    export default {
        name: "Blogs",
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