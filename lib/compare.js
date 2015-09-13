/*jshint forin:false */

/*
 * @license
 * cocotte-compare v0.5.0
 * Copyright(c) 2014 Yuki Kurata <yuki.kurata@gmail.com>
 * MIT Licensed
 */

module.exports = compare;

// クライアント用
if (typeof window === 'object') {
  if (!window.Cocotte){
    window.Cocotte = {};
  }
  window.Cocotte.compare = compare;
}

/**
 * ディープ比較
 * @method compare
 * @param  {Mixed}   target1
 * @param  {Mixed}   target2
 * @return {Boolean} equal
 */
function compare (target1, target2) {
  var self = {
    eq: eq,
    obj1: [], // 自己参照対策
    obj2: [],
  };
  return self.eq(target1, target2);
}

/*
 * 比較
 */
function eq (target1, target2) {
  var self = this;

  // 循環参照対策
  var idx1 = self.obj1.indexOf(target1);
  var idx2 = self.obj2.indexOf(target2);
  if (idx1 !== -1 || idx2 !== -1) {
    return idx1 === idx2;
  }

  // プリミティブ、値が一致
  // オブジェクト、参照が一致
  if (target1 === target2) {
    return true;
  }

  // プリミティブは比較するまでもなく先の比較が一致しない場合にfalse
  if(target1 === null || target2 === null ||
    typeof target1 === undefined || typeof target2 === undefined ||
    typeof target1 === 'string' || typeof target2 === 'string' ||
    typeof target1 === 'boolean' || typeof target2 === 'boolean') {
    return false;
  }

  // 数字の場合はNaNもチェック
  if (typeof target1 === 'number' || typeof target2 === 'number') {
    return Number.isNaN(target1) && Number.isNaN(target2);
  }

  // プロトタイプ
  if (Object.getPrototypeOf(target1) !== Object.getPrototypeOf(target2)) {
    return false;
  }

  // エラーの場合はstackの比較は行わない
  if (target1 instanceof Error) {
    return target1.message === target2.message;
  }

  self.obj1.push(target1);
  self.obj2.push(target2);

  // 配列
  if (Array.isArray(target1)) {
    return target1.length === target2.length &&
      target1.every(function(val, i) {return self.eq(val, target2[i]);});
  }

  // 拡張不可
  if (Object.isExtensible(target1) !== Object.isExtensible(target2)) {
    return false;
  }

  // Boolean, Number, String, Custom
  if (target1.valueOf() !== target1 || target2.valueOf() !== target2) {
    return self.eq(target1.valueOf(), target2.valueOf());
  }

  var names1 = Object.getOwnPropertyNames(target1);
  var names2 = Object.getOwnPropertyNames(target2);

  if (names1.length !== names2.length) {
    return false;
  }

  return names1.every(function(name) {
    if (!~names2.indexOf(name)) {
      return false;
    }
    var p1 = Object.getOwnPropertyDescriptor(target1, name);
    var p2 = Object.getOwnPropertyDescriptor(target2, name);
    // enumerable
    if (p1.enumerable !== p2.enumerable) {
      return false;
    }
    // configurable
    if (p1.configurable !== p2.configurable) {
      return false;
    }
    if ('writable' in p1) {
      // writable
      if (p1.writable !== p2.writable) {
        return false;
      }
      // value
      var idx1 = self.obj1.indexOf(p1.value);
      var idx2 = self.obj2.indexOf(p2.value);
      if (idx1 !== -1 || idx2 !== -1) {
        return idx1 === idx2;
      }
      if (!self.eq(p1.value, p2.value)) {
        return false;
      }
    } else {
      // get
      if (p1.get !== p2.get) {
        return false;
      }
      // set
      if (p1.set !== p2.set) {
        return false;
      }
    }
    return true;
  });
}

