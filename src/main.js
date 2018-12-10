import Vue from 'vue';
import './plugins/axios';
import VeeValidate, { Validator } from 'vee-validate';
import de from 'vee-validate/dist/locale/de';
import App from './app.vue';
import router from './router';
import store from './store';
import './plugins/vuetify';
import './plugins/electron-store';


Vue.use(VeeValidate, {
  locale: 'de',
});
Validator.localize('de', de);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
