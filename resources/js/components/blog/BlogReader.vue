<template>
    <div class="row justify-content-md-center">
        <div class="col-md-8">
            <div class="header">
                <h3 class="title">{{blogPost.title}}</h3>
                <router-link class="blog-link" :to="{name: 'users-blogs', params: { nickname: author.nickname }}">
                    <div class="d-flex flex-row">
                        <div class="p-2">
                            <img :src="author.avatar" class="avatar avatar-image avatar-image--icon" alt="">
                        </div>
                        <div class="blog-info">
                            <p class="author-name">{{author.name}}</p>
                            <p class="created_at">{{ago}}</p>
                        </div>
                    </div>
                </router-link>
            </div>
            <div ref="blogContent" class="blogContent"></div>
        </div>
    </div>
</template>

<script>
    import Quill from 'quill'
    import moment from 'moment'

    export default {
        name: "BlogReader",
        props: ['blog'],
        data() {
            return {
                author: this.blog.author,
                blogPost: this.blog
            }
        },
        created() {
            const article = document.createElement('article')
            let quill = new Quill(article, {readOnly: true})

            quill.setContents(this.blog.body)
            setTimeout(() => {
                article.getElementsByClassName("ql-editor")[0].className += ' blogContent'
                this.$refs.blogContent.appendChild(article)
            }, 0)
        },
        computed: {
            ago() {
                return moment(this.blogPost.created_at).fromNow() + '...';
            },
        }
    }
</script>

<style>
    .blogContent {
        height: 100% !important;
        font-family: medium-content-serif-font,Georgia,Cambria,"Times New Roman",Times,serif;
        letter-spacing: .01rem;
        font-weight: 400;
        font-style: normal;
        font-size: 21px;
        line-height: 1.58;
        letter-spacing: -.003em;
        margin-bottom: 50px;
    }

    .blogContent pre {
        background-color: #000;
        color: white;
        padding: 10px;
        border-radius: 5px;
    }

    .header {
        padding-left: 15px;
        padding-right: 15px;
    }

    .title {
        font-family: medium-content-title-font,Georgia,Cambria,"Times New Roman",Times,serif;
        letter-spacing: 0;
        font-size: 50px;
        color: black;
        margin-bottom: 10px;
    }

    .avatar-image {
        background-image: url("https://cdn-images-1.medium.com/fit/c/64/64/0*6UYZ5LeYzOr24--U.");
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 100%
    }

    .avatar-image--icon {
        width: 50px;
        height: 50px;
    }

    .blog-info {
        padding-top: 17px;
        font-family: medium-content-sans-serif-font,"Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif!important
    }

    .author-name {
        font-size: 13px;
    }

    .blog-link {
        color: #515a6e !important;
    }

</style>