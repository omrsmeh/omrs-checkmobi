# omrs-checkmobi

Checkmobi NPM module

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install omrs-checkmobi --save
```

## Example

```javascript
let CheckMobi = require('omrs-checkmobi');
let cb = new CheckMobi('YOUR_CHECKMOBI_SECRET_KEY');

cb.getCountries((error, countries) => {
  if(!error) {
    console.log(countries);
  }
});

```

## Available Methods

* `getCountries(callback)`
    * allow you to get a list of all available countries, flags and country code.

* `getMessageInformation(messageId, callback)`
    * Get SMS status, let you to check the status of a sms request

* `getPrefixes(callback)`
    * Send API allow you to get a list of all available countries and the associated calling prefixes

* `getValidateStatus(validateId, callback)`
    * Get Validation status API let you to check the validation status of a request

* `phoneInformation(phnumber, callback)`
    * Send API request to get phone/mobile information

* `sendMessage(messageObject, callback)`
    * API request to send message on phone/mobile
    * messageObject has following required properties
        * to: Phone/Mobile Number should be in E.164 format
        * text: Message, maximum 255 chars allowed

* `validatePhone(phNumber, verifyAs, callback)`
    * Validate phone/mobile number via sending message on given phone number with an OTP

* `validatePin(validateId, validateText, callback)`
    * Validate PIN send on phone / mobile number by using validatePhone


## Tests

```sh
npm install
npm test
```

## Dependencies

- [request](https://github.com/request/request): Simplified HTTP request client.

## Dev Dependencies

- [chai](https://github.com/chaijs/chai): BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
- [mocha](https://github.com/mochajs/mocha): simple, flexible, fun test framework


## License

MIT
