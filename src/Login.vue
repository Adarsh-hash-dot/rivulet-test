<template>
    <div
        class="columns has-text-centered is-centered mt-5
                "
    >
        <div
            class="column is-one-third-tablet is-one-quarter-fullhd card p-3 m-5"
        >
            <div class="subtitle">Login</div>
            <div v-if="isIncorrect" class="notification is-danger is-light">
                Incorrect Email or UserId.
            </div>

            <div class="control has-icons-left has-icons-right">
                <div>
                    <input
                        class="input"
                        v-model="input"
                        type="email"
                        placeholder="Email/userId"
                    />
                    <span class="icon is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </div>
            </div>
            <button class="button is-info m-3" @click="login">Submit</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
    name: "LoginPage",
    data() {
        return {
            input: "",
            isIncorrect: false,
        };
    },
    methods: {
        ...mapActions(["fetchUsers", "setUser"]),
        ...mapMutations(["initializeUsers"]),

        login() {
            const user = this.allUsers.find(
                (user) => user.email === this.input || user.id == this.input
            );
            if (user) {
                this.setUser(user);
                this.$router.push("/home");
            } else {
                this.isIncorrect = true;
            }
            this.input = "";
        },
    },
    computed: mapGetters(["allUsers", "currentUserId"]),
    created() {
        this.initializeUsers();
        this.fetchUsers();
    },
};
</script>

<style></style>
