import axios from "axios";

const state = {
    users: [],
    currentUser: null,
};

const getters = {
    allUsers: (state) => {
        return state.users;
    },
    getCurrentUser: (state) => {
        return state.currentUser;
    },
};

const mutations = {
    setUsers: (state, users) => (state.users = users),
    setCurrentUser: (state, currentUser) => (state.currentUser = currentUser),
    initializeUsers(state) {
        state.users = JSON.parse(localStorage.getItem("users"));
        state.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    },
};

const actions = {
    async fetchUsers({ commit, getters }) {
        if (!getters.allUsers) {
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/users"
            );
            localStorage.setItem("users", JSON.stringify(response.data));

            commit("setUsers", response.data);
        }
    },
    setUser({ commit }, currentUser) {
        commit("setCurrentUser", currentUser);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
