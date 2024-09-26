---
title: 基于proteus的可视化设计(3)——显示屏控制
tags: Proteus
cover: 'https://s2.loli.net/2022/01/29/1WsFjBXNIlyAvYc.png'
top_img: 'https://s2.loli.net/2022/01/31/8pH9kra5PqMFUj6.png'
abbrlink: cb089c0e
date: 2022-02-01 20:39:09
---

上一篇文章介绍了LED模块的用法，这次来给大家介绍介绍一下显示屏的用法，列举一些常见的显示屏：

![LED数码管显示器](https://s2.loli.net/2022/02/01/hOLUIEes4TAa6MS.png)![LCD1602字符型液晶显示器](https://s2.loli.net/2022/02/01/8XCiutYTAr6M1Uo.png)![OLED 12864显示器](https://s2.loli.net/2022/02/01/G2gjx6dWCpM1vQN.png)

本文给大家讲解一下这三种显示屏的用法。

## 1.LED数码管显示屏

#### （1）LED数码管介绍

什么是数码管呢？

> LED数码管(LED Segment Displays)由多个发光二极管封装在一起组成"日"字型的器件，引线已在内部连接完成，只需引出它们的各个笔划，公共电极。数码管实际上是由七个发光管组成日字形构成的，加上小数点就是8个。这些段分别由字母a,b,c,d,e,f,g,dp来表示。

![七段LED数码管](https://s2.loli.net/2022/02/02/4KracejIDPEWkBn.png)![十六段数码管](https://s2.loli.net/2022/02/02/DKcC5wZphNfszj3.png)![十六段数码管引脚图](https://s2.loli.net/2022/02/02/qhEWlO8JCx2Y63H.png)

常见的数码管是七段数码管，就是上面第一张图。此外，还有十六段数码管：

![十六段数码管结构图](https://s2.loli.net/2022/02/02/sVj6aLoJE7RfbBl.png)

七段数码管：

![七段数码管引脚对应关系图](https://s2.loli.net/2022/02/02/6zWsfYiCp9kA7gL.png)

![七段数码管的正面](https://s2.loli.net/2022/02/03/ZVv3PX8Fy5HGeun.png)

![七段数码管的背面](https://s2.loli.net/2022/02/03/uwj4qfSnb57ghcr.png)

这里稍微介绍一下七段数码管的工作原理，可以看到，一个数码管有十个引脚，每个引脚对应关系如上图所示。由于每个引脚只有高低电平两种状态，所以一般用高电平表示某一段数码管发光，低电平表示某一段数码管不发光，这样，就可以表示出0-9这是个数字了。举个例子，当数码管要显示数字**1**时，只要b，c引脚输出高电平，其他引脚输出低电平即可。其他数字同理可得。

显示一个数字如此，如果显示多个数字呢？比如下面的四位数码管：

![常见的四位数码管](https://s2.loli.net/2022/02/03/MV8erwDhtFm4QBJ.png)

![](https://s2.loli.net/2022/02/03/trxUh1kMEqeTusO.png)

可以看到，四段数码管只有12个引脚，为什么不是40个引脚呢？这是因为，四位数码管显示方式为**动态扫描**。每次只显示1位，快速循环显示，利用人眼视觉暂留特性，好像同时显示。这样子就可以共用一些引脚了。

#### （2）proteus可提供的模块介绍

使用专用芯片TM1637实现4位LED数码管控制

![TM1637芯片](https://s2.loli.net/2022/02/03/dnvMXASIVW5N7ul.png)

**TM1637** 是一种带键盘扫描接口的LED（发光二极管显示器）驱动控制专用电路，内部集成有MCU 数字接口、数据锁存器、LED 高压驱动、键盘扫描等电路。本产品性能优良，质量可靠。主要应用于电磁炉、微波炉及小家电产品的显示屏驱动。采用DIP/SOP20的封装形式。

TM1637功能特点：

+ 采用功率CMOS 工艺 
+ 显示模式（8 段×6 位）,支持共阳数码管输出 
+ 键扫描（8×2bit），增强型抗干扰按键识别电路 
+ 辉度调节电路（占空比 8 级可调） 
+ 两线串行接口（CLK，DIO） 
+ 振荡方式：内置RC 振荡（450KHz+5%） 
+ 内置上电复位电路 
+ 内置自动消隐电路 
+ 封装形式：DIP20/SOP20

![芯片引脚](https://s2.loli.net/2022/02/03/iSzInQePxbcaDmC.png)

![引脚功能说明](https://s2.loli.net/2022/02/03/TOF52d13ZJLaCio.png)

典型应用电路：

![6位LED数码管+16键](https://s2.loli.net/2022/02/03/cZEiyhsoqj7upmW.png)

装载了TM1637芯片的显示器实物图：

![实物图](https://s2.loli.net/2022/02/03/Qn3N6mLuS8b5WD9.png)

可见，TM1637是块功能强大的芯片，在proteus可视化设计中，有一个例程就是TM1637芯片的应用。可视化设计的例程是proteus软件内置的，一些编写好的程序，可以直接打开运行，来学习某些模块如何使用。

#### （3）数码管例程介绍

打开例程的方法，首先在首页的入口（图中圈出来的地方）：

![](https://s2.loli.net/2022/02/03/6J2TSIrEnMlbKAy.png)

然后，在左边的目录中，找到“Visual Designer for Arduino”

![](https://s2.loli.net/2022/02/03/ICYJ2lHGWpbFUBk.png)

然后在右边的结果中可以看到一共有94个例程可供学习，我们今天要介绍的例程是**No.56 Grove 4-digit display** Simple example showing connection and use of Grove 4-digit display module.

![](https://s2.loli.net/2022/02/03/14ReVuyENfzGbQs.png)

可视化设计中，软件提供了一个四位数码管的模块，Grove 4-digit display module。这是一个很方便的模块，它的使用方法如下：

![](https://s2.loli.net/2022/02/03/hiWaJ6PbjGz5NvD.png)

+ init：数码管初始化，数码管不显示。
+ setBrightness：设置数码管显示亮度,。不亮、标准亮度和高亮显示
+ display：数码管显示数值(0~9,A~F)
                  pos:位置(0~3)
                  value:数值(0~9,A~F)                          
+ decPoint：秒点显示,TRUE=on亮，FALSE=off灭

**例程硬件设计——添加数码管模块**

![添加数码管模块](https://s2.loli.net/2022/02/03/3KSrlh7V1XxyJDj.png)

**例程软件设计——SETUP流程图**

![](https://s2.loli.net/2022/02/03/wP6vpmRjdZEFVTQ.png)

**例程软件设计——LOOP流程图**

![](https://s2.loli.net/2022/02/03/1qeXvG85KsdkBN4.png)

## 2.LCD1602显示器

#### （1）LCD1602显示屏的介绍

LCD1602显示屏图片如下：

![](https://s2.loli.net/2022/02/03/hxVqJzWkiu34mAC.png)

![16字符X2行液晶显示屏](https://s2.loli.net/2022/02/03/3eO6VZoWGQNI4Rt.png)

LCD1602显示屏的一些特点：

+ 优点：微功耗、体积小、重量轻、超薄
+ 应用场合：袖珍式仪表和低功耗应用系统中。
+ 控制器：日立公司HD44780控制器
+ 显示：160个字符，可以自定义8个字符

可显示字符5*7点阵，共160个字符

![可以显示160个字符](https://s2.loli.net/2022/02/09/tywbTNqor3KX5kH.png)

LCD1602的接口电路：

![](https://s2.loli.net/2022/02/03/p18leQrTJYtdKWg.png)

#### （2）proteus中可供使用的LCD1602模块

在proteus中，可供使用的LCD1602模块有两种，一种是6线制接口，一种是2线制接口。

![Breakout Perpherals 6线制接口](https://s2.loli.net/2022/02/03/6gF2leOLRxHrsn1.png)

![Grove 2线制接口](https://s2.loli.net/2022/02/03/q3n4Y9sUPgfIFx2.png)

不管是6线制接口，还是2线制接口的LCD1602模块，proteus都提供有相对应的可视化设计的例程，比如6线制接口的例程是：

**No.11** **Arduino Real Time Clock with Alphanumeric LCD breakout board.** 

  The example shows simple use of both breakout boards.

![例程的原理图，这个例程是一个实时日历时钟](https://s2.loli.net/2022/02/03/hWGpRT4sBUmD9iN.png)

LCD1602六线制模块的方法如下：

![](https://s2.loli.net/2022/02/03/57ZEHdubqg4D9Bc.png)

现在我们来看一下这个例程的流程图：

![](https://s2.loli.net/2022/02/09/iP5u2vmZbUKqfRy.png)

![仿真验证](https://s2.loli.net/2022/02/09/VuSG1KCaTnsjBUt.png)

可以看到，这个例程的设计非常简单，这也是可视化设计非常对初学者来说最好的地方，内部封装了一些函数，可以直接调用即可，十分的简洁。接下来我们来看一下2线制模块的例程。

**No.51** **FizzBuzz solution problem - LCD version.** 

   A solution for the FizzBuzz puzzle problem.

![](https://s2.loli.net/2022/02/09/OTkn2tJaNiRSFUf.png)

FizzBuzz问题是一种英国学校学生经常玩的游戏。举个“FizzBuzz 问题”的例子：

> 写一个程序打印1到100这些数字。但是遇到数字为3的倍数的时候，打印“Fizz”替代数字，5的倍数用“Buzz”代替，既是3的倍数又是5的倍数打印“FizzBuzz”。

可以看到，你甚至可以用proteus可视化设计来编写游戏，并且如果你有相应的硬件，你甚至可以直接烧录到板子上，可以说是非常的实用了！

![流程图](https://s2.loli.net/2022/02/09/FGCiP1xa3nEkJIf.png)

流程图的逻辑非常易懂，通过判断数字的模来输出结果。

## 3.OLED12864显示屏

#### (1).OLED12864显示屏的介绍

​       **有机发光二极管(Organic Light-Emitting Diode, OLED)**又称为有机电激光显示、有机发光半导体。由美籍华裔教授邓青云(Ching W. Tang)于1979年在实验室中发现。OLED显示技术具有自发光、广视角、几乎无穷高的对比度、较低耗电、极高反应速度等优点。但是，作为高端显示屏，价格上也会比液晶电视要贵。

![OLED12864显示屏为128*64点阵，可以显示西文字符、中文汉字和点阵图形](https://s2.loli.net/2022/02/09/nPkCbjom3pOMdWq.png)

![显示中文字符](https://s2.loli.net/2022/02/09/wagnA1jIShNKHsp.png)

#### (2).proteus中可供使用的OLED12864模块

在proteus可视化设计中，提供了这个模块，并且方法很多

![](https://s2.loli.net/2022/02/09/xhrAPKMbS3oZCdV.png)

先来看看模块的方法：

![还没完呢](https://s2.loli.net/2022/02/09/fm6ntwUDEOJ5Wzb.png)

![](https://s2.loli.net/2022/02/09/OmPj2g8b3GUtTdv.png)

可以看到，这个模块的方法是真的多，想要学习它的用法的话，不妨看看这个模块的例程，proteus也提供了它的例程。

#### (3)例程介绍

**No.66** **Grove OLED 128x64dot Print on graphics display** 

 Simple example on how to print texts on LY190-128064 OLED graphics display

![No.66原理图](https://s2.loli.net/2022/02/09/pnQfMTYx2KUPZ8s.png)

**流程图——SETUP部分：**

![](https://s2.loli.net/2022/02/09/AqNu45WDITYKgVP.png)

**LOOP部分**(这个部分比较冗长，用了几个子函数)

![](https://s2.loli.net/2022/02/09/gJdr5yVZRaKqA6Q.png)

![](https://s2.loli.net/2022/02/09/h4VJUxaNI2SEG1L.png)

![](https://s2.loli.net/2022/02/09/uyNV3Av2Bs8GPZK.png)

流程图比较长，我就不逐个注释了，其实还是挺好懂的。无非就是调用了模块的一些函数。

## 4.显示屏模块使用实战

前面介绍了三种显示屏的用法，想必大家此时已经摩拳擦掌跃跃欲试了，这里给大家布置个小作业。结合上一篇文章介绍的LED模块，这次来设计一个**带有倒计时的红绿灯**，具体要求如下：

![](https://s2.loli.net/2022/02/09/VqfxYGIdNz4Re2D.png)

感兴趣可以做一下，底下贴一下我的流程图：

**SETUP部分：**

![](https://s2.loli.net/2022/02/09/azbL3ftHoKNQT8M.png)

**LOOP部分：**



![](https://s2.loli.net/2022/02/09/8meOvfx3d9MWqbP.png)

仿真验证：

![绿灯](https://s2.loli.net/2022/02/09/uBqmgUfTY6SJzd3.png)

![黄灯](https://s2.loli.net/2022/02/09/qCVANzdwhkvJBcs.png)

![红灯](https://s2.loli.net/2022/02/09/BsVRogKqNelLfaM.png)

