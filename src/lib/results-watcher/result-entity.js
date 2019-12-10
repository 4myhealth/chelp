import _ from 'lodash';
import electronStore from '../store';
import Upload from './upload';
import ResultFileHeader from './result-file-header';
import DB from '../database';

const maxErrorItems = 20;


class ResultEntity {
  /**
   * [constructor description]
   * @param {[type]} filename [description]
   */
  constructor(data = {}) {
    const dataCopy = Object.assign({}, data);
    this.iFilename = null;
    this.iUploads = [];
    this.iPath = null;
    this.iErrors = [];

    // remove status from given date,
    // cuz status is a getter only function based on given uploads array
    if (dataCopy.status) {
      delete dataCopy.status;
    }

    Object.assign(this, dataCopy);

    if (!this.filename) {
      throw new Error('Filename is needed');
    }

    if (!this.path) {
      throw new Error('path is needed');
    }

    if (this.uploads.length === 0) {
      this.uploads.push(new Upload({ filename: this.filename, path: this.path }));
    }
  }

  async forceUpload() {
    try {
      const resultFileHeader = new ResultFileHeader(this.fullPath);
      const doctors = electronStore.get(DB.RESULTS_DOCTORS);
      const doctor = _.find(doctors, docInArray => docInArray.meNumber === resultFileHeader.MENumber);

      if (!doctor) {
        throw new Error(`Kein passender Arzt mit der ME-Nummer: ${resultFileHeader.MENumber} gefunden.`);
      }

      if (!doctor.uploadURL) {
        throw new Error('Keinen Server eingetragen. File kann nicht auf den Server geladen werden.');
      }

      return this.upload({
        doctor,
        resultFileHeader,
      });
    } catch (err) {
      if (this.iErrors.length >= maxErrorItems) {
        this.iErrors.splice(0, this.iErrors.length - maxErrorItems + 1);
      }
      this.iErrors.push({
        date: new Date().toString(),
        message: err.toString(),
      });
    }
  }

  /**
   * [upload description]
   * @return {[type]} [description]
   */
  upload() {
    let upload = this.uploads[this.uploads.length - 1];
    if (upload.status !== Upload.STATUS_NOT_UPLOADED) {
      upload = new Upload({ filename: this.filename, path: this.path });
      this.uploads.push(upload);
    }
    try {
      const resultFileHeader = new ResultFileHeader(this.fullPath);
      const doctors = electronStore.get(DB.RESULTS_DOCTORS);
      const doctor = _.find(doctors, docInArray => docInArray.meNumber === resultFileHeader.MENumber);

      if (!doctor) {
        throw new Error(`Kein passender Arzt mit der ME-Nummer: ${resultFileHeader.MENumber} gefunden.`);
      }

      if (!doctor.uploadURL) {
        throw new Error('Keinen Server eingetragen. File kann nicht auf den Server geladen werden.');
      }

      return upload.upload({
        doctor,
        resultFileHeader,
      });
    } catch (err) {
      if (this.iErrors.length >= maxErrorItems) {
        this.iErrors.splice(0, this.iErrors.length - maxErrorItems + 1);
      }
      this.iErrors.push({
        date: new Date().toString(),
        message: err.toString(),
      });
    }
    return Promise.reject(new Error('error handled wo anders'));
  }

  /**
   * [filename description]
   * @return {[type]} [description]
   */
  get filename() { return this.iFilename; }

  /**
   * [filename description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  set filename(value) { this.iFilename = value; }

  /**
   * [path description]
   * @return {[type]} [description]
   */
  get path() { return this.iPath; }

  /**
   * [path description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  set path(value) { this.iPath = value; }

  /**
   * [uploads description]
   * @return {[type]} [description]
   */
  get uploads() { return this.iUploads; }

  /**
   * [uploads description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  set uploads(value) {
    if (!Array.isArray(value)) {
      throw new Error('Value is not an array');
    }
    value.forEach((upload) => {
      if (upload.constructor !== Upload) {
        this.iUploads.push(new Upload(upload));
      } else {
        this.iUploads.push(upload);
      }
    });
  }

  /**
   * [status description]
   * @return {[type]} [description]
   */
  get status() {
    return this.uploads[this.uploads.length - 1].status;
  }

  /**
   * [uploadTries description]
   * @return {[type]} [description]
   */
  get uploadTries() { return this.uploads.length; }

  /**
   * [fullPath description]
   * @return {[type]} [description]
   */
  get fullPath() { return `${this.path}/${this.filename}`; }

  /**
   * [errors description]
   * @return {[type]} [description]
   */
  get errors() {
    return [
      ...this.iErrors,
      ...this.uploads.map(upload => upload.error),
    ].filter(error => !!error);
  }

  /**
   * [toJSON description]
   * @return {[type]} [description]
   */
  toJSON() {
    return {
      filename: this.filename,
      status: this.status,
      path: this.path,
      uploads: this.uploads,
      iErrors: this.iErrors,
    };
  }
}

export default ResultEntity;
