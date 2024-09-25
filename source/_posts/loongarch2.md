---
title: 在Loongarch下编译Remmina 1.4.5版本
abbrlink: bf37dab6
cover: https://cdn.lmark.cc/img/300172_origin_20220531_200244.jpg
top_img: https://cdn.lmark.cc/img/300174_origin_20220531_200256.jpg
date: 2024-02-29 21:04:38
tags:
    - Loongarch
    - 编译
    - Remmina
---


## 起因

之前一直使用loongnix作为跳板机，连接宿舍电脑，然后一直使用Remmina连接，后面看了下Remmina的版本，是1.3.3。

![](https://cdn.lmark.cc/img/cb0a69a1e7baa9552b84e293defe6499.JPG)

最新版都已经到了1.4.5了已经，我还在用这么老的版本，太不舒服了（遂编一个试试。全程按照官方文档走，没有什么难点，浅浅记录一下。







## 安装依赖

```bash
sudo apt install build-essential git-core libssh-dev cmake libx11-dev libxext-dev libxinerama-dev \
  libxcursor-dev libxdamage-dev libxv-dev libxkbfile-dev libasound2-dev libcups2-dev libxml2 libxml2-dev \
  libxrandr-dev libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev \
  libxi-dev libavutil-dev libjson-glib-dev\
  libavcodec-dev libxtst-dev libgtk-3-dev libgcrypt20-dev  libpulse-dev \
  libvte-2.91-dev libxkbfile-dev libtelepathy-glib-dev libjpeg-dev \
  libgnutls28-dev libsecret-1-dev libavahi-ui-gtk3-dev libvncserver-dev \
  libappindicator3-dev intltool libsecret-1-dev libwebkit2gtk-4.0-dev libsystemd-dev \
  libsodium-dev libkf5wallet-dev libusb-1.0-0-dev libpcre2-dev

```



报错：

![](https://cdn.lmark.cc/img/QQ%E5%9B%BE%E7%89%8720240228233700.png)

解决方法：

删除libssh-4,再安装libssh-dev









## 卸载原来的remmina

```
 sudo apt purge "remmina*" "libfreerdp*" "libwinpr*" "freerdp*"
```

![](https://cdn.lmark.cc/img/image-20240228222842130.png)





## 编译FreeRDP

### 配置FreerDP进行编译（别忘了包括-dwith_pulse = on）

```bash
cmake -DCMAKE_BUILD_TYPE=Debug -DWITH_SSE2=ON -DWITH_CUPS=on -DWITH_PULSE=on -DCMAKE_INSTALL_PREFIX:PATH=/opt/remmina_devel/freerdp . 
```







### 编译FreeRDP并安装

开始编译

```bash
make && sudo make install
```



报错：

![](https://cdn.lmark.cc/img/image-20240228231231995.png)



原因：

SSE2是x86特有的，而基于Loongarch的3A5000不支持SSE2（提供了一组更高级的优化指令，用于执行单指令多数据操作。），可使用以下命令查看

```bash
cat /proc/cpuinfo
```

![](https://cdn.lmark.cc/img/image-20240228233318259.png)



一个X86服务器：

![](https://cdn.lmark.cc/img/image-20240228233425578.png)



解决方法：

在CMake时将sse2选项改为off

```bash
cmake -DCMAKE_BUILD_TYPE=Debug -DWITH_SSE2=OFF -DWITH_CUPS=on -DWITH_PULSE=on -DCMAKE_INSTALL_PREFIX:PATH=/opt/remmina_devel/freerdp . 
```



编译完成

![](https://cdn.lmark.cc/img/image-20240229001658718.png)





### 使系统动态加载程序了解您安装的新库

```plaintext
echo /opt/remmina_devel/freerdp/lib | sudo tee /etc/ld.so.conf.d/freerdp_devel.conf > /dev/null
sudo ldconfig
```



关于这条命令：

> **解释：**
>
> 这段命令将 `/opt/remmina_devel/freerdp/lib` 目录添加到系统的动态链接器搜索路径中，并更新动态链接器缓存。
>
> **详细说明：**
>
> * **echo /opt/remmina_devel/freerdp/lib | sudo tee /etc/ld.so.conf.d/freerdp_devel.conf > /dev/null**
>
>   * `echo` 命令将 `/opt/remmina_devel/freerdp/lib` 目录路径输出到标准输出。
>   * `sudo` 命令以 root 权限运行后续命令。
>   * `tee` 命令从标准输入读取数据，并将其写入指定的文件（`/etc/ld.so.conf.d/freerdp_devel.conf`）和标准输出。
>   * `>` 重定向标准输出到 `/dev/null`，有效地丢弃它。
>
>   此命令的结果是将 `/opt/remmina_devel/freerdp/lib` 路径添加到 `/etc/ld.so.conf.d/freerdp_devel.conf` 文件中，该文件是动态链接器搜索路径的配置文件。
>
> * **sudo ldconfig**
>
>   * `ldconfig` 命令更新动态链接器缓存，该缓存包含已安装共享库的位置。
>   * `sudo` 命令以 root 权限运行 `ldconfig`，这是必要的，因为 `ldconfig` 需要更新系统范围的缓存。
>
> 执行此命令后，系统将能够在 `/opt/remmina_devel/freerdp/lib` 目录中找到和加载共享库。





### 在/usr/local/bin中创建一个指向可执行文件的符号链接

```bash
sudo ln -s /opt/remmina_devel/freerdp/bin/xfreerdp /usr/local/bin/
```





### 测试FreeRDP能否正常运行

使用命令建立连接：

```bash
xfreerdp +clipboard /sound:rate:44100,channel:2 /v:10.169.1.251 /u:LMark
```

可以看到，正常打开了远程桌面

![](https://cdn.lmark.cc/img/d8922275707cab520684c0a7e5d69cc5.JPG)





## 编译Remmina

### 接下来拉取remmina的源码，并进行编译

```bash
cd ~/remmina_devel
git clone https://gitlab.com/Remmina/Remmina.git
```



配置Remmina进行编译

```bash
cd Remmina
cmake -DCMAKE_BUILD_TYPE=Debug -DWITH_KF5WALLET=on -DCMAKE_INSTALL_PREFIX:PATH=/opt/remmina_devel/remmina -DCMAKE_PREFIX_PATH=/opt/remmina_devel/freerdp --build=build .

# 编译 安装
make && sudo make install

```

报错：![](https://cdn.lmark.cc/img/d6cc67fe248b73ef2cb87941687722f8.JPG)



原因：缺少CURL库

解决方法，安装`libcurl4-openssl-dev`库

```bash
sudo apt install libcurl4-openssl-dev
```



编译安装完成：![](https://cdn.lmark.cc/img/8432bd6f1b6664e402161a414cc1ad30.JPG)







### 创建一个指向可执行文件的符号链接

```
sudo ln -s /opt/remmina_devel/remmina/bin/remmina /usr/local/bin/ 
```



```bash
remmina #直接运行
```

报错：

![](https://cdn.lmark.cc/img/2da2fcfda13d86d36b609f3c595b6eea.JPG)

解决方法：使用root权限运行。



成功运行，并查看当前版本，为最新的1.4.35

![](https://cdn.lmark.cc/img/83f0d4dddee6cb9d291fa22bf470a361.JPG)





## 创建桌面图标

在桌面目录下，创建`remmina.desktop`文件，并写入以下内容：

```
[Desktop Entry]
Encoding=UTF-8
Name=Remmina
Comment="自己编的1.4.35"
Exec=/opt/remmina_devel/remmina/bin/remmina
Icon=/home/loongson/图片/LMark.png
Terminal=false
Type=Application
Categories=Network;
```



效果如下：

![](https://cdn.lmark.cc/img/1c9fadd7510d90cc0843b35690f7a4c8.JPG)



## 制作deb包

编译出软件之后，打deb包是一个很重要的工作

首先安装`dh_make`

```bash
#安装dh_make
sudo apt install dh-make

#安装工具与依赖
sudo apt install build-essential devscripts
```



制作deb包有两种方法：基于源码包制作和基于二进制包制作，我这里选择基于源码制作的方式。

```bash
cd Remmina

# 因为名称里有下划线，所以需要加参数-p
dh_make -p remmina_1.4.5 -f ../Remmina_1.4.5.tar.gz 
```

![](https://cdn.lmark.cc/img/image-20240304113151836.png)

可以发现，源码根目录下多了debian的配置目录

然后直接打包

```bash
dpkg-buildpackage -b -d -uc -us -nc -a loongarch64
```

然后就报错了：

![](https://cdn.lmark.cc/img/image-20240304113402409.png)

根据报错信息可知，是因为这个共享库没有信息，这可能是因为这是本地安装的，而是自己编译或引用的，这需要我们在debian/rules文件里添加编译标识：

![](https://cdn.lmark.cc/img/image-20240304113611670.png)

然后再打包，就可以了

![](https://cdn.lmark.cc/img/image-20240304113648135.png)





## 参考资料

[如何测试你的Linux支持SSE2 - 或代码 (orcode.com)](https://www.orcode.com/question/1032384_kde76f.html)

[Compile on Debian 10 Buster · Wiki · Remmina / Remmina · GitLab](https://gitlab.com/Remmina/Remmina/-/wikis/Compilation/Compile-on-Debian-10-Buster)

[如何制作deb包（基于源码包与二进包）_二进制及库文件打包成deb-CSDN博客](https://blog.csdn.net/mxcai2005/article/details/111238873?spm=1001.2014.3001.5502)

