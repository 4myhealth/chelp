import Vue from 'vue';
import Vuex from 'vuex';
import DB from './lib/database';
import ResultsWatcher from './lib/results-watcher';
import electronStore from './lib/store';
import SocketClient from './lib/service-socket-client';
import SynmedicoSocketHandler from './lib/synmedico/socket-handler';
import FotoFinderSocketHandler from './lib/foto-finder/socket-handler';
import MedRequestSocketHandler from './lib/med-request/socket-handler';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMenuActive: true,
    resultsWatcher: null,
  },
  getters: {
    isMenuActive: state => state.isMenuActive,
    resultsWatcher: state => state.resultsWatcher,
  },
  mutations: {
    setMenuActive(state, status) {
      state.isMenuActive = status;
    },
    setResultsWatcher(state, resultsWatcher) {
      state.resultsWatcher = resultsWatcher;
    },
  },
  actions: {
    setMenuActive({ commit }, status) {
      commit('setMenuActive', status);
    },
    setResultsWatcher({ commit }, resultsWatcher) {
      commit('setResultsWatcher', resultsWatcher);
    },
    /**
     * [activateResultsWatcher description]
     * @param  {[type]} store [description]
     * @return {[type]}       [description]
     */
    activateResultsWatcher(store) {
      const { getters: { resultsWatcher } } = store;
      if (resultsWatcher) {
        resultsWatcher.events.$off();
        resultsWatcher.stop();
      }

      const settings = electronStore.get(DB.SETTINGS_RESULTS_WATCHER);
      const watcher = new ResultsWatcher(settings.folderPath, electronStore);
      watcher.start();
      watcher.events.$on('folder-checked', () => {
        store.commit('setResultsWatcher', watcher);
      });
      store.commit('setResultsWatcher', watcher);
    },
    /**
     * [activateSocketClient description]
     * @param  {[type]} store [description]
     * @return {[type]}       [description]
     */
    activateSocketClient() {
      return SocketClient.connect().then(() => {
        SynmedicoSocketHandler.init(SocketClient);
        FotoFinderSocketHandler.init(SocketClient);
        MedRequestSocketHandler.init(SocketClient);
      });
    },
    deactivateSocketClient() {
      return SocketClient.disconnect();
    },
  },
});
