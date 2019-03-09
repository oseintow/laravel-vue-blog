<template>
    <div>
        <editor @delta="delta"></editor>
        <div class="row justify-content-md-end mr-0 mt-2">
            <button class="btn btn-primary mr-2" @click="update">Update</button>
            <button class="btn btn-danger" @click="cancel">Cancel</button>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import Editor from '@/components/blog/Editor'

    export default {
        name: "EditComment",
        props: {
            blogSlug: {
                type: String,
                required: true,
            },
            comment: {
                type: Object,
                required: true
            }
        },
        components: {
            Editor
        },
        data() {
            return {
                id: this.comment.id,
                body: this.comment.body,
                slug: this.blogSlug,
            }
        },
        methods: {
            ...mapActions({
                updateComment: 'comment/updateComment'
            }),
            delta(value) {
                if(value === '') {
                    return this.body = ''
                }

                this.body = value.getContents()
            },
            update(){
                this.updateComment({ id: this.id, slug: this.slug, body: this.body })
                    .then((response) =>{
                        this.$flash.success({title: 'Update Comment', text: 'Comment udpated successfully'})
                        this.$emit('updated', response.comment.body)
                    })
                    .catch((error) => {
                        this.$flash.error({title: 'Update Comment', text: 'Error occured udpating comment'})
                    });
            },
            cancel() {
                this.$emit('cancelled')
            }
        }
    }
</script>

<style scoped>

</style>