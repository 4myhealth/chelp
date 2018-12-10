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
  import DBConstants from '../../../../../lib/database/db-constants';
  import HcsWatcher from '../../../../../lib/hcs-watcher/hcs-watcher';

  export default {
    /**
     * [data description]
     * @return {[type]} [description]
     */
    data() {
      return {
        settings: DBConstants.generateDefaultSettingsHCSWatcher(),
      };
    },
    methods: {
      /**
       * save settings
       * @return {[type]} [description]
       */
      save() {
        this.$electronStore.set(DBConstants.KEY_SETTINGS_HCS_WATCHER, this.settings);

        if (!HcsWatcher.isWatcherActive()) {
          HcsWatcher.initFileWatcher(this.settings.folderPath);
        }
      },
      /**
       * [selectFolder description]
       * @return {[type]} [description]
       */
      selectFolder() {
        this.$electron.remote.dialog.showOpenDialog({
          properties: ['openDirectory'],
        }, (folder) => {
          this.settings.folderPath = folder[0];
        });
      },
    },
    mounted() {
      this.settings = this.$electronStore.get(DBConstants.KEY_SETTINGS_HCS_WATCHER);
    },
  };
</script>
