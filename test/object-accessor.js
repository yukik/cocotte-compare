var compare = require('..');
var assert = require('assert');

var target1, target2, get, set;

get = function () {return this.v;};
set = function (val) {this.v = val;};


// 同じ定義
target1 = {};
Object.defineProperty (target1, 'prop1', {
  enumerable: true,
  get: get,
  set: set
});

target2 = {};
Object.defineProperty (target2, 'prop1', {
  enumerable: true,
  get: get,
  set: set
});

assert(compare(target1, target2));

// 関数が異なる
target1 = {};
Object.defineProperty (target1, 'prop1', {
  enumerable: true,
  get: get,
  set: set
});

target2 = {};
Object.defineProperty (target2, 'prop1', {
  enumerable: true,
  get: function () {return this.v;},
  set: set
});

assert(!compare(target1, target2));


// 列挙無し
target1 = {};
Object.defineProperty (target1, 'prop1', {
  get: get,
  set: set
});

target2 = {};
Object.defineProperty (target2, 'prop1', {
  get: get,
  set: set
});

assert(compare(target1, target2));

// 値の設定
target1 = {};
Object.defineProperty (target1, 'prop1', {
  get: get,
  set: set
});

target2 = {};
Object.defineProperty (target2, 'prop1', {
  get: get,
  set: set
});
target2.prop1 = 1;

assert(!compare(target1, target2));

// 値の設定2 (値のロスト)
target1 = {};
Object.defineProperty (target1, 'prop1', {
  get: get
});

target2 = {};
Object.defineProperty (target2, 'prop1', {
  get: get
});
target2.prop1 = 1; // ロスト

assert(compare(target1, target2));

// 読取専用の相違
target1 = {};
Object.defineProperty (target1, 'prop1', {
  get: get,
  set: set
});

target2 = {};
Object.defineProperty (target2, 'prop1', {
  get: get
});

assert(!compare(target1, target2));

// 列挙の相違
target1 = {};
Object.defineProperty (target1, 'prop1', {
  enumerable: true,
  get: get
});

target2 = {};
Object.defineProperty (target2, 'prop1', {
  get: get
});

assert(!compare(target1, target2));