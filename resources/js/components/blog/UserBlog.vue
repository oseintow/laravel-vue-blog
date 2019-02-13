<template>
    <div>
        <div class="row shadow p-4 mb-4 bg-white rounded">
            <div class="col-md-12">
                <div class="row">
                    <div class="d-flex flex-row">
                        <div class="mr-2">
                            <img :src="blog.author.avatar" class="avatar avatar-image avatar-image--icon" alt="">
                        </div>
                        <div class="blog-info">
                            <router-link class="blog-link" :to="{name: 'users-blogs', params: { nickname: blog.author.nickname }}">
                                <p class="author-name">{{blog.author.name}}</p>
                            </router-link>
                            <p class="created_at">{{ago}}</p>
                        </div>
                    </div>
                </div>

                <div class="row p-4">
                    <router-link class="row" :to="{name: 'user-blog', params:{ nickname: blog.author.nickname, slug: blog.slug } }" style="color: black">
                        <img :src="blog.cover_image_url" alt="" class="cover_image_url">
                    </router-link>
                </div>

                <div class="row">{{blog.category.name.toUpperCase()}}</div>
                <router-link :to="{name: 'user-blog', params:{ nickname: blog.author.nickname, slug: blog.slug } }" style="color: black">
                    <div class="row mt-1">
                        <h4>{{ blog.title }}</h4>
                    </div>
                    <div class="row mt-2">
                        <p>{{ body }}</p>
                    </div>
                </router-link>
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
        max-height: 250px;
        min-height: 150px;
        width: 100%;
    }

    .avatar-image {
        background-image: url("https://cdn-images-1.medium.com/fit/c/64/64/0*6UYZ5LeYzOr24--U.");
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 100%
    }

    .avatar-image--icon {
        width: 50px;
        height: 50px;
    }

    .author-name {
        font-size: 13px;
    }

    .blog-link {
        color: #515a6e !important;
    }
</style>