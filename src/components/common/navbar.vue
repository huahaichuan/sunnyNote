<template>
    <div id="navbar">
        <md-theme :md-name="theme">
            <transition name="slideT">
                <md-toolbar class="top-nav">
                    <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
                        <md-icon>menu</md-icon>
                    </md-button>
                    <h2 class="md-title" style="flex: 1;margin-left: -40px" v-text="activeRoute"></h2>
                    <!--<md-button class="md-icon-button">-->
                        <!--<md-icon @click.native="logout"><i class="iconfont icon-logout"></i></md-icon>-->
                    <!--</md-button>-->
                </md-toolbar>
            </transition>

            <md-sidenav class="md-left" ref="leftSidenav">
                <md-toolbar class="md-large">
                    <p class="tips">
                        有时，外面下着雨,心却晴着；又有时，外面晴着,心却下着雨。欢迎来到心晴手札，愿你在此找到属于自己的心晴
                        <md-button class="md-icon-button message-btn">
                            <md-icon>favorite</md-icon>
                        </md-button>
                    </p>
                </md-toolbar>

                <p class="message-list">
                    <md-button class="md-icon-button message-btn">
                        <md-icon>face</md-icon>
                    </md-button>
                   huahaichuan
                </p>
                <p class="message-list">
                    <md-button class="md-icon-button message-btn">
                        <md-icon>mail_outline</md-icon>
                    </md-button>
                    649775996@qq.com
                </p>
            </md-sidenav>

            <transition name="slideD">
                <md-bottom-bar md-shift class="btm-nav">
                    <md-bottom-bar-item @click.native="doAction(0)" :class="{'md-active': getActive(0)}" md-icon="movie">电影</md-bottom-bar-item>
                    <md-bottom-bar-item @click.native="doAction(1)" :class="{'md-active': getActive(1)}" md-icon="music_note">音乐</md-bottom-bar-item>
                    <md-bottom-bar-item @click.native="doAction(2)" :class="{'md-active': getActive(2)}" md-icon="photo">图片</md-bottom-bar-item>
                    <md-bottom-bar-item @click.native="doAction(3)" :class="{'md-active': getActive(3)}" md-icon="mood">笑话</md-bottom-bar-item>
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
                switch(index) {
                    case 0:
                        this.$router.push({name:'movie'});
                        break;
                    case 1:
                        this.$router.push({name:'music'});
                        break;
                    case 2:
                        this.$router.push({name:'photo'});
                        break;
                    case 3:
                        this.$router.push({name:'joke'});
                        break;
                }
            },
            getActive: function(index){
                /*根据路由显示当前导航按钮*/
                var mapRoute = {
                    "movie": 0,
                    "music": 1,
                    'photo': 2,
                    "joke":  3
                }
                if(mapRoute[this.activeRoute]==index){
                    return true;
                }else {
                    return false;
                }
            },
            toggleLeftSidenav() {
                this.$refs.leftSidenav.toggle();
            },
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
    .message-list,.tips{
        text-align: left;
    }
    .tips{
        .md-button{
            height: 24px;
            min-height: 24px;
        }
    }
    .message-btn{
        vertical-align: middle;
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



