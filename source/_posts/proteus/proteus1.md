---
title: 基于proteus的可视化设计(1)——基础介绍
tags: Proteus
cover: 'https://s2.loli.net/2022/01/29/1WsFjBXNIlyAvYc.png'
top_img: 'https://s2.loli.net/2022/01/31/8pH9kra5PqMFUj6.png'
abbrlink: 6a55821b
date: 2022-01-29 22:46:01
---

Hello，大家好，这里是LMark，今天来给大家分享proteus软件的仿真设计的一些方法，如有错误，欢迎大家指正。我首先声明一下，本人为计算机专业大一学生，对单片机开发只是一个兴趣爱好，并不会在这里介绍太多原理性的内容（主要是我也不是很懂哈哈哈），主要介绍介绍proteus这个软件中，基于arduino uno板的可视化设计(visual Designer)方法。OK，接下来让我们进入正题。



​	关于Proteus的介绍，这里摘抄一段百度百科的介绍：

>  Proteus软件是英国Lab Center Electronics公司出版的EDA工具软件。它不仅具有其它EDA工具软件的仿真功能，还能仿真单片机及外围器件。它是比较好的仿真单片机及外围器件的工具。虽然国内推广刚起步，但已受到单片机爱好者、从事单片机教学的教师、致力于单片机开发应用的科技工作者的青睐。

就是这么一个功能强大的软件，成为了许多老师们上课喜欢用的软件。我们学校有老师开了一门单片机学习入门的课，就是用proteus来教学的。先来看看proteus长啥样：

![image-20220129184045826](https://s2.loli.net/2022/01/29/1WsFjBXNIlyAvYc.png)

现在proteus最新版本已经到了8.13，从8.6开始，proteus就已经支持可视化设计，那有人要问了：什么是可视化设计呀? 

**可视化（Visual）程序设计其实是一种全新的程序设计方法。**

> **它主要是让程序设计人员利用软件本身所提供的各种控件，像搭积木一样来构造应用程序的各种界面。** **Proteus**软件的可视化设计**Visual Designer**是一个独特的开发工具，同时使用流程图和**Arduino**开发板通过拖放的外围设备模块来设计基于**Arduin**嵌入式系统的程序设计。并且设计好的程序可以直接烧录到对应的板子上。



要想用proteus进行可视化设计，得要1.安装proteus8.6及以上的版本。2.软件需要破解。proteus破解版在网上搜可以搜索到很多，我这里给一个proteus8.11的破解版：https://pan.baidu.com/s/1QCxhFQWl4XzPcNVOcg_Czw   提取码：sc8a



## 1.创建可视化设计工程

首先打开软件，可以看到这样的界面，点击“New Flowchart”（我的proteus是汉化过的，汉化的方法百度上有很多，以后会讲讲）

![image-20220129190530172](https://s2.loli.net/2022/01/29/AbQeq74tcDo5xyF.png)

点击“下一步”

![image-20220129190708897](https://s2.loli.net/2022/01/29/vh8HNQs1IXizbJa.png)

然后就按照默认配置即可，最后点击“完成”即可创建。



## 2.界面介绍

原理图界面，在这里可以摆放部件的位置，对部件的属性进行修改

![image-20220129192304159](https://s2.loli.net/2022/01/29/Dux2p38XEOCY65k.png)

流程图界面，在这里可以进行程序的设计

![image-20220129192347730](https://s2.loli.net/2022/01/29/fvbYQgB6Fz8OUC7.png)

## 3.可视化设计基本方法介绍

以刚刚的工程为例，可视化原理图搭建完成后，将界面切换至可视化界面，从左边工程树中的Peripherals选项中，我们可以看到cpu和timer1两个关于Arduino开发平台的方法库：

![](https://s2.loli.net/2022/01/30/S8HFInczCLbNOhs.png)

#### cpu模块的方法

单击cpu左边的三角，弹出cpu相关的方法：

pinMode（配置引脚模块，指定引脚和方向）

analogReference（配置模拟引脚参考电压模块）

analogWrite（写入模拟量模块）

analogRead（读取模拟量模块）

digitalWrite（写入数字量模块，指定输出引脚和高低电平）

digitalRead（读取数字量模块）

pulseIn（读取脉冲时间模块）

millis（延时模块）

enableInterrupt（启用中断模块）

disableInterrupt（禁用终端模块）

debug(调试模块)等等

![](https://s2.loli.net/2022/01/30/Z82nzGi4UXoysc3.png)

#### timer1模块的方法

单击timer1左边的三角，弹出timer1相关的方法：

initialize（初始化模块）

setPeriod（设置频率模块）

start（启动模块）

stop（停止模块）

restart（重启模块）

resume（继续模块）

read（读取模块）

pwm（启用PWM模块）

disablepwm（禁用PWM模块）

setPwmDuty（设置PWM占空比模块）

![](https://s2.loli.net/2022/01/30/Y5ys48PL2QpAatU.png)

#### 基本逻辑框图

从工程树的右边可以看到基本逻辑框图，如下图所示：

![流程图中的基本逻辑框图](https://s2.loli.net/2022/01/30/zWuhaMGO1ErptAq.png)

需要使用的时候只需要将对应的框拖动到流程图中即可,在这里简单介绍几个逻辑框图的用法。首先，是赋值/分配模块，该模块是变量赋值的工具，可以在赋值/分配模块中完成创建新变量、编辑变量和删除变量等操作，可用的变量类型如下：

![可视化设计中的变量的类型](https://s2.loli.net/2022/01/30/aEYybHV4cNxvR6g.png)

![](https://s2.loli.net/2022/02/11/2P1DtsyaXRCgwbH.png)

和C语言差不多，有布尔类型，整型，浮点型，字符串型等等，后面的TIME是时间类型（之后的文章会介绍），还有一个HANDLE（句柄）我也没用过。其次，介绍一下决策/判断模块，双击该模块，在Condition中填入判断的条件；右键点击该模块，选择“Swap Yes/No”，可以交换流程图中的Yes和No的分支。

![判断模块](https://s2.loli.net/2022/01/30/8gnBGM3FosKCam2.png)![交换Yes和No](https://s2.loli.net/2022/01/30/eIMNr85RTaBclVZ.png)

然后介绍一下循环模块，这个循环模块里包含了三种循环，分别是计数循环（Count Loop）、For-Next循环（For-Next Loop）、While-Wend循环（While-Wend Loop）和Repeat-Until循环（Repeat-Until Loop）。后面三种循环分别对应着C语言中的FOR循环、While循环和While-Until循环。

最后告诉大家一个小技巧，当你的流程图过长时，你可以把流程图分开成两个，操作方法是右键单击要分离的地方并Split（分离）向导线即可，如图所示：

![](https://s2.loli.net/2022/01/30/mKWHu3kt25eUQcf.png)![](https://s2.loli.net/2022/01/30/mps9S8WZdKLDvjt.png)![](https://s2.loli.net/2022/01/30/AGZzHFmqoyWxJMb.png)



#### 系统仿真

**开始仿真：**若要开始仿真，可以单击动画控制面板上的“播放”按钮。程序将进行编译并且仿真进度将在状态栏上显示：

![第一个](https://s2.loli.net/2022/01/30/7VxU5rYJ9O8lt2E.png)

**停止仿真：**若要停止仿真，可以单击动画控制面板上的“停止”按钮，整个工程将停止仿真。

![第四个](https://s2.loli.net/2022/01/30/kxhK1N95mj6teF3.png)

**暂停仿真：**暂停Proteus仿真是一个重要的概念。当仿真暂停时，程序和元器件处于当前静止状态，例如，电容器不会放电，电机将保持其角位置和动量，这样便可以是用户检查程序和虚拟硬件。若要暂停仿真，可以单击动画控制面板上的“暂停”按钮。

![第三个](https://s2.loli.net/2022/01/30/oIdv7l8anJQOYV4.png)

#### 串行口通信模块

在可视化设计中，有时候需要实时查看一些变量的值来检查程序是否正常运行，当你的程序中没有显示屏的时候，串口通信模块就能发挥大用处，软件里提供了这个模块

![](https://s2.loli.net/2022/02/11/pMASxXbFc7E64lP.png)

如图，在Grove中的UART。

![](https://s2.loli.net/2022/02/11/m3oeF4EkxatJKIu.png)

方法：

- 1.print:屏幕打印字符
- 2.println:屏幕打印字符，并换行回车
- 3.setBase:设置数据打印进制数
- 4.setPlaces:设置数据打印保留几位小数点

方法很简单，就是print嘛，举个例子，输出一个字符串：

![](https://s2.loli.net/2022/02/11/tsiWvHFObe2uyg9.png)

效果：

![](https://s2.loli.net/2022/02/11/2SZd3ApnVXrPCLz.png)

这样就在屏幕上打开了！如果你一不小心点了右上角的X关掉了，下次模拟仿真的时候是不会出现的，需要手动打开，打开方法：

点击调试

![](https://s2.loli.net/2022/02/11/9GVg4W3A2EyaBDF.png)

然后勾选这个VT的选项即可

![](https://s2.loli.net/2022/02/11/YAT8nP3cHGF2LWl.png)

