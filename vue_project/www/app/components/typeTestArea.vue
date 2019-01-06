<template>
    <div class="typeTestArea">
        <ul>
            <li data-titletype="singleOption">单选题</li>
            <li data-titletype="multipleOption">多选题</li>
            <li data-titletype="menuOption">下拉菜单</li>
        </ul>
    </div>
</template>
<script>
    export default {

    }
</script>
<style lang='stylus' scoped>
    .typeTestArea{
        padding:20px;
        ul{
            list-style:none;
            li{
                width: 200px;
                height: 50px;
                line-height: 50px;
                background: #fff;
                border: 1px solid #eee;
                text-align: center;
                margin-bottom: 10px;
                cursor: move;
            }
        }
    }
</style>