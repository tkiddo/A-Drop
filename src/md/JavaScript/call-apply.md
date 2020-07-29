---
title: call,apply
description: javascript中call和apply的应用场景及原理实现
meta: JavaScript
---

# call，apply 

首先，来看下面这一个例子：

```js
let person = {
  name: 'king',
  greet: function () {
    console.log('hello,' + this.name);
  }
};
//hello,king
person.greet();
```

现在，有另一个对象 person2，`let person2={name:'sara'}`。如果他也想调用 greet 方法，那么可以这么实现：为 person2 添加方法，指向 person 的 greet 方法，即`person2.greet=person.greet`。然而，person2 仅仅是临时需要调用 greet 方法，这样重新为 person2 定义 greet 方法显得不是很有必要，这时候就需要 call 或者 apply 出场了。
利用 call，apply 可以这么实现：

```js
person.greet.call(person2); //hello,sara
person.greet.apply(person2); //hello,sara
```

其实 `call` 和 `apply` 的用处是一样的，就是让对象临时调用本不属于自己的方法，而不用为自身添加该方法。两者的不同在于调用的时候传参的形式，`call` 以单个参数依次传入，`apply` 以数组的方式传入，以上 greet 方法没有形参，所以不能体现出不同。以上例子稍作修改即可体现：

```js
let person = {
  name: 'king',
  greet: function (str) {
    console.log(str, this.name);
  }
};
let person2 = { name: 'sara' };
person.greet.call(person2, 'hi'); //hi,sara
person.greet.apply(person2, ['hi']); //hi,sara
```

## 模拟实现原理

```js
Function.prototype.call2 = function (context) {
  let ctx = context || window;
  ctx.fn = this; //此处this指向调用call2函数的函数对象，例子中是peoson.greet
  //传参，call2函数的第一个参数是需要调用函数的对象，函数参数从第二个开始
  let args = [];
  for (let i = 1, len = arguments.length; i < len; i++) {
    args.push(arguments[i]);
  }
  ctx.fn(...args); //es6扩展运算符，相当于ctx.fn(args[0],args[1],...args[args.length-1])
  delete ctx.fn; //用完删除，释放空间
};
person.greet.call2(person2, 'hi'); //hi,sara
```

```js
Function.prototype.apply2 = function (context, arr) {
  let ctx = context || window;
  ctx.fn = this;
  //判断是否带参数，以及参数是否为数组
  if (!arr) {
    ctx.fn();
  } else {
    if (!arr instanceof Array) {
      throw new Error('params must be array');
    } else {
      ctx.fn(...arr);
    }
  }
  delete ctx.fn;
};
person.greet.apply2(person2, ['hi']); //hi,sara
```

简单的说，call,apply 可以让一个函数临时成为对象的方法，即让函数中的 this 可以指向该对象。
