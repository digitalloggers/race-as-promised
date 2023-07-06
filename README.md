# race-as-promised

This module implements Promise.race() in a way that does not leak
memory.

## Rationale

The V8 Promise implementation does leak memory in many common
Promise.race([...]) call cases; see
e.g. https://github.com/nodejs/node/issues/17469.

The V8 Promise implementation is likely [not going to be
fixed](https://github.com/nodejs/node/issues/17469#issuecomment-349794909).

See also: https://bugs.chromium.org/p/v8/issues/detail?id=9858

## Installation

    npm install race-as-promised

## Usage

    const race = require ("race-as-promised");

    // Use race([...]) instead of Promise.race([...])

## Author

The source code and test core [have been made available under The
Unlicense](https://github.com/nodejs/node/issues/17469#issuecomment-776343813)
by [Brian Kim](https://github.com/brainkim), to whom we owe our gratitude.

An additional issue in the original code has been found and fixed by
[Dan Bornstein](https://github.com/danfuzz), whose efforts are
likewise appreciated.

## License

[The Unlicense](https://spdx.org/licenses/Unlicense.html)
