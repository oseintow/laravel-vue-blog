<template>
    <div>
        <img :src="image" class="avatar avatar-image"
             :style="{ width: width + 'px', height: height + 'px' }"
        >
    </div>
</template>

<script>
    export default {
        name: "Avatar",
        props:  {
            image: String,
            width: {
                type: Number,
                default: 50
            },
            height: {
                type: Number,
                default: 50
            },
        },
    }
</script>

<style scoped>
    .avatar-image {
        background-image: url("https://cdn-images-1.medium.com/fit/c/64/64/0*6UYZ5LeYzOr24--U.");
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 100%
    }
</style>