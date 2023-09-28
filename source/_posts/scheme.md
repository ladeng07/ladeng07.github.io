---
title: 基于NFC的Url Scheme奇妙用法
tags:
  - Scheme
  - NFC
cover: 'https://cdn.lmark.cc/img/300203_origin_20220531_200850.jpg'
top_img: 'https://cdn.lmark.cc/img/300201_origin_20220531_200839.jpg'
abbrlink: decf5cc8
date: 2023-07-26 18:30:44
---





## 前言

Url Scheme对于移动设备用户来说是十分方便的，可以在手机上快速打开应用，也可以实现应用间的互相调用；对于苹果用户，得益于快捷指令的强大，许多软件都支持各种各样的捷径来快速打开；而反观安卓这边，由于没有一个统一的要求，捷径这种东西在安卓上并不常见。一般都是软件内部自己在使用。但是安卓上的Url Scheme有许多有意思的东西，连苹果都做不到的一些功能，在这里记录一下。



## 准备工作

安卓没有类似苹果的捷径这样纯软件打开Url Scheme（貌似有，不过要root），所以需要一些NFC芯片来作为Trigger

这里用M1卡和NTAG21X都可以，能正常写入数据的就可以了，我推荐使用NTAG215轻薄款

![image-20230723232048236](http://cdn.lmark.cc/img/image-20230723232048236.png)

很薄，可以到贴到纸的后面或者其他什么地方都可以。

其次，手机需要安装一个写入NFC数据的软件

![image-20230723232309972](http://cdn.lmark.cc/img/image-20230723232309972.png)

最后，也是最重要的一点，准备一台有NFC功能的手机。



## 实际应用

以下是个人觉得比较有用的一些Url Scheme应用，欢迎大佬在评论区补充些



### 碰一碰连WIFI

这个功能是最常见的，严格意义上来说这不属于Url Scheme的内容，因为里面数据是这样式的

![image-20230726102613708](http://cdn.lmark.cc/img/image-20230726102613708.png)

这是用NFC Tools写入的数据，如果你是小米手机，使用米家app写入，就有些不一样

![image-20230726102852681](http://cdn.lmark.cc/img/image-20230726102852681.png)

当然这个也不是正宗的Url Scheme，是打开米家自己进行的操作而已。



### 碰一碰听歌（NFC音乐墙）

这个在各大视频平台有很高的播放量，而且同一个Url Scheme安卓和苹果都能使用，网上比较多的教程是用网易云音乐的，当然其他音乐软件也行，我这里演示一下网易云的

往卡里写入如下代码：

```hnx
orpheus://song/1365626644/?autoplay=1 
```

其中`orpheus`是网易云音乐的包名，冒号后面的就是Url Scheme的路径了，中间的数字是想听的歌的id，后面的autoplay=1是打开后自动播放的参数，可加可不加。

只要别人用有NFC的手机扫一扫，就能直接跳转到网易云的某一首歌的页面，如果在把歌曲的海报打印出来，那就可以实现现实与虚拟的交互了。

具体效果参考慢科技大佬的视频：https://b23.tv/xfyvsrQ

### 碰一碰打开取件码/蚂蚁森林

这个也是一个比较实用的功能，想象一下，每次去取快递，一只手拿着快递，一只手还要操作手机打开菜鸟，打开取件码，这是多麻烦的一件事，有了这个Url Scheme，我们可以写入手环里，需要的时候直接用手机碰一碰手环就能打开取件码了。

但是我找不到原贴了，因为是需要构造一定的参数，来打开淘宝取件码，所以比较复杂

还是来看看蚂蚁森林的Scheme吧，得益于支付宝的开放性，几乎每一个支付宝上的小程序都可以通过Scheme打开，以蚂蚁森林为例：

```hnx
alipays://platformapi/startapp?appId=60000002
```

其他的一些支付宝的Scheme如下：

```hnx
收款:
alipays://platformapi/startapp?appId=20000123
扫码：
alipays://platformapi/startapp?saId=10000007
余额宝:
alipays://platformapi/startapp?appId=20000032
转账:
alipays://platformapi/startapp?appId=20000221
租房：
alipays://platformapi/startapp?appId=60000125
城市服务：
alipays://platformapi/startapp?appId=20000178
手机充值：
alipays://platformapi/startapp?appId=10000003
快递查询：
alipays://platformapi/startapp?appId=20000754
我的快递-寄件平台：
alipays://platformapi/startapp?appId=60000146
我的二维码:
alipays://platformapi/startapp?appId=20000085
蚂蚁庄园:
alipays://platformapi/startapp?appId=66666674
蚂蚁森林：
alipays://platformapi/startapp?appId=60000002
我的公益：
alipays://platformapi/startapp?appId=66666867
运动：
alipays://platformapi/startapp?appId=20000869
蚂蚁借呗：
alipays://platformapi/startapp?appId=20000180
个人主页：
alipays://platformapi/startapp?appId=20000186
个人名片:
alipays://platformapi/startapp?appId=20000228
信用卡还款：
alipays://platformapi/startapp?appId=09999999
爱心捐赠：
alipays://platformapi/startapp?appId=10000009
彩票：
alipays://platformapi/startapp?appId=10000011
转账：
alipays://platformapi/startapp?appId=09999988
花呗：
alipays://platformapi/startapp?appId=20000199
生活缴费：
alipays://platformapi/startapp?appId=20000193
芝麻信用:
alipays://platformapi/startapp?appId=20000118
位置:
alipays://platformapi/startapp?appId=20000226
卡券:
alipays://platformapi/startapp?appId=20000227
饿了么外卖:
alipays://platformapi/startapp?appId=20000120
淘票票电影:
alipays://platformapi/startapp?appId=20000131
火车票:
alipays://platformapi/startapp?appId=20000143
汇率换算:
alipays://platformapi/startapp?appId=20000150
理财小工具：
alipays://platformapi/startapp?appId=20000161
羊城通充值：
alipays://platformapi/startapp?appId=20000162
收货地址:
alipays://platformapi/startapp?appId=20000714
隐私：
alipays://platformapi/startapp?appId=20000723
通用：
alipays://platformapi/startapp?appId=20000724
充值中心：
alipays://platformapi/startapp?appId=20000987
校园一卡通：
alipays://platformapi/startapp?appId=2013062600000474
淘宝：
alipays://platformapi/startapp?appId=2013082800000932
教育缴费：
alipays://platformapi/startapp?appId=2014021200003129
ofo小黄车：
alipays://platformapi/startapp?appId=2017041206668232
高德打车：
alipays://platformapi/startapp?appId=2018070960585195
蚂蚁宝卡：
alipays://platformapi/startapp?appId=60000057
地铁购票：
alipays://platformapi/startapp?appId=60000070
AA收款：
alipays://platformapi/startapp?appId=60000154
AA收款:
alipays://platformapi/startapp?appId=66666696
AA收款：
alipays://platformapi/startapp?appId=9000258
共享单车：
alipays://platformapi/startapp?appId=60000155
余利宝:
alipays://platformapi/startapp?appId=66666708
收钱码服务:
alipays://platformapi/startapp?appId=66666714
大麦演出票：
alipays://platformapi/startapp?appId=66666753
口碑签到：
alipays://platformapi/startapp?appId=66666776
信用生活：
alipays://platformapi/startapp?appId=66666786
支付宝月账单：
alipays://platformapi/startapp?appId=66666798
天猫购物：
alipays://platformapi/startapp?appId=66666820
绿色城市：
alipays://platformapi/startapp?appId=66666824
还贷管家：
alipays://platformapi/startapp?appId=66666819
股票:
alipays://platformapi/startapp?appId=20000134
淘票票：
alipays://platformapi/startapp?appId=68687093
淘票票H5票券：
alipays://platformapi/startapp?appId=68687095
淘票票H5购票：
alipays://platformapi/startapp?appId=68687096
收款：
alipays://platformapi/startapp?appId=20000674
余额宝：
alipays://platformapi/startapp?appId=60000126
余额宝:
alipays://platformapi/startapp?appId=77700124
话费卡转让：
alipays://platformapi/startapp?appId=10000033
关于：
alipays://platformapi/startapp?appId=10000110
天猫：
alipays://platformapi/startapp?appId=20000000
账单：
alipays://platformapi/startapp?appId=20000003
银行卡:
alipays://platformapi/startapp?appId=20000014
账户详情:
alipays://platformapi/startapp?appId=20000019
支付设置:
alipays://platformapi/startapp?appId=20000024
实名认证:
alipays://platformapi/startapp?appId=20000038
反馈:
alipays://platformapi/startapp?appId=20000049
上银汇款:
alipays://platformapi/startapp?appId=20000078
生活号:
alipays://platformapi/startapp?appId=20000101
出境:
alipays://platformapi/startapp?appId=20000107
安全设置:
alipays://platformapi/startapp?appId=20000113
亲情号:
alipays://platformapi/startapp?appId=20000132
火车票机票:
alipays://platformapi/startapp?appId=20000135
飞猪酒店:
alipays://platformapi/startapp?appId=20000139
娱乐宝:
alipays://platformapi/startapp?appId=20000142
海外交通卡:
alipays://platformapi/startapp?appId=20000152
游戏中心：
alipays://platformapi/startapp?appId=20000153
国际机票：
alipays://platformapi/startapp?appId=20000157
蚂蚁会员：
alipays://platformapi/startapp?appId=20000160
定期：
alipays://platformapi/startapp?appId=20000165
记账本：
alipays://platformapi/startapp?appId=20000168
手势：
alipays://platformapi/startapp?appId=20000184
H5公共资源：
alipays://platformapi/startapp?appId=20000196
H5运营活动资源包：
alipays://platformapi/startapp?appId=20000202
亲情圈:
alipays://platformapi/startapp?appId=20000205
黄金:
alipays://platformapi/startapp?appId=20000218
蚂蚁乐驾:
alipays://platformapi/startapp?appId=20000241
总资产:
alipays://platformapi/startapp?appId=20000243
收藏:
alipays://platformapi/startapp?appId=20000245
活动收款:
alipays://platformapi/startapp?appId=20000259
信用卡账单:
alipays://platformapi/startapp?appId=20000266
数字证书:
alipays://platformapi/startapp?appId=20000298
暗号:
alipays://platformapi/startapp?appId=20000307
支付宝账号:
alipays://platformapi/startapp?appId=20000308
1688好货源:
alipays://platformapi/startapp?appId=20000522
活动群:
alipays://platformapi/startapp?appId=20000672
我的客服:
alipays://platformapi/startapp?appId=20000691
淘宝会员名
alipays://platformapi/startapp?appId=20000710
蚂蚁微客：
alipays://platformapi/startapp?appId=20000735
在线理赔：
alipays://platformapi/startapp?appId=20000750
悄悄话：
alipays://platformapi/startapp?appId=20000752
滴滴出行：
alipays://platformapi/startapp?appId=20000778
小视频：
alipays://platformapi/startapp?appId=20000780
圈存机：
alipays://platformapi/startapp?appId=20000791
基金：
alipays://platformapi/startapp?appId=20000793
地铁票购票：
alipays://platformapi/startapp?appId=20000796
新的朋友：
alipays://platformapi/startapp?appId=20000820
云客服：
alipays://platformapi/startapp?appId=20000827
淘票票H5票券：
alipays://platformapi/startapp?appId=20000834
人脸识别：
alipays://platformapi/startapp?appId=20000841
大学生活：
alipays://platformapi/startapp?appId=20000859
国内机票逆向：
alipays://platformapi/startapp?appId=20000877
境外上网：
alipays://platformapi/startapp?appId=20000895
网商贷：
alipays://platformapi/startapp?appId=20000899
充值助手：
alipays://platformapi/startapp?appId=20000905
生活号：
alipays://platformapi/startapp?appId=20000909
网商银行：
alipays://platformapi/startapp?appId=20000913
社交H5：
alipays://platformapi/startapp?appId=20000917
车主服务：
alipays://platformapi/startapp?appId=20000919
发票管家：
alipays://platformapi/startapp?appId=20000920
汽车票：
alipays://platformapi/startapp?appId=20000922
口碑卡券：
alipays://platformapi/startapp?appId=20000923
蚂蚁保险：
alipays://platformapi/startapp?appId=20000936
支付结果页口碑推荐：
alipays://platformapi/startapp?appId=20000939
生活圈：
alipays://platformapi/startapp?appId=20000943
群聊：
alipays://platformapi/startapp?appId=20000951
有财教练：
alipays://platformapi/startapp?appId=20000971
口碑我的订单：
alipays://platformapi/startapp?appId=20000975
心愿储蓄-余额宝：
alipays://platformapi/startapp?appId=20000981
体育服务：
alipays://platformapi/startapp?appId=20000988
H5在线买单：
alipays://platformapi/startapp?appId=20000989
商家动态：
alipays://platformapi/startapp?appId=20000991
安全课堂：
alipays://platformapi/startapp?appId=20001010
照片：
alipays://platformapi/startapp?appId=20001021
拍摄：
alipays://platformapi/startapp?appId=20001022
财富交易组件：
alipays://platformapi/startapp?appId=20001045
大学充值缴费：
alipays://platformapi/startapp?appId=20001091
安全备忘：
alipays://platformapi/startapp?appId=20001116
一字千金：
alipays://platformapi/startapp?appId=20001121
送福卡：
alipays://platformapi/startapp?appId=20002018
小程序收藏：
alipays://platformapi/startapp?appId=2018072560844004
专属优惠频道：
alipays://platformapi/startapp?appId=60000006
国内机票React正向：
alipays://platformapi/startapp?appId=60000007
手艺人：
alipays://platformapi/startapp?appId=60000008
社交金融H5：
alipays://platformapi/startapp?appId=60000010
安全设备：
alipays://platformapi/startapp?appId=60000011
中小学：
alipays://platformapi/startapp?appId=60000012
口碑在线购买H5：
alipays://platformapi/startapp?appId=60000014
账单关联业务-h5：
alipays://platformapi/startapp?appId=60000016
基金组合：
alipays://platformapi/startapp?appId=60000018
蚂蚁保险：
alipays://platformapi/startapp?appId=60000023
商圈：
alipays://platformapi/startapp?appId=60000026
月度榜单：
alipays://platformapi/startapp?appId=60000029
电子证件：
alipays://platformapi/startapp?appId=60000032
in定制印品：
alipays://platformapi/startapp?appId=60000033
大牌抢购：
alipays://platformapi/startapp?appId=60000039
未来酒店：
alipays://platformapi/startapp?appId=60000040
支付成功页权益区：
alipays://platformapi/startapp?appId=60000044
社交聚合H5：
alipays://platformapi/startapp?appId=60000050
天天有料：
alipays://platformapi/startapp?appId=60000071
VIP预约服务：
alipays://platformapi/startapp?appId=60000076
优酷：
alipays://platformapi/startapp?appId=60000077
商家服务：
alipays://platformapi/startapp?appId=60000081
Mini 花呗：
alipays://platformapi/startapp?appId=60000091
电子公交卡：
alipays://platformapi/startapp?appId=60000098
奖励金：
alipays://platformapi/startapp?appId=60000103
银行卡：
alipays://platformapi/startapp?appId=60000105
定期+：
alipays://platformapi/startapp?appId=60000119
福员外：
alipays://platformapi/startapp?appId=60000120
投票：
alipays://platformapi/startapp?appId=60000121
淘票票H5购票：
alipays://platformapi/startapp?appId=60000130
质押资产：
alipays://platformapi/startapp?appId=60000132
外币兑换：
alipays://platformapi/startapp?appId=60000134
飞猪汽车票新版：
alipays://platformapi/startapp?appId=60000135
飞猪国内机票：
alipays://platformapi/startapp?appId=60000138
医疗健康：
alipays://platformapi/startapp?appId=60000141
财富运营承接中间页：
alipays://platformapi/startapp?appId=60000142
冻结金额：
alipays://platformapi/startapp?appId=60000145
h5券详情页面：
alipays://platformapi/startapp?appId=60000147
财富号：
alipays://platformapi/startapp?appId=60000148
我的口碑：
alipays://platformapi/startapp?appId=60000150
快消优惠：
alipays://platformapi/startapp?appId=60000151
支付签约中心:
alipays://platformapi/startapp?appId=60000157
借呗任务平台:
alipays://platformapi/startapp?appId=60000158
周周乐:
alipays://platformapi/startapp?appId=60000161
表情搜索:
alipays://platformapi/startapp?appId=60000163
小程序:
alipays://platformapi/startapp?appId=66666666
会员卡:
alipays://platformapi/startapp?appId=66666667
口碑资源加速二:
alipays://platformapi/startapp?appId=66666669
国际资源加速一:
alipays://platformapi/startapp?appId=66666670
新消息通知:
alipays://platformapi/startapp?appId=66666672
风险评测:
alipays://platformapi/startapp?appId=66666673
口碑生活圈问答:
alipays://platformapi/startapp?appId=66666675
账单详情:
alipays://platformapi/startapp?appId=66666676
亚博游戏:
alipays://platformapi/startapp?appId=66666677
AR:
alipays://platformapi/startapp?appId=66666678
新人气榜单:
alipays://platformapi/startapp?appId=66666679
福卡回忆:
alipays://platformapi/startapp?appId=66666682
集分宝:
alipays://platformapi/startapp?appId=66666683
信用借还:
alipays://platformapi/startapp?appId=66666684
网银大额充值:
alipays://platformapi/startapp?appId=66666685
泛行业频道:
alipays://platformapi/startapp?appId=66666686
jet离线加速一:
alipays://platformapi/startapp?appId=66666687
我的发票抬头:
alipays://platformapi/startapp?appId=66666688
附近人气榜:
alipays://platformapi/startapp?appId=66666689
店铺弹窗领券:
alipays://platformapi/startapp?appId=66666691
小程序资源包:
alipays://platformapi/startapp?appId=66666692
标签系统:
alipays://platformapi/startapp?appId=66666698
境外当面付店铺码:
alipays://platformapi/startapp?appId=66666699
实物黄金:
alipays://platformapi/startapp?appId=66666700
appraise:
alipays://platformapi/startapp?appId=66666702
打开支付宝:
alipays://platformapi/startapp?appId=66666706
mallcoupon:
alipays://platformapi/startapp?appId=66666707
商圈聚合页:
alipays://platformapi/startapp?appId=66666710
天猫资源加速:
alipays://platformapi/startapp?appId=66666711
芝麻信用:
alipays://platformapi/startapp?appId=66666713
信用卡还款H5:
alipays://platformapi/startapp?appId=66666715
小程序关于页面:
alipays://platformapi/startapp?appId=66666718
功能管理:
alipays://platformapi/startapp?appId=66666719
钱包股票-社区资讯:
alipays://platformapi/startapp?appId=66666721
钱包股票-行情和提醒:
alipays://platformapi/startapp?appId=66666722
统一授权管理:
alipays://platformapi/startapp?appId=66666724
区块链:
alipays://platformapi/startapp?appId=66666728
口碑红人:
alipays://platformapi/startapp?appId=66666729
花呗挖哦:
alipays://platformapi/startapp?appId=66666733
基金组合：
alipays://platformapi/startapp?appId=66666735
财富社区：
alipays://platformapi/startapp?appId=66666741
口碑平台弹层：
alipays://platformapi/startapp?appId=66666742
定时转账提醒：
alipays://platformapi/startapp?appId=66666743
店铺详情页报错：
alipays://platformapi/startapp?appId=66666749
保险号：
alipays://platformapi/startapp?appId=66666750
商圈券包：
alipays://platformapi/startapp?appId=66666754
我的健康：
alipays://platformapi/startapp?appId=66666755
国际支付成功页：
alipays://platformapi/startapp?appId=66666757
流量钱包
alipays://platformapi/startapp?appId=66666759
消费捐：
alipays://platformapi/startapp?appId=66666761
车金融：
alipays://platformapi/startapp?appId=66666762
阿里智能：
alipays://platformapi/startapp?appId=66666773
商家说：
alipays://platformapi/startapp?appId=66666774
境外收款：
alipays://platformapi/startapp?appId=66666777
懒人一键理财：
alipays://platformapi/startapp?appId=66666779
支付宝刷脸付：
alipays://platformapi/startapp?appId=66666781
蚂蚁庄园星星球：
alipays://platformapi/startapp?appId=66666782
爱攒油加油站：
alipays://platformapi/startapp?appId=66666783
亲情圈：
alipays://platformapi/startapp?appId=66666784
飞猪酒店：
alipays://platformapi/startapp?appId=66666787
火车票正向主流程：
alipays://platformapi/startapp?appId=66666788
商家经营分析：
alipays://platformapi/startapp?appId=66666791
人传人转账拉新
alipays://platformapi/startapp?appId=66666796
飞猪国际机票WEEX：
alipays://platformapi/startapp?appId=66666807
芝麻认证小程序：
alipays://platformapi/startapp?appId=66666808
财富通用工具：
alipays://platformapi/startapp?appId=66666810
小钱袋：
alipays://platformapi/startapp?appId=66666816
Tinyjs资源：
alipays://platformapi/startapp?appId=66666817
财富标签页：
alipays://platformapi/startapp?appId=66666825
泛行业会场：
alipays://platformapi/startapp?appId=66666827
小富婆：
alipays://platformapi/startapp?appId=66666829
一字千金：
alipays://platformapi/startapp?appId=66666831
招牌来了：
alipays://platformapi/startapp?appId=66666860
直播频道：
alipays://platformapi/startapp?appId=66666861
口碑快消频道页：
alipays://platformapi/startapp?appId=66666865
智能设备：
alipays://platformapi/startapp?appId=66666877
淘票票H5资讯：
alipays://platformapi/startapp?appId=66666881
口碑资源加速包一：
alipays://platformapi/startapp?appId=66666884
国际机票交易：
alipays://platformapi/startapp?appId=66666888
工资理财：
alipays://platformapi/startapp?appId=66666897
银行卡：
alipays://platformapi/startapp?appId=68686988
2018五福首页：
alipays://platformapi/startapp?appId=68687002
2018新春集五福：
alipays://platformapi/startapp?appId=68687028
信用租承接：
alipays://platformapi/startapp?appId=68687032
appxNativeIOS框架包：
alipays://platformapi/startapp?appId=68687035
蚂蚁星愿：
alipays://platformapi/startapp?appId=68687049
Apple 专区：
alipays://platformapi/startapp?appId=68687052
养老金：
alipays://platformapi/startapp?appId=68687131
人脸、指纹、声纹：
alipays://platformapi/startapp?appId=68687140
安全设置：
alipays://platformapi/startapp?appId=68687141
支付宝授权：
alipays://platformapi/startapp?appId=68687142
股票发现-支付宝：
alipays://platformapi/startapp?appId=68687145
小程序收藏：
alipays://platformapi/startapp?appId=68687164
信用受理台：
alipays://platformapi/startapp?appId=68687167
星巴克用星说：
alipays://platformapi/startapp?appId=77700096
小程序分享二维码：
alipays://platformapi/startapp?appId=77700109
```



### 碰一碰打开行程码/健康卡（已失效）

这个原理也是通过打开支付宝的健康卡来使用的，我为什么要单独拿出来说一下呢？是因为之前闹瘟疫的时候，淘宝上出现一种东西：一键打开健康码

![image-20230726111807556](http://cdn.lmark.cc/img/image-20230726111807556.png)

原理这么简单的一个操作，竟然能卖62块大洋，感觉老人的钱真好赚。岂可休，幸好现在瘟疫消失了，出门不用这些奇奇怪怪的码了。

### 碰一碰打开/加入QQ群

QQ一个比较好用的Scheme，适合拿来装B，碰一碰加入QQ群这个东西适合拿NTAG215然后贴在传单上，这样子就可以让别人碰一碰就加入群里，这不比扫码帅多了！Scheme如下：

```hnx
mqq://card/show_pslcard?card_type=group&uin=249923147
```

当然也可以加好友，只要把card_type参数去掉即可

```hnx
mqq://card/show_pslcard?uin=2952569401
```

具体使用效果可以参考我发在B站的视频：【碰一碰打开寄国-哔哩哔哩】 https://b23.tv/54TV5eY

![image-20230726123828182](http://cdn.lmark.cc/img/image-20230726123828182.png)

### 碰一碰加入网易云一起听（仅供演示，无任何实际价值）

之前偶然发现的，本来是挺浪漫的一个应用，随时随地，只要碰一碰就可以打开网易云一起听，使用如下Scheme：

```hnx
orpheus://nm/play/listenTogether?roomId=0d6e3c9c5a8231a8bd313d535cb1a229_1690362958&inviterId=412265742&listenTogetherRefer=third_party_invite
```

这个可以通过电脑浏览器调试找到

![image-20230726172431290](http://cdn.lmark.cc/img/image-20230726172431290.png)

效果是挺好的，但是有个致命问题，就是每次一起听的房间号是实时生成的，所以一个邀请链接只有30分钟的保质期，过了30分钟保质期就过期了，所以并不能做到远程两个人碰一碰就一起听的效果。

理想的效果参考B站视频：【(全网首发)碰一碰就能和对象一起听歌？这不比音乐墙厉害多了？-哔哩哔哩】 https://b23.tv/7VYbjHd

### 碰一碰打开B站视频/番剧（可以做番剧墙）

这个效果个人觉得还是不错的，适合拿来做番剧墙，或者碰一碰打开某个视频，方法也很简单，也是用电脑端的B站，然后抓包，比如，打开某部番：

```hnx
bilibili://bangumi/season/1172
```

再比如，打开某个视频：

```hnx
bilibili://video/385492200
```

B站还有很多Scheme可以用，有需要可以自己找，简易教程如下：

![image-20230726174410515](http://cdn.lmark.cc/img/image-20230726174410515.png)

### 碰一碰打开视频/音频（可以放相册里或者立体书）

这个功能挺美好的，但是要求视频和音频储存的地址比较持久化，不然以后就打不开了，同时，这个功能需要手机安装NFC Tasks这个独立的应用，写入效果如下：

![image-20230726182753984](http://cdn.lmark.cc/img/image-20230726182753984.png)



## 总结

要是能调试好路径以及知道参数，用起来还是很方便的，不过其实大部分功能都是华而不实，所以还需要好好甄别。