<template>
    <div>
        <div>
            <blog-reader :blog="blog" v-if="blog"></blog-reader>
        </div>
        <div class="row justify-content-md-center favourite ml-1">
            <div class="col-md-8">
                <favourite :favourite="blog" v-if="blog"></favourite>
            </div>
        </div>
        <div class="row justify-content-md-center comment-editor">
            <div class="col-md-8 mb-4">
                <h3>Comments</h3>
            </div>
            <div class="col-md-8" v-if="$auth.check">
                <new-comment :newComment="content" :slug="params.slug" v-if="params.slug"></new-comment>
            </div>
        </div>
        <div class="row justify-content-md-center get-new-comments ">
            <div class="col-md-8">
                <get-new-comments :slug="params.slug" v-if="params.slug"></get-new-comments>
            </div>
        </div>
        <div class="row justify-content-md-center comments">
            <div class="col-md-8">
                <comments :slug="params.slug" v-if="params.slug"></comments>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import BlogReader from '@/components/blog/BlogReader'
    import NewComment from '@/components/comment/NewComment'
    import Comments from '@/components/comment/Comments'
    import GetNewComments from '@/components/comment/GetNewComments'
    import Favourite from '@/components/Favourite'

    export default {
        name: "BlogView",
        components:{
            BlogReader,
            Comments,
            NewComment,
            Favourite,
            GetNewComments
        },
        data() {
            return {
                blog: '',
                body: '',
                params: {
                    nickname: this.$route.params.nickname,
                    slug: this.$route.params.slug
                }
            }
        },
        methods: {
            ...mapActions({
                getUserBlog: 'blog/getUserBlog',
            }),
            content(value){
                // this.body = value.getContents()
            }
        },
        created() {
            this.getUserBlog(this.params)
                .then((response) => {
                    this.blog = response.blog
                })
        }
    }
</script>

<style>
    .favourite {
        margin-bottom: 30px;
        margin-top: -60px;
    }
    .get-new-comments {
        margin-bottom: 30px;
    }
    .comments {
        margin-bottom: 100px;
    }
    .comment-editor {
        margin-bottom: 50px;
    }
</style>