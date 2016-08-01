'use strict';

let request   = require('request');
let errCodes  = require('./error-codes');
const ApiPath = 'https://api.checkmobi.com/v1/';
const E164Num = /(\+{0,1})(\d{11,15})/;
const ValidId = /(\w{3})-(\w{8})((-\w{4}){3})-(\w{11})/;

/**
 * Error states and its description
 * @type {Object}
 */
let errors = {
  'invalidnumberformat': 'Invalid phone number format (Only E164 format accepted).',
  'invalidnumber': 'Number is invalid',
  'invalidid': 'Provided ID is invalid',
  'requestfail': 'Sorry! Unable to get details',
};

/**
 * Send request on API server and revert response
 * by calling callback
 *
 * @param  {Object} opt         NPM Request option Object
 * @param  {function} _callback
 */
let __request = function __request(opt, _callback) {

  return request(opt, (error, response, body) => {

    if(error) return _callback(true, error.message);

    if(!error && response.statusCode != 200 && response.statusCode != 204) {
      switch (response.statusCode) {
        case 400:
        case 401:
          _callback(true, JSON.parse(body)["error"]);
          break;
        case 403:
          _callback(true, errCodes['403']);
          break;
        case 404:
          _callback(true, errCodes['404']);
          break;
        case 500:
          _callback(true, errCodes['500']);
          break;
      }
      return ;
    }

    return _callback(false, JSON.parse(body));
  });
}

/**
 * Validate phone / mobile number it should be
 * in E.164 format. To know more about E.164
 * format please visit https://en.wikipedia.org/wiki/E.164
 *
 * @param  {String}  number
 * @return {Boolean}
 */
let isValidE164Number = function isValidE164Number(number) {

  return E164Num.test(number);
}

/**
 * Validate request id format
 *
 * @param  {String}  _id
 * @return {Boolean}
 */
let isValidId = function isValidId(_id) {

  return ValidId.test(_id);
}

/**
 * HTTP Request class to send request
 * on API server and received response
 *
 * This implements callback pattern
 */
class CbRequest {

  /**
   * Class constructor
   * @param  {String} apiSecret
   */
  constructor(apiSecret) {
    this.headers = {
      'Authorization': apiSecret,
      'Content-Type': 'application/json'
    }

    this.apiUri = {
      'countries': 'countries',
      'prefixes': 'prefixes',
      'checknumber': 'checknumber',
      'validateNum': 'validation/request',
      'validatePin': 'validation/verify',
      'validateStatus': 'validation/status/{id}',
      'sendSms': 'sms/send',
      'getSms': 'sms/{id}'
    };
  }

  /**
   * Send request on API server
   *
   * @param  {String}   reqType     HTTP methods values: post, get
   * @param  {String}   reqFor      API URI code
   * @param  {Mixed}    payload     Object or String
   * @param  {Function} _callback
   */
  doRequest(reqType, reqFor, payload, _callback) {
    /**
     * Request module options
     * @type {Object}
     */
    let options = {
      'method': reqType,
      'url': ApiPath + this.apiUri[reqFor],
      'headers': this.headers
    };

    // Create form object support by API
    if(payload && reqType.toLowerCase() === 'post') {
      options['form'] = JSON.stringify(payload);
    }

    // Validate ID format for get request
    if(
      payload &&
      (this.apiUri[reqFor].indexOf('{id}') >= 0) &&
      (reqType.toLowerCase() === 'get') &&
      (isValidId(payload) === true)
    ) {
      options.url = options.url.replace('{id}', payload);
    }

    // Validate phone number format
    if(
      payload &&
      (
        (
          payload.hasOwnProperty('number') &&
          isValidE164Number(payload['number']) !== true
        ) || (
          payload.hasOwnProperty('to') &&
          isValidE164Number(payload['to']) !== true
        )
      )
    ) {
      return _callback(true, errors.invalidnumberformat)
    }

    // Valiate ID format for post request
    if(
      payload &&
      (reqType.toLowerCase() === 'post') &&
      (
        payload.hasOwnProperty('id') &&
        isValidId(payload['id']) !== true
      )
    ) {
      return _callback(true, errors.invalidid)
    }

    // Send response
    return __request(options, _callback);
  }
}

exports.CBRequest = CbRequest;
