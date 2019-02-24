<template>
    <div>
        <h3>New Story</h3>
        <blog-form></blog-form>
    </div>
</template>

<script>
    import BlogForm from '@/components/blog/BlogForm'

    export default {
        name: "NewBlog",
        components: {
            BlogForm
        }
    }
</script>

<style>
    .inner-image-input{
        display: flex;
        align-items: center;
    }
    .flex-center{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .post-actions-row {
        display: flex;
        justify-content: space-between;
    }
    .ivu-icon-ios-camera-outline{
        font-size: 16px
    }
    .image-display{
        width: 270px;
        max-width: 270px;
        height: 250px;
        max-height: 250px;
        background-image: url("https://placeit.net/uploads/stage/stage_image/4475/default_ac2915d90aa42e8694f4277b355ffc52.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-color: #cccccc;
    }
</style>