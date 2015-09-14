var compare = require('..');

var x = {};
var y = {};
console.log(compare([x], [y]));    // true
console.log(compare([x], [y], 1)); // false
