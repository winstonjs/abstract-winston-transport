const assert = require('assert');
const MESSAGE = Symbol.for('message');

module.exports = function (options) {
  options = options || {};

  var Transport = options.Transport;
  var name = Transport.name || options.name;
  var construct = options.construct;
  var instance;

  beforeEach(function () {
    var create = typeof construct === 'function'
      ? construct()
      : construct;

    instance = new Transport(create);
  });

  // TODO How to assert that error event is thrown? How to make a transport fail?
  describe('.log()', function () {
    it('should be present', function () {
      assert.ok(instance.log);
      assert.equal('function', typeof instance.log);
    });

    it('(with no callback) should return true', function () {
      var info = {
        level: 'debug',
        message: 'foo'
      };

      info[MESSAGE] = JSON.stringify(info);
      var result = instance.log(info);
      assert(true, result);
    });

    it('(with callback) should return true', function (done) {
      var info = {
        level: 'debug',
        message: 'foo'
      };

      info[MESSAGE] = JSON.stringify(info);
      var result = instance.log(info, function () {
        assert(true, result);
        done();
      });
    });
  });

  describe('events', function () {
    it('should emit the "logged" event', function (done) {
      instance.once('logged', done);

      var info = {
        level: 'debug',
        message: 'foo'
      };

      info[MESSAGE] = JSON.stringify(info);
      instance.log(info);
    });
  });

  afterEach(function (done) {
    if (options.afterEach) {
      return options.afterEach(options, done);
    }

    done();
  });

  after(function (done) {
    if (options.afterEach) {
      return options.afterEach(options, done);
    }

    done();
  });
};
