<template>
    <div>
        <h3>Medium Editor</h3>
        <blog-post-editor></blog-post-editor>
    </div>
</template>

<script>
    import BlogPostEditor from '@/components/blog/BlogPostEditor'

    export default {
        name: "NewBlog",
        components: {
            BlogPostEditor
        },
        data() {
            return {
            }
        },
        methods: {

        }
    }
</script>

<style scoped>
</style>