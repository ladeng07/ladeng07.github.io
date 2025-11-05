---
title: DjangoAdmin后台collectstatic不生效问题
tags:
  - Django
  - Python
abbrlink: 2514f762
cover: https://cdn.lmark.cc/img/300216_origin_20220531_201214.jpg
top_img: https://cdn.lmark.cc/img/300218_origin_20220531_201225.jpg
date: 2022-12-01 03:56:17
---



## 问题起因

最近把一个Django项目部署上服务器的时候，发现了一个问题。在收集静态资源的时候，发现后台Admin的样式资源不生效，

具体表现在，执行了collectstatic命令后，提示copy成功

![](http://cdn.lmark.cc/img/image-20221202190134796.png)

但是实际上，项目目录下并没有收集到文件。



## 问题分析

反复收集了几次，还是不生效。都显示已经收集了，并没有修改。

![](http://cdn.lmark.cc/img/image-20221202190509177.png)

首先一开始我先按照网上的方法，排除了一些常规的原因，然后开始想想还能有什么离谱的bug，先看看配置文件。

![](http://cdn.lmark.cc/img/image-20221202190909066.png)

看似并没有什么问题，也确实没什么问题。但实际上这是个巨坑的地方



## 解决方法

非常坑爹的一个地方，先把`STATICFILES_DIRS`给注释掉，然后再把`STATIC_ROOT`里的`/static/`给改成`static`，如下图：

![](http://cdn.lmark.cc/img/image-20221202191906353.png)

这样一来就能正常收集了

![](http://cdn.lmark.cc/img/image-20221202191757006.png)

在收集完静态文件后记得把settings修改回来。
