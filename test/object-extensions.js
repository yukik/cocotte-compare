var compare = require('..');
var assert = require('assert');

// 拡張不可
var d1 = {a: {}};
var d2 = {a: {}};
Object.preventExtensions(d1);
assert(!compare(d1, d2));

// 拡張不可・削除不可
d1 = {a: {}};
d2 = {a: {}};
Object.seal(d1);
assert(!compare(d1, d2));

// 凍結
d1 = {a: {}};
d2 = {a: {}};
Object.freeze(d1);
assert(!compare(d1, d2));

