var compare = require('..');
var assert = require('assert');

// undefined
assert( compare());

// null, undefinedの比較
assert( compare(null, null));
assert( compare(undefined, undefined));
assert(!compare(null, undefined));
