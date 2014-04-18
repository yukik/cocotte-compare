cocotte-compare
===============

# はじめに

人間らしい比較を行う関数を提供します。

javascriptの等価演算子では`==`と`===`が存在しますが、どちらもテストに不向きな場面があります。

人間らしい演算子を行う`cocotte-compare`を利用する事で、テストを簡単に行う事ができます。

例えば、`{a: 1} == {a: 1}`としても `{a: 1} === {a: 1}` としても結果は`false`です

`compare({a: 1}, {a: 1})`は`true`を返すことができます

# 例

```javascript
var compare = require('cocotte-compare');

var target1 = {
  a: 1,
  b: 2,
  c: [1, 2, 3]
};
var target2 = {
  b: 2,
  c: [1, 2, 3],
  a: 1
};

// 自己循環
target1.d = target1;
target2.d = target2;

// クロス循環
target1.e = target2;
target2.e = target1;

console.log(compare(target1, target2)); // true

```

# ルール

 + キャストは行いません。`compare(1, '1')`は`false`です
 + 自己循環参照をしている場合も`true`を返します
 + オブジェクトの比較は、`for-in`で列挙されたプロパティに対しルールを適用してすべて一致した場合に`true`です
 + 上記では`hasOwnProperty`での対象の絞り込みをしません
 + オブジェクトのプロパティの追加順序は無視します
 + 組み込みオブジェクトは上記の比較とは異なるルールが適用されます
 + `String`,`Number`,`Boolean`のオブジェクトは、`valueOf()`との一致で`true`です
 + `0`と`-0`との比較は`false`です
 + `Date`オブジェクトは、`getTime()`の値が一致した場合に`true`です
 + エラーオブジェクトは、コンストラクタと`message`プロパティの値が一致した場合に`true`です
 + 配列は、順序が一致し、それぞれの要素にあらたにルールを適用してすべて`true`である場合に`true`です
 + 関数は参照先が同じであるか、コードが同じであるかのどちらかで判別します（後述）
 + クロージャのコンテキストの値は確認しません

# クロージャ

高階関数の戻り値は、毎時異なる参照の関数を返します。

しかし、コンストラクタ関数で動的にメソッドを追加されていると、
同様の手順でオブジェクトを作成した場合でも、同値と見なした方が都合が良い場合があります。

`cocotte-compare`では第３引数に`true`を設定すると、関数が同じ参照先である場合に`true`を返します。

指定していない場合は、同じコードの場合に`true`を返します

ただし、クロージャのコンテキストの値は確認しないため、内部変数の不一致を確認する事ができないことに注意する必要があります。

```javascript
var fn = function fn () {
  return function () {
    return 1;
  };
};

// fnと同じコード
var fn2 = function fn2 () {
  return function () {
    return 1;
  };
};

// fnと処理は同じだがコードは異なる
var fn3 = function fn3 () {
  return function () {
    var x = 1;
    return x;
  };
};

var a = fn();
var b = fn();
var c = fn2();
var d = fn3();

console.log(compare(a, a)); // true
console.log(compare(a, b)); // true
console.log(compare(a, c)); // true
console.log(compare(a, d)); // false

console.log(compare(a, a, true)); // true
console.log(compare(a, b, true)); // false
console.log(compare(a, c, true)); // false
console.log(compare(a, d, true)); // false
```








