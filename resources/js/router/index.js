import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home.vue'
import NewBlog from '../pages/NewBlog'
import BlogView from '../pages/BlogView'
import UserBlogsView from '../pages/UserBlogsView'
import Header from '@/components/menu/Header'
import ResetPasswordView from '@/pages/ResetPasswordView'
import SendResetPasswordLinkView from '@/pages/SendResetPasswordLinkView'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '', name: 'home',  components: {
                default: Home, header: Header
            },meta: {
                forVisitors: true
            }
        },
        { path: '/blog/new', name: 'new-blog',  components: {
                default: NewBlog, header: Header
            },meta: {
                forVisitors: true
            }
        },
        { path: '/@:nickname', name: 'users-blogs',  components: {
                default: UserBlogsView, header: Header
            },meta: {
                forVisitors: true
            }
        },
        { path: '/@:nickname/:slug', name: 'user-blog',  components: {
                default: BlogView, header: Header
            },meta: {
                forVisitors: true
            }
        },
        { path: '/password/reset', name: 'reset-password',  components: {
                default: SendResetPasswordLinkView, header: Header
            },meta: {
                forVisitors: true
            }
        },
        { path: '/password/reset/:token', name: 'reset-password-token',  components: {
                default: ResetPasswordView, header: Header
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