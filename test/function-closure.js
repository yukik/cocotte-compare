var compare = require('..');
var assert = require('assert');

// 高階関数
function fn1 () {
  return function () {
    return 1;
  };
}

// fn1と同じコード
function fn2 () {
  return function () {
    return 1;
  };
}

// fn1と処理は同じだがコードは異なる
function fn3 () {
  return function () {
    var x = 1;
    return x;
  };
}

var a = fn1();
var b = fn1();
var c = fn2();
var d = fn3();

// コードが同じであればtrue
assert(compare(a, a));
assert(compare(a, b));
assert(compare(a, c));
assert(!compare(a, d));

// 厳密の場合は参照先で判別する
assert(compare(a, a, true));
assert(!compare(a, b, true));
assert(!compare(a, c, true));
assert(!compare(a, d, true));


// コンテキストの変数による違い
function fn4 () {
  var x = 1;
  return function () {
    return x;
  };
}

// fn4とコンテキストの変数が同じ
function fn5 () {
  var x = 1;
  return function () {
    return x;
  };
}

// fn4とコンテキストの変数が異なる
function fn6 () {
  var x = 2;
  return function () {
    return x;
  };
}

var e = fn4();
var f = fn5();
var g = fn6();

// コードが同じであればtrue
assert(compare(e, e));
assert(compare(e, f));
assert(compare(e, g));
