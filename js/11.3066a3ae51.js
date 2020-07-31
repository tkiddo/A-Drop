(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{171:function(e,n,t){const a=t(0);e.exports=function(e){Object.keys(e).forEach((function(n){this[n]=e[n]}));return a.createElement("section",{className:"markdown"},a.createElement("h1",null,"CSS 盒模型"),a.createElement("p",null,"根据 MDN 的解释：当对一个文档进行布局（lay out）的时候，浏览器的渲染引擎会根据标准之一的 CSS 基础框盒模型（CSS basic box model），将所有元素表示为一个个矩形的盒子（box）。CSS 决定这些盒子的大小、位置以及属性（例如颜色、背景、边框尺寸…）。即每个盒子包含四部分：内容区域（content），内边距(padding)，边框(border)，外边距(margin)（由内而外）。"),a.createElement("pre",null,a.createElement("code",{className:"language-css",dangerouslySetInnerHTML:{__html:'<span class="hljs-selector-class">.box</span> {\n  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;\n  <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;\n  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#111</span>;\n  <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span>;\n}\n'}})),a.createElement("pre",null,a.createElement("code",{className:"language-html",dangerouslySetInnerHTML:{__html:'<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span>\n  content\n<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n'}})),a.createElement("p",null,"在 chrome 开发者工具中选中",a.createElement("code",{dangerouslySetInnerHTML:{__html:".box"}}),"的元素，可以发现该元素的实际宽度并不是设置的",a.createElement("code",{dangerouslySetInnerHTML:{__html:"100px"}}),"，而是",a.createElement("code",{dangerouslySetInnerHTML:{__html:"100+20*2+1*2=142px"}}),",即包含内容区域，内边距，边框的总宽度。"),a.createElement("p",null,"引用 chrome 中的盒子模型图：",a.createElement("img",{src:t(227).default,alt:"盒模型content-box.jpg"})),a.createElement("p",null,"这点和我们平时的认知并不相符，此时就需要",a.createElement("code",{dangerouslySetInnerHTML:{__html:"box-sizing"}}),"这个属性。",a.createElement("code",{dangerouslySetInnerHTML:{__html:"box-sizing"}}),"的值是用来设定",a.createElement("code",{dangerouslySetInnerHTML:{__html:"width"}}),",",a.createElement("code",{dangerouslySetInnerHTML:{__html:"height"}}),"的作用对象的，默认是",a.createElement("code",{dangerouslySetInnerHTML:{__html:"content-box"}}),"，即",a.createElement("code",{dangerouslySetInnerHTML:{__html:"width"}}),"作用域",a.createElement("code",{dangerouslySetInnerHTML:{__html:"content"}}),"区域，当把",a.createElement("code",{dangerouslySetInnerHTML:{__html:"box-sizing"}}),"设置为",a.createElement("code",{dangerouslySetInnerHTML:{__html:"border-box"}}),"，情况就不一样了，",a.createElement("code",{dangerouslySetInnerHTML:{__html:"width"}}),"的作用对象是",a.createElement("code",{dangerouslySetInnerHTML:{__html:"border"}}),"以内的区域。"),a.createElement("p",null,a.createElement("code",{dangerouslySetInnerHTML:{__html:"box-sizing"}}),"设置为",a.createElement("code",{dangerouslySetInnerHTML:{__html:"border-box"}}),"后的盒子模型图：",a.createElement("img",{src:t(227).default,alt:"盒模型border-box.jpg"}),"为了更加符合我们的认知，设置为",a.createElement("code",{dangerouslySetInnerHTML:{__html:"border-box"}}),"为最佳实践。"))}},227:function(e,n,t){"use strict";t.r(n),n.default="data:image/png;base64,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"}}]);
//# sourceMappingURL=11.3066a3ae51.js.map