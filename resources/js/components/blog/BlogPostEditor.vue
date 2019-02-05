<template>
    <div class="blog-post-editor">
        <quill-editor v-model="content"
            ref="myQuillEditor"
            :options="editorOption">
        </quill-editor>
    </div>
</template>

<script>
    // import 'quill/dist/quill.core.css'
    // import 'quill/dist/quill.bubble.css'
    import 'quill/dist/quill.snow.css'

    import { quillEditor } from 'vue-quill-editor'
    import { Button, Input, Select } from 'iview'

    export default {
        name: "BlogPostEditor",
        components: {
            Button,
                Input,
                Select,
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
                }
            }
        },
        watch: {
            content(val) {
                console.log(val)
            }
        }
    }
</script>

<style>
    .ql-editor{
        height: 72vh
    }
</style>