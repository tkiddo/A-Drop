---
title: css 动画保持最终状态
description: animation-fill-mode
---

# css 动画保持最终状态

```css
animation-fill-mode : none  forwards  backwards  both;
```

`none`：不改变默认行为。

`forwards` ：当动画完成后，保持最后一个属性值。

`backwards`：在 `animation-delay` 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义）。

`both`：向前和向后填充模式都被应用。
