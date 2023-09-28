---
title: HackGame2022部分题解（签到——微积分小练习）
cover: https://cdn.lmark.cc/img/300234_origin_20220531_201611.jpg
top_img: https://cdn.lmark.cc/img/300233_origin_20220531_201608.jpg
tags:
  - CTF
  - Linux
  - XSS
  - Python
abbrlink: dc57b028
date: 2022-10-29 22:35:15
---

总所周知，中科大每年都会举办一个HackGame，今年也不例外。

今年的比赛从2022 年 10 月 22 日 中午 12:00开始，到 10 月 29 日 中午 12:00（共七天）。在这7天里，我们可以不吃不喝来夺旗（bushi）。题目有难有易，而且对新手还挺友好，像我这样毛都没学过的都可以浅浅拿个1900。遂写篇博客浅浅记录一下这个比赛经历。

![image-20221107105639243](http://cdn.lmark.cc/img/image-20221107105639243.png)

先贴一下结果。我好菜呜呜，主要记录一下一些我觉得有意思的题目和解题方法。为了记录一下，我怕我以后都忘记我还会写这个。



## 签到



### 题目

![image-20221107110043374](http://cdn.lmark.cc/img/image-20221107110043374.png)

在规定时间内写下2022来签到。



### 题解

其实只要手速超过光速，可以直接签下四个大字即可（bushi）。要是你没有这么快的手速，还是老老实实找一下方法把，可以看到，他是本地识别，然后再将识别结果用GET请求传给后端。

![image-20221107110439346](http://cdn.lmark.cc/img/image-20221107110439346.png)

所以只要直接修改GET请求，修改为2022即可。

![image-20221107110514897](http://cdn.lmark.cc/img/image-20221107110514897.png)



## 猫咪问答喵

### 题目

![image-20221107110548870](http://cdn.lmark.cc/img/image-20221107110548870.png)

![image-20221107110601603](http://cdn.lmark.cc/img/image-20221107110601603.png)



### 题解

猫咪问答可以说是Hackgame的经典题目了，是一道有关中科大的信息收集题。如果你有中科大同学你可以直接去问问他们（bushi）

先讲一下前三题，

#### 第一题

直接在浏览器搜索**中国科学技术大学 NEBULA 战队**，第一篇里面就有。

![image-20221107111040429](http://cdn.lmark.cc/img/image-20221107111040429.png)

#### 第二题

直接贴官方题解好了

![image-20221107111434374](http://cdn.lmark.cc/img/image-20221107111434374.png)

#### 第三题

同

![image-20221107111550358](http://cdn.lmark.cc/img/image-20221107111550358.png)

#### 第四题

先去Github上找到Linux的仓库[torvalds/linux: Linux kernel source tree (github.com)](https://github.com/torvalds/linux)

直接在仓库力搜索这个错误代号

![image-20221107111817644](http://cdn.lmark.cc/img/image-20221107111817644.png)

这个commit记录就在这[exec: Force single empty string when argv is empty · torvalds/linux@dcd46d8 (github.com)](https://github.com/torvalds/linux/commit/dcd46d897adb70d63e025f175a00a89797d31a43)

![image-20221107111856254](http://cdn.lmark.cc/img/image-20221107111856254.png)

#### 第五题

可以说是六道题中我写的最久的一道题，之前一直想着有没有什么工具可以直接公国ssh 公钥查找域名，结果找了很多，都没找到方法。然后直接把这一整个密钥信息拿去搜索也啥都搜不到

![image-20221107112209932](http://cdn.lmark.cc/img/image-20221107112209932.png)

之后又找了很多，关于这方面的东西，确定了，只有网站自己把公钥地址贴出来，我们才能搜到，而不是通过DNS来找，然后我直接把那串十六进制密钥粘贴去必应（谷歌也行）搜索了一下。

然后就给我找到了

![image-20221107112708534](http://cdn.lmark.cc/img/image-20221107112708534.png)

看起来指向了一个神秘网址，刚好就是一个六个字母的域名[SDF Public Access UNIX System - Free Shell Account and Shell Access](http://sdf.org/)

![image-20221107112810563](http://cdn.lmark.cc/img/image-20221107112810563.png)

嗯，很复古的界面。这是一个免费的公共UNIX服务器。

##### 官方题解

原来真有通过SSH指纹来搜索域名的网站[www.shodan.io](www.shodan.io)

是我见识短浅了

![image-20221107113922675](http://cdn.lmark.cc/img/image-20221107113922675.png)

#### 第六题

也是嗯搜就可以了，这里贴个官方题解

![image-20221107114026862](http://cdn.lmark.cc/img/image-20221107114026862.png)



## 家目录里的秘密

### 题目

![image-20221107114232931](http://cdn.lmark.cc/img/image-20221107114232931.png)

题目压缩包下载链接：[下载链接哟](https://cdn.lmark.cc/source/user_home.tar.gz)

### 题解

#### VS Code 里的 flag

先把项目解压出来，然后拖入VSCode中，可以很清晰的看到整个文件夹结构，然后利用VSCode的搜索功能，直接搜索`flag`就可以找到第一个flag了。

![image-20221107114948278](http://cdn.lmark.cc/img/image-20221107114948278.png)

#### Rclone 里的 flag

通过刚刚搜索flag可以发现，有一个Rclone的配置文件，上面写着大大的Flag2，看起来显然就是Flag2的关键道具

![image-20221107115308531](http://cdn.lmark.cc/img/image-20221107115308531.png)

其实这题当时没做出来哈哈哈哈，难绷

参考一下官方的题解，

#### 官方题解

因为ftp服务器传的密码是需要明码的，所以他这里的加密是可逆的，也就是混淆。有方法可以还原的。翻翻代码，可以发现有一个函数就是干这个的

```go
package obscure

// 省略部分代码

// Reveal an obscured value
func Reveal(x string) (string, error) {
	ciphertext, err := base64.RawURLEncoding.DecodeString(x)
	if err != nil {
		return "", fmt.Errorf("base64 decode failed when revealing password - is it obscured?: %w", err)
	}
	if len(ciphertext) < aes.BlockSize {
		return "", errors.New("input too short when revealing password - is it obscured?")
	}
	buf := ciphertext[aes.BlockSize:]
	iv := ciphertext[:aes.BlockSize]
	if err := crypt(buf, buf, iv); err != nil {
		return "", fmt.Errorf("decrypt failed when revealing password - is it obscured?: %w", err)
	}
	return string(buf), nil
}

// MustReveal reveals an obscured value, exiting with a fatal error if it failed
func MustReveal(x string) string {
	out, err := Reveal(x)
	if err != nil {
		log.Fatalf("Reveal failed: %v", err)
	}
	return out
}
```

所以，可以直接调用这个函数了

```go
package main

import (
        "fmt"
        "github.com/rclone/rclone/fs/config/obscure"
)

func main() {
        fmt.Println(obscure.MustReveal("tqqTq4tmQRDZ0sT_leJr7-WtCiHVXSMrVN49dWELPH1uce-5DPiuDtjBUN3EI38zvewgN5JaZqAirNnLlsQ"))
}
```

> 写给没有Go环境的人
>
> 1. 下载GO安装包，安装[Downloads - The Go Programming Language (google.cn)](https://golang.google.cn/dl/)
>
> ![image-20221107160901394](http://cdn.lmark.cc/img/image-20221107160901394.png)
>
> 2. 如果没添加环境变量，则可以直接进到GO安装目录下`C:\Program Files\Go\bin`
>
> 3. 先 `go mod init <name>` 生成 go package（`<name>` 换成你喜欢的名字）
>
> 4. 将需要运行的 go 代码放进一个 go 文件里（注意这里 `package` 需要为 `main`），然后 `go run your_file.go`
>
> 5. 按照给出的提示下载缺少的依赖（`go get github.com/rclone/rclone/fs/config/obscure`）需要魔法

跑出来代码后：

![image-20221107161242547](http://cdn.lmark.cc/img/image-20221107161242547.png)

## HeiLang



### 题目

​	![image-20221107163611164](http://cdn.lmark.cc/img/image-20221107163611164.png)

### 题解

整个比赛除了签到题之外，最简单的一道题。解法可以说是多种多样，这里我分享一下我的解法。

现在python刚好没有这种运算规则，但是我们自定义出来，那不久有了？

所以我的想法是写一个魔法方法，来实现这个功能就好。

自定义一个LIst类，写一个索引时候的方法。

```HeiLang
class L(list):
    def __init__(self, values=None):

        self.values = values
    def __setitem__(self, key,value):
        if isinstance(key,int):
            self.values[key] = value
        else:
            for i in key:
               
                self.values[i] = value
        
    def __repr__(self):
        return self.values
```

然后，还是得稍微把每一个`|`给替换成`,`，这样传进去的参数就是一个不定长的元组，然后再分别赋值。

![image-20221107164733923](http://cdn.lmark.cc/img/image-20221107164733923.png)

最后直接跑一下，输出结果：

![image-20221107165136981](http://cdn.lmark.cc/img/image-20221107165136981.png)

> 偷偷插一句：Python自带的IDLE真好用！！！



## Xcaptcha

### 题目

![image-20221107165424721](http://cdn.lmark.cc/img/image-20221107165424721.png)

### 题解

哈哈哈哈哈哈，题目超好笑的诶。咳咳，这道题是一个Web题，需要我们在3秒内计算三个大数相加。

![image-20221107170911961](http://cdn.lmark.cc/img/image-20221107170911961.png)

最简单的方法，找一个神童，让他光速算完并提交结果。

如果找不到，人类就寄了（bushi）

其实，还有个方法，写js脚本。

由于我没学过JS，不太会写脚本，所以浅浅请教了一下张哥JS怎么注入。

张哥很快啊，啪的一下就教我怎么写，他说，我可以用油猴来写。代码如下：

```javascript
// ==UserScript==
// @name         调试
// @namespace    http://202.38.93.111:10047/xcaptcha
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match       http://202.38.93.111:10047/xcaptcha
// @icon         https://www.google.com/s2/favicons?sz=64&domain=microsoft.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function largeNumAdd(num1, num2) {
        let maxLength = Math.max(num1.length, num2.length);
        //num1和num2位数对齐，位数较小的前面补0
        num1 = num1.padStart(maxLength, '0');
        num2 = num2.padStart(maxLength, '0');
        let res = '';//存放最后得到的结果
        let figure = 0;//figure = 两个数字对应位数数值相加 + 进位
        let currentNum = 0;//对应位数的结果
        let carry = 0;//进位
        for(let i=num1.length-1; i>=0; i--) {
            figure = parseInt(num1[i]) + parseInt(num2[i]) + carry;
            currentNum = figure % 10;
            carry = Math.floor(figure / 10);
            res = currentNum + res;
        }
        return res
    }

    let labels = document.querySelectorAll('label')
    var results=[]
    labels.forEach((ele)=>{
        let strs = ele.innerText.split('+')
        let num1 = strs[0]
        let num2 = strs[1].split(' ')[0]
        results.push(largeNumAdd(num1, num2))
    })
    let inputs = document.querySelectorAll('input')
    for(let i = 0;i< inputs.length;i++){
        inputs[i].value = results[i]
    }
    let btn = document.querySelector('button')
    btn.click()

})();
```

里面的大数加法是在网上找的，然后就，跑一下就自动计算力。

人类战胜天网力！

![QQ截图20221029232555](http://cdn.lmark.cc/img/QQ%E6%88%AA%E5%9B%BE20221029232555.png)



## 旅行照片 2.0

### 题目

![img](http://cdn.lmark.cc/img/travel-photo-2.jpg)

![image-20221107171823868](http://cdn.lmark.cc/img/image-20221107171823868.png)

![image-20221107171843312](http://cdn.lmark.cc/img/image-20221107171843312.png)



### 题解

社工题，可以说是很简单了，只要方法和工具用对了，就会很有意思。

第一题，非常简单，直接右键照片->属性。可以看到这些所有的信息。

![image-20221107172447738](http://cdn.lmark.cc/img/image-20221107172447738.png)

第二题，可以说稍微有点难度了。

首先，从图片中可以看到，这个体育馆上面写着霓虹津。而且路上的车是左行的，所以这个地方应该是霓虹。然后就是这个体育馆的牌匾，他们都说能看出来这是ZOZOMARINE STADIUM，我是死活看不出来，借助了搜图工具搜出来的千叶海洋球馆

上谷歌地图找找

![image-20230103162524984](http://cdn.lmark.cc/img/image-20230103162524984.png)

然后看看周边的酒店宾馆啥的，很容易找到一家APA，一家很大的连锁酒店，我同学去霓虹玩的时候还住过，浅浅看一下邮编

![image-20230103162750564](http://cdn.lmark.cc/img/image-20230103162750564.png)

然后接下来就是手机，从之前的EXIF信息可以看出，这款手机的型号是`sm6115(juice)`，看起来这是个很抽象的代号，放进google检索一下，第一个结果就是，红米9T？？？什么勾吧，没听说过，查了一下发现在国内这个叫红米NOTE 9，去官网或者淘宝查一下参数即可。分辨率是`2340x1080`

![image-20230103163448917](http://cdn.lmark.cc/img/image-20230103163448917.png)

最后到了最难的部分，就是查航班轨迹，以前听说过飞机的轨迹是能实时查看的，但是一直没试过，这次可以试试了。首先先找一个可以查看航班轨迹的网站，很多网站都需要会员才能看比较古早的历史数据。所以，[推荐这个](https://globe.adsbexchange.com/)一个免费但是可以看比较早的记录，最小时间粒度是10s。

关于为什么这些网站能看到这么多飞机的航行记录，那是因为飞机在航行过程中会发射特定的无线电信号，里面包含着航班的信息，地面上的人只要接受信息，将其整理出来，就能的到实时的航班轨迹了，这种信号称作[ADS-B信号](https://zh.wikipedia.org/wiki/广播式自动相关监视)![image-20230103162125790](http://cdn.lmark.cc/img/image-20230103162125790.png)

拍摄时的时间为霓虹时间，比我们北京时间快了一个小时，所以他们是东九区，转换一下，拍照片时的UTC时间就是 5 月 14 日 09:23:35 

这个时候，恰好只有一架飞机从这里飞过，而且还是朝着北方飞，符合题意。这里看到航班号为ANA683，放进google里检索一下，因为一个航班号应该是固定的，所以半年前出发地和目的地应该是相同的，时间上来看应该也是差不多的，第一个结果就是

![image-20230103165256195](http://cdn.lmark.cc/img/image-20230103165256195.png)

出发地的HND是羽田机场，没错，就是羽田浩司的羽田（话说朗姆篇终于要完结了呜呜）。貌似每个机场都有自己的三个字母的机场代号。这么说，全世界只能用26 * 26 * 26 = 17656 个机场了咯。显然不太可能。扯远了。HIJ就是广岛机场，Hiroshima，这个词听着非常舒服，让人想到了广岛之恋。

知道了所有信息后，答案就出来了

![image-20230103165933448](http://cdn.lmark.cc/img/image-20230103165933448.png)

 ### 我的题解

以上题解为官方题解，因为我自己做的方法是在拿不上台面，就不耽误人了，简单讲讲，查手机型号时候，我看到摄像头排列形状非常奇怪。身为一个资深米粉，一眼就能看出这个长条形摄像头排列不是近几年的小米手机使用的，因为看起来很廉价，所以百分百是红米。然后我打开淘宝搜了一下，划到第二页我就看到了这部手机，乐。然后航班的话，我一开始找到的网站没有这么高级，我找到的只能看时间段内的航班，然后我就手动试了一遍，大概试了十几二十个，就出结果乐。哎，还是太菜了。



## 猜数字

### 题目

某大型餐饮连锁店的畅销菜品「嫩牛七方」（见下图）自正式线下售卖以来便好评如潮，但囿于产能限制，只有每周四才会对外售卖。你也是一名「嫩牛七方」的爱好者——每个星期四的晚上都能在某家连锁店里找到你的身影。

![image-20230103171242749](http://cdn.lmark.cc/img/image-20230103171244507.png)

「嫩牛七方」在绝大多数情况下都是七边形，但也会有粗心的店员在制作的时候不小心少折一道，从而将其变成六边形。不过，由于某大型餐饮连锁店对质量的严格把控，哪怕作为十多年以来的忠实粉丝，你也只吃到过两次六边形的「嫩牛七方」。当然，在极少数情况下也会有五边形的「嫩牛七方」——但恐怕仅有百万分之一的概率。上一个五边形的「嫩牛七方」在交易市场上已经卖出足足 50 元的天价了。

吃到五边形的「嫩牛七方」一直是你这十多来以来的梦想，但囊中羞涩的你，自然是没有办法付得起这 50 块的高价。一周一度的星期四悄然到来，你在各大社交平台发遍了文案，也没有找到人转给你这 50 块钱。这样的悲惨境遇难免使你开始思考人生，在不怀希望的等候中你盯着手机中空旷的点赞通知，思绪却渐渐飘向了这个学期的原子物理。在那里的生活的电子们成群结对，不受制于世俗的欲望却能幸福地在原子轨道间跃迁。可能唯一的缺憾就是诞生了一门完全无法理解的学科，里面的公式如同由符号们随机排列组合构成。这使你想到了你在程序设计课上的作业——一个猜数字小游戏。这个小游戏需要做的事情非常简单：在 0 和 1 之间猜一个数字（精确到小数点后 6 位），并通过反馈的「大」还是「小」修正猜测，直至完全猜中。一次性命中的概率显然也是一百万分之一（和五边形的「嫩牛七方」达成了某种意义上的同构）——但从学霸室友手中借来的概率论与统计学笔记上万千公式的模样在思绪中一瞬而过，于是你默默祈祷着大数定理，虔诚地按下了提交的按钮。



### 题解

这道题我当时没做出来，时候看乐一下感觉非常的有趣，这道题是要猜对一个数，正常方法显然概率太低。单次实验中几乎不发生。所以得想别的方法。先看源代码，找了一下，发现比较的地方

![image-20230103173040454](http://cdn.lmark.cc/img/image-20230103173040454.png)

根据出题人所说，这道题想考的是 IEEE 754 标准定义的浮点数并不满足数学上的全序关系.

> 数学上的全序关系（`<`）需要同时满足三条：
>
> 1. 非自反性：对于任意 `a`，均有 `a < a` 不成立。
> 2. 传递性：对于任意 `a`、`b`、和 `c`，均有 `a < b` 且 `b < c` 蕴含 `a < c` 成立。
> 3. 完全性：对于任意 `a` 和 `b`，均有 `a ≠ b` 蕴含 `a < b` 或 `b < a` 成立。

第一和第二条满足，但是第三条不满足，因为存在着`NaN`

- 对于任意 `a`，`a ≠ NaN` 成立，但 `a < NaN` 或 `NaN < a` 均不成立。

所以，只要提交NaN上去，就能通过了，这需要构造一下请求。贴一下官方题解

```html
POST /state
Content-Type: text/xml;charset=UTF-8
Authorization: Bearer 1:MEQCIBxs4yBzfjnYS/o+Z3Bm3lJpIZVfvB1dsjSkzcgj8PakAiAtZcKG6tBqDhbOYEXwigMCd6bUBJe7P9KlIr6dxDPu4A==

<state><guess>NaN</guess></state>
```



## LaTeX 机器人

### 题目

在网上社交群组中交流数学和物理问题时，总是免不了输入公式。而显然大多数常用的聊天软件并不能做到这一点。为了方便大家在水群和卖弱之余能够高效地进行学术交流，G 社的同学制作了一个简单易用的将 LaTeX 公式代码转换成图片的网站，并通过聊天机器人在群里实时将群友发送的公式转换成图片发出。

这个网站的思路也很直接：把用户输入的 LaTeX 插入到一个写好头部和尾部的 TeX 文件中，将文件编译成 PDF，再将 PDF 裁剪成大小合适的图片。

“LaTeX 又不是被编译执行的代码，这种东西不会有事的。”

物理出身的开发者们明显不是太在意这个网站的安全问题，也没有对用户的输入做任何检查。

那你能想办法获得服务器上放在根目录下的 flag 吗？

**纯文本**

第一个 flag 位于 `/flag1`，flag 花括号内的内容由纯文本组成（即只包含大写小写字母和数字 0-9）。

**特殊字符混入**

第二个 flag 位于 `/flag2`，这次，flag 花括号内的内容除了字母和数字之外，还混入了两种特殊字符：下划线（`_`）和井号（`#`）。你可能需要想些其他办法了。

[LaTeX 图片生成后端的 Dockerfile 附件下载](http://101.43.216.170:5244/d/%E5%AD%A6%E4%B9%A0/HackGame2022/latexbot-backend.zip)



### 题解

这里官方题解给的很潦草，感觉不如我自己当时写的。参考一下轩哥的博客[[网络攻防\]HackerGame初体验-来点免费送的flag | 小二上馄饨的Moonlight-Blog (mo01iht.github.io)](https://mo01iht.github.io/2022/11/06/HackerGame2022/#Inject)

一开始对LaTex可以说是一窍不通，简单了解了一下知道大概是一个公式生成工具，关于LaTex（摘抄自轩哥的博客）

> LaTeX(LATEX，音译“拉泰赫”)是一种基于ΤΕΧ的排版系统，由美国计算机学家莱斯利·兰伯特(Leslie Lamport)在20世纪80年代初期开发，利用这种格式，即使使用者没有排版和程序设计的知识也可以充分发挥由TeX所提供的强大功能，能在几天、甚至几小时内生成很多具有书籍质量的印刷品。对于生成复杂表格和数学公式，这一点表现得尤为突出。因此它非常适用于生成高印刷质量的科技和数学类文档。这个系统同样适用于生成从简单的信件到完整书籍的所有其他种类的文档。
> 简单来说，即LaTeX是一种基于ΤΕΧ的排版系统，主要功能是生成数学公式和文章排版，而本文就是由前者数学公式而引出。

怎么获取Flag，一开始没什么思路，上网搜索关键词： LaTex 破解 攻击 注入 。。。然后发现了下面这篇文章，讲的非常好[实战LaTex Injection - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/455901476) 先看一下。

先看一下后台是如何生成PDF的。

![image-20230103204836168](http://cdn.lmark.cc/img/image-20230103204836168.png)

生成的时候，启用了一个`-no-shell-escape`选项，

![image-20230103205421071](http://cdn.lmark.cc/img/image-20230103205421071.png)

这个选项是关闭` \write18`这条指令，这是一条可以在LaTex里执行命令的用法。但是这里不能用，那就只能用别的了。

第一问，关键使用到LaTex的一个类似于include的引用功能。就是`\input{}`,直接读取文件的内容，第一问可以直接读取

```latex
\input{/flag1}
```

![image-20230104001030354](http://cdn.lmark.cc/img/image-20230104001030354.png)

第二问就有点难度了，因为其中混入了特殊字符下划线和井号，如果直接input的话会出LaTex的语法错误而导入失败。但是，功夫不负有心人，经过不懈的努力搜寻答案，终于在Google上找到了一个github仓库，里面详细的介绍LaTex注入的一些知识，感兴趣可以仔细看看。[PayloadsAllTheThings/LaTeX Injection at master · Mo01iHt/PayloadsAllTheThings (github.com)](https://github.com/Mo01iHt/PayloadsAllTheThings/tree/master/LaTeX Injection)

![image-20230104000823965](http://cdn.lmark.cc/img/image-20230104000823965.png)

意思是停用下划线和井号这两个控制字符，如下，和官方题解比起来十分的优雅

```latex
\catcode `\#=12 \catcode `\_=12 \input{/flag2}
```



![image-20230104000953022](http://cdn.lmark.cc/img/image-20230104000953022.png) 



## Flag 的痕迹

### 题目

小 Z 听说 Dokuwiki 配置很简单，所以在自己的机器上整了一份。可是不巧的是，他一不小心把珍贵的 flag 粘贴到了 wiki 首页提交了！他赶紧改好，并且也把历史记录（revisions）功能关掉了。

「这样就应该就不会泄漏 flag 了吧」，小 Z 如是安慰自己。

然而事实真的如此吗？

> （题目 Dokuwiki 版本基于 2022-07-31a "Igor"）

![image-20230104002021428](http://cdn.lmark.cc/img/image-20230104002021428.png)

### 题解

官方题解鼓励我们自己动手，丰衣足食，自己本地跑一跑doukuwiki，但是，对于我这种菜鸡来说，理解成互联网漏洞冲浪收集题了。习惯性的先去Google了一下这个wiki，发现是一个蛮古老的wiki服务。直到现在也还在更新。仓库地址：[splitbrain/dokuwiki: The DokuWiki Open Source Wiki Engine (github.com)](https://github.com/splitbrain/dokuwiki)

![image-20230104004418017](http://cdn.lmark.cc/img/image-20230104004418017.png)

先使用之前学的，Google检索关键词大法

![image-20230104004345929](http://cdn.lmark.cc/img/image-20230104004345929.png)

看到几篇相关的问答贴，其中有一篇吸引了我的眼球：[Disabling restoring old revision - DokuWiki User Forum](https://forum.dokuwiki.org/d/18854-disabling-restoring-old-revision)

![image-20230104004909215](http://cdn.lmark.cc/img/image-20230104004909215.png)

这篇帖子里，楼主说有网络爬虫是不是恢复一些他已经删除掉的帖子，楼下纷纷表示遇到过这种情况。其中有一条回帖，精准命中

![image-20230104013023110](http://cdn.lmark.cc/img/image-20230104013023110.png)

他说这个回复功能bug，可以越过权限来恢复。然后在22年6月26日的一个更新中修复了这个bug，根据它提供的issue来看，似乎是一个可以利用的bug：[Although action "Old revisions" is deactivated, all old versions can be viewed. · Issue #3421 · splitbrain/dokuwiki (github.com)](https://github.com/splitbrain/dokuwiki/issues/3421)

![image-20230104013428549](http://cdn.lmark.cc/img/image-20230104013428549.png)

在这个issue的最后，有个人提出，虽然 `&do=revisions`的漏洞解决了，但是还存在的一个比较的漏洞，我尝试用了一下，然后就成功了。

![image-20230104013659915](http://cdn.lmark.cc/img/image-20230104013659915.png)

输入这个：[start [Flag Wiki\]](http://202.38.93.111:15004/doku.php?do=diff)，就可以进入到当前页面的比较历史版本的界面。拿到flag

![image-20230104013922408](http://cdn.lmark.cc/img/image-20230104013922408.png)



##  安全的在线测评

### 题目

传说科大新的在线测评系统（Online Judge）正在锐意开发中。然而，新 OJ 迟迟不见踪影，[旧的 OJ](https://oj.ustc.edu.cn/) 和[更旧的 OJ](http://acm.ustc.edu.cn/ustcoj/) 却都已经停止了维护。某 2022 级计算机系的新生小 L 等得不耐烦了，当即表示不就是 OJ 吗，他 10 分钟就能写出来一个。

**无法 AC 的题目**

为了验证他写的新 OJ 的安全性，他决定在 OJ 上出一道不可能完成的题目——大整数分解，并且放出豪言：只要有人能 AC 这道题，就能得到传说中的 flag。当然，因为目前 OJ 只能运行 C 语言代码，即使请来一位[少年班学院的天才](https://github.com/ustclug/hackergame2018-writeups/tree/master/official/RSA_of_Z#解法-1)恐怕也无济于事。

**动态数据**

为了防止数据意外泄露，小 L 还给 OJ 加入了动态数据生成功能，每次测评会随机生成一部分测试数据。这样，即使 OJ 测试数据泄露，攻击者也没办法通过所有测试样例了吧！（也许吧？）

判题脚本：[下载](https://hack.lug.ustc.edu.cn/media/0fd509cd-9f1a-588a-b45e-a11331006a3f/online_judge.py)

你可以通过 `nc 202.38.93.111 10027` 来连接题目，或者点击下面的 "打开/下载题目" 按钮通过网页终端与远程交互。

> 如果你不知道 `nc` 是什么，或者在使用上面的命令时遇到了困难，可以参考我们编写的 [萌新入门手册：如何使用 nc/ncat？](https://lug.ustc.edu.cn/planet/2019/09/how-to-use-nc/)



### 题解

这道题当时没写出来，但是之后一看，原来和之前做过的一道题类似。也是一个OJ。我首先想到的方法就是include对应的文本。从源代码可以看到，第一题的判断是两个静态的文件，所以我们在编译的时候直接include会发生什么呢？

```c
// payload1-1.c
#include "../data/static.out"
```



![image-20230104023012985](http://cdn.lmark.cc/img/image-20230104023012985.png)

这样可以读出第一个数，由于第二个数是使用空格隔开，所以得让错误出现在第二个数，第一个数就得变得合法，这里参考官方题解是用一个变量来接收。

```c
// payload1-2.c
int a = 
#include "../data/static.out"
```

![image-20230104023400875](http://cdn.lmark.cc/img/image-20230104023400875.png)

又学到个小技巧！

然后使用这俩数字，构造答案：

```c
// payload1-3.c
#include<stdio.h>
const char* p="9760010330994056474520934906037798583967354072331648925679551350152225627627480095828056866209615240305792136810717998501360021210258189625550663046239919";
const char* q="10684702576155937335553595920566407462823007338655463309766538118799757703957743543601066745298528907374149501878689338178500355437330403123549617205342471";

int main() {
    printf("%s\n%s\n", p, q);
    return 0;
}

```

拿到弗拉哥

![image-20230104023602863](http://cdn.lmark.cc/img/image-20230104023602863.png)

第二问是动态生成的数据，就不能直接用这种方法读取出来了。不会，先跳过

---



##  线路板

### 题目

中午起床，看到室友的桌子上又多了一个正方形的盒子。快递标签上一如既往的写着：线路板。和往常一样，你“帮”室友拆开快递并抢先把板子把玩一番。可是突然，你注意到板子表面似乎写着些东西……看起来像是……flag？

![image-20230106215906105](http://cdn.lmark.cc/img/image-20230106215906105.png)

可是只有开头的几个字母可以看清楚。你一时间不知所措。

幸运的是，你通过盒子上的联系方式找到了制作厂家，通过板子丝印上的序列号查出了室友的底细，并以放弃每月两次免费 PCB 打样包邮的机会为代价要来了这批带有 flag 的板子的生产文件。那这些文件里会不会包含着更多有关 flag 的信息呢？



### 题解

主要考察PCB设计过程，参考官方题解：[hackergame2022-writeups/README.md at master · USTC-Hackergame/hackergame2022-writeups (github.com)](https://github.com/USTC-Hackergame/hackergame2022-writeups/blob/master/official/线路板/README.md)



---



##  Flag 自动机

没写出来哈哈，这里贴一下官方题解：[hackergame2022-writeups/README.md at master · USTC-Hackergame/hackergame2022-writeups (github.com)](https://github.com/USTC-Hackergame/hackergame2022-writeups/blob/master/official/Flag 自动机/README.md)



## 微积分计算小练习

### 题目

小 X 作为某门符号计算课程的助教，为了让大家熟悉软件的使用，他写了一个小网站：上面放着五道简单的题目，只要输入姓名和题目答案，提交后就可以看到自己的分数。

[点击此链接访问练习网站](http://202.38.93.111:10056/?token=905%3AMEQCIAK63MUT11qcxiwAM1Lk5WM0qZeUFNY1covRpXj7ufuXAiBnhHOZDGNKG55XGQYND2w%2BFtB11EsQ%2FXykijsT%2BuigAQ%3D%3D)

想起自己前几天在公众号上学过的 Java 设计模式免费试听课，本着前后端离心（咦？是前后端离心吗？还是离婚？离。。离谱？总之把功能能拆则拆就对啦）的思想，小 X 还单独写了一个程序，欢迎同学们把自己的成绩链接提交上来。

总之，因为其先进的设计思想，需要同学们做完练习之后手动把成绩连接贴到这里来：

[点击此链接提交练习成绩 URL](http://202.38.93.111:10057/?token=905%3AMEQCIAK63MUT11qcxiwAM1Lk5WM0qZeUFNY1covRpXj7ufuXAiBnhHOZDGNKG55XGQYND2w%2BFtB11EsQ%2FXykijsT%2BuigAQ%3D%3D)

点击下方的「打开/下载题目」按钮，查看接收成绩链接的程序的源代码。



### 题解

这道题非常的简单，同时很有意思，一开始写的时候可以说是状况百出，现在回过头来看却是极有意思。首先，这是一个作业提交的页面

![image-20230106223300899](http://cdn.lmark.cc/img/image-20230106223300899.png)

![image-20230106223433749](http://cdn.lmark.cc/img/image-20230106223433749.png)

然后得到的链接，需要或者粘贴到另一个地方，来获取成绩

![image-20230106223735544](http://cdn.lmark.cc/img/image-20230106223735544.png)

逻辑上来看是挺简单的，接下来再看看源代码，可以看到flag放在了提交链接的cookie里面。

![image-20230106225405316](http://cdn.lmark.cc/img/image-20230106225405316.png)

通过查看后端代码可以发现，这个链接提交的页面，是使用了selenium来打开网页，渲染之后，在读取网页的内容。

> 关于selenium：
>
> selenium是一个web自动化工具，一般用python写过爬虫的都知道，对于动态加载的网页，想要获取其数据，就得使用selenium来模拟网页的打开。此外，selenium还支持无头浏览器，不打开浏览器界面的情况下访问渲染网页。这是爬取动态网页的利器。

因此，大概思路就出现了。能自定义的输入只有姓名，也就是说需要往里面注入点东西，让后端打开网页的时候自己把cookie输出出来。这是一个XSS注入。

看起来很简单，然而，做起来可谓是一波三十折。。。。。

一开始想，直接在姓名处把cookie输出，但是，在尝试直接插入script脚本后发现并不能执行。但是F12里看到的颜色正常的script标签。就算我手动把p标签封闭掉还是不能执行。

![image-20230106233650996](http://cdn.lmark.cc/img/image-20230106233650996.png)

这个地方一开始困扰了我很久，我焯，这怎么和我学过的不一样，为毛没有转义，也不能执行。后来百度了一下，才知道原来这是标签的innerhtml属性。原因就是直接通过innerHTML动态嵌入的script，浏览器会当做普通的文本，不会当作SCRIPT节点维护到DOM里面，所以调用的时候找不到。也就是说，只要不用script标签就可以，但是如何不适用script标签来执行js代码呢？这时候，就想到了另一个方法，img标签。原本img标签是显示图像用的，但是其有一个onerror字段，在图片报错时执行什么。所以我们此时可以这样：

```html
<img src=x onerror="alert(document.cookie)">
```

把注入内容输入到姓名内，即可

![image-20230107000123393](http://cdn.lmark.cc/img/image-20230107000123393.png)

页面正常渲染，就会触发这个报错，然后js语句就被执行了，当然，如果你觉得显示一个破损图片太丑的话，可以隐藏一下。

```html
<img src=x onerror="alert(document.cookie)" style=display:none;“>   
```

![image-20230107000545283](http://cdn.lmark.cc/img/image-20230107000545283.png)

但是，后端不能把弹窗内容显示给我们，所以这里选择将cookie赋值给某个变量，这里可以选择分数和greeting。

```html
<img src=x onerror="var s = document.cookie;document.querySelector('#score').innerHTML = s;">
```

将链接复制到后端，可以得到flag

![image-20230107000958675](http://cdn.lmark.cc/img/image-20230107000958675.png)



### 碎碎念

这道题真的很简单，但是一开始方向想错了，由于直接插入script标签没用，然后就想着使用之前用过的xss平台，后面捣鼓了好久都不行，而且链接生成的时候，内容是保存到了的。所以不能自己构造页面来被后端读取。

失败的伪造界面

![image-20230107003358061](http://cdn.lmark.cc/img/image-20230107003358061.png)



## 剩下的题目

剩下的题目基本上是不会做的，看了题解后有些是恍然大悟了。感觉任重而道远啊。



### 总结

第一次参加这种CTF，感觉其趣味性很足，整活也很多，很有趣。很多题目是非常的结合实际的。不过做了一圈下来，二进制一道没做，因为基本不会，所以我还是太菜了呜呜，这个题解写了快两个月了（其实一开始写了后面就没动过，后面重新写的时候发现，已经忘了当时怎么做的了呜呜。）。而且这也是我第一次写WriteUp，我喜欢写的时候唠唠嗑，什么奇怪的东西都写点，然后就八千多字了。。。。

![image-20230107005029141](http://cdn.lmark.cc/img/image-20230107005029141.png)

如果这篇题解有什么错误的地方，欢迎大佬们在评论区批评指正，本人不胜感激。不过我写给自己看的文章应该不会有别人看吧哈哈哈哈哈。





贴一下：[参加中国科学技术大学第九届信息安全大赛（Hackergame 2022）是怎样一种体验？ - 知乎 (zhihu.com)](https://www.zhihu.com/question/561919414)



