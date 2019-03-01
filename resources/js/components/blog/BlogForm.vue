<template>
    <div>
        <form enctype="multipart/form-data" novalidate>
            <div class="post-inputs row mb-4">
                <div class="col-sm-3 flex-center">
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
                               v-validate="'required|min:3'"/>
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
                        <label for="publish">Publish Status:</label>
                        <select placeholder="Status" name="publish" class="form-control" v-validate="'required'"
                                v-model="blog.publish">
                            <option value="">-- select publish status --</option>
                            <option value="1">Publish</option>
                            <option value="0">Save as draft</option>
                        </select>
                        <error v-show="errors.has('publish')">{{ errors.first('publish') }}</error>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <editor @delta="delta" :body="blog.body"></editor>
                <input type="hidden" name="body" v-model="body" v-validate="'required|min:3'">
                <error v-show="errors.has('body')">{{ errors.first('body') }}</error>
            </div>

            <div class="row post-actions-row float-right mb-4">
                <button class="btn btn-primary" @click="saveBlog" v-if="formType=='new'">Save</button>
                <button class="btn btn-primary" @click="updateBlog" v-if="formType=='edit'">Update</button>
            </div>

            <div class="" ref="contentContainer"></div>
        </form>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import Editor from '@/components/blog/Editor'

    export default {
        name: "BlogForm",
        props: {
            type: {
                type: String,
                required: true
            },
            slug: String
        },
        components: {
            Editor,
        },
        data() {
            return {
                body: '',
                image_url: '',
                blog: {
                    title: '',
                    body: '',
                    category_id:'',
                    cover_image: '',
                    publish: '',
                },
                article: null,
                quill: null,
                formType: this.type
            }
        },
        computed: {
            ...mapGetters('category', ['categories'])
        },
        mounted() {
            this.$store.dispatch('category/getCategories')
        },
        created() {
            if (this.type == 'edit') {
                this.getBlog({slug: this.slug})
                    .then((response) => {
                        this.blog = response.blog
                        this.image_url = response.blog.cover_image_url
                    })
            }
        },
        methods: {
            ...mapActions({
                getBlog: 'blog/getBlog',
            }),
            delta(value) {
                if(value === '') {
                    return this.body = ''
                }
                this.body = value.getText()
                this.blog.body = value.getContents();
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
            prepareFormData() {
                const formData = new FormData();
                Object.keys(this.blog).forEach((key) => {
                    if(key === 'body') {
                        formData.append(key, JSON.stringify(this.blog[key]))
                    }else{
                        formData.append(key, this.blog[key])
                    }
                })

                return formData;
            },
            resetForm() {
                this.blog = {
                    title: '',
                    body: '',
                    category_id:'',
                    cover_image: '',
                };
                this.image_url = ''
                this.body = ''

                this.$nextTick(() => this.$validator.reset())
            },
            saveBlog(e) {
                e.preventDefault();
                this.$validator.validateAll()
                if (this.errors.any()) return;

                const formData = this.prepareFormData();

                this.$store.dispatch('blog/saveBlog', formData)
                    .then(() =>{
                        this.resetForm();
                    })

            },
            updateBlog(e){
                e.preventDefault();
                this.$validator.validateAll()
                if (this.errors.any()) return;

                this.blog._method = "PUT"
                const formData = this.prepareFormData();

                this.$store.dispatch('blog/updateBlog', {slug: this.slug, formData})
                    .then(() => {})
            }
        }
    }
</script>

<style scoped>

</style>