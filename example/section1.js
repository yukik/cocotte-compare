var compare = require('..');

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

// 自己循環
target1.d = target1;
target2.d = target2;

// クロス循環
target1.e = target2;
target2.e = target1;

console.log(compare(target1, target2)); // true


