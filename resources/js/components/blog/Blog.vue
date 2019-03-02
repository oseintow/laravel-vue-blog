<template>
    <div>
        <div class="row mb-4">
            <div class="col-md-9">
                <div class="col-md-12" id="category">{{blog.category.name.toUpperCase()}}</div>
                <a @click.preventDefault="gotoUserBlog" style="color: black" >
                    <div class="col-md-12 mt-1">
                        <h4 id="title">{{ blog.title }}</h4>
                    </div>
                    <div class="col-md-12 mt-2">
                        <p id="body">{{ body }}</p>
                    </div>
                </a>
                <div class="col-md-12 mt-3">
                    <a class="users-blogs" @click.preventDefault="gotoUsersBlogs">
                        <p id="author" style="font-weight: bold; color: #515a6e">{{ blog.author.name }}</p>
                    </a>
                    <p class="age">{{ ago }}</p>
                </div>
            </div>
            <div class="col-md-3">
                <a class="user-blog" @click.preventDefault="gotoUserBlog" style="color: black">
                    <img :src="blog.cover_image_url" alt="" class="cover_image_url float-right">
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import BlogMixin from '@/mixins/BlogMixin'

    export default {
        name: "Blog",
        props: ['data'],
        mixins: [BlogMixin],
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