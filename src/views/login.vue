<template lang="pug">
  div
    v-alert(:value="loginError", type="error") Login fehlgeschlagen
    v-form
      v-text-field(v-model="form.loginURL", label="Login-URL", :error-messages="errors.collect('loginURL')", v-validate="'required'", data-vv-name="loginURL", data-vv-as="Login-URL")
      v-text-field(v-model="form.email", :error-messages="errors.collect('login')", label="Login", v-validate="'required|email'", data-vv-name="login", data-vv-as="Login")
      v-text-field(v-model="form.password", :error-messages="errors.collect('password')", label="Passwort", v-validate="'required'", data-vv-name="password", data-vv-as="Passwort")
      v-btn(@click="submit") Login
</template>

<script>
import { mapActions } from 'vuex';
import CryptoJS from 'crypto-js';

const PASS_PHRASE = 'A8E45C27F9806E55333FB75DFD80C80317EF8CE77241DA56C21883DFAD6FB609';

export default {
  $_veeValidate: {
    validator: 'new',
  },
  data() {
    return {
      form: {
        loginURL: '',
        email: '',
        password: '',
      },
      loginError: false,
    };
  },
  methods: {
    ...mapActions(['setMenuActive']),
    /**
     * [saveLoginData description]
     * @return {[type]} [description]
     */
    saveLoginData() {
      const data = CryptoJS.AES.encrypt(JSON.stringify(this.form), PASS_PHRASE).toString();
      this.$electronStore.set('login-form', data);
    },
    /**
     * [submit description]
     * @return {[type]} [description]
     */
    async submit() {
      const valid = await this.$validator.validateAll();
      if (valid) {
        try {
          this.saveLoginData();
          const formData = new FormData();
          formData.append('data[User][email]', this.form.login);
          formData.append('data[User][password]', this.form.password);

          const response = await this.$axios.post(this.form.loginURL, formData, {
            headers: {
              FileMaker: 'true',
            }
          });
          this.setMenuActive(true);
          this.loginError = false;
        } catch (err) {
          // do nothing, outer return handles this error
        }
        this.loginError = true;
      }
    },
  },
  /**
   * [mounted description]
   * @return {[type]} [description]
   */
  mounted() {
    this.setMenuActive(false);
    if (!this.$electronStore.get('login-form')) {
      this.saveLoginData();
    }
    this.form = JSON.parse(CryptoJS.AES.decrypt(this.$electronStore.get('login-form'), PASS_PHRASE).toString(CryptoJS.enc.Utf8));
  },
};
</script>
