<template>
    <div class="setArea">
        <h3>设置题目</h3>
        <div class="con">
            标题：<input type="text" v-model="item.title">
        </div>
        <div class="con">
            是否必填：<input type="checkbox" v-model="item.required">
        </div>
        <div class="con">
            题目类型：
            <input type="radio" v-model="item.type" value="singleOption" />单选
            <input type="radio" v-model="item.type" value="multipleOption" />多选
            <input type="radio" v-model="item.type" value="menuOption" />下拉
        </div>

        <div class="con">
            <!-- 题目选项们（更改之后，鼠标离开后双向修改） -->
            <div class="options" ref="options">
                <p v-for="(option,index) in item.option" :key="index">
                    <input type="text" v-model="option.v">
                    <span class="del" @click="delBtn(index)"></span>
                    <span class="changeOrder"></span>
                </p>
            </div>
        </div>
        <div class="addOption" @click="addOption">添加新的选项</div>
    </div>
</template>
<script>
    export default {
        props:["item"],
        methods:{
            addOption(){
                this.item.option.push({"v":""}); //添加新选项
            },
            delBtn(index){
                this.item.option.splice(index, 1);
            }
        },
        mounted(){
            var startIndex = 0; //全局变量
            var self = this;

            $(this.$refs.options).sortable({
                handle:".changeOrder",
                //拖拽开始
                start:function(e, ui){
                    //获取当前拖拽的编号
                    startIndex = $(ui.item).index();
                },

                //拖拽结束后
                stop:function(e, ui){
                    //获取拖拽结束后的编号
                    var endIndex = $(ui.item).index();
                    //从视图中题目的选项也要跟着变化（头删尾插）
                    //从startIndex删除1项
                    var delOption = self.item.option.splice(startIndex, 1)[0];
                    //从endIndex的位置添加之前删除的项
                    self.item.option.splice(endIndex, 0, delOption);
                }
            })
        }
    }
</script>
<style lang='stylus' scoped>
    .setArea{
        padding:20px;
        .con{
            line-height: 150%;padding:5px;
        }
        input[type="text"]{
            width: 230px;
            height: 30px;
            color: #666;
            border-radius: 5px;
            border: 1px solid #ddd;
            padding-left: 5px;
        }
        .addOption{
            width: 230px;
            height: 35px;
            background: #2db7f5;
            color: #fff;
            border-radius: 6px;
            text-align: center;
            line-height: 35px;
            cursor: pointer;
            border: none;
        }
        .addOption:hover{background: #18b666;}
        .del, .changeOrder{
            display: inline-block;
            width: 16px;
            height: 16px;
            padding: 2px;
            background: url(/images/del.svg);
            background-size: cover;
            position: relative;
            top: 6px;
            left: 5px;
        }
        .changeOrder{
            background: url(/images/order.svg);cursor: move;
        }
    }
</style>