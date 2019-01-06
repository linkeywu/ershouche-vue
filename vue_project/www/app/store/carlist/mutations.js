export default {
    changeResults(state,payload){
        state.carlistState.results = payload.results
    },
    changeCount(state,payload){
        state.carlistState.count = payload.count
    },
    //排序
    changeSort(state,payload){
        state.carlistState.sortby = payload.sortby
        state.carlistState.sortdirection = payload.sortdirection;
    },
    //页面切换
    changePage(state,payload){
        state.carlistState.page = payload.page
    },
    //切换每页显示的数量
    changePageSize(state,payload){
        state.carlistState.pagesize = payload.pagesize
    },
    changeFilters(state,payload){
        state.carlistState.carFilters = state.carlistState.carFilters.map(item=>{
            //如果相等，k不改，只改v
            return item.k == payload.k ? { ...item, v: payload.v} : item
        })
    }
}