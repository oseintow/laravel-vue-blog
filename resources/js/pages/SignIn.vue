<template>
    <div>
        <button @click="authenticate('facebook')">Facebook</button>
        <button @click="authenticate('google')">Google</button>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueAxios from 'vue-axios'
    import VueAuthenticate from 'vue-authenticate'
    import axios from 'axios';

    Vue.use(VueAxios, axios)
    Vue.use(VueAuthenticate, {
        baseUrl: 'http://localhost:8000', // Your API domain

        providers: {
            facebook: {
                clientId: '245842109488508',
                redirectUri: 'http://localhost:8000/auth/facebook/callback' // Your client app URL
            },

            google: {
                clientId: '340639301402-0u9qst24dn4va778opjhq3o3hcpv6ona.apps.googleusercontent.com',
                redirectUri: 'http://localhost:8000/auth/google/callback' // Your client app URL
            }
        }
    })

    export default {
        name: "SignIn",
        methods: {
            authenticate(provider) {
                this.$auth.authenticate(provider).then((response) =>{
                    console.log(response);
                    // Execute application logic after successful social authentication
                }).catch(error => console.log("error occured"))
                // this.$store.dispatch('auth/login', provider)
                //     .catch(error => console.error(error))

            }
        }
    }
</script>

<style scoped>

</style>