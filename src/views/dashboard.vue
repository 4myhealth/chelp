<template lang="pug">
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
