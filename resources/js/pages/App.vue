<template>
    <div>
        <router-view name="header"></router-view>
        <div class="container">
            <router-view></router-view>
        </div>
        <router-view name="footer"></router-view>
    </div>
</template>

<script>
    export default {
        name: "App"
    }
</script>

<style scoped>

</style>