# race-as-promised

This module implements `Promise.race()` in a way that does not leak
memory.

*Note that you might not need this package; see below.*

## Rationale

The V8 Promise implementation used to leak memory in many common
`Promise.race([...])` call cases; see
e.g. https://github.com/nodejs/node/issues/17469.

The V8 Promise implementation has
[recently](https://github.com/nodejs/node/issues/17469#issuecomment-4916015158)
been [fixed](https://github.com/nodejs/node/pull/64101). If you target
Node versions 26.5.0 and above, or Chromium 151 and above, the native
implementation has the fix so this package is not needed.

Note that the "native Promise.race" test errors out in such newer
environments, indicating absence of memory leak.

Older Node/Chromium versions, and
[Safari](https://bugs.webkit.org/show_bug.cgi?id=313787), may serve as
examples of environments that still need the package.

See also: https://bugs.chromium.org/p/v8/issues/detail?id=9858

## Installation

```bash
npm install race-as-promised
```

## Usage

```js
const race = require ("race-as-promised");

// Use race([...]) instead of Promise.race([...])
```

## Author

The source code and test core [have been made available under The
Unlicense](https://github.com/nodejs/node/issues/17469#issuecomment-776343813)
by [Brian Kim](https://github.com/brainkim), to whom we owe our gratitude.

An additional issue in the original code has been found and fixed by
[Dan Bornstein](https://github.com/danfuzz), whose efforts are
likewise appreciated.

## License

[The Unlicense](https://spdx.org/licenses/Unlicense.html)
