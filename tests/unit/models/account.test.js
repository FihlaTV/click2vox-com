var expect = require('chai').expect;
var Account = require('../../../models/account');

describe('Account schema', function() {
  describe('#getFullName', function() {
    var account = new Account({
      first_name: 'John',
      last_name: 'Doe'
    });

    var full_name = account.getFullName();

    it('should return both first & last name', function() {
      expect(full_name).to.be.an('String');
      expect(full_name).be.equal('John Doe');
    });
  });

  describe('#saveSipURI', function() {
    var default_account_values = {
      first_name: 'John',
      last_name: 'Doe',
      uri_type: 'none',
      sip_uris: []
    };

    describe('setting an static SIP URI', function() {
      describe('from scratch', function() {
        var account = new Account(default_account_values);

        account.saveSipURI('echo@ivrs');

        it('should set the uri_type as default', function() {
          expect(account.uri_type).be.equal('default');
        });

        it('should not add it to the list of sip uris', function() {
          expect(account.sip_uris).to.have.length(0);
        });
      });

      describe('with an existing custom SIP URI', function() {
        var account = new Account(default_account_values);
        account.sip_uris = ['sip@custom.ca'];
        account.uri_type = 'custom';

        account.saveSipURI('digits@ivrs');

        it('should keep the uri_type as custom', function() {
          expect(account.uri_type).be.equal('custom');
        });

        it('should not add it to the list of sip uris', function() {
          expect(account.sip_uris).to.have.length(1);
          expect(account.sip_uris).to.contain('sip@custom.ca');
        });
      });
    });

    describe('setting a custom SIP URI', function() {
      var account = new Account(default_account_values);

      account.saveSipURI('custom_sip@uri.com');

      it('should set the uri_type as custom', function() {
        expect(account.uri_type).be.equal('custom');
      });

      it('should add it to the list of sip uris', function() {
        expect(account.sip_uris).to.contain('custom_sip@uri.com');
        expect(account.sip_uris).to.have.length(1);
      });
    });
  });
});
