---
title: JS数组常用方法
description: JS数组的常用方法
meta: JavaScript
---

# JS 数组的常用方法

本文从增删改查四个方面来罗列 Javascript 中数组的方法

## 增

- 头增:`unshift()`

`unshift`函数往数组的头部添加元素，该方法**改变原数组，并返回数组的长度**

```js
const array = [1, 2, 3];
const len = array.unshift(0);
console.log(len, array); //4 , [0, 1, 2, 3]
```

- 尾增:`push()`

`push`函数往数组的尾部添加元素，该方法**改变原数组，并返回数组的长度**

```js
const array = [1, 2, 3];
const len = array.push(4);
console.log(len, array); //4 , [1, 2, 3, 4]
```

## 删

- 头删:`shift`

`shift`函数删除数组第一个元素，该方法**改变原数组，并返回被删除的元素**

```js
const array = [1, 2, 3];
const res = array.shift();
console.log(res, array); //1 , [2, 3]
```

- 尾删:`pop`

`pop`函数删除数组最后一个元素，该方法**改变原数组，并返回被删除的元素**

```js
const array = [1, 2, 3];
const res = array.pop();
console.log(res, array); //3 ， [1, 2]
```

- 任意位置删除元素，增加元素:`splice`

`splice`函数接收 3 个参数，起始位置，删除数量，要添加的元素，即可以在任意位置删除元素，也可以增加元素,该方法**改变原数组，并以数组的形式返回被删除的元素**

```js
const array = [1, 2, 3, 4];
const res = array.splice(1, 2, 6, 7);
console.log(res, array); //[2, 3] , [1, 6, 7, 4]
```

## 改

- `forEach`

`forEach`函数接收回调函数，数组的每个元素都会执行该回调函数,该方法**总是返回 undefined，不会改变原数组**,但是元素可以被回调函数改变，比如对象的属性改变

```js
const array = [1, 2, 3, 4];
const res = array.forEach((item) => {
  item++;
});
console.log(res, array); // undefined,[1, 2, 3, 4]
```

```js
const array = [{ number: 1 }, { number: 2 }];
const res = array.forEach((item) => {
  item.number++;
});
console.log(res, array); //undefined,[{number:2},{number:3}]
```

- `map`

`map`函数接收回调函数，数组的每个元素都会执行回调函数，并将返回值组成新的数组返回，该方法**不改变原数组，并返回新数组**

```js
const array = [1, 2, 3];
const res = array.map((item) => item + 1);
console.log(res, array); //[2,3,4],[1,2,3]
```

## 查

- 查索引:`findIndex`

`findIndex`方法**返回数组中满足提供的测试函数的第一个元素的索引**。若没有找到对应元素则返回-1。该方法**不改变原数组**

`indexOf`和`lastIndexOf`也可以查元素索引

```js
const array = [1, 2, 3];
const res = array.findIndex((item) => item > 1);
console.log(res, array); //1 , [1, 2, 3]
```

- 查元素:`find`

和`findIndex`方法类似，不过返回的是元素，如果找不到返回 undefined

```js
const array = [1, 2, 3];
const res = array.find((item) => item > 1);
console.log(res, array); //2 , [1, 2, 3]
```

- 过滤元素:`filter`

`filter` 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。该方法**不改变原数组**

```js
const array = [1, 2, 3];
const res = array.filter((item) => item > 1);
console.log(res, array); // [2,3],[1,2,3]
```
