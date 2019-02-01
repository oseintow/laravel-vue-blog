const GlobalProperties = {
    install(Vue, options) {
        Vue.prototype.$settings = {
            enableComments: true
        }
        Vue.prototype.$texts = {
            comments: 'Comments',
            addComment: 'Add comment',
            noComments: 'No comments for this post',
            numberOfPosts: 'Number of posts'
        }
        Vue.prototype.$auth = {
            user: null,
            token: null,
            check: false
        },
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
