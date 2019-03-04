import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home.vue'
import NewBlogView from '@/pages/NewBlogView'
import BlogView from '@/pages/BlogView'
import EditBlogView from '@/pages/EditBlogView'
import UserBlogsView from '@/pages/UserBlogsView'
import Header from '@/components/menu/Header'
import ResetPasswordView from '@/pages/ResetPasswordView'
import SendResetPasswordLinkView from '@/pages/SendResetPasswordLinkView'
import EditProfileView from '@/pages/EditProfileView'
import store from "@/store";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '',
            name: 'home',
            components: {
                default: Home,
                header: Header
            }
        },
        {
            path: '/blog/new',
            name: 'new-blog',
            components: {
                default: NewBlogView,
                header: Header
            },
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/blog/:slug/edit',
            name: 'edit-user-blog',
            components: {
                default: EditBlogView,
                header: Header
            },
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/@:nickname',
            name: 'users-blogs',
            components: {
                default: UserBlogsView,
                header: Header
            }
        },
        {
            path: '/profile/edit',
            name: 'edit-profile',
            components: {
                default: EditProfileView,
                header: Header
            },
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/@:nickname/:slug',
            name: 'user-blog',
            components: {
                default: BlogView,
                header: Header
            }
        },
        {
            path: '/password/reset',
            name: 'send-reset-password-link',
            components: {
                default: SendResetPasswordLinkView,
                header: Header
            }
        },
        {
            path: '/password/reset/:token',
            name: 'reset-password-token',
            components: {
                default: ResetPasswordView,
                header: Header
            }
        },
        {
            path: '/auth/:provide/callback',
            component: {
                template: '<div class="auth-component"></div>',
            }
        },
    ],
    mode: 'history',
    scrollBehavior(to, from, savePosition){
        if(savePosition){
            return savePosition;
        }

        if(to.hash){
            return {selector: to.hash};
        }

        return { x:0 , y: 0};
    },
})