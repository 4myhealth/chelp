<template lang="pug">
  div
    v-data-table(:headers="headers", :items="results", item-key="filename", :pagination.sync="pagination")
      template(slot="items", slot-scope="props")
        tr(@click="props.expanded = !props.expanded")
          td {{props.item.filename}}
          td {{props.item.date}}
          td
            span.circle(:class="{green:isStatusActive(props.item, Upload.STATUS_UPLOAD_SUCCESS), red:!isStatusActive(props.item, Upload.STATUS_UPLOAD_SUCCESS)}")
            v-btn(@click="upload(props.item)", flat, small) Upload
      template(slot="expand", slot-scope="props")
        v-list
          v-list-tile(v-for="(errorData, index) in props.item.errors", :key="index")
            v-list-tile-content
              v-list-tile-title {{errorData.date}}
              v-list-tile-sub-title {{errorData.message}}
</template>

<script>
import { mapGetters } from 'vuex';
import Upload from '../../lib/results-watcher/upload';

export default {
  data() {
    return {
      Upload,
      pagination: {
        rowsPerPage: 10,
      },
      headers: [
        { text: 'Datei', value: 'filename' },
        { text: 'Datum', value: 'date' },
        { text: 'Status', value: 'status' },
      ],
    };
  },
  computed: {
    ...mapGetters(['resultsWatcher']),
    results() {
      return Object.keys(this.resultsWatcher.results).map(key => this.resultsWatcher.results[key]);
    },
  },
  methods: {
    isStatusActive(result, status) {
      return result.status === status;
    },
    upload(file) {
      file.forceUpload();
    },
  },
};
</script>


<style>
  .circle {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: inline-block;
    opacity: .9;
  }
</style>
