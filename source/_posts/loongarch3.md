---
title: 一次给龙芯旧世界升级内核的失败经历
cover: 'https://cdn.lmark.cc/img/300147_origin_20220531_195551.jpg'
top_img: 'https://cdn.lmark.cc/img/300149_origin_20220531_195558.jpg'
tags:
  - Loongarch
  - Linux内核
  - 编译
abbrlink: febc3415
date: 2024-03-03 23:47:36
---



## 起因

最近在捣鼓旧世界的3A5000，编了个软件，编完之后有点空虚，在到处学习一些Linux知识。然后突然想到，早在Linux5xx版本，就宣布了对Loongarch的支持，那我岂不是可以自己编一个内核，然后给Loongnix升级，于是就有了这篇。





## 下载源码

源码：[The Linux Kernel Archives](https://www.kernel.org/)

![](https://cdn.lmark.cc/img/image-20240227155337756.png)

选择6.7.6长期支持版，使用git拉取源码[Kernel.org git repositories](https://git.kernel.org/)



## 编译：

### 清理缓存

```
make clean
```



### 配置文件

```bash
make loongson3_defconfig #使用loongarch默认配置编译
```

然后报错：

![](https://cdn.lmark.cc/img/image-20240227162658409.png)

报错原因：没有安装flex

解决方法：

```bash
sudo apt-get install flex
sudo apt-get install bison
```



![](https://cdn.lmark.cc/img/image-20240227163510201.png)



### 将配置文件移到顶层

```bash
cp arch/loongarch/configs/loongson3_defconfig .config
```



### 选择配置

```bash
 make menuconfig
```

![](https://cdn.lmark.cc/img/image-20240227164641246.png)



### 开始编译

```bash
make -j4	#3A5000是4核8线程的
```

编译完成，大概花了四十分钟：

![](https://cdn.lmark.cc/img/image-20240227235541676.png)

![](https://cdn.lmark.cc/img/image-20240302224926807.png)





### 安装模块

```
sudo make modules_install
sudo make install
```



![](https://cdn.lmark.cc/img/image-20240303004420741.png)







## 启用内核作为引导

输入下列命令将内核作为引导，将数字更改为你自己编译的版本号：

```
sudo update-initramfs -c -k 6.7.6
```

![](https://cdn.lmark.cc/img/image-20240303004926192.png)



下面更新一下grub：

```
sudo update-grub
```



![](https://cdn.lmark.cc/img/image-20240303004950924.png)

之后重启即可在启动界面选择需要启动的内核。





## linux6.7.6——启动

关机再开机之后，在Grub引导界面，选择"advanced"选项，选择刚刚安装的6.7.6内核。

激动的心，颤抖的手，按下了回车。The world！！！！



![](https://cdn.lmark.cc/img/5f9067e0553e9c44731fa668fa1bc1f.jpg)

一秒钟过去了。。。

两秒钟过去了。。。

三秒钟过去了。。。

咦，

怎么还在Loading initial ramdisk

......

又过了五分钟，才发现进不去了，一直卡在这。内核升级宣告失败。

后面思考了一下，发现原因可能是，Linux对loongarch的支持是基于新世界的，而旧世界不配（

关于新旧世界，参考[旧世界与新世界 | 咱龙了吗？ (areweloongyet.com)](https://areweloongyet.com/docs/old-and-new-worlds)



![](https://cdn.lmark.cc/img/image-20240303232816720.png)





## 参考资料

[如何编译安装Linux内核 - LightningStar - 博客园 (cnblogs.com)](https://www.cnblogs.com/harrypotterjackson/p/11846222.html)

