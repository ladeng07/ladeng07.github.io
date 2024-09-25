---
title: 基于uwsgi+nginx+centos的Django项目部署经历
tags: Django
cover: "https://s2.loli.net/2022/04/05/8JTU56ek9YmLZF2.jpg"
top_img: "https://s2.loli.net/2022/04/05/ybQfZaiY32gIFUP.jpg"
abbrlink: cec14bfd
date: 2022-03-27 23:35:37
---

### 1.起因

寒假之前，我滴帅部长召哥给我们布置寒假作业：要求我们每个人把上个学期写的电商项目给部署到远程服务器上面。然后他也没告诉我们具体怎么去部署。我就自己在网上找教程，跌跌撞撞摸索出了部署的流程。



### 2.选择服务器

要把Django部署上远程服务器，首先得有一台远程服务器。之前寄导课做实验，给了我们每个人华为云两百大洋的代金券，我才用了几块钱，本来想买华为云的，但是召哥推荐我们买良心云（腾讯云）和套路云（阿里云），然后我就用学生优惠花40大洋买了一年的腾讯云2H2G+40G的轻量应用服务器，性能对我来说还是够用的。

![](https://s2.loli.net/2022/03/27/dIckH4XfZ7LbzRF.png)

镜像我装了centos，至于为什么没用宝塔，主要使我想体验一下比较纯正的服务器体验。



### 3.配置环境

我配置服务器主要参考[腾讯云服务器部署 django项目整个流程 - lvye001 - 博客园 (cnblogs.com)](https://www.cnblogs.com/lvye001/p/10631276.html)这篇文章，剩下的细节和问题都是在网上不停搜索解决的。

#### 1）安装Python3.9.5

在安装python之前，先升级一下包管理工具，在安装一下可能用到的依赖。

```
yum update -y
yum -y groupinstall "Development tools"
yum install openssl-devel bzip2-devel expat-devel gdbm-devel readline-devel sqlite-devel
```

然后再进入/usr/local路径下，

```
cd /usr/local
```

下载Python3.9.5到/usr/local目录

```
wget https://www.python.org/ftp/python/3.9.5/Python-3.9.5.tgz
```

下载有亿点点慢，耐心等等或者也可以在自己的电脑上[下载](https://www.python.org/ftp/python/3.9.5/Python-3.9.5.tgz)好,在上传到服务器上。下载完毕，解压安装

```
tar -zxvf Python-3.9.5.tgz
cd Python-3.9.5
```

编译安装到指定路径

```
./configure --prefix=/usr/local/python3
```

/usr/local/python3 路径可以自己指定，自己记着就行，下边要用到。

安装python3

```
make
make install
```

安装完成之后 建立软链接 添加变量 方便在终端中直接使用python3（这一步很重要，可以为后边步骤提供不少便利）

```
ln -s /usr/local/python3/bin/python3.9 /usr/bin/python3
```

Python3安装完成之后pip3也一块安装完成，不需要再单独安装
一样建立软链接

```
ln -s /usr/local/python3/bin/pip3.9 /usr/bin/pip3
```

全局环境下安装了Python3.9.5，但是一般Django部署到虚拟环境好一点，方便管理package。安装virtuallenv

```
pip3 install virtualenv
```

建立软连接

```
ln -s /usr/local/python3/bin/virtualenv /usr/bin/virtualenv
```

然后在和项目同级目录下，创建虚拟环境

```
mkdir -p /Django/env
cd /Django
virtualenv --python=/usr/bin/python3 pyweb1
```

然后进入/Django/env/pyweb/bin 

启动虚拟环境：

```
cd /Django/env/pyweb1/bin 
source activate
```

#### 2）安装Django包依赖

在windows上，我们开发Django项目的环境可能有非常多的包，我们不可能在服务器上一一手动安装，这时候就需要用到批量安装了

在Windows下，导出pip安装的包到requirements.txt里

```
pip freeze > requirements.txt
```

然后把这个文件上传到服务器，在这个文件同目录下批量安装

```
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt  #这里换了清华的源，加速安装
```

![](https://s2.loli.net/2022/03/28/QKyh41Fc7zrGw6O.png)



#### 3）CentOS7安装MySQL

数据库嘛，没什么好说的，我用的是MySQL

**（1）下载并安装MySQL官方的Yum Repository**

```
wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm
```

**（2） 使用上面的命令就直接下载了安装用的Yum Repository，大概25KB的样子，然后就可以直接yum安装了。**

```
 yum -y install mysql57-community-release-el7-10.noarch.rpm
```

（3）安装MySQL服务器

```
yum -y install mysql-community-server
```

（4）MySQL数据库设置

启动数据库

```
systemctl start  mysqld.service
```

查看MySQL运行状态，如图所示：

```
systemctl status mysqld.service
```

![](https://s2.loli.net/2022/03/28/zugocTL7YyhAO6P.png)

此时MySQL已经开始正常运行，不过要想进入MySQL还得先找出此时root用户的密码，通过如下命令可以在日志文件中找出密码：

```
grep "password" /var/log/mysqld.log
```

![](https://s2.loli.net/2022/03/28/HTp9Jbv2t45oPws.png)

图中圈出来的部分就是默认密码，用如下命令进入数据库：

```
mysql -uroot -p
```

登录时会提示你输入密码，这时密码输入之后时没有显示的。

登陆后，修改密码

```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new password';
```

其中‘new password’替换成你要设置的密码，注意:密码设置必须要大小写字母数字和特殊符号（,/';:等）,不然不能配置成功

（5）开启mysql的远程访问

这个过程比较玄学，容易失败，首先先试试直接授权法

```
grant all privileges on *.* to 'root'@'192.168.0.1' identified by 'password' with grant option;
```

成功后再输入下面两行命令：

```
mysql> flush privileges; 
mysql> exit
```

这是将root账户开放给192.168.0.1也就是本地，在测试阶段，可以选择将上述IP换成%，这样所有IP均可远程访问。



如果上面的方法不生效，再试试修改表法

```
use mysql; 
select host, user from user;
UPDATE user SET Host='localhost' WHERE User='root' AND Host='127' LIMIT 1;
```

先观察表里的root账户的主机是什么，然后再将其修改成%即可，这里是将127改成localhost

![](https://s2.loli.net/2022/03/28/iRmCjkSf7QK56r1.png)

更改后：

![](https://s2.loli.net/2022/03/28/51avspWdV3zx7FH.png)

最后在windows远程测试：

```
mysql -h 101.43.216.170 -P 3306 -uroot -p
```

也可以用可视化的第三方工具（比如navicat）

![](https://s2.loli.net/2022/03/28/MlwL6jTahZkf4gO.png)

![](https://s2.loli.net/2022/03/28/RWKFpUZ1TSLA2yN.png)

如果开放了远程权限，仍然连不上远程MySQL，有可能是服务器的防火墙，我用的腾讯云默认是不开放3306端口，所以得自己在防火墙开放3306端口后我才可以正常访问。

![](https://s2.loli.net/2022/03/28/xIV4iwRrPkTEspt.png)



#### 4）reids的安装（**可选**）

redis是很好用的缓存服务器，可以大大提升缓存资源的访问，安装和使用也很简单，首先先下载redis的包，这里我安装的是6.2.6的版本，因为旧版本编译失败了

```
cd /usr/local
wget http://download.redis.io/releases/redis-6.2.6.tar.gz
tar -zxf redis-6.2.6.tar.gz
cd redis-6.2.6/src/
make install
```

编译安装完成后，就可以启动redis服务了。但是再次之前，还得先设置一下，让redis可以在后台运行

```
cd /usr/local/redis-6.2.6
vim redis.conf
```

打开redis.conf配置文件，修改daemonize，将no修改成yes

![](https://s2.loli.net/2022/03/28/uQgn4r9tYKkChFx.png)

然后保存退出就可以后台启动redis服务了(下面这条命令是在redis解压目录下执行)

```
./src/redis-server ./redis.conf
```

启动服务后，可以查看进程来查看redis是否正常运行

```
ss -tnl
```

![](https://s2.loli.net/2022/03/28/1M6bGDPjyTCA8Ri.png)

redis 的很多设置例如：设置密码，远程访问，持久化等，

然后在这里介绍Django-redis：

```
pip install django-redis
```

直接通过pip就能安装，然后再修改Django项目中的缓存配置

```python
# redis作为Django缓存和session存储后端的标准配置

# Django的缓存配置
CACHES = {
    "default":{
    "BACKEND":"django_redis.cache.RedisCache",
    "LOCATION":"redis://127.0.0.1:6379/9",
    "OPTIONS":{
        "CLIENT_CLASS":"django_redis.client.DefaultClient",
        "CONNECTION_POOL_KWARGS": {"max_connections": 100},
        "PASSWORD": "密码",       # 可不写，密码
        "DECODE_RESPONSES":True   # 可不写，redis get的数据是字符串格式(unicode，而不是bytes)
    }
}}

# 配置session存储3种方式
# 存储在数据库中，如下设置可写可不写，是默认存储模式
SESSION_ENGINE = "django.contrib.sessions.backends.db"
# 存储在缓存中，存储在本机内存中，如果丢失则不能找回，比数据库的方式读写更快
SESSION_ENGINE = "django.contrib.sessions.backends.cache"
# 混合存储：优先从本机内存中存取，如果没有则冲数据库中存取
SESSION_ENGINE = "django.contrib.sessions.backends.cache_db"

SESSION_CACHE_ALIAS = "default"   # default是上面CACHE的字典key
```

或者简单一点的配置：

```python
CACHES = {

    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/2',  # redis所在服务器或容器ip地址
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
    },
}

```

#### 5）安装和配置uwsgi

首先，先安装uwsgi

```
pip install uwsgi
```

配置uwsgi，在项目根目录下(manage.py同层目录)，新建uwsgi.ini，输入以下内容

```
# mysite_uwsgi.ini file

[uwsgi]

# Django-related settings
# 项目根目录的路径
chdir           = /Django/IT_todo                
# Django's wsgi file
#wsgi-file       = demo01/wsgi.py
module = IT_todo.wsgi:application
# uwsgi服务器的角色
master          = true
# 进程数
processes=4
# 线程数
threads=2
# 存放进程编号的文件
pidfile= uwsgi.pid
# the socket (use the full path to be safe
socket=:8081                     #uwsgi服务器的端口，待会在nginx配置中需要用到
#http          = 127.0.0.1:8002	

#stats = 127.0.0.1:9191
# ... with appropriate permissions - may be needed
#chmod-socket    = 664
# clear environment on exit
vacuum          = true
# 日志文件，因为uwsgi可以脱离终端在后台运行，日志看不见。我们以前的runserver是依赖终端的
daemonize=uwsgi.log
buffer-size=65536
# 虚拟环境的目录
pythonpath = /Django/env/pyweb1

```

然后启动uwsgi

```
uwsgi -i uwsgi.ini      # 启动
uwsgi --stop uwsgi.pid  # 停止
```

通过查看日志或者查看端口状态观察uwsgi是否开启成功

```
tail -f uwsgi.log    #在manage.py目录下
#或者
ss -tnl
```

![](https://s2.loli.net/2022/03/28/47P6DaUvOkR9iNA.png)



#### 6）配置Django项目

在成功配置和启动uwsgi服务后，接下来可以开始配置Django项目了。

首先先把Django项目打包丢到服务器的Django目录下再解压，然后修改settings.py文件的内容

（1）收集静态文件

```
DEBUG = False    #调试的时候可以打开

ALLOWED_HOSTS = ['*']

STATIC_ROOT = os.path.join(BASE_DIR,'static')  #静态文件收集 配置路径且将 STATICFILES_DIRS  注释
```



（2）创建数据库

```
mysql -uroot -p  #进入数据库
```

```mysql
CREATE DATABASE table_name CHARACTER SET = UTF8;  #table_name要与Django项目中的保持一致
```



（3）创建数据库缓存表（可选）

如果在Django的缓存配置中，启用了数据表缓存，则需要在服务器上创建一个缓存用的数据表

```
python manage.py createcachetable  #在manage.py目录下
```



（4）初始化数据表

差不多到了最后一步，现在只要初始化一下数据表就可以跑起来了

```
python manage.py makemigrations              #检查数据库是否有变化

python manage.py migrate                      #     数据库迁移
```

完成了上面这些步骤之后，可以使用Django自带的服务器来查看项目是否已经可以运行：

```
python manage.py runserver 0.0.0.0:8000 
```

![](https://s2.loli.net/2022/03/28/5mIrFDRAa7vyiTt.png)

#### 7）安装和配置nginx

切进 该 /usr/local/ 目录下，执行下面命令

```
wget http://nginx.org/download/nginx-1.13.7.tar.gz
```

下载完成后，执行解压命令

```
tar -zxvf nginx-1.13.7.tar.gz
```

进入解压后的nginx-1.13.7文件夹，依次执行以下命令：

```
./configure
make
make install
```

nginx一般默认安装好的路径为/usr/local/nginx
在/usr/local/nginx/conf/中先备份一下nginx.conf文件，以防意外。

```
cp nginx.conf nginx.conf.bak
```

然后打开nginx.conf，把原来的内容删除，直接加入以下内容：

```
user  root;
worker_processes  1;
#
##error_log  logs/error.log;
##error_log  logs/error.log  notice;
##error_log  logs/error.log  info;
#
##pid        logs/nginx.pid;
#
#
events {
    worker_connections  1024;
}
#
#
    http {
        include       mime.types;
        default_type  application/octet-stream;
        sendfile        on;
        keepalive_timeout  65;
        upstream django {
        #django项目的端口号 和uwsgi里面的端口号保存一致
            server 127.0.0.1:8081; # for a web port socket (we'll use this first)
        }
# configuration of the server
server {
# nginx服务的端口号，也就是对外开放的端口号
listen 8001;
# the domain name it will serve for
# 这里可以填写你的ip地址或者域名
server_name 101.43.216.170;
charset     utf-8;
  gzip on;
  gzip_disable "msie6";
  gzip_proxied any;
  gzip_min_length 1k;
  gzip_comp_level 4;
  gzip_types text/plain text/css application/json application/x-javascript text/javascript text/xml image/jpeg image/png image/gif;

# max upload size
client_max_body_size 75M;   # adjust to taste

# Django media
location /media  {
    alias /Django/IT_todo/media;  # 指向django的media目录（让用户能访问到图片等媒体资源）
}

location /static {
    alias /Django/IT_todo/static; # 指向django的static目录
}

# Finally, send all non-media requests to the Django server.
location / {
    uwsgi_pass  django;
    include     uwsgi_params; # the uwsgi_params file you installed
}
}
}

```

配置完成后，启动nginx

```
ln -s /usr/local/nginx/sbin/nginx /usr/local/sbin/                   #建立软连接
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf      #启动nginx
nginx -s reload    　　　　　　　　　　　　　　　　　　　　　　　　　　　 #重启nginx/当然stop是停止
nginx       　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　 #启动nginx
```

这时，通过查看端口开放情况，就可以知道nginx是否启动成功，

![](https://s2.loli.net/2022/03/28/VwEp1PNGJuylxC9.png)

然后再记得去服务器控制面板处开放想对应的端口访问权限，此时，去浏览器里，输入IP+端口即可访问网站：

![](https://s2.loli.net/2022/03/28/atPXyW6EMrAhNko.png)

至此，服务器就可以算搭好了，其他的功能就需要各位自己去探索了。
