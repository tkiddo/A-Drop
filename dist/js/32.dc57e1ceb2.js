(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{174:function(e,n,s){const a=s(0);e.exports=function(e){Object.keys(e).forEach((function(n){this[n]=e[n]}));return a.createElement("section",{className:"markdown"},a.createElement("h1",null,"JSON"),a.createElement("p",null,"JSON(Javascript Object Notation,Javascript 对象表示法),是 JavaScript 的一个严格的子集，利用了 JavaScript 中的一些模式来表示结构化数据结构。",a.createElement("strong",null,"JSON 是一种数据格式，不是一种编程语言。"),"JSON 的语法可以表示以下三种类型的值："),a.createElement("ul",null,a.createElement("li",null,"简单值：包括字符串，数值，布尔值和",a.createElement("code",{dangerouslySetInnerHTML:{__html:"null"}}),",但不支持",a.createElement("code",{dangerouslySetInnerHTML:{__html:"undefined"}}),"。"),a.createElement("li",null,"对象：每个键值对的值可以是简单值，也可以是对象，数组。"),a.createElement("li",null,"数组：数组的值也可以是简单值，对象，数组。 JSON 中所有字符串必须使用",a.createElement("strong",null,"双引号"),"，JSON 中对象的属性也需要加引号。 JSON 对象有两个方法：",a.createElement("code",{dangerouslySetInnerHTML:{__html:"stringify()"}}),",",a.createElement("code",{dangerouslySetInnerHTML:{__html:"parse()"}})),a.createElement("li",null,a.createElement("code",{dangerouslySetInnerHTML:{__html:"JSON.stringify()"}}),"该方法用于把 JSON 对象序列化为 JSON 字符串。在序列化过程中，函数及原型都会被有意忽略，值为",a.createElement("code",{dangerouslySetInnerHTML:{__html:"undefined"}}),"的属性也会被跳过。",a.createElement("code",{dangerouslySetInnerHTML:{__html:"JSON.stringify()"}}),"可以接收三个参数：第一个是要序列化的 Javascript 对象；第二个是过滤器，可以是一个数组，也可以是一个函数；第三个是一个选项，表示是否在字符串中保留缩进。 关于过滤器:如果是一个数组，则返回的字符串中只包含过滤器中包含的属性；如果是一个函数，入参时属性名和属性值，返回处理后的属性值，",a.createElement("strong",null,"在开始时, 过滤器函数会被传入一个空字符串作为 key 值，代表着要被 stringify 的这个对象。随后每个对象或数组上的属性会被依次传入。"))),a.createElement("pre",null,a.createElement("code",{className:"language-js",dangerouslySetInnerHTML:{__html:'<span class="hljs-keyword">let</span> data = {\n  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;king&#x27;</span>,\n  <span class="hljs-attr">age</span>: <span class="hljs-number">12</span>\n};\n<span class="hljs-keyword">let</span> str = <span class="hljs-built_in">JSON</span>.stringify(data, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key, value</span>) </span>{\n  <span class="hljs-keyword">switch</span> (key) {\n    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;name&#x27;</span>:\n      <span class="hljs-keyword">return</span> key + <span class="hljs-string">&#x27;-&#x27;</span> + value;\n    <span class="hljs-keyword">default</span>:\n      <span class="hljs-keyword">return</span> value;\n  }\n});\n<span class="hljs-built_in">console</span>.log(str); <span class="hljs-comment">/*{&quot;name&quot;:&quot;name-king&quot;,&quot;age&quot;:12} */</span>\n'}})),a.createElement("ul",null,a.createElement("li",null,a.createElement("code",{dangerouslySetInnerHTML:{__html:"JSON.parse()"}}),a.createElement("code",{dangerouslySetInnerHTML:{__html:"JSON.parse()"}}),"用于将 JSON 字符串解析成原生 JavaScript 值。可以接收两个参数，第一个是需要解析的字符串；第二个是一个还原函数，将在每个键值对上使用，传入一个键和一个值，返回一个值。")),a.createElement("pre",null,a.createElement("code",{className:"language-js",dangerouslySetInnerHTML:{__html:'<span class="hljs-keyword">let</span> obj = <span class="hljs-built_in">JSON</span>.parse(str, <span class="hljs-function">(<span class="hljs-params">key, value</span>) =&gt;</span> {\n  <span class="hljs-keyword">if</span> (key === <span class="hljs-string">&#x27;age&#x27;</span>) {\n    <span class="hljs-keyword">return</span> value + <span class="hljs-number">1</span>;\n  }\n  <span class="hljs-keyword">return</span> value;\n});\n<span class="hljs-built_in">console</span>.log(obj); <span class="hljs-comment">/*{name: &quot;name-king&quot;, age: 13}*/</span>\n'}})))}}}]);
//# sourceMappingURL=32.dc57e1ceb2.js.map