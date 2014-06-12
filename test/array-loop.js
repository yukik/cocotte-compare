var compare = require('..');
var assert = require('assert');

// 循環
var ar1 = [1, 2, 3];
var ar2 = [1, 2, 3];
ar1.push(ar1);
ar2.push(ar2);
assert( compare(ar1, ar2)); // 自己循環
ar1.push(ar2);
ar2.push(ar1);
assert( compare(ar1, ar2)); // クロス循環
