<template>
    <div id="photo">
        <md-card v-for="el in photoList">
            <md-card-media>
                <img :src="el.hp_img_url">
            </md-card-media>

            <md-card-header>
                <div class="md-title">{{el.hp_author}}</div>
                <div class="md-subhead">{{el.maketime.substr(0,10)}}</div>
            </md-card-header>

            <md-card-expand>
                <md-card-actions>
                    <md-button class="md-icon-button" md-expand-trigger>
                        <md-icon>keyboard_arrow_down</md-icon>
                    </md-button>
                </md-card-actions>

                <md-card-content>
                    {{el.hp_content}}
                </md-card-content>
            </md-card-expand>

        </md-card>
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
            return {
                photoList:[],
                snackContent:'网络异常，稍后再试.',
                spinnerFlag:true
            }
        },
        methods: {
            getDateStr(){
                var date = new Date();
                var month = date.getMonth()+1;
                month=month<10?('0'+month):month;
                return date.getFullYear()+'-'+month;
            },
            getPhotoList(){
                var dateStr = this.getDateStr();
                var me = this;
                axios.get('http://v3.wufazhuce.com:8000/api/hp/bymonth/'+dateStr).then(function(res){
                    me.spinnerFlag=false;    //隐藏spinner
                    if(res.status==200){
                        console.log(res.data);
                        me.photoList= res.data.data;
                    }else{
                        this.snackContent="网络异常,刷新重试";
                        me.openSnack();
                    }
                }).catch(function(error){
                    console.log(error);
                });
            }
        },
        components: {},
        computed: {},
        mounted: function () {
            this.getPhotoList();
        }
    }
</script>

<style lang="less">
    #photo{
        min-height: 100vh;
        box-sizing: border-box;
        padding: 64px 0;
        text-align: center;
        .md-card{
            width: 95%;
            .md-card-content{
                text-align: start;
            }
        }

    }
</style>