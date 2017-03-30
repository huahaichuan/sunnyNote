<template>
    <div id="music">
        <audio :src='src' ref="audio"></audio>
        <md-input-container>
            <label><md-icon>search</md-icon>搜索</label>
            <md-input  @keyup.native.enter="search"></md-input>
        </md-input-container>
        <md-button class="md-raised md-primary random" @click="randomListen">
            <md-icon>library_music</md-icon>随便听听
        </md-button>
        <md-list>
            <md-list-item v-for="(music,index) of musicList" @click="togglePlay(music)">
                <md-avatar>
                    <img :src="music.album.picUrl">
                </md-avatar>
                <p class="music-name">{{music.name}}/{{music.artists[0].name}}</p>
                <md-button class="md-icon-button md-list-action">
                    <md-icon class="md-primary md-theme-teal">{{music.isPlay?'pause_circle_outline':'play_circle_outline'}}</md-icon>
                </md-button>
            </md-list-item>
        </md-list>

        <md-snackbar :md-position="'top center'" ref="snackbar" :md-duration="3000">
            <span>{{snackContent}}</span>
        </md-snackbar>

        <md-spinner md-indeterminate v-show='spinnerFlag'></md-spinner>
    </div>
</template>

<script>
    import axios from "axios";
    export default{
        data(){
            return{
                musicList:[],
                src:'',
                snackContent:'网络异常，稍后再试.',
                playListId:600188621,
                spinnerFlag:true
            }
        },
        methods:{
            openSnack(){
                this.$refs.snackbar.open();
            },
            togglePlay(music){
                if(music.isPlay){
                    music.isPlay=false;
                    this.$refs.audio.pause();
                    return;
                }
                this.src=music.mp3Url?music.mp3Url:music.audio;
                this.musicList.forEach(function (el) {
                    el.isPlay=false;
                });
                music.isPlay=true;
                var me = this;
                setTimeout(function(){
                    me.$refs.audio.play().catch(function(e){
                        me.snackContent="资源地址失效,请重新选择."
                        me.openSnack();
                        music.isPlay=true;
                    });
                },50);
            },
            randomListen(){
                this.playListId=parseInt(Math.random()*10*(60030000-20000000)+20000000);
                this.spinnerFlag=true;          //显示spinner
                this.getMusicList();
            },
            getMusicList(){
                var me = this;
                axios.get(API_PROXY+'/v1/?url=http://music.163.com/api/playlist/detail?id='+me.playListId).then(function(res){
                    me.spinnerFlag=false;    //隐藏spinner
                    if(res.status==200){
                        me.musicList=[];
                        if(!res.data.result.tracks.length){
                            me.randomListen();
                        }
                        res.data.result.tracks.forEach(function(item){
                            item.isPlay=false;
                            me.musicList.push(item);
                        });
                    }else{
                        this.snackContent="网络异常,刷新重试"
                        me.openSnack();
                    }
                }).catch(function(error){
                    me.spinnerFlag=false;    //隐藏spinner
                    console.log(error);
                    me.randomListen();
                });
            },
            search(e){
                var me = this;
                if(me.spinnerFlag){return;}
                me.spinnerFlag=true;          //显示spinner
                axios.get(API_PROXY+'/v1/?url=http://s.music.163.com/search/get?type=1&s='+e.target.value).then(function(res){
                    me.spinnerFlag=false;    //隐藏spinner
                    if(res.status==200){
                        me.musicList=[];
                        res.data.result.songs.forEach(function(item){
                            item.isPlay=false;
                            me.musicList.push(item);
                        });
                    }else{
                        this.snackContent="网络异常,刷新重试"
                        me.openSnack();
                    }
                }).catch(function(error){
                    me.spinnerFlag=false;    //隐藏spinner
                    console.log(error);
                });
            }
        },
        components:{

        },
        computed:{

        },
        mounted:function(){
            this.getMusicList();
        }
    }
</script>

<style lang="less">
    #music{
        min-height: 100vh;
        box-sizing: border-box;
        padding: 64px 0;
        text-align: center;
    }
    .md-input-container{
        margin: 0;
        top: -5px;
        label{
            left: 16px;
            top:20px;
        }
        input{
            padding-left: 55px;
        }
    }
    .random{
        -webkit-transform:rotate(-7deg);
        position: fixed;
        top: 100px;
        right: 0px;
        z-index: 2;
    }
    .md-list-item:nth-child(odd){
        background: #f8f8f8;
    }
    .music-name{
        white-space: nowrap; overflow: hidden;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis;
    }

</style>