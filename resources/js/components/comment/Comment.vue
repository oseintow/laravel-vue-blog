<template>
    <div>
        <div class="card">
            <div class="card-body">
                <div class="d-flex flex-row">
                    <div class="">
                        <avatar :image="owner.avatar"></avatar>
                    </div>
                    <div class="blog-info ml-2">
                        <p class="author-name">{{owner.name}}</p>
                        <p class="created_at">{{ago}}</p>
                    </div>
                </div>
                <div class="row mt-4 ml-2">
                    {{body}}
                </div>
                <div class="row mt-4 ml-2">
                    <favourite :favourite="comment" v-if="comment"></favourite>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import Quill from 'quill'
    import Favourite from '@/components/Favourite'
    import Avatar from '@/components/Avatar'

    export default {
        name: "Comment",
        props: ['data'],
        components: {
            Favourite,
            Avatar
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
        }
    }
</script>

<style scoped>

    .author-name {
        font-size: 13px;
    }

    .blog-link {
        color: #515a6e !important;
    }

</style>