<template lang="pug">
</template>

<script>
import { mapActions } from 'vuex';
export default {
  methods:{
    ...mapActions(['setMenuActive']),
  },
  mounted() {
    this.setMenuActive(true);
  },
};
</script>
