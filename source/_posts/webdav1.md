---
title: Windows11挂载群晖webdav到本地
cover: 'https://cdn.lmark.cc/img/319678_origin_20220628_092530.jpg'
top_img: 'https://cdn.lmark.cc/img/319678_origin_20220628_092530.jpg'
tags: Windows
abbrlink: ea042a0d
date: 2024-10-16 15:50:57
---

## 问题描述

在群晖里启动了webdav server之后，windows11上添加会出现`0x80070043 找不到网络名`

![](https://cdn.lmark.cc/img/image-20241016160808887.png)



## 解决方案

- 确认webdav服务正确打开，端口无冲突。
- windows11注册表的`BasicAuthLevel`设置为2

具体操作

1. 使用`win+R`，输入`regedit`打开注册表
2. 找到`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WebClient\Parameters`键
3. 找到`BasicAuthLevel`的项
4. 修改其值为2

![](https://cdn.lmark.cc/img/image-20241016161746210.png)

5. 如果不存在这个键，新建一个名为`BasicAuthLevel`，类型为`DWORD`的值，设置为2
6. 重启



