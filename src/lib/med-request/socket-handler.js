import log from 'electron-log'; // eslint-disable-line
import fs from 'fs';
import path from 'path';
import MedRequestFile from './med-request-file';
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
    ServiceSocketClient.socket.on('Socket::START_MED_REQUEST', (data) => {
      MedRequestFile.generate(data.user).then((stringBuffer) => {
        const { folderPath } = store.get(DB.SETTINGS_MED_REQUEST);
        log.info('path to save', path.join(folderPath, 'LabAnf.txt'));
        fs.writeFile(path.join(folderPath, 'LabAnf.txt'), stringBuffer, () => {
          log.info('MedRequestFile written');
        });
      });
    });
  }
}

export default SocketHandler;
