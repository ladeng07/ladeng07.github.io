---
title: 自制Amiibo全记录
tags:
  - Amiibo
  - NFC
cover: 'https://cdn.lmark.cc/img/300257_origin_20220531_202454.jpg'
top_img: 'https://cdn.lmark.cc/img/300258_origin_20220531_202457.jpg'
abbrlink: '646e4863'
date: 2023-04-27 02:59:59
---

## Amiibo卡写入



### 何为Amiibo

> **Amiibo**（官方正名：**amiibo**，[日文](https://zh.wikipedia.org/wiki/日语)：**アミーボ**，中文：**阿咪包**或**阿咪寶**），是由日本遊戲廠商[任天堂](https://zh.wikipedia.org/wiki/任天堂)自家所發行的[近場通訊](https://zh.wikipedia.org/wiki/近場通訊)產品，與之前其他遊戲廠商所發行的《[寶貝龍冒險](https://zh.wikipedia.org/wiki/小龙斯派罗Skylanders)》系列、《[迪士尼 無限](https://zh.wikipedia.org/w/index.php?title=迪士尼_无限&action=edit&redlink=1)》系列以及《[Telepods](https://zh.wikipedia.org/w/index.php?title=Telepods&action=edit&redlink=1)》等系列擁有近場通訊功能的玩偶有所差異[[1\]](https://zh.wikipedia.org/zh-hk/Amiibo#cite_note-future_of_amiibo,_at_polygon-1)[[2\]](https://zh.wikipedia.org/zh-hk/Amiibo#cite_note-Nintendo_75th_fiscal-2)，主要用在[Wii U](https://zh.wikipedia.org/wiki/Wii_U)平板控制器、[新任天堂3DS](https://zh.wikipedia.org/wiki/新任天堂3DS)[[3\]](https://zh.wikipedia.org/zh-hk/Amiibo#cite_note-wiredcom-new3ds-3)、[新任天堂2DS XL/LL](https://zh.wikipedia.org/wiki/新任天堂2DS_XL/LL)、[任天堂3DS](https://zh.wikipedia.org/wiki/任天堂3DS)（需要額外Amiibo接收平台提供支援）和[任天堂Switch](https://zh.wikipedia.org/wiki/任天堂Switch)上，這些Amiibo可以在一些特定的遊戲上傳送或接收所儲存的遊戲數據。
>
> Amiibo首次在2014年E3展上對外發表，並公佈第一波Amiibo，早期發售的Amiibo大多數為《[任天堂明星大亂鬥3DS/Wii U](https://zh.wikipedia.org/wiki/任天堂明星大亂鬥3DS/Wii_U)》登場的角色，後續也陸續發行了《[超級瑪利歐](https://zh.wikipedia.org/wiki/超級瑪利歐)系列》等的Amiibo。[[4\]](https://zh.wikipedia.org/zh-hk/Amiibo#cite_note-Nintendo_Confirms_Amiibo_Cards_Will_Be_Launched_Later_This_Year-4)
>
> ——[Amiibo - 維基百科，自由的百科全書 (wikipedia.org)](https://zh.wikipedia.org/zh-hk/Amiibo)



简单来说，Amiibo是任天堂官方出品的，具有NFC通信功能的塑胶人偶，国行版加个大概在99元，以正品手办来说，这个价格还可以接受。其质量来说也属于上乘了。

![](https://cdn.lmark.cc/img/image-20230423111216383.png)

但是Amiibo和普通手办最大的不同之处在于，其底座里有一块NFC芯片，可以与NS右侧手柄的摇杆进行交互，从而实现游戏与现实的互动。

![](https://cdn.lmark.cc/img/image-20230423111510029.png)



### Amiibo有什么用

以《**薩爾達傳說 曠野之息**》为例，其在游戏中能够使用的的Amiibo有25个，而且随着数据更新，应该会不断增加，而且最近《**薩爾達傳說 王国之心**》也准备出了，之前旷野之息能使用的Amiibo在王国之心里应该也是能使用的。下图是旷野之息能使用的amiibo一览

![](https://cdn.lmark.cc/img/image-20230423112444499.png)

在旷野之息中，使用Amiibo可以获得一定的奖励，比如限定武器，装备，坐骑，宠物狼，材料等等。不同的奖励概率不一样，但是每个Amiibo每天只能用一次。由于Amiibo能刷限定装备，加之价格较贵，所以就有人动起了歪心思。因为普通的非CPU卡，大多具有可复制性，所以可以把amiibo玩偶的数据拷贝出来，然后复制到别的ic卡中去，这就是所谓的amiibo卡。



### 怎么制作amiibo卡呢

>**注意：NTag215写入amiibo数据之后将无法擦除！！！**

具体Amiibo是用的NFC芯片属于哪个型号我因为没有测过所以不知道，但是可以用**NTag215**来写入复制的内容，至于NTag215，可以移步我之前写过的文章：[RFID第一期——各种IC卡和ID卡详解 | LMark的博客](https://lmark.cc/archives/f746fa7f.html#NTAG卡)淘宝上一张NTag215还是非常便宜的，一两块。有了卡之后，就需要可以写入的数据，这里推荐使用**TagMo**

![](https://cdn.lmark.cc/img/image-20230423170006634.png)

这是安卓上一个写amiibo数据的软件，这个软件使用之前需要导入**两个密钥文件**。

![](https://cdn.lmark.cc/img/image-20230423171002400.png)

然后就可以写入amiibo'数据了。

在首页的`LOAD TAG`中选择存放amiibo数据（格式为.bin）的文件夹，然后选中需要的文件，回到主页，点击`WRITE TAG`即可写入数据

![](https://cdn.lmark.cc/img/image-20230427013719311.png)



#### amiibo数据来源

amiibo数据可以去百度，知乎有篇文章整理了很详细的amiibo数据：[自制Amiibo卡片 持续更新各游戏Amiibo数据包 (zhihu.com)](https://www.zhihu.com/tardis/zm/art/452791250?source_id=1005)

github上有个仓库也在不停更新着最新的amiibo数据：[GrewdonGaming21/AmiiboGhost: A repository gathering amiibo in .bin (github.com)](https://github.com/GrewdonGaming21/AmiiboGhost)

或者我自己也将这两个数据渠道做了整合：[amiibo数据](http://pan.lmark.cc/d/%E9%98%BF%E9%87%8C%E4%BA%91%E7%9B%98/%E6%96%87%E4%BB%B6%E5%88%86%E4%BA%AB/amiibo%E6%95%B0%E6%8D%AE.zip)



#### 更简单的方法？

这个TagMo软件原版作者已经停止维护了，现在有新开发者在维护，新版本的TagMo直接将密钥集成到了软件里，而且还可以直接在软件里搜索amiibo数据，非常方便。它的数据库同时也是实时更新的。

![](https://cdn.lmark.cc/img/image-20230427014010500.png)

项目官网：[TagMo: README](https://tagmo.gitlab.io/)

下载地址：

- 可以从APKPure上直接搜索，
- 或者在官方github上[Releases · HiddenRamblings/TagMo (github.com)](https://github.com/HiddenRamblings/TagMo/releases)
- 实在不行我也存了一份[TagMo](http://pan.lmark.cc/d/%E9%98%BF%E9%87%8C%E4%BA%91%E7%9B%98/%E6%96%87%E4%BB%B6%E5%88%86%E4%BA%AB/TagMo-17c412f-github-release-signed.apk)

作者用爱发电的项目，大家有能力可以多支持支持





### 制作体验

我最开始想做的初衷是因为，我玩的NS是我的同学的，感觉老是借人家的玩怪不好意思的，所以打算整一套送她，正巧王国之心准备发售了，到时候就可以拿来刷了。

我制作的方案是参考淘宝上有售卖的那种——亚克力壳+NTag215

![](https://cdn.lmark.cc/img/image-20230427015056574.png)

在淘宝找到一家卖卡和壳的，价格还很实惠六毛钱一个，我一口气买了20个

![](https://cdn.lmark.cc/img/image-20230427015516774.png)

然后就是图案，我是直接用铜版纸打印，两块钱。当然觉得麻烦可以在这里买，不过这里好像缺货了哈哈哈，打印的精度来说还是很不错的

直接来看成品吧：

![](https://cdn.lmark.cc/img/image-20230427015949386.png)



花销总计：18.04+2=20.04 （24个amiibo）不到一块钱一个，稍微比淘宝一块多一个便宜一点。





### 使用测试

这里拿塞尔达测试一下：

 ![](https://cdn.lmark.cc/img/image-20230427025625320.png)

![](https://cdn.lmark.cc/img/image-20230427025738627.png)

可以看到，是可以刷出来的，而且单机游戏刷东西也不用担心被ban啥的。

最后附上无限刷amiibo方法：

- 在刷之前先存档，不满意再读档重刷
