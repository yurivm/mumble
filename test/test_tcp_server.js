const assert = require('assert');
const
describe('tcp_server', function() {
  describe('#startTCPServer', function() {
    it('should start the server', function(done) {

    });
  });
});


describe('#save()', function() {
    it('should save without error', function(done) {
      var user = new User('Luna');
      user.save(function(err) {
        if (err) done(err);
        else done();
      });
    });
  });
