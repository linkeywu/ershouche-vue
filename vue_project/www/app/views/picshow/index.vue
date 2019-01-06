<template>
    <div class="picshow">
        <div class="close" @click="changeShowPic">
            <Icon type="ios-close-circle" class="icon"/>
        </div>
        <div class="leftPart">
            <BigPic></BigPic>
        </div>
        <div class="rightPart">
            <ImgAlbum></ImgAlbum>
            <MoreCar></MoreCar>
            <SmallPic></SmallPic>
        </div>
    </div>
</template>
<script>
    import BigPic from "./BigPic.vue";
    import ImgAlbum from "./ImgAlbum.vue";
    import MoreCar from "./MoreCar.vue";
    import SmallPic from "./SmallPic.vue";
    export default {
        created(){
            //从生命周期中发出Ajax异步请求数据
            this.$store.dispatch("init");
        },
        components:{
            BigPic,
            ImgAlbum,
            MoreCar,
            SmallPic
        },
        methods:{
            changeShowPic(){
                this.$store.commit("changeShowPic", {isShowPic:false})
            }
        }
    }
</script>
<style scoped>
    .picshow{
        width: 100%;height: 100%;position: fixed;background: #000;
        top:50%;left:50%;z-index:999;transform:translate(-50%, -50%);color:#fff;
    }
    .rightPart{
        position: absolute;
        right:0;top:0;
        width: 350px;height: 100%;
    }
    .close .icon{
        font-size: 26px;
        position: fixed;
        top:5px;
        right:10px;
        z-index: 1000;
    }
</style>