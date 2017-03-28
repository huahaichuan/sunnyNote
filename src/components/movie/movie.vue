<template>
    <div id="movie">
        <md-tabs md-fixed>
            <md-tab md-label="正在热映">
                <hot-movie v-on:spinner-change="spinnerChange"></hot-movie>
            </md-tab>

            <md-tab md-label="即将上映">
                <comming-movie v-on:spinner-change="spinnerChange"></comming-movie>
            </md-tab>

            <md-tab md-label="Top250">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
            </md-tab>
        </md-tabs>
        <md-spinner md-indeterminate v-show='spinnerFlag'></md-spinner>
    </div>
</template>

<script>
    import hotMovie from "./hot_movie.vue";
    import commingMovie from "./comming_movie.vue";
    export default{
        data(){
            return {
                spinnerFlag:true
            }
        },
        methods: {
            spinnerChange:function (spinnerFlag) {
                this.spinnerFlag=spinnerFlag;
            }
        },
        components: {
            hotMovie,
            commingMovie
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