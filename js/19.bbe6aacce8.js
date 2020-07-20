(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{153:function(s,e,n){const a=n(0);s.exports=function(s){Object.keys(s).forEach((function(e){this[e]=s[e]}));return a.createElement("section",{className:"markdown"},a.createElement("h1",null,"添加样式表"),a.createElement("p",null,"该项目设置使用 webpack 处理所有资源。webpack 提供了一种自定义方式，将",a.createElement("code",{dangerouslySetInnerHTML:{__html:"import"}}),"概念扩展到 JavaScript 之外。要表示 JavaScript 文件依赖于 CSS 文件，您需要",a.createElement("strong",null,"从 JavaScript 文件导入 CSS"),"："),a.createElement("h2",null,"Button.css"),a.createElement("pre",null,a.createElement("code",{className:"language-css",dangerouslySetInnerHTML:{__html:'<span class="hljs-selector-class">.Button</span> {\n  <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;\n}\n'}})),a.createElement("h2",null,"Button.js"),a.createElement("pre",null,a.createElement("code",{className:"language-js",dangerouslySetInnerHTML:{__html:'<span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;\n<span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;./Button.css&#x27;</span>; <span class="hljs-comment">// Tell webpack that Button.js uses these styles</span>\n<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Button</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{\n  render() {\n    <span class="hljs-comment">// You can use them as regular CSS styles</span>\n    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;Button&quot;</span> /&gt;</span></span>;\n  }\n}\n'}})),a.createElement("p",null,a.createElement("strong",null,"这不是 React 所必需的"),"，但是许多人发现此功能很方便。您可以在",a.createElement("a",{href:"https://medium.com/seek-blog/block-element-modifying-your-javascript-components-d7f99fcab52b"},"此处"),"了解此方法的好处。但是，您应该意识到，这使得您的代码与 Webpack 相比，对其他构建工具和环境的可移植性降低。"),a.createElement("p",null,"在开发过程中，以这种方式表达依赖性可以使您在编辑样式时即时重新加载样式。在生产中，所有 CSS 文件都将在构建输出中合并为单个缩小的",a.createElement("code",{dangerouslySetInnerHTML:{__html:".css"}}),"文件。"),a.createElement("p",null,"如果您担心使用特定于 Webpack 的语义，则可以将所有 CSS 正确放入",a.createElement("code",{dangerouslySetInnerHTML:{__html:"src / index.css"}}),"中。它仍然会从",a.createElement("code",{dangerouslySetInnerHTML:{__html:"src / index.js"}}),"导入，但是如果以后迁移到其他构建工具，则可以始终删除该导入。"))}}}]);
//# sourceMappingURL=19.bbe6aacce8.js.map