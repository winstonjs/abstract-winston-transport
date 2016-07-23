var winston = require('winston');
var assert = require('assert');

module.exports = function (name, Transport, options) {
  options = options || {};
  var createOptions = typeof options !== 'function' ?
    function () { return options; } :
    options;

  beforeEach(function () {
    this.transport = new Transport(createOptions());
    this.logger = new winston.Logger({
      transports: [this.transport]
    });
  });

  afterEach(function () {
    this.transport = null;
    this.logger = null;
  });

  // TODO How to assert that error event is thrown? How to make a transport fail?
  describe('transport log() method', function () {
    it('should be present', function () {
      assert.ok(this.transport.log);
      assert.equal('function', typeof this.transport.log);
    });

    describe('logger', function () {
      describe('.transports', function () {
        it('should contain transport ' + name, function () {
          assert.ok(this.logger.transports[name]);
          assert.equal(this.transport, this.logger.transports[name]);
        });
      });
      describe('log() method', function () {
        it('should return true', function () {
          var result = this.logger.log('debug', 'foo');
          assert(true, result);
        });
      });
    });

    describe('events', function () {
      // TODO when is this event emitted
      // (logging is emitted by the logger)
      // test both transport and logger
      it.skip('should emit the "logging" event', function (done) {
        var self = this;
        self.logger.once('logging', function (level, msg, meta) {
          assert.equal('debug', level);
          assert.equal('hello', msg);
          done();
        });
        self.logger.log('debug', 'hello');
      });

      it.skip('should emit the "logged" event', function (done) {
        var self = this;
        self.transport.once('logged', function (err, level, msg, meta) {
          assert.ifError(err);
          assert.equal('debug', level);
          assert.equal('hello', msg);
          done();
        });
        self.logger.log('debug', 'hello');
      });
    });

    describe.skip('with showLevel off', function () {
      var oldShowLevel;

      beforeEach(function () {
        var options = createOptions();
        options.showLevel = false;
        this.transport = new Transport(options);
        this.logger = new winston.Logger({
          transports: [this.transport]
        });
      });

      afterEach(function () {
        this.transport = null;
        this.logger = null;
      });

      it('should not have level prepended', function (done) {
        this.logger.log('info', 'foo', function (err, res, x, y) {
          // TODO Check that logged has level prepended
          console.log(err, res);
          done();
        });
      });
    });
  });
};
