var compare = require('..');
var assert = require('assert');

// 配列
var x = [[]];
var y = [[]];
assert( compare(x, x));
assert( compare(x, y));
assert( compare(x, x, 1));
assert(!compare(x, y, 1));
assert( compare(x, y, 2));