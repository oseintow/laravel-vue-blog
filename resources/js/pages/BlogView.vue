<template>
    <div>
        <div>
            <blog-reader :blog="blog" v-if="blog"></blog-reader>
        </div>
        <div class="row row justify-content-md-center comments">
            <div class="col-md-8">
                <comments :slug="params.blog" v-if="params.blog"></comments>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import BlogReader from '@/components/blog/BlogReader'
    import Comments from '@/components/comment/Comments'

    export default {
        name: "BlogView",
        components:{
            BlogReader,
            Comments
        },
        data() {
            return {
                blog: '',
                params: {
                    nickname: this.$route.params.nickname,
                    blog: this.$route.params.blog
                }
            }
        },
        methods: {
            ...mapActions({
                getBlog: 'blog/getBlog'
            })
        },
        created() {
            this.getBlog(this.params)
                .then((response) => {
                    this.blog = response.blog
                })
        }
    }
</script>

<style>
.comments {
    margin-bottom: 100px;
}
</style>