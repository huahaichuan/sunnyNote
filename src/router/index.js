/**
 * Created by huaha on 2017/2/8.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const router = new VueRouter({
    base:'/sunnyNote/',
    routes:[
        {
            name:'home',
            path:'/home',
            component: require('../views/home/home.vue'),
            children:[
                {
                    name:'music',
                    path:'/music',
                    component:require('../components/music/music.vue')
                }
            ]
        },
        {path:'*',redirect:'./home'}
    ]
});
export default router;

