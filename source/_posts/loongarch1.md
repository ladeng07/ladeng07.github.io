---
title: 为Loongarch移植thunderbird78版本
cover: https://cdn.lmark.cc/img/300138_origin_20220531_195238.jpg
top_img: https://cdn.lmark.cc/img/300142_origin_20220531_195315.jpg
tags:
  - Loongarch
  - 编译
  - thunderbird
abbrlink: ea66db6
date: 2023-10-23 01:45:57
---

## 引言：

Mozilla Thunderbird，非正式中文名称为雷鸟，是由Mozilla基金会研发的一款自由及开放源码的跨平台电邮客户端、新闻阅读器、聚合器以及即时通讯软件。此软件预设安装于Ubuntu之上。Thunderbird可用作电邮、新闻组、聚合器或聊天（XMPP、IRC或Twitter）客户端。其预设安装的Lightning扩展则入了个人资讯管理功能。用户若有需要亦可自行安装其他附加元件。



## 移植环境



软件环境：

- 操作系统：loongnix-19.0





硬件环境：

- CPU：3C5000 CPU

- 核数：四核

- 内存：8GB以上

- 硬盘：256GB以上



## 移植准备

本节操作需要以下依赖:

#### 1.rust-1.65.0-loongarch64

```shell
# 下载rustup以及rust相关二进制包
export RUSTUP_DIST_SERVER=https://rust-lang.loongnix.cn
export RUSTUP_UPDATE_ROOT=https://rust-lang.loongnix.cn/rustup
curl --proto '=https' --tlsv1.2 -sSf https://rust-lang.loongnix.cn/rustup-init.sh | sh

# 使用rustup安装1.65.0版本rust
rustup toolchain install 1.65.0
rustup default 1.65.0-loongarch64-unknown-linux-gnu
```





####  2.cbindgen-0.14.3

```shell
# 卸载旧版本cbindgen
sudo apt remove --purge cbindgen

#安装0.14.3版本cbindgen
cargo install --version 0.14.3 cbindgen
```





#### 3.botan

```
#安装新版本botan
sudo apt install libbotan
```





## 移植步骤：

```shell
#以下操作均在LoongArch虚拟机上进行


# 准备编译环境:
sudo apt-get update
#sudo apt-get install git mercurial python make autoconf libtool pkg-config
sudo apt-get build-dep thunderbird

#编译参数
 cat > mozconfig << "EOF"
ac_add_options --disable-necko-wifi
ac_add_options --with-system-libevent
#ac_add_options --with-system-libvpx
#ac_add_options --with-system-nspr
#ac_add_options --with-system-nss
#ac_add_options --with-system-icu
ac_add_options --prefix=/usr
ac_add_options --libdir=/usr/lib64
ac_add_options --target=loongarch64-unknown-linux-gnu
ac_add_options --enable-application=comm/mail
ac_add_options --disable-jit
ac_add_options --disable-crashreporter
ac_add_options --disable-updater
ac_add_options --disable-debug
ac_add_options --disable-debug-symbols
ac_add_options --disable-tests
ac_add_options --enable-optimize=-O2
ac_add_options --enable-official-branding
ac_add_options --enable-system-ffi
ac_add_options --enable-system-pixman
#ac_add_options --with-system-jpeg
ac_add_options --with-system-png
ac_add_options --with-system-zlib
ac_add_options --without-wasm-sandboxed-libraries
#ac_add_options --with-system-webp
ac_add_options --disable-strip
ac_add_options --disable-jemalloc
ac_add_options --disable-install-strip


# 克隆仓库并进入源码目录:
git clone --depth=1 --branch=1%78.14.0-1_deb10u1 https://salsa.debian.org/mozilla-team/thunderbird.git


# 开始编译并静待编译完成
# 选择Loongarch为目标架构
dpkg-buildpackage -b -d -uc -us -nc -a loongarch64

# 查看编译成果:
ls -l ../

# 在系统中安装编译好的 thunderbird78 软件:
sudo apt install -y  
```





## 测试和验证：

完成位于源码 testing 目录下的自带测试用例编译和运行

注意：需要在编译时加入`ac_add_options --enable-debug`参数，编译完成的二进制文件才能正常运行测试



### XPCShell

```shell
# 在项目根目录下
./mach xpcshell-test testing
```



### Mochitest

```shell
./mach mochitest testing
```



### Crashtest

```
./mach crashtest dom/media/tests/crashtests
```



### GTest

```
./mach gtest testing
```



### CUTest

```
./mach cppunittest
```



### Chrome Tests

```
./mach test toolkit/content/tests/chrome/
```





## 已知问题和限制：



### 移植中可能出现的问题：

![](http://cdn.lmark.cc/img/image-20230818092326617.png)

![](http://cdn.lmark.cc/img/image-20230818092354677.png)

![](http://cdn.lmark.cc/img/image-20230818092409646.png)

![](http://cdn.lmark.cc/img/image-20230818092426168.png)


