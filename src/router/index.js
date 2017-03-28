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
                    name:'movie',
                    path:'/movie',
                    component:require('../components/movie/movie.vue')
                },
                {
                    name:'music',
                    path:'/music',
                    component:require('../components/music/music.vue')
                },
                {
                    name:'photo',
                    path:'/photo',
                    component:require('../components/photo/photo.vue')
                },
                {
                    name:'joke',
                    path:'/joke',
                    component:require('../components/joke/joke.vue')
                }
            ]
        },
        {path:'*',redirect:'./movie'}
    ]
});
export default router;

