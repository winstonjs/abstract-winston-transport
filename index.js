/**
 * Winston Transport Abstract Test Suite
 *
 * @method
 * @static
 * @param {String}            name      Transport name
 * @param {Function}          Transport Class to instantiate (new Transport)
 * @param {Object|Function}   options   Options to pass to the transport to instantiate.
 *                                      If passed an object, it will be passed as is when
 *                                      calling `new Transport(options)`. If passed a
 *                                      function it will be called before:
 *                                      `new Transport(options())`.
 *                                      If parameter left empty defaults to {}.
 */
module.exports = function (name, Transport, options) {
  describe(name + ' transport (abstract-winston-tranport)', function () {
    require('./log')(name, Transport, options);
    ['stream', 'query'].forEach(function (suite) {
      if (options[suite]) {
        require('./' + suite)(name, Transport, options);
      }
    });
  });
};
