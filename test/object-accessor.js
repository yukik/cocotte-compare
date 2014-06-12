var compare = require('..');
var assert = require('assert');

// 同じ定義
var target1 = {};
Object.defineProperty (target1, 'prop1', {
  enumerable: true,
  get: function () {return this.v;},
  set: function (val) {this.v = val;}
});

var target2 = {};
Object.defineProperty (target2, 'prop1', {
  enumerable: true,
  get: function () {return this.v;},
  set: function (val) {this.v = val;}
});

assert(compare(target1, target2));

// 列挙無し
var target1 = {};
Object.defineProperty (target1, 'prop1', {
  get: function () {return this.v;},
  set: function (val) {this.v = val;}
});

var target2 = {};
Object.defineProperty (target2, 'prop1', {
  get: function () {return this.v;},
  set: function (val) {this.v = val;}
});

assert(compare(target1, target2));

// 値の設定
var target1 = {};
Object.defineProperty (target1, 'prop1', {
  get: function () {return this.v;},
  set: function (val) {this.v = val;}
});

var target2 = {};
Object.defineProperty (target2, 'prop1', {
  get: function () {return this.v;},
  set: function (val) {this.v = val;}
});
target2.prop1 = 1;

assert(!compare(target1, target2));

// 値の設定2 (値のロスト)
var target1 = {};
Object.defineProperty (target1, 'prop1', {
  get: function () {return this.v;}
});

var target2 = {};
Object.defineProperty (target2, 'prop1', {
  get: function () {return this.v;}
});
target2.prop1 = 1; // ロスト

assert(compare(target1, target2));

// 読取専用の相違
target1 = {};
Object.defineProperty (target1, 'prop1', {
  get: function () {return this.v;},
  set: function (val) {this.v = val;}
});

target2 = {};
Object.defineProperty (target2, 'prop1', {
  get: function () {return this.v;}
});

assert(!compare(target1, target2));

// 列挙の相違
target1 = {};
Object.defineProperty (target1, 'prop1', {
  enumerable: true,
  get: function () {return this.v;}
});

target2 = {};
Object.defineProperty (target2, 'prop1', {
  get: function () {return this.v;}
});

// コードの違い
target1 = {};
Object.defineProperty (target1, 'prop1', {
  get: function () {return this.v;}
});

target2 = {};
Object.defineProperty (target2, 'prop1', {
  get: function () {return this.v; /*コメント*/}
});

assert(!compare(target1, target2));