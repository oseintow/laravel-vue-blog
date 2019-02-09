<template>
    <div class="row justify-content-md-center">
        <div class="col-md-8">
            <h3 class="title">{{blogPost.title}}</h3>
            <div ref="blogContent" class="blogContent"></div>
        </div>
    </div>
</template>

<script>
    import Quill from 'quill'

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

    .title {
        padding-left: 15px;
        padding-right: 15px;
        font-family: medium-content-title-font,Georgia,Cambria,"Times New Roman",Times,serif;
        letter-spacing: 0;
        font-size: 50px;
        color: black;
    }
</style>