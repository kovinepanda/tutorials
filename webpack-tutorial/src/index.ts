import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
import App from './App.vue';

Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const vueApp = new Vue({
  el: '#vue-ts-app',
  render: (h: any) => h(App)
});
