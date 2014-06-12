var compare = require('..');
var assert = require('assert');

// 自己循環
var ob1 = {a: 1};
var ob2 = {a: 1};
ob1.b = ob1;
ob2.b = ob2;
assert(compare(ob1, ob2));

// クロス循環
ob1 = {a: 1};
ob2 = {a: 1};
ob1.y = ob2;
ob2.y = ob1;
assert(compare(ob1, ob2));