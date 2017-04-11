//
// Returns a function which logs a specified amount
// of times before calling the provided callback
//
exports.logFor = function logFor(count, done) {
  const infos = [];
  return function log(info, next) {
    infos.push(info);
    next();
    if (!--count) { return done && done(null, infos); }
    if (count < 0) {
      throw new Error('Invoked more log messages than requested');
    }
  };
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
