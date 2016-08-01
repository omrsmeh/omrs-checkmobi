'use strict';

let CBRequester = require('./checkmobi-request').CBRequest;
const NullObject = 0;
const RequiredPropertyMissing = 1;
const InvalidPlatform = 2;

/**
 * Validate request object as per API documentation
 * read more at https://checkmobi.com/account.html#/documentation/overview
 *
 * @param  {Object} obj
 * @param  {String} platform
 * @return {Mixed}
 */
let validateMessageObject = function validateMessageObject(obj, platform) {

  if(!obj) {
    return NullObject;
  }

  if(
    (!obj.hasOwnProperty('to') || !obj.hasOwnProperty('text')) ||
    (obj.hasOwnProperty('to') && !obj.to) ||
    (obj.hasOwnProperty('text') && !obj.text) ||
    (obj.hasOwnProperty('to') && obj.to && obj.to.trim() === '') ||
    (obj.hasOwnProperty('text') && obj.text && obj.text.trim() === '')
  ) {
    return RequiredPropertyMissing;
  }

  if(obj.hasOwnProperty('platform') && platform.indexOf(obj.platform) < 0) {
    return InvalidPlatform;
  }

  return true;
}

/**
 * Sender and Receiver class for
 * all API requests
 */
class Checkmobi {

  /**
   * Class constructor
   *
   * @param  {String} apiSecret
   */
  constructor(apiSecret) {
    this.cb = new CBRequester(apiSecret);
    this.platform = [
      'ios', 'android', 'web', 'desktop'
    ];
    this.verifyTypes = [
      'sms', 'ivr', 'cli', 'reverse_cli'
    ]
  }

  /**
   * Send API request to validate phone/mobile number
   *
   * @param  {String}   phNumber  Phone/Mobile Number should be in E.164 format
   * @param  {String}   verifyAs  Possible values sms, ivr, cli, reverse_cli
   * @param  {Function} callback
   */
  validatePhone(phNumber, verifyAs, callback) {
    let _message = 'Invalid verification type, allowed ';

    if(!verifyAs || !phNumber) {
      return callback(true, 'Required information missing');
    }

    if(
      (verifyAs && typeof verifyAs !== 'string') ||
      (phNumber && typeof phNumber !== 'string')
    ) {
      return callback(true, 'Invalid Request');
    }

    if(!verifyAs || this.verifyTypes.indexOf(verifyAs.toLowerCase()) < 0) {
      return callback(true, _message + this.verifyTypes.join(', '));
    }

    return this.cb.doRequest('post', 'validateNum', {
      'number': phNumber,
      'type': verifyAs
    }, callback);
  }

  /**
   * Send API request to validate pin send on
   * phone / mobile number by using validatePhone
   *
   * @param  {String}   validateId
   * @param  {String}   validateText
   * @param  {Function} callback
   */
  validatePin(validateId, validateText, callback) {
    return this.cb.doRequest('post', 'validatePin', {
      'id': validateId,
      'pin': validateText
    }, callback);
  }

  /**
   * Send API request to get phone/mobile information
   *
   * @param  {String}   phnumber
   * @param  {Function} callback
   */
  phoneInformation(phnumber, callback) {
    return this.cb.doRequest('post', 'checknumber', {
      'number': phnumber
    }, callback);
  }

  /**
   * Send API request to send message on phone/mobile
   * @param  {Object}   messageObject  Object format should be
   * {
   *   to: Required,
   *   text: Required,
   *   platform: Optional,
   *   notification_callback: Optional
   * }
   * @param  {Function} callback
   */
  sendMessage(messageObject, callback) {
    let isValid = validateMessageObject(messageObject, this.platform);
    let message = '';
    if(isValid !== true) {
      switch (isValid) {
        case NullObject:
          message = 'Invalid Request';
          break;
        case RequiredPropertyMissing:
          message = 'Required options are missing';
          break;
        case InvalidPlatform:
          message = 'Invalid platform. Only ios, android, web, desktop is supported';
          break;
      }

      return callback(true, message);
    }

    return this.cb.doRequest('post', 'sendSms', messageObject, callback);
  }

  /**
   * Send API allow you to get a list of all
   * available countries and the associated calling prefixes
   *
   * @param  {Function} callback
   */
  getPrefixes(callback) {
    return this.cb.doRequest('get', 'prefixes', null, callback);
  }

  /**
   * Send API allow you to get a list of all
   * available countries, flags and country code.
   *
   * @param  {Function} callback
   */
  getCountries(callback) {
    return this.cb.doRequest('get', 'prefixes', null, callback);
  }

  /**
   * Get SMS status API let you to check the status of a sms request.
   * @param  {String}   messageId
   * @param  {Function} callback
   */
  getMessageInformation(messageId, callback) {
    return this.cb.doRequest('get', 'getSms', messageId, callback);
  }

  /**
   * Get Validation status API let you to check
   * the validation status of a request.
   *
   * @param  {String}   validateId
   * @param  {Function} callback
   */
  getValidateStatus(validateId, callback) {
    return this.cb.doRequest('get', 'validateStatus', validateId, callback);
  }
}

exports.CheckMobi = Checkmobi;
