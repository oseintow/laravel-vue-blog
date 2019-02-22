<template>
    <div>
        <div class="row mb-4">
            <div class="col-md-9">
                <div class="col-md-12">{{blog.category.name.toUpperCase()}}</div>
                <a @click.preventDefault="gotoUserBlog" style="color: black" >
                    <div class="col-md-12 mt-1">
                        <h4>{{ blog.title }}</h4>
                    </div>
                    <div class="col-md-12 mt-2">
                        <p>{{ body }}</p>
                    </div>
                </a>
                <div class="col-md-12 mt-3">
                    <a @click.preventDefault="gotoUsersBlogs">
                        <p style="font-weight: bold; color: #515a6e">{{ blog.author.name }}</p>
                    </a>
                    <p>{{ ago }}</p>
                </div>
            </div>
            <div class="col-md-3">
                <a @click.preventDefault="gotoUserBlog" style="color: black">
                    <img :src="blog.cover_image_url" alt="" class="cover_image_url float-right">
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import Quill from 'quill'
    import moment from 'moment';

    export default {
        name: "Blog",
        props: ['data'],
        data() {
            return {
                blog: this.data,
            }
        },
        methods: {
            gotoUsersBlogs() {
                this.$router.push({
                    name: 'users-blogs',
                    params: { nickname: this.blog.author.nickname }
                })
            },
            gotoUserBlog() {
                this.$router.push({
                    name: 'user-blog',
                    params:{
                        nickname: this.blog.author.nickname,
                        slug: this.blog.slug }
                })
            }
        },
        computed: {
            ago() {
                return moment(this.blog.created_at).fromNow() + '...';
            },
            body() {
                const article = document.createElement('article')
                let quill = new Quill(article, {})

                quill.setContents(this.blog.body)
                const body = quill.getText()

                return body.length > 200 ? body.substring(0,200) + '...' : body
            }
        }
    }
</script>

<style scoped>
    .cover_image_url {
        max-height: 150px;
        min-height: 150px;
        max-width: 150px;
        min-width: 150px;
    }
</style>