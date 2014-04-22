'use strict';

var compare = require('cocotte-compare');
var def = require('cocotte-define');
var assert = require('assert');

// cocotte-defineを使用したクラス定義

// ------------- クラス定義
var Klass = function Klass() {
  this.def(Klass);
};
def(Klass);

Klass.properties.name = {type: String};

Klass.properties.birthday = {type: Date};

Klass.properties.age = function (pv) {
  return {
    getter: function () {
      return pv.birthday ? getAge(pv.birthday, new Date()) : null;
    }
  };
};

Klass.properties.nameLength = function(pv){
  return {
    getter: function() {
      return pv.name ? pv.name.length : null;
    }
  };
};

Klass.methods.getAge = function (pv) {
  return {
    params: [Date],
    method: function (val) {
      return getAge(pv.birthday, val || new Date());
    }
  };
};

// 年齢の計算
function getAge (birthday, when) {
  if (!birthday || !when) {
    return null;
  }
  var b = new Date(birthday.getTime()).setFullYear(2000);
  var w = new Date(when.getTime()).setFullYear(2000);
  return when.getFullYear() - birthday.getFullYear() - (b <= w ? 0: 1);
}

// ------------- ユーザーコード
var ins1 = new Klass();
ins1.name = 'foo';
ins1.birthday = new Date('1990-8-30');

var ins2 = new Klass();
ins2.name = 'foo';
ins2.birthday = new Date('1990-8-30');

// ------------- テスト
assert(compare(ins1, ins2));
assert(compare(ins1, ins2, true));

console.log('test ok');