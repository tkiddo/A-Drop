# javascript 原始类型

这一节简要梳理一下 JavaScript 中的数据类型和基本用法。JavaScript 是一种弱类型或者说是动态类型的语言，即在使用过程中不需要事先定义变量的类型，程序在运行过程中会根据实际情况自行决定其类型。 ####数据类型
根据最新的 ECMAscript 标准，一共分 8 中类型：

- 7 种原始数据类型
  1.Number
  2.String
  3.Boolean
  4.Symbol
  5.Null
  6.Undefined
  7.BigInt
- 1 种引用数据类型
  1.Object

## 使用 typeof 判断类型

typeof 返回的是数据类型的字符串表达

```js
typeof 3; //"number"
typeof '3'; //"string"
typeof false; //"boolean"
typeof null; //"object"
typeof undefined; //"undefined"
typeof {}; // "object"
typeof Symbol(1); //"symbol"
typeof 10n; //"bigint"
```

#### 注意

- 尽管`typeof null === 'object'` 返回 true，但这其实是一个公认的 bug，`null` 是基本数据类型。
- 数据类型的字符串表达首字母小写
  +BigInt 是 ES10 新特性，表示任意精度整数，以后的文章会有讲解
