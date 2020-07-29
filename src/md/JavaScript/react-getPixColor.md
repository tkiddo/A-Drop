---
title: React实现提取图片像素颜色值
description: react canvas getImageData()
meta: React
---

# React 实现提取图片像素颜色值

本文主要采用 canvas 的 getImageData() API 来实现对图片像素点颜色值的提取

## 初始化画布

因为画布需要直接操作 dom 对象，所以需要使用 Ref 来获取目标 dom 对象

```js
import React, { useEffect, useState } from 'react';
import './index.scss';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const ChooseImage = () => {
  const canvasRef = React.createRef();
  const [ctx, setCtx] = useState(null);
  const [canvas, setCanvas] = useState(null);

  const initCanvas = () => {
    const cas = canvasRef.current;
    //画布（实际可绘画的区域）的宽高和canvas标签的宽高一致
    cas.width = CANVAS_WIDTH;
    cas.height = CANVAS_HEIGHT;
    setCanvas(cas);
    if (cas.getContext) {
      const context = cas.getContext('2d');
      setCtx(context);
    }
  };

  useEffect(() => {
    initCanvas();
  }, []);
  return (
    <div>
      <canvas
        className="canvas"
        ref={canvasRef}
        style={{ width: `${CANVAS_WIDTH}px`, height: `${CANVAS_HEIGHT}px` }}
      />
    </div>
  );
};

export default ChooseImage;
```

## 选择图片

添加 input 标签，type 为 file,并限制文件类型为图片

```js
const ChooseImage = () => {
  //...
  return (
    <div>
      <input
        type="file"
        onChange={handleChange}
        accept="image/png,image/jpg,image/gif,image/jpeg"
      />
      <canvas
        className="canvas"
        ref={canvasRef}
        style={{ width: `${CANVAS_WIDTH}px`, height: `${CANVAS_HEIGHT}px` }}
      />
    </div>
  );
};
```

接下来就是`handleChange`函数，就是选择完图片后要绘制到画布上

```js
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const SX = 0;
const SY = 0;

const handleChange = (e) => {
  //每次选择图片时清空画布
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  //获得图片文件
  const file = e.target.files[0];
  const img = new Image();
  //创建文件来源
  img.src = URL.createObjectURL(file);
  img.onload = function l() {
    const { naturalWidth, naturalHeight } = img;
    let dx;
    let dy;
    let dWidth;
    let dHeight;
    //绘制图片到画布中央
    if (naturalWidth > naturalHeight) {
      dWidth = CANVAS_WIDTH;
      dHeight = (naturalHeight * CANVAS_WIDTH) / naturalWidth;
      dy = (CANVAS_HEIGHT - dHeight) / 2;
      dx = 0;
    } else {
      dWidth = (naturalWidth * CANVAS_HEIGHT) / naturalHeight;
      dHeight = CANVAS_HEIGHT;
      dy = 0;
      dx = (CANVAS_WIDTH - dWidth) / 2;
    }
    ctx.drawImage(img, SX, SY, naturalWidth, naturalHeight, dx, dy, dWidth, dHeight);
  };
};
```

## 点选像素

首先为 canvas 添加监听事件

```html
<canvas onClick="{handlePix}"></canvas>
```

然后编写监听函数

```js
const handlePix = (evt) => {
  let x = evt.clientX;
  let y = evt.clientY;
  const rect = canvas.getBoundingClientRect();
  x -= rect.left;
  y -= rect.top;
  const colorData = ctx.getImageData(x, y, 1, 1);
};
```
