---
title: win11下使用qemu运行Loongarch虚拟机
cover: 'https://cdn.lmark.cc/img/300239_origin_20220531_201743.jpg'
top_img: 'https://cdn.lmark.cc/img/300240_origin_20220531_201745.jpg'
tags:
  - qemu
  - Loongarch
  - 虚拟机
  - Linux
abbrlink: 3f81eb3
date: 2023-09-23 15:03:23
---

### 前言

之前打软件杯龙芯赛道，师姐让我们自己用qemu装loongnix体验一下比赛环境，但是当时一直忙就没装。现在又要编译一下loongarch的包了，交叉编译链搭起来好麻烦，遂想到了用qemu装loongarch虚拟机来玩玩。而且在8月份更新的8.1版本中对LA（代指loongarch，下同）更好了，更有理由装一个玩玩了。



### 安装qemu

现在在windows下安装qemu已经很方便了，只需要在官网下载安装包：[qemu-w64-setup-20230822.exe](https://qemu.weilnetz.de/w64/2023/qemu-w64-setup-20230822.exe)

![](https://cdn.lmark.cc/img/image-20230923004212907.png)

按照需要安装即可。





### 下载loongnix镜像

这里我安装的是loongnix系统，当然LA也支持其他系统（如arch，debian12等）。根据需求安装。

镜像去官网下载：[Nginx Directory (loongnix.cn)](http://pkg.loongnix.cn/loongnix/isos/Loongnix-20.3/)

我下的是cartoon版的，带gui。并且是直接使用官方提供的qcow2虚拟盘格式，这样做的好处就是集成在一起，不用自己划盘，缺点就是比普通镜像稍微大点。当然这里使用普通iso镜像安装也是可以的。

![](https://cdn.lmark.cc/img/image-20230923004818923.png)





### 下载UEFI

镜像启动需要引导程序，可以使用arch的引导程序[Index of /loongarch/archlinux/images/ (wsyu.edu.cn)](https://mirrors.wsyu.edu.cn/loongarch/archlinux/images/)

![](https://cdn.lmark.cc/img/image-20230923141457725.png)

这里下载8.0的引导程序[QEMU_EFI_8.0.fd](https://mirrors.wsyu.edu.cn/loongarch/archlinux/images/QEMU_EFI_8.0.fd)







### 安装虚拟网卡

使用tap-windows创建一张虚拟网卡，官网：[Index of /downloads/releases/ (openvpn.net)](https://build.openvpn.net/downloads/releases/)

win11使用最新版本比较稳定，这个`tap-windows-9.24.7-I601-Win10`版本，之前使用9.23.1就会出现桥接之后虚拟机连不上网的情况，使用9.24.7完美解决。

下载地址:https://build.openvpn.net/downloads/releases/tap-windows-9.24.7-I601-Win10.exe

![](https://cdn.lmark.cc/img/image-20230923010526910.png)



#### 配置虚拟网卡

安装好之后，`控制面板->网络和Internet->网络连接` 里面会多一张虚拟网卡，介绍里是Tap-windows什么的，选中之后按F2可以给它改名，随便改，以后要用

![](https://cdn.lmark.cc/img/image-20230923011032434.png)

然后选中tap0和正在联网的网卡，用ctrl选中两个，然后右键使用`桥接`即可







### 启动虚拟机

完事具备，就差启动虚拟机了，启动虚拟机的命令可以看UEFI文件下载地址里的README

![](https://cdn.lmark.cc/img/image-20230923141955416.png)

我们要修改的是其中的fd引导程序路径、镜像的地址和qemu的路径

这里贴一下我的，启动代码：

```shell
D:\qemu\qemu-system-loongarch64.exe -m 8G -cpu la464-loongarch-cpu -M virt -smp 4 -bios E:\LA64\uefi\QEMU_EFI_8.0.fd -serial stdio -device virtio-gpu-pci -device nec-usb-xhci,id=xhci,addr=0x1b -device usb-tablet,id=tablet,bus=xhci.0,port=1 -device usb-kbd,id=keyboard,bus=xhci.0,port=2 -net nic,model=virtio -net tap,ifname=tap0 -net user,hostfwd=tcp::10021-:22 -hda E:\LA64\isos\Loongnix-20.3.sp1.cartoon.gui.loongarch64.cn.qcow2 --accel tcg,thread=multi
```



其中，需要修改的地方是：

- D:\qemu\qemu-system-loongarch64.exe
- E:\LA64\uefi\QEMU_EFI_8.0.fd
- E:\LA64\isos\Loongnix-20.3.sp1.cartoon.gui.loongarch64.cn.qcow2



在命令行输入之后，就需要漫长的等待了。进入GRUB界面后就能正常打开运行了，接下来就能进入登陆界面，如果是官方Loongnix系统，密码就是**Loongson20**，如果是arch密码就是**loongarch**

![](https://cdn.lmark.cc/img/image-20230924105226640.png)



### 快捷启动脚本

每次都手动输入这么长串指令还是很麻烦的，所以可以把指令写进bat文件里以后就可以一键打开了。

![](https://cdn.lmark.cc/img/image-20230923144457899.png)

linux下可以放进bin里方便启动



