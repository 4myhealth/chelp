<template lang="pug">
  div
    v-btn(fab, dark, small, color="primary", @click="addDoctor")
      v-icon add
    v-data-table(:headers="headers", :items="doctors", hide-actions)
      template(slot="items", slot-scope="props")
        td {{props.item.firstName}}
        td {{props.item.lastName}}
        td {{props.item.meNumber}}
        td {{props.item.uploadURL}}
        td
          v-btn(@click="editDoctor(props.item)", flat, icon, small)
            v-icon edit
    modal-edit(:show.sync="showDialog", :doctor="doctor", v-on:savedoctor="save")
</template>


<script>
  import log from 'electron-log'; // eslint-disable-line
  import _ from 'lodash'; // eslint-disable-line
  import DBConstants from '../../../../../lib/database/db-constants.js';

  const ModalEdit = () => import('./doctors/modal-edit.vue');

  export default {
    data() {
      return {
        doctors: DBConstants.generateDefaultHCSWachterDoctors(),
        showDialog: false,
        doctor: this.generateDefaultDoctor(),
        headers: [
          { text: 'Vorname', value: 'firstName' },
          { text: 'Nachname', value: 'lastName' },
          { text: 'ME-Nummer', value: 'meNumber' },
          { text: 'Upload-URL', value: 'uploadURL' },
        ],
      };
    },
    methods: {
      generateDefaultDoctor() {
        return {
          first_name: '',
          last_name: '',
          meNumber: '',
          uploadURL: '',
        };
      },
      /**
       * [addDoctor description]
       */
      addDoctor() {
        this.doctor = this.generateDefaultDoctor();
        this.showDialog = true;
      },
      editDoctor(doctor) {
        this.doctor = doctor;
        this.showDialog = true;
      },
      /**
       * [saveDoctor description]
       * @return {[type]} [description]
       */
      save() {
        this.showDialog = false;
        if (_.indexOf(this.doctors, this.doctor) === -1) {
          this.doctors.push(this.doctor);
        }
        this.saveDataToDb();
      },
      /**
       * [saveDataToDb description]
       * @return {[type]} [description]
       */
      saveDataToDb() {
        this.$electronStore.set(DBConstants.KEY_HCS_WATCHER_DOCTORS, this.doctors);
      },
    },
    mounted() {
      this.doctors = this.$electronStore.get(DBConstants.KEY_HCS_WATCHER_DOCTORS);
    },
    components: {
      ModalEdit,
    },
  };
</script>
