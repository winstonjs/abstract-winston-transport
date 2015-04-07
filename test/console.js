var winston = require('winston');

var transportTests = require('./index');

describe('Console Transport', function () {
  transportTests('console', winston.transports.Console);
});
