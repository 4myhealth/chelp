import log from 'electron-log';
import io from 'socket.io-client';
import _ from 'lodash';
import electronStore from './store';
import DB from './database';
import EventBus from './event-bus';
import Event from './event';

/**
 * [ServiceSocketClient description]
 */
class ServiceSocketClient {
  /**
   * [constructor description]
   */
  constructor() {
    if (!ServiceSocketClient.instance) {
      this.socket = null;
      ServiceSocketClient.instance = this;
    }
    return ServiceSocketClient.instance;
  }

  /**
   * [connect description]
   * @return {[type]} [description]
   */
  connect() {
    return new Promise((resolve, reject) => {
      const config = electronStore.get(DB.SETTINGS_SOCKET_CLIENT);
      try {
        log.info('SocketClient - try to connect:', config);
        let valid = true;
        _.forEach([config.server, config.port, config.endPoint], (value) => {
          if (!value) {
            valid = false;
          }
        });

        if (!valid) {
          log.error('SocketClient - cant connect to:', config);
          reject(new Error('Need SocketClient Config.'));
          return;
        }

        this.socket = io(`${config.server}:${config.port}/${config.endPoint}`, { rejectUnauthorized: false });

        this.socket.on('reconnect_failed', () => {
          reject(new Error(`cant connect to server: ${config.server}:${config.port}/${config.endPoint}`));
        });

        this.socket.on('connect', () => {
          log.info('SocketClient - connected to:', config);
          resolve();
          this.socket.emit('join', config.applicationId, config.code);
          EventBus.$emit(Event.INIT_MED_REQUEST_SOCKET_HANDLER);
          EventBus.$emit(Event.INIT_FOTO_FINDER_SOCKET_HANDLER);
          EventBus.$emit(Event.INIT_SYNMEDICO_SOCKET_HANDLER);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * [disconnect description]
   * @return {[type]} [description]
   */
  disconnect() {
    return new Promise((resolve) => {
      this.socket.once('disconnect', () => {
        resolve();
      });
      this.socket.disconnect();
    });
  }

  get connected() { return this.socket && this.socket.connected; }
}

const instance = new ServiceSocketClient();

export default instance;
