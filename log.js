var assert = require('assert');

module.exports = function (name, Transport, options) {
  options = options || {};
  var transport;
  var logger;

  beforeEach(function () {
    transport = new Transport(options.construct);
    logger = new options.Logger({ transports: [transport] });
  });

  // TODO How to assert that error event is thrown? How to make a transport fail?
  describe('transport log() method', function () {
    it('should be present', function () {
      assert.ok(transport.log);
      assert.equal('function', typeof transport.log);
    });

    describe('logger', function () {
      describe('.transports', function () {
        it('should contain transport ' + name, function () {
          var instance = logger.transports.filter(function (item) {
            return item === transport;
          })[0];

          assert.ok(instance);
          assert.equal(transport, instance);
        });
      });

      describe('log() method', function () {
        it('should return true', function () {
          var result = logger.log('debug', 'foo');
          assert(true, result);
        });
      });
    });

    describe('events', function () {
      it.skip('should emit the "logging" event', function (done) {
        logger.once('logging', function (level, msg, meta) {
          assert.equal('debug', level);
          assert.equal('hello', msg);
          done();
        });

        logger.log('debug', 'hello');
      });

      it.skip('should emit the "logged" event', function (done) {
        transport.once('logged', function (err, level, msg, meta) {
          assert.ifError(err);
          assert.equal('debug', level);
          assert.equal('hello', msg);
          done();
        });

        logger.log('debug', 'hello');
      });
    });
  });
};
