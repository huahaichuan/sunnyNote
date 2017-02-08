/**
 * Created by huaha on 2017/2/8.
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import VueMaterial  from 'vue-material';
import VueTouch from 'vue-touch';

new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
});