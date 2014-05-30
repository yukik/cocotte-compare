'use strict';

var compare = require('cocotte-compare');
var assert = require('assert');
var _ = require('underscore');

// 高階関数
var fn = function fn () {
  return function () {
    return 1;
  };
};

// fnと同じコード
var fn2 = function fn2 () {
  return function () {
    return 1;
  };
};

// fnと処理は同じだがコードは異なる
var fn3 = function fn3 () {
  return function () {
    var x = 1;
    return x;
  };
};

var a = fn();
var b = fn();
var c = fn2();
var d = fn3();

// コードが同じであればtrue
assert(compare(a, a));
assert(compare(a, b));
assert(compare(a, c));
assert(!compare(a, d));

// 厳密の場合はunderscoreと同じ
assert(compare(a, a, true));
assert(!compare(a, b, true));
assert(!compare(a, c, true));
assert(!compare(a, d, true));

// assertのequal系
assert.strictEqual(a, a);
assert.notStrictEqual(a, b);
assert.notStrictEqual(a, c);
assert.notStrictEqual(a, d);

// underscoreのisEqual
assert(_.isEqual(a, a));
assert(!_.isEqual(a, b));
assert(!_.isEqual(a, c));
assert(!_.isEqual(a, d));

console.log('test ok');

