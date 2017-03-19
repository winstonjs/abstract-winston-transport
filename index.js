/**
 * Winston TransportStream Abstract Test Suite
 *
 * @param {Object} opts Options for your test suite execution
 *   @param {String}          opts.name      Transport name.
 *   @param {TransportStream} opts.Transport Class to instantiate (new Transport).
 *   @param {Boolean}         opts.query     If true, will also include "Query" suite.
 *   @param {Boolean}         opts.stream    If true, will also include "Stream" suite.
 *   @param {Object}          opts.construct Options to pass to the transport to instantiate.
 *      - If passed an object, it will be passed as is when calling `new Transport(options)`.
 *      - If passed a function it will be called before: `new Transport(options())`.
 *      - If parameter left empty defaults to {}.
 */
module.exports = function (options) {
  if (!options || !options.name || !options.Transport) {
    throw new Error('name and Transport are required options');
  }

  var name = options.name;
  describe(name + ' transport (abstract-winston-tranport)', function () {
    require('./log')(options);
    ['stream', 'query'].forEach(function (suite) {
      if (options[suite]) {
        require('./' + suite)(options);
      }
    });
  });
};
