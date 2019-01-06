export default {
    //数据
    changeUsersResults(state,payload){
        state.usersState.results = payload.results
    },
    //数据的总数
    changeUsersCount(state, payload) {
        state.usersState.count = payload.count
        state.usersState.number = payload.number
    },
    changeUserPage(state,payload){
        state.usersState.page = payload.page
    },
    changeUserPageSize(state, payload) {
        state.usersState.pagesize = payload.pagesize
    },
    changeUserSort(state, payload) {
        state.usersState.sortby = payload.sortby
        state.usersState.sortdirection = payload.sortdirection
    },
    changeUserKeyword(state,payload){
        state.usersState.keyword = payload.keyword
    }
}