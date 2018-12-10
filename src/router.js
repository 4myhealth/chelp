import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/dashboard.vue'),
    },
    {
      name: 'page-hcs-uploads',
      component: () => import('./views/hcs-watcher/uploads.vue'),
    },
    {
      path: '*',
      redirect: '/dashboard',
    },
  ],
});
