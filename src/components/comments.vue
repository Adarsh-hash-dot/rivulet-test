<template>
    <div class="mt-3">
        <div class="is-flex">
            <input
                class="input is-info"
                v-model="input"
                type="text"
                placeholder="comment something..."
            />
            <button class="button" @click="sendComment">Comment</button>
        </div>
        <div class="has-background-light p-1">
            <div
                v-for="(comment, index) in (comments || []).filter(
                    (comment) => comment.postId == postId
                )"
                :key="index"
                class=""
            >
                <div class=" has-background-white m-1 p-2">
                    <div class="is-size-7 has-text-weight-bold">
                        {{ comment.name }}
                    </div>
                    <div class="is-size-7">
                        {{ comment.body }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        postId: {
            type: Number,
        },
        comments: {
            type: Array,
        },
    },
    data() {
        return {
            input: "",
        };
    },

    methods: {
        sendComment() {
            if (this.comment === "") return;
            this.$emit("sendComment", this.input);
            this.input = "";
        },
    },
};
</script>

<style></style>
