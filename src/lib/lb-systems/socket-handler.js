import log from 'electron-log'; // eslint-disable-line
import childProcess from 'child_process';
import fs from 'fs';
import path from 'path';
import GDT from '../gdt/lb-systems';
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
    ServiceSocketClient.socket.on('Socket::START_LB_SYSTEMS', SocketHandler.generateFile);
  }

  /**
   * [generateFile description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  static generateFile(data) {
    log.info('LB-SYSTEMS -> received data:', data);
    GDT.generate(data.user).then((fileString) => {
      const settings = store.get(DB.SETTINGS_LB_SYSTEMS);
      log.info('LB-SYSTEMS -> settings', settings);
      const filePath = path.join(settings.folderPath, `${settings.filename}`);
      log.info('LB-SYSTEMS -> path to save', filePath);
      fs.writeFile(filePath, fileString, () => {
        log.info('LB-SYSTEMS -> file written');
        log.info('LB-SYSTEMS -> file data', fileString);
        childProcess.execFile(settings.programmPath, (error, stdout, stderr) => {
          log.info(error, stdout, stderr);
        });
      });
    });
  }
}

export default SocketHandler;
