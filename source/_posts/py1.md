---
title: 用pyinstaller在64位电脑上打包32位exe
tags: Python
cover: "https://s2.loli.net/2022/04/05/CzxFZsMLiYdVH4l.jpg"
top_img: "https://s2.loli.net/2022/04/05/ybQfZaiY32gIFUP.jpg"
abbrlink: 2fe60316
date: 2022-02-10 17:26:49
---

hello大家好，这里是LMark。今天给别人写程序的时候，用pyinstaller打包成exe，但是对方是32位Win7，而我的是64位，所以用pyinstaller打包出来的exe文件运行不了，后来去网上找了些资料，解决了这个问题。

#### 1.安装32位的python

下载python去官网，可以找到全版本。python的版本没有什么要求，只要是32位的。附官网传送门：[Python Releases for Windows | Python.org](https://www.python.org/downloads/windows/)。这里我演示下的是3.4.4，因为3.4.4还支持XP。

![](https://s2.loli.net/2022/02/10/aDRqVFzYm1K7AuN.png)

下载并安装，安装完之后记得将python添加到环境变量中（如果电脑上已经有了64位python，建议给32位python改个名字，防止冲突）

#### 2.安装pywin32

打包成32位exe程序需要pywin32这个包，所以我们先安装一下，这里先去下载一下[Pywin32](https://sourceforge.net/projects/pywin32/files/pywin32/)

![](https://s2.loli.net/2022/02/10/E7qX9ihPxUvdAfo.png)

找到适合的版本（这里以python3.4为例），貌似下载需要科学上网。

![](https://s2.loli.net/2022/02/10/1ZzQB48rl3gc6Ud.png)

下载好后直接双击运行，按照默认值，一直下一步即可。

#### 3.更新pip、whell、setuptools和安装future、pefile

在cmd命令行中依次输入：

``` powershell
pip install pip==19.1.1
pip install wheel==0.33.6
pip install setuptools==42.0.2
pip install future==0.18.2
pip install pefile==2017.8.1
```

#### 4.安装pyinstaller

这里我安装的是3.4版本的pyinstaller(python3.4可以选择3.4或3.5版本的pyinstaller)

``` powershell
pip install pyinstaller==3.4
```

安装完成后，在命令行中输入以下命令，显示以下内容表示安装成功

``` powershell
pyinstaller -v
```

![正常显示版本号](https://s2.loli.net/2022/02/10/yIYAS92VR8JHGgF.png)

