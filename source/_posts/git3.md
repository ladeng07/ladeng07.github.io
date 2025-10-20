---
title: 如何优雅的批量修改git项目的提交时间
cover: 'https://cdn.lmark.cc/img/300166_origin_20220531_200021.jpg'
top_img: 'https://cdn.lmark.cc/img/300169_origin_20220531_200034.jpg'
tags:
  - Git
abbrlink: ab483bc5
date: 2025-01-05 15:13:33
---

### 起因

之前暑假的时候，做了个项目，拿到了国三。然后最近发现另外一个比赛的区域赛的题目和之前的项目完全契合，遂决定拿之前我们做的这个项目去参赛，但是git项目的时间还是暑假，这显然不太合理。在github上搜寻了一番，发现了[PotatoLabs/git-redate: Change the dates of several git commits with a single command](https://github.com/PotatoLabs/git-redate)



### 使用

用法非常简单，windows下直接把文件丢到`${INSTALLATION_PATH}\mingw64\libexec\git-core`即可，然后使用`git redate --commits [[number of commits to view]]`，用法如下：

![alt tag](https://camo.githubusercontent.com/31bec73216f408e7548d49098e5984f114fdde0aa8b36532a54abef58e6be1e3/68747470733a2f2f692e737461636b2e696d6775722e636f6d2f79453463512e676966)

最方便的地方在于可以根据右侧的commit信息来修改时间，同时可以比较自由的修改每一个commit。原仓库是7年前的，导致用起来有些bug，稍微改了下，就能在新版本上跑起来了，仓库链接：[ladeng07/git-redate: 用一条命令修改多个 Git 提交的日期，支持git 2.45.2+。修改提交时间](https://github.com/ladeng07/git-redate)


![image-20251012140621444](https://cdn.lmark.cc/img/image-20251012140621444.png)



### 写在最后

非常好用，改了时间之后的项目成功进到线下比赛，去上海公费旅游了3天，最后还拿了区域二等奖，小赚1000，美滋滋。
