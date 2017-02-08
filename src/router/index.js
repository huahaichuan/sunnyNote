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

        },
        {path:'*',redirect:'./homo'}
    ]
});
export default router;

