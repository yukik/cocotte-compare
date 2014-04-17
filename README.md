cocotte-compare
===============

# はじめに

人間らしい比較を行う関数を提供します。

javascriptの等価演算子では`==`と`===`が存在しますが、
人間らしい演算子を行う`cocotte-compare`を利用する事で、テストを簡単に行う事ができます。
例えば、`{a: 1} == {a: 1}`としても `{a: 1} === {a: 1}` としても結果は`false`です
`compare({a: 1}, {a: 1})は`true`を返すことができます

# ルール

 + キャストは行いません。`compare(1, '1')`は`false`です
 + 関数は参照が同じである時に`true`です。コードの一致ではありません。
 + 自己循環参照をしている場合も`true`を返します
 + オブジェクトの比較は、`for-in`で列挙されたプロパティに対しルールを適用してすべて一致した場合に`true`です
 + オブジェクトのプロパティの追加順序は無視します
 + 組み込みオブジェクトは上記の比較とは異なるルールが適用されます
 + `String`,`Number`,`Boolean`のオブジェクトは、`valueOf()`との一致で`true`です
 + `0`と`-0`との比較は`false`です
 + `Date`オブジェクトは、`getTime()`の値が一致した場合に`true`です
 + エラーオブジェクトは、`message`プロパティの値が一致した場合に`true`です
 + 配列は、順序が一致し、それぞれの要素にあらたにルールを適用してすべて`true`であるばあいに`true`です

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

