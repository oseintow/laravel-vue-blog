<template>
    <div class="blog-post-editor">
        <div class="post-inputs">
            <div class="title-input">
                <Input/>
                <error>Title should be more than 10 characters</error>
            </div>
            <div class="cat-input">
                <error>Post must have a category</error>
            </div>
            <div class="image-input">

            </div>
        </div>
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
    import Error from '@/components/Error'

    export default {
        name: "BlogPostEditor",
        components: {
            Button,
            Input,
            Select,
            quillEditor,
            Error
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
                delta: undefined,
                postCategories: [
                    {
                        id: 1,
                        label: 'Nodejs',
                        img: 'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/256/full/nodejslogo.png'
                    },
                    {
                        id: 2,
                        label: 'Javascript',
                        img: 'https://cdn-images-1.medium.com/max/1600/1*zWhOGf_PgX0nRTLZLmFpGg.png'
                    }
                ]
            }
        },
        watch: {
            content() {
                this.delta = this.$refs.myQuillEditor.quill.getContents()
            }
        }
    }
</script>

<style>
    .ql-editor{
        height: 72vh
    }
</style>