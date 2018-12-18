<template lang="pug">
  div
    v-form
      v-layout(row, wrap)
        v-flex(xs9)
          v-text-field(label="HCS Befundordner", name="folder", type="text", v-model="settings.folderPath")
        v-flex(xs3)
          v-btn(@click="selectFolder") Wählen
          v-spacer
    v-btn(color="primary", @click="save") Speichern
</template>


<script>
import log from 'electron-log'; // eslint-disable-line
import { mapActions } from 'vuex';
import DB from '../../../lib/database';

export default {
  data() {
    return {
      settings: this.$electronStore.get(DB.SETTINGS_RESULTS_WATCHER),
    };
  },
  methods: {
    ...mapActions(['activateResultsWatcher']),
    /**
     * save settings
     * @return {[type]} [description]
     */
    save() {
      this.$electronStore.set(DB.SETTINGS_RESULTS_WATCHER, this.settings);
      this.activateResultsWatcher(this.$electronStore);
    },
    /**
     * [selectFolder description]
     * @return {[type]} [description]
     */
    selectFolder() {
      this.$electron.remote.dialog.showOpenDialog({
        properties: ['openDirectory'],
      }, (folder) => {
        if (folder) {
          this.settings.folderPath = folder[0];
        }
      });
    },
  },
};
</script>
