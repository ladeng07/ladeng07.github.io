---
title: Supervisord进程管理工具的重启问题 supervisor.sock no such file
tags:
  - Linux
  - Supervisord
cover: 'https://cdn.lmark.cc/img/300211_origin_20220531_201145.jpg'
top_img: 'https://cdn.lmark.cc/img/300212_origin_20220531_201147.jpg'
abbrlink: 6bff89fa
date: 2023-01-03 05:45:45
---

## 起因

前两天，黄哥找到我说，有个网站挂了，需要我去恢复一下，然后给了我账号密码，然后我就去看了一下，然后发现网站使用的是flask搭的，但是，我不太了解，完全不知道是用什么来启动的。甚至nginx都没配软连接，后面拿到了帮助文档才知道，原来使用Supervisord来启动和守护进程。因为之前阿里云服务器空调故障，导致服务器宕机。这个Supervisord直接异常退出了，按照网上的方法，并没有用，然后就去研究了一下。



## 关于Supervisord

Supervisor 是一个用 Python 写的进程管理工具，可以很方便的用来在 UNIX-like 系统（不支持 Windows）下启动、重启（自动重启程序）、关闭进程（不仅仅是 Python 进程）
Supervisor 是一个 C/S 模型的程序，supervisord 是 server 端，supervisorctl 是 client 端

supervisord的出现，可以用来管理后台运行的程序。通过supervisorctl客户端来控制supervisord守护进程服务，真正进行进程监听的是supervisorctl客户端，而运行supervisor服务时是需要制定相应的supervisor配置文件的。
Supervisord工具的整个使用流程：
1、首先通过echo_supervisord_conf 生成配置文件模板
2、然后你根据自己的需求进行修改，接着就使用相应的命令来使用supervisorctl客户端
3、而supervisorctl客户端会将对应的信息传递给supervisord守护进程服务，让supervisord守护进程服务进行进程守护。



## 问题复现及解决

supervisorctl的几条指令

```bash
supervisorctl restart all  
supervisorctl status
supervisorctl start all 
supervisorctl stop all
```

首先，直接重启的时候，会出现`unix:///var/run/supervisor/supervisor.sock no such file`报错

![image-20230103063505361](http://cdn.lmark.cc/img/image-20230103063505361.png)

如果此时按照网上的方法手动新建一个supervisor.sock，就会出现refused connection的错误，然后网上的教程就说是软连接问题，需要解除一下，但是一解除这个文件就会被删除。所以那个教程还挺自相矛盾。

![image-20230103063825898](http://cdn.lmark.cc/img/image-20230103063825898.png)

此时正确的做法是，应该重新指定配置文件，这样就能正确的生成一个sock文件

```bash
supervisord -c /etc/supervisord.conf
```

![image-20230103064102823](http://cdn.lmark.cc/img/image-20230103064102823.png)

然后重启即可
