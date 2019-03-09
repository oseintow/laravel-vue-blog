<template>
    <div>
        <div class="card">
            <div class="card-body">
                <div v-if="edit==false">
                    <div class="d-flex flex-row">
                        <div class="">
                            <avatar :image="owner.avatar"></avatar>
                        </div>
                        <div class="blog-info ml-2">
                            <p class="author-name">{{owner.name}}</p>
                            <p class="created_at">{{ago}}</p>
                        </div>
                        <button @click="editComment">Edit</button>
                        <button @click="deleteComment">Delete</button>
                    </div>
                    <div class="row mt-4 ml-2">
                        {{body}}
                    </div>
                    <div class="row mt-4 ml-2">
                        <favourite :favourite="comment" v-if="comment"></favourite>
                    </div>
                </div>
                <div v-if="edit==true">
                    <edit-comment
                            :blogSlug="slug"
                            :comment="comment"
                            @updated="updatedComment"
                            @cancelled="cancelledComment"
                    ></edit-comment>
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
    import EditComment from '@/components/comment/EditComment'

    export default {
        name: "Comment",
        props: ['data', 'blogSlug'],
        components: {
            Favourite,
            Avatar,
            EditComment
        },
        data() {
          return {
              comment: this.data,
              owner: this.data.owner,
              slug: this.blogSlug,
              edit: false
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
            editComment() {
                this.edit = true;
            },
            updatedComment(body) {
                this.comment.body = body
                this.edit = false;
            },
            cancelledComment() {
                this.edit = false;
            },
            deleteComment() {
                this.$store.dispatch('comment/deleteComment', {slug: this.slug, id: this.comment.id})
                    .then(() => {
                        this.$flash.success({title: 'Delete Comment', text: 'Comment deleted successfully'})
                    })
                    .catch((error) => {
                        this.$flash.error({title: 'Delete Comment', text: 'Comment deleted successfully'})
                    })
            }
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