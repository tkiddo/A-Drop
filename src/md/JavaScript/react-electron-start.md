---
title: React结合Electron开发桌面应用入门
description: Electron用于开发跨端应用，结合React开发实践。
meta: React
---

# React 结合 Electron 开发桌面应用入门

Electron 是 Github 发布的跨平台桌面应用开发工具，它支持使用 web 技术来开发桌面应用，即你可以使用 Html+css+JavaScript 来开发桌面应用，而不用学习新的桌面端开发语言。Electron 的图形界面渲染采用 Chromium 浏览器的内核实现，但又能通过 Node.js 调用丰富的原先操作系统 API。本文着眼于 Electron 结合 React 的开发实践。

## Electron 快速开始

首先，安装 electron

```Shell
npm install --save-dev electron
```

根据 Electron 官方的[electron-quick-start](https://github.com/electron/electron-quick-start)，创建 Electron 应用最基础的三个组成部分:

- `main.js` 用于控制应用主进程

- `index.html` 用于控制渲染进程

- `package.json` 项目配置

这里的主进程和渲染进程是 Electron 中的两个进程。主进程使用 `BrowserWindow` 实例创建页面。 每个 `BrowserWindow`实例都在自己的渲染进程里运行页面。 当一个 `BrowserWindow` 实例被销毁后，相应的渲染进程也会被终止。

`index.html`这里不多说，就是一个网页文件。`main.js`中代码大致是这样的：

```js
const { app, BrowserWindow } = require('electron');

function createWindow() {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // 并且为你的应用加载index.html
  win.loadFile('index.html');

  // 打开开发者工具
  win.webContents.openDevTools();
}

// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow);

//当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 您可以把应用程序其他的流程写在在此文件中
// 代码 也可以拆分成几个文件，然后用 require 导入。
```

其中`win.loadFile('index.html')`用于窗口应用加载网页文件，即主进程和渲染进程的联通。

既然这样，我们是不是可以将使用 React 开发的单页应用打包后的`index.html`作为渲染的主页？答案是肯定的。

`package.json`:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "electron": "electron ."
  }
}
```

启动应用：

```Shell
yarn electron
```

## React 结合 Electron

这里 React 应用采用 webpack 构建。webpack 中对于 electron 应用有提供支持

- 开发模式

webpack 的配置中加一条：

```js
module.exports = {
  target: 'electron-renderer'
};
```

表示构建完成的项目用于 electron 渲染。

`package.json`添加一条启动 react 应用的脚本

```json
{
  "scripts": {
    "electron": "electron .",
    "start-renderer": "webpack-dev-server --config webpack.dev.js",
    "build-react": "webpack --progress --config webpack.react.js"
  }
}
```

然后`main.js`做相应修改

```js
// 加载应用----适用于 react 项目
win.loadURL('http://localhost:3000/');
```

启动 React：

```Shell
yarn start-renderer
```

启动 Electron

```Shell
yarn electron
```

这样 react 项目的热更新也能应用到 electron 项目中。

- 生成模式

webpack 的配置中加一条：

```js
module.exports = {
  target: 'electron-preload'
};
```

`yarn build-renderer` 打包 react 应用

`main.js`做相应修改

```js
win.loadFile('./dist/index.html');
```

然后使用`electron-builder`打包成客户端应用，打包的详细说明下次再讲。
