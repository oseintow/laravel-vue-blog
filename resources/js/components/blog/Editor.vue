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
        name: "Editor",
        props: ['body'],
        components: {
            quillEditor
        },
        data() {
            return {
                content: this.body,
                editorOption: {
                    placeholder: 'Type your post',
                    readOnly: true,
                    theme: 'snow'
                },
                delta: undefined
            }
        },
        watch: {
            content(value) {
                let delta = this.$refs.myQuillEditor.quill

                if(value !== '') {
                    this.$emit('delta', delta)
                }else{
                    this.$emit('delta', '')
                }
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
        height: 36vh !important
    }
</style>