'use strict';

var compare = require('../compare');

var assert = require('assert');

// undefined
assert( compare());

// null, undefinedの比較
assert( compare(null, null));
assert( compare(undefined, undefined));
assert(!compare(null, undefined));

// 真偽値の比較
assert( compare(true, true));
assert(!compare(true, false));
assert( compare(true, new Boolean(1)));
assert( compare(new Boolean(1), true));
assert( compare(new Boolean(1), new Boolean(1)));
assert(!compare(true, 1));

// 数値の比較
assert( compare(1, 1));
assert( compare(1, new Number(1)));
assert( compare(new Number(1), 1));
assert( compare(new Number(1), new Number(1)));
assert( compare(Infinity, Number.POSITIVE_INFINITY));
assert( compare(Infinity, 1/0));
assert( compare(new Number('hoge'), NaN));
assert( compare(0, 0));
assert(!compare(0, -0));
assert(!compare(-0, 0));

// 文字列の比較
assert( compare('abc', 'abc'));
assert(!compare('abc', 'def'));
assert( compare('abc', new String('abc')));
assert( compare(new String('abc'), 'abc'));
assert( compare(new String('abc'), new String('abc')));

// 日付の比較
assert( compare(new Date('2013-9-1'), new Date('2013-9-1')));
assert(!compare(new Date('2013-9-1'), new Date('2013-9-2')));
assert( compare(new Date('hoge'), new Date('hage')));

// 正規表現の比較
assert( compare(/abc/, /abc/));
assert(!compare(/abc/, /abc/g));
assert( compare(/abc/mig , new RegExp('abc', 'gim')));

// エラーの比較
assert( compare(new Error('error1'), new Error('error1')));
assert(!compare(new Error('error1'), new Error('error2')));
assert(!compare(new Error('error1'), new TypeError('error1')));

// 配列
assert( compare([], []));
assert( compare([1, 2, 3], [1, 2, 3]));
assert(!compare([1, 2, 3], [1, 2]));
assert(!compare([1, 2], [1, 2, 3]));
assert( compare(new Array(), []));
assert( compare(new Array(1), [undefined]));
assert(!compare(new Array(1), []));
assert( compare(new Array(1, 2, 3), [1, 2, 3]));
var ar1 = [1, 2, 3];
var ar2 = [1, 2, 3];
ar1.push(ar1);
ar2.push(ar2);
assert( compare(ar1, ar2)); // 自己循環
ar1.push(ar2);
ar2.push(ar1);
assert( compare(ar1, ar2)); // クロス循環

// オブジェクトの比較 1
assert( compare({}, {}));
assert( compare({a: 1}, {a: 1}));
assert(!compare({a: 1}, {a: 2}));
assert( compare({a: 1, b: 2}, {b: 2, a: 1}));

// 関数の比較
var fn1 = function fn1 () {};
var fn2 = function fn2 () {};

assert( compare(fn1, fn1));
assert(!compare(fn1, fn2));

// オブジェクトの比較 2
var ob11 = new fn1();
var ob12 = new fn1();
var ob21 = new fn2();

assert( compare(ob11, ob12));
assert(!compare(ob11, ob21));

// オブジェクトの比較 3
var fn3 = function fn3 (name) { this.name = name; };
fn3.prototype.name = null;

var ob31 = new fn3('toyota');
var ob32 = new fn3('honda');
var ob33 = new fn3('honda');

assert(!compare(ob31, ob32));
assert( compare(ob32, ob33));

// 複雑なオブジェクトの比較
var ob1 = {
    a: 1
  , b: new Date('2013-9-1')
  , c: {d: new fn1()}
};

var ob2 = {
    a: 1
  , b: new Date('2013-9-1')
  , c: {d: new fn1()}
};

var ob3 = {x: ob1, y: ob2 };

ob1.x = ob3;
ob2.x = ob3;
assert( compare(ob1, ob2));

ob1.y = ob1;
ob2.y = ob2;
assert( compare(ob1, ob2)); // 自己循環

ob1.y = ob2;
ob2.y = ob1;
assert( compare(ob1, ob2)); // クロス循環

console.log('test ok');
