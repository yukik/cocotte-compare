var compare = require('..');
var assert = require('assert');

// インスタンス1
function Fn1 () {}
function Fn2 () {}

var ob11 = new Fn1();
var ob12 = new Fn1();
var ob21 = new Fn2();

assert( compare(ob11, ob12));
assert(!compare(ob11, ob21));

// インスタンス2
function Fn3 (name) {
  this.name = name;
}
Fn3.prototype.name = null;

var ob31 = new Fn3('toyota');
var ob32 = new Fn3('honda');
var ob33 = new Fn3('honda');

assert(!compare(ob31, ob32));
assert( compare(ob32, ob33));


