# Abstract Winston Transport

A set of `mocha`-based tests for ensuring that a given Transport (written for `winston >= 3`) is compatible with the expected APIs.

> Inspired by https://github.com/maxogden/abstract-blob-store

## Usage

**test/your-transport.test.js**
``` js
require('abstract-winston-transport')({
  name: 'YourTransport',
  Transport: require('../path/to/your/transport')
});
```

**Sample usage from `winston/test/transports/console.test.js`**
``` js
require('abstract-winston-transport')({
  name: 'Console',
  Transport: winston.transports.Console
});
```

### Passing in custom options to your TransportStream

If your custom `TransportStream` requires more options on construction than a default `TransportStream` they can be provided via the `construct` option:

**test/your-transport.test.js**
``` js
require('abstract-winston-transport')({
  name: 'YourTransport',
  Transport: require('../path/to/your/transport'),
  construct: {
    anyRequired: 'value-for-transport',
    anythingReally: 'depends-on-what-you-need'
  }
  //
  // "construct" can also be a function that returns
  // options if that's something you need
  //
  construct: function () {
    return {
      willBe: 'called-before'
      every: 'test'
    };
  }
});
```

### Turning on additional `query` and `stream` test suites

There are additional suites for `query` and `stream` interfaces expected to be exposed on a `winston` Transport (i.e. a `TransportStream`). You can enable these by setting the options to `true`:

**test/your-transport.test.js**
``` js
require('abstract-winston-transport')({
  name: 'YourTransport',
  Transport: require('../path/to/your/transport'),
  query: true,
  stream: true
});
```

##### Author: [Charlie Robbins](https://github.com/indexzero)
##### LICENSE: MIT
