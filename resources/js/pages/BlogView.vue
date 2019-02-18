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
        <div class="row justify-content-md-center comment-editor" v-if="$auth.check">
            <div class="col-md-8">
                <comment-editor :newComment="content" :slug="params.slug" v-if="params.slug"></comment-editor>
            </div>
        </div>
        <!--<div class="row justfify-content-md-center comment-text">-->
            <!--<div class="col-md-8">-->
                <!--<h3>Comments</h3>-->
                <!--<hr>-->
            <!--</div>-->
        <!--</div>-->
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
    import CommentEditor from '@/components/comment/CommentEditor'
    import Comments from '@/components/comment/Comments'
    import Favourite from '@/components/Favourite'

    export default {
        name: "BlogView",
        components:{
            BlogReader,
            Comments,
            CommentEditor,
            Favourite
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
    .favourite {
        margin-bottom: 30px;
        margin-top: -60px;
    }
    .comments {
        margin-bottom: 100px;
    }
    .comment-editor {
        margin-bottom: 50px;
    }
</style>