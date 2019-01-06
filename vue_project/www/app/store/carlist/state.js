export default {
    page:1,
    pagesize:5,
    sortby:"id",
    sortdirection:1,
    results:[], //存放请求回来的数据
    count:0,
    carFilters:[
        // 例如{ "k":"color","v":["红","蓝"]},
        { "k":"color","v":[]},
        { "k":"brand","v":[]},
        { "k":"series","v":[]},
        { "k":"type","v":[]},
        { "k":"gearbox","v":[]},
        { "k":"fuel","v":[]},
        { "k":"displacement","v":[]},
        { "k":"environmental","v":[]},
        { "k":"price","v":[0,100]},
        { "k":"km","v":[0, 1000000]}
    ]
}