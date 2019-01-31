import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home.vue'
import SignIn from '../pages/SignIn'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '', name: 'home',  components: {
                default: Home,
            },meta: {
                forVisitors: true
            }
        },
        { path: '/signin', name: 'signin',  components: {
                default: SignIn,
            },meta: {
                forVisitors: true
            }
        },
        {
            path: '/auth/:provide/callback',
            component: {
                template: '<div class="auth-component"></div>',
                mounted() {
                    console.log("mounted")
                }
            }
        },
    ]
})