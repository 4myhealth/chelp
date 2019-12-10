import log from 'electron-log'; // eslint-disable-line
import childProcess from 'child_process';
import fs from 'fs';
import path from 'path';
import GDT from '../gdt/synmedico';
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
    log.info('listen for Socket::START_SYNMEDICO');
    ServiceSocketClient.socket.on('Socket::START_SYNMEDICO', SocketHandler.generateFile);
  }

  /**
   * [generateFile description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  static generateFile(data) {
    log.info('SYNMEDICO -> received data:', data);
    GDT.generate(data.user).then((fileString) => {
      const settings = store.get(DB.SETTINGS_SYNMEDICO);
      log.info('SYNMEDICO -> settings', settings);
      const filePath = path.join(settings.folderPath, `${settings.filename}`);
      log.info('SYNMEDICO -> path to save', filePath);
      fs.writeFile(filePath, fileString, () => {
        log.info('SYNMEDICO -> file written');
        log.info('SYNMEDICO -> file data', fileString);
        childProcess.execFile(settings.programmPath, (error, stdout, stderr) => {
          log.info(error, stdout, stderr);
        });
      });
    });
  }
}

export default SocketHandler;
