---
title: 七牛云批量下载图床图片
tags:
  - 七牛云
  - 备份
cover: 'https://cdn.lmark.cc/img/300144_origin_20220531_195534.jpg'
top_img: 'https://cdn.lmark.cc/img/300137_origin_20220531_195151.jpg'
abbrlink: 8f8ea55e
date: 2024-11-17 15:34:44
---

## 起因

大一搭博客的时候，需要用到图床，当时用了免费的SM.MS速度差点意思，正好看到七牛云有免费的10G空间，用来搭图床足够了。正好typora也支持接入七牛云，就这样写了几年博客，上传了两千多张照片，一直用的好好的。

直到去年，腾讯云的免费https证书从时间从1年变成了三个月，博客的图床经常因为没更新证书直接挂掉。此时开始萌生想把七牛云上的图片迁移走的想法。然后找了一圈发现，七牛云网站本身不支持批量下载，但是官方提供了一个命令行工具可以批量下载：[qiniu/qshell: Shell Tools for Qiniu Cloud](https://github.com/qiniu/qshell)



## 使用

参考官方教程[批量下载 - 七牛开发者中心](https://developer.qiniu.com/kodo/kb/12955/kodo-batch-download?category=kb)

下载了qshell.exe（以windows为例）之后，使用如下两个命令可以进行下载：
```bash
  qshell account 您的ak 您的sk 空间名称
  qshell qdownload2 --dest-dir=本地文件夹相对路径或者绝对路径 --bucket=空间名称
```

这里的ak和sk都是密钥，之前使用七牛云作图床时，已经保存过一份，空间名称就是空间管理中的名字，如下：

![image-20250822004037308](http://192.168.8.229:40027/img/img/image-20250822004037308.png)

然后就能下载了，在这里我推荐另外一个方法，把以上信息写入conf文件里，之后可以直接调用，格式如下：

```json
{
      "accessKey": 您的ak,
      "secretKey": 您的sk,
      "bucket": 空间名称,
      "cdn_domain、": cdn使用的域名,
      "dest_dir": 保存路径
}
```

批量下载是支持增量下载的，也就说之后可以写定时任务，自动备份图床图片。