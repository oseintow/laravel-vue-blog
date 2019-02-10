<template>
    <editor @delta="delta"></editor>
</template>

<script>
    import Editor from '@/components/blog/Editor'

    export default {
        name: "CommentEditor",
        components: {
            Editor
        },
        methods: {
            delta(value) {
                this.$emit('content', value)
            }
        }
    }
</script>

<style scoped>

</style>