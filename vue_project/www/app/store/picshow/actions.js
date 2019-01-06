export default {
    async init({commit, state}){
        var id = state.picshowState.id; //获取state中的车辆id
        //异步请求用户的id车辆信息（8080跨域请求3000）
        var {info} = await fetch("/api/cars/" + id).then(data=>data.json());
        var carlike = await fetch("/api/carlike/" + id).then(data=>data.json());

        //拿到数据后，命令mutation将数据存储到state中的info
        commit("changeInfo", {info})
        commit("changeCarlike", carlike)
    },
    goNext({commit, state}){
        var _state = state.picshowState;
        //如果当前idx没有超出图片的个数，就切换图片
        if(_state.idx < _state.info.images[_state.album].length - 1){
            commit("changeIdx", {idx:_state.idx + 1})
        }else{
            //否则就要切换图集
            commit("changeIdx", {idx:0})
            switch(_state.album){
                case "view":
                    commit("changeAlbum", {album:"inner"})
                    break;
                case "inner":
                    commit("changeAlbum", {album:"engine"})
                    break;
                case "engine":
                    commit("changeAlbum", {album:"more"})
                    break;
                case "more":
                    commit("changeAlbum", {album:"view"})
                    break;
            }
        }
    },
    goPrev({commit, state}){
        var _state = state.picshowState;
        //如果当前idx没有超出图片的个数，就切换图片
        if(_state.idx > 0){
            commit("changeIdx", {idx:_state.idx - 1})
        }else{
            //否则就要切换图集
            var arr = ['view', 'inner', 'engine', 'more'];
            //检查数组中是否存在某些，存在当前项返回下标
            var index = arr.indexOf(_state.album);
            index = index <= 0 ? 3 : index - 1;
            console.log(index)
            var nowAlbum = arr[index]; //选择数组中的图集类型

            //改变图片下标
            commit("changeIdx", {idx: _state.info.images[nowAlbum].length - 1})
            //改变图集
            commit("changeAlbum", {album:nowAlbum})

        // switch(_state.album){
        //     case "more":
        //         commit("changeAlbum", {album:"engine"})
        //         break;
        //     case "engine":
        //         commit("changeAlbum", {album:"inner"})
        //         break;
        //     case "inner":
        //         commit("changeAlbum", {album:"view"})
        //         break;
        //     case "view":
        //         commit("changeAlbum", {album:"more"})
        //         break;
        // }
        }
    },
    async changeID({commit, state}, {id}){
        var {info} = await fetch("/api/cars/" + id).then(data=>data.json());
        var carlike = await fetch("/api/carlike/" + id).then(data=>data.json());

        //拿到数据后，命令mutation将数据存储到state中的info
        commit("changeInfo", {info})
        commit("changeCarlike", carlike)

        commit("changeID", {id});
        //图片编号归0
        commit("changeIdx", {idx:0});
        //视图回到外观
        commit("changeAlbum", {album:'view'});
    },

    async changeShowPic({ commit, state }, { id }) {
        console.log(id)
        var { info } = await fetch("/api/cars/" + id).then(data => data.json());
        var carlike = await fetch("/api/carlike/" + id).then(data => data.json());

        //拿到数据后，命令mutation将数据存储到state中的info
        commit("changeInfo", { info })
        commit("changeCarlike", carlike)

        commit("changeID", { id });
        //图片编号归0
        commit("changeIdx", { idx: 0 });
        //视图回到外观
        commit("changeAlbum", { album: 'view' });

        commit("changeShowPic", {isShowPic:true})
    },
}