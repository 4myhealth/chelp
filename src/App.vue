<template lang="pug">
  v-app
    v-navigation-drawer(app, :value="isActive", stateless)
      v-toolbar(flat)
        v-list
          v-list-tile
            v-list-tile-title.title cHelp
      v-divider
      v-list.pt-0
        v-list-group(no-action, prepend-icon="settings")
          v-list-tile(slot="activator")
            v-list-tile-content
              v-list-tile-title Allgemeine Einstellungen
          v-list-tile(@click="goto('page-socket-client-settings')")
            v-list-tile-content
              v-list-tile-title Socket-Client
        v-list-group(no-action)
          v-list-tile(slot="activator")
            v-list-tile-content
              v-list-tile-title HCS-Watcher
          v-list-tile(@click="goto('page-results-settings')")
            v-list-tile-content
              v-list-tile-title Einstellungen
          v-list-tile(@click="goto('page-results-doctors')")
            v-list-tile-content
              v-list-tile-title Ärzte
          v-list-tile(@click="goto('page-results-uploads')")
            v-list-tile-content
              v-list-tile-title Uploads
        v-list-group(no-action)
          v-list-tile(slot="activator")
            v-list-tile-content
              v-list-tile-title MedRequest
          v-list-tile(@click="goto('page-med-request-settings')")
            v-list-tile-content
              v-list-tile-title Einstellungen
        v-list-group(no-action)
          v-list-tile(slot="activator")
            v-list-tile-content
              v-list-tile-title FotoFinder
          v-list-tile(@click="goto('page-fotofinder-settings')")
            v-list-tile-content
              v-list-tile-title Einstellungen
        v-list-group(no-action)
          v-list-tile(slot="activator")
            v-list-tile-content
              v-list-tile-title SYNMEDICO
          v-list-tile(@click="goto('page-synmedico-settings')")
            v-list-tile-content
              v-list-tile-title Einstellungen
    v-content
      v-container(fluid)
        router-view
    v-footer(app)
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import DB from './lib/database';

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      isActive: 'isMenuActive',
    }),
  },
  created() {
    DB.init();
    this.activateResultsWatcher();
    this.activateSocketClient();
  },
  methods: {
    goto(page) {
      this.$router.push({ name: page });
    },
    ...mapActions(['activateResultsWatcher', 'activateSocketClient']),
  },
};
</script>
