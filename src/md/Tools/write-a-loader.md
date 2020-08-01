---
title: 手写一个处理markdown文件的loader
description: 从手写一个webpack loader 了解loader 的原理
meta: webpack
---

# 手写一个 webpack loader

loader 是 webpack 的重要组成部分，它是 webpack 能够将各种资源作为模块引入的关键。

## 何为 loader

loader 可以说是将资源变成源代码的转换器，经过转化之后，你就可以在 js 中通过`import`引入。

## 编写原则

- Simple：单一功能，维护更容易，支持链式调用

- Chaining：链式调用

- Modular：保证输出的模块化。输出就和普通的模块一样

- StateLess：无状态。在转化资源的过程中不保留状态

- Loader Utilities：善用 loader 工具包，主要是`loader-utils`,`schema-utils`。可用于读取 loader 参数等

- Loader Dependencies: 外部资源(比如从本地文件系统读取的 js)引入必须指出

- Module Dependencies：使用合适的模块依赖解决方案，例如`require`方式

- Common Code：提取公共代码

- Absolute Paths：避免使用绝对路径

- Peer Dependencies

这里最主要的是前四条：单一功能，链式调用，模块化，无状态

## 开始

我们知道，资源经过 loader 处理之后能够以模块的形式被 js 引用，因此 loader 的作用就是将不同形式的资源处理成一段通用的 js 可执行代码，执行的结果就是导出一个模块，因为运行在 node 端，用的是 commonjs 规范，比如`module.exports={...}`

```js
function parse(source) {
  //...
  //content表示处理之后的字符串
  return `module.exports=${content}`;
}
```

- 解析 markdown 文件

这里用到[front-matter](https://github.com/jxson/front-matter)，读取 markdown 文件，并以 js 对象的形式返回

比如源文件是这样的：

```markdown
---
title: Just hack'n
description: Nothing to see here
---

This is some text about some stuff that happened sometime ago
```

经过处理：

```js
{
    attributes: {
        title: 'Just hack\'n',
        description: 'Nothing to see here'
    },
    body: 'This is some text about some stuff that happened sometime ago',
    bodyBegin: 6,
    frontmatter: 'title: Just hack\'n\ndescription: Nothing to see here'
}
```

我们要处理的文本内容就是 body 的值

如果仅仅是处理成 html 字符串，导出`JSON.stringify(body)`即可。

## 处理成 react component

处理成 react 组件要复杂一些，最后导出的可执行 js 中要包含引入 react 的代码，以及 jsx 要经过 babel 转义，因此需要引入`@babel/core`和`@babel/preset-react`

```js
const prependOutput = "const React = require('react')";

//对于代码块的处理
const template = body
  .replace(/<code(\s[^>]+)>(.+?)<\/code>/gs, '<code$1 dangerouslySetInnerHTML={{ __html:`$2`}} />')
  .replace(/<code>(.+?)<\/code>/gs, '<code dangerouslySetInnerHTML={{ __html:`$1`}} />')
  .replace(/<(code|pre)([^\s>]*)\sclass=([^>]+)>/g, '<$1$2 className=$3>')
  .replace(/<img src="(.+?)"/gs, '<img src={require("$1").default}')
  // 解决模版字符串输出异常问题
  .replace(/`/g, 'fuck')
  .replace(/\$\{/g, 'shit')
  .replace(/__html:fuck(.+?)fuck}} \/>/gs, '__html:`$1`}} />');

// babel转译
const compiled = babelCore.transformSync('const markdown = ' + template, {
  presets: ['@babel/preset-react']
});

let { code } = compiled;
code = code.replace(/fuck/g, '\\`').replace(/shit/g, '\\$\\{');

//拼接函数
const reactComponent = `
      function (props) {
        Object.keys(props).forEach(function (key) {
          this[key] = props[key]
        })
        ${code}
        return markdown
      }`;

return `${prependOutput}\nmodule.exports = ${reactComponent}`;
```

## loader options

`loader-utils`和`schema-utils`可以用来读入用户配置的 options 并验证其有效性

```js
const options = loaderUtils.getOptions(this);
validateOptions(schema, options, {
  name: 'md-loader',
  baseDataPath: 'options'
});
```
