var compare = require('..');
var assert = require('assert');

// 配列
assert( compare([], []));
assert( compare([1, 2, 3], [1, 2, 3]));
assert(!compare([1, 2, 3], [1, 2]));
assert(!compare([1, 2], [1, 2, 3]));
assert( compare(Array(), []));
assert( compare(new Array(), []));
assert( compare(Array(1), [undefined]));
assert(!compare(Array(1), []));
assert( compare(Array(1, 2, 3), [1, 2, 3]));
