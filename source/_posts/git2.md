---
title: Git配置全局代理解决10054问题
top_img: 'https://cdn.lmark.cc/blog/603067.jpg'
cover: 'https://cdn.lmark.cc/blog/603078.jpg'
tags:
  - Git
  - 代理
abbrlink: 5f2a3725
date: 2022-11-29 09:07:30
---

## 问题复现

最近装了新电脑，很多东西都没配置，都是很久以前在笔记本上配置的。结果现在台式上有一堆环境问题，就比如今天这个Git推送的问题就是一个。

众所周知，由于某些不可抗力因素，github在的登录属于一个玄学的问题，偶尔运气好就能裸连，运气不好直接连push都push不上。

![image-20221129092528293](http://cdn.lmark.cc/img/image-20221129092528293.png)

## 解决方法

为了解决这个问题，我们一般想到的方法就是走一下代理，但是`Clash`开启之后，我们可以在网页端正常访问github，但是push还是不行。问题的根源是：普通的代理模式，流量都是走一个特定的端口，与服务器通信，但是git的流量不会走。所以我们需要手动绑定一下代理。

方法非常简单，这里以Clash为例，其他软件的配置也大差不差。

打开Clash，马上就可以看到它使用的代理端口，这里为`7890`

![image-20221129093138144](http://cdn.lmark.cc/img/image-20221129093138144.png)

接下来，给git设置代理，方法如下：

### 方法一 直接使用命令

直接在Bash里输入命令设置全局http/https代理

```bash
git config --global http.proxy http://127.0.0.1:7890
 
git config --global https.proxy https://127.0.0.1:7890
```

这样以后使用Clash时，git也能走代理了



### 方法二 修改配置文件

打开配置文件

```bash
vi ~/.gitconfig
```

在文件末尾添加配置

```bash
[http]
 
proxy = http://127.0.0.1:7890
 
[https]
 
proxy = https://127.0.0.1:7890

```

保存退出，重启一下git，结果也是立竿见影。



## 结果

改了之后马上就会生效，无论是push还是clone都没有问题了。记得开代理就行。

![image-20221129094611168](http://cdn.lmark.cc/img/image-20221129094611168.png)
