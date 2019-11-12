import log from 'electron-log';
import iconv from 'iconv-lite';
import GDT from './gdt';
import DB from '../database';
import store from '../store';

class SynMedicoGDT extends GDT {
  /**
   * [generate description]
   * @param  {[type]} data [description]
   * @return {[type]}         [description]
   */
  static generate(user) {
    return new Promise((resolve, reject) => {
      try {
        log.info('SYNMEDICO -> Try to generate synmedico gdt file');
        let totalLengthOfGDT = 0;
        const config = store.get(DB.SETTINGS_SYNMEDICO);
        const lines = [];

        let line = SynMedicoGDT.getLine('80006301');
        totalLengthOfGDT += line.length;
        lines[0] = line.line;

        lines[1] = null;

        line = SynMedicoGDT.getLine(`8315${config.gdtIdReceiver || ''}`);
        totalLengthOfGDT += line.length;
        lines[2] = line.line;

        line = SynMedicoGDT.getLine(`8316${config.gdtIdSender || ''}`);
        totalLengthOfGDT += line.length;
        lines[3] = line.line;

        line = SynMedicoGDT.getLine('92063');
        totalLengthOfGDT += line.length;
        lines[4] = line.line;

        line = SynMedicoGDT.getLine('921803.00');
        totalLengthOfGDT += line.length;
        lines[5] = line.line;

        line = SynMedicoGDT.getLine(`3000${user.User.id}`);
        totalLengthOfGDT += line.length;
        lines[6] = line.line;

        line = SynMedicoGDT.getLine(`3101${user.User.last_name}`);
        totalLengthOfGDT += line.length;
        lines[7] = line.line;

        line = SynMedicoGDT.getLine(`3102${user.User.first_name}`);
        totalLengthOfGDT += line.length;
        lines[8] = line.line;

        line = SynMedicoGDT.getLine(`3110${SynMedicoGDT.getUserGender(user.User.gender)}`);
        totalLengthOfGDT += line.length;
        lines[9] = line.line;

        line = SynMedicoGDT.getLine(`3103${SynMedicoGDT.getUserBirthday(user.User.birthday, 'DDMMYYYY')}`);
        totalLengthOfGDT += line.length;
        lines[10] = line.line;

        line = SynMedicoGDT.getLine(`3104${user.User.title || ''}`);
        totalLengthOfGDT += line.length;
        lines[11] = line.line;

        line = SynMedicoGDT.getLine(`3105${SynMedicoGDT.getUserInsuranceNumber(user)}`);
        totalLengthOfGDT += line.length;
        lines[12] = line.line;

        line = SynMedicoGDT.getLine(`3106${user.User.zip} ${user.User.city}`);
        totalLengthOfGDT += line.length;
        lines[13] = line.line;

        line = SynMedicoGDT.getLine(`3113${user.User.city}`);
        totalLengthOfGDT += line.length;
        lines[14] = line.line;

        line = SynMedicoGDT.getLine(`3107${user.User.address}`);
        totalLengthOfGDT += line.length;
        lines[15] = line.line;

        line = SynMedicoGDT.getLine(`3112${user.User.zip}`);
        totalLengthOfGDT += line.length;
        lines[16] = line.line;

        line = SynMedicoGDT.getLine(`3626${SynMedicoGDT.getUserPhone(user.User) || ''}`);
        totalLengthOfGDT += line.length;
        lines[17] = line.line;


        let totalLengthOfGDTAsString = (totalLengthOfGDT + 14).toString();
        while (totalLengthOfGDTAsString.length < 5) {
          totalLengthOfGDTAsString = `0${totalLengthOfGDTAsString}`;
        }
        line = SynMedicoGDT.getLine(`8100${totalLengthOfGDTAsString}`);
        lines[1] = line.line;

        let filedata = `${lines.join('\r\n')}\r\n`;
        filedata = iconv.encode(filedata, 'utf8');
        resolve(filedata);
      } catch (err) {
        reject(err);
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


export default SynMedicoGDT;


/*
#Identifikationsnummer des Patienten = 3000
#Vorname des Patienten = 3102
#Nachname des Patienten = 3101
#Geburtstag = 3103
#Straﬂe = 3107
#Postleitzahl #Ort = 3106
#Versicherungsstatus = 4112
#Name der Krankenkasse =3737
#Nummer der Krankenkasse = 4104
#Versichertennummer des Patienten = 3105
*/
