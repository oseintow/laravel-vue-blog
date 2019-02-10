<template>
    <div>
        <div>
            <blog-reader :blog="blog" v-if="blog"></blog-reader>
        </div>
        <div class="row justify-content-md-center comment-editor">
            <div class="col-md-8">
                <comment-editor :newComment="content" :slug="params.slug" v-if="params.slug"></comment-editor>
            </div>
        </div>
        <div class="row row justify-content-md-center comments">
            <div class="col-md-8">
                <comments :slug="params.slug" v-if="params.slug"></comments>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import BlogReader from '@/components/blog/BlogReader'
    import CommentEditor from '@/components/comment/CommentEditor'
    import Comments from '@/components/comment/Comments'

    export default {
        name: "BlogView",
        components:{
            BlogReader,
            Comments,
            CommentEditor
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
                getBlog: 'blog/getBlog',
            }),
            content(value){
                // this.body = value.getContents()
            }
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
    .comment-editor {
        margin-bottom: 50px;
    }
</style>