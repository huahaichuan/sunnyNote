<template>
    <div id="navbar">
        <md-theme :md-name="theme">
            <transition name="slideT">
                <md-toolbar class="top-nav">
                    <!--<md-button class="md-icon-button">-->
                        <!--<md-icon><md-icon>home</md-icon></md-icon>-->
                    <!--</md-button>-->
                    <h2 class="md-title" style="flex: 1" v-text="activeRoute"></h2>
                    <!--<md-button class="md-icon-button">-->
                        <!--<md-icon @click.native="logout"><i class="iconfont icon-logout"></i></md-icon>-->
                    <!--</md-button>-->
                </md-toolbar>
            </transition>
            <transition name="slideD">
                <md-bottom-bar md-shift class="btm-nav">
                    <md-bottom-bar-item @click.native="doAction(0)" :class="{'md-active': getActive(0)}" md-icon="movie">电影</md-bottom-bar-item>
                    <md-bottom-bar-item @click.native="doAction(1)" :class="{'md-active': getActive(1)}" md-icon="music_note">音乐</md-bottom-bar-item>
                    <md-bottom-bar-item @click.native="doAction(2)" :class="{'md-active': getActive(2)}" md-icon="mood">笑话</md-bottom-bar-item>
                    <md-bottom-bar-item @click.native="doAction(3)" :class="{'md-active': getActive(3)}" md-icon="photo">图片</md-bottom-bar-item>
                </md-bottom-bar>
            </transition>

        </md-theme>
    </div>
</template>


<script>
    import Util from "../../util/util"
    export default {
        mounted: function(){
            var scrT = document.body.scrollTop || window.scrollY;
            window.addEventListener("scroll",Util.debounce(function(){
                var newScrT = document.body.scrollTop || window.scrollY;
                if(newScrT > 80 && newScrT > scrT)
                    this.isScrollDown = true;
                if(newScrT < scrT)
                    this.isScrollDown = false;
                scrT = newScrT;
            },300).bind(this));

        },
        data() {
            return {
                isScrollDown: false,
            }
        },
        computed: {
            theme(){
                return this.$store.getters.theme
            },
            activeRoute(){
                return this.$store.state.activeRoute;
            }
        },
        watch:{

        },
        methods: {
//            logout(){
//                AV.User.logOut();
//                this.$router.push({name:'login'});
//            },
            doAction(index) {
                this.go(index);
            },
            go(index){
                switch(index) {
                    case 0:
                        this.$router.push({name:'movie'});
                        break;
                    case 1:
                        this.$router.push({name:'music'});
                        break;
                    case 2:
                        this.$router.push({name:'book'});
                        break;
                    case 3:
                        this.$router.push({name:'photo'});
                        break;
                }
            },
            getActive: function(index){
                /*根据路由显示当前导航按钮*/
                var mapRoute = {
                    "movie": 0,
                    "music": 1,
                    "book":  2,
                    'photo': 3
                }
                if(mapRoute[this.activeRoute]==index){
                    return true;
                }else {
                    return false;
                }
            },
//            toggleLeftSidenav() {
//                this.$emit("toggleLeftSidenav");
//            },
        }
    }
</script>
<style lang="less">
    .top-nav{
        position: fixed;
        left:0;
        top:0;
        width:100%;
        z-index: 3;
        color:#fff;
    }
    .md-bottom-bar{
        position: fixed;
        bottom:0;
        left:0;
        z-index: 3
    }
    .slideT-enter-active, .slideT-leave-active {
        transition: all .5s
    }
    .slideT-enter, .slideT-leave-active {
        transform: translateY(-100%);
    }
    .slideD-enter-active, .slideD-leave-active {
        transition: all .5s
    }
    .slideD-enter, .slideD-leave-active {
        transform: translateY(100%);
    }

    .btm-nav-icon{
        display: block;
        margin-top: -26px;
    }
    .md-bottom-bar.md-shift .md-bottom-bar-item .md-text{
        opacity:1
    }
    .icon-logout{
        font-size: 24px;
    }
</style>



