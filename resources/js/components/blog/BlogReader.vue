<template>
    <div>
        <div ref="blogContent" class="blogContent"></div>
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
            }
        },
        created() {
            const article = document.createElement('article')
            let quill = new Quill(article, {readOnly: true})

            quill.setContents(this.blog.body)
            setTimeout(() => this.$refs.blogContent.appendChild(article), 0)
        }
    }
</script>

<style>
    .ql-editor {
        height: 100%
    }

    .ql-editor pre {
        background-color: #000;
        color: white;
        padding: 10px;
        border-radius: 5px;
    }

    .blogContent {
        margin-bottom: 50px
    }
</style>