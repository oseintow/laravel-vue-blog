
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

// window.Vue = require('vue');
import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'iview/dist/styles/iview.css'
import Notifications from 'vue-notification'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate';
import VueRx from 'vue-rx'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import { faCoffee, faThumbsUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

import 'quill/dist/quill.snow.css'


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import router from '@/router'
import store from '@/store'

import GlobalProperties from '@/plugins/GlobalProperties'
import eventBus from '@/plugins/event-bus'
import flash from '@/plugins/flash'
import Authentication from '@/plugins/authentication'
import Authorization from '@/plugins/authorization'
require('promise.prototype.finally').shim()
import Error from '@/components/Error'
import Search from '@/components/Search'

Vue.use(Notifications)
Vue.use(VeeValidate);
Vue.use(VueRx)
Vue.use(BootstrapVue);
Vue.use(GlobalProperties)
Vue.use(eventBus)
Vue.use(flash)
Vue.use(Authentication)
Vue.use(Authorization)
library.add(faCoffee, faThumbsUp, faCaretDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

Vue.component('App', require('./pages/App.vue').default)
Vue.component('error', Error)
Vue.component('search', Search)

router. beforeEach((to, from, next) => {
    if(to.matched.some((record) => record.meta.requiresAuth)){
        if(!store.state.auth.isAuthenticated){
            next({path: '/'})
        }else{
            next()
        }
    }else{
        next()
    }
})

const app = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>'
});
