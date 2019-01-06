import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/index.vue';
import Carlist from '../views/carlist/index.vue';
import Users from '../views/users/index.vue';
import Coolfrom from '../views/coolfrom/index.vue';
import Login from '../views/login/index.vue';
import axios from 'axios';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { 
            path: "/", name: "首页", component: Index,
            meta: { needLogin: true,"juse":["user","admin"] } 
        },
        { 
            path: "/carlist", name: "汽车列表", component: Carlist,
            meta: { needLogin: true }
         },
        { 
            path: "/users", name: "用户中心", component: Users,
            meta: { needLogin: true } 
        },
        { 
            path: "/coolfrom", name: "酷表单", component: Coolfrom, 
            meta: { needLogin: true } 
        },
        { path: "/login", name: "登陆中心", component: Login },
        { path: "*", redirect: "/login"}
    ]
})

router.beforeEach(async (to, from, next) => {
    //当用户切换路由的时候，执行这里的语句
    if(to.meta.needLogin == true){
        //验证用户是否登陆了
        const { login, username,juse} = await axios.get("/api/checklogin").then(res=>res.data);
        console.log(login, username)
        if(login == true){
            console.log("你通过验证了")
            next();
        }else{
            console.log("没有通过验证，去登陆")
            router.push("/login")
        }
    }else{
        //不需要验证登陆的，直接放行
        console.log("通过验证了")
        next();
    }
    console.log(to)
})

export default router;