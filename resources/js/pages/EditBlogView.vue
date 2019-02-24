<template>
    <div>
        <h3 class="mb-4">Edit Story</h3>
        <blog-form type="edit" :slug="slug"></blog-form>
    </div>
</template>

<script>
    import BlogForm from '@/components/blog/BlogForm'

    export default {
        name: "EditBlogView",
        components: {
            BlogForm
        },
        data() {
            return {
                slug: this.$route.params.slug
            }
        }
    }
</script>

<style scoped>

</style>