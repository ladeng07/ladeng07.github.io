---
title: 用ssh连接服务器和使用pycharm把代码同步上服务器的方法
tags: Python
cover: "https://s2.loli.net/2022/04/05/1SeP5fFTWOKHYAG.jpg"
top_img: "https://s2.loli.net/2022/04/05/CzxFZsMLiYdVH4l.jpg"
abbrlink: 8eb53c55
date: 2022-03-28 20:07:55
---

#### 1.SSH连接服务器

首先需要安装一个远程连接客户端（我用的是Final shell，用别的也行）

![image-20220307023514359](https://s2.loli.net/2022/03/07/DNEoTJ7X569cuAm.png)

然后在软件里新建一个连接

![image-20220307023631996](https://s2.loli.net/2022/03/07/AVY7gGkNZ4jyixS.png)

这里，主机名是**服务器的公网IP**，端口默认**22**，底下，使用密码登录，

连接成功后就可以操作服务器了



#### 2.用pycharm把代码同步上服务器(需要pycharm专业版)

首先打开pycharm专业版（社区版没有这个功能好像），打开项目，左上角选择File--settings

![image-20220307024224248](https://s2.loli.net/2022/03/07/vFUojrapRACKN7s.png)

![image-20220307024333165](https://s2.loli.net/2022/03/07/knEfyd67xel8VYC.png)

新增一个SFTP连接，然后点右边的SSH configuration的三个点，新增SSH连接

![image-20220307024418946](https://s2.loli.net/2022/03/07/FyE1Ltlp3ZYvuJH.png)

账号密码同之前SSH远程登录时的账号密码

![](https://s2.loli.net/2022/04/23/qyv6kleGCu8ZE7N.png)



然后重点来了，**接下来这几步不能错，不然可能会把文件覆盖掉**



![](https://s2.loli.net/2022/04/23/HifCqLdg5FAjSNZ.png)

首先在Root path中，选择你想要的根目录，之后在Web server URL处填入你的远程服务器地址。

然后选择上方Mappings栏

![image-20220423004950139](https://s2.loli.net/2022/04/23/WamQCOVPYjN8xbe.png)

本地路径设置，这里就设置你**本地的Django项目的路径（就是manage.py的路径）**

![image-20220307025057771](https://s2.loli.net/2022/03/07/qXWIwHMOrQZ2keo.png)

配置完成后，点击OK，接下来就是从服务器下载和上传代码



在pycharm项目的首页，文件树那里，右键，往下滑选择Deployment，里面的下载和上载就是同步操作

![image-20220307025326524](https://s2.loli.net/2022/03/28/J5wfV17e4jFkcvO.png)

可以通过这个把代码同步上去。上传大概需要几分钟左右即可
