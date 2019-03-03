<template>
    <div>
        <div v-if="isComment">
            <h4 class="mb-3">New Comments</h4>
            <comments :new-comments="comments" :enableInfiniteLoading="false" :slug="slug" v-if="slug"></comments>
            <hr class="mt-3 mb-3"/>
        </div>
    </div>
</template>

<script>
    import Comments from "@/components/comment/Comments"

    export default {
        name: "GetNewComments",
        props: ['slug'],
        components: {
            Comments,
        },
        data() {
            return {
                comments: [],
            }
        },
        computed: {
            isComment() {
                return this.comments.length > 0
            }
        },
        created() {
            this.$eventBus.$on('new-comment', (value) => {
                this.comments.unshift(value)
            })
        }
    }
</script>

<style scoped>

</style>