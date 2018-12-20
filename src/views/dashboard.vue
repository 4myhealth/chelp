<template lang="pug">
  p da sollte was sein! und update????
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
