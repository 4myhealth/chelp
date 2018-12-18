import Vue from 'vue';
import store from '../lib/store';

Vue.use({
  install(VueInstance) {
    VueInstance.electronStore = store;
    VueInstance.prototype.$electronStore = store;
  },
});
