<template>
    <div>
        <b-alert show>
            <h1>Vue example</h1>
        </b-alert>
        <b-form-textarea v-model="source" cols="80" rows="10"></b-form-textarea>
        <hr>
        <pre class="mt-3" v-html="preview"></pre>
    </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator';
import { markdown } from 'markdown';

@Component
export default class App extends Vue {
  @Provide() source: string = '';

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