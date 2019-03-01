<template>
    <span class="error err-text">
        <slot></slot>
    </span>
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