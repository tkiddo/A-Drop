---
title: 实现一个简易的react(三):生命周期和组件更新
description: 实现一个简易版的 react（不含fiber架构），仅仅为了表达思想，可能有多处不严谨。
meta: React
---

# 生命周期和组件更新

生命周期函数是针对类组件而言的，函数组件暂时没有生命周期的说法，函数组件自上而下执行。

## 挂载阶段

- constructor:构造函数

- componentWillMount:即将挂载

- render:生成 vdom

- componentDidMoun:挂载完成，此时已经有真实 dom

## 更新阶段

- componentWillReceiveProps:获得新的 props

- shouldComponentUpdate:判断是否要更新,默认为 true

- render:生成新的 vdom

- componentDidUpdate:真实 dom 更新

## 实现

先写一个执行生命周期的公共函数

```js
/**
 *
 * @param {*} host 组件实例
 * @param {*} name 生命周期名称
 * @param {*} args 生命周期函数入参
 */
function handleLifeCycle(host, name, ...args) {
  if (host[name]) {
    // eslint-disable-next-line prefer-spread
    return host[name].apply(host, args);
  }
  return null;
}

export default handleLifeCycle;
```

根据是否是更新状态来按顺序执行不同的生命周期函数，其中 shouldComponentUpdate 返回 false 时，不向下执行其他生命周期函数

```js
// 生命周期
function executeLifeCycle(instance) {
  if (!instance.vnode.update) {
    handleLifeCycle(instance, 'componentWillMount');
  }
  if (instance.vnode.update) {
    handleLifeCycle(instance, 'componentWillReceiveProps');
    if (!handleLifeCycle(instance, 'shouldComponentUpdate', instance.state, instance.props)) {
      return null;
    }
    emptyContainer(instance.rDom);
  }
  //render函数重新执行获得新的vdom
  const vdom = instance.render();
  if (!instance.vnode.update) {
    handleLifeCycle(instance, 'componentDidMount');
  }
  if (instance.vnode.update) {
    handleLifeCycle(instance, 'componentDidUpdate');
  }
  return vdom;
}
```

# 组件更新

组件第一次实例化的时候要把组件对象即 vnode，父级容器 container，以及真实 dom 都挂载到实例上去，以便更新的时候可以使用

```js
const ins = new type(props);
ins.vnode = vnode;
ins.container = container;
vdom = executeLifeCycle(ins);
rDom = renderComponent(vdom, container);
ins.rDom = rDom;
```

当调用 setState 更新时，将 update 属性设置为 true，并重新渲染整个组件，暂时先用整体替换，以后会加 diff 算法

```js
import { renderComponent } from '../react-dom/DomRender';

export default class Component {
  constructor(props) {
    this.props = props;
  }

  /**
   *
   * @param {*} state 新的state
   * @param {*} callback 回调函数
   */
  setState(state, callback) {
    this.state = {
      ...this.state,
      ...state
    };
    this.vnode.update = true;
    renderComponent.call(this, this.vnode, this.rDom);
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {}
}
```
