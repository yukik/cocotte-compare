var compare = require('../compare');

var assert = require('assert');

var target1 = {
  a: 1,
  b: 2,
  c: [1, 2, 3]
};
var target2 = {
  b: 2,
  c: [1, 2, 3],
  a: 1
};

assert(compare(target1, target2));

// 自己循環
target1.d = target1;
target2.d = target2;
assert(compare(target1, target2));

// クロス循環
target1.e = target2;
target2.e = target1;
assert(compare(target1, target2));

// 配列循環
target1.c.push(target1.c);
target2.c.push(target2.c);
assert(compare(target1, target2));

console.log('test ok');