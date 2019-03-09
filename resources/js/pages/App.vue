<template>
    <div>
        <notifications group="app" />
        <router-view name="header"></router-view>
        <div class="container mt-4">
            <router-view></router-view>
        </div>
        <router-view name="footer"></router-view>
        <sign-in></sign-in>
        <sign-up></sign-up>
    </div>
</template>

<script>
    import SignIn from '@/components/SignIn'
    import SignUp from '@/components/SignUp'

    export default {
        name: "App",
        components:{
            SignIn,
            SignUp
        }
    }
</script>

<style scoped>
    .mt-4 {
        margin-top: 50px !important;
    }
</style>