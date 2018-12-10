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
          v-list-tile(@click="goto('page-settings-email')")
            v-list-tile-content
              v-list-tile-title Notifikation/E-Mail
          v-list-tile(@click="goto('page-settings-socket-client')")
            v-list-tile-content
              v-list-tile-title Socket-Client
        v-list-group(no-action)
          v-list-tile(slot="activator")
            v-list-tile-content
              v-list-tile-title HCS-Watcher
          v-list-tile(@click="goto('page-settings-hcs-watcher')")
            v-list-tile-content
              v-list-tile-title Einstellungen
          v-list-tile(@click="goto('page-settings-hcs-doctors')")
            v-list-tile-content
              v-list-tile-title Ärzte
          v-list-tile(@click="goto('page-hcs-uploads')")
            v-list-tile-content
              v-list-tile-title Uploads
        v-list-group(no-action)
          v-list-tile(slot="activator")
            v-list-tile-content
              v-list-tile-title MedRequest
          v-list-tile(@click="goto('page-settings-med-request')")
            v-list-tile-content
              v-list-tile-title Einstellungen
        v-list-group(no-action)
          v-list-tile(slot="activator")
            v-list-tile-content
              v-list-tile-title FotoFinder
          v-list-tile(@click="goto('page-settings-fotofinder')")
            v-list-tile-content
              v-list-tile-title Einstellungen
        v-list-group(no-action)
          v-list-tile(slot="activator")
            v-list-tile-content
              v-list-tile-title SYNMEDICO
          v-list-tile(@click="goto('page-settings-synmedico')")
            v-list-tile-content
              v-list-tile-title Einstellungen
    v-content
      v-container(fluid)
        router-view
    v-footer(app)
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'App',
  methods: {
    goto(page) {
      this.$router.push({ name: page });
    },
  },
  computed: {
    ...mapGetters({
      isActive: 'isMenuActive',
    }),
  },
};
</script>
