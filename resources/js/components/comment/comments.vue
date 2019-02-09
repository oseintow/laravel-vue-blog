<template>
    <div>
        <editor @delta="delta" :body="blog.body"></editor>
    </div>
</template>

<script>
    import Editor from '@/component/blog/Editor'

    export default {
        name: "comments",
        components: {
            Editor
        }
    }
</script>

<style scoped>

</style>