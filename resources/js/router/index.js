import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home.vue'
import NewBlog from '../pages/NewBlog'
import BlogView from '../pages/BlogView'
import UserBlogsView from '../pages/UserBlogsView'
import TopicsMenu from '@/components/menu/TopicsMenu'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '', name: 'home',  components: {
                default: Home, header: TopicsMenu
            },meta: {
                forVisitors: true
            }
        },
        { path: '/blog/new', name: 'new-blog',  components: {
                default: NewBlog,
            },meta: {
                forVisitors: true
            }
        },
        { path: '/@:nickname/:slug', name: 'user-blog',  components: {
                default: BlogView,
            },meta: {
                forVisitors: true
            }
        },
        { path: '/@:nickname', name: 'users-blogs',  components: {
                default: UserBlogsView,
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