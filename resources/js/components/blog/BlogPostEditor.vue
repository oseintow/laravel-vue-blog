<template>
    <div class="blog-post-editor">
        <quill-editor v-model="content"
            ref="myQuillEditor"
            :options="editorOption">
        </quill-editor>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.bubble.css'
    import 'quill/dist/quill.snow.css'

    import { quillEditor } from 'vue-quill-editor'

    export default {
        name: "BlogPostEditor",
        components: {
            quillEditor
        },
        data() {
            return {
                content: '',
                editorOption: {
                    debug: 'info',
                    placeholder: 'Type your post',
                    readOnly: true,
                    theme: 'snow'
                },
                delta: undefined
            }
        },
        watch: {
            content() {
                // this.delta = this.$refs.myQuillEditor.quill.getContents()
                this.$emit('delta', this.$refs.myQuillEditor.quill.getContents())
            }
        }
    }
</script>

<style>
    .ql-editor{
        height: 72vh
    }
</style>