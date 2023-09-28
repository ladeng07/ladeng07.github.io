---
title: 安卓Termux安装ubuntu+alist实现文件中继服务
cover: 'https://cdn.lmark.cc/img/IMG_0346.JPG'
top_img: 'https://cdn.lmark.cc/img/IMG_0332.JPG'
tags:
  - Linux
  - alist
  - Termux
  - Ubuntu
abbrlink: b2e71f46
date: 2022-09-12 01:54:40
---



### 1.前言

上几周刚搬校区，来到了一个鸟不生蛋的好地方，三面都是荒地，一面是大海，海的对面是南朝鲜。除了宿舍稍微好点，其他地方都输麻乐。不过，新宿舍有了明显的网线口，这就能让我完成上个学期一直没完成的计划乐——拿我的二手小米5搭个alist服务，这样我就可以，同时管理多个网盘乐。

之前因为校园网账号不够，所以这台小米5就没有拿来用，装了k2p路由器后，再也不缺网乐，所以便有了今天的计划。



------

### 2.安装Termux

Termux到处都能找得到，葫芦侠，酷安等等。当然也可以看看官网：[Termux | The main termux site and help pages.](https://termux.dev/en/)然后打开首页

![Screenshot_2022-09-12-02-19-57-532_com.termux](http://cdn.lmark.cc/img/Screenshot_2022-09-12-02-19-57-532_com.termux.jpg)

有了linux系统，咱一般做的第一步就是——换源。不然默认源的下载速度太慢了，Termux换源方法网上很多，这里推荐一个简单的：

```sh
sed -i 's@^\(deb.*stable main\)$@#\1\ndeb https://mirrors.tuna.tsinghua.edu.cn/termux/termux-packages-24 stable main@' $PREFIX/etc/apt/sources.list
```



然后我们还需要使用sudo来执行命令，所以使用pkg安装一个：`pkg install tsu`

![Screenshot_2022-09-12-15-55-44-014_com.termux](http://cdn.lmark.cc/img/Screenshot_2022-09-12-15-55-44-014_com.termux.jpg)



准备工作完成，接下来就可以开始安装Ubuntu系统了

------



### 3.安装Ubuntu

在没有root的情况下Termux是不能直接装ubuntu的，这里需要用到一个工具Proot，来安装‘阉割版’的Ubuntu。

关于proot

![img](http://cdn.lmark.cc/img/22b263f4cb6440c4b8cfb7a239741fa4.png)

首先先安装proot

```sh
 pkg install proot-distro 
```

安装完成后，可以使用

```sh
proot-distro list
```

查看可以安装的Linux发行版

![Screenshot_2022-09-12-16-07-28-543_com.termux](http://cdn.lmark.cc/img/Screenshot_2022-09-12-16-07-28-543_com.termux.jpg)

接下来就可以选择你想安装的Linux发行版本了，这里我选择Ubuntu

```sh
proot-distro install ubuntu
```

![image-20220912162213928](http://cdn.lmark.cc/img/image-20220912162213928.png)

安装完成后，可以使用如下命令进入系统

```sh
proot-distro login ubuntu
```

![image-20220912162311829](http://cdn.lmark.cc/img/image-20220912162311829.png)

出现**root@localhost:~#** 代表已进入Ubuntu环境，**root@localhost:~#** 的含义如下：

![img](http://cdn.lmark.cc/img/ec632584d109405ba9f132c474ec4e61.png)

如果需要退出Ubuntu系统则需要输入`exit`



------

### 4.安装alist

alist安装起来非常简单，一条命令搞定。更新和卸载也非常方便。

```sh
# Install
curl -fsSL "https://alist.nn.ci/install.sh" | bash -s install /root
# update
curl -fsSL "https://alist.nn.ci/install.sh" | bash -s update /root
# Uninstall
curl -fsSL "https://alist.nn.ci/install.sh" | bash -s uninstall /root
```

![image-20220912164317614](http://cdn.lmark.cc/img/image-20220912164317614.png)

![image-20220912164337004](http://cdn.lmark.cc/img/image-20220912164337004.png)

这时候如果直接使用systemctl命令是启动不了的，因为Termux的Ubuntu根本没有这条命令， 所以，我们需要去到alist的安装目录下`/opt/alist`手动启动一下。

![QQ图片20220913234229](http://cdn.lmark.cc/img/QQ%E5%9B%BE%E7%89%8720220913234229.jpg)

因为我这里安装的alist是2.6.2版本的，所以可以直接启动，如果是3.0版本的alist可能还需要安装aria2，

![QQ图片20220913234235](http://cdn.lmark.cc/img/QQ%E5%9B%BE%E7%89%8720220913234235.jpg)

至此alist搭建就完成了，现在可以享受内网上传资源的高速体验了！！！

![image-20220913234712124](http://cdn.lmark.cc/img/image-20220913234712124.png)

浅浅测试一下，上传个视频上阿里云：

![image-20220913235033880](http://cdn.lmark.cc/img/image-20220913235033880.png)

上传速度还是非常快的！

### 5.参考链接和想说的话

[Termux安装完整版Linux(Ubuntu)详细步骤_果园子的博客-CSDN博客_termux安装ubuntu](https://blog.csdn.net/weixin_49663860/article/details/123438567)

[Alist Document (nn.ci)](https://alist-doc.nn.ci/)

有了路由器之后，感觉我又有好多新东西可以折腾了，下期准备介绍一下我买的二手斐讯刷机和路由器多拨
