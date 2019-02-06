<template>
    <div>
        <h3>Medium Editor</h3>
        <div class="post-inputs row mb-4">
            <div class="col-sm-3">
                <div class="image-input form-group">
                    <div class="row">
                        <img class="image-display" src="" alt="">
                    </div>
                    <error class="flex-center">Post must have an image</error>
                    <div class="inner-image-input flex-center">
                        <input type="file" class="flex-center"/>
                        <!--<Button @click="showImageModel = true" type="primary" class="flex-center" icon="ios-camera-outline">Post Image</Button>-->
                    </div>
                </div>
            </div>
            <div class="col-sm-9">
                <div class="title-input form-group">
                    <error>Title should be more than 10 characters</error>
                    <Input v-model="title" placeholder="Post title"/>
                </div>
                <div class="cat-input form-group">
                    <error>Post must have a category</error>
                    <Select placeholder="Select a Category"
                            v-model="category">
                        <Option v-for="(cat, index) in categories" :key="index" :value="cat.id">
                            {{cat.label}}
                        </Option>
                    </Select>
                </div>
            </div>
        </div>
        <blog-post-editor @delta="delta" :body="body"></blog-post-editor>
        <div class="post-actions-row">
            <Button class="btn-delete" @click="del">Delete</Button>
            <Button type="primary" @click="save">Save</Button>
            <Button type="primary" @click="publish">Publish</Button>
        </div>

        <div class="" ref="contentContainer"></div>
    </div>
</template>

<script>
    import BlogPostEditor from '@/components/blog/BlogPostEditor'
    import { Button, Input, Select } from 'iview'
    import Error from '@/components/Error'
    import Quill from 'quill'
    import { mapGetters } from 'vuex'

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
                content: '',
                body: '',
                article: null,
                quill: null,
                title: '',
                category:'',
                categories: '',
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
        mounted() {
            this.article = document.createElement('article')
            this.quill = new Quill(this.article, {})

            this.$store.dispatch('category/getCategories')
                .then(({data}) => {
                    this.categories = data
                })
                .catch(error => {
                    console.error(error)
            })
        },
        computed: {
            // ...mapGetters('category', ['categories'])
        },
        methods: {
            delta(value) {
                this.body = value;
                this.quill.setContents(value)
                setTimeout(() =>{
                    this.$refs.contentContainer.appendChild(this.article)
                },0)
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
    .image-display{
        width: 300px;
        height: 250px;
        background-image: url("https://placeit.net/uploads/stage/stage_image/4475/default_ac2915d90aa42e8694f4277b355ffc52.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-color: #cccccc;
    }
</style>