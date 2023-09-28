---
title: 基于proteus的可视化设计(4)——电机控制
tags: Proteus
cover: 'https://s2.loli.net/2022/01/29/1WsFjBXNIlyAvYc.png'
top_img: 'https://s2.loli.net/2022/01/31/8pH9kra5PqMFUj6.png'
abbrlink: f26766a0
date: 2022-02-11 22:56:33
---

在上一篇文章中，我介绍了显示屏的一些用法，今天给大家介绍proteus可视化设计中，电机的一些用法

![](https://s2.loli.net/2022/02/12/xsrS7HBOEwiPW3L.png)![](https://s2.loli.net/2022/02/12/leDhsLcqCpfPNAF.png)

## 1.直流电机

#### (1).直流电机简介

直流电机有有刷电机和无刷电机两种，两者不同之处在于结构和原理不同，且两者各有优劣。

![](https://s2.loli.net/2022/02/12/fiJuH6apdZzQw2y.png)

直流电机的一些特点：

- 1、调速性能好，调速范围广，易于平滑控制
- 2、起动、制动转矩大，易于快速起动、停车
- 3、易于控制
- 4、通过调整直流电压可以实现电机的调速
- 5、改变供电电压极性可以实现改变电机旋转方向

![直流电机的符号表示](https://s2.loli.net/2022/02/12/QXWxFOSZTobet7K.png)

#### (2).proteus提供的模块介绍

proteus可视化设计中，提供了许多的电机模块

![](https://s2.loli.net/2022/02/12/7jEKTzUa5g698Ct.png)

介绍一个直流电机驱动模块——**L298双路直流电机驱动器**

![](https://s2.loli.net/2022/02/12/3dHTZ6uoPeElAbR.png)

关于L298双路直流电机驱动器：

L298是一个集成的单片电路，它有两种封装。它是一个高压，高电流双全桥驱动器设计到接受标准化TTL逻辑电平和驱动感应负载，例如：继电器，螺线管，直流电机。有以下特点：

+ 双H全桥驱动；
+ 电源工作电压最高达46V；
+ 总输出直流电流高达4A；
+ 过热的保护。

![](https://s2.loli.net/2022/02/12/1WGRYjycMCDJ79k.png)![](https://s2.loli.net/2022/02/12/E2tRFX5Sq4fpODv.png)

这里介绍这个模块：**Arduino Motor Shield (R3) with DC Motors**

![Arduino Motor Shield (R3) with DC Motors](https://s2.loli.net/2022/02/12/9FDNVtapML6beST.png)

电机模块方法：

- 1.run:电机旋转，参数dir设定方向，speed:设定速度(0~255)
- 2.stop:电机停止。
- 3.release:电机释放（自由、不受控）

![](https://s2.loli.net/2022/02/12/faTUhIm349jYgvc.png)

一个例程参考

![](https://s2.loli.net/2022/02/12/9reYLkITHu5MbA1.png)

## 2.舵机控制

**舵机**采用脉冲宽度控制舵机旋转角度

![](https://s2.loli.net/2022/02/12/UME1QloJGBTRs3W.png)

![](https://s2.loli.net/2022/02/12/yhHuSULi2PNZGE4.png)

可视化设计中，在Grove中，有舵机模块，如下图：

![](https://s2.loli.net/2022/02/12/4P5CoQegjkJmfE8.png)

方法：

+ 1.read:读舵机的转动角度

+ 2.write:写舵机的转动角度(0~180°)

     (0~180°)对应舵机转动(-90°~+90°)。  

+ 3.readMicrosconds:读舵机控制的脉冲宽度（微秒）

+ 4.writeMicrosconds:写舵机控制的脉冲宽度（微秒）
    
    （1000~2000）对应舵机转动(-90°~+90°)
    
+ 5.attach:重新使用引脚控制

+ 6.detach:拆分引脚控制

![](https://s2.loli.net/2022/02/12/AdhTXiP4wpoByax.png)

这次，自己来设计一个例程

首先，先在Grove中添加一个电位器模块：

![](https://s2.loli.net/2022/02/12/WeclbhNrg6Jop15.png)

![](https://s2.loli.net/2022/02/12/IyL6PDcbefsZVpN.png)

方法：

+ 1.readAngle:读旋转角度（0~300°)
+ 2.readRaw:读A/D测量原始值（0~1024）

然后，再添加一个LCD1602模块

![](https://s2.loli.net/2022/02/12/catD3HzwWNyG5fL.png)

所需模块都添加完成了，现在可以来设计程序了，这次实现的功能是：**电位器(0~300°)旋转，控制舵机(-90°~+90°)旋转，并在LCD上显示角度。**

![](https://s2.loli.net/2022/02/12/6rGptmV9sRwUcC8.png)

流程图：

![](https://s2.loli.net/2022/02/12/SELzk3hU1M8cJd9.png)

仿真验证：

![](https://s2.loli.net/2022/02/13/VLG4aUdiswxcMFl.png)

通过调节电位器的角度，可以改变舵机的角度，具体值如下：

![](https://s2.loli.net/2022/02/13/DgklR1uQswVU9fh.png)

## 3.步进电机

![](https://s2.loli.net/2022/02/13/ZpfRbxPYKOL6IXy.png)

#### (1).步进电机简介

> ​    **步进电机是将电脉冲信号转变为角位移或线位移的开环控制元件。在非超载的情况下，电机的转速、停止的位置只取决于脉冲信号的频率和脉冲数，而不受负载变化的影响，当步进驱动器接收到一个脉冲信号，它就驱动步进电机按设定的方向转动一个固定的角度，称为"步距角"，它的旋转是以固定的角度一步一步运行的。可以通过控制脉冲个数来控制角位移量，从而达到准确定位的目的;同时可以通过控制脉冲频率来控制电机转动的速度和加速度，从而达到调速的目的。**
>
> ​    **步进电机是一种感应电机，它的工作原理是利用电子电路，将直流电变成分时供电的，多相时序控制电流，用这种电流为步进电机供电，步进电机才能正常工作，驱动器就是为步进电机分时供电的，多相时序控制器。**

#### (2).proteus中提供的步进电机模块

![](https://s2.loli.net/2022/02/13/1huHTDkovKIeZXg.png)

![](https://s2.loli.net/2022/02/13/bU8yuHnSXEYw2xG.png)

方法说明：

![](https://s2.loli.net/2022/02/13/HXw6Zd9srJOUmlc.png)

+ 1.step:前进多步
+ 2.oneStep:前进一步
+ 3.release:释放电机控制
+ 4.setSpeed:设置电机转速（转/分)

 
