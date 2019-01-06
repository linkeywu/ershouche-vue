import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

Vue.use(Vuex);

import picshowState from "./picshow/state.js";
import picshowMutations from "./picshow/mutations.js";
import picshowActions from "./picshow/actions.js";

import carlistState from "./carlist/state.js";
import carlistMutations from "./carlist/mutations.js";
import carlistActions from "./carlist/actions.js";

import usersState from "./users/state.js";
import usersMutations from "./users/mutations.js";
import usersActions from "./users/actions.js";

import coolfromState from "./coolfrom/state.js";
import coolfromMutations from "./coolfrom/mutations.js";

//全局数据
export default new Vuex.Store({
    namespaced: true,
    state:{
        picshowState,
        carlistState,
        usersState,
        coolfromState
    },
    mutations:{
        ...picshowMutations,
        ...carlistMutations,
        ...usersMutations,
        ...coolfromMutations
    },
    actions:{
        ...picshowActions,
        ...carlistActions,
        ...usersActions
    },
    plugins:[createLogger()]
})