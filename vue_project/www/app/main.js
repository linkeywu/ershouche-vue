import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import iView from 'iview';
import router from "./router"
Vue.use(iView);

new Vue({
    el: "#app",
    store,
    router,
    render: (h) => h(App)
})