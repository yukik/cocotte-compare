var compare = require('..');
var assert = require('assert');

// 正規表現の比較
assert( compare(/abc/, /abc/));
assert(!compare(/abc/, /abc/g));
assert( compare(/abc/gi, /abc/gi));
assert( compare(/abc/ig, /abc/gi));
assert( compare(/abc/mig , RegExp('abc', 'gim')));
assert( compare(/abc/mig , new RegExp('abc', 'gim')));
assert(!compare(/abc/mig , RegExp('abc', 'im')));
assert(!compare(/abc/mig , new RegExp('abc', 'im')));
assert(!compare(/abc/mig , RegExp('abcdef', 'igm')));
assert(!compare(/abc/mig , new RegExp('abcdef', 'igm')));
assert( compare(/abc/mig , RegExp(/abc/img)));
assert( compare(/abc/mig , new RegExp(/abc/img)));
assert(!compare(/abc/mig , new RegExp(/abc/i)));
