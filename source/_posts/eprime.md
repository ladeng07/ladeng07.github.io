---
title: eprime实验注意事项
tags: E-Prime
abbrlink: e868709
date: 2022-05-02 02:50:20
---

z咱就是说，写个注意事项，方便调试程序，还能避免很多问题。这个链接一直都有更新，有问题随时来这里查



#### 1.开始实验之前记得切换输入法至英文

不然实验跑起来之后，点击键盘会会弹出输入法



#### 2.点击空格不能太快

因为记录RT(Response Time)是从麦克风图标出现后才开始记录的，如果受试在麦克风图标出现之前就点击，则会记录不上RT，这种情况在视觉刺激组特别容易出现，可能需要提醒受试。



#### 3.系统录音机打开方式

点一下Win图标或者Win键

![](https://s2.loli.net/2022/05/02/KdX7CqkSHnVoWgi.png)

搜索 “ voice ” 

![](https://s2.loli.net/2022/05/02/atfvRqMLo5uF76p.png)

打开即可（录音机打开又一点点慢，需要耐心）

#### 4.强制终端实验方法

Ctrl + Alt + Shift，这样子中断实验会导致数据记录不上



#### 5.实验结束后要收集的数据

如图，在程序文件夹下：

![](https://s2.loli.net/2022/05/02/e5LM3yECDnRawUf.png)

每次做完一个人，最好就把这俩份东西拷贝出来，然后再删掉原来的这两个，再进行下一个实验，否则如果实验者输错序号会把数据覆盖掉的，，，

#### 6.实验前给受试分配好编号，并监督受试输入正确的编号

这样能防止数据与人的录音不匹配

#### 7.运行EPrimer出现“Your system is in violation of the license agreement”错误

![](http://cdn.lmark.cc/img/image-20220822022130889.png)

原因：是破解版到期了，需要重新破解一下

解决方法：关闭Eprimer，然后打开安装Eprimer的文件夹，双击e-prime2.0.reg

e-prime2.0.reg

然后会弹出一个弹窗，点击“是”即可

![](http://cdn.lmark.cc/img/image-20220822022149024.png)

然后再重新双击实验文件开始运行
