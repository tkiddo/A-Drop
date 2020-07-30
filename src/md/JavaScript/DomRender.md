---
title: 实现一个简易的react(二):组件渲染
description: 实现一个简易版的 react（不含fiber架构），仅仅为了表达思想，可能有多处不严谨。
meta: React
---

# 组件渲染

我们在使用 React 时，一般都在入口文件处加以下代码：

```js
ReactDOM.ender(<Hello name="hello" />, document.getElementById('root'));
```

这就是渲染组件。接下来，我们来简单实现以下 render 函数

## render

```js
/**
 *
 * @param {*} vnode 组件
 * @param {*} container 父级容器
 * @param {*} callback 回调函数
 */
export default function render(vnode, container, callback) {
  //deal with vnode...

  return container;
}
```

render 函数主要有两个功能，生成 virtual dom 和将 virtual dom 转化成真实 dom

- 由 vnode 生成 virtual dom

这里的组件包含函数组件，类组件，标签，节点，其中标签和节点已经是 virtual dom 的形式了，不需要进一步处理。

对于函数组件，生成 Vdom 的方法是执行函数得到返回值;而对于类组件，是先实例化，然后执行对象的 render 方法

```js
if (typeof type === 'function') {
  let vdom;
  if (type.prototype && type.prototype.render) {
    const ins = new type(props);
    vdom = ins.render();
  } else {
    vdom = type(props);
  }
}
```

这里补充以下 React.Component 类：

```js
export default class Component {
  //将参数挂到props属性上去
  constructor(props) {
    this.props = props;
  }

  setState() {}

  render() {}
}
```

- 将 virtual dom 转化成真实 dom

这里用到了 document 的一些基本操作，包括创建元素，设置属性等：

```js
//对于字符节点
if (typeof vnode === 'string') {
  const text = document.createTextNode(vnode);
  container.appendChild(text);
  return text;
}
//对于标签
if (typeof type === 'string') {
  const element = document.createElement(type);
  for (const key in props) {
    if (props.hasOwnProperty(key) && key !== 'children') {
      //将className转化成class
      if (key === 'className') {
        element.setAttribute('class', props[key]);
      } else {
        element.setAttribute(key, props[key]);
      }
    }
  }
  if (props.children) {
    //对于子组件为多个时，依次调用render，并添加到当前组件尾部
    if (Array.isArray(props.children)) {
      props.children.forEach((item) => {
        element.appendChild(render(item, element));
      });
    } else {
      element.appendChild(render(props.children, element));
    }
  }
  container.appendChild(element);
  return element;
}
```
