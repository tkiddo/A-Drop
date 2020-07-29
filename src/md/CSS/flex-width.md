---
title: flex布局
description: 举个例子：左边元素定宽，右边元素占满余下部分
meta: CSS
---

# flex布局

## 举个例子：左边元素定宽，右边元素占满余下部分

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .flex {
        display: flex;
        height: 100px;
      }
      .left {
        flex: 0 0 100px;
        background: red;
      }
      .right {
        flex: 1;
        background: green;
      }
    </style>
  </head>
  <body>
    <div class="flex">
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </body>
</html>
```

## 关于 flex 容器内元素的 flex 属性的解释

flex 属性是 `flex-grow`, `flex-shrink` 和 `flex-basis` 的简写，默认值为 0 1 auto。后两个属性可选。

- `flex-grow`

  flex-grow 定义对额外空间的占有量，默认 0，即表示有多余的空间也不要。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .flex {
        display: flex;
        height: 100px;
      }
      .box {
        width: 100px;
        background: red;
        margin-right: 10px;
      }
      .flex-box {
        flex: 1;
      }
    </style>
  </head>
  <body>
    <div class="flex">
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
    </div>
  </body>
</html>
```

![1.png](../../assets/images/md/flex.png)

当给最后一个 box 加上 flex-box 的类，即设置 `flex:1`，则最后一个 box 会占据剩下空间，如果给每个 box 设置不同的 flex 值，则会按比例分配剩下的空间。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .flex {
        display: flex;
        height: 100px;
      }
      .box {
        width: 100px;
        background: red;
        margin-right: 10px;
      }
      .flex-1 {
        flex: 1;
      }
      .flex-2 {
        flex: 2;
      }
      .flex-3 {
        flex: 3;
      }
    </style>
  </head>
  <body>
    <div class="flex">
      <div class="box flex-1"></div>
      <div class="box flex-2"></div>
      <div class="box flex-3"></div>
    </div>
  </body>
</html>
```

![2.png](../../assets/images/md/flex-2.png)

- `flex-shrink`

  和 `flex-grow` 相反，即当各个元素所占空间之和大于容器时，压缩每个元素的比例，默认是 1.如果没有显示定义该属性，将会自动按照默认值 1 在所有因子相加之后计算比率来进行空间收缩。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        left: 0;
      }
      .flex {
        width: 300px;
        height: 100px;
        display: flex;
        border: 1px solid #111;
        margin: 20px;
      }
      .box {
        width: 120px;
        height: 100px;
        background: red;
        margin-right: 10px;
        flex-shrink: 0;
      }
    </style>
  </head>
  <body>
    <div class="flex">
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
    </div>
  </body>
</html>
```

1. 当设置 box 的 flex-shrink 为 0 时，即不论超出多少，都不压缩子元素的空间，如下图
![3.png](../../assets/images/md/flex-3.png) 
2. 当每个 box 设置 flex-shrink 为 1 时，即三个 box 压缩同样的比例，如下图
![4.png](../../assets/images/md/flex-4.png) 
3. 当给每个 box 设置 flex-shrink 依次为 1,2,3 时，子元素会按照比例来压缩，如图
![5.png](../../assets/images/md/flex-5.png)

- `flex-basis`

  表示在分配额外空间之前，成员占据的空间，默认值为 auto，意思就是你本来占多少就是多少。但也可以自己设置长度(px)。这个值的效果就是确定在释放和分配空间的时候，你的初值是多少,即 flex items 在被放进一个 flex 容器之前的大小

- 常用值

  `flex：auto;` 等同于 `flex：1 1 auto;` 意思就是占满额外空间，可缩放。
  `flex:none;` 等同于 `flex：0 0 auto;` 意思是不占额外空间，不可缩放。
