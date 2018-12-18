<template lang="pug">
  div
    v-form
      v-layout(row, wrap)
        v-flex(xs9)
          v-text-field(label="MedRequest Ordner", name="folder", type="text", v-model="settings.folderPath")
        v-flex(xs3)
          v-btn(@click="selectFolder") Wählen
          v-spacer
    v-btn(color="primary", @click="save") Speichern
</template>


<script>
import log from 'electron-log'; // eslint-disable-line
import DB from '../../../lib/database';

export default {
  data() {
    return {
      settings: {},
    };
  },
  mounted() {
    this.settings = this.$electronStore.get(DB.SETTINGS_MED_REQUEST);
  },
  methods: {
    /**
     * [save description]
     * @return {[type]} [description]
     */
    save() {
      this.$electronStore.set(DB.SETTINGS_MED_REQUEST, this.settings);
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
};
</script>
