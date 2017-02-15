<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import home from './views/home/home.vue'
    export default {
        name: 'app',
        data (){
        return{
            msg: 'Hello world!'
        }
    },
    computed: {                     //计算属性，监听route变化
        activeRoute(){
            return this.$route.name
        }
    },
    watch:{
        activeRoute(){
            this.$store.commit('ROUTE_CHANGE',{activeRoute: this.activeRoute});
        }
    },
    mounted: function(){
        this.$store.commit('ROUTE_CHANGE',{activeRoute: this.activeRoute})
    },
    methods:{

    },
    components: {
        home
    }
    }
</script>

<style lang="less">
    #app {
        width: 100%;
        height: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
