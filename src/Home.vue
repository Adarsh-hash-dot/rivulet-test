<template>
    <div>
        <!-- v-if="getCurrentUserId != ''" -->
        <div
            class="columns is-centered 
                "
        >
            <div class="column is-half-tablet is-one-third-fullhd p-3 m-5">
                <div class="m-3">
                    <button class="button is-danger is-small" @click="logout">
                        Logout
                    </button>
                </div>
                <div class="card my-3 p-3">
                    <input
                        class="input is-info"
                        v-model="title"
                        placeholder="Title"
                    />
                    <textarea
                        class="textarea is-info"
                        v-model="body"
                        placeholder="Post"
                    ></textarea>
                    <div class="is-flex is-justify-content-flex-end mt-3">
                        <button class="button is-info" @click="post()">
                            Post
                        </button>
                    </div>
                </div>

                <div
                    v-for="(post, index) in allPosts"
                    :key="index"
                    class="card my-3 p-3"
                >
                    <div></div>
                    <div class="subtitle">{{ post.title }}</div>
                    <div class="mt-3">{{ post.body }}</div>
                    <comments
                        :postId="post.id"
                        :comments="allComments"
                        v-on:sendComment="sendComment($event, post.id)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import Comments from "./components/comments.vue";

export default {
    components: {
        Comments,
    },
    data() {
        return {
            title: "",
            body: "",
        };
    },
    methods: {
        ...mapActions([
            "fetchPosts",
            "createPost",
            "setUser",
            "fetchComments",
            "createComment",
        ]),

        ...mapMutations([
            "initializeUsers",
            "initializePosts",
            "initializeComments",
        ]),
        post() {
            this.createPost({
                title: this.title,
                body: this.body,
                userId: this.getCurrentUser.id,
            });
            this.title = "";
            this.body = "";
        },
        logout() {
            this.setUser(null);
            this.$router.push("/");
        },
        loginCheck() {
            if (this.getCurrentUser == null) {
                this.$router.push("/");
            }
        },
        sendComment(comment, postId) {
            this.createComment({
                postId: postId,
                name: this.getCurrentUser.name,
                email: this.getCurrentUser.email,
                body: comment,
            });
        },
    },
    computed: mapGetters(["allPosts", "getCurrentUser", "allComments"]),
    created() {
        this.initializeUsers();
        this.initializePosts();
        this.initializeComments();
        this.fetchPosts();
        this.fetchComments();
    },
    mounted() {
        this.loginCheck();
    },
};
</script>

<style></style>
