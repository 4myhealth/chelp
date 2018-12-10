<template lang="pug">
  v-form
    v-text-field(v-model="form.loginPath", label="Login-URL")
    v-text-field(v-model="form.email", :error-messages="errors.collect('login')", label="Login", v-validate="'required|email'", data-vv-name="login", data-vv-as="Login")
    v-text-field(v-model="form.password", :error-messages="errors.collect('password')", label="Passwort", v-validate="'required'", data-vv-name="password", data-vv-as="Passwort")
    v-btn(@click="submit") Login
</template>

<script>
import { mapActions } from 'vuex';
import AES from 'crypto-js/aes';
const PASS_PHRASE = 'A8E45C27F9806E55333FB75DFD80C80317EF8CE77241DA56C21883DFAD6FB609';

export default {
  $_veeValidate: {
    validator: 'new',
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions(['setMenuActive']),
    /**
     * [submit description]
     * @return {[type]} [description]
     */
    async submit () {
      const valid = await this.$validator.validateAll();
      if ( valid ) {

        this.setMenuActive(true);
      }
    },
  },
  /**
   * [mounted description]
   * @return {[type]} [description]
   */
  mounted() {
    this.setMenuActive(false);
    this.form = this.$electronStore.get('login-form', this.form);
    this.form.password = AES.decrypt(this.form.password, PASS_PHRASE);
  },
};
</script>
