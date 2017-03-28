<template>
    <div id="joke">
        <md-list>
            <md-list-item v-for="(joke,index) of jokeList">
                <pre class="joke-content">{{joke.content}}</pre>
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
            return {
                jokeList:[],
                snackContent:'网络异常，稍后再试.',
                spinnerFlag:true
            }
        },
        methods: {
            openSnack(){
                this.$refs.snackbar.open();
            },
            getJokeList(){
                var me = this;
                axios.get(API_PROXY+'/joke/rand?type=text').then(function(res){
                    me.spinnerFlag=false;    //隐藏spinner
                    if(res.status==200){
                        res.data.data.forEach(function(item){
                            me.jokeList.push(item);
                        });
                    }else{
                        this.snackContent="网络异常,刷新重试";
                        me.openSnack();
                    }
                }).catch(function(error){
                    console.log(error);
                    me.getJokeList();
                });
            }
        },
        components: {},
        computed: {},
        mounted: function () {
            this.getJokeList();
            var me = this;
            window.addEventListener('scroll',function (e) {
                if(me.spinnerFlag){return;}
                if (document.body.scrollTop >= (document.body.scrollHeight - document.body.offsetHeight)) {
                    me.spinnerFlag=true;          //显示spinner
                    me.getJokeList();
                }
            });
        }
    }
</script>

<style lang="less">
    #joke{
        min-height: 100vh;
        box-sizing: border-box;
        padding: 64px 0;
        text-align: center;
        .md-list>.md-list-item:not(:last-child){
            border-bottom: 1px solid #e0e0e0;
        }
    }
    .joke-content{
        text-indent: 2em;
        padding: 10px 0;
        line-height:20px;
    }
</style>