// Entrypoint for vuex

import Vuex from "vuex";
import Vue from "vue";
import users from "./modules/users";
import posts from "./modules/posts";
import comments from "./modules/comments";

// Load vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules: {
        users,
        posts,
        comments,
    },
});
