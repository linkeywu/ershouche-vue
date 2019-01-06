<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="/" @on-select="changeMenu">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="/">
                            <Icon type="ios-navigate"></Icon>
                            首页
                        </MenuItem>
                        <MenuItem name="carlist">
                            <Icon type="ios-keypad"></Icon>
                            汽车列表
                        </MenuItem>
                        <MenuItem name="users">
                            <Icon type="ios-analytics"></Icon>
                            用户中心
                        </MenuItem>
                        <MenuItem name="coolfrom">
                            <Icon type="ios-paper"></Icon>
                            酷表单
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>首页</BreadcrumbItem>
                        <BreadcrumbItem>汽车列表</BreadcrumbItem>
                        <BreadcrumbItem>用户中心</BreadcrumbItem>
                        <BreadcrumbItem>酷表单</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <Picshow v-show="$store.state.picshowState.isShowPic"></Picshow>
                        <!-- <CarList></CarList>
                        <User></User> -->
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
            <Footer class="layout-footer-center">2011-2019 &copy; 二手车交易平台</Footer>
        </Layout>
    </div>
</template>
<script>
    import Picshow from "./views/picshow/index.vue"
    // import CarList from "./views/carlist/index.vue"
    // import User from "./views/users/index.vue"
    export default {
        components:{
            Picshow,
        //     CarList,
        //     User
        },
        methods:{
            changeMenu(name){
                console.log(name)
                this.$router.push({path:`/${name}`})
            }
        }
    }
</script>
<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}

.layout-nav{
    width: 520px;
    margin: 0 auto;
    margin-right: 20px;
}
.ivu-menu-item-active{background: gold;}
.layout-footer-center{text-align:center;}
</style>