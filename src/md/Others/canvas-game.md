---
title: 使用 canvas 开发 flappy bird
description: 使用 canvas 开发小游戏
meta: HTML
---

# 使用 canvas 开发 flappy bird

[项目地址](https://github.com/justforfunmy/canvas-flappybird)

- [准备工作](#准备工作)
  1. [常量定义](#常量定义)
  2. [创建画布](#创建画布)
  3. [全局变量](#全局变量)
- [游戏元素](#游戏元素)
  1. [小鸟](#小鸟)
  2. [管道](#管道)
- [初始化](#初始化)
- [绘制](#绘制)
  1. [绘制小鸟](#绘制小鸟)
  2. [绘制管道](#绘制管道)
  3. [绘制倒计时提示语](#绘制倒计时提示语)
  4. [绘制计数器](#绘制计数器)
  5. [渲染](#渲染)
- [状态更新](#状态更新)
  1. [小鸟移动](#小鸟移动)
  2. [管道移动](#管道移动)
  3. [倒计时](#倒计时)
  4. [计数器更新](#计数器更新)
- [自动循环重绘](#自动循环重绘)
- [参考文章](#参考文章)

## 准备工作

- ### 常量定义

定义一些常量

```js
// 画布的宽高
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 400;

const PIPE_WIDTH = 40; // 管道宽度
const PIPE_GAP = 180; // 管道间隙，即中间的安全区域
const PIPE_SPEED = 180; // 管道移动的速度
const PIPE_SPACE = 160; // 两个管道间横向的距离

const BIRD_WIDTH = 32; // 小鸟宽度
const BIRD_HEIGHT = 32; // 小鸟高度
const BIRD_SPEED = 150; // 小鸟移动速度
```

- ### 创建画布

```js
const root = document.getElementById('root');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.style.background = '#fff';
canvas.style.border = '1px solid grey';
root.appendChild(canvas);
```

- ### 全局变量

```js
let started = false; // 游戏是否开始
let startNumber = 4; // 游戏倒计时数字
let count = 0; // 通过的管道数量
let pipeArray = []; // 管道数组
```

## 游戏元素

- ### 小鸟

引入小鸟的图片并绘制到画布上

```js
import img from './assets/bird.png';
const bird = {
  speed: BIRD_SPEED,
  x: 80, //原始x坐标
  y: canvas.height / 2 //原始y坐标
};

const birdImage = new Image();
let birdReady = false; //判断图片是否加载完，以确定是否能绘制小鸟
birdImage.onload = () => {
  birdReady = true;
};

birdImage.src = img;
```

- ### 管道

```js
let id = 0; //管道自增id，主要用于显示通过的管道个数
function PIPE(x) {
  // eslint-disable-next-line no-plusplus
  this.id = id++;
  this.x = x; // 管道的x坐标位置
  this.width = PIPE_WIDTH;
  this.upHeight = parseInt(Math.random() * 200 + 50, 10); // 管道的上部分高度
  this.downHeight = canvas.height - this.upHeight - PIPE_GAP; // 管道的下部分高度
}
```

## 初始化

数据和变量初始化

```js
const init = () => {
  pipeArray = [];
  bird.x = 80;
  bird.y = canvas.height / 2;
  started = false;
  startNumber = 4;
  count = 0;
  // 按照一定的间距生成管道数组
  let startX = 400;
  while (startX < canvas.width + 400) {
    const pipe = new PIPE(startX);
    pipeArray.push(pipe);
    startX += PIPE_SPACE;
  }
};
```

## 绘制

- ### 绘制小鸟

```js
const drawBird = () => {
  //如果图片加载完毕，则可以绘制
  if (birdReady) {
    ctx.drawImage(birdImage, bird.x, bird.y);
  }
};
```

- ### 绘制管道

```js
const drawPipe = () => {
  const drawItem = (item) => {
    const { x, width, upHeight, downHeight } = item;
    ctx.fillStyle = 'green';
    ctx.fillRect(x, 0, width, upHeight);
    ctx.fillRect(x, upHeight + PIPE_GAP, width, downHeight);
  };
  pipeArray.forEach((item) => {
    drawItem(item);
  });
};
```

- ### 绘制倒计时提示语

```js
const drawText = () => {
  //遮罩层
  if (startNumber > 0) {
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.fillStyle = '#111';
  ctx.strokeStyle = '#111'; // 设置笔触的颜色
  ctx.font = "bold 40px '字体','字体','微软雅黑','宋体'"; // 设置字体
  ctx.textBaseline = 'hanging'; // 在绘制文本时使用的当前文本基线
  ctx.textAlign = 'center';
  if (startNumber > 0 && startNumber < 4) {
    ctx.fillText(startNumber, canvas.width / 2, canvas.height / 2 - 30);
  } else if (startNumber === 4) {
    ctx.fillText('空格键开始', canvas.width / 2, canvas.height / 2 - 30);
  }
};
```

- ### 绘制计数器

```js
const drawCount = () => {
  ctx.fillStyle = '#111';
  ctx.strokeStyle = '#111'; // 设置笔触的颜色
  ctx.font = "bold 40px '字体','字体','微软雅黑','宋体'"; // 设置字体
  ctx.textBaseline = 'hanging'; // 在绘制文本时使用的当前文本基线
  ctx.textAlign = 'center';
  ctx.fillText(count, 30, 30);
};
```

- ### 渲染

```js
const render = () => {
  // 每次渲染时清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBird();

  drawPipe();

  drawText();

  drawCount();
};
```

## 状态更新

- ### 小鸟移动

首先，添加键盘事件，当按下键盘上键时，小鸟跳跃

```js
let jump = false; // 是否跳跃
let timer = null; // 保存延时器

addEventListener(
  'keydown',
  (e) => {
    if (e.keyCode === 38) {
      if (jump) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          jump = false;
        }, 250);
      } else {
        jump = true;
        timer = setTimeout(() => {
          jump = false;
        }, 250);
      }
    }
  },
  false
);
```

然后，是小鸟状态更新，modifier 是修正参数：

```js
const updateBird = (modifier) => {
  // 如果还没开始，或者倒计时没到0，则不变化
  if (!started || startNumber > 0) {
    return;
  }
  if (jump) {
    // 以2倍速度向上跳跃
    bird.y -= bird.speed * 2 * modifier;
  } else {
    // 小鸟落下
    bird.y += bird.speed * modifier;
  }
};
```

- ### 管道移动

管道向左平移，移除画布外的则删除，并在数组中新增一个管道

```js
const updatePIPE = (modifier) => {
  const head = pipeArray[0].x;
  const tail = pipeArray[pipeArray.length - 1].x;
  if (head + PIPE_WIDTH < 0) {
    pipeArray.shift();
    const pipe = new PIPE(tail + PIPE_SPACE);
    pipeArray.push(pipe);
  }

  pipeArray.forEach((item) => {
    if (item.x < bird.x + BIRD_WIDTH && item.x > bird.x - PIPE_WIDTH) {
      // 此处碰撞判断
      judgeCrash(item);
    }
    // 向左平移
    item.x -= PIPE_SPEED * modifier;
  });
};
```

- ### 倒计时

每 0.5 秒更新数字

```js
let current = Date.now();
const updateNumber = () => {
  const now = Date.now();
  if (now - current > 500) {
    startNumber -= 1;
    current = now;
  }
};
```

- ### 计数器更新

更新计数器的前提是碰撞判断，而每根管道都有自增 id，可用于计数

```js
const judgeCrash = (item) => {
  if (bird.y < item.upHeight || bird.y + BIRD_HEIGHT > item.upHeight + PIPE_GAP) {
    alert('dead!');
    init();
  } else {
    count = item.id;
  }
};
```

## 自动循环重绘

这里借助`requestAnimationFrame()`函数

```js
// The main game loop
let then = Date.now();

const main = () => {
  const now = Date.now();
  const delta = now - then;

  // 更新所有元素的状态
  updateBird(delta / 1000);
  if (started) {
    updateNumber();
  }

  if (startNumber < 0) {
    updatePIPE(delta / 1000);
  }

  render();

  then = now;

  // 浏览器重绘时执行main函数，自动重绘画布
  requestAnimationFrame(main);
};

init();

main();
```

## 参考文章

[How to make a simple HTML5 Canvas game](http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/)
