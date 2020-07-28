---
title: 小程序路由参数
description: 在页面 onLoad 时获取...
meta: 微信小程序
---

# 小程序路由参数

1. 在页面 onLoad 时获取

```js
onLoad(options){
    //options是一个包含路由参数的对象
    console.log(options)
}
```

2. 在任何时候获取

```js
//该函数获取所有栈内的路由
let pages = getCurrentPages();
//数组中最后一个即当前路由，options是参数
let { options } = pages.pop();
console.log(options);
```

3. mpvue 项目中

在所有 页面 的组件内可以通过`this.$root.$mp.query`进行获取页面 onLoad 时的 options 值。
