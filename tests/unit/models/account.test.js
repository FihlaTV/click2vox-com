var expect = require('chai').expect;
var Account = require('../../../models/account');

describe('Account schema', function() {
  describe('#getFullName', function() {
    var account = new Account(
      {
        first_name: 'John',
        last_name: 'Doe'
      }
    );

    var full_name = account.getFullName();

    it('should return both first & last name', function() {
      expect(full_name).to.be.an('String');
      expect(full_name).be.equal('John Doe');
    });
  });
});
