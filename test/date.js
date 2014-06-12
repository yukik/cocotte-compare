var compare = require('..');
var assert = require('assert');

// 日付の比較
assert( compare(new Date('2013-9-1'), new Date('2013-9-1')));
assert(!compare(new Date('2013-9-1'), new Date('2013-9-2')));
assert( compare(new Date('foo'), new Date('foo')));
assert( compare(new Date('foo'), new Date('bar')));