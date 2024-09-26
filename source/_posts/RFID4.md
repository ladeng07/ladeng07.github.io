---
title: RFID第一期——各种IC卡和ID卡详解
cover: 'https://cdn.lmark.cc/img/300261_origin_20220531_202723.jpg'
top_img: 'https://cdn.lmark.cc/img/300262_origin_20220531_202727.jpg'
abbrlink: f746fa7f
date: 2023-02-01 04:33:48
tags:
---
# 起因

放假闲来无事，在B站冲浪，看到有人在讨论IC卡，我在这方面刚好还是有这么一点了解，就拿MF1卡给别人举了个例子，然后MF1卡就被开除出IC卡籍了。

![](http://cdn.lmark.cc/img/image-20230131031512672.png)

有点气，但是仔细想想，网上关于这些卡的介绍知识太少了，有些人区分不了也很正常，于是我查阅大量资料，才有了这篇文章。



---

# 前置知识

先给大家捋清楚几个不同的名词：ID卡，IC卡，RFID卡，CPU卡，m1卡，MF1卡，UID卡,CUID卡。。。

看到这对名词想必大家头都大了，但是，今天我就带大家搞清楚这每一个名词的意思，以及目前市面上比较常见的卡的类型的介绍。

## RFID卡和IC卡

首先，大家需要知道的一个名词是：**RFID**

这是什么意思？我摘抄了Wiki上的介绍，帮助大家理解：[射频识别 - 维基百科，自由的百科全书 (wikipedia.org)](https://zh.wikipedia.org/wiki/射频识别)

> **射频识别**（英语：**R**adio **F**requency **ID**entification，[缩写](https://zh.wikipedia.org/wiki/縮寫)：**RFID**）是一种[无线](https://zh.wikipedia.org/wiki/無線)[通信技术](https://zh.wikipedia.org/wiki/通信技术)，可以通过[无线电](https://zh.wikipedia.org/wiki/无线电)信号识别特定目标并读写相关数据，而无需识别系统与特定目标之间建立[机械](https://zh.wikipedia.org/wiki/机械)或者[光学](https://zh.wikipedia.org/wiki/光学)接触。

可以看到，RFID不是一种卡的代号，而是一种技术，一种非常常见的技术，使用了这个技术的“卡”都能称为**RFID卡**，这是一个大类，基本涵盖今天说的所有卡，除了接下来要说的**IC卡**的一部分:

IC卡定义，摘自百度百科：[IC卡_百度百科 (baidu.com)](https://baike.baidu.com/item/IC卡?fromtitle=集成电路卡&fromid=984516&fromModule=lemma_search-box)

> IC卡 (Integrated Circuit Card，集成电路卡)，也称智能卡(Smart card)、智慧卡(Intelligent card)、微电路卡(Microcircuit card)或微[芯片](https://baike.baidu.com/item/芯片/32249?fromModule=lemma_inlink)卡等。它是将一个[微电子](https://baike.baidu.com/item/微电子/1410350?fromModule=lemma_inlink)[芯片](https://baike.baidu.com/item/芯片/32249?fromModule=lemma_inlink)嵌入符合ISO 7816标准的卡基中，做成卡片形式。IC卡与读写器之间的通讯方式可以是[接触](https://baike.baidu.com/item/接触/5692?fromModule=lemma_inlink)式也可以是非接触式。

从两者定义可以看出，RFID卡和IC卡并不是简单的包含与被包含的关系，因为一个是从技术上定义，一个是从结构上定义。两者不能直接比较。严格意义上来说，**接触型IC卡**不属于RFID卡，因为RFID的一大特征就是可以无接触，常见的接触型IC卡有：银行卡，SIM卡等等。最明显的特征就是这个裸露的芯片。

![img](http://cdn.lmark.cc/img/Differentsmartcardpadlayouts.jpg)

而现在**非接触型IC卡**（也就是不用接触也能刷的卡）常被人们叫做射频卡，属于**RFID卡**的范畴。现在很多人直接把IC卡归到了RFID卡里面去，这个说法也不能说是错的，只是没这么严谨罢了。



## RFID和NFC

想必大家现在经常能见到NFC这个词，也总是会发现NFC和众多的“卡”联系在一起。比如：

- 手机的NFC功能
- 小米手环7NFC版
- NFC卡贴
- NFC读卡器
- ......

虽然日常生活中，NFC总是和刷卡有关，但是NFC技术和RFID是有着一定的区别的。这里我先给大家解释一下NFC的含义：[近场通信 - 维基百科，自由的百科全书 (wikipedia.org)](https://zh.wikipedia.org/wiki/近場通訊)

> **近场通信**（英语：Near-field communication，NFC），又称**近距离无线通信**、**近距离通信**，是一套[通信协议](https://zh.wikipedia.org/wiki/通訊協定)，让两个电子设备（其中一个通常是移动设备，例如[智能手机](https://zh.wikipedia.org/wiki/智慧型手機)）在相距几厘米之内进行[通信](https://zh.wikipedia.org/wiki/資料傳輸)。

NFC其实是由RFID技术演变而来，由[飞利浦](https://zh.wikipedia.org/wiki/飞利浦)半导体（现[恩智浦半导体](https://zh.wikipedia.org/wiki/恩智浦半导体)）、[诺基亚](https://zh.wikipedia.org/wiki/諾基亞)和[索尼](https://zh.wikipedia.org/wiki/索尼)共同于2004年研制开发

的。它的特点有：

- 传输距离小，一般小于20cm
- 工作频率固定，为13.56MHz
- 传输速度为424 kbit/s

![img](http://cdn.lmark.cc/img/v2-443da2cae7aa55db85a55e9c83a7a96a_1440w.webp)

具体NFC技术与RFID技术的区别，详见这篇文章：[NFC 与 RFID - 走看看 (zoukankan.com)](http://t.zoukankan.com/zouhao-p-3025542.html)

![different-nfc-rfid](http://cdn.lmark.cc/img/different-nfc-rfid.jpg)

虽然NFC与RFID有这么多不同，但是NFC兼容于现有的被动RFID（13.56 MHz ISO/IEC 18000-3）设施。所以，在高频RFID（13.56MHz）的应用领域中，同样可以使用NFC技术。我们日常用到的卡，基本都是使用了NFC技术，所以下文NFC出现频率会很高。



## IC卡和ID卡

日常生活中，也会常常听到ID卡这个名词，那么，ID卡和IC卡有什么区别呢？

这里提到的IC卡指的是射频卡。

首先先搞清楚什么是ID卡，浅看定义：[ID卡_百度百科 (baidu.com)](https://baike.baidu.com/link?url=G8x8CqQFAMexlQYUpUtoTaXi1a00Lm7pp1-X3Qxt4Yumy674enLYUcOdTVZAG9uJqDTf4BbPfllo-QhMX3Dcyb26ETZIUTNIiZYt_x1P5a7)

> ID卡全称为身份识别卡（Identification Card），是一种不可写入的感应卡，含固定的编号，主要有台湾SYRIS的EM格式、美国HIDMOTOROLA等各类ID卡。ID卡与[磁卡](https://baike.baidu.com/item/磁卡/885032)一样，都仅仅使用了“卡的号码”而已，卡内除了卡号外，无任何保密功能，其“卡号”是公开、裸露的。所以说ID卡就是“感应式磁卡”。 [ISO标准](https://baike.baidu.com/item/ISO标准/9818656)ID卡的规格为：85.5x54x0.80±0.04mm（高/宽/厚），市场上也存在一些厚、薄卡或异型卡。

两种卡的原理和使用方式上的区别。

- ID卡多为低频（125Khz），而且是一种**不可写入数据**的非接触卡，卡号只能由芯片生产厂商一次性写入，开发商只能读出卡号加以使用。

- IC卡多为高频（13.56MHz），不仅可由授权用户读出大量数据，而且亦可由授权用户写入大量数据(如新的卡用户的权限、用户资料等)，IC卡所记录内容可反复擦写。

此外，两种卡在外型上还有很大区别，如下图所示：

![img](http://cdn.lmark.cc/img/56a119a1596b4c7db040578e98d60a0d.png)

![img](http://cdn.lmark.cc/img/d7711b5306554cb8926072a579956e29.png)

**总结：**
1.ID卡多为低频，IC多为高频；
2.IC卡整体上看比ID卡更有优势，市面上使用的大多数也是IC卡；
3.对于矩形白卡，里面为矩形线圈、表面没有编号的多为IC卡，里面为圆形线圈、表面有编号的多为ID卡；
4.对于异形卡，有编号的多为ID卡，最好使用带NFC的手机进行测试(目前手机NFC只能读高频13.56Mhz)，IC卡会有反应；



# ID卡介绍

前面介绍了这么多前置知识，现在该进入正文了。开始详细的介绍每一种卡，先从ID卡开始。ID卡最显著的特征就是低频，出厂固化ID，价格低廉，没有加密。



## 一般的ID卡

ID卡有很多种不用的芯片，由许多不同的公司生产的，常见的有：Mifare UtraLight IC U1、Mifare DESFire 4K；Legic MIM256 ；ST SR176、SRIX4K；I·CODE 1、 I·CODE 2；Tag-it HF-I、Tag-it TH-CB1A；Temic e5551；Atmel T5557、Atmel T5567、Atmel AT88RF256-12 ；Hitag1、 Hitag 2；μEM EM4100、EM 4102、 EM4069、EM4150；TK4100；Inside 2K、Inside 16K等。

国内比较常见的是瑞士微电子公司的**EM4100**无线射频芯片的ID卡，所以一般的ID卡我将以这款芯片来介绍。首先上谷歌找一下EM4100的data sheet。

![](http://cdn.lmark.cc/img/image-20230131154402445.png)

从Feature可以看到，普通的ID卡只有64bit的存储空间，存个ID之后就没什么空间了，所以ID卡，应用场景十分的有限。再来看看存储结构：

![](http://cdn.lmark.cc/img/image-20230131155700052.png)

可以看到，真正存储数据的只有40bit，其中8bit是用户标识/版本号，剩下32bit是数据位/卡号。校验位Px和PCx，对应行或列有偶数个1(不包括校验位)，则校验位为0。奇数个1，则校验位为1。将数据进行编码之后，就变成了64bit的数据（9bit起始位 + 54bit数据/校验位 + 1bit停止位），在上电后就以“曼切斯特编码方式”循环地发送。

上面EM4100的简单介绍，可以说和本文关系不大，大家看个乐就行。我是写给以后的我看的。其实，常见的ID卡芯片都是**EM4XX**的，所以网上一般都是将普通的ID卡默认为EM4XX系列的卡。问题不大。这种卡一般造价低廉，只能读不能写。常用于低成本门禁卡，小区门禁卡，停车场门禁卡等等。这种卡没什么安全性可言，可以用手持式的读卡器直接复制来着。



## ID白卡

一般指的是**EM4305或T5577**，这种卡顾名思义，可以用来克隆ID卡，出厂为**白卡**,内部的EEPROM（用户储存数据）可读可写，通过修改EEPROM的内容达到修改ID的目的。且T5577还很多功能，其内部有扇区，可以用来存储数据，个别扇区还可设置密码。最特别之处是，写入ID 号可以变身成为ID 卡，写入HID号可以变身HID 卡，写入Indala 卡号，可以变身Indala 卡。

至于为什么能用白卡来复制ID卡，详情可看这篇文章：[用EM4305/T5557模拟EM4100的ID卡,原理解释 - osnosn - 博客园 (cnblogs.com)](https://www.cnblogs.com/osnosn/p/10662647.html)****

### T5577简略介绍

这里简单介绍一下存储结构，先贴一下data sheet：[Atmel T5557 Datasheet (orangetags.com)](https://orangetags.com/rfid-chip-datasheet/atmel-datasheet/t55/atmel-t5557-datasheet/)。感兴趣可以仔细研究研究。

![](http://cdn.lmark.cc/img/image-20230131162607741.png)

介绍摘抄自：[T5557卡片说明 - viperchaos - 博客园 (cnblogs.com)](https://www.cnblogs.com/viperchaos/archive/2011/09/07/2170067.html)

>  T5557的卡结构有页0和页1，页1有两个块，页0有8个块，每个块有33位，第一位为锁定位，写入为1，该块后面的32位就无法修改了。
>
>  ​    页1的数据只能为读，包含卡号信息和制造商的一些信息，具体格式含义见T5557芯片资料。页0块0为配置字，决定了卡片跟阅读器通信时工作的频率，调制方式及卡片页0块号可见数目等。配置字很关键，同样的T5557卡片，有些阅读器能读，有些阅读器不能读的，这个阅读器内部单片机的具体程序设计相关，所以一旦设置好不要轻易修改。
>
>  ​    T5557的访问分两种方式：常规读写和保护读写。常规读写模式下，页0块7是普通的数据区，访问页1的块或页0的块都是不需要密码的；保护读写模式下，页0块7为密码的存放区，是不可见的，无法读取。访问页1的块或页0的块都是需要密码的。我们现在用的是华峰科技有限公司的低频阅读器，据文档说明，配置字为00 08 80 e8时为常规读写，配置字为00 08 82 f8时为保护读写。



### EM4305简略介绍

EM4305卡有32个密码读/写保护.32位唯一的ID代码和10位客户代码。

EM4305卡的EEPROM储存空间为512位，分为16个扇区，每个扇区32位，其中锁定位置可分为16个扇区，EEPROM数据块变成了只读模式。EM4469可提供各种低功耗的数据传输率和编码方法，其内部集成的谐振电容可掩膜选择，无需外部电容。此外，片内还有整流器和限压器，可在-40℃~85℃在温度下工作。

摘自：[EM4205 / EM4305 芯片卡 (baidu.com)](https://baijiahao.baidu.com/s?id=1741569464547237663&wfr=spider&for=pc)

EM4305和T5577的一些异同点：

![img](http://cdn.lmark.cc/img/4b0f4c3a34af4b048f699084edf551ed.png)



## HID卡

全称HID Prox Ⅱ，是一家叫HID Global的公司生产的，并不是很么高频ID卡的意思（一开始还搞错了）。这家公司比较的厉害，它生产的卡使用的芯片是自己定制的，而且HID还提供一套完整的解决方案：设备，卡片，协议等。芯片内部使用的协议比EM4100或T5577安全很多。 

HID卡外观：

![img](http://cdn.lmark.cc/img/3c5579c38955464e9cbb991db81e1cb6.png)

市面上有兼容HID卡的读卡器，但是有些信息是读不出来的，需要使用HID的专用读卡器。当然HID公司除了低频卡，旗下也有高频卡系列。

关于这家公司：

> 美国HID最早是作为体斯火箭公司的一个部门，为整个公司内部提供读卡器和卡，原来HID三字的全称为“Hughes Idert Jication”。1991年从体斯公司独立出来，在以后的几年中HID进入了连续快速的增长期。

## Indala卡

全称Indala Proximity，是HID公司的一个系列，相对HID卡，比较冷门，而且时间比较早，原来是原摩托罗拉卡（Motoroal卡）,简单介绍;

> 所有 HID Indala 125 kHz 感应卡均采用 FlexSecur技术，通过读卡器上的验证过程提供更高级别的门禁系统安全性。 作为 HID Indala 产品系列独有的功能，FlexSecur会在将卡数据发送到主机系统前筛选掉未授权卡。 可以提供适合每个应用的各种样式的 Indala 凭证卡。 Indala 凭证卡与所有 Indala 读卡器兼容，并且可以轻松地使用 Indala ProxSmith编程器和工具包进行编码。 此外，HID Indala 感应卡没有电池的无源设计允许无限次读取，并且保证没有材料和工艺上的缺陷。

摘自：[ Indala卡(it922.com)](http://www.it922.com/solutions/std4.htm)



## ID防火墙卡

用来攻克防火墙的特殊ID卡，大概有一下几种：

- F8268
- 5200
- 8265
- 8310
- 8678

这些卡是国产的，用来对付防火墙，关于ID卡防火墙，有一种做法是：在读入ID卡的数据之前，先向ID卡尝试写入数据，如果是正常的ID卡，只读不受影响，但如果是T5577这种，就会被修改卡号，达到防火墙拦截的目的。所以有了这些穿透防火墙的卡。

详见：[ID门禁卡的防火墙_good02xaut的博客-CSDN博客_id卡 防火墙](https://blog.csdn.net/good02xaut/article/details/121824821)



# IC卡介绍

这里的IC卡一般指高频卡（13.56MHz）放张图看下不同频段的一些特点

![](http://cdn.lmark.cc/img/image-20230131181434483.png)

至于为为什么是13.56MHz，我也没找到比较权威的说法，但是我们知道，频率越高，波长越小，所能携带的信息越多，这应该是一个折中的考虑，问题不大。在介绍IC卡种类之前，先来了解一下ISO14443标准：[ISO/IEC 14443 - 维基百科，自由的百科全书 (wikipedia.org)](https://zh.wikipedia.org/wiki/ISO/IEC_14443)

这项标准规定在工作频率是13.56MHz。其中，ISO14443标准分为了**typeA和typeB**两个有些许差异的标准。

前者市场普及率比较高（一般的IC卡就是typeA标准），后者则是有**传输能量不中断、速率更高、抗干扰能力强**的特点。

接下来主要讲ISO14443-typeA标准的IC卡。



## MIFARE Classic 1K卡

这个可以说是目前最常见IC卡了，他还有许多名字，比如：Mifare Standard，Mifare S50，Mifare S70，MF1，M1等等。这个卡UID出厂固定，可以修改储存的数据。

![](http://cdn.lmark.cc/img/image-20230131191318840.png)

属于Mifare系列的，关于Mifare：[MIFARE - 维基百科，自由的百科全书 (wikipedia.org)](https://zh.wikipedia.org/wiki/MIFARE)

![img](http://cdn.lmark.cc/img/Mifare_1k_transparent.jpg)

据说全球出货量达到了50亿！其中的Mifare S50和Mifare S70的区别在于容量，S50容量为1KB，而S70容量为4KB。关于M1卡，下一篇文章我会专门介绍它，这里我就简单介绍一下：

M1卡有16个扇区组成，每个扇区有4个数据快，每个数据块有16个字节（16x4x16=1024）

其中0扇区的第0块存着卡片以及厂商的信息。

![](http://cdn.lmark.cc/img/image-20230131192842658.png)

每个扇区有两个密钥，keyA和keyB，3区块中间的四位是存储控制位，决定的这个扇区的权限。但是在2008年，M1就被爆出有漏洞，使得该种卡能够被直接破解，这类卡被称为所谓的**漏洞卡**，当然，过了这么久，漏洞会被修复的。目前**无漏洞卡**已经到了第三代，单靠pm3可能还破解不了，还需要变色龙来嗅探。



### 非加密卡，半加密卡，全加密卡

很好理解，因为M1卡有16个扇区，每个扇区都有俩密钥

- 非加密卡就是所有的16个扇区都是默认密钥，或者弱口令。此类卡，pm3一般都能直接破解
- 半加密卡就是有一部分扇区不使用默认密钥，这类卡pm3大部分也能直接破解
- 全加密卡就是16个扇区都被加密了，此类卡往往破解难度很大，pm3也有可能解不出来

对付全加密卡，就需要变色龙的嗅探。什么？不知道变色龙？变色龙简单来说就是一个单片机，能模拟卡片的电气结构，通过写入加密卡的dump，变色龙直接拿去机器刷卡，可以嗅探出指定扇区的密钥。有了一个扇区的密钥之后，就可以破解出剩下扇区的密钥了。



## MIFARE UltraLight卡

也被称为M0卡、MF0卡，是一种高频低成本卡，同时容量小，但是比M1卡轻薄。

其容量只有512bit，也就是64B。被划分为了16个page，每个page包含4个字节，如下图所示：

![](http://cdn.lmark.cc/img/image-20230131195307035.png)

可以看到，M0卡的UID有7个字节长，普通的M1卡只有四个。而且M0卡没有加密，所以M0卡只能用在一些身份识别的地方，比如地铁票，园区票之类。以下是M0卡的详细介绍：

> ​	Page0和Page1以及Page2的第1个字节是卡片的7字节序列号及其校验字节，其中`BCC0=0x88⊕SN0⊕SN1⊕SN2，BCC1=SN3⊕SN4⊕SN5⊕SN6`，SN0是制造商代码，由于Mifare UltraLight是NXP公司出品，因而SN0固定为04H。Page2的第2个字节Internal作为内部数据保留。以上共10个字节出厂时固化在存储区内，用户无法更改。
>
> ​	Page3是一次性烧录(One Time Programmable,OTP)页,该页的内容在卡片出厂时全部被写为“0”，用户使用时只能把某一位的内容写为“1”，而永远也不能把“1”写为0，也就是说，新写入的4字节内容与卡内原来的内容进行异或，异或后的结果存储在卡片中。
>
> ​	Page4-Page15是可读写的用户数据区，出厂时其内容初始化为0，用户可以任意读写。
>
> ​	Page2的第3和第4个字节用于将存储区锁定为只读。如下图所示，L4-L15的某一位设置为1，则对应序号的Page内容锁定为只读，每一个Page都可以单独设置。Lotp用于锁定Page3为只读。“螳螂捕蝉，黄雀在后”，Lotp-L15可以锁定别人，这些位本身又被三个BL位锁定，BL15-10用于锁定L15-L10，BL9-4用于锁定L9-L4，BLotp用于锁定Lotp。所有的这16个锁定位也具有OTP特性，通俗的讲就是这些“锁”没有“钥匙”，一旦锁死就再也改不回来了，所以锁定时一定要小心。
>
> ![](http://cdn.lmark.cc/img/image-20230131195928590.png)
>
> ​	Mifare UltraLight的读写操作和 Mifare S50是完全兼容的，这里的“兼容”是指二者可以使用同一个读卡器硬件，同一套软件。当然若软硬件完全相同就不是两种卡了，二者的区别主要体现在软件操作上，包括以下4个方面：
>
> - 一是Mifare UltraLight的卡序列号有7个字节，而Mifare S50的卡序列号只有4个字节，因此在卡片防冲突选择阶段需要两层(Cascade，93H和95H)操作；
> - 二是Mifare UltraLight没有密码，不需要验证；
> - 三是Mifare UltraLight的Page相当于Mifare S50的BLOCK，因此Mifare UltraLight有16个BLOCK，且每个BLOCK只有4个字节，而Mifare S50有64个BLOCK,每个BLOCK有16个字节；
> - 四是Mifare UltraLight没有电子钱包功能。
>
> ​    基于以上四点，在Mifare S50的程序中在卡请求命令成功执行后，如果判断卡类型字节为Mifare UltraLight(0044H),则在之后的操作中增加第二层防冲突选择，卡选择成功后直接对卡片的0-15块进行读写操作，每次读写只关注前4个字节，不使用电子钱包功能，这样就可以两种卡片完全兼容了。
>
> ​    Mifare UltraLight适合一次性、不需要回收的低成本的电子票证、景区门票等场合的解决方案，据说推出Mifare UltraLight的本来目的是想与125KHz的ID卡竞争，并作为磁条卡的替代方案。从目前的情况看，Mifare UltraLight与ID卡的竞争情况并不乐观，而磁条卡的替代品也大多是ID卡。

摘自：[Mifare UltraLight-深圳市明华澳汉物联网技术有限公司 (mwahiot.com)](https://www.mwahiot.com/Service/MifareUltraLight.html)

我曾今还是见过一次M0卡的，当时一个美国的网友找到我，给我看了张卡，当时我哪里懂这么多，只知道M1卡，就让他去读，结果读出来是M0卡，直接给我整懵了，后面上淘宝查了一下，没找到能复制M0卡的，不知道能不能用变色龙模拟出来。买个二手变色龙回来试试。

![](http://cdn.lmark.cc/img/image-20230131202315380.png)

想进一步了解M0卡的可以移步data sheet：[NXP Mifare Ultralight Datasheet (orangetags.com)](https://orangetags.com/rfid-chip-datasheet/nxp-rfid-chip-datasheet/mifare/nxp-mifare-ultralight-datasheet/)

### 判断M0和M1及Mifare系列其他卡

可以通过SAK值判断，以下是常见的SAK值：

![](http://cdn.lmark.cc/img/image-20230201040441114.png)



## MIFARE Plus卡

MIFARE Plus卡有两种，分别是S和X。Plus是M1卡的升级，向下兼容M1卡，所以也被称为M1P卡或者MF1P，安全性对比M1卡有很大的提升，其特点有：

■ 2 kB或4 kB EEPROM
■ 固定存储器结构简单，兼容MIFARE Classic 1K和MIFARE Classic 4K
■ 存储器结构与MIFARE Classic 4K相同（区、块）
■ 可自由配置访问条件
■ PLUS S版本支持ISO/IEC 14443 A类UID（4字节UID、4字节NUID、7字节UID），可选支持随机ID；PLUS X版本支持ISO/IEC 14443-3 UID（4字节UID、4字节NUID、7字节UID），可选支持随机ID
■ 多扇区验证，多块读写
■ PLUS S版本具有AES-128用于实现身份验证和完整性；PLUS X版本具有AES-128用于实现身份验证、保密性和完整性
■ 写入AES密钥时具有防修改机制
■ 密钥能以MIFARE CRYPTO1密钥（每扇区2 × 48位）和AES密钥（每扇区2 × 128位）形式保存
■ 基本支持虚拟卡概念
■ 通信速度高达848 kb/s
■ 单次写操作次数：200000个周期（典型值）
■ 通用标准认证：EAL4+

![](http://cdn.lmark.cc/img/image-20230201041803766.png)

我手里的农行卡就是M2卡



## NTAG卡

NTAG是NXP公司的一种NFC卡，从名字就可以看出，这种卡是符合NFC规约的Tag，可以被所有的NFC设备读取。常见的产品有：

- NTAG203 (144 bytes memory)没有密码保护功能，用法 Mifare Ultralight基本一样

  以下是21X系列卡，有密码保护功能

- NTAG210 (48 bytes memory)

- NTAG212 (128 bytes memory)

- NTAG213 (144 bytes memory)市面上常用的卡

-  NTAG215 (504 bytes memory)

- NTAG216 (888 bytes memory)

NTAG卡用起来和MIFARE UltraLisght-C卡类似，UID都为7位，且非常薄，网上买的NTAG标签基本上都是非常薄同时还比较小的。NTAG215的卡片信息：

![](http://cdn.lmark.cc/img/image-20230202003837091.png)



NTAG213：

![](http://cdn.lmark.cc/img/image-20230202003906841.png)

市面上比较常见的产品可能是那个米家碰碰贴，不过太贵了，20块两个，不如去抢钱。这种卡贴可以拿来干很多有意思的事，比如碰一碰连WIFI和蓝牙，有时间写一下米家碰碰贴的用法。除了这个，switch的amiibo卡好像也是一种NTAG标签，网上有人拿NTAG215来复制的。



## UID卡

uid卡是国人发明的，全称Mifare UID Chinese magic card——中国魔术卡，国外称为GEN1。这个卡是针对S50的变种卡，用起来和M1 S50一模一样，但是0扇区可以随便修改，也就是说，卡号可以随便修改，厂商信息也可以随便更改，可以用来复制M1卡。但是缺点是，现在新的读卡系统，通过检测卡片对特殊指令的回应，可以检测出UID 卡，因此可以来拒绝UID 卡的访问，来达到屏蔽复制卡的功能。

在某宝上，UID卡还是很便宜的，一块多一张。通过**使用后门指令(magic指令)**来修改UID



## CUID卡

在国外称为GEN2，是UID卡的一种升级版，CUID卡可以重复修改0块，但是它和UID卡的区别是，UID卡是通过**指令**修改0块，CUID使用的是常规密码验证的方法写0块（写错了之后重写需要清卡），其他扇区和标准M1卡相同。缺点是，还是有可能会被检测出来，而且如果不小心写错了UID号的校验位导致无法读卡，没办法修复只能报废。

不响应后门指令(意味着不容易被反克隆系统发现)

![](http://cdn.lmark.cc/img/image-20230131230703675.png)

一张CUID卡展示，外观上看不出来和M1卡有什么区别。某宝上一张要好几块。



##  FUID卡

国外称GEN2，FUID卡是针对UID卡做的优化。新的读卡系统，通过检测卡片对特殊指令的回应，可以检测出UID卡，因此可以来拒绝UID卡的访问，来达到屏蔽复制卡的功能。**FUID可以修改0块，但只可以修改一次**，写错也没办法更改，也不能重复利用。修改后和M1卡完全一样，很难被屏蔽检测。

我没买过，也没用过，具体不知道是个什么情况



## UFUID卡

鉴于FUID卡写错的成本太高，又发展出了这种卡。 CFUID卡 0扇区固化前可随意修改（相当于UID卡），固化（锁卡）后就跟M1卡完全一样。



## KUID卡

没听说过，摘自淘宝：

> 新一代可擦写防屏蔽卡KUID，可重复使用替代普通防屏蔽卡。FUID，UFUID。
> 无需锁卡自动起防屏蔽作用，可重复擦写使用无废卡，不会像FUID或UFUID锁死后才起到防屏蔽作用，更不会因为锁卡而变成一次性卡，无法更改卡内数据成为废卡。
> 1、KUID防屏蔽卡专门对付物业升级的防复制卡和防复制读头，是物业升级后UID卡不能使用的 解决办法
> 2、KUID卡无论从功能上和价格格都比FUID和UFUID更方便，是制卡师傅的好帮手
> 1.可以重复擦写IC卡号和扇区，兼容UID卡和IC卡； 2.可重复擦写使用无废卡，不会像FUID或UFUID锁死后才起到防屏蔽作用（一体机只能写一次切记），更不会因为锁卡而变成一次性卡，无法更改卡内数据成为废卡； 3.KUID防屏蔽卡专门对付物业升级的防复卡和防复读头，是物业升级后UID卡刷卡无反应或者只能刷一次可以解决一部分这些问题，当然也不是完全能解决这个问题的，不过目前来看效果还是比较理想的有效率能达到90%； 4.本卡支持手机NFC功能写卡，请到各手机应用下载 mifare的工具。（手机功能有局限性，请大家酌情考虑手机测试建议购买白卡） 特别说明：由于需要兼容M1芯片的NFC手机直接改写0扇区内容，我们的UID卡的写卡方式不能用传统的ACR配套的软件，为此，我们特别开发的写卡程序。具体下载链接见以下描述。破解程序没有任何改变，只有写卡程序变了，注意：请下载我们的写卡软件链接ACR的读卡器来写入UID卡，否则无法写入。注意此KUID卡可反复擦写卡，可改写0扇区以及全部扇区数据的全开空卡可修改UID的mifare卡片，1k卡，S50卡，200张/盒、钥匙扣100个一袋 1、该卡片完全兼容mifare 1k卡片； 2、卡片的block0（UID所在的block）可以修改，重复修改； 3、block0直接用普通mifare读写器修改； 4、卡片的默认密码为12个F，即FFFFFFFFFFFF。 存储容量： 8Kbit，16个分区,每分区两组密码 工作频率： 13.56MHZ 通讯速度： 106Kboud 读写距离： 2.5—10CM 读写时间： 1-2MS 工作温度： -20-85 擦写次数： 100000次 数据保存： 10年

看起来像是CUID卡升级了，



## SUID卡

闻所未闻，摘自淘宝：

> 防屏蔽可重复擦写0扇区0块（无需擦写可直接覆盖新数据）

感觉又是一个CUID升级，，，但是什么叫做无需擦写可直接覆盖新数据呀？？？价格还是CUID的三倍。



## NUIC卡

离谱，全网只看到一架淘宝店在买，又是一个CUID卡升级版。。。



## GUID，GDMIC，GTU卡

滚动码复制卡，用于滚动码防复制电梯系统，GTU卡锁卡后数据不再改变，每次上电后都会恢复为锁卡前的数据，从而使滚动码电梯系统无法正常滚动卡内数据，实现破解滚动码系统的目的。GTU可解锁，解锁后可通过GTU专用指令进行数据修改。

GDMIC是可以自动复位数据的IC复制卡，用于滚动码防复制系统，支持反复擦写，功能同GTU卡，生产厂商不同



## CPU卡

这个玩意比较高级了，可以说是最高级的IC卡了，CPU卡结构就像一台微型电脑一样，储存量大，而且极难破解，同时CPU卡还支持数据上云，即卡本身不存数据，只起到ID的作用。CPU卡现在没有一个统一的标准，但是大概结构如下：

> 非接触cpu卡卡内集成电路中包括中央处理器（CPU）、只读存储器（ROM）、随机存取存储器(RAM)、电可擦除可编程只读存储器（EEPROM）以及片内操作系统COS等主要部分，犹如一台超小型电脑。具有信息量大、防伪安全性高、可脱机作业，可多功能开发等优点。[CPU卡](https://www.msrfid.com/product/list-Dual_interface_CPU_Card.html)采用强大而稳定的安全控制器，增强了卡片的安全性。非接触[CPU卡](https://www.msrfid.com/product/list-Dual_interface_CPU_Card.html)采用了无线传输的方式，通过射频方式获取能量和数据信号，能满足快速交易的要求（如公交的快速通过）。
>
> 
>
> [CPU卡](https://www.msrfid.com/product/list-Dual_interface_CPU_Card.html)采用了多种芯片级防攻击手段，基本上不可伪造;[CPU卡](https://www.msrfid.com/product/list-Dual_interface_CPU_Card.html)能够在内部进行加解密运算，它所特有的内外部认证机制以及以金融IC卡规范为代表的专用认证机制，能够完全保证交易的合法性；在认证和交易过程中，CPU密钥不会泄露到卡外部，每次都是通过加密的随机数来进行，而且因为有随机数的参加，确保每次传输的内容不同，保证了交易的安全性。在认证和交易过程中所使用的密钥都是在安全的发卡环境中产生并密文安装到SAM卡和用户卡中，整个过程密钥不外露。
>
> 
>
> ​    CPU卡的应用防火墙功能可以保障同一张卡中不同应用的安全独立性。对安全性要求较高的金融行业都以CPU卡作为下一代银行卡的标准。采用非接触式CPU卡可以杜绝伪造卡、伪造终端、伪造交易，最终保证了系统的安全性。
>
> 
>
> 优点
>
> 同时，非接触CPU卡的大容量存储空间又可以满足预期的大金额消费应用所要求的更多客户信息的存储。而这时安全就不仅仅是存储在卡内的电子货币的安全，还包括个人信息的安全，非接触式CPU卡的安全机制可以为此提供良好的保障。
>
> 
>
> **应用**
>
> 由于非接触式CPU卡具有以上无可比拟的优点，非常适用于电子钱包、电子存折、公路自动收费系统、公共汽车自动售票系统、社会保障系统、IC卡加油系统、安全门禁等等众多的应用领域。非接触CPU卡将逐步取代逻辑加密卡而成为IC卡的主要选型。在[M1卡](https://www.msrfid.com/product/Mifare_s50.html)被破解的形势下，采用非接触CPU卡取代[M1卡](https://www.msrfid.com/product/Mifare_s50.html)是解决[M1卡](https://www.msrfid.com/product/Mifare_s50.html)危机的最终解决方案。
>
> 
>
> **种类**
>
> 1、非接触式CPU[智能卡](https://www.msrfid.com/product/list-SmartCard.html)（8K/16K，DES/3DES算法）
>
> 非接触式CPU[智能卡](https://www.msrfid.com/product/list-SmartCard.html)（8K/16K，DES/3DES算法）的芯片采用CMOS EEPROM工艺制作的高端[智能卡](https://www.msrfid.com/product/list-SmartCard.html)产品，典型的应用如公共交通、电子钱包等。符合ISO/IEC14443 TYPE A标准的RF电路、32位随机数电路、DES/3DES算法模块、流加密处理器，卡上程序存储器为32K×8位EEPROM、512×8位RAM。
>
> 2、非接触式CPU[智能卡](https://www.msrfid.com/product/list-SmartCard.html)（国密SM1算法）
>
> 这款卡片是单界面非接触CPU芯片，产品支持ISO14443-A协议，CPU指令兼容通用8051指令，数据存储器为8K字节的EEPROM。该芯片符合银行的相关标准，COS同时支持PBOC2.0标准（电子钱包）及建设部IC卡应用规范，具有较好的安全性。

摘自：[非接触式CPU卡-智能卡,电子标签,java卡,rfid卡,非接触式IC卡,NFC卡-深圳市明申科技有限公司 (msrfid.com)](https://www.msrfid.com/product/39.html)

CPU卡能做到真正的**一钥一用**，从一开始的**多卡一钥**到后来的**一卡一钥**，再到后来的**一块一钥**，可以看出IC卡加密技术的进步呀。尽管如此，现在还有很多地方在使用M1卡，甚至还有很多地方在使用有漏洞的M1卡！！！这真是，像裸奔一样。如果对CPU卡或者M1卡安全性感兴趣的小伙伴，可以看看这篇文章：[CPU卡加密系统与M1加密系统比较-深圳市明华澳汉物联网技术有限公司 (mwahiot.com)](https://www.mwahiot.com/Service/CPU_Card_Encryption_and_M1_Encryption.html)

### 如何区分CPU卡和M1卡

CPU卡和M1卡在外观和大小上，可以说毫无差异。所以怎么区分就成了一个棘手的难题。以下是我总结的几个方法：

- 如果卡支持在线充值，且有挂失功能，大概率是CPU卡
- 使用Mifare classic tool工具读卡，其SAK的值位0x20的就是CPU卡
- 给卡后面的电话打过去，问客服这个卡的种类

### CPU卡门禁部分的复制

总所周知，CPU卡现在无法破解，但是可以通过复制其UID到手环或者白卡里面，使用部分门禁功能。

CPU卡的UID从ATS中获取，取ATS的后四位：

![](http://cdn.lmark.cc/img/image-20230201031549695.png)

然后可以把这个UID写进一个空白的dump文件里，也可以直接写入卡里，记得BCC校验，也就是第五位的值由UID的四位异或而来。亲测，我学校的校园卡，我把UID写进手环里，可以刷宿舍楼门禁、学校大门的闸机和图书馆炸鸡，但是图书馆签到刷不了。显然图书馆签到使用到了CPU卡的UID之外的部分。



## CPU模拟卡

我也不是很懂为什么会有CPU模拟卡这种东西，仔细想想，可能为了省钱把。关于CPU模拟卡的知识：[CPU模拟卡 - 为敢技术 - 博客园 (cnblogs.com)](https://www.cnblogs.com/strengthen/p/16083888.html)

> CPU模拟卡由CPU部分7K以及M1部分1K组成，常见的有复旦FM1208(7K+1K)其中7K为CPU部分容量大小，1K为M1卡容量大小，通过在PM3上点击读卡类型（指令hf 14a info）可进行查看，下图为冰人固件读取模拟卡的原始返回,在带有NFC功能的手机上，可以通过MCT软件进行读卡，其返回值件下图。
>
> ![img](http://cdn.lmark.cc/img/960222-20220331202307314-1690826322.png)

### 判断方法

可以直接使用MCT工具读卡，如果提示信息显示：

```MCT
SAK:28
ATQA:0004
TYPE:JCOP31 or JCOP41 v2.3.1
```

即为CPU模拟卡。我手上的中国银行的卡就是一张CPU模拟卡



## 双频卡

不是什么新东西，从名字就可以知道，是两种频率的线圈塞进一张卡里的产物，有**低频+高频**和**高频+超高频（902~928MHz）**。至于它有什么用，就是一张卡可以当ID卡用，也可以当IC卡用了哈哈哈。

毕竟ID卡的线圈这么小，可以塞进IC卡里也不奇怪。有下图那样式的：

![](http://cdn.lmark.cc/img/image-20230201035031634.png)



## 接触式和非接触式IC卡

IC卡又可以分为接触式IC卡和非接触式IC卡。

- **接触式IC卡**：该类卡是通过IC卡读写设备的触点与IC卡的触点接触后进行数据的读写；
- **非接触式IC卡**：又称射频卡、感应式IC卡，该类卡与卡设备无电路接触，而是通过非接触式的读写技术进行读写（例如RFID、NFC），其内嵌芯片除了CPU、逻辑单元、存储单元外，增加了射频收发电路。该类卡一般用在使用频繁、信息量相对较少、可靠性要求较高的场合。

两者比较好区分，直接看卡上有无金属触点即可。

![img](http://cdn.lmark.cc/img/38bbdc0d9a9c42258ab7bccdb83c6d20.png)



## ISO14443 typeB标准的IC卡

前面讲的这些都是使用了typeA标准的IC卡，接下来介绍一下typeB标准的卡，先来看看两种标准的异同。

跟ISO 14443 -Type A 标准 的不同主要在于**载波的调制深度及位的编码方式**。TYPE A采用**开关键控(On-Off keying)**的**Manchester编码**，TYPE B采用**NRZ-L**的**BPSK编码**。

TYPE B与TYPE A相比，具有**传输能量不中断、速率更高、抗干扰能力强**的优点。RFID的核心是防冲突技术，这也是和接触式IC卡的主要区别。ISO14443-3规定了TYPEA和TYPE B的防冲突机制。二者防冲突机制的原理不同，前者是**基于位冲突检测协议**，而TYPE B**通信系列命令序列完成防冲突。**



目前的二代身份证，社保卡，护照都是基于此标准，可见这个标准的安全性会比较好。



# 结语

晕了，终于写完了，史上最全的RFID卡信息汇总。这里面一半的卡我连见都没见过，也算是涨知识了，还记得一开始的原因只是有人把M1卡逐出了IC卡籍。一怒之下就写了一万多字，不愧是我，巨能水。

在写的过程中，我偶然间找到一篇12年前的帖子，在探讨破解M1卡的方法，里面有几层楼的贴很有意思：

![](http://cdn.lmark.cc/img/image-20230202005757978.png)

11年的时候M1卡就已经是很老的技术了，没想到到了23年，市面上还有这么多的M1卡。另一条：

![](http://cdn.lmark.cc/img/image-20230202010104383.png)

当时能够轻易修改UID的UID卡尚未出现，他们不会想到，12年后的现在，M1卡像一个筛子一样，能被随便复制。

比起M1卡，更令人唏嘘的还是NFC技术，众所周知NFC技术早在2G时代就已经被应用于手机上，NFC卡贴更是十几年前就已经出现。这种手机碰一碰就能交互，获取信息的功能，想想就很好用，但事实是，2023年的今天，NFC卡贴仍没有流行起来，原因很多，其中，我觉得很重要的一个原因就是二维码的出现。NFC卡贴能做到的事情，使用二维码扫一扫也能做到，而且手机厂商也不用额外做硬件支持（摄像头应该手机都有吧现在），而NFC功能即使是今天，仍然有很多手机不支持。

可能唯一NFC能打败二维码的场景就是地铁站了，每次我滴一下就进站了，同伴们还要打开app去扫码，想想就很爽嘻嘻。



最后吐槽一下，再找资料的过程中，百度出的很多资料要么讲的太细，要么什么都没讲，结果最后发现，淘宝的商品详情页或成了找资料的好地方。

![](http://cdn.lmark.cc/img/image-20230202012319261.png)

这上面列举的卡比我在网上找的都详细，害。然后去谷歌上找了很多data sheet和官网的资料，还看了不少维基的内容，只能说，百度能找到的东西太少了，优质知识有时候付费也找不到。最后我放一下所有参考资料把，大家感兴趣可以去看看。我这里终究还是有很多没讲到。



# 参考资料

[非接触式CPU卡-智能卡,电子标签,java卡,rfid卡,非接触式IC卡,NFC卡-深圳市明申科技有限公司 (msrfid.com)](https://www.msrfid.com/product/39.html)

[CPU卡加密系统与M1加密系统比较-深圳市明华澳汉物联网技术有限公司 (mwahiot.com)](https://www.mwahiot.com/Service/CPU_Card_Encryption_and_M1_Encryption.html)

[浅谈legic芯片和 mifare芯片特性之区别-深圳市明华澳汉物联网技术有限公司 (mwahiot.com)](https://www.mwahiot.com/news/The_Difference_between_legic_Chip_and_mifare_Chip_Characteristics.html)

[IC卡和RFID卡的区别（网上说的都不准确） (bbsmax.com)](https://www.bbsmax.com/A/kmzLm6KYJG/)

[Mifare UltraLight-深圳市明华澳汉物联网技术有限公司 (mwahiot.com)](https://www.mwahiot.com/Service/MifareUltraLight.html)

[IC卡、ID卡、CPU卡、RFID和NFC的区别 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/264996978)

[NFC手机模拟加密门禁卡_nfc加密卡_pingis58的博客-CSDN博客](https://blog.csdn.net/pingis58/article/details/125458697)

[网络安全攻防：RFID安全 - The_crossing - 博客园 (cnblogs.com)](https://www.cnblogs.com/liujunjun/p/14684711.html)

[用EM4305/T5557模拟EM4100的ID卡,原理解释 - osnosn - 博客园 (cnblogs.com)](https://www.cnblogs.com/osnosn/p/10662647.html)

[EM4205 / EM4305 芯片卡 (baidu.com)](https://baijiahao.baidu.com/s?id=1741569464547237663&wfr=spider&for=pc)

[HID卡，125K低频门禁卡的贵族_good02xaut的博客-CSDN博客_hid卡](https://blog.csdn.net/good02xaut/article/details/121853435)

[|Indala感应卡|Indala厚卡|Indala薄卡|Indala门禁卡|Indala门禁|| (it922.com)](http://www.it922.com/solutions/std4.htm)

[RFID卡片种类 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/480056610)

[RFID低频卡-125K门禁卡种类_good02xaut的博客-CSDN博客_tk4100和t5577的区别](https://blog.csdn.net/good02xaut/article/details/121796554)

[CPU模拟卡 - 为敢技术 - 博客园 (cnblogs.com)](https://www.cnblogs.com/strengthen/p/16083888.html)

[RFID基础概念梳理及攻击方法 - FreeBuf网络安全行业门户](https://www.freebuf.com/articles/network/223864.html)

[普及下卡片基础知识(知道的神仙们请略过)电梯卡延期，电梯卡修改楼层，计算效验，车卡门禁卡，复制电梯卡门禁卡车卡，PM3，ACR122U NFC PN532等设备教程，IC卡延期 - Powered by Discuz! (52tikong.com)](https://www.52tikong.com/forum.php?mod=viewthread&tid=10947&extra=page%3D7)