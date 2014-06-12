var compare = require('..');
var assert = require('assert');

// 真偽値の比較
assert( compare(true, true));
assert(!compare(true, false));
assert( compare(true, Boolean(1)));
assert(!compare(true, new Boolean(1)));
assert(!compare(new Boolean(1), true));
assert( compare(new Boolean(1), new Boolean(1)));
assert( compare(new Boolean(1), new Boolean(2)));
assert(!compare(new Boolean(1), new Boolean(0)));
assert(!compare(true, 1));



