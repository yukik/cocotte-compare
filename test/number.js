var compare = require('..');
var assert = require('assert');

// 数値の比較
assert( compare(1, 1));
assert( compare(1, Number(1)));
assert( compare(new Number(1), new Number(1)));
assert(!compare(1, new Number(1)));
assert(!compare(new Number(1), 1));
assert(!compare(new Number(1), new Number(2)));
assert( compare(Infinity, Number.POSITIVE_INFINITY));
assert( compare(Infinity, 1/0));
assert(!compare(new Number('hoge'), NaN));
assert( compare(0, 0));
assert( compare(0, -0));
assert( compare(-0, 0));
