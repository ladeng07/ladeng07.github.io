---
title: 基于proteus的可视化设计(6)——一些自己写的程序介绍
tags: Proteus
cover: 'https://s2.loli.net/2022/01/29/1WsFjBXNIlyAvYc.png'
top_img: 'https://s2.loli.net/2022/01/31/8pH9kra5PqMFUj6.png'
abbrlink: 8540ce62
date: 2022-02-20 20:23:32
---

这篇文章来介绍一下我自己写的一些程序，仅供参考，同时附上网盘链接，感兴趣可以下载看看

链接：https://pan.baidu.com/s/17sitBKqXfq3YgIHTPdrTBg 
提取码：uc6i

### 1.简易数字电压表

#### 要求：

采用Arduino UNO板，外接1个电位器和4个BCD码输入的带有译码器的LED数码管，4位数码管显示电压测量值。



#### 原理图设计

![](https://s2.loli.net/2022/02/20/gNAZlUrIzWtHEJF.png)

![使用的原件](https://s2.loli.net/2022/02/20/J9K7CiuHyL8V2eF.png)

#### 流程图设计

![](https://s2.loli.net/2022/02/20/KUDgWZYuzql25CL.png)

**SETUP流程图设计**

![](https://s2.loli.net/2022/02/20/AsU3nB7QylDuP8z.png)

**LOOP流程图**

![](https://s2.loli.net/2022/02/20/KGpbtFAw5Ho6UPW.png)

![](https://s2.loli.net/2022/02/20/iDKmfxqF5RnkQza.png)

#### 仿真验证

![](https://s2.loli.net/2022/02/20/iXhcy5RA9xnLDZ2.png)



## 2.简易篮球计分器

#### 要求

> 采用 Arduino UNO 板，外接 6 个按键和 1 个 4 位 LED 数 码管，4 位数码管显示篮球比赛得分情况。 在原理图设计中，在元件中添加 2 个元件:1 个 GROVE 中的 TM1637 控制的 4 位数码管显示器元件（GROVE4DIGIT）， 和按键（BUTTON）。 假如，A 队和 B 队进行篮球比赛，数码显示器显示比赛 得分情况，扩展 6 个按键，它们分别定义为：A 队+1 分、A 队+2 分、A 队+3 分、B 队+1 分、B 队+2 分、B 队+3 分。实现 按篮球比赛规则手动计分功能。

#### 原理图设计

![](https://s2.loli.net/2022/02/20/gBQ7mhAyXSvq5RF.png)

#### 流程图设计

![](https://s2.loli.net/2022/02/20/UC2DyLvE1VdGYbk.png)

**SETUP流程图**

![](https://s2.loli.net/2022/02/20/smTf7JC1o4zeROH.png)

![](https://s2.loli.net/2022/02/20/pAytGlvXfN3BD1C.png)

![](https://s2.loli.net/2022/02/20/4qhYpIs7ukLTEeB.png)

![](https://s2.loli.net/2022/02/20/JHN7bGA35ygBPSt.png)

![](https://s2.loli.net/2022/02/20/2Ye6vpXz3M5PufT.png)

#### 仿真验证

![](https://s2.loli.net/2022/02/20/4yrcEgl5xaH7TjL.png)



## 3.多功能万年历

#### 要求

> 采用 Arduino UNO 板，外接 1 个 LCD1602 显示屏、1 个 GROVE 串行口模块、1 个 DS1307 实时时钟模块和 1 个热电阻 测温模块，实现万年历和环境温度显示。



#### 原理图设计

![](https://s2.loli.net/2022/02/20/SzaAJtvMhLso6nX.png)

#### 流程图设计

![](https://s2.loli.net/2022/02/20/GghsmS5XFOy4kME.png)

**SETUP流程图**

![](https://s2.loli.net/2022/02/20/s5Zqc4rGKP3lRaj.png)

**LOOP流程图**

![](https://s2.loli.net/2022/02/20/zXl9KxnITjABHy1.png)

![](https://s2.loli.net/2022/02/20/U7eOrdahpSk31MX.png)

#### 仿真验证

![](https://s2.loli.net/2022/02/20/ZpSxFYciuDb9O2y.png)



## 4.简易四向红绿灯控制

#### 要求

> 设计四向红绿灯：绿灯15秒，黄灯5秒，红灯20秒。



#### 原理图设计

![](https://s2.loli.net/2022/02/20/LyY1fBihTM3uDmz.png)

![所需原件](https://s2.loli.net/2022/02/20/7p456sGdkH8ISyN.png)

#### 流程图设计

![](https://s2.loli.net/2022/02/20/FhUfnM39dxlG4EQ.png)

**SETUP流程图**

![](https://s2.loli.net/2022/02/20/AEXKIjhpuUOoLfi.png)

**LOOP流程图**

![](https://s2.loli.net/2022/02/20/ZqXdFmzUSgRuGlN.png)

![](https://s2.loli.net/2022/02/20/GXjxDutv3kloW1g.png)

![](https://s2.loli.net/2022/02/20/RItKgYXVHbd2GEf.png)

![](https://s2.loli.net/2022/02/20/pOCqo1RKxnVDI9H.png)

#### 仿真验证

![](https://s2.loli.net/2022/02/20/IJ4uiqhrLsTMg7S.png)



## 5.简易温度控制器

#### 要求

> 使用 Grove 中 4 位一体 LED 数码管,并对其进行改造为 2 个 2 位蓝色数 码管显示器。第 1 个 2 位数码管显示测量温度，第 2 个 2 位数码管显示报警温度设定值，扩展热敏电阻温度传感器测量环境温度。当测量温度大于 或等于报警温度值时，黄色 LED 灯闪烁显示报警，否则 LED 灯熄灭不报警。 扩展 2 个 BUTTON 按键，可以预置温度报警上限值，一个键定义报警温度 +1，另一个件定义为报警温度-1。编程实现周而复始进行测温和显示，并进行温度判断和报警



#### 原理图设计

![](https://s2.loli.net/2022/02/20/96wpou1btWQAv5U.png)

#### 流程图设计

**SETUP流程图**

![](https://s2.loli.net/2022/02/20/3FmMJkHrX79tqIA.png)

**LOOP流程图**

![](https://s2.loli.net/2022/02/20/r9wNtJMSTbRlCjk.png)

![](https://s2.loli.net/2022/02/20/38reHUPhwsNg5RE.png)

![](https://s2.loli.net/2022/02/20/OK7dGbpy8qQwxUl.png)

#### 仿真验证

![](https://s2.loli.net/2022/02/20/E3yNWzaDsIA2Vke.png)



## 6.自动避障小车

#### 要求

能避障的小车



#### 原理图设计

![](https://s2.loli.net/2022/02/20/SaT3Vz4LwurdgRN.png)

#### 流程图设计

![](https://s2.loli.net/2022/02/20/hVpwjLKeb85gY6T.png)

**SETUP流程图**

![](https://s2.loli.net/2022/02/20/m5bOwtSxgZFehKk.png)

**LOOP流程图**

![](https://s2.loli.net/2022/02/20/XOt3wL1j2QhynTI.png)

![](https://s2.loli.net/2022/02/20/qNWm3Bn2LS76g8k.png)

#### 仿真验证

![](https://s2.loli.net/2022/02/20/JDgc8keBKYXfoQ1.png)



## 7.打地鼠

#### 要求

> 该实验主要是模拟一个打地鼠的游戏，玩法是：按下开始键后，在规定的时间（15秒）里，按下亮着的灯底下的按钮，就可获得一分，否则没有分；开始之后屏幕上会显示得分和剩余时间，游戏途中想重新开始可以点击按钮结束当前游戏。



#### 原理图设计

![](https://s2.loli.net/2022/02/20/G1YPwmXAyWoMa2N.png)

#### 流程图设计

![](https://s2.loli.net/2022/02/20/T8ocdmKpeH7P3AW.png)

![](https://s2.loli.net/2022/02/20/ZDCuOi4T5M6L7kF.png)

![](https://s2.loli.net/2022/02/20/ZDCuOi4T5M6L7kF.png)

![](https://s2.loli.net/2022/02/20/NELVDZWFftrR2JI.png)

**SETUP流程图**

![](https://s2.loli.net/2022/02/20/4N736Y5B18glemS.png)

**LOOP流程图**

![](https://s2.loli.net/2022/02/20/Ca6S25UPMOxT8i1.png)

![](https://s2.loli.net/2022/02/20/3VyqSr4AYPDCtmk.png)

![](https://s2.loli.net/2022/02/20/qXmUC5kByYzg4V3.png)

![](https://s2.loli.net/2022/02/20/7XyCq2kVPQTxojm.png)

![](https://s2.loli.net/2022/02/20/TIqYciAM6G9ykXs.png)

![](https://s2.loli.net/2022/02/20/ipx86j5UHFD7vaM.png)

![](https://s2.loli.net/2022/02/20/phUTsuxS8N1MyOV.png)

![](https://s2.loli.net/2022/02/20/2krWj4tZxloM7VU.png)

#### 仿真验证

![](https://s2.loli.net/2022/02/20/logwempj1ifdTDS.png)
