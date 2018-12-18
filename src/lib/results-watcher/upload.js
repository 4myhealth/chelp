import moment from 'moment';
import fs from 'fs';

class Upload {
  /**
   * [Upload description]
   * @type {[type]}
   */
  static get STATUS_NOT_UPLOADED() { return 'Upload::STATUS_NOT_UPLOADED'; }

  /**
   * [Upload description]
   * @type {[type]}
   */
  static get STATUS_UPLOAD_ERROR() { return 'Upload:STATUS_UPLOAD_ERROR'; }

  /**
   * [Upload description]
   * @type {[type]}
   */
  static get STATUS_UPLOAD_SUCCESS() { return 'Upload::STATUS_UPLOAD_SUCCESS'; }

  /**
   * [iStatus description]
   * @type {[type]}
   */
  static get AVAILABLE_STATIS() {
    return [
      Upload.STATUS_NOT_UPLOADED,
      Upload.STATUS_UPLOAD_ERROR,
      Upload.STATUS_UPLOAD_SUCCESS,
    ];
  }

  /**
   * [constructor description]
   * @param {[type]} resultEntity [description]
   */
  constructor(data = {}) {
    this.iStatus = Upload.STATUS_NOT_UPLOADED;
    this.iDate = new Date();
    this.iFilename = null;
    this.iPath = null;
    this.error = null;

    Object.assign(this, data);

    if (!this.filename) {
      throw new Error('Filename is needed');
    }

    if (!this.path) {
      throw new Error('path is needed');
    }
  }

  upload({ resultFileHeader, doctor }) {
    const formData = new FormData();
    const { patient } = resultFileHeader;

    formData.append('data[file][data]', fs.readFileSync(this.fullPath).toString('base64'));
    formData.append('data[file][name]', this.filename);
    formData.append('data[doctor_me_number]', doctor.meNumber);
    formData.append('data[laboratory_me_number]', resultFileHeader.laboratoryMENumber);
    formData.append('data[result_date]', resultFileHeader.resultDate);
    formData.append('data[reference_number]', resultFileHeader.referenceNumber);
    formData.append('data[subject_code]', resultFileHeader.subjectCode);
    formData.append('data[Patient][first_name]', patient.firstName);
    formData.append('data[Patient][last_name]', patient.lastName);
    formData.append('data[Patient][insurance_number]', patient.insuranceNumber);
    formData.append('data[Patient][birthday]', patient.birthday);
    formData.append('data[Patient][address]', patient.address);


    return axios.post(doctor.uploadURL, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
      },
    }).then((response) => {
      if (response.success) {
        this.status = Upload.STATUS_UPLOAD_SUCCESS;
      } else {
        this.status = Upload.STATUS_UPLOAD_ERROR;
        this.error = {
          type: 'server',
          date: new Date().toString(),
          message: `Serverseitiger Fehler.\n ${response.toString()}`,
        };
      }
    }).catch((err) => {
      this.status = Upload.STATUS_UPLOAD_ERROR;
      this.error = {
        type: 'upload',
        date: new Date().toString(),
        message: `Serverseitiger Fehler oder Server nicht erreichbar.\n ${err.toString()}`,
      };
    });
  }

  /**
   * [status description]
   * @return {[type]} [description]
   */
  get status() { return this.iStatus; }

  /**
   * [status description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  set status(value) {
    if (Upload.AVAILABLE_STATIS.indexOf(value) === -1) {
      throw new Error('No valid status');
    }
    this.iStatus = value;
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
   * [date description]
   * @return {[type]} [description]
   */
  get date() { return this.iDate; }

  /**
   * [date description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  set date(value) {
    if (value.constructor === Date) {
      this.iDate = value;
    }
    if (value.constructor === String) {
      this.iDate = moment(value).toDate();
    }
  }

  /**
   * [fullPath description]
   * @return {[type]} [description]
   */
  get fullPath() { return `${this.path}/${this.filename}`; }

  /**
   * [toJSON description]
   * @return {[type]} [description]
   */
  toJSON() {
    return {
      date: this.date,
      path: this.path,
      filename: this.filename,
      status: this.status,
      error: this.error,
    };
  }
}


export default Upload;
