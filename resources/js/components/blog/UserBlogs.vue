<template>
    <div>
        Am in user blogs
        <div v-for="userBlog in userBlogs">
            <!--<blog :data="blog"></blog>-->
        </div>
        <div style="margin-bottom: 100px">
            <infinite-loading :identifier="query.q" spinner="waveDots" @infinite="getUserBlogs" v-if="userBlogs"></infinite-loading>
        </div>
    </div>
</template>

<script>
    import InfiniteLoading from 'vue-infinite-loading';
    import Blog from '@/components/blog/Blog'

    export default {
        name: "UserBlogs",
        props: ['nickname'],
        components: {
            Blog,
            InfiniteLoading
        },
        data() {
            return {
                userBlogs: [],
                params: {
                    nickname: this.nickname
                },
                query: {
                    page: 1,
                    q: '',
                    per_page: 5
                },
                scrollState: null
            }
        },
        methods: {
            getUserBlogs(state) {
                this.$store.dispatch('blog/getUserBlogs', { params: this.params, query: this.query})
                    .then((response) => {
                        this.userBlogs.push(...response.data)
                        if(response.meta.current_page != response.meta.last_page) {
                            this.query.page = response.meta.current_page + 1
                            state.loaded()
                        }else{
                            state.complete()
                        }

                    })
                    .catch(error => console.error(error))
            },
            resetPayload(){
                this.query = {
                    page: 1,
                    q: '',
                    per_page: 5
                }
            }

        },

        beforeMount() {
            this.$eventBus.$on('search', (value) => {
                this.resetPayload()
                this.query.q=value
                this.userBlogs = []
            })
        }
    }
</script>

<style scoped>

</style>