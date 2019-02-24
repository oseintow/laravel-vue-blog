<template>
    <div>
        <div v-for="(userBlog, index) in userBlogs" :key="userBlog.id">
            <user-blog :data="userBlog" @deleted="remove(index)"></user-blog>
        </div>
        <div style="margin-bottom: 100px">
            <infinite-loading :identifier="query.q" spinner="waveDots" @infinite="getUserBlogs" v-if="userBlogs">
            </infinite-loading>
        </div>
    </div>
</template>

<script>
    import InfiniteLoading from 'vue-infinite-loading';
    import UserBlog from '@/components/blog/UserBlog'

    export default {
        name: "UserBlogs",
        props: ['nickname'],
        components: {
            UserBlog,
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
            },
            remove(index) {
                this.userBlogs.splice(index, 1);
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