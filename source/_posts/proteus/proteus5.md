---
title: 基于proteus的可视化设计(5)——传感器
tags: Proteus
cover: 'https://s2.loli.net/2022/01/29/1WsFjBXNIlyAvYc.png'
top_img: 'https://s2.loli.net/2022/01/31/8pH9kra5PqMFUj6.png'
abbrlink: 1244c55c
date: 2022-02-13 18:47:19
---

上一篇文章介绍了电机的一些用法，这次来介绍——传感器。

![距离传感器](https://s2.loli.net/2022/02/13/tVdRNsYSIyZPBrq.png)

![声音传感器](https://s2.loli.net/2022/02/13/D8oraYvJXlVQtbB.png)

![DHT22一体化温湿度传感器](https://s2.loli.net/2022/02/13/MkPCcfF9LOzopGU.png)

**传感器**（sensor）

> **传感器是一种检测装置，能感受到被测量的信息，并能将感受到的信息，按一定规律变换成为电信号或其他所需形式的信息输出，以满足信息的传输、处理、存储、显示、记录和控制等要求。**
>
>    **传感器的特点包括:微型化、数字化、智能化、多功能化、系统化、网络化。它是实现自动检测和自动控制的首要环节。传感器的存在和发展，让物体有了触觉、味觉和嗅觉等感官，让物体慢慢变得活了起来。**
>
>    **通常根据其基本感知功能分为热敏元件、光敏元件、气敏元件、力敏元件、磁敏元件、湿敏元件、声敏元件、放射线敏感元件、色敏元件和味敏元件等十大类。**

## 1.距离传感器



![](https://s2.loli.net/2022/02/13/iFnUAzLMD7rojQ4.png)

模块介绍：

１、本模块性能稳定，测度距离精确。模块高精度，盲区（2cm）。
 2 、主要技术参数：

- 使用电压：DC5V        
- 静态电流：小于2mA
- 电平输出：高5V           
- 电平输出：低0V
- 感应角度：不大于15度       
- 探测距离：2cm-450cm      
- 高精度：可达0.3cm

 TRIP引脚是内部上拉10K的电阻，用单片机的IO口拉低TRIP引脚，然后给一个10us以上的脉冲信号。 

3、URF04模块工作原理：
	(1)采用IO触发测距，给至少10us的高电平信号;
	(2)模块自动发送8个40khz的方波，自动检测是否有信号返回；
	(3)有信号返回，通过IO输出一高电平，高电平持续的时间就是超声波从发射到返回的时间．
　 			测试距离=(高电平时间*声速(340M/S))/2;   
　 

	本产品使用方法简单,一个控制口发一个10US以上的高电平,就可以在接收口等待高电平输出.一有输出就可以开定时器计时,当此口变为低电平时就可以读定时器的值,此时就为此次测距的时间,方可算出距离。 

#### (1).proteus中提供的距离传感器

在可视化设计中，提供了超声波测距的模块

![在Grove中](https://s2.loli.net/2022/02/13/zGUsZbBOhT2aYHj.png)

![](https://s2.loli.net/2022/02/13/YGSxjLfXyPiumV6.png)

方法：

- readCentimeters:按cm读距离值
- readinches:按in(英寸)读距离值

![](https://s2.loli.net/2022/02/13/IUmRWGnoDlwh9HN.png)

超声波测距模块+LCD1602模块，显示距离：

![](https://s2.loli.net/2022/02/13/ILaGfT5OVrmRBSJ.png)

仿真验证：

![](https://s2.loli.net/2022/02/13/SYIQ2pigeowxMO9.png)

## 2.声音传感器

![](https://s2.loli.net/2022/02/13/Zqncr4kAM6LVfew.png)

#### (1).模块简介

工作电压5V，模拟量电压信号输出，信号幅度VCC/2，灵敏度好，内置放大电路，增益可调，可通过AD转换获得声音强度的电压信号适用于arduino平台，兼容arduino传感器接口。



#### (2).proteus提供的声音传感器



![原理图](https://s2.loli.net/2022/02/13/L6TkOqB1Xh3xtim.png)

![在Grove中](https://s2.loli.net/2022/02/13/kSlOdi4rneVtcQD.png)

该模块只有一个方法：

**readLevel：读声音响度值**

![只有一个方法](https://s2.loli.net/2022/02/13/pEM1BrXVOn9dIRZ.png)

用该模块+LCD1602设计一个测量声音响度的程序

**SETUP流程图**：

![](https://s2.loli.net/2022/02/13/ohNsenm3YSCZUaI.png)

**LOOP流程图：**

![](https://s2.loli.net/2022/02/13/AF1xl6p5UtHJ3nb.png)

仿真验证：

![](https://s2.loli.net/2022/02/13/Jk2YlFucAfV84HL.png)

貌似这个模块在proteus8.11是有bug的，会无法运行，8.6版本可以正常运行。

## 3.温度、湿度传感器

#### (1).模块介绍

**DHT22一体化温湿度传感器**，      本产品是采用高稳定性电容式感湿元件作为传感元件，经过微处理器采集处理转化成数字信号 输出。每一个传感器都经过标定校准和测试。具有长期稳定、可靠性高、 精度高、低功耗等特点。

DHT22 数字温湿度模块具有以下特点： 

- 1、数字输出，IIC 协议；
- 2、超低功耗； 
- 3、0-100%相对湿度测量范围； 
- 4、全标定、温漂校准。 
- 5、使用独立感湿元器件，稳定性好，抗污染能力强

![](https://s2.loli.net/2022/02/19/ZqDmGVRLieTWYxc.png)

#### (2).proteus中可供使用的DHT22模块

proteus中提供了DHT22模块，

![Breakout的DHT22模块](https://s2.loli.net/2022/02/19/ZwimP7Ify16raks.png)

![模块的方法](https://s2.loli.net/2022/02/19/QbFMIcgEqVZa4SJ.png)

**方法：**

- 1.readTemperature:读温度（摄氏温度或华氏温度）
- 2.readHumidity:读湿度（%）
- 3.computeheathdex:
- 4.converCtoF:摄氏温度转华氏温度
- 5.converFtoC:华氏温度转摄氏温度

![](https://s2.loli.net/2022/02/19/fasNKTyOkRCtLbi.png)

例程设计（设计一个显示温度和湿度的小程序）：

原理图：

![](https://s2.loli.net/2022/02/19/Ra5Xcrli2vUemCD.png)

流程图：

![](https://s2.loli.net/2022/02/19/UEkFXQ7ltB5fhdp.png)

仿真验证：

![image-20220219214522500](https://s2.loli.net/2022/02/19/bsirlA6P2SxUvyn.png)

## 补充：热敏电阻测温

GROVE的Temperature Sensor模块，

![GROVE的Temperature Sensor模块](https://s2.loli.net/2022/02/19/yDUV4Luw5bQf82F.png)

![热敏电阻测温，LCD1602显示测温值。](https://s2.loli.net/2022/02/19/3aSWPNYqvCj921t.png)

热敏电阻测温模块的方法：

- **readCelcius:直接读出摄氏温度；**
- readFarenheit:直接读出华氏温度；
- readKelvin:直接读卡尔文氏温度。

![](https://s2.loli.net/2022/02/19/sU8BdApDxKfn3qm.png)

流程图设计：

![](https://s2.loli.net/2022/02/19/PGLYlCcuhvBWKiM.png)

