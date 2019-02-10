<template>
    <div>
        adfkaslfjsakj
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        name: "comments",
        props: ['slug'],
        data() {
            return {
                comments: ''
            }
        },
        methods: {
            ...mapActions({
                getComments: 'comment/getComments'
            }),
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