---
title: 谈一谈 nodejs 中的 eventloop
description: 谈一谈 nodejs 中的 eventloop
meta: JavaScript
---

# 谈一谈 nodejs 中的 eventloop

首先，上一段代码：

```js
const fs = require('fs');
const path = require('path');

function timerFn() {
  console.log('timer run');
}

function immediatFn() {
  console.log('immediate run');
}

function readFileFn(error, data) {
  console.log(`file readed,data:${data}`);
}

function tickFn() {
  console.log('tick run');
}

function promiseFn(res) {
  console.log(res);
}

fs.readFile(path.join(__dirname, 'data.json'), readFileFn);

setTimeout(timerFn, 0);

setImmediate(immediatFn);

const promise = new Promise((resolve, reject) => {
  console.log('promise start');
  resolve('promise resolved');
});

promise.then(promiseFn);

process.nextTick(tickFn);

console.log('main start');
```

大家可以先在不运行的情况下，得出控制台的输出结果，然后运行对比。

所谓异步，比较通俗的理解就是 JS 引擎在运行一些比较耗时的代码时，不会阻塞之后代码的运行，等到耗时代码运行完之后，再做相应的处理，即运行回调函数

从这一段代码中可以看到几种不同的异步操作：

- 延时器：settimeout

- setImmediate

- I/O,代表性的读取文件内容`readFile`

- promise,比较常用的异步方案

- nextTick

这么多异步操作都有回调函数，又该怎么运行呢？实际上，nodejs 将其分门别类，然后存储到不同的队列中。所谓队列，就像现实生活中的排队先到先得一样，在队列中，就是先进先出。nodejs 中主要有以下几个队列：

- timer queue: 处理`settimeout`，`setInterval`的回调函数

- I/O queue:处理 I/O 操作的回调函数

- microtask queue:处理 promise，nextTick 的回调函数

- check queue:处理 setImmediate 的回调函数

- close queue: 任何 close 事件的回调函数

而这些队列的优先级并不是一样的，可以概括成`microtask>timer>I/O>check>close`

**注意：nextTick 始终位于事件循环的第一位**

由此，我们来分析示例代码：

首先，第一次循环：

1. `fs.readFile(path.join(__dirname, 'data.json'), readFileFn);`,把`readFileFn`存进 I/O queue,即`[readFileFn]`;

2. `settimeout(timerFn,0)`,把`timerFn`存进 timer queue,即`[timerFn]`;

3. `setImmediate(immediateFn)`,把`immediateFn`存进 check queue,即`[immediateFn]`;

4. 定义 promise 常量，这里注意**new Promise(fn)中的 fn 函数是立即执行的**，所以控制台输出 promise start,然后返回一个包含 then 方法的 promise 对象

5. `promise.then(promiseFn)`,把`promiseFn`存进 microtask queue,即`[promiseFn]`;

6. `process.nextTick(tickFn)`,把`tickFn`存进 microtask queue,因为 nextTick 的回调函数始终位于事件循环的第一位，则 microtask queue 为`[tickFn,promiseFn]`

7. 控制台输出`main start`

至此，第一次循环完毕，各个队列为：

I/O queue:`[readFileFn]`;
timer queue:`[timerFn]`;
check queue:`[immediateFn]`;
microtask queue:`[tickFn,promiseFn]`

然后，第二次循环：

依据队列优先级来看，依次执行 tickFn，promiseFn,timerFn,immediateFn,此时队列为：

I/O queue:`[readFileFn]`

因为读取文件可能耗时比较长

第三次循环：执行 readFileFn。

小结，nodejs 的事件循环机制，就是按不断地往队列中添加回调函数，并按顺序清理的过程。
