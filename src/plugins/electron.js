import Vue from 'vue';
import electron from 'electron';


Vue.use({
  install(VueInstance) {
    VueInstance.prototype.$electron = electron;
  },
});
