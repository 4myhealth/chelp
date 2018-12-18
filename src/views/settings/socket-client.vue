<template lang="pug">
  div
    v-form
      v-text-field(label="Server", name="server", type="text", v-model="settings.server")
      v-text-field(label="Port", name="port", type="number", v-model="settings.port")
      v-text-field(label="Endpunkt", name="endpoint", type="text", v-model="settings.endPoint")
      v-text-field(label="Code", name="code", type="text", v-model="settings.code", disabled)
      v-text-field(label="Applikations-ID", name="applicationid", type="text", v-model="settings.applicationId")
    v-btn(color="primary", @click="save") Speichern
    p
      label Status
      span {{isConnected}}
    div
      v-btn(@click="disconnect") Trennen
      v-btn(@click="connect") Verbinden
</template>

<script>
import { mapActions } from 'vuex';
import log from 'electron-log'; // eslint-disable-line
import DB from '../../lib/database';
import SocketClient from '../../lib/service-socket-client';

export default {
  /**
   * [data description]
   * @return {[type]} [description]
   */
  data() {
    return {
      settings: {},
      isConnected: false,
    };
  },
  /**
   * [mounted description]
   * @return {[type]} [description]
   */
  mounted() {
    this.settings = this.$electronStore.get(DB.SETTINGS_SOCKET_CLIENT);
    this.setSocketStatus();
  },
  methods: {
    ...mapActions(['activateSocketClient', 'deactivateSocketClient']),
    /**
     * [save description]
     * @return {[type]} [description]
     */
    save() {
      this.$electronStore.set(DB.SETTINGS_SOCKET_CLIENT, this.settings);
    },
    /**
     * [disconnect description]
     * @return {[type]} [description]
     */
    disconnect() {
      this.deactivateSocketClient().then(this.setSocketStatus);
    },
    /**
     * [connect description]
     * @return {[type]} [description]
     */
    connect() {
      this.activateSocketClient().then(this.setSocketStatus);
    },
    socketStatus() {
      return SocketClient.connected;
    },
    setSocketStatus() {
      this.isConnected = this.socketStatus();
    },
  },
};
</script>
