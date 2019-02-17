const GlobalProperties = {
    install(Vue, options) {
        Vue.prototype.$settings = {
            enableComments: true
        }
        Vue.prototype.$social_account_providers = {
            facebook: {
                clientId: '245842109488508',
                redirectUri: 'http://localhost:8000/auth/facebook/callback' // Your client app URL
            },

            google: {
                clientId: '340639301402-0u9qst24dn4va778opjhq3o3hcpv6ona.apps.googleusercontent.com',
                redirectUri: 'http://localhost:8000/auth/google/callback' // Your client app URL
            }
        }
    }
}

export default GlobalProperties
