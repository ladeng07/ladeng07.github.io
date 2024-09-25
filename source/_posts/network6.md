---
title: 宿舍网络拓扑介绍（附部分教程）
abbrlink: df0f0134
cover: https://cdn.lmark.cc/img/300264_origin_20220531_202747.jpg
top_img: https://cdn.lmark.cc/img/300263_origin_20220531_202741.jpg
date: 2023-09-28 17:29:56
tags:
---

## 前言

曾经折腾了个K2P的路由器，感觉性能还是差点意思，于是暑假就入手了台J4125小主机，准备好好折腾一下宿舍网络，装一些实用的功能来方便我学习生活。

现在差不多折腾好了，遂写一篇文章记录一下，我的近乎完美的宿舍网络设计。



## 设计理念



> 性价比+实用+好玩

三个点没有绝对的优先级，主打一个**主观好玩且买得起**

但是现实是**实用的东西比较多**



网络结构总结起来是**“1+1+1”结构**，即一个**硬路由+群晖+小爱**

拓扑图如下：

![](https://cdn.lmark.cc/img/image-20230927003842642.png)

本文主要围绕这张图展开介绍



## 实现功能

这里我先简单介绍几个最实用的功能和实现的基本部件思路：

- 校园内网远程桌面（硬路由端口转发）
- 校园网多拨（OP的多拨功能）
- 多设备存储/备份（NAS+微力存储自动同步）
- 自建DNS+去广告（Docker+adguardHome）
- 全局爬墙（PassWall 2+旁路由）
- 公网访问内网网盘/图床/RSS阅读器 （CF打洞）
- 远程or语音操控开关空调/台灯/电脑（小爱音箱+终端设备）
- 墨水屏实时监控宿舍电量（驱动板自动连接WIFI爬取数据）
- 安全的内网穿透访问（zerotier+自建Moon）
- ......



还有很多就不一一列举了，接下来就详细介绍一下各个功能的一些细节，以及使用心得。



## 校园网内网远程桌面

这是我最常使用的功能，实现起来也非常简单。需要升级到企业版Windows，并且开放相应的端口到校园网上就行。

![](https://cdn.lmark.cc/img/image-20230927104935677.png)

但是这样有几个小问题，首先就是校园网IP可能会经常变化，其次校园网账号只有三个设备，很容易被挤掉。

所以这时候可以在宿舍装一个路由器，这样可以稍微固定校园网IP，同时，使用端口转发可以方便的通过路由器IP访问远程桌面。另外使用openwrt固件的DDNS功能还可以动态绑定域名和IP，这样就不用记路由器IP了

![](https://cdn.lmark.cc/img/image-20230927105803080.png)





## 校园网多拨

校园网多拨是个好东西，因为🐏带校园网IPV4下行只有40M带宽，对于我们看4k油管，下载游戏来说也太慢了。这时候可以使用多拨。

原理也很简单，虚拟几张网卡，然后拨号，就可以了。OP固件提供了多拨功能，直接配置使用就好。

使用之后效果如下：

![](https://cdn.lmark.cc/img/image-20230927112156805.png)

拨一个账号有40M带宽，拨六个账号就有240M带宽了。不过现在我已经不用多拨了，因为多拨时，IPV6地址支持不好，访问不了IPV6的地址。其实使用IPV6就有比较好的速度

![](https://cdn.lmark.cc/img/image-20230927113023354.png)

使用clash走IPV6代理就可以加速steam下载了





## 多设备存储/备份

因为我有台式机，笔记本，Ipad，Linux主机，但是主要工作区是在台式机上，所以在别的设备上想要访问台式机文件就比较麻烦（比如交作业，查文件等）。之前的解决方案是使用坚果云，很好用，但是内存太小了，就算是专业版也只有40G内存，现在我已经使用了17个G了，而且还没备份旅游照片等大储存的东西。

![](https://cdn.lmark.cc/img/image-20230927113705198.png)

所以，依托于NAS，可以使用同步软件——**微力同步**来同步文件到NAS上：

![](https://cdn.lmark.cc/img/image-20230927114113952.png)

然后在把NAS的共享文件挂载到Alist上，这样就可以外网访问文件了。

![](https://cdn.lmark.cc/img/image-20230927114611021.png)







## 自建DNS+去广告

自建DNS其实对一般人来说没什么用，但是学校的DNS服务器老是抽风，经常打不开很多网站，而且还污染好多网站了，所以就考虑自己搭建一个。还能防止DNS泄露（也许？）

依托于adguardHome来搭建：

![](https://cdn.lmark.cc/img/image-20230927115539945.png)

需要手动配置上游DNS服务器，这里用的是阿里和CF的DoH。列表如下：

```Text
https://dns.alidns.com/dns-query
https://doh.pub/dns-query
https://223.6.6.6/dns-query
https://1.0.0.1/dns-query
https://dns10.quad9.net/dns-query
```

然后策略使用的是“最快的IP地址”

![](https://cdn.lmark.cc/img/image-20230927115911891.png)

BoostTrap服务器就根据自己的位置，选择离你最近的服务器就好，可以从这里面找[全国DNS服务器IP地址大全 公共DNS大全 dns地址大全 dns大全 (dnsdaquan.com)](https://dnsdaquan.com/)

另外在DNS缓存设置，可以设置大一点的缓存，毕竟很多域名IP不会经常变动。

![](https://cdn.lmark.cc/img/image-20230927120433551.png)

同时使用“乐观缓存”来增加命中率

配置完之后就可以使用了，配置旁路由的DNS转发到adguardHome

![](https://cdn.lmark.cc/img/image-20230927120616768.png)

去广告功能就是adguardHome的主要功能了，可以使用官方提供的的规则，或者使用自己的规则，这里提供两个我个人用的规则列表：

https://anti-ad.net/adguard.txt

https://raw.githubusercontent.com/o0HalfLife0o/list/master/ad-pc.txt

![](https://cdn.lmark.cc/img/image-20230927134409045.png)





## 全局爬墙

这个东西懂得都懂，这是旁路由的一个比较重要的功能了，首先需要一个机场，这里我就不提供了，大家自己找找，我以前用的机场是4块钱一个月，两台设备，速度还行。后面换了个IPV6的机场，速度也是杠杠的。

我用的插件是PassWall 2，当然也可以使用openclash或者酸酸乳

![](https://cdn.lmark.cc/img/image-20230927141419693.png)

依托于旁路由的强大性能，可以将国内外流量进行规则分流，这样比较体验会比较舒服些。

全局翻墙看油管4K是绰绰有余的，很适合给宿舍所有人用。





## 公网访问内网网盘/图床/RSS阅读器

之前使用云服务器时搭建了许多好玩和实用的服务，但是随着云服务器到期，很多服务都必须得迁移了。所以很多服务迁移到了群晖的docker里。但是内网服务外网一般访问不了，所以这时候可以实用cloudflare的Tunnel来打洞到公网。访问速度还挺快。

![](https://cdn.lmark.cc/img/image-20230927144203157.png)

CF的Tunnel需要的东西：

- 一个CF的账号
- 一个停靠在CF的域名
- 运行docker的环境

具体教程上网搜索就有很多了，这里就不讲了，列举一些我用的有意思的服务：



### 导航页

![](https://cdn.lmark.cc/img/image-20230927144326333.png)

一个轻量化的书签导航页，实用

github：[soulteary/docker-flare: Flare ✨ Lightweight, high performance and fast self-hosted navigation pages, resource utilization rate is <1% CPU, MEM <30 M, Docker Image < 10M (github.com)](https://github.com/soulteary/docker-flare)



### Alist网盘

一个把多个网盘整合起来的服务，支持多个网盘，也支持NAS挂载

![](https://cdn.lmark.cc/img/image-20230928162252580.png)

链接：[Home | AList Docs (nn.ci)](https://alist.nn.ci/)





### 蚁阅：RSS阅读器

一个非常简洁的web端RSS阅读器，支持自己搭建，官网也提供付费服务：

![](https://cdn.lmark.cc/img/image-20230928164939160.png)

RSS阅读在如今信息爆炸的时代是很有用的，就是支持的网站有点少，建议搭配RSSHUB食用。

顺便推荐一些我用的RSS源：

```markdown
1. [🆕 科技新闻投稿📮TestFlight - Telegram Channel](https://rsshub.rssforever.com/telegram/channel/TestFlightCN)
2. [ahhhhfs｜A姐分享 - Telegram Channel](https://rsshub.rssforever.com/telegram/channel/abskoop)
3. [开源社区 - Telegram Channel](https://rsshub.rssforever.com/telegram/channel/opencfdchannel)
4. [江南一点雨](http://www.javaboy.org/atom.xml)
5. [云风的 BLOG](https://blog.codingnow.com/atom.xml)
6. [HCLonely Blog](https://blog.hclonely.com/atom.xml)
7. [ike's Blog](https://blog.ikeno.top/rss.xml)
8. [Miigon's blog](https://blog.miigon.net/feed.xml)
9. [王登科-DK博客](https://greatdk.com/feed)
10. [夏海比比](https://huiweishijie.com/feed.xml)
11. [Lei Zhang - lovchun.com](https://lovchun.com/feed.xml)
12. [熊猫不是猫QAQ](https://panda995.xyz/feed/)
13. [土木坛子](https://tumutanzi.com/feed)
14. [零度解說](https://www.freedidi.com/feed)
15. [四火的唠叨](https://www.raychase.net/feed)
16. [张鑫旭-鑫空间-鑫生活](https://www.zhangxinxu.com/wordpress/feed/)
17. [zyylee的博客](https://www.zyylee.com/feeds/)
18. [子舒的博客](https://zburu.com/index.xml)
19. [V2EX-最热主题](https://rsshub.rssforever.com/v2ex/topics/hot)
20. [少数派](https://sspai.com/feed)
21. [BIE 别的](https://www.biede.com/feed/)
22. [老高與小茉 Mr & Mrs Gao - YouTube](https://rsshub.rssforever.com/youtube/channel/UCMUnInmOkrWN4gof9KlhNmQ)
23. [游研社-趣闻](https://rss.shab.fun/yystv/category/news)
24. [Epic Games Store - Free Games](https://rsshub.rssforever.com/epicgames/freegames/zh_CN)
25. [酷 壳 – CoolShell](https://coolshell.cn/feed)
26. [异次元软件世界](https://feed.iplaysoft.com/)
27. [小众软件](https://feeds.appinn.com/appinns/)
28. [HelloGitHub 月刊](https://hellogithub.com/rss)
29. [Linux 中国◆开源社区](https://linux.cn/rss.xml)
30. [w2solo - 独立开发者社区](https://w2solo.com/topics/feed)
31. [阮一峰的网络日志](https://www.ruanyifeng.com/blog/atom.xml)
32. [奇客Solidot–传递最新科技情报](https://www.solidot.org/index.rss)
33. [月光博客](https://www.williamlong.info/rss.xml)
34. [Monday Note - Medium](https://mondaynote.com/feed)
```

链接：[anyant/rssant: 蚁阅 - 让 RSS 更好用，轻松订阅你喜欢的博客和资讯 (github.com)](https://github.com/anyant/rssant)





### speedtest测速

一个测速的小服务，还是在内网使用比较方便，打洞到外网的话速度就限制在CF的Tunnels上了，没什么参考价值。但是内网测速结构还是很快的。能跑到433M（理论小主机网卡的最高速度）
![](https://cdn.lmark.cc/img/image-20230928170913657.png)

（远程桌面占用部分上行带宽和CPU导致数据偏低）

链接：[librespeed/speedtest: Self-hosted Speed Test for HTML5 and more. Easy setup, examples, configurable, mobile friendly. Supports PHP, Node, Multiple servers, and more (github.com)](https://github.com/librespeed/speedtest)



### Memos网页共享备忘录

如何实现备忘录多端同步，最简单的方法就是使用web服务，这款Memos就是非常的轻量级，UI界面风格也很舒服。

![](https://cdn.lmark.cc/img/image-20230928171241281.png)

特别是支持API接口服务，可以用在很多自动化脚本，或者一些自己的程序中来存备忘录

链接：[usememos/memos: A privacy-first, lightweight note-taking service. Easily capture and share your great thoughts (github.com)](https://github.com/usememos/memos)





### 文件快递柜

![](https://cdn.lmark.cc/img/image-20230928172129139.png)

一个轻量级免登录的文件中转站，适合自己的一些中转文件需求。界面很有意思，创意很不错

链接：[vastsa/FileCodeBox: 文件快递柜-匿名口令分享文本，文件，像拿快递一样取文件（File Express Cabinet - Anonymous Passcode Sharing Text, Files, Like Taking Express Delivery for Files） (github.com)](https://github.com/vastsa/FileCodeBox)





### 图床

自建图床，速度取决于CF的Tunnel，但是用还是可以用的，可以给别人注册账号使用

![](https://cdn.lmark.cc/img/image-20230928172441280.png)

链接：[lsky-org/lsky-pro: ☁️兰空图床(Lsky Pro) - Your photo album on the cloud. (github.com)](https://github.com/lsky-org/lsky-pro)





## 远程or语音操控开关空调/台灯/电脑

智能家居作为我宿舍网络另一个重要的部分，对于幸福度的提升有很大的帮助；可以说，适度正确地使用智能家居，享受科技的力量。智能家居中最重要的部分就是一个中枢网关，这里我是用便宜的小爱音箱Play来作为中枢网关。和小爱音箱比起来，play主打一个便宜。在宿舍一般就喊小爱同学开个空调开个灯啥的，特别方便。

有了中枢网关，接下来就是一些智能家居了，在宿舍这个场景，其实没有很多实用的小玩意，很多部件都是表面实用，实际上非常地冗余且没必要，这里我推荐几个我用的比较多的部件：



### 米家温度收集器

![](https://cdn.lmark.cc/img/image-20230928174134591.png)

米家墨水屏功能很简单，就是显示温度和湿度，而且还有个可爱的小表情（），可以实时监控宿舍的温度，让我们知冷暖，懂穿衣（bushi），而且还能搭配一些别的智能场景来使用（比如一定温度就开关空调啥的）

最大的缺点就是小贵，这块墨水屏太贵了。



### 开机卡

如果电脑能插网线的话，使用路由器的WOL唤醒其实就足够了，但是我的台式机不能插网线（位置不允许），所以就搞了块能接入米家的开机卡，这样直接用手机就能操控，再搭配上碰碰贴，可以实现手机碰一碰开机。关于碰碰贴使用可以见我以前的文章：[基于NFC的Url Scheme奇妙用法 | LMark的博客](https://lmark.cc/archives/decf5cc8.html)

![](https://cdn.lmark.cc/img/image-20230928175330636.png)





### 米家屏幕灯

很出圈的屏幕灯，性价比比较高，特别是蓝牙旋钮还很帅，有需求可以入一个。貌似支持接入米家？





### 米家云台摄像头

这个东西我一直想买一个放宿舍来着，但是就是太贵了，而且实用性不强。如果有实时监控宿舍，或者想看看舍友在干嘛，可以考虑放一个在宿舍，配合宿舍NAS来使用，简直美滋滋。





## 墨水屏实时监控宿舍电量

这就是一个好玩的东西了，纯原创（指卓衡giegie鼎力支持） 

之前经常在12点的时候，空调断电，插座断电。一看才发现是宿舍电费用完了，然后到时间就给我们断电了。一开始的解决方法是跑一个脚本，每隔一会监测一下宿舍电量，如果低于阈值，就发邮件给每个舍友，提醒他们交电费。但是这种方法太不优雅了，然后突然看到米家温度计，有了灵感：为什么我不能做一个驱动板带一个墨水屏，并通过宿舍wifi爬取宿舍实时的电量呢？于是就找上了卓衡giegie来帮忙整了一个，最后成品效果很不错。

![](https://cdn.lmark.cc/img/image-20230928180941348.png)

每隔十分钟刷新一次数据，通过wifi自动查询宿舍电量。







## 安全的内网穿透访问

宿舍内网开了这么多服务，那么多管理界面（主路由、旁路由、esxi等等）这些界面有外网访问的需求，但又不方便直接暴露在外网，所以需要一些安全的内网访问手段；并且设备很多，不同的设备又有不同的子网。这时候可以使用Zerotier来组一个内网穿透服务就很不错。

zerotier的速度是很有保证的，理论上打洞成功的话，就是p2p流量；即使不成功，也可以走官方节点或者Moon节点来传输流量。

我使用旁路由打开zerotier，并修改路由表，访问到内网众多服务了。

![](https://cdn.lmark.cc/img/image-20230928181609781.png)

路由表

![](https://cdn.lmark.cc/img/image-20230928182021175.png)











## 结尾

宿舍网络也折腾了快一年了，自从搬来西海岸之后，就入手了个K2P，第一次组网，刷了各种各样的固件来玩，全局爬墙，去广，kmp都试过，后面发现k2p内存太小，经常用几个月就满了，然后进入只读模式。后面又买了台式机，路由器更加重要了，但是性能日益不足。后来，在刘某某的篡夺下，我入手了台J4125小主机，8G内存。又折腾了不少东西，什么esxi、旁路由、zerotier、NAS等。通过这些折腾，学到了不少东西吧，回过头来看，宿舍网络给我带来了好多的帮助和便利，同时也帮助其他一些同学实现了宿舍组网+远程桌面的使用。

但是人的精力是有限的，折腾了这么多之后，发现差不多能折腾的都折腾完了，实用性的东西也都有了，自己的需求也都满足了。自然就不想进取了。遂写下这篇总结，来记录一下这么久以来折腾宿舍网络的一些小成果，并供其他想要在宿舍组网的人参考参考。

累了，