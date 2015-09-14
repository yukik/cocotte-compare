/*
 * @license
 * cocotte-compare v0.5.1
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
 * levelに設定した階層からは===の比較をします
 * @method compare
 * @param  {Mixed}   value
 * @param  {Mixed}   compareTo
 * @param  {Number}  level      (省略可能)
 * @return {Boolean} equal
 */
function compare (value, compareTo, level) {
  var self = {
    level: level || 0,
    eq: eq,
    cacheValue: [],     // 自己参照対策
    cacheCompareTo: [],
  };
  return self.eq(value, compareTo, 0);
}

/*
 * 比較
 */
function eq (value, compareTo, nest) {
  var self = this;

  // ネストレベルが指定レベルなら単純比較
  if (self.level && self.level === nest) {
    return value === compareTo;
  }

  // 循環参照対策
  var idxValue = self.cacheValue.indexOf(value);
  var idxCompareTo = self.cacheCompareTo.indexOf(compareTo);
  if (idxValue !== -1 || idxCompareTo !== -1) {
    return idxValue === idxCompareTo;
  }

  // プリミティブ、値が一致
  // オブジェクト、参照が一致
  if (value === compareTo) {
    return true;
  }

  // プリミティブは比較するまでもなく先の比較が一致しない場合にfalse
  if(value === null || compareTo === null ||
    typeof value === undefined || typeof compareTo === undefined ||
    typeof value === 'string' || typeof compareTo === 'string' ||
    typeof value === 'boolean' || typeof compareTo === 'boolean') {
    return false;
  }

  // 数字の場合はNaNもチェック
  if (typeof value === 'number' || typeof compareTo === 'number') {
    return Number.isNaN(value) && Number.isNaN(compareTo);
  }

  // プロトタイプ
  if (Object.getPrototypeOf(value) !== Object.getPrototypeOf(compareTo)) {
    return false;
  }

  // エラーの場合はstackの比較は行わない
  if (value instanceof Error) {
    return value.message === compareTo.message;
  }

  self.cacheValue.push(value);
  self.cacheCompareTo.push(compareTo);

  // 配列
  if (Array.isArray(value)) {
    return value.length === compareTo.length &&
      value.every(function(val, i) {return self.eq(val, compareTo[i], nest + 1);});
  }

  // 拡張不可
  if (Object.isExtensible(value) !== Object.isExtensible(compareTo)) {
    return false;
  }

  // Boolean, Number, String, Custom
  if (value.valueOf() !== value || compareTo.valueOf() !== compareTo) {
    return self.eq(value.valueOf(), compareTo.valueOf(), nest);
  }

  var names1 = Object.getOwnPropertyNames(value);
  var names2 = Object.getOwnPropertyNames(compareTo);

  if (names1.length !== names2.length) {
    return false;
  }

  return names1.every(function(name) {
    if (!~names2.indexOf(name)) {
      return false;
    }
    var p1 = Object.getOwnPropertyDescriptor(value, name);
    var p2 = Object.getOwnPropertyDescriptor(compareTo, name);
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
      var idxValue = self.cacheValue.indexOf(p1.value);
      var idxCompareTo = self.cacheCompareTo.indexOf(p2.value);
      if (idxValue !== -1 || idxCompareTo !== -1) {
        return idxValue === idxCompareTo;
      }
      if (!self.eq(p1.value, p2.value, nest + 1)) {
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