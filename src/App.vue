<template lang="pug">
  v-app
    v-navigation-drawer(app, :value="isActive", stateless)
      v-toolbar(flat)
        v-list
          v-list-tile
            v-list-tile-title.title cHelp
      v-divider
    v-content
      v-container(fluid)
        router-view
    v-footer(app)
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      isActive: 'isMenuActive',
    }),
  },
};
</script>
