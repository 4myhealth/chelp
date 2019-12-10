import log from 'electron-log'; // eslint-disable-line
import fs from 'fs';
import path from 'path';
import GDT from '../gdt/fotofinder';
import DB from '../database';
import store from '../store';

/**
 * [SocketHandler description]
 */
class SocketHandler {
  /**
   * [init description]
   * @param  {[type]} ServiceSocketClient [description]
   * @return {[type]}                     [description]
   */
  static init(ServiceSocketClient) {
    log.info('listen for Socket::START_FOTO_FINDER');
    ServiceSocketClient.socket.on('Socket::START_FOTO_FINDER', SocketHandler.generateFile);
  }

  /**
   * [generateFile description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  static generateFile(data) {
    log.info('try Socket::START_FOTO_FINDER');
    try {
      GDT.generate(data.user).then((fileString) => {
        const settings = store.get(DB.SETTINGS_FOTOFINDER);
        const filePath = path.join(settings.folderPath, `${settings.gdtFileIdReceiver}${settings.gdtFileIdSender}`);
        log.info('path to save', filePath);
        fs.writeFile(filePath, fileString, () => {
          log.info('FotoFinder file written');
        });
      });
    } catch (err) {
      log.error(err);
    }
  }
}

export default SocketHandler;
