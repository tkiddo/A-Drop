---
title: git 更换远程仓库
description: git remote origin set-url [url]
meta: Git
---

# git 更换远程仓库

1.修改命令

```Shell
git remote origin set-url [url]
```

2.先删后加

```Shell
git remote rm origin
git remote add origin [url]
```

3.直接修改 config 文件中 url 值
