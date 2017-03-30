<template>
    <div id="moveDetail">
        <md-card>
            <md-card-media>
                <img :src="el.hp_img_url">
            </md-card-media>

            <md-card-header>
                <div class="md-title">{{el.hp_author}}</div>
                <div class="md-subhead">{{el.maketime.substr(0,10)}}</div>
            </md-card-header>

            <md-card-content>
                {{el.hp_content}}
            </md-card-content>

        </md-card>
        <md-snackbar :md-position="'top center'" ref="snackbar" :md-duration="3000">
            <span>{{snackContent}}</span>
        </md-snackbar>
    </div>
</template>

<script>
    import axios from 'axios'
    export default{
        data()
    {
        return {
            movie:{}
        }
    }
    ,
    methods:{
        getMovieDetail(movieId){
            var me = this;
            axios.get(API_PROXY+'/v1/?url=https://api.douban.com/v2/movie/subject/'+movieId).then(function(res){
                if(res.status==200){
                    me.photoList= res.data.data;
                }else{
                    this.snackContent="网络异常,刷新重试";
                    me.openSnack();
                }
            }).catch(function(error){
                me.snackContent="被豆瓣嫌弃了-_-|||";
                me.openSnack();
                console.log(error);
            });
        }
    }
    ,
    components:{

    }
    ,
    computed:{

    }
    ,
    mounted:function () {
        this.getMovieDetail();
    }
    }
</script>

<style lang="less">

</style>