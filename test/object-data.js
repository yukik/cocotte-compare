var compare = require('..');
var assert = require('assert');

// 同じ定義
var target1 = {};
Object.defineProperty (target1, 'prop1', {
  value: 1,
  writable: true,
  enumerable: true,
  configurable: true
});

var target2 = {};
target2.prop1 = 1;

assert(compare(target1, target2));

// 定義時の値を変更
var target1 = {};
Object.defineProperty (target1, 'prop1', {
  value: 1,
  writable: true,
  enumerable: true,
  configurable: true
});
target1.prop1 = 5;

var target2 = {};
target2.prop1 = 5;

assert(compare(target1, target2));


// 値をオブジェクト
var target1 = {};
Object.defineProperty (target1, 'prop1', {
  value: {a:1, b:2},
  writable: true,
  enumerable: true,
  configurable: true
});

var target2 = {};
target2.prop1 = {a:1, b:2};

assert(compare(target1, target2));


// 値を自己ループ
var target1 = {};
Object.defineProperty (target1, 'prop1', {
  value: target1,
  writable: true,
  enumerable: true,
  configurable: true
});

var target2 = {};
target2.prop1 = target2;

assert(compare(target1, target2));

// 読取専用
var target1 = {};
Object.defineProperty (target1, 'prop1', {
  value: 1,
  writable: false,
  enumerable: true,
  configurable: true
});

var target2 = {};
target2.prop1 = 1;

assert(!compare(target1, target2));

// 列挙の相違
var target1 = {};
Object.defineProperty (target1, 'prop1', {
  value: 1,
  writable: true,
  enumerable: false,
  configurable: true
});

var target2 = {};
target2.prop1 = 1;

assert(!compare(target1, target2));

// 再定義の相違
var target1 = {};
Object.defineProperty (target1, 'prop1', {
  value: 1,
  writable: true,
  enumerable: true,
  configurable: false
});

var target2 = {};
target2.prop1 = 1;

assert(!compare(target1, target2));
