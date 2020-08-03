---
title: React Hooks 原理及实现
description: 简单实现useState和useEffect
meta: React
---

# React Hooks 原理及实现

在开始讲 React Hooks 原理之前，先来看看 Hooks 的产生是为了解决哪些问题：

- 逻辑很难复用，在类组件的基础上用 HOC 或者 render props,这样会导致组件的层级很深。举个例子，当`react-router`+`redux`结合使用时，可能会出现这样的组件：

```js
export default connect(/*...*/)(WidthRouter(React.memo(myComponent)));
```

- 组件会很大，很多代码必须写在类中

- 类组件中的 this 指向容易出错

- class 代码对于打包工具来说，很难被压缩

## useState

最简单的 useState 的使用方法是这样的：

```js
const Demo = (props) => {
  const [count, setCount] = useState(2);
  return (
    <div>
      <div>count:{count}</div>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
};
```

这里用了 useState 来维护 count 这个状态值。

useState 的原理其实很简单，组件是函数，组件的更新就是重新执行一次函数，而在执行时要确保状态值是最新的。

```js
//用来保存上一次的值
let memorizedState;
function useState(initialState) {
  //获取当前的组件，这里就是简单的从全局获取，有更好的实现，不必关注这里
  const comp = window.currentComponent;
  //如果上一次没有值，也就是第一次渲染，就赋值初始值
  memorizedState = memorizedState || initialState;
  //更新状态函数
  function setState(stateChange) {
    //状态更新
    memorizedState = stateChange;
    //重新渲染组件
    renderComponent(comp);
  }
  //把最新的状态值和更新函数以数组的形式返回
  return [memorizedState, setState];
}
```

基本功能已经完成，但这里会有一个问题，因为全局只有一个`memorizedState`，当有多个`useState`时，后面的会把前面的覆盖掉。用数组可以解决：

```js
const memorizedState = [];
let cursor = 0;
function useState(initialState) {
  const comp = window.currentComponent;
  // 一一对应的state
  memorizedState[cursor] = memorizedState[cursor] || initialState;
  // 用于更新时知道需要的更新的下标值
  const currentCursor = cursor;
  function setState(stateChange) {
    //更新指定的state
    memorizedState[currentCursor] = stateChange;
    //更新完之后重置cursor，以确保下一次函数执行按顺序从头开始取值
    cursor = 0;
    renderComponent(comp);
  }
  // 返回state并cursor加一
  return [memorizedState[cursor++], setState];
}
```

这也就是为什么只能在函数的最外层调用 useState,而不能在循环，条件判断中使用。**因为 memorizedState 数组是按 hook 定义的顺序赖存放数据的，如果顺序有变，数组本身并不会感知**

## useEffect

useEffect 的基本用法是这样的：

```js
useEffect(() => {
  console.log('123');
}, [count]);
```

useEffect 有以下特点：

1. 有两个参数 callback 和 dependencies 数组

2. 如果 dependencies 不存在，那么 callback 每次 render 都会执行

3. 如果 dependencies 存在，只有当它发生了变化， callback 才会执行

基于这些特点来实现一个 useEffect：

```js
function useEffect(callback, depArray) {
  //判断当前depArray是否存在
  const hasNoDeps = !depArray;
  // 指定的依赖
  const deps = memorizedState[cursor];
  // 判断依赖是否改变
  const hasDepChanged = deps ? !depArray.every((el, i) => deps[i] === el) : true;
  // 如果没有依赖货值依赖改变则执行回调函数，并保存当前依赖值
  if (hasNoDeps || hasDepChanged) {
    callback();
    memorizedState[cursor] = depArray;
  }
  cursor++;
}
```

我们可以发现，当第二个参数是空数组时，依赖一直不会变化，回调函数只会执行一次，就相当于生命周期函数`componentDidMount`

参考文章：

[React Hooks 原理](https://github.com/brickspert/blog/issues/26)
[深入 React hooks — 原理 & 实现](https://segmentfault.com/a/1190000020832946)
[阅读源码后，来讲讲 React Hooks 是怎么实现的](https://juejin.im/post/6844903704437456909)
