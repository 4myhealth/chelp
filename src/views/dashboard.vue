<template lang="pug">
  p bitte danke, gehtscho!
</template>

<script>
import { mapActions } from 'vuex';

export default {
  mounted() {
    this.setMenuActive(true);
  },
  methods: {
    ...mapActions(['setMenuActive']),
  },
};
</script>
