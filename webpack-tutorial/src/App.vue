<template>
    <div>
        <h1>Vue example</h1>
        <textarea v-model="source" cols="80" rows="10"></textarea>
        <hr>
        <div v-html="preview"></div>
    </div>
</template>

<script lang="ts">
import { markdown } from "markdown";
import "tachyons";
import Vue from "vue";
// import "../css/styles.css"; tslint-loader fails to load styles

export default Vue.extend({
    data() {
        return {
            source: "",
        };
    },
    computed: {
        preview(): string {
            return markdown.toHTML(this.source);
        },
    },
});
</script>

<style scoped>
h1 {
    color: darkgreen;
}
</style>