import fs from 'fs';
import _ from 'lodash';
import log from 'electron-log'; // eslint-disable-line

class ResultFileHeader {
  static get PATIENT() { return 'NAD+PAT'; }

  static get UNB() { return 'UNB'; }

  static get BGM() { return 'BGM'; }

  static get UNH() { return 'UNH'; }

  /**
   * [constructor description]
   * @param  {[type]} filePath [description]
   * @return {[type]}          [description]
   */
  constructor(filePath) {
    this.headers = [];
    this.fileBuffer = null;
    try {
      this.fileBuffer = fs.readFileSync(filePath);
    } catch (err) {
      throw new Error('Datei konnte nicht geladen werden.');
    }
    const fileAsString = this.fileBuffer.toString();
    const headerBreakPoint = fileAsString.indexOf('\n');

    if (headerBreakPoint <= 0) {
      throw new Error('Keine gültigen Dateiheader vorhanden');
    }

    this.headers = fileAsString.substring(0, headerBreakPoint).split('\'');
  }

  /**
   * [patient description]
   * @return {[type]} [description]
   */
  get patient() {
    const NAMEINDEX = 3;
    const patient = {};
    let foundHeader = _.find(this.headers, o => o.indexOf(ResultFileHeader.PATIENT) === 0);
    if (!foundHeader) {
      throw new Error('Falsche Headerdaten. Keine oder Mehrfachpatienten vorhanden');
    }
    let header = foundHeader.split('+');
    const namePhrases = header[NAMEINDEX].split(':');

    patient.lastName = namePhrases[0];
    patient.firstName = namePhrases[1];
    patient.title = namePhrases[2];
    patient.address = namePhrases[3];

    foundHeader = _.find(this.headers, o => o.indexOf(ResultFileHeader.BGM) === 0);
    if (!foundHeader) {
      throw new Error('Falsche Headerdaten. Keine oder Mehrfachpatienten vorhanden');
    }
    header = foundHeader.split('+');

    patient.insuranceNumber = header[6];
    patient.birthday = header[7];

    return patient;
  }

  get MENumber() {
    const MENUMBERINDEX = 3;
    const foundHeader = _.find(this.headers, o => o.indexOf(ResultFileHeader.UNB) === 0);
    if (!foundHeader) {
      throw new Error('Falsche Headerdaten. Keine Infoheader vorhanden');
    }
    const header = foundHeader.split('+');
    return header[MENUMBERINDEX];
  }

  get laboratoryMENumber() {
    const MENUMBERINDEX = 2;
    const foundHeader = _.find(this.headers, o => o.indexOf(ResultFileHeader.UNB) === 0);
    if (!foundHeader) {
      throw new Error('Falsche Headerdaten. Keine Infoheader vorhanden');
    }
    const header = foundHeader.split('+');
    return header[MENUMBERINDEX];
  }

  get resultDate() {
    const INDEX = 4;
    const foundHeader = _.find(this.headers, o => o.indexOf(ResultFileHeader.BGM) === 0);
    if (!foundHeader) {
      throw new Error('Falsche Headerdaten. Keine Infoheader vorhanden');
    }
    const header = foundHeader.split('+');
    return header[INDEX];
  }

  get referenceNumber() {
    const INDEX = 1;
    const foundHeader = _.find(this.headers, o => o.indexOf(ResultFileHeader.UNH) === 0);
    if (!foundHeader) {
      throw new Error('Falsche Headerdaten. Keine Infoheader vorhanden');
    }
    const header = foundHeader.split('+');
    return header[INDEX];
  }

  get subjectCode() {
    const INDEX = 1;
    const foundHeader = _.find(this.headers, o => o.indexOf(ResultFileHeader.BGM) === 0);
    if (!foundHeader) {
      throw new Error('Falsche Headerdaten. Keine Infoheader vorhanden');
    }
    const header = foundHeader.split('+');
    return header[INDEX];
  }
}


export default ResultFileHeader;
