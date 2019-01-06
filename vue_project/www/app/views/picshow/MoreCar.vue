<template>
    <div>
        <h3>更多{{info.brand}} {{info.series}}供您选择</h3>
        <div class="moreCar">
            <ul class="moreList" ref="moreList">
                <li v-for="i in carlike" @click="changeID(i.id)">
                    {{i.brand}}{{i.series}} {{i.color}}
                    {{new Date(i.buydate).getFullYear()}}年
                    {{i.price}}万 {{i.displacement}}排量
                </li>
            </ul>
            <div class="bar"><b></b></div>
        </div>
    </div>
</template>
<script>
     export default {
        computed:{
            info(){
                return this.$store.state.picshowState.info
            },
            carlike(){
                return this.$store.state.picshowState.carlike
            }
        },
        methods:{
            changeID(id){
                this.$store.dispatch("changeID", {id})
            }
        }
     }
</script>
<style>
    .moreCar{
        position: relative;
        width: 92%;color:#fff;
        background: rgba(255, 255, 255, 0.2);
    }
    .moreCar ul{border:1px solid #fff;margin:5px 0;position: relative;}
    .moreCar ul li{
        line-height: 26px;
        padding-left:5px;
        cursor: pointer;
    }
    .moreCar ul li:hover{background: yellowgreen;}
    .moreCar .bar{
        background: #fff;
        width: 10px;height: 100%;
        position: absolute;
        top:0;right:0;
    }
    .moreCar .bar b{
        position: absolute;
        width: 10px;height: 40px;
        background: orange;
    }
</style>