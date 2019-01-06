async function load(commit, {usersState:{page,pagesize,sortby,sortdirection,keyword}}){
    // 带着分页、排序、关键词信息拉取数据
    const {count,number,results} = await fetch(`/api/users?page=${page}&pagesize=${pagesize}&sortby=${sortby}&sortdirection=${sortdirection}&keyword=${keyword}`).then(data=>data.json());

    console.log(count, number, results)
    //发出commit命令改变state
    commit("changeUsersResults", { results })
    commit("changeUsersCount", { count, number })
}

export default {
    async user_init({commit,state}){
       await  load(commit, state)
    },
    //页码
    async changeUserPage({ commit, state }, {page}) {
        commit("changeUserPage", {page})
        await load(commit, state)
    },
    async changeUserPageSize({ commit, state }, { pagesize }) {
        commit("changeUserPage", { page: 1 })
        commit("changeUserPageSize", { pagesize })
        await load(commit, state)
    },
    async changeUserSort({ commit, state }, { sortby,sortdirection }) {
        commit("changeUserPage", { page:1 })
        commit("changeUserSort", { sortby, sortdirection })
        await load(commit, state)
    },
    async changeUserKeyword({ commit, state }, {keyword }) {
        commit("changeUserPage", { page: 1 })
        commit("changeUserKeyword", { keyword })
        await load(commit, state)
    }
}