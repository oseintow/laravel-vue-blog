<template>
    <div>
        <div class="card">
            <div class="card-body">
                <div class="d-flex flex-row">
                    <div class="">
                        <img :src="owner.avatar" class="avatar avatar-image avatar-image--icon" alt="">
                    </div>
                    <div class="blog-info ml-2">
                        <p class="author-name">{{owner.name}}</p>
                        <p class="created_at">{{ago}}</p>
                    </div>
                </div>
                <div class="row mt-4 ml-2">
                    {{comment.body}}
                </div>
                <div class="row mt-4 ml-2">
                    <favourite @favourited="favourited"></favourite>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import Favourite from '@/components/Favourite'

    export default {
        name: "Comment",
        props: ['data'],
        components: {
            Favourite
        },
        data() {
          return {
              comment: this.data,
              owner: this.data.owner
          }
        },
        computed: {
            ago() {
                return moment(this.comment.created_at).fromNow() + '...';
            },
            body() {
                const article = document.createElement('article')
                let quill = new Quill(article, {})

                quill.setContents(this.comment.body)
                const body = quill.getText()

                return body.length > 200 ? body.substring(0,200) + '...' : body
            }
        },
        methods: {
            favourited(value) {
                this.$store.dispatch('comment/saveFavourite', )
            }
        }
    }
</script>

<style scoped>

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