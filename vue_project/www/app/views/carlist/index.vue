<template>
    <div>
        <Row>
            <Col span="2">品牌：</Col>
            <Col span="22">
                <CheckboxGroup v-model="brand">
                    <Checkbox label="奥迪"></Checkbox>
                    <Checkbox label="奔驰"></Checkbox>
                    <Checkbox label="宝马"></Checkbox>
                    <Checkbox label="路虎"></Checkbox>
                    <Checkbox label="捷豹"></Checkbox>
                    <Checkbox label="大众"></Checkbox>
                    <Checkbox label="丰田"></Checkbox>
                    <Checkbox label="日产"></Checkbox>
                    <Checkbox label="标致"></Checkbox>
                    <Checkbox label="五菱"></Checkbox>
                    <Checkbox label="雪佛兰"></Checkbox>
                    <Checkbox label="特斯拉"></Checkbox>
                    <Checkbox label="MINI"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>

        <Row>
            <Col span="2">级别：</Col>
            <Col span="22">
                <CheckboxGroup v-model="type">
                    <Checkbox label="经济轿车"></Checkbox>
                    <Checkbox label="中档轿车"></Checkbox>
                    <Checkbox label="高档轿车"></Checkbox>
                    <Checkbox label="中型SUV"></Checkbox>
                    <Checkbox label="大型SUV"></Checkbox>
                    <Checkbox label="跑车"></Checkbox>
                    <Checkbox label="面包车"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>

        <Row>
            <Col span="2">颜色：</Col>
            <Col span="22">
                <CheckboxGroup v-model="color">
                    <Checkbox label="红"></Checkbox>
                    <Checkbox label="黄"></Checkbox>
                    <Checkbox label="蓝"></Checkbox>
                    <Checkbox label="绿"></Checkbox>
                    <Checkbox label="黑"></Checkbox>
                    <Checkbox label="白"></Checkbox>
                    <Checkbox label="灰"></Checkbox>
                    <Checkbox label="紫"></Checkbox>
                    <Checkbox label="橙"></Checkbox>
                    <Checkbox label="银灰"></Checkbox>
                    <Checkbox label="香槟"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>

        <Row>
            <Col span="2">环保：</Col>
            <Col span="22">
                <CheckboxGroup v-model="environmental">
                    <Checkbox label="国一"></Checkbox>
                    <Checkbox label="国二"></Checkbox>
                    <Checkbox label="国三"></Checkbox>
                    <Checkbox label="国四"></Checkbox>
                    <Checkbox label="国五"></Checkbox>
                    <Checkbox label="国六"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>

        <Row>
            <Col span="2">排量：</Col>
            <Col span="22">
                <CheckboxGroup v-model="displacement">
                    <Checkbox label="1.0L"></Checkbox>
                    <Checkbox label="1.2L"></Checkbox>
                    <Checkbox label="1.6L"></Checkbox>
                    <Checkbox label="1.6T"></Checkbox>
                    <Checkbox label="2.0L"></Checkbox>
                    <Checkbox label="2.0T"></Checkbox>
                    <Checkbox label="5.0L"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>

        <Row>
            <Col span="2">能源：</Col>
            <Col span="22">
                <CheckboxGroup v-model="fuel">
                    <Checkbox label="柴油车"></Checkbox>
                    <Checkbox label="汽油车"></Checkbox>
                    <Checkbox label="纯电动"></Checkbox>
                    <Checkbox label="油电混合"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>

        <Row>
            <Col span="2">变速箱：</Col>
            <Col span="22">
                <CheckboxGroup v-model="gearbox">
                    <Checkbox label="手动挡"></Checkbox>
                    <Checkbox label="自动挡"></Checkbox>
                    <Checkbox label="手自一体"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>

        <Row>
            <Col span="2">价格：</Col>
            <Col span="22">
                <Slider range @on-input="changePrice" v-model="price"></Slider>
                <Button type="info" @click="changePrice([0,5])">5万以内</Button>
                <Button type="info" @click="changePrice([5,10])">5万~10万</Button>
                <Button type="info" @click="changePrice([10,30])">10万~30万</Button>
                <Button type="info" @click="changePrice([30,100])">30万以上</Button>
            </Col>
        </Row>

        <Row>
            <Col span="2">公里：</Col>
            <Col span="22">
                <Slider range @on-input="changeKm" v-model="km"></Slider>
                <Button type="info" @click="changePrice([0,5])">5万以内</Button>
                <Button type="info" @click="changePrice([5,10])">5万~10万</Button>
                <Button type="info" @click="changePrice([10,30])">10万~30万</Button>
                <Button type="info" @click="changePrice([30,100])">30万以上</Button>
            </Col>
        </Row>
        <br>
        <br>
        
        <Row>
            <Col>
                <b>根据条件共筛选出：{{$store.state.carlistState.count}}条信息，</b>
                <b>当前在第：{{$store.state.carlistState.page}}页</b>
            </Col>
        </Row>

        <br>

        <!-- <Table :columns="col" :data="$store.state.carlistState.results" @on-sort-change="changeSort"
            @on-row-dblclick="changeShowPic"
        >
        </Table> -->
        <Table :columns="col" :data="$store.state.carlistState.results" @on-sort-change="changeSort">
        </Table>

         <Page :total="$store.state.carlistState.count" show-elevator show-sizer show-total
            :page-size="$store.state.carlistState.pagesize"
            :page-size-opts="[5,10,20,50,100]"
            :current="$store.state.carlistState.page"
            @on-change="changePage"
            @on-page-size-change="changePageSize"
         />
    </div>
</template>
<script>
    export default {
        created(){
            //请求所有汽车数据
            this.$store.dispatch("carlist_init");
        },
        computed:{
            // color(){
            //     return this.$store.state.carlistState.carFilters.filter(i=>i.k == "color")[0].v
            // },
            // price(){
            //     return this.$store.state.carlistState.carFilters.filter(i=>i.k == "price")[0].v
            // },
            // brand(){
            //     return this.$store.state.carlistState.carFilters.filter(i=>i.k == "brand")[0].v
            // }
        },
        methods:{
            //页面跳转
            changeSort(a){
                var order = a.order == "desc" ? -1 : 1;
                this.$store.dispatch("changeSort", {sortby:a.key, sortdirection:order})
            },
            //页码跳转
            changePage(page){
                this.$store.dispatch("changePage", {page})
            },
            //每页显示的数量
            changePageSize(pagesize){
                this.$store.dispatch("changePageSize", {pagesize})
            },
            //发出修改（筛选）请求，并且附带参数k和v传递过去
            // changeColor(v){
            //     this.$store.dispatch("changeFilters", {k:"color", v})
            // },
            changePrice(v){
                this.$store.dispatch("changeFilters", {k:"price", v})
            },
            changeKm(v){
                this.$store.dispatch("changeFilters", {k:"km", v:v.map(item=>item * 10000)})
            },
            // changeBrand(v){
            //     this.$store.dispatch("changeFilters", {k:"brand", v})
            // },
            // changeShowPic(v){
            //     this.$store.dispatch("changeShowPic", {"id":v.id});
            // }
        },
        watch:{
            color(v){
                this.$store.dispatch("changeFilters", {k:"color", v})
            },
            brand(v){
                this.$store.dispatch("changeFilters", {k:"brand", v})
            },
            type(v){
                this.$store.dispatch("changeFilters", {k:"type", v})
            },
            gearbox(v){
                this.$store.dispatch("changeFilters", {k:"gearbox", v})
            },
            fuel(v){
                this.$store.dispatch("changeFilters", {k:"fuel", v})
            },
            displacement(v){
                this.$store.dispatch("changeFilters", {k:"displacement", v})
            },
            environmental(v){
                this.$store.dispatch("changeFilters", {k:"environmental", v})
            }
        },
        data(){
            return {
                color:[],
                brand:[],
                type:[],
                gearbox:[],
                fuel:[],
                displacement:[],
                environmental:[],
                price:[0,100],
                km:[0, 100],

                //key是对应Table标签:data中的key，将数据显示在表格中
                col: [
                    {title:'编号', key:'id',sortable:'custom'},
                    {
                        title:'图片',
                        key:'images',
                        width:100,
                        render(h, {row,column,index}){
                            return h({
                                data(){
                                    return {row}
                                },
                                template:'<img @click="changeShowPic(row)" width="100" :src="`carimages_small/${row.id}/view/${row.images.view[0]}`" />',
                                methods:{
                                    changeShowPic(v){
                                        this.$store.dispatch("changeShowPic", {"id":v.id});
                                    }
                                }
                            })
                        }
                    },
                    {title:'品牌', key:'brand'},
                    {title:'车型', key:'series'},
                    {title:'颜色', key:'color'},
                    {title:'级别', key:'type'},
                    {title:'价格', key:'price', sortable:'custom'},
                    {title:'公里', key:'km'},
                    {title:'变速箱', key:'gearbox'},
                    {title:'排量', key:'displacement'},
                    {title:'排放', key:'environmental'},
                    {title:'能源', key:'fuel'},
                    {
                        title:'购买时间', key:'buydate',
                        render(h, {row}){
                            return h({
                                data(){
                                    return {row}
                                },
                                template:`<div>
                                    ${new Date(row.buydate).getFullYear()}年
                                </div>`
                            })
                        }
                    },
                    {
                        title:'是否上牌',
                        key:'licence',
                        render(h, {row}){
                            return h({
                                data(){
                                    return {row}
                                },
                                template:`
                                    <div>
                                        <span v-if="${row.licence}">是</span>
                                        <span v-if="${!row.licence}">否</span>
                                    </div>
                                `
                            })
                        }
                    },
                    {
                        title:'是否本地车',
                        key:'locality',
                        render(h, {row}){
                            return h({
                                data(){
                                    return {row}
                                },
                                template:`
                                    <div>
                                        <span v-if="${row.locality}">是</span>
                                        <span v-if="${!row.locality}">否</span>
                                    </div>
                                `
                            })
                        }
                    },
                ]
            }
        }
    }
</script>
<style scoped>

</style>