/*jshint eqeqeq:false*/
'use strict';

var getType = function getType (target) {

  // undefined, null
  if(target === void 0 || target === null) {
    return target;
  }

  // 文字列
  if (typeof target === 'string') {
    return String;
  }

  // 数字
  if (typeof target === 'number') {
    return Number;
  }

  // 真偽値
  if (typeof target === 'boolean') {
    return Boolean;
  }

  // その他
  return target.constructor;
};

/*
 * 比較
 */
var eq = function eq (target1, target2) {

  var self = this;
  self.nest++;

  // 循環参照対策
  var idx1 = self.obj1.indexOf(target1)
    , idx2 = self.obj2.indexOf(target2);
  if (idx1 !== -1 || idx2 !== -1) {
    return idx1 === idx2;
  }

  // プリミティブ、値が一致
  // オブジェクト、参照が一致
  if (target1 === target2 && target1 !== 0) {
    return true;
  }

  var tp1 = getType(target1)
    , tp2 = getType(target2);

  if (tp1 !== tp2) {
    return false;
  }

  switch(true) {
  case tp1 === Boolean:
    return target1.valueOf() === target2.valueOf();

  case tp1 === String:
    return target1.valueOf() === target2.valueOf();

  case tp1 === Number:
    target1 = target1.valueOf();
    target2 = target2.valueOf();
    if (target1 === 0 && target2 === 0) {
      return 1 / target1 === 1 / target2; // 0と-0
    }
    return target1 === target2 || isNaN(target1) && isNaN(target2);

  case tp1 === RegExp:
    return target1.toString() === target2.toString();

  case tp1 === Date:
    var t1 = target1.getTime()
      , t2 = target2.getTime();
    return t1 === t2 || isNaN(t1) && isNaN(t2);

  case tp1 === Function:
    // 関数は参照が同じ以外は不一致とする
    return false;

  case target1 instanceof Error:
    return target1.message === target2.message;

  case tp1 === Array:
    self.obj1.push(target1);
    self.obj2.push(target2);
    return target1.length === target2.length &&
      target1.every(function(val, i) {return self.eq(val, target2[i]);});

  default:
    self.obj1.push(target1);
    self.obj2.push(target2);

    var keys1 = []
      , keys2 = [];

    for (var k1 in target1) {
      keys1.push(k1);
    }
    for (var k2 in target2) {
      keys2.push(k2);
    }

    if (keys1.length !== keys2.length) {
      return false;
    }

    return keys1.every(function(key) {
      return ~keys2.indexOf(key) && self.eq(target1[key], target2[key]);
    });
  }
};

var compare = function (target1, target2) {
  var self = {
    eq: eq
  , nest: -1 // eqからさらにeqが呼ばれた回数
  , obj1: []
  , obj2: []
  };

  var result = self.eq(target1, target2);
  // console.log(self); // nest確認
  return result;
};

module.exports = exports = compare;


