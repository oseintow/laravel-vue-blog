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
        props: ['body'],
        components: {
            quillEditor
        },
        data() {
            return {
                content: this.body,
                editorOption: {
                    // debug: 'info',
                    placeholder: 'Type your post',
                    readOnly: true,
                    theme: 'snow'
                },
                delta: undefined
            }
        },
        watch: {
            content() {
                const delta = this.$refs.myQuillEditor.quill.getContents()

                if(delta !== '') this.$emit('delta', delta)
            },
            body() {
                if(this.body == '') {
                    this.content = this.body
                }
            }
        }
    }
</script>

<style>
    .ql-editor{
        height: 72vh
    }
</style>