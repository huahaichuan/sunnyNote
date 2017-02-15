<template>
    <div id="music">
        <audio :src='src' ref="audio"></audio>
        <md-list>
            <md-list-item v-for="(music,index) of musicList" @click="togglePlay(music)">
                <md-avatar>
                    <img :src="music.album.picUrl">
                </md-avatar>
                <p>{{music.name}}/{{music.duration}}</p>
                <md-button class="md-icon-button md-list-action">
                    <md-icon class="md-primary md-theme-teal">{{music.isPlay?'pause_circle_outline':'play_circle_outline'}}</md-icon>
                </md-button>
            </md-list-item>
        </md-list>

        <md-snackbar :md-position="'top center'" ref="snackbar" :md-duration="2000">
            <span>{{snackContent}}</span>
        </md-snackbar>
    </div>
</template>

<script>
    import axios from "axios";
    export default{
        data(){
            return{
                musicList:[],
                src:'',
                snackContent:'网络异常，稍后再试.'
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
                this.src=music.mp3Url;
                this.musicList.forEach(function (el) {
                    el.isPlay=false;
                });
                music.isPlay=true;

                setTimeout(function(){
                    this.$refs.audio.play().catch(function(e){
                        this.snackContent="资源地址失效,请重新选择."
                        this.openSnack();
                        music.isPlay=true;
                    }.bind(this));
                }.bind(this),0);
            }
        },
        components:{

        },
        computed:{

        },
        mounted:function(){
            var me = this;
            axios.get(API_PROXY+'http://music.163.com/api/playlist/detail?id=600188621').then(function(res){
                if(res.status==200){
                    res.data.result.tracks.forEach(function(item){
                        item.isPlay=false;
                        me.musicList.push(item);
                    });
                }else{
                    this.snackContent="网络异常"
                    me.openSnack();
                }
            }).catch(function(error){
                console.log(error);
            });
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
</style>