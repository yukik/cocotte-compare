var compare = require('..');
var assert = require('assert');

// エラーの比較
assert( compare(new Error('error1'), new Error('error1')));
assert( compare(new Error('error1'), Error('error1')));
assert(!compare(new Error('error1'), new Error('error2')));
assert(!compare(new Error('error1'), Error('error2')));
assert(!compare(new Error('error1'), new TypeError('error1')));

