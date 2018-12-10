<template lang="pug">
  v-dialog(v-model="show")
    v-card
      v-card-title Arzt
      v-card-text
        v-form
          v-text-field(label="Vorname", name="firstName", type="text", v-model="doctor.firstName")
          v-text-field(label="Nachname", name="lastName", type="text", v-model="doctor.lastName")
          v-text-field(label="ME-Nummer", name="meNumber", type="text", v-model="doctor.meNumber")
          v-text-field(label="Upload-URL", name="uploadURL", type="url", v-model="doctor.uploadURL")
      v-card-actions
        v-btn(color="error", @click="abort") Abbrechen
        v-btn(color="primary", @click="save") Speichern
</template>

<script>
  import log from 'electron-log'; // eslint-disable-line

  export default {
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      doctor: {
        type: Object,
        default: {},
      },
    },
    methods: {
      abort() {
        this.$emit('update:show', false);
      },
      save() {
        this.$emit('savedoctor');
      },
    },
  };
</script>
