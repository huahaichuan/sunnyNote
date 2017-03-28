/**
 * Created by huaha on 2017/2/8.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types.js';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        activeRoute: 'movie'
    },
    getters: {
        theme(state){
        	var mapTheme = {
        		"movie": 'blue',
        		'movie-detail': 'blue',
        		"music": 'teal',
        		"joke": 'brown',
        		'photo': 'indigo'
        	}
        	return mapTheme[state.activeRoute]
        }
    },
    mutations:{
        [types.ROUTE_CHANGE](state,payload){
            state.activeRoute = payload.activeRoute
        }
    }
});

export default store;            //export default 仅有一个