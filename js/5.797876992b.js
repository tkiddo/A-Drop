(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{167:function(s,a,n){const l=n(0);s.exports=function(s){Object.keys(s).forEach((function(a){this[a]=s[a]}));return l.createElement("section",{className:"markdown"},l.createElement("h1",null,"css实现椭圆"),l.createElement("p",null,"背景知识：",l.createElement("code",{dangerouslySetInnerHTML:{__html:"border-radius"}}),"对于",l.createElement("code",{dangerouslySetInnerHTML:{__html:"border-radius"}}),"，有一个鲜为人知的知识点：它可以单独指定水平和垂直半径，只要用一个斜杠（/）分隔开就可以。实现椭圆就要用到这一点。"),l.createElement("ol",null,l.createElement("li",null,"全椭圆 以椭圆左上角为例，可以得到以下分析：")),l.createElement("p",null,l.createElement("img",{src:n(219).default,alt:"椭圆左上角分析"}),"举一反三，其他三个角的水平半径和垂直半径都是高度或者宽度的 50%。转换为 css 代码，即",l.createElement("code",{dangerouslySetInnerHTML:{__html:"border-radius:50% 50% 50% 50% / 50% 50% 50% 50%"}}),"(顺序：左上角，右上角，右下角，左下角，顺时针方向)，简写",l.createElement("code",{dangerouslySetInnerHTML:{__html:"border-radius:50% / 50%"}}),",再简写",l.createElement("code",{dangerouslySetInnerHTML:{__html:"border-radius:50%"}})),l.createElement("ol",{start:"2"},l.createElement("li",null,"半椭圆 以椭圆的上半个椭圆的左上角为例，可以得到以下分析：")),l.createElement("p",null,l.createElement("img",{src:"../../assets/images/md/half-elliptic-left-top.png",alt:"半椭圆左上角分析"}),"同样的方法，可以知道四个角的水平和垂直半径分别为",l.createElement("code",{dangerouslySetInnerHTML:{__html:"50%/100%,50%/100%,0/0,0/0"}}),",即",l.createElement("code",{dangerouslySetInnerHTML:{__html:"border-radius:50% 50% 0 0 /100% 100% 0 0"}})),l.createElement("p",null,"四分之一椭圆也可以用同样的方法来实现，就不再赘述，以下贴上全部代码："),l.createElement("pre",null,l.createElement("code",{className:"language-html",dangerouslySetInnerHTML:{__html:'<span class="hljs-meta">&lt;!DOCTYPE <span class="hljs-meta-keyword">html</span>&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span> /&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span> /&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>椭圆<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">\n      <span class="hljs-selector-tag">div</span> {\n        <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span>;\n      }\n      <span class="hljs-selector-class">.ovals</span> {\n        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;\n        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;\n        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;\n        <span class="hljs-attribute">background</span>: lightcoral;\n      }\n      <span class="hljs-selector-class">.half-top-ovals</span> {\n        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;\n        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;\n        <span class="hljs-attribute">background</span>: lightcoral;\n        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> / <span class="hljs-number">100%</span> <span class="hljs-number">100%</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;\n      }\n      <span class="hljs-selector-class">.half-left-ovals</span> {\n        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;\n        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;\n        <span class="hljs-attribute">background</span>: lightcoral;\n        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">100%</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">100%</span> / <span class="hljs-number">50%</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">50%</span>;\n      }\n      <span class="hljs-selector-class">.quarter-top-left-ovals</span> {\n        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;\n        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;\n        <span class="hljs-attribute">background</span>: lightcoral;\n        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">100%</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>/ <span class="hljs-number">100%</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;\n      }\n    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ovals&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;half-top-ovals&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;half-left-ovals&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;quarter-top-left-ovals&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>\n'}})),l.createElement("p",null,"效果：",l.createElement("img",{src:"../../assets/images/md/elliptic-all.png",alt:"所有效果.jpg"})))}},219:function(s,a,n){"use strict";n.r(a),a.default="data:image/png;base64,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"}}]);
//# sourceMappingURL=5.797876992b.js.map