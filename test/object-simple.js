var compare = require('..');
var assert = require('assert');

// オブジェクトの比較 1
assert( compare({}, {}));
assert( compare({a: 1}, {a: 1}));
assert(!compare({a: 1}, {a: 2}));
assert( compare({a: 1, b: 2}, {b: 2, a: 1}));