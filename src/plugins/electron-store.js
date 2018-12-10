import Vue from 'vue';
import Store from 'electron-store';

const store = new Store();


Vue.use({
  install(VueInstance) {
    VueInstance.prototype.$electronStore = store;
  },
});
