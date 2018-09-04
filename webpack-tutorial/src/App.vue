<template>
    <div>
        <h1>Vue example</h1>
        <textarea v-model="source" cols="80" rows="10"></textarea>
        <hr>
        <div v-html="preview"></div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { markdown } from 'markdown';
import 'tachyons';
// import "../css/styles.css"; tslint-loader fails to load styles

@Component
export default class App extends Vue {
    @Prop()
    private source: string = '';

    get preview() {
        return markdown.toHTML(this.source);
    }
}
</script>

<style scoped>
h1 {
    color: darkgreen;
}
</style>