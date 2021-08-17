import Vue from "vue";
import App from "./App.vue";
import Store from "./store/index";
import VueRouter from "vue-router";
import Home from "./Home.vue";
import Login from "./Login.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
    { path: "/", component: Login },
    { path: "/home", component: Home },
    { path: "/login", component: Login },
];

const Router = new VueRouter({ routes });

new Vue({
    store: Store,
    router: Router,
    render: (h) => h(App),
}).$mount("#app");
