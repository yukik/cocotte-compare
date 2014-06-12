var compare = require('..');
var assert = require('assert');

// 文字列の比較
assert( compare('abc', 'abc'));
assert(!compare('abc', 'def'));
assert( compare('abc', String('abc')));
assert(!compare('abc', new String('abc')));
assert(!compare(new String('abc'), 'abc'));
assert( compare(new String('abc'), new String('abc')));
assert(!compare(new String('abc'), new String('def')));


