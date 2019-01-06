<template>
    <div class="wrap">
        <div class="leftPart">
            <typeTestArea></typeTestArea>
        </div>
        <div class="centerPart">
            <div :class="{outerBox:true,onedit:$store.state.coolfromState.nowedit == index+1}" v-for="(item,index) in q" :key="index">
                <!-- <singleOption></singleOption> -->
                <!-- :is="item.type"表示要显示的组件类型 -->
                <div :is="item.type" :item="item" :index="index" class="cbox"></div>
                <span class="edit" :data-index="index" @click="changeEdit(index)"></span>
                <!-- <span class="edit" :data-index="index" @click="$store.commit('changeNowEdit',{nowedit:index + 1})"></span> -->
                <span class="up" :data-index="index"></span>
                <span class="down" :data-index="index"></span>
            </div>
        </div>
        <div class="rightPart">
            <setArea v-if="$store.state.coolfromState.nowedit != 0" :item="q[$store.state.coolfromState.nowedit - 1]"></setArea>
        </div>
    </div>
</template>
<script>
    import singleOption from "../../components/singleOption.vue";
    import multipleOption from "../../components/multipleOption.vue";
    import menuOption from "../../components/menuOption.vue";
    import setArea from "../../components/setArea.vue";
    import typeTestArea from "../../components/typeTestArea.vue";

    export default {
        methods:{
            changeEdit(index){
                this.$store.commit("changeNowEdit",{nowedit:index + 1})
            }
        },
        data(){
            return {
                q:[
                    {
                        "title":"你觉得下面那个学历最牛叉？",
                        "type":"singleOption",
                        "option":[
                            {v:"家里蹲大学"},
                            {v:"英国贱桥大学"},
                            {v:"美国麻绳礼工"},
                            {v:"蓝翔技工学校"}
                        ],
                        required:false,     //是否为必填
                    },
                    {
                        "title":"你喜欢吃的食物？",
                        "type":"multipleOption",
                        "option":[
                            {v:"榴莲"},
                            {v:"香蕉"},
                            {v:"葡萄"},
                            {v:"梨子"}
                        ],
                        required:false,
                    },
                    {
                        "title":"治疗失眠最有效的方法是？",
                        "type":"menuOption",
                        "option":[
                            {v:"吃安眠药"},
                            {v:"看国产电视剧"},
                            {v:"催眠术"},
                            {v:"用大锤打晕"}
                        ],
                        required:false,
                    }
                ]
            }
        },
        components:{
            singleOption,
            multipleOption,
            menuOption,
            setArea,
            typeTestArea
        },
        //组件上树之后的生命周期
        mounted(){
            var self = this;
            // draggable()拖拽、sortable()拖拽排序结合使用
            // 拖拽
            $(".typeTestArea li").draggable({
                connectToSortable:".centerPart",  //可拖拽到什么位置
                helper:"clone",   //克隆拖拽
                revert:"invalid", //拖拽停止时，未放置在sortable，归位动画
            });

            //拖拽排序
            $(".centerPart").sortable({
                cancel:".cbox, .outerBox span",  //进制从匹配的元素上拖拽排序
                //当拖拽排序停止时触发该事件
                stop:function(event, ui){
                    //获取拖拽后的排序下标和data-titletype属性值
                    // $(ui.item[0]).attr("data-titletype")
                    var index = $(ui.item[0]).index()
                    var titleType = $(ui.item[0]).data("titletype");

                    //拖拽后题目名称消失
                    $(ui.item[0]).remove();

                    //然后从index开始，不删除，添加新项
                    self.q.splice(index, 0, {
                        "title":"一个新的题目，请编辑",
                        "type":titleType,
                        "option":[
                            {v:"新选项A"},
                            {v:"新选项B"},
                            {v:"新选项C"},
                            {v:"新选项D"}
                        ],
                        required:false
                    })

                    //拖拽添加题目完成后，让新添加的题目变成当前编辑状态
                    self.$store.commit("changeNowEdit", {nowedit: index+1})
                }
            })

            $(".centerPart").on('click','.up', function(event){
                //获取当前点击的题目的编号
                var index = $(this).data("index");
                //如果大于0即可交换位置
                if(index > 0){
                    //尾删头插
                    //temp是要添加的新项，即被删除的那项（即当前被点击的项）
                    var temp = self.q.splice(index, 1)[0];
                    //从当前的上一题开始，删除0项，添加新项
                    self.q.splice(index-1, 0, temp);
                }
            })

            $(".centerPart").on('click','.down', function(event){
                //获取当前点击的题目的编号
                var index = $(this).data("index");
                var temp = self.q.splice(index, 1)[0];
                self.q.splice(index+1, 0, temp);
            })
        }
    }
</script>
<style lang='stylus' scoped>
    .wrap{
        width: 1300px;
        min-height:500px;
        margin:50px auto;overflow: hidden;
        .leftPart, .rightPart{
            float: left;
            width: 350px;
            min-height:500px;
            background: #ccc;
        }
        .centerPart{
            float: left;
            width: 600px;
            min-height:500px;
            padding: 20px;
            overflow: hidden;
            box-sizing:border-box;background: #fff;
            .outerBox{
                width: 500px;position: relative;
                .cbox{
                    width: 500px;padding:10px 0px;
                    border-bottom:1px solid #eee;position: relative;
                    .qTitle{
                        font-size:18px;font-weight:bold;margin-bottom:10px;
                    }
                    label{margin-right:10px; cursor: pointer;}
                    select{
                        width: 300px;height: 30px;
                        border: 1px solid #bdbdbd;border-radius:6px;
                    }
                }
                .edit{
                    position: absolute;right:20px;top:15px;
                    width: 20px;height: 20px;
                    background:url(/images/edit.svg);
                    background-size:cover;display: none;
                }
                .down{
                    position: absolute;right:50px;top:15px;
                    width: 16px;height: 16px;
                    background:url(/images/down.svg);
                    background-size:cover;display: none;
                }
                .up{
                    position: absolute;right:80px;top:15px;
                    width: 16px;height: 16px;
                    background:url(/images/up.svg);
                    background-size:cover;display: none;
                }
                &:hover .edit, &:hover .down ,&:hover .up{display: block;}
                &.onedit{animation:donghua 0.5s linear infinite alternate;}
                @-webkit-keyframes donghua{
                    0%{box-shadow:0 0 0 red;}
                    100%{box-shadow:0 0 20px red;}
                }
            }
        }
    }
</style>