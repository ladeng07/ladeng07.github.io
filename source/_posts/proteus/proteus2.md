---
title: 基于proteus的可视化设计(2)——LED模块
tags: Proteus
cover: 'https://s2.loli.net/2022/01/29/1WsFjBXNIlyAvYc.png'
top_img: 'https://s2.loli.net/2022/01/31/8pH9kra5PqMFUj6.png'
abbrlink: bcaeb128
date: 2022-01-29 23:52:45
---
在上一篇文章中，介绍了proteus可视化设计的一些基本操作，今天我们来介绍第一种组件的使用-------LED控制。



### 1.LED模块的选择

在Proteus中，一共有7种软件自身提供的模块，如下图：

![](https://s2.loli.net/2022/01/30/XAkIU98Rcw2zuZQ.png)

这里可使用的LED模块有**Breakout Perifherals**里的和**Grove**里的，这两种LED灯都有红、黄、蓝、绿四种颜色，两种LED灯的区别在于接线方式不同

![Breakout Perifherals模块里的LED](https://s2.loli.net/2022/01/30/AeOXCZGl7oVKQab.png)

![Grove模块里的LED](https://s2.loli.net/2022/01/30/1Is6pKj9vYWEVHF.png)

![Breakout Perifherals模块里的LED原理图](https://s2.loli.net/2022/01/30/RFOdxBc6SjmNkbn.png)

![Grove模块里的LED原理图](https://s2.loli.net/2022/01/30/JkK9sgxz7NQd1Zb.png)

在原理图中双击Grove LED，可以看到connector ID，这里用的是D2到D8这6个数字端口，当你有多个Grove LED时，应该设置不同的端口，否则在编译过程中会报错；双击Arduino LED可以看到，Arduino LED可以使用IO0到IO19这20个输入输出端口，比Grove LED的可用端口要多，当你的程序所需的LED灯数量比较大时，Arduino LED是不错的选择。

![Arduino LED的端口](https://s2.loli.net/2022/01/30/ynhz2VmQl9siTUo.png)![Grove LED的端口](https://s2.loli.net/2022/01/30/ldUFoYrzLs8MHD9.png)

这里补充一点，Grove LED的四个引脚都代表什么，如图，第一和第二引脚都是数字端口，第三个引脚是VCC，第四个引脚GND也就是接地。虽然Grove LED只使用一个引脚（即图中的D2，第二个引脚为proteus自动设置的），但是在编译过程中经常会出现一种情况：当你放置了多个Grove LED模块时，即使设置了不同的数字端口，编译时仍出现端口占用的情况。解决方法很简单，只需要给被占用的Grove LED模块设置一个新的端口，然后再设置成原来的端口，就可以解决问题了。
![Grove LED的引脚图](https://s2.loli.net/2022/01/30/WIEKw52tipmgdky.png)

### 2.LED模块的使用方法

前面介绍了两种LED模块，虽然这两种模块的来源不同，但是其方法时相同的。这里以Grove LED为例：

![LED模块的方法](https://s2.loli.net/2022/01/30/zK4muCOks79Wrqa.png)

**on：端口输出高电平，LED发光**

**off：端口输出低电平，LED熄灭**

**set：设置LED发光/熄灭；TRUE=on**
                                           **FLASE=off**

**dim：端口PWM输出,可以调光(0~255)**

**toggle：LED发光状态取反**

#### （1）LED的闪烁

只要将你所需的方法直接拖到流程图中就可以使用了，这里我们先做一个小实验，让LED灯闪烁，示例流程图如下：

![](https://s2.loli.net/2022/01/30/iuonlGYtBJDjPUK.png)

编译运行一下：

![](https://s2.loli.net/2022/01/30/QN94numX5UoHTIC.png)![](https://s2.loli.net/2022/01/30/cS4GhwI75RKO36o.png)

可以看到，LED灯就开始每秒闪烁一次了，是不是很简单？接下来我们来做一下键控LED灯，

#### （2）键控LED

键控LED就是**按键控制LED灯，按键按下时，对应LED发光，按键松开后LED灯熄灭。**要用到的按钮模块选择Grove里的按钮模块，

![](https://s2.loli.net/2022/01/30/zjHIZhb4o12Nuqf.png)

原理图：

![](https://s2.loli.net/2022/01/30/1kjAqTJoDCYaWIg.png)

当按键按下时，端口D2输入高电平；当按键松开时，端口D2输入低电平。按键模块只有一个方法，即判断按键是否被按下，键控LED流程图如下：

![](https://s2.loli.net/2022/01/30/ySDrvAH4sQ1lEVN.png)

当按键按下时，LED灯会一直亮着；当按键松开时，LED灯熄灭。从而实现键控LED效果

![](https://s2.loli.net/2022/01/30/nsYmJzD4Q1lF7ea.png)

#### （3） 流水灯控制

**LED流水灯控制**实际上就是多个LED发光二极管依次一个一个发光，每个发光管点亮约1秒。这种控制规律称为“流水灯”控制。这里以四个LED灯为例，给大家做一个流水灯的程序，效果图。

![四个LED的流水灯控制](https://s2.loli.net/2022/02/01/y58cPRfqndoG6t1.png)

流程图**SETUP部分：**

![](https://s2.loli.net/2022/02/01/n5rpzVo6Cimj9kB.png)

流程图**LOOP部分：**

![主程序](https://s2.loli.net/2022/02/01/8jzBsh6Mn7oKqgZ.png)

子程序：

![子程序](https://s2.loli.net/2022/02/01/wauy4P8qvRgYNMI.png)

这个流水灯的逻辑很简单，首先先是SETUP时初始化每个LED灯，即把状态设置成OFF，然后每个子程序负责点亮一个LED，熄灭剩下三个LED。这样子就实现了流水灯控制。



### 3.LED模块使用实战

前面两部分已经详细的介绍了LED的一些用法，相信看到这里的各位已经对LED的使用完全掌握了，现在给大家布置一个小作业：**实现简易红绿灯**，具体要求如下：

![第一个作业要求](https://s2.loli.net/2022/02/01/dkSJ5OG3m9qPg6t.png)

感兴趣可以做一下，底下我贴一下我的流程图：

![流程图](https://s2.loli.net/2022/02/01/SrBLJEIxuedlQX3.png)

原理图：

![原理图](https://s2.loli.net/2022/02/01/3I6ufamH7CglGbF.png)
