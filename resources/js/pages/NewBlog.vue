<template>
    <div>
        <h3>Medium Editor</h3>
        <form enctype="multipart/form-data" novalidate>
            <div class="post-inputs row mb-4">
                <div class="col-sm-3">
                    <div class="image-input form-group">
                        <div class="row">
                            <img class="image-display" :src="image_url" alt="">
                        </div>
                        <div class="inner-image-input flex-center mt-3">
                            <input type="file" name="cover_image" v-on:change="onFileChange" class="flex-center"/>
                        </div>
                    </div>
                </div>
                <div class="col-sm-9">
                    <div class="title-input form-group">
                        <label for="title">Title:</label>
                        <input v-model="blog.title"
                               placeholder="Post title"
                               name="title"
                               class="form-control"
                               v-validate="'required|min:6'"/>
                        <error v-show="errors.has('title')">{{ errors.first('title') }}</error>
                    </div>
                    <div class="cat-input form-group">
                        <label for="title">Category:</label>
                        <select placeholder="Select a Category" name="category" class="form-control" v-validate="'required'"
                                v-model="blog.category_id">
                            <option value="">-- select category --</option>
                            <option v-for="(cat, index) in categories" :key="index" :value="cat.id">
                                {{cat.name}}
                            </option>
                        </select>
                        <error v-show="errors.has('category')">{{ errors.first('category') }}</error>
                    </div>
                    <div class="status-input form-group">
                        <label for="status">Status:</label>
                        <select placeholder="Status" name="status" class="form-control" v-validate="'required'"
                                v-model="blog.status">
                            <option value="">-- select Status --</option>
                            <option value="1">Publish</option>
                            <option value="0">Save as draft</option>
                        </select>
                        <error v-show="errors.has('status')">{{ errors.first('status') }}</error>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <blog-post-editor @delta="delta" :body="blog.body"></blog-post-editor>
            </div>
            <input type="text" name="body" v-model="body" v-validate="'required|min:6'">
            <error v-show="errors.has('body')">{{ errors.first('body') }}</error>
            <div class="post-actions-row">
                <Button class="btn-delete" @click="del">Delete</Button>
                <Button type="primary" @click="saveBlog">Save</Button>
                <Button type="primary" @click="publish">Publish</Button>
            </div>

            <div class="" ref="contentContainer"></div>
        </form>
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
            Error
        },
        data() {
            return {
                body: '',
                content: '',
                image_url: '',
                blog: {
                    title: '',
                    body: '',
                    category_id:'',
                    cover_image: '',
                    status: '',
                },
                article: null,
                quill: null,
                categories: '',
            }
        },
        mounted() {
            this.article = document.createElement('article')
            this.quill = new Quill(this.article, {})

            this.$store.dispatch('category/getCategories')
                .then(({categories}) => {
                    this.categories = categories
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
                if(value === '') {
                    return this.body = ''
                }
                this.body = value.getText()
                this.blog.body = value.getContents();
                this.quill.setContents(value.getContents())
                setTimeout(() =>{
                    this.$refs.contentContainer.appendChild(this.article)
                },0)
            },
            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                this.blog.cover_image = files[0];
                this.createImage(files[0])
            },
            createImage(file) {
                let reader = new FileReader();
                reader.onload = (e) => this.image_url = e.target.result;
                reader.readAsDataURL(file);
            },
            del() {

            },
            saveBlog() {
                const formData = new FormData();
                Object.keys(this.blog).forEach((key) => {
                    if(key === 'body') {
                        formData.append(key, JSON.stringify(this.blog[key]))
                    }else{
                        formData.append(key, this.blog[key])
                    }
                })

                this.$store.dispatch('blog/saveBlog', formData)
                    .then((response) =>{
                        this.blog = {
                            title: '',
                            body: '',
                            category_id:'',
                            cover_image: '',
                        };
                        this.image_url = ''
                        this.body = ''

                        // setTimeout(() => {
                        //     this.blog.body = response.blog.body
                        // }, 5000)
                    })
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
        width: 270px;
        max-width: 270px;
        height: 250px;
        max-height: 250px;
        background-image: url("https://placeit.net/uploads/stage/stage_image/4475/default_ac2915d90aa42e8694f4277b355ffc52.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-color: #cccccc;
    }
</style>