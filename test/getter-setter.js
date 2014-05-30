'use strict';

var compare = require('../compare');

var assert = require('assert');

var target1 = {};
var target2 = {};


Object.defineProperty (target1, 'prop1', {
  enumerable: true,
  set: function (val) {this.v = val;},
  get: function () {
    return this.v;
  }
});

Object.defineProperty (target2, 'prop1', {
  enumerable: true,
  set: function (val) {this.v = val;},
  get: function () {
    return void 0;
  }
});

assert(compare(target1, target2));

console.log('test ok');