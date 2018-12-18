import log from 'electron-log'; // eslint-disable-line
import Promise from 'bluebird';
import iconv from 'iconv-lite';
import GDT from './gdt';
import DB from '../database';
import store from '../store';

class FotoFinderGDT extends GDT {
  /**
   * [generate description]
   * @param  {[type]} patient [description]
   * @return {[type]}         [description]
   */
  static generate(user) {
    return new Promise((resolve, reject) => {
      try {
        let totalLengthOfGDT = 0;
        const config = store.get(DB.SETTINGS_FOTOFINDER);

        const lines = [];

        let line = FotoFinderGDT.getLine('80006301');
        totalLengthOfGDT += line.length;
        lines[0] = line.line;

        lines[1] = null;


        line = FotoFinderGDT.getLine(`8315${config.gdtIdReceiver}`);
        totalLengthOfGDT += line.length;
        lines[2] = line.line;

        line = FotoFinderGDT.getLine(`8316${config.gdtIdSender}`);
        totalLengthOfGDT += line.length;
        lines[3] = line.line;

        line = FotoFinderGDT.getLine('921802.10');
        totalLengthOfGDT += line.length;
        lines[4] = line.line;

        line = FotoFinderGDT.getLine(`3000${user.User.id}`);
        totalLengthOfGDT += line.length;
        lines[5] = line.line;

        line = FotoFinderGDT.getLine(`3101${user.User.last_name}`);
        totalLengthOfGDT += line.length;
        lines[6] = line.line;

        line = FotoFinderGDT.getLine(`3102${user.User.first_name}`);
        totalLengthOfGDT += line.length;
        lines[7] = line.line;

        line = FotoFinderGDT.getLine(`3103${FotoFinderGDT.getUserBirthday(user.User.birthday, 'DDMMYYYY')}`);
        totalLengthOfGDT += line.length;
        lines[8] = line.line;

        line = FotoFinderGDT.getLine(`3106${user.User.zip} ${user.User.city}`);
        totalLengthOfGDT += line.length;
        lines[9] = line.line;

        line = FotoFinderGDT.getLine(`3107${user.User.address}`);
        totalLengthOfGDT += line.length;
        lines[10] = line.line;

        line = FotoFinderGDT.getLine(`3110${FotoFinderGDT.getUserGender(user.User.gender)}`);
        totalLengthOfGDT += line.length;
        lines[11] = line.line;

        let totalLengthOfGDTAsString = (totalLengthOfGDT + 14).toString();
        while (totalLengthOfGDTAsString.length < 5) {
          totalLengthOfGDTAsString = `0${totalLengthOfGDTAsString}`;
        }
        line = FotoFinderGDT.getLine(`8100${totalLengthOfGDTAsString}`);
        lines[1] = line.line;

        let filedata = `${lines.join('\r\n')}\r\n`;
        filedata = iconv.encode(filedata, 'ibm437');
        resolve(filedata);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * [getUserGender description]
   * @param  {[type]} gender [description]
   * @return {[type]}        [description]
   */
  static getUserGender(gender) {
    return gender === 'm' ? 1 : 2;
  }
}


export default FotoFinderGDT;
