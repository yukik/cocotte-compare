var compare = require('..');
var assert = require('assert');

// 関数の比較
function fn1 () {}
function fn2 () {}

var fn3 = function fn1 () {};

assert( compare(fn1, fn1));
assert(!compare(fn1, fn2));
assert( compare(fn1, fn3));
