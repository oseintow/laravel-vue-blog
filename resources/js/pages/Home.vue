<template>
    <div>
        Hello am in home
        <div>{{ getBlogs }}</div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "Home",
        data() {
            return {
                blogs: {}
            }
        },
        computed: {
            ...mapGetters('blog', ['getBlogs'])
        },
        mounted() {
            this.$store.dispatch('blog/blogs', {name: 'shopify'}).catch(error => {
                console.error(error)
            })
        }
    }
</script>

<style scoped>

</style>