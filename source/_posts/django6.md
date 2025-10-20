---
title: >-
  解决django报错"Database returned an invalid datetime value. Are time zone
  definitions for your database installed?"
tags:
  - Django
  - Python
  - Bug
cover: 'https://cdn.lmark.cc/img/300155_origin_20220531_195944.jpg'
top_img: 'https://cdn.lmark.cc/img/300156_origin_20220531_195946.jpg'
abbrlink: 13f312f
date: 2025-07-13 18:30:44
---




## 问题

今天写Django项目，创建订单时遇到个bug `MySQL backend does notsupport timezone-aware datetimes when USE TZ is False`
![image-20250714003023910](https://cdn.lmark.cc/img/image-20250714003023910.png)

我把Django的USE_TZ关掉时，他说我mysql不支持，我去打开之后，能创建订单了，但是admin里商品显示有问题了，报错`"Database returned an invalid datetime value. Are time zone definitions for your database installed?"`
然后网上查教程让我把这个选项USE_TZ时区支持打开(Django5.0默认打开)。一根筋变成两头堵了。



## 解决

研究了好久，比如给我mysql加上 `SET time_zone = '+08:00'`再重启，没用。还是一样报错。后面查了好久才发现，原来是我的mysql数据库里没时区信息，虽然不知道为什么都2025年了，默认不自带时区信息。

Linux下使用命令：
```bash
mysql_tzinfo_to_sql /usr/share/zoneinfo | mysql -u root mysql
```

即可写入时区信息，Windows比较麻烦，得去官网下一个时区的sql文件[MySQL :: Time zone description tables](https://dev.mysql.com/downloads/timezones.html)，

![image-20250714003954553](https://cdn.lmark.cc/img/image-20250714003954553.png)

选`timezone_2025b_posix_sql.zip`下载，然后解压出sql文件在数据库里执行一下就行了，大概看了一下，里面都是些时区名字和时间偏移的对应关系。如下图所示：

![image-20250714003912815](https://cdn.lmark.cc/img/image-20250714003912815.png)