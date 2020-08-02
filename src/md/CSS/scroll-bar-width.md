---
title: 滚动条挤压内容宽度的解决办法
description: 当页面高度超过100%时，页面将会出现滚动条，滚动条就会挤压原先body的宽度，造成页面晃动，很不友好
meta: CSS
---

# 滚动条挤压页面宽度的解决办法

问题描述：当页面高度超过 100%时，页面将会出现滚动条，滚动条就会挤压原先 body 的宽度，因为滚动条也有宽度，这就会造成页面的晃动，很不友好

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }

      .header {
        text-align: right;
        background-color: red;
        height: 30px;
      }

      .in {
        width: 300px;
        height: 100%;
        background-color: green;
        margin: 0 auto;
      }

      .box {
        width: 100%;
        height: 3000px;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <div class="in">
        容器内容
      </div>
    </div>
    <button id="more">more</button>
  </body>
  <script>
    const btn = document.querySelector('#more');
    btn.addEventListener('click', () => {
      const box = document.createElement('div');
      box.setAttribute('class', 'box');
      box.innerHTML = 'hhhhhhhh';
      document.body.appendChild(box);
    });
  </script>
</html>

```

当我们点击 more 按钮时，因为新增的元素高度超过了视口高度，就会产生滚动条，此时由于滚动条的产生，容器内容就会向左移动一点，因为滚动条占据了部分视口宽度

解决方法可以有以下三种：

- 新属性 overlay

`overflow`有个新属性`overlay`，就是专门用来应对这种情况的，滚动条绘制在内容之上而不是占用空间。 仅在基于 WebKit（例如，Safari）和基于 Blink 的（例如，Chrome 或 Opera）浏览器中受支持。

```css
html {
  overflow-y: overlay;
}
```

- `margin-right:calc(100% - 100vw)`

`100vw`相当于浏览器的`window.innerWidth`,是浏览器的内部宽度，**滚动条也计算在内**。而`100%`是可用宽度，不含滚动条的宽度。没有滚动条的时候相当于`margin:0`。有滚动条的时候就相当于`margin-right:-17px`,这里的 17px 是 Chrome 的滚动条宽度，不同浏览器宽度可能不一致。被滚动条占据的 17px 后，内容再往右延伸了 17px，刚好补足了宽度。

> 注意:calc 中要有空格，否则属性值无效

```css
html {
  overflow-y: auto;
  overflow-x: hidden;
}
.header {
  text-align: right;
  background-color: red;
  height: 30px;
  margin-right: calc(100% - 100vw);
}
```

- 绝对定位---来自张鑫旭

[链接](https://www.zhangxinxu.com/wordpress/2015/01/css-page-scrollbar-toggle-center-no-jumping/)

```css
html {
  overflow-y: scroll;
}

:root {
  overflow-y: auto;
  overflow-x: hidden;
}

:root body {
  position: absolute;
}

body {
  width: 100vw;
  overflow: hidden;
}
```
