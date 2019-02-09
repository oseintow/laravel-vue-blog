<template>
    <div>
        <div v-for="blog in blogs">
            <blog :data="blog"></blog>
        </div>
        <div style="margin-bottom: 100px">
            <infinite-loading spinner="waveDots" @infinite="getBlogs" v-if="blogs"></infinite-loading>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from'vuex'
    import InfiniteLoading from 'vue-infinite-loading';
    import Blog from '@/components/blog/Blog'

    export default {
        name: "Blogs",
        components: {
            Blog,
            InfiniteLoading
        },
        data() {
            return {
                blogs: [],
                payload: {
                    page: 1,
                    q: '',
                    per_page: 5
                },
            }
        },
        methods: {
            getBlogs(state = null) {
                this.$store.dispatch('blog/getBlogs', this.payload)
                    .then((response) => {
                        this.blogs.push(...response.data)
                        if(response.meta.current_page != response.meta.last_page) {
                            this.payload.page = response.meta.current_page + 1
                            if(state  != null) state.loaded()
                        }else{
                            if(state  != null) state.complete()
                        }

                    })
                    .catch(error => console.error(error))
            },
            resetPayload(){
                this.payload = {
                    page: 1,
                    q: '',
                    per_page: 5
                }
            }

        },

        beforeMount() {
            this.$eventBus.$on('search', (value) => {
                this.resetPayload()
                this.payload.q=value
                this.blogs = []
                this.getBlogs()
            })
        }
    }
</script>

<style scoped>

</style>