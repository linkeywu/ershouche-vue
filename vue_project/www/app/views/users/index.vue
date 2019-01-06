<template>
    <div>
        <Row>
            <Col span="12">
                <input type="text" v-model="keyword" placeholder="请输入姓名或手机号">
                <b>共 {{$store.state.usersState.count}} 条信息</b>
            </Col>
        </Row>
        <br>

        <Table :columns="col" :data="$store.state.usersState.results"  @on-sort-change="changeSort">
        </Table>

        <br>
        <Page :total="$store.state.usersState.count" show-elevator show-sizer show-total
            :page-size="$store.state.usersState.pagesize"
            :page-size-opts="[5,10,20,50,100]"
            :current="$store.state.usersState.page"
            @on-change="changePage"
            @on-page-size-change="changePageSize"
        />
    </div>
</template>
<script>
    export default {
        created(){
            this.$store.dispatch("user_init");
        },
        data(){
            return {
                col: [
                    {title:'编号', key:'id', sortable:'custom'},
                    {title:'姓名', key:'name'},
                    {title:'年龄', key:'age', sortable:'custom'},
                    {title:'电话', key:'tel'},
                ]
            }
        },
        computed:{
            keyword:{
                get(){
                    return this.$store.state.usersState.keyword
                },
                set(v){
                    //先分空格
                    var keyword = v.replace(/\s/g, ",");
                    this.$store.dispatch("changeUserKeyword", {keyword})
                }
            }
        },
        methods: {
            //分页
            changePage(page){
                this.$store.dispatch("changeUserPage", {page})
            },
            //页数量
            changePageSize(pagesize){
                this.$store.dispatch("changeUserPageSize", {pagesize})
            },
            //排序
            changeSort({key,order}){
                this.$store.dispatch("changeUserSort", {
                    sortby:key,
                    sortdirection:order == "asc" ? 1 : -1
                })
            }
        },
    }
</script>
<style scoped>
    input{
        width: 300px;
        height: 30px;
        border-radius: 3px;
        border: 1px solid #ccc;
        padding-left:5px;
        outline:none;
    }
</style>