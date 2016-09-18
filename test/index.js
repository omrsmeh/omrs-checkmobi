'use strict';

const CHECKMOBI_SECRET            = 'YOUR_CHECKMOBI_SECRET';
const VALIED_MOBILE_NUMBER        = 'YOUR_MOBILE_NUMBER_FOR_TEST';
const CHECKMOBI_MSG_ID            = 'YOUR_CHECKMOBI_MESSAGE_ID';
const CHECKMOBI_SMS_ID            = 'YOUR_CHECKMOBI_SMS_ID';
const CHECKMOBI_SMS_VERIFY_NUMBER = 'YOUR_CHECKMOBI_SMS_VERIFICATION_NUMBER'
const CHECKMOBI_VALID_PIN         = 'VALID_CHECKMOBI_PIN';

let should = require('chai').should();
let CB = require('../index');
let cb = new CB(CHECKMOBI_SECRET);

describe('#Getting Number Info', () => {

  it('Validate Null', (done) => {
    cb.phoneInformation(null, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid phone number format (Only E164 format accepted).')
      done();
    });
  });

  it('Invalid Number E.164 Format', (done) => {
    cb.phoneInformation('+0199', (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid phone number format (Only E164 format accepted).')
      done();
    });
  });

  it('Invalid Number', (done) => {
    cb.phoneInformation('+135980654', (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid phone number format (Only E164 format accepted).')
      done();
    });
  });

  it('Valid Request', (done) => {
    // Default mobile number can't validate
    if(VALIED_MOBILE_NUMBER !== 'YOUR_MOBILE_NUMBER_FOR_TEST') {
      cb.phoneInformation(VALIED_MOBILE_NUMBER, (error, response) => {
        error.should.equal(false);
        response.should.be.a('object');
        done();
      });
    }
    else {
      done();
    }
  });

});

describe('#Getting Prefixes', () => {

  it('Prefix', (done) => {
    cb.getPrefixes((error, response) => {
      error.should.equal(false);
      response.should.be.a('array');
      done();
    });
  });

});

describe('#Get Message Information', () => {
  var runTest = true;

  beforeEach(function() {
    runTest = (CHECKMOBI_SECRET !== 'YOUR_CHECKMOBI_SECRET');
  });

  it('Validate Null', (done) => {
    if(!runTest) {
      return done();
    }

    cb.getMessageInformation(null, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid request id')
      done();
    });
  });

  it('Invalid ID Format', (done) => {
    if(!runTest) {
      return done();
    }

    cb.getMessageInformation(VALIED_MOBILE_NUMBER, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid request id')
      done();
    });
  });

  it('MessageInfo (Invalid ID)', (done) => {
    if(!runTest) {
      return done();
    }

    cb.getMessageInformation(CHECKMOBI_MSG_ID, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Resource cannot be found');
      done();
    });
  });

});

describe('#Get Validate Status', () => {
  var runTest = true;

  beforeEach(function() {
    runTest = (CHECKMOBI_SECRET !== 'YOUR_CHECKMOBI_SECRET');
  });

  it('Validate Null', (done) => {
    if(!runTest) {
      return done();
    }
    cb.getValidateStatus(null, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid request id')
      done();
    });
  });

  it('Invalid ID Format', (done) => {
    if(!runTest) {
      return done();
    }
    cb.getValidateStatus(VALIED_MOBILE_NUMBER, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid request id')
      done();
    });
  });

  it('Invalid ID', (done) => {
    if(!runTest) {
      return done();
    }
    cb.getValidateStatus(CHECKMOBI_MSG_ID, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid request id');
      done();
    });
  });

  it('Info By ID', (done) => {
    if(!runTest) {
      return done();
    }
    cb.getValidateStatus(CHECKMOBI_SMS_ID, (error, response) => {
      error.should.equal(false);
      response.should.be.a('object');
      done();
    });
  });
});


describe('#Send SMS', () => {

  it('Validate Null', (done) => {
    cb.sendMessage(null, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid Request')
      done();
     });
  });

  it('Invalid (Pass String)', (done) => {
    cb.sendMessage(VALIED_MOBILE_NUMBER, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Required options are missing')
      done();
    });
  });

  it('Invalid (Blank Object)', (done) => {
    cb.sendMessage({}, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Required options are missing')
      done();
    });
  });

  it('Invalid (Object With One Property)', (done) => {
    cb.sendMessage({"to": null}, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Required options are missing')
      done();
    });
  });

  it('Invalid (Object With Two Property But Both Null)', (done) => {
    cb.sendMessage({"to": null, "text": null}, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Required options are missing')
      done();
    });
  });

  it('Invalid (Object With Two Property One empty and second Null)', (done) => {
    cb.sendMessage({"to": '', "text": null}, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Required options are missing')
      done();
    });
  });

  it('Invalid (Object With Two Property Both empty)', (done) => {
    cb.sendMessage({"to": '', "text": ''}, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Required options are missing')
      done();
    });
  });

  it('Invalid (Object With Two Property One empty and second with value)', (done) => {
    cb.sendMessage({"to": '', "text": 'test'}, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Required options are missing')
      done();
    });
  });

  it('Invalid (Object With Two Property One with value and second empty)', (done) => {
    cb.sendMessage({"to": 'just', "text": ''}, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Required options are missing')
      done();
    });
  });

  it('Invalid (Object With Two Property both non empty)', (done) => {
    cb.sendMessage({"to": 'just', "text": 'test'}, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid phone number format (Only E164 format accepted).')
      done();
    });
  });

  it('Invalid (Object With Two Property One with valid value and second empty)', (done) => {
    cb.sendMessage({"to": VALIED_MOBILE_NUMBER, "text": ''}, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Required options are missing')
      done();
    });
  });

  it('Invalid (Object With valid values)', (done) => {
    if(CHECKMOBI_SECRET === 'YOUR_CHECKMOBI_SECRET') {
      return done();
    }

    cb.sendMessage({"to": VALIED_MOBILE_NUMBER, "text": 'test'}, (error, response) => {
      error.should.equal(false);
      response.should.be.a('object');
      done();
    });
  });
});

describe('#Validate Phone Number', () => {

  it('Validate Null', (done) => {
    cb.validatePhone(null, null, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Required information missing')
      done();
    });
  });

  it('Invalid (Pass Empty and Null)', (done) => {
    cb.validatePhone('', null, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Required information missing')
      done();
    });
  });

  it('Invalid (Pass Null and Empty)', (done) => {
    cb.validatePhone(null, '', (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Required information missing')
      done();
    });
  });

  it('Invalid (Pass Both Empty)', (done) => {
    cb.validatePhone('', '', (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Required information missing')
      done();
    });
  });

  it('Invalid (Blank Object)', (done) => {
    cb.validatePhone({}, {}, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid Request')
      done();
    });
  });

  it('Invalid (Empty second param)', (done) => {
    cb.validatePhone(CHECKMOBI_SMS_ID, '', (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Required information missing')
      done();
    });
  });

  it('Invalid (values)', (done) => {
    cb.validatePhone('SMS-BD34D432-3E3B-4EF3-97B5-A4417340BB49', '68768', (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid verification type, allowed sms, ivr, cli, reverse_cli')
      done();
    });
  });

  it('Invalid (phone number)', (done) => {
    cb.validatePhone(CHECKMOBI_SMS_ID, 'sms', (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid phone number format (Only E164 format accepted).')
      done();
    });
  });

  it('Valid Values', (done) => {
    if(CHECKMOBI_SECRET === 'YOUR_CHECKMOBI_SECRET') {
      return done();
    }

    cb.validatePhone(VALIED_MOBILE_NUMBER, 'sms', (error, response) => {
      error.should.equal(false);
      response.should.be.a('object');
      done();
    });
  });
});

describe('#Validate PIN', () => {

  it('Validate Null', (done) => {
    cb.validatePin(null, null, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Provided ID is invalid')
      done();
    });
  });

  it('Invalid (Pass Empty and Null)', (done) => {
    cb.validatePin('', null, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Provided ID is invalid')
      done();
    });
  });

  it('Invalid (Pass Empty and Null)', (done) => {
    cb.validatePin('', '', (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Provided ID is invalid')
      done();
    });
  });

  it('Invalid (Blank Object)', (done) => {
    cb.validatePin({}, {}, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Provided ID is invalid')
      done();
    });
  });

  it('Invalid (Empty second param)', (done) => {
    if(
      (CHECKMOBI_SECRET === 'YOUR_CHECKMOBI_SECRET') ||
      (CHECKMOBI_SMS_ID === 'YOUR_CHECKMOBI_SMS_ID')
    ) { return done(); }

    cb.validatePin(CHECKMOBI_SMS_ID, '', (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal(('Invalid request payload'))
      done();
    });
  });

  it('Invalid (values)', (done) => {
    if(
      (CHECKMOBI_SECRET === 'YOUR_CHECKMOBI_SECRET') ||
      (CHECKMOBI_SMS_ID === 'YOUR_CHECKMOBI_SMS_ID')
    ) { return done(); }

    cb.validatePin(CHECKMOBI_SMS_ID, '68768', (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Resource cannot be found')
      done();
    });
  });

  it('Valid Values', (done) => {
    if(
      (CHECKMOBI_SECRET === 'YOUR_CHECKMOBI_SECRET') ||
      (CHECKMOBI_SMS_ID === 'YOUR_CHECKMOBI_SMS_ID') ||
      (CHECKMOBI_VALID_PIN === 'VALID_CHECKMOBI_PIN')
    ) { return done(); }

    cb.validatePin(CHECKMOBI_SMS_ID, CHECKMOBI_VALID_PIN, (error, response) => {
      error.should.equal(false);
      response.should.be.a('object');
      done();
    });
  });
});
