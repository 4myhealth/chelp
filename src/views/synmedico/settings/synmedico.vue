<template lang="pug">
  v-form
    v-layout(row, wrap)
      v-flex(xs9)
        v-text-field(label="Synmedico Ordner", name="folder", type="text", v-model="settings.folderPath")
      v-flex(xs3)
        v-btn(@click="selectFolder") Wählen
        v-spacer
      v-flex(xs12)
        v-text-field(label="Dateiname", name="filename", type="text", v-model="settings.filename")
      v-flex(xs9)
        v-text-field(label="Synmedico Programm", name="folder", type="text", v-model="settings.programmPath")
      v-flex(xs3)
        v-btn(@click="selectProgramm") Wählen
        v-spacer
    v-text-field(label="GDT-ID-Sender (4 Zeichen)", name="gdtFileIdSender", v-model="settings.gdtFileIdSender", :error-messages="errors.collect('GDT-ID-Sender')", v-validate="'required|max:4|min:4'", data-vv-name="GDT-ID-Sender")
    v-text-field(label="GDT-ID-Empfänger (4 Zeichen)", name="gdtFileIdReceiver", v-model="settings.gdtFileIdReceiver", :error-messages="errors.collect('GDT-ID-Empfänger')", v-validate="'required|max:4|min:4'", data-vv-name="GDT-ID-Empfänger")
    v-text-field(label="GDT-LOCALE-ID-Sender (8 Zeichen)", name="gdtIdSender", v-model="settings.gdtIdSender", :error-messages="errors.collect('GDT-LOCALE-ID-Sender')", v-validate="'required|max:8|min:8'", data-vv-name="GDT-LOCALE-ID-Sender")
    v-text-field(label="GDT-LOCALE-ID-Empfänger (8 Zeichen)", name="gdtIdReceiver", v-model="settings.gdtIdReceiver", :error-messages="errors.collect('GDT-LOCALE-ID-Empfänger')", v-validate="'required|max:8|min:8'", data-vv-name="GDT-LOCALE-ID-Empfänger")
    v-btn(color="primary", @click="save") Speichern
</template>


<script>
import DB from '../../../lib/database';

export default {
  $_veeValidate: {
    validator: 'new',
  },
  data() {
    return {
      settings: {},
    };
  },
  methods: {
    save() {
      this.$electronStore.set(DB.SETTINGS_SYNMEDICO, this.settings);
    },
    selectFolder() {
      this.$electron.remote.dialog.showOpenDialog({
        properties: ['openDirectory'],
      }, (folder) => {
        this.settings.folderPath = folder[0];
      });
    },
    selectProgramm() {
      this.$electron.remote.dialog.showOpenDialog({
        properties: ['openFile'],
      }, (file) => {
        this.settings.programmPath = file[0];
      });
    },
  },
  mounted() {
    this.settings = this.$electronStore.get(DB.SETTINGS_SYNMEDICO);
  },
};
</script>
