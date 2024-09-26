---
title: 一些常用的git命令
abbrlink: b076b21a
date: 2022-04-07 09:00:12
cover: 'https://s2.loli.net/2022/04/07/BfJa1PrveNMWxE2.jpg'
top_img: 'https://s2.loli.net/2022/04/07/9tSUPL8CWjXx2ZY.jpg'
tags: Git
---

记录一些git的用法，怕之后的我给忘了（虽然已经忘记几次了）



### 1.克隆仓库

克隆之前，先新建一个文件夹，进入后右键打开git bash，初始化git

```git
git init  #初始化仓库
```

然后就可以直接克隆仓库辣

```git
git clone URL    克隆仓库
```

之后可以直接pull下来,获取最新版本

```git
git pull 本地与服务器端同步
```



 ### 2.上传

在上传到服务器之前，需要先提交到本地仓库

```git
git commit -am "init" 提交并且加注释
```

然后就可以推到远程服务器辣

```git
git push origin master 将文件给推到服务器上
```



### 3.其他

其他一些可能会用到的命令

```git
git status 查看当前状态

git log 看你commit的日志
```

