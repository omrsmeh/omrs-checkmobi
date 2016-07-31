'use strict';

let should = require('chai').should();
let CB = require('../index');
let cb = new CB('xxxx');

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
    cb.phoneInformation('+9199', (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid phone number format (Only E164 format accepted).')
      done();
    });
  });

  it('Invalid Number', (done) => {
    cb.phoneInformation('+9199368631', (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid phone number format (Only E164 format accepted).')
      done();
    });
  });

  it('Valid Request', (done) => {
    cb.phoneInformation('+919936863147', (error, response) => {
      error.should.equal(false);
      response.should.be.a('object');
      done();
    });
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

  it('Validate Null', (done) => {
    cb.getMessageInformation(null, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid request id')
      done();
    });
  });

  it('Invalid ID Format', (done) => {
    cb.getMessageInformation('+9199368631', (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid request id')
      done();
    });
  });

  it('MessageInfo (Invalid ID)', (done) => {
    cb.getMessageInformation('MSG-ED26AC71-807B-49B1-A81E-3956224A0CDC', (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Resource cannot be found');
      done();
    });
  });

});

describe('#Get Validate Status', () => {

  it('Validate Null', (done) => {
    cb.getValidateStatus(null, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid request id')
      done();
    });
  });

  it('Invalid ID Format', (done) => {
    cb.getValidateStatus('+9199368631', (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid request id')
      done();
    });
  });

  it('Invalid ID', (done) => {
    cb.getValidateStatus('MSG-ED26AC71-807B-49B1-A81E-3956224A0CDC', (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid request id');
      done();
    });
  });

  it('Info By ID', (done) => {
    cb.getValidateStatus('SMS-BD34D431-3E3B-4EF3-97B5-A4417340BB49', (error, response) => {
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
    cb.sendMessage('+9199368631', (error, response) => {
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
    cb.sendMessage({"to": '+919936863147', "text": ''}, (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Required options are missing')
      done();
    });
  });

  // it('Invalid (Object With valid values)', (done) => {
  //   cb.sendMessage({"to": '+919936863147', "text": 'test'}, (error, response) => {
  //     error.should.equal(false);
  //     response.should.be.a('object');
  //     done();
  //   });
  // });
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
    cb.validatePhone('SMS-BD34D431-3E3B-4EF3-97B5-A4417340BB49', '', (error, response) => {
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
    cb.validatePhone('SMS-BD34D432-3E3B-4EF3-97B5-A4417340BB49', 'sms', (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid phone number format (Only E164 format accepted).')
      done();
    });
  });

  it('Valid Values', (done) => {
    cb.validatePhone('+919936863147', 'sms', (error, response) => {
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
    cb.validatePin('SMS-BD34D431-3E3B-4EF3-97B5-A4417340BB49', '', (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Invalid request payload')
      done();
    });
  });

  it('Invalid (values)', (done) => {
    cb.validatePin('SMS-BD34D432-3E3B-4EF3-97B5-A4417340BB49', '68768', (error, response) => {
      error.should.equal(true);
      response.should.be.a('string');
      response.should.equal('Resource cannot be found')
      done();
    });
  });

  it('Valid Values', (done) => {
    cb.validatePin('SMS-BD34D431-3E3B-4EF3-97B5-A4417340BB49', '19657', (error, response) => {
      error.should.equal(false);
      response.should.be.a('object');
      done();
    });
  });
});
