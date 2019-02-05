<template>
    <div class="blog-post-editor">
        <div class="post-inputs">
            <div class="title-input">
                <error>Title should be more than 10 characters</error>
                <Input v-model="title" placeholder="Post title"/>
            </div>
            <div class="cat-input">
                <error>Post must have a category</error>
                <Select placeholder="Select a  Category"
                        v-model="category"
                        v-if="postCategories.length">
                    <option v-for="(cat, index) in postCategories" :key="index" :value="cat.id">{{cat.label}}</option>
                </Select>
            </div>
            <div class="image-input">
                <error>Post must have an image</error>
                <div class="inner-image-input">
                    <img :src="image_url" alt="" v-if="image_url"/>
                    <Button type="primary" class="flex-center" icon="ios-camera-outline">Post Image</Button>
                </div>
            </div>
        </div>
        <quill-editor v-model="content"
            ref="myQuillEditor"
            :options="editorOption">
        </quill-editor>
        <div class="post-actions-row">
            <Button class="btn-delete" @click="del">Delete</Button>
            <Button type="primary" @click="save">Save</Button>
            <Button type="primary" @click="publish">Publish</Button>
        </div>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.bubble.css'
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
                title: '',
                category:'',
                image_url: '',
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
        },
        methods: {
            del() {

            },
            save() {

            },
            publish() {

            }
        }
    }
</script>

<style>
    .ql-editor{
        height: 72vh
    }
    .inner-image-input{
        display: flex;
        align-items: center;
    }
    .flex-center{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .ivu-icon-ios-camera-outline{
        font-size: 16px
    }
</style>