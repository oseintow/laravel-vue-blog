<template>
    <div>
        <h3>Medium Editor</h3>
        <div class="post-inputs">
            <div class="title-input">
                <error>Title should be more than 10 characters</error>
                <Input v-model="title" placeholder="Post title"/>
            </div>
            <div class="cat-input">
                <error>Post must have a category</error>
                <Select placeholder="Select a Category"
                        v-model="category"
                        v-if="postCategories.length">
                    <Option v-for="(cat, index) in postCategories" :key="index" :value="cat.id">
                        {{cat.label}}
                    </Option>
                </Select>
            </div>
            <div class="image-input">
                <error>Post must have an image</error>
                <div class="inner-image-input">
                    <img :src="image_url" alt="" v-if="image_url"/>
                    <Button @click="showImageModel = true" type="primary" class="flex-center" icon="ios-camera-outline">Post Image</Button>
                </div>
            </div>
        </div>
        <blog-post-editor @delta="delta"></blog-post-editor>
        <div class="post-actions-row">
            <Button class="btn-delete" @click="del">Delete</Button>
            <Button type="primary" @click="save">Save</Button>
            <Button type="primary" @click="publish">Publish</Button>
        </div>
    </div>
</template>

<script>
    import BlogPostEditor from '@/components/blog/BlogPostEditor'
    import { Button, Input, Select } from 'iview'
    import Error from '@/components/Error'

    export default {
        name: "NewBlog",
        components: {
            BlogPostEditor,
            Button,
            Input,
            Select,
            Error
        },
        data() {
            return {
                title: '',
                category:'',
                image_url: '',
                showImageModel: false,
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
        methods: {
            delta(value) {
                console.log(value)
            },
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
    .inner-image-input{
        display: flex;
        align-items: center;
    }
    .flex-center{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .post-actions-row {
        display: flex;
        justify-content: space-between;
    }
    .ivu-icon-ios-camera-outline{
        font-size: 16px
    }
</style>