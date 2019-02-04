<template>
    <div class="d-flex flex-md-row align-items-center p-3 px-md-4 mb-1 bg-white border-bottom shadow-sm">
        <div class="container">
            <nav class="my-2 my-md-0 mr-md-3 nav">
                <h5 class="my-0 mr-md-auto font-weight-normal nav">Company name</h5>
                <div class="nav  justify-content-end">
                    <a class="p-2 text-dark" href="#">Features</a>
                    <a class="p-2 text-dark" href="#">Enterprise</a>
                    <a class="p-2 text-dark" href="#">Support</a>
                    <a class="p-2 text-dark" href="#">Pricing</a>
                </div>
                <router-link to="signin" class="btn btn-outline-primary justify-content-end">SignIn</router-link>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TopicsMenu"
    }
</script>

<style scoped>

</style>