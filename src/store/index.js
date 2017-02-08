/**
 * Created by huaha on 2017/2/8.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types.js';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        them:'',
        activeRoute: 'movie'
    },
    getters: {
    },
    mutations:{
        [types.THEME_CHANGE](state,payload){
            state.theme = payload.theme
        },
        [types.ROUTE_CHANGE](state,payload){
            state.activeRoute = payload.activeRoute
        },
        [types.LOGIN_CHANGE](state,payload){
            state.loginFlag = payload.loginFlag
        }
    }
});

export default store;            //export default 意思是只导一个