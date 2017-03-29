<template>
    <div id="topMovie">
        <md-list>
            <md-list-item v-for="(movie,index) of movieList">
                <md-avatar>
                    <img :src="movie.images.small">
                    <span>{{movie.title}}</span>
                </md-avatar>
                <div class="md-list-text-container">
                    <span>{{movie.title}}</span>
                    <span>{{movie.genres.join('/')}}({{movie.year}})</span>
                </div>
                <md-icon>
                    keyboard_arrow_right
                </md-icon>

            </md-list-item>
        </md-list>
        <md-snackbar :md-position="'top center'" ref="snackbar" :md-duration="3000">
            <span>{{snackContent}}</span>
        </md-snackbar>
    </div>
</template>

<script>
    import axios from "axios";
    export default{
        data(){
        return {
            movieList:[],
            snackContent:'网络异常，稍后再试.',
            more:true,
            getFlag:false
        }
    },
    methods: {
        spinnerToggle:function(spinnerFlag){
            this.$emit('spinner-change', spinnerFlag);
        },
        getStarList:function(stars){      //把星分数转化为数组
            var startList=[];
            for(var i=0;i<stars.split('')[0];i++){
                startList.push(1);
            }
            if(+stars.split('')[1]){
                startList.push(0.5);
            }
            return startList;
        },
        getMovieList(){
            var me = this;
            if(!me.more){return;}
            me.spinnerToggle(true);    //显示spinner
            axios.get(API_PROXY+'/v1/?url=https://api.douban.com/v2/movie/coming_soon?count=10&start='+me.movieList.length).then(function(res){
                me.spinnerToggle(false);    //隐藏spinner
                me.getFlag = false;
                if(res.status==200){
                    res.data.subjects.forEach(function (item) {
                        me.movieList.push(item);
                    });
                    if(res.data.subjects.length<10){     //没有多余的数据了
                        me.more=false;
                    }
                }else{
                    this.snackContent="网络异常,刷新重试";
                    me.openSnack();
                }
            }).catch(function(error){
                me.spinnerToggle(false);    //隐藏spinner
                me.getFlag = false;
                console.log(error);
            });
        }
    },
    components: {},
    computed: {},
    mounted: function () {
        this.getMovieList();
        this.spinnerToggle(true);    //显示spinner
        var me = this;
        window.addEventListener('scroll',function (e) {
            if(me.getFlag){return;}
            if (document.body.scrollTop >= (document.body.scrollHeight - document.body.offsetHeight)) {
                me.getMovieList();
            }
        });
    }
    }
</script>

<style lang="less">
    #commingMovie{
        min-height: 70vh;
        padding-top: 48px;
    }
    .md-list-item{
        padding: 10px 0px;
    .md-star{
        color: orange;
    }
    }
    .md-list-item:nth-child(odd){
        background: #f8f8f8;
    }
</style>