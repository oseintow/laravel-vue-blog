<template>
    <div>
        <editor @delta="delta"></editor>
        <div class="row justify-content-md-end mr-0 mt-2">
            <button class="btn btn-primary" @click="save">submit</button>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import Editor from '@/components/blog/Editor'

    export default {
        name: "CommentEditor",
        props: ['slug'],
        components: {
            Editor
        },
        data() {
          return {
              body: ''
          }
        },
        methods: {
            ...mapActions({
                saveComment: 'comment/saveComment'
            }),
            delta(value) {
                this.body = value.getContents()
            },
            save(){
                this.saveComment({ slug: this.slug, body: this.body })
                    .then((response) =>{
                        this.$eventBus.newComment(response.comment)
                    })
                    .catch((error) => console.log(error));
            }
        }
    }
</script>

<style scoped>

</style>