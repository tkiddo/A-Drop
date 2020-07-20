(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{177:function(e,l,t){const n=t(0);e.exports=function(e){Object.keys(e).forEach((function(l){this[l]=e[l]}));return n.createElement("section",{className:"markdown"},n.createElement("h2",null,"SVG"),n.createElement("p",null,"可缩放矢量图形（Scalable Vector Graphics，SVG），是一种用于描述基于二维的矢量图形的，基于 XML 的标记语言。本质上，SVG 相对于图像，就好比 HTML 相对于文本。"),n.createElement("h4",null,"SVG 的基本属性"),n.createElement("ul",null,n.createElement("li",null,n.createElement("p",null,"最值得注意的一点是元素的渲染顺序。SVG 文件全局有效的规则是“后来居上”，越后面的元素越可见。")),n.createElement("li",null,n.createElement("p",null,"web 上的 svg 文件可以直接在浏览器上展示"))),n.createElement("h4",null,"坐标定位"),n.createElement("ul",null,n.createElement("li",null,n.createElement("p",null,"坐标系统是：以页面的左上角为(0,0)坐标点，坐标以像素为单位，x 轴正方向是向右，y 轴正方向是向下。")),n.createElement("li",null,n.createElement("p",null,"基本上，在 SVG 文档中的 1 个像素对应输出设备（比如显示屏）上的 1 个像素。")),n.createElement("li",null,n.createElement("p",null,"SVG 也可以定义绝对大小（比如使用“pt”或“cm”标识维度）同时 SVG 也能使用相对大小，只需给出数字，不标明单位，输出时就会采用用户的单位。")),n.createElement("li",null,n.createElement("p",null,"viewBox 用来选取要展示的内容，并按比例展示到整个画布"))),n.createElement("h4",null,"基本形状"),n.createElement("ul",null,n.createElement("li",null,"矩形 rect")),n.createElement("pre",null,n.createElement("code",{className:"language-svg",dangerouslySetInnerHTML:{__html:'<span class="hljs-tag">&lt;<span class="hljs-name">rect</span> <span class="hljs-attr">x</span>=<span class="hljs-string">&quot;60&quot;</span> <span class="hljs-attr">y</span>=<span class="hljs-string">&quot;10&quot;</span> <span class="hljs-attr">rx</span>=<span class="hljs-string">&quot;10&quot;</span> <span class="hljs-attr">ry</span>=<span class="hljs-string">&quot;10&quot;</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;30&quot;</span> <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;30&quot;</span>/&gt;</span>\n'}})),n.createElement("ul",null,n.createElement("li",null,"圆形")),n.createElement("pre",null,n.createElement("code",{dangerouslySetInnerHTML:{__html:"&lt;circle cx=&quot;25&quot; cy=&quot;75&quot; r=&quot;20&quot;/&gt;\n"}})),n.createElement("ul",null,n.createElement("li",null,"椭圆")),n.createElement("pre",null,n.createElement("code",{dangerouslySetInnerHTML:{__html:"&lt;ellipse cx=&quot;75&quot; cy=&quot;75&quot; rx=&quot;20&quot; ry=&quot;5&quot;/&gt;\n"}})),n.createElement("ul",null,n.createElement("li",null,"线条")),n.createElement("pre",null,n.createElement("code",{dangerouslySetInnerHTML:{__html:"&lt;line x1=&quot;10&quot; x2=&quot;50&quot; y1=&quot;110&quot; y2=&quot;150&quot;/&gt;\n"}})),n.createElement("ul",null,n.createElement("li",null,"折线")),n.createElement("pre",null,n.createElement("code",{dangerouslySetInnerHTML:{__html:"&lt;polyline points=&quot;60 110, 65 120, 70 115, 75 130, 80 125, 85 140, 90 135, 95 150, 100 145&quot;/&gt;\n"}})),n.createElement("ul",null,n.createElement("li",null,"多边形")),n.createElement("pre",null,n.createElement("code",{dangerouslySetInnerHTML:{__html:"&lt;polygon points=&quot;50 160, 55 180, 70 180, 60 190, 65 205, 50 195, 35 205, 40 190, 30 180, 45 180&quot;/&gt;\n"}})),n.createElement("ul",null,n.createElement("li",null,"路径")),n.createElement("pre",null,n.createElement("code",{dangerouslySetInnerHTML:{__html:"&lt;path d=&quot;M 20 230 Q 40 205, 50 230 T 90230&quot;/&gt;\n"}})),n.createElement("h4",null,"路径"),n.createElement("ul",null,n.createElement("li",null,n.createElement("p",null,"path 元素的形状是通过属性 d 定义的，属性 d 的值是一个“命令+参数”的序列")),n.createElement("li",null,n.createElement("p",null,"每一个命令都有两种表示方式，一种是用大写字母，表示采用绝对定位。另一种是用小写字母，表示采用相对定位")),n.createElement("li",null,n.createElement("p",null,"直线命令：M，L，H，V，Z")),n.createElement("li",null,n.createElement("p",null,"曲线命令：C，S，Q，T")),n.createElement("li",null,n.createElement("p",null,"弧形命令：A"))),n.createElement("h4",null,"填充和边框"),n.createElement("ul",null,n.createElement("li",null,n.createElement("p",null,"fill 填充颜色")),n.createElement("li",null,n.createElement("p",null,"stroke 描边"))))}}}]);
//# sourceMappingURL=28.6351cc5ea1.js.map