import log from 'electron-log'; // eslint-disable-line
import Promise from 'bluebird';
import iconv from 'iconv-lite';
import moment from 'moment';

class MedRequestFile {
  static generate(user) {
    return new Promise((resolve, reject) => {
      try {
        const data = iconv.encode((`P-Id=${user.User.id || ''}
          P-Zuname=${user.User.last_name || ''}
          P-Vorname=${user.User.first_name || ''}
          P-Titel=${user.User.title || ''}
          P-Gebdat=${MedRequestFile.getUserBirthday(user.User.birthday, 'YYYYMMDD') || ''}
          P-Geschlecht=${MedRequestFile.getUserGender(user.User.gender) || ''}
          P-VersNr=${MedRequestFile.getUserInsuranceNumber(user) || ''}
          P-Telefon=${MedRequestFile.getUserPhone(user.User) || ''}
          P-Land=A
          P-Plz=${user.User.zip || ''}
          P-Ort=${user.User.city || ''}
          P-Strasse=${user.User.address || ''}
          X-Kasse=${MedRequestFile.getInsurance(user)}
          X-Vgr=
          X-Vgr-Text=
          V-Id=
          V-Zuname=${MedRequestFile.getCoInsuredLastName(user.User)}
          V-Vorname=${MedRequestFile.getCoInsuredFirstName(user.User)}
          V-Titel=
          V-Gebdat=
          V-Geschlecht=
          V-VersNr=${MedRequestFile.getCoInsuredInsuranceNumber(user.User)}
          V-Telefon=
          V-Land=
          V-Plz=
          V-Ort=
          V-Strasse=
        `).replace(/ {10}/g, ''), 'CP1252');
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * [getUserBirthday description]
   * @param  {[type]} date   [description]
   * @param  {[type]} format [description]
   * @return {[type]}        [description]
   */
  static getUserBirthday(date, format) {
    return moment(date).format(format);
  }

  /**
   * [getUserGender description]
   * @param  {[type]} gender [description]
   * @return {[type]}        [description]
   */
  static getUserGender(gender) {
    return gender.toUpperCase();
  }

  /**
   * [getUserInsuranceNumber description]
   * @param  {[type]} user [description]
   * @return {[type]}      [description]
   */
  static getUserInsuranceNumber(user) {
    return `${user.insurance_membership.InsuranceMembership.insurance_number}${moment(user.User.birthday).format('DDMMYY')}`;
  }

  /**
   * [getUserPhone description]
   * @param  {[type]} user [description]
   * @return {[type]}      [description]
   */
  static getUserPhone(user) {
    return user.mobile_phone || user.telephone;
  }

  /**
   * [getInsurance description]
   * @param  {[type]} user [description]
   * @return {[type]}      [description]
   */
  static getInsurance(user) {
    return user.insurance_membership.Insurance.name;
  }

  /**
   * [getCoInsuredLastName description]
   * @param  {[type]} user [description]
   * @return {[type]}      [description]
   */
  static getCoInsuredLastName(user) {
    return user.co_insured_lastname || '';
  }

  /**
   * [getCoInsuredFirstName description]
   * @param  {[type]} user [description]
   * @return {[type]}      [description]
   */
  static getCoInsuredFirstName(user) {
    return user.co_insured_firstname || '';
  }

  /**
   * [getCoInsuredInsuranceNumber description]
   * @param  {[type]} user [description]
   * @return {[type]}      [description]
   */
  static getCoInsuredInsuranceNumber(user) {
    return user.co_insured_insurance_number || '';
  }
}


export default MedRequestFile;
