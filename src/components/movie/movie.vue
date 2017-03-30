<template>
    <div id="movie">
        <md-tabs md-fixed>
            <md-tab md-label="正在热映">
                <hot-movie v-on:spinner-change="spinnerChange" v-on:snackbar-change="snackChange"></hot-movie>
            </md-tab>

            <md-tab md-label="即将上映">
                <comming-movie v-on:spinner-change="spinnerChange" v-on:snackbar-change="snackChange"></comming-movie>
            </md-tab>

            <md-tab md-label="Top250">
                <top-movie v-on:spinner-change="spinnerChange" v-on:snackbar-change="snackChange"></top-movie>
            </md-tab>
        </md-tabs>
        <md-spinner md-indeterminate v-show='spinnerFlag'></md-spinner>
        <md-snackbar :md-position="'top center'" ref="snackbar" :md-duration="3000">
            <span>{{snackContent}}</span>
        </md-snackbar>
    </div>
</template>

<script>
    import hotMovie from "./hot_movie.vue";
    import commingMovie from "./comming_movie.vue";
    import topMovie from  "./top_movie.vue"
    export default{
        data(){
            return {
                spinnerFlag:true,
                snackContent:'网络异常，稍后再试.'
            }
        },
        methods: {
            spinnerChange:function (spinnerFlag) {
                this.spinnerFlag=spinnerFlag;
            },
            snackChange:function(snackContent){
                console.log(snackContent);
                var el =document.querySelector('.md-snackbar-content');
                if(el){return;}
                this.snackContent = snackContent;
                this.$refs.snackbar.open();
            }
        },
        components: {
            hotMovie,
            commingMovie,
            topMovie
        },
        computed: {},
        mounted: function () {}
    }
</script>

<style lang="less">
    #movie{
        min-height: 100vh;
        box-sizing: border-box;
        padding: 64px 0;
        text-align: center;
        .md-tabs-navigation{
            position: fixed;
            width:100%;
            top: 64px;
            left:0;
        }
        .md-avatar{
            height:60px;
            width: 60px;
        }
    }
</style>