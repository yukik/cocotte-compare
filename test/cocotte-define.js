'use strict';

var compare = require('cocotte-compare');
var def = require('cocotte-define');
var assert = require('assert');

// cocotte-defineを使用したクラス定義
var Klass = function Klass() {
  def(this, null, meths);
};
var meths = {};
meths.setName = function (pv) {
  return {
    params: [String],
    method: function (val) {
      pv.name = val;
    }
  };
};

// インスタンス
var ins1 = new Klass();
ins1.setName('foo');

var ins2 = new Klass();
ins2.setName('foo');


assert(compare(ins1, ins2));

assert(!compare(ins1, ins2, true));

console.log('test ok');