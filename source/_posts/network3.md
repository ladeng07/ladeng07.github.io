---
title: 网络破防实践先导实验三————用DLL注入实现扫雷外挂
top_img: 'https://cdn.lmark.cc/img/300136_origin_20220531_195148.jpg'
cover: 'https://cdn.lmark.cc/img/300143_origin_20220531_195532.jpg'
tags: 网络破防实践先导
abbrlink: c2bf18f6
date: 2022-06-24 08:42:02
---

## 关于这次实验

在完成了前两个炒鸡炒鸡炒鸡炒鸡炒鸡炒鸡难的实验之后， 老师终于兑现了承诺——后面的实验不会太难。这个扫雷外挂实验非常滴简单，前前后后从写程序到写实验报告只花了三个小时，但是整个实验还是非常有意思的啊。



## 前置知识



在开始做实验之前，先介绍一点前置的知识：

#### Windows消息传递机制

简单解释一下：

![](http://cdn.lmark.cc/img/image-20220624094403197.png)

![](http://cdn.lmark.cc/img/image-20220624094601775.png)

消息机制也很好理解，就是Windows的应用程序，硬件，软件都会在交互的时候发送消息，一条消息里面可能包含许多信息。哎呀大概就是这个意思，[详情可以看这个](http://t.zoukankan.com/jinsedemaitian-p-5589096.html)。



#### DLL文件

> DLL即**动态链接库**（Dynamic-Link Library）的缩写，相当于Linux下的共享对象。Windows系统中大量采用DLL机制，甚至内核的结构很大程度依赖于DLL机制。Windows下的DLL文件和EXE文件实际上是一个概念，都是PE格式的[二进制](https://so.csdn.net/so/search?q=二进制&spm=1001.2101.3001.7020)文件。

DLL属于动态链接，一般在加载时动态链接或者运行时动态链接。DLL文件可以在程序执行的任意时刻注入以完成自己的需求。

![](http://cdn.lmark.cc/img/image-20220624100124662.png)





## DLL注入实现扫雷外挂

首先，先配置一下环境，下载个VS，勾选必要的组件，然后新建一个DLL工程，写一个监听键盘监听的函数

![](http://cdn.lmark.cc/img/image-20220624103028017.png)

其中FindWindowA里的两个参数就是扫雷游戏窗口名称和属性：

![](http://cdn.lmark.cc/img/image-20220624103254868.png)

获取扫雷窗口名可以用微软官方的**spyxx**工具，使用起来也是很简单，打开之后，找到那个望远镜，然后再瞄准镜拖过去，就可以找到窗口的名称和属性了

![](http://cdn.lmark.cc/img/image-20220624103648077.png)

接下来，就可以开始写DLL注入了。我们都知道，数据是存在内存中的，只要我能读取扫雷中内存存储的那一块内存，就可以知道地雷的位置，然后再配上模拟点击，就可以一键扫雷了嘎嘎嘎。



#### 分析扫雷

想要扫内存，可以用经典的辅助工具 **Cheat Engine**，从名字就可以看出这是一个拿来作弊的工具力。经过一顿简单的操作，我很容易就找到了雷区在内存的分布。

![](http://cdn.lmark.cc/img/image-20220624105354217.png)

经过简单的分析就可以知道：

> **10**是雷区的边界，包裹住的范围就是可以点击的地方
>
> **0F**是尚未被点开的安全区
>
> **8F**是尚未被点开的地雷
>
> **4X**是被点开的地方，其中X表示周围的地雷数量

![](http://cdn.lmark.cc/img/image-20220624105717347.png)

可以很明显的看到地雷（8F）都埋在哪一个位置，只要遍历整个棋盘，把所有的0F处的都点一遍左键，8F处都点一遍右键，就能赢了。



#### 写扫雷程序

很容易可以看出，棋盘起始位置是在内存位置：0x01005361，然后再找到棋盘的长和宽数据在内存中的位置

![](http://cdn.lmark.cc/img/image-20220624140019945.png)

然后按照刚才的思路就可以写出扫雷程序了：

```c++
LONG OPROC;
PBYTE w = (PBYTE)0x01005334;
PBYTE h = (PBYTE)0x01005338;
PBYTE n = (PBYTE)0x01005340;
PBYTE now = (PBYTE)0x01005361;
int x = 20, y = 63;
int height, width, num;

LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam) {
    char ssChar[20];
    switch (uMsg) {
    case WM_CHAR:
        height = *h;
        width = *w;
        now = (PBYTE)0x01005361;
        for (int j = 0; j < height; j++) {

            for (int i = 0; i < width; i++) {
                if (*now == 15) {
                    SendMessage(hwnd, WM_LBUTTONDOWN, 0, MAKELPARAM(x + i * 16, y+j *16));
                    SendMessage(hwnd, WM_LBUTTONUP, 0, MAKELPARAM(x + i * 16, y+j * 16));
                }
                else if (*now == 143) {
                    SendMessage(hwnd, WM_RBUTTONDOWN, 0, MAKELPARAM(x + i * 16, y + j * 16));
                    SendMessage(hwnd, WM_RBUTTONUP, 0, MAKELPARAM(x + i * 16, y + j * 16));
                }
                now++;
            }
            now = (PBYTE)0x01005361 + (j+1)*32;
        }
        break;
    case WM_LBUTTONDOWN:
        //MessageBoxA(nullptr, "left button down", "dll", MB_OK);
        break;
    default:
        break;
    }
    return CallWindowProc((WNDPROC)OPROC, hwnd, uMsg, wParam, lParam);
} 

```

编译出DLL文件，用Xenos来注入

![](http://cdn.lmark.cc/img/image-20220624140539715.png)

OK,接下来让我们来测试一下扫雷的效果：

![](http://cdn.lmark.cc/img/b.gif)



## 心得体会

传统环节了，没啥骚话。这次这个实验难度终于没有这么高了，而且实验还特别有意思。嘿嘿嘿嘿，编不下去了，就这样吧。这篇文章是2022年6月24日写的，也就是期末考试结束了已经结束了，网络破防这门课页出成绩了，我到底成绩如何，敬请看下一篇文章。哈哈哈

