async function load(commit, state){
    var page = state.carlistState.page;
    var pagesize = state.carlistState.pagesize;
    var sortby = state.carlistState.sortby;
    var sortdirection = state.carlistState.sortdirection;
    
    //将 { "k":"brand","v":[]}形式变为 &color=[]模式
    var carFilters = state.carlistState.carFilters;
    var str = "";
    for(var i = 0; i < carFilters.length;i++){
       if(carFilters[i].v.length != 0){
           str += "&" + carFilters[i].k + "=" + JSON.stringify(carFilters[i].v)
       }
    }
    console.log(str)
    //根据state中的状态，请求数据
    const {count,results} = await fetch(`/api/cars?page=${page}&pagesize=${pagesize}&sortby=${sortby}&sortdirection=${sortdirection}${str}`).then(data=>data.json());

    //发出commit命令改变state
    commit("changeResults", {results})
    commit("changeCount", {count})
}

export default {
    async carlist_init({commit, state}){
        await load(commit, state)
    },
    //排序
    async changeSort({commit, state}, {sortby,sortdirection}){
        commit("changeSort", {sortby,sortdirection}); //排序条件
        commit("changePage", {page:1}); //页码归1
        await load(commit, state)
    },
    async changePage({commit, state}, {page}){
        commit("changePage", {page}); //改变state中的page
        await load(commit, state)
    },
    async changePageSize({commit, state}, {pagesize}){
        commit("changePageSize", {pagesize}); //改变state中的pagesize
        commit("changePage", {page:1}); //页码归1
        await load(commit, state)
    },
    async changeFilters({ commit, state }, {k, v}) {
        commit("changeFilters", {k ,v})
        commit("changePage", { page: 1 }) //页码归1
        await load(commit, state)
    },
}