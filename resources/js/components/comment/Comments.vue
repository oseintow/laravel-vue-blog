<template>
    <div>
        <div v-for="comment in comments">
            <comment :data="comment" class="mb-3"></comment>
        </div>
        <div style="margin-bottom: 100px" v-if="enableInfiniteLoading">
            <infinite-loading :identifier="query.q" spinner="waveDots" @infinite="getComments" v-if="comments"></infinite-loading>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import InfiniteLoading from 'vue-infinite-loading';
    import Comment from '@/components/comment/Comment'

    export default {
        name: "comments",
        props: {
            slug: String,
            enableInfiniteLoading: {
                type: Boolean,
                default: true
            },
            newComments: {
                type: Array,
                default: function() {
                    return [];
                }
            }
        },
        components: {
            Comment,
            InfiniteLoading
        },
        data() {
            return {
                comments: this.newComments,
                query: {
                    page: 1,
                    q: '',
                    per_page: 5
                },
            }
        },
        methods: {
            getComments(state) {
                this.$store.dispatch('comment/getComments', {slug: this.slug, query: this.query})
                    .then((response) => {
                        this.comments.push(...response.data)
                        if(response.meta.current_page != response.meta.last_page) {
                            this.query.page = response.meta.current_page + 1
                            state.loaded()
                        }else{
                            state.complete()
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>