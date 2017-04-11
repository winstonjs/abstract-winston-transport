//
// Returns a function which logs a specified amount
// of times before calling the provided callback
//
exports.logFor = function logFor(count, done) {
  const infos = [];
  return function log(info, next) {
    infos.push(info);
    if (next) { next(); }
    if (!--count) { return done && done(null, infos); }
    if (count < 0) {
      throw new Error('Invoked more log messages than requested');
    }
  };
};

//
// Helper function that creates `opts.count` infos repeating over the
// `opts.levels` in order.
//
exports.infosFor = function infosFor(opts) {
  const { count, levels } = opts;
  const infos = [];

  for (var i = 0; i < count; i++) {
    infos.push.apply(infos, levels.map(function (level) {
      return {
        message: `Testing message for level: ${level}`,
        index: i,
        level
      };
    }));
  }

  return infos;
};

//
// Helper function for generating a set of messages
// one per level.
//
exports.levelAndMessage = function levelAndMessage (level) {
  return {
    message: `Testing message for level: ${level}`,
    level
  };
};

//
// Adds the { exception: true } to the info created
// (or passed in) with the target `level`.
//
exports.toException = function toException(level) {
  const info = typeof level === 'string'
    ? exports.levelAndMessage(level)
    : level;

  info.exception = true;
  return info;
};

//
// Transforms into a _mock_ internal Node.js WriteReq.
//
exports.toWriteReq = function (obj) {
  return {
    chunk: obj,
    enc: 'utf8',
    callback: function () {}
  };
};

//
// Inspects two arrays
//
exports.inspectLoggedResults = function inspectLoggedResults(actual, expected) {
  const len = actual.length > expected.length
    ? actual.length
    : expected.length;

  console.log(`Length: { actual: ${actual.length}, expected: ${expected.length}`);

  for (let i = 0; i < len; i++) {
    if (actual[i] || expected[i]) {
      console.log(`actual[${i}]: %j`, actual[i]);
      console.log(`expected[${i}]: %j`, expected[i]);
    }
  }
};
