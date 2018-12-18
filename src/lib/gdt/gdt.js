import log from 'electron-log'; // eslint-disable-line
import moment from 'moment';


/**
 * [GDT description]
 */
class GDT {
  /**
   * GTD lines have first 3 chars the length of the line
   * and end with \r\n (+2 length).
   * So the default added amount to one line is 5.
   * @type {[type]}
   */
  static get fixedCharLength() { return 5; }
  /**
   * [getLine description]
   * @param  {[type]} text [description]
   * @return {[type]}      [description]
   */

  static getLine(text) {
    const length = text.length + GDT.fixedCharLength;

    let prefix = '';

    if (length < 100) {
      prefix = '0';
    }
    if (length < 10) {
      prefix += '0';
    }

    prefix += length.toString();

    return {
      line: `${prefix}${text}`,
      length,
    };
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
   * [getUserPhone description]
   * @param  {[type]} user [description]
   * @return {[type]}      [description]
   */
  static getUserPhone(user) {
    return user.mobile_phone || user.telephone;
  }

  /**
   * [getUserInsuranceNumber description]
   * @param  {[type]} user [description]
   * @return {[type]}      [description]
   */
  static getUserInsuranceNumber(user) {
    try {
      return `${user.insurance_membership.InsuranceMembership.insurance_number}${moment(user.User.birthday).format('DDMMYY')}`;
    } catch (e) {
      log.info('GDT -> patient has no insurance', user);
    }
    return '';
  }
}


export default GDT;
