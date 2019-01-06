<template>
    <div class="bigPic">
        <img width="900" :src="`carimages/${info.id}/${info.album}/${pic}`">
        <button class="lBtn" @click="goPrev()">上一张</button>
        <button class="rBtn" @click="goNext()">下一张</button>
    </div>
</template>
<script>
     export default {
        computed:{
            info(){
                return this.$store.state.picshowState
            },
            pic(){
                var album = this.info.album; //得到当前图集
                var idx = this.info.idx;     //得到当前图片编号
                //根据编号和图集选择当前要显示的大图片
                return this.$store.state.picshowState.info.images[album][idx];
            }
        },
        methods:{
            goNext(){
                // this.$store.commit("goNext"); // 同步
                this.$store.dispatch("goNext"); // 异步
            },
            goPrev(){
                this.$store.dispatch("goPrev");
            }
        }
     }
</script>
<style scoped>
    .leftPart button{
        position: absolute;
        top:0;
        width: 200px;
        height: 100%;
        opacity:0;
    }
    .bigPic{width: 900px;position: relative;}
    .lBtn{
        left:0;
        cursor:url(http://icon.zol-img.com.cn/products/v3/picture-cursor-left.cur),auto;
    }
    .rBtn{
        right:0;
        cursor:url(http://icon.zol-img.com.cn/products/v3/picture-cursor-right.cur),auto;
    }
</style>