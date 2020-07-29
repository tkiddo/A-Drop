---
title: 实现一个简易的react(一):虚拟DOM
description: 实现一个简易版的 react（不含fiber架构），仅仅为了表达思想，可能有多处不严谨。
meta: React
---

# Virtual DOM

实现一个简易版的 react，仅仅为了表达思想，可能有多处不严谨。

## React 组件

在 React 中，组件无非就两种形式，函数组件和类组件（还有标签组件就不说了，基本不用特殊处理）：

函数组件时这样的：

```js
const Hello = (props) => (
  <div className="wrapper">
    <A title="welcome" />
    <span className="title">{props.name}</span>
    <span>123456</span>
  </div>
);
```

类组件是这样的：

```js
export default class Welcome extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <div>
        <span>{this.props.title}</span>
        <img src={logo} />
      </div>
    );
  }
}
```

创建组件的过程就是函数执行和实例化类的过程，其中函数组件返回的和类组件实例执行 render 函数都返回 JSX。

JSX 是一种类似 html 模板的 JavaScript 代码，需要经由 babel 转译，生成以下代码：

```js
'use strict';

const Hello = (props) =>
  /*#__PURE__*/ React.createElement(
    'div',
    {
      className: 'wrapper'
    },
    /*#__PURE__*/ React.createElement(A, {
      title: 'welcome'
    }),
    /*#__PURE__*/ React.createElement(
      'span',
      {
        className: 'title'
      },
      props.name
    ),
    /*#__PURE__*/ React.createElement('span', null, '123456')
  );
```

其中就引用了 React 中的 `createElement` 方法,我们可以看到该函数的入参第一个是元素类型，第二个是元素属性，剩下的是元素的子集，可能是一个或者多个。当我们将组件以`<Hello name='hello'/>`的方式应用时，实际就是调用了`React.createElement(Hello,{name:'hello'})`,最后返回的是一个对象，就像这样：

```js
{
	$$type:Symbol(react.element),
	key:null,
	ref:null,
	props:{name:'hello'}
	type:Hello
}
```

其中\$\$type 表示 React 元素类型，key 和 ref 分别代表属性 key 和 dom 节点，本文暂不需要实现，但传递给函数的属性值都要映射到 props 属性中。

## createElement

接下来，我们来实现以下`createElement`函数，其中关键是映射属性和处理子组件

```js
//映射属性到props
function mapConfigToProps(props, config) {
  for (const key in config) {
    if (config.hasOwnProperty(key)) {
      props[key] = config[key];
    }
  }
}
/**
 *
 * @param {*} type 组件本身
 * @param {*} config 组件属性
 * @param {*} children 子组件
 */
export default function createElement(type, config, children) {
  const props = {};
  mapConfigToProps(props, config);

  //从第三个参数往后都是子组件
  const childrenLength = arguments.length - 2;

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);

    for (let i = 0; i < childrenLength; i += 1) {
      // eslint-disable-next-line prefer-rest-params
      childArray[i] = arguments[i + 2];
    }

    if (Object.freeze) {
      Object.freeze(childArray);
    }
    props.children = childArray;
  }
  return {
    type,
    props
  };
}
```

Virtual Dom 其实就是一个对象形成的树状结构
