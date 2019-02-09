<template>
    <div>
        <editor @delta="delta"></editor>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import Editor from '@/components/blog/Editor'

    export default {
        name: "comments",
        props: ['slug'],
        components: {
            Editor
        },
        data() {
            return {
                comments: ''
            }
        },
        methods: {
            ...mapActions({
                getComments: 'comment/getComments'
            }),
            delta() {

            }
        },
        created() {
            this.getComments({slug: this.slug})
                .then((response) => {
                    this.comments = response
                })
        }
    }
</script>

<style scoped>

</style>