<template>
    <div class="err-text">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Error"
    }
</script>

<style scoped>
    .err-text {
        color: red
    }
</style>