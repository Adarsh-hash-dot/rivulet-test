import axios from "axios";

const state = {
    comments: [],
};

const getters = {
    allComments: (state) => {
        return state.comments;
    },
};

const mutations = {
    setComments: (state, comments) => (state.comments = comments),
    addComment: (state, newComment) => state.comments.unshift(newComment),
    initializeComments: (state) => {
        state.comments = JSON.parse(localStorage.getItem("comments"));
    },
};

const actions = {
    async fetchComments({ commit, getters }) {
        if (!getters.allComments) {
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/comments`
            );

            commit("setComments", response.data);
            localStorage.setItem("comments", JSON.stringify(response.data));
        }
    },
    async createComment({ commit, getters }, { postId, name, email, body }) {
        const response = await axios.post(
            "https://jsonplaceholder.typicode.com/comments",
            {
                postId: postId,
                name: name,
                email: email,
                body: body,
            }
        );
        commit("addComment", response.data);
        localStorage.setItem("comments", JSON.stringify(getters.allComments));
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
