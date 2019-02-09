<template>
    <div>
        <div>
            <blog-reader :blog="blog" v-if="blog"></blog-reader>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import BlogReader from '@/components/blog/BlogReader'


    export default {
        name: "BlogView",
        components:{
            BlogReader
        },
        data() {
            return {
                blog: '',
                params: {
                    nickname: this.$route.params.nickname,
                    blog: this.$route.params.blog
                }
            }
        },
        methods: {
            ...mapActions('blog', ['getBlog'])
        },
        created() {
            this.getBlog(this.params)
                .then((response) => {
                    this.blog = response.blog
                })
        }
    }
</script>

<style>
</style>