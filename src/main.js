/**
 * Created by huaha on 2017/2/8.
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import VueMaterial  from 'vue-material';

/*全局常量*/
global.API_PROXY = 'https://bird.ioliu.cn/v1/?url=';
//注册主题
Vue.use(VueMaterial);
Vue.material.registerTheme('default', {
    primary: 'blue',
    accent: 'red',
    warn: 'red',
    background: 'white'
});

Vue.material.registerTheme('blue', {
    primary: 'blue',
    accent: 'red',
    warn: 'red',
    background: 'white'
});

Vue.material.registerTheme('teal', {
    primary: 'teal',
    accent: 'red',
    warn: 'red',
    background: 'white'
});


new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
});