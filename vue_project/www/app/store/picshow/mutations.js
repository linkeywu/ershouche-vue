export default {
    changeInfo(state, payload){
        //将请求回来的数据赋值给全局的info
        state.picshowState.info = payload.info
    },
    //改变显示图集
    changeAlbum(state,payload){
        state.picshowState.album = payload.album
    },
    //改变图片编号
    changeIdx(state,payload){
        state.picshowState.idx = payload.idx
    },
    changeCarlike(state, payload){
        state.picshowState.carlike = payload.info
    },
    changeID(state,payload){
        state.picshowState.id = payload.id
    },
    changeShowPic(state,payload){
        state.picshowState.isShowPic = payload.isShowPic
    }
}