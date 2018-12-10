<template lang="pug">
  div
    v-data-table(:headers="headers", :items="uploadsAsArray", hide-actions, item-key="file")
      template(slot="items", slot-scope="props")
        tr(@click="props.expanded = !props.expanded")
          td {{props.item.file}}
          td
            span.circle(:class="{green:props.item.uploaded, red:!props.item.uploaded}")
      template(slot="expand", slot-scope="props")
        v-list
          v-list-tile(v-for="(errorData, index) in props.item.errors", :key="index")
            v-list-tile-content
              v-list-tile-title {{getErrorDateFormatted(errorData.dateTime)}}
              v-list-tile-sub-title {{errorData.message}}
</template>

<script>
  export default {
    data() {
      return {
        headers: [
          { text: 'Datei', value: 'file' },
          { text: 'Status', value: 'uploaded' },
        ],
      };
    },
    methods: {
    }
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
