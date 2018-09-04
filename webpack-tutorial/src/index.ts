import Vue from 'vue';
import App from './App.vue';

const vueApp = new Vue({
    el: '#vue-ts-app',
    render: (h: any) => h(App),
});
