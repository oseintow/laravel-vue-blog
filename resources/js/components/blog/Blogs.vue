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
        data() {
            return {
                payload: {
                    page: 1,
                    q: '',
                    per_page: 10
                },
            }
        },
        computed: {
            ...mapGetters('blog', ['blogs'])
        },
        methods: {
            getBlogs() {
                this.$store.dispatch('blog/getBlogs', this.payload)
                    .catch(error => console.error(error));
            }
        },
        watch: {
            payload: {
                handler(value) {
                    this.getBlogs()
                },
                deep: true
            }
        },
        mounted() {
            this.getBlogs()

            this.$eventBus.$on('search', (value) => {
                this.payload.q=value
            })
        }
    }
</script>

<style scoped>

</style>