<template>
    <div>
        <div class="row justify-content-md-center comments">
            <div class="col-md-8">
                <comments :new-comments="comments" :enableInfiniteLoading="false" :slug="slug" v-if="slug"></comments>
            </div>
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
        created() {
            this.$eventBus.$on('new-comment', (value) => {
                this.comments.unshift(value)
            })
        }
    }
</script>

<style scoped>

</style>