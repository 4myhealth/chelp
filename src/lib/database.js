import uuid from 'uuid/v1';
import electronStore from './store';

export default {
  get SETTINGS_RESULTS_WATCHER() { return 'settings-results-watcher'; },
  get SETTINGS_FOTOFINDER() { return 'settings-fotofinder'; },
  get SETTINGS_SYNMEDICO() { return 'settings-synmedico'; },
  get SETTINGS_MED_REQUEST() { return 'settings-medrequest'; },
  get SETTINGS_SOCKET_CLIENT() { return 'settings-socket-client'; },
  get RESULTS_WATCHER_PDFS() { return 'results-watcher-pdfs'; },
  get RESULTS_DOCTORS() { return 'results-doctors'; },

  get ALL() {
    return [
      this.SETTINGS_RESULTS_WATCHER,
      this.SETTINGS_FOTOFINDER,
      this.SETTINGS_SYNMEDICO,
      this.SETTINGS_MED_REQUEST,
      this.SETTINGS_SOCKET_CLIENT,
      this.RESULTS_WATCHER_PDFS,
      this.RESULTS_DOCTORS,
    ];
  },

  /**
   * [init description]
   * @param  {[type]} electronStore [description]
   * @return {[type]}               [description]
   */
  init(reset = false) {
    if (reset) {
      this.ALL.forEach((key) => {
        electronStore.delete(key);
      });
    }
    // RESULTS WATCHER
    if (!electronStore.get(this.SETTINGS_RESULTS_WATCHER)) {
      electronStore.set(this.SETTINGS_RESULTS_WATCHER, {
        folderPath: '',
      });
    }
    if (!electronStore.get(this.RESULTS_DOCTORS)) {
      electronStore.set(this.RESULTS_DOCTORS, []);
    }

    // FOTOFINDER
    if (!electronStore.get(this.SETTINGS_FOTOFINDER)) {
      electronStore.set(this.SETTINGS_FOTOFINDER, {
        folderPath: '',
      });
    }

    // MED REQUEST
    if (!electronStore.get(this.SETTINGS_MED_REQUEST)) {
      electronStore.set(this.SETTINGS_MED_REQUEST, {
        folderPath: '',
      });
    }

    // SYNMEDICO
    if (!electronStore.get(this.SETTINGS_SYNMEDICO)) {
      electronStore.set(this.SETTINGS_SYNMEDICO, {
        folderPath: '',
        filename: '',
        programmPath: '',
      });
    }

    // SOCKET CLIENT
    if (!electronStore.get(this.SETTINGS_SOCKET_CLIENT)) {
      electronStore.set(this.SETTINGS_SOCKET_CLIENT, {
        code: uuid(),
      });
    }
  },
};
