---
title: 使用Windows(OpenSSH)实现私钥免密码连接Linux(DropbearSSH)服务器
cover: 'https://cdn.lmark.cc/img/300192_origin_20220531_200511.jpg'
top_img: 'https://cdn.lmark.cc/img/300195_origin_20220531_200519.jpg'
tags:
   - Linux 
   - openwrt

abbrlink: e74a4c2c
date: 2022-09-15 02:07:02
---



### 前言

今天晚上又折腾了一个晚上的路由器，终于搞定了局域网的端口转发到校园网。以后可以在学校的任何一个角落都连接到我的电脑了，乐。详细的操作之后有时间再记录吧，今天先来写一个简单的经验分享。因为路由器需要多拨，我自己设置的自动拨号频率是十分钟一次，但是有时候很容易掉一两个号，这时候就需要我手动拨号乐。以前每次拨号都需要远程连接一下路由器命令行来执行脚本，实在是太麻烦了。所以我就想，能不能直接在电脑上发送一条指令让路由器自动拨号，然后我就找到了ssh客户端的私钥验证方法，但是路由器装的是DropbearSSH，所以和网上的大多数教程不太一样，遂自己参考大神的方法自己写了一个



------

### 关于DropbearSSH和openSSH

一般我们的windows电脑上都会自带一个SSH客户端，就是这个openSSH，这是一个功能齐全的SSH客户端，在诸多平台上都有存在。

![](http://cdn.lmark.cc/img/image-20220915022247046.png)

一般的Linux发行版都安装有OpenSSH，但是在路由器上，由于空间不足，很多固件会选择使用DropbearSSH。

关于DropbearSSH:

> dropbear作为一款基于ssh协议的轻量级sshd服务器，相比OpenSSH，其更简洁，更小巧
>
> ![](http://cdn.lmark.cc/img/image-20220915023036908.png)

所以这个ssh客户端的私钥验证和普通的ssh客户端有些不同，下面我会详细说说



------

### 在Windows上创建密钥对

首先我们需要创建一对公钥和私钥，公钥放在远程Linux服务器上，私钥则放在本地的电脑上。

创建一个4096位的密钥对，并以你的邮箱为注释

``` powershell
C:\Users\PBDELL> ssh-keygen -t rsa -b 4096 -C "your_email@domain.com"
```

创建的时候，它会提示你选择密钥对存放路径，直接按回车则存在默认的路径下

![](http://cdn.lmark.cc/img/image-20220915023530830.png)

接下来，如果你之前已经创建过密钥对了，最好不要覆盖，不然之前使用这个公钥的应用就会出问题，比如github

![](http://cdn.lmark.cc/img/image-20220915023714884.png)

此时，密钥对创建就完成了，可以在刚刚目录下看到刚刚创建的密钥对文件

![](http://cdn.lmark.cc/img/image-20220915023845107.png)

`id_rsa`是私钥，`id_rsa.pub`是密钥（等会上传上服务器的）



------



### 上传私钥至服务器

对于一般的OpenSSH，公钥放在的是`~/.ssh/authorized_keys`这个文件中，用以下这条指令即可一键完成：

```shell
type C:\Users\PBDELL\.ssh\id_rsa.pub | ssh {IP-ADDRESS-OR-FQDN} "cat >> .ssh/authorized_keys"
```

如果远程服务器用的是DropbearSSH，则上传路径需要改一下：

```
type C:\Users\PBDELL\.ssh\id_rsa.pub | ssh {IP-ADDRESS-OR-FQDN} "cat >> /etc/dropbear/authorized_keys"
```

![](http://cdn.lmark.cc/img/image-20220915025152141.png)

运行完成后，可以看到远程服务器就生成了一个公钥文件

![](http://cdn.lmark.cc/img/image-20220915025235806.png)

这时我们就可以直接ssh连接到远程服务器而不需要使用密码了

![](http://cdn.lmark.cc/img/image-20220915025332683.png)

也可以直接在电脑上执行脚本，不用打开FinalShell来连接了

![](http://cdn.lmark.cc/img/image-20220915025643733.png)

 

------



### 一些便捷的用法

服务器存了密钥之后，就可以不用输密码连接服务器乐，这时候我们可以在自己的电脑上写脚本发送命令给服务器执行乐

比如一个让服务器跑拨号的bat脚本

```shell
@echo off
ssh root@192.168.6.1 "/root/auth.sh"
pause
```

在结合上utools，可以实现秒开！

![](http://cdn.lmark.cc/img/image-20220916235847122.png)

### 尾声

困，不过路由器太好玩了

