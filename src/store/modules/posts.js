import axios from "axios";

const state = { posts: [] };

const getters = {
    allPosts: (state) => {
        return state.posts;
    },
};

const mutations = {
    setPosts: (state, posts) => (state.posts = posts),
    addPost: (state, newPost) => state.posts.unshift(newPost),
    initializePosts: (state) => {
        state.posts = JSON.parse(localStorage.getItem("posts"));
    },
};

const actions = {
    async fetchPosts({ commit, getters }) {
        if (!getters.allPosts) {
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/posts"
            );

            commit("setPosts", response.data);
            localStorage.setItem("posts", JSON.stringify(response.data));
        }
    },
    async createPost({ commit, getters }, { title, body, userId }) {
        const response = await axios.post(
            "https://jsonplaceholder.typicode.com/posts",
            {
                title: title,
                body: body,
                userId: parseInt(userId),
            }
        );
        commit("addPost", response.data);
        localStorage.setItem("posts", JSON.stringify(getters.allPosts));
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
