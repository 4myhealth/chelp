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
      path: '/results/uploads',
      name: 'page-results-uploads',
      component: () => import('./views/results-watcher/uploads.vue'),
    },
    {
      path: '/results/settings/doctors',
      name: 'page-results-doctors',
      component: () => import('./views/results-watcher/settings/doctors.vue'),
    },
    {
      path: '/results/settings/watcher',
      name: 'page-results-settings',
      component: () => import('./views/results-watcher/settings/watcher.vue'),
    },
    {
      path: '/fotofinder/settings',
      name: 'page-fotofinder-settings',
      component: () => import('./views/fotofinder/settings/fotofinder.vue'),
    },
    {
      path: '/synmedico/settings',
      name: 'page-synmedico-settings',
      component: () => import('./views/synmedico/settings/synmedico.vue'),
    },
    {
      path: '/lb-systems/settings',
      name: 'page-lb-systems-settings',
      component: () => import('./views/lb-systems/settings/lb-systems.vue'),
    },
    {
      path: '/med-request/settings',
      name: 'page-med-request-settings',
      component: () => import('./views/med-request/settings/med-request.vue'),
    },
    {
      path: '/settings/socket-client',
      name: 'page-socket-client-settings',
      component: () => import('./views/settings/socket-client.vue'),
    },
    {
      path: '*',
      redirect: '/dashboard',
    },
  ],
});
