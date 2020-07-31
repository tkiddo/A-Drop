---
title: 实现一个简易的react(五):异步setState
description: 实现一个简易版的 react（不含fiber架构），仅仅为了表达思想，可能有多处不严谨。
meta: React
---

# 异步 setState

react 对 setState 做了相应优化，使得每次 setState 后并不是同步去更新视图，而是在合并了多次更改后在合适的时间一次性更新，所以说 setState 是异步的

## 队列

队列是一种先进先出的数据结构，可以用数组的 shift 操作实现队列弹出

首先，要维护一个状态队列，将每次状态的更改加入队列，而不是立即执行渲染组件;

然后，要维护一个组件队列，将需要更新的组件加入队列

```js
/**
 *入队
 * @param {*} state 组件状态
 * @param {*} component 组件实例
 * @param {*} callbak 回调函数
 */
function enqueueSetState(state, component, callback) {
  queue.push({ state, component, callback });
  // 如果待渲染的组件队列中不含有该组件，则组件队列中加入该组件
  if (!renderQueue.some((item) => item === component)) {
    enqueueRender(component);
  }
}

function enqueueRender(component) {
  renderQueue.push(component);
}
```

## 队列清空

按照先进先出的规则遍历状态队列，将组件的状态依次合并，并将最终状态赋予组件，如果有回调函数，则在每次合并后执行同步回调。

遍历完状态后，每个需要更新的组件的状态都是合并之后的最终状态，之后再循环遍历组件队列，依次渲染组件，这就达到了将多次更改合并成一次更新的效果，提升了性能

```js
function flushQueue() {
  let stateItem;
  let componentItem;
  let nextState;
  // 从头部开始遍历状态队列，每遍历一个删除一个
  while ((stateItem = queue.shift())) {
    const { state, component, callback } = stateItem;
    // 组件原先没有state，则赋值新的state
    if (!component.state) {
      nextState = { ...state };
    } else {
      // 组件原先有state，则浅合并
      nextState = { ...component.state, ...state };
    }
    // 将组件赋予新的state
    component.state = nextState;
    // 如果有回调函数，则同步执行回调函数,并绑定组件实例
    if (typeof callback === 'function') {
      callback.call(component);
    }
  }

  // 遍历待渲染组件，此时组件的状态可能是多次合并的结果
  while ((componentItem = renderQueue.shift())) {
    renderComponent(componentItem);
  }
}
```

## 合适的更新时间

这里主要用到了 JavaScript 的事件循环模型，让浏览器在空闲的时间执行

```js
function defer() {
  return function (fn) {
    // 当浏览器空闲时，执行清空队列操作
    requestIdleCallback(fn);
  };
}
```

```js
function enqueueSetState(state, component, callback) {
  // 如果queue的长度是0，也就是在上次flush执行之后第一次往队列里添加
  if (queue.length === 0) {
    defer()(flushQueue);
  }
  queue.push({ state, component, callback });
  // 如果待渲染的组件队列中不含有该组件，则组件队列中加入该组件
  if (!renderQueue.some((item) => item === component)) {
    enqueueRender(component);
  }
}
```
