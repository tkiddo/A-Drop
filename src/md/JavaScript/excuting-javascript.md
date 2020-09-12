---
title: JavaScript执行原理
description: 保存数据和执行代码
meta: JavaScript
---

# 执行 javascript

示例代码：

```js
let num = 3;
function multiplyBy2(inputNumebr) {
  const result = inputNumber * 2;
  return result;
}

const output = multiplyBy2(num);
```

运行 javascript 代码分两个步骤：

1. save data 保存数据

2. run the code 执行代码

按照以上步骤来分析实例代码

第一行：

```js
let num = 3;
```

为`3`这个数字开辟存储空间(memory),并标记为 `num`

接下来:

```js
function multiplyBy2(inputNumebr) {
  const result = inputNumber * 2;
  return result;
}
```

为函数开辟存储空间，保存函数体以及变量`inputNumber`,并标记为`multiplyBy2`

接下来：

```js
const output = multiplyBy2(num);
```

开辟新的存储空间，标记为`output`,值暂时不知道

接下来,执行函数`multiplyBy2(num)`,

从存储空间中取出函数体并执行代码，执行过程中生成新的执行上下文(excuting context)

在新的执行上下文中

为`inputNumber` 赋值为`num`,`num`值为 3

接下来

```js
const result = inputNumer * 2;
return result;
```

开辟新的存储空间，存储`result`，为 3\*2=6，

返回之后就把结果赋值给了`output`
