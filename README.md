cocotte-compare
===============

# はじめに

人間らしい比較を行う関数を提供します  
javascriptの等価演算子では`==`と`===`が存在しますが、どちらもテストに不向きな場面があります  
人間らしい演算子を行う`cocotte-compare`を利用する事で、テストを簡単に行う事ができます  
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
 + プリミティブは値を比較します
 + `valueOf`メソッドが自身を返さないオブジェクトはその値同士を比較し、プロパティの比較を行いません
 + オブジェクトの比較は、すべてのプロパティに対しルールを適用して一致する必要があります
 + プロパティの追加順序は無視します
 + 配列は、順序が一致し、それぞれの要素にルールを適用してすべて`true`である場合に`true`です
 + 自己循環参照にも対応しています
 + `0`と`-0`との比較は`true`です
 + `new`を使用して作成された`String`,`Number`,`Boolean`とプリミティブの値との比較は`false`です
 + エラーオブジェクトは、プロトタイプと`message`プロパティの値が一致した場合に`true`です
 + 関数は参照先が同じである場合にのみ`true`です
 + プロパティのenumerable,writable,configurableの設定が異なる場合も`false`です
 + プロパティのget,setはたとえコードが一緒でも関数が一致しない場合は`false`です
 + preventExtensions,seal,freezeされたオブジェクトとされていないオブジェクトとの比較は`false`です

