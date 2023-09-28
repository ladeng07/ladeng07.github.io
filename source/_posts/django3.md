---
title: Django 报错 'WSGIRequest' object has no attribute 'data' 的一个解决方法
cover: 'https://cdn.lmark.cc/img/300208_origin_20220531_200914.jpg'
top_img: 'https://cdn.lmark.cc/img/300243_origin_20220531_201807.jpg'
tags:
  - Django
  - Python
abbrlink: 1b50bad4
date: 2022-09-02 00:28:15
---



## 报错截图

------

![](http://cdn.lmark.cc/img/image-20220901015755972.png)



## 报错描述

------

之前写Django后台的时候没遇到过这个bug，是今天写项目才遇到的bug



## 报错分析

------

看报错，是出在一个自定义的权限认证函数中，在仔细看看报错，发现是后台登录使用了自定义的权限认证类

![](http://cdn.lmark.cc/img/image-20220901020129852.png)

在Pycharm中用 `Ctrl + shift + N` 输入文件地址，找到这个文件`__init__.py`的77行对应的函数调用，

![image-20220901020413298](http://cdn.lmark.cc/img/image-20220901020413298.png)

再 `Ctrl + 鼠标左键` 点击查看 这个backend从哪里来的

![image-20220901020500641](http://cdn.lmark.cc/img/image-20220901020500641.png)

现在可以看到，这个`_get_backends`函数很可疑，我们再跳转看一下

![image-20220901020549436](http://cdn.lmark.cc/img/image-20220901020549436.png)



到这里真相水落石出了，

`get_backends`函数从settings的`AUTHENTICATION_BACKENDS`里面寻找权限认证类，然而我忘了添加自带的权限认证类，只有我自定义的权限认证类，所以这个函数就使用了自定义的权限认证类。



## 解决方案

------

添加 `django.contrib.auth.backends.ModelBackend` 即可解决问题

![image-20220901020810505](http://cdn.lmark.cc/img/image-20220901020810505.png)



## 一丢丢心得

------

暑假写的项目，可以说通过这个项目，对Django有了更深入的了解，也学会了往底层找问题，重写某些类的方法，之后浅浅分享一下Pycharm写Django的心得吧。

最后想说，写这个项目好难，又好累，还是好好学习吧。
