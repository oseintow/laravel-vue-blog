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
        components: {
            Button,
            Input,
            Select,
            quillEditor
        }
    }
</script>    