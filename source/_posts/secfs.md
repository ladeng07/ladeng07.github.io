---
title: 计算机系统工程SecFs实验一
cover: 'https://cdn.lmark.cc/img/300249_origin_20220531_202313.jpg'
top_img: 'https://cdn.lmark.cc/img/300250_origin_20220531_202337.jpg'
tags:
  - 计算机系统工程
  - 实验
abbrlink: cc742ad6
date: 2023-05-07 16:10:59
---

## 前言

这个学期（大二下）我在郝xd的撺掇下，选了曲老师的《计算机系统工程》这门课。对标的是MIT的6.033课程，参考内容目录[MIT6.033 Computer System Design | 计算机系统设计 | Miigon's blog](https://blog.miigon.net/posts/mit6033-computer-system-design/)
这门课在国内各大高校同类型的课基本找不到(可能不叫这个名字吧)，就连这本课本的中译版正版都很难找到(我只买到了盗版)。就是这么一门神秘的课程，却讲了许多计算机系统设计的基本原则，可谓是干货满满。用曲老师的话来说:这门课可能是大学四年中，计算机专业最实用的课。在上了半个学期后，我是深深体会到了。故想写一篇博客记录一下这节课的实验课，以及自己的一些想法。



## 实验背景

世界正在慢慢变得更加紧密，并且越来越需要让你的所有数据都具有可用性、可共享性、安全性和可 复制性，由于这些需求，Dropbox 和 Google Drive 等云服务应运而生，并取得了巨大成功。他们获取你的 文件并将它们透明地托管在“云”中。但是，用户在此过程中失去了对数据的一些控制。你必须信任公司 能够保证数据安全；你必须相信他们不会查看你的数据，不会共享它，也不会丢失它。在本实验中，要求 开发一个文件系统，这个系统允许用户将数据存储在远程文件服务器上，但是用户无需信任该服务器。



## 实验介绍

本实验的目的是让你了解如何构建安全、相对复杂且有用的软件。你将构建一个远程文件系统 SecFS， 它在面对完全不受信任的服务器时能提供机密性和完整性。 我们为你提供了一个具有很少功能和更少安全保证的框架为基础进行本实验。你需要扩展这些功能来 实现线面的实验目标。我们提供的代码是 SUNDR 序列化版本的一部分。你应该阅读论文 SUNDR ，因为本 实验中的许多概念和原理与之相似。为了完成本实验，你需要实现其余部分以支持整个序列化 SUNDR，并 添加机密性保证（文件的读取保护）。

实验官网：[6.858 Spring 2020 Final assignment (mit.edu)](https://css.csail.mit.edu/6.858/2020/labs/lab5-2020.html)





## 实验内容

### 环境配置

本实验需要python3环境，这还是有点坑爹的。

```shell
apt-get install -y python3-venv libfuse-dev python3-dev
```

然后克隆SecFS文件系统的仓库，并安装

```shell
git clone https://github.com/mit-pdos/secfs-skeleton.git secfs
cd secfs
./setup.sh
```

出现以下提示即说明安装成功，之后只需要使用start.sh即可启动文件系统

![image-20230414103810394](https://cdn.lmark.cc/img/image-20230414103810394.png)

### 文件目录

![image-20230414111518317](https://cdn.lmark.cc/img/image-20230414111518317.png)

![image-20230414111557373](https://cdn.lmark.cc/img/image-20230414111557373.png)

### 代码预览

#### ./secfs/access.py

```python
import secfs.fs
from secfs.types import I, Principal, User, Group

def can_read(user, i):
    """
    如果给定user可以读取给定的i，则返回True。
    """
    return True

def can_write(user, i):
    """
    如果给定user可以修改给定的i，则返回True。
    """
    if not isinstance(user, User):
        raise TypeError("{} is not a User, is a {}".format(user, type(user)))

    if not isinstance(i, I):
        raise TypeError("{} is not an I, is a {}".format(i, type(i)))

    # 如果i属于某个user，而这个user不是你，你就不能写入
    if i.p.is_user() and i.p != user:
        return False

    # 如果一个group拥有i，而你不在这个group中，你就不能写入
    if i.p.is_group() and (i.p not in secfs.fs.groupmap or user not in secfs.fs.groupmap[i.p]):
        return False

    return True

def can_execute(user, i):
    """
    如果给定user可以执行给定的i，则返回True。
    """
    if not isinstance(user, User):
        raise TypeError("{} is not a User, is a {}".format(user, type(user)))

    if not secfs.access.can_read(user, i):
        return False

    # 校验x位
    node = secfs.fs.get_inode(i)
    return node.ex
```

#### ./secfs/crypto.py

```python
# 该文件实现了SecFS的加密部分

from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.fernet import Fernet
from secfs.types import I, Principal, User, Group

keys = {}

def register_keyfile(user, f):
    """
    为给定user注册私钥，用于签名/解密。
    """
    if not isinstance(user, User):
        raise TypeError("{} is not a User, is a {}".format(user, type(user)))

    with open(f, "rb") as key_file:
        k=key_file.read()
        keys[user] = serialization.load_pem_private_key(
            k,
            password=None,
            backend=default_backend()
        )

def decrypt_sym(key, data):
    """
    用给定的密钥解密给定的数据。
    """
    f = Fernet(key)
    return f.decrypt(data)

def encrypt_sym(key, data):
    """
    用给定的密钥加密给定的数据。
    """
    f = Fernet(key)
    return f.encrypt(data)

def generate_key(user):
    """
    确保私钥/公钥存在于指定user的user-$uid-key.pem中，如果没有，请创建一个，并将私钥存储在磁盘上。
    最终，返回user的pem编码公钥。
    """
    if not isinstance(user, User):
        raise TypeError("{} is not a User, is a {}".format(user, type(user)))

    from cryptography.hazmat.primitives.asymmetric import rsa
    from cryptography.hazmat.primitives import serialization
    from cryptography.hazmat.backends import default_backend

    f = "user-{}-key.pem".format(user.id)

    import os.path
    if not os.path.isfile(f):
        private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048,
            backend=default_backend()
        )

        pem = private_key.private_bytes(
           encoding=serialization.Encoding.PEM,
           format=serialization.PrivateFormat.TraditionalOpenSSL,
           encryption_algorithm=serialization.NoEncryption()
        )

        with open(f, "wb") as key_file:
            key_file.write(pem)

        public_key = private_key.public_key()
    else:
        with open(f, "rb") as key_file:
            public_key = serialization.load_pem_private_key(
                key_file.read(),
                password=None,
                backend=default_backend()
            ).public_key()

    return public_key.public_bytes(
       encoding=serialization.Encoding.PEM,
       format=serialization.PublicFormat.SubjectPublicKeyInfo
    )
```

#### ./secfs/fs.py

```python
# 该文件实现了inode级别的文件系统操作。

import time
import secfs.crypto
import secfs.tables
import secfs.access
import secfs.store.tree
import secfs.store.block
from secfs.store.inode import Inode
from secfs.store.tree import Directory
from cryptography.fernet import Fernet
from secfs.types import I, Principal, User, Group

# usermap包含一个从user ID到根据/.users对应的公钥的映射
usermap = {}
# groupmap包含一个从group ID到/.groups的成员列表的映射
groupmap = {}
# owner 是拥有当前共享的user主体
owner = None
# root_i 是当前共享root节点的i
root_i = None

def get_inode(i):
    """
    根据inode的i获取inode的快捷方式。
    """
    ihash = secfs.tables.resolve(i)
    if ihash == None:
        raise LookupError("asked to resolve i {}, but i does not exist".format(i))

    return Inode.load(ihash)

def init(owner, users, groups):
    """
    Init将初始化一个新的共享root作为给定的user主体。这包括在根目录中添加.和..。.users和.groups文件，分别列出可信user公钥和group成员。这个函数只会分配共享的根目录，但不会将它映射到服务器上的任何特定共享。新root节点的i会被返回，这样调用者就可以完成这项工作。
    """
    if not isinstance(owner, User):
        raise TypeError("{} is not a User, is a {}".format(owner, type(owner)))

    node = Inode()
    node.kind = 0
    node.ex = True
    node.ctime = time.time()
    node.mtime = node.ctime

    ihash = secfs.store.block.store(node.bytes())
    root_i = secfs.tables.modmap(owner, I(owner), ihash)
    if root_i == None:
        raise RuntimeError

    new_ihash = secfs.store.tree.add(root_i, b'.', root_i)
    secfs.tables.modmap(owner, root_i, new_ihash)
    new_ihash = secfs.store.tree.add(root_i, b'..', root_i)
    secfs.tables.modmap(owner, root_i, new_ihash)
    print("CREATED ROOT AT", new_ihash)

    init = {
        b".users": users,
        b".groups": groups,
    }

    import pickle
    for fn, c in init.items():
        bts = pickle.dumps(c)

        node = Inode()
        node.kind = 1
        node.size = len(bts)
        node.mtime = node.ctime
        node.ctime = time.time()
        node.blocks = [secfs.store.block.store(bts)]

        ihash = secfs.store.block.store(node.bytes())
        i = secfs.tables.modmap(owner, I(owner), ihash)
        link(owner, i, root_i, fn)

    return root_i

def _create(parent_i, name, create_as, create_for, isdir):
    """
    _create分配一个新文件，并将其链接到指定名称的目录parent_i中。新文件由create_for拥有，但使用create_as的凭据创建。这种区别是必要的，因为在作为group创建文件时，最后的i需要user主体。
    """
    if not isinstance(parent_i, I):
        raise TypeError("{} is not an I, is a {}".format(parent_i, type(parent_i)))
    if not isinstance(create_as, User):
        raise TypeError("{} is not a User, is a {}".format(create_as, type(create_as)))
    if not isinstance(create_for, Principal):
        raise TypeError("{} is not a Principal, is a {}".format(create_for, type(create_for)))

    assert create_as.is_user() # 仅users可创建
    assert create_as == create_for or create_for.is_group() # 为你自己或group创建

    if create_for.is_group() and create_for not in groupmap:
        raise PermissionError("cannot create for unknown group {}".format(create_for))

    # 该检查由下面的link()执行，但最好能尽快失败
    if not secfs.access.can_write(create_as, parent_i):
        if parent_i.p.is_group():
            raise PermissionError("cannot create in group-writeable directory {0} as {1}; user is not in group".format(parent_i, create_as))
        else:
            raise PermissionError("cannot create in user-writeable directory {0} as {1}".format(parent_i, create_as))

    node = Inode()
    node.ctime = time.time()
    node.mtime = node.ctime
    node.kind = 0 if isdir else 1
    node.ex = isdir

    # FIXME
    #
    # 在这里，你需要：
    #
    # - 在服务器上存储新创建的 inode (node.bytes())
    # - 将该块映射到user拥有的 i
    # - 如果创建目录，则为之创建条目.和 ..
    # - 如果 create_for 是一个group，您还必须为该group创建一个group i，并将其指向user i
    # - 调用 link() 将新 i 链接到 parent_i 中给定名称的目录
    #
    # 还要确保你*返回新 inode 的最终 i*！
    return I(User(0), 0)

def create(parent_i, name, create_as, create_for):
    """
    创建一个新文件。
	查看secfs.fs._create
    """
    return _create(parent_i, name, create_as, create_for, False)

def mkdir(parent_i, name, create_as, create_for):
    """
    创建一个新目录。
    查看secfs.fs._create
    """
    return _create(parent_i, name, create_as, create_for, True)

def read(read_as, i, off, size):
    """
    Read从文件i中读取[off:off+size]字节。
    """
    if not isinstance(i, I):
        raise TypeError("{} is not an I, is a {}".format(i, type(i)))
    if not isinstance(read_as, User):
        raise TypeError("{} is not a User, is a {}".format(read_as, type(read_as)))

    if not secfs.access.can_read(read_as, i):
        if i.p.is_group():
            raise PermissionError("cannot read from group-readable file {0} as {1}; user is not in group".format(i, read_as))
        else:
            raise PermissionError("cannot read from user-readable file {0} as {1}".format(i, read_as))

    return get_inode(i).read()[off:off+size]

def write(write_as, i, off, buf):
    """
    Write将给定的字节写入文件i的给定偏移量处。
    """
    if not isinstance(i, I):
        raise TypeError("{} is not an I, is a {}".format(i, type(i)))
    if not isinstance(write_as, User):
        raise TypeError("{} is not a User, is a {}".format(write_as, type(write_as)))

    if not secfs.access.can_write(write_as, i):
        if i.p.is_group():
            raise PermissionError("cannot write to group-owned file {0} as {1}; user is not in group".format(i, write_as))
        else:
            raise PermissionError("cannot write to user-owned file {0} as {1}".format(i, write_as))

    node = get_inode(i)

    # TODO: 这显然是愚蠢的——不应该删除没有更改的块(blocks)
    bts = node.read()

    # write还允许我们扩展文件
    if off + len(buf) > len(bts):
        bts = bts[:off] + buf
    else:
        bts = bts[:off] + buf + bts[off+len(buf):]

    # 更新inode
    node.blocks = [secfs.store.block.store(bts)]
    node.mtime = time.time()
    node.size = len(bts)

    # 将新的哈希值放入树中
    new_hash = secfs.store.block.store(node.bytes())
    secfs.tables.modmap(write_as, i, new_hash)

    return len(buf)

def readdir(i, off):
    """
    返回目录i中的is的列表。
    每个返回的列表项都是一个由i和索引组成的元组。该索引可用于在以后请求该列表的后缀。
    """
    dr = Directory(i)
    if dr == None:
        return None

    return [(i, index+1) for index, i in enumerate(dr.children) if index >= off]

def link(link_as, i, parent_i, name):
    """
    将给定的i添加到给定的父目录下。
    """
    if not isinstance(parent_i, I):
        raise TypeError("{} is not an I, is a {}".format(parent_i, type(parent_i)))
    if not isinstance(i, I):
        raise TypeError("{} is not an I, is a {}".format(i, type(i)))
    if not isinstance(link_as, User):
        raise TypeError("{} is not a User, is a {}".format(link_as, type(link_as)))
    if not secfs.access.can_write(link_as, parent_i):
        if parent_i.p.is_group():
            raise PermissionError("cannot create in group-writeable directory {0} as {1}; user is not in group".format(parent_i, link_as))
        else:
            raise PermissionError("cannot create in user-writeable directory {0} as {1}".format(parent_i, link_as))

    parent_ihash = secfs.store.tree.add(parent_i, name, i)
    secfs.tables.modmap(link_as, parent_i, parent_ihash)
```

#### ./secfs/tables.py

```python
# 此文件包含处理 i 映射的解析和修改的所有代码。 这包括组句柄间接和 VSL 验证，因此该文件有些毛茸茸(?)。
# 注意：ihandle 是主体（principle）itable 的hash，它保存从 inumbers（i 的第二部分）到 inode 散列的主体映射。

import pickle
import secfs.store
import secfs.fs
from secfs.types import I, Principal, User, Group

# current_itables代表文件系统的itables的当前视图
current_itables = {}

# 服务器连接句柄在挂载时由 secfs-fuse 传递给我们
server = None
def register(_server):
    global server
    server = _server

def pre(refresh, user):
    """
    在所有user文件系统操作之前调用，即是在我们获得专有服务器锁之后。
    """

    if refresh != None:
        # 刷新 usermap 和 groupmap
        refresh()

def post(push_vs):
    if not push_vs:
        # 当创建根目录时，我们不应该推送VS，你可能会想把这个留在这里，把你的post()代码而不是pass放在下面。(?)
        return
    pass

class Itable:
    """
    itable保存了一个特定主体的映射，对于user，是从inumber(i元组中的第二个元素)到inode哈希的映射，对于groups，是从inumber到groups的user的i的映射。
    """
    def __init__(self):
        self.mapping = {}

    def load(ihandle):
        b = secfs.store.block.load(ihandle)
        if b == None:
            return None

        t = Itable()
        t.mapping = pickle.loads(b)
        return t

    def bytes(self):
        return pickle.dumps(self.mapping)

def resolve(i, resolve_groups = True):
    """
    将给定的i解析为inode哈希。如果没有设置resolve_groups，则gruop只会被解析给它们的user i，而不会进一步解析。

    特别的，对于某些i=(principle, inumber)，我们首先找到主体的itable，然后找到该表的inumber-th元素，如果主体是user，则返回该元素的值。如果不是，我们将返回一个group i，再次解析它以获得最后一个user设置的ihash来写入group i 
    """
    if not isinstance(i, I):
        raise TypeError("{} is not an I, is a {}".format(i, type(i)))

    principal = i.p

    if not isinstance(principal, Principal):
        raise TypeError("{} is not a Principal, is a {}".format(principal, type(principal)))

    if not i.allocated():
        # 有人试图查找一个尚未分配的i
        return None

    global current_itables
    if principal not in current_itables:
        # User还没有一个itable
        return None 

    t = current_itables[principal]

    if i.n not in t.mapping:
        raise LookupError("principal {} does not have i {}".format(principal, i))

    # 可用性测试
    if principal.is_group() and not isinstance(t.mapping[i.n], I):
        raise TypeError("looking up group i, but did not get indirection ihash")
    if principal.is_user() and isinstance(t.mapping[i.n], I):
        raise TypeError("looking up user i, but got indirection ihash")

    if isinstance(t.mapping[i.n], I) and resolve_groups:
        # 查找group i
        # 根据间接法
        return resolve(t.mapping[i.n])

    return t.mapping[i.n]

def modmap(mod_as, i, ihash):
    """
    更改或分配i，使它指向ihash。
    
    如果i.allocated()为假（即i被创建时没有i-number），将为主体i.p分配一个新的i-number。这个函数很复杂，因为i可能是group i，在这种情况下，我们需要：
    
    1.分配一个i作为mod_as
    2.分配/更改group i以指向上面的新i
    
    modmap返回存在映射的i，如果传递的i没有分配，则填充i.n
    """
    if not isinstance(i, I):
        raise TypeError("{} is not an I, is a {}".format(i, type(i)))
    if not isinstance(mod_as, User):
        raise TypeError("{} is not a User, is a {}".format(mod_as, type(mod_as)))

    assert mod_as.is_user() # 只有真正的user才能修改

    if mod_as != i.p:
        print("trying to mod object for {} through {}".format(i.p, mod_as))
        assert i.p.is_group() # 如果不是为了self，那么一定是为了group

        real_i = resolve(i, False)
        if isinstance(real_i, I) and real_i.p == mod_as:
            # 我们最近更新了文件，所以我们只需要更新i。
            # 根本不需要改变group i。
            # 这是一个优化。
            i = real_i
        elif isinstance(real_i, I) or real_i == None:
            if isinstance(ihash, I):
                # 调用者已经为我们完成了工作，所以我们只需要链接group条目。
                print("mapping", i, "to", ihash, "which again points to", resolve(ihash))
            else:
                # 为mod_as分配一个新条目，然后继续执行，就好像ihash就是那个新的i。
				# XXX:没有必要为此发送两个VS
                _ihash = ihash
                ihash = modmap(mod_as, I(mod_as), ihash)
                print("mapping", i, "to", ihash, "which again points to", _ihash)
        else:
            # 这不是一个 group i!
            # User试图覆盖他们不拥有的东西!
            raise PermissionError("illegal modmap; tried to mod i {0} as {1}".format(i, mod_as))

    # 查找或创建主体itable
    t = None
    global current_itables
    if i.p not in current_itables:
        if i.allocated():
            # 这是出乎意料的;
            # User没有一个itable对象，但给出了一个编号
            raise ReferenceError("itable not available")
        t = Itable()
        print("no current list for principal", i.p, "; creating empty table", t.mapping)
    else:
        t = current_itables[i.p]

    # 查找(或分配)我们想要修改的i的编号
    if not i.allocated():#为什么要直接传root_i?这个函数就是为了搞定这个的，因为之前已经
        inumber = 0	  #为root_i分配了用户法则和inumber，这里是为同一个用户法则，分配新的inumber，然后建立新的inumber与ihash映射
        while inumber in t.mapping:
            inumber += 1
        i.allocate(inumber)
    else:
        if i.n not in t.mapping:
            raise IndexError("invalid inumber")

    # 修改这个条目，并将更新后的itable存储回来
    if i.p.is_group():
        print("mapping", i.n, "for group", i.p, "into", t.mapping)
    t.mapping[i.n] = ihash # 对于groups，ihash即是i
    current_itables[i.p] = t
    return i
```

#### ./secfs/types.py

```python
class Principal:
    @property
    def id(self):
        return -1
    def is_user(self):
        return False
    def is_group(self):
        return False

class User(Principal):
    def __init__(self, uid):
        if not isinstance(uid, int):
            raise TypeError("id {} is not an int, is a {}".format(uid, type(uid)))

        self._uid = uid
    def __getstate__(self):
        return (self._uid, False)
    def __setstate__(self, state):
        self._uid = state[0]
    @property
    def id(self):
        return self._uid
    def is_user(self):
        return True
    def __eq__(self, other):
        return isinstance(other, User) and self._uid == other._uid
    def __str__(self):
        return "<uid={}>".format(self._uid)
    def __hash__(self):
        return hash(self._uid)

class Group(Principal):
    def __init__(self, gid):
        if not isinstance(gid, int):
            raise TypeError("id {} is not an int, is a {}".format(gid, type(gid)))

        self._gid = gid
    def __getstate__(self):
        return (self._gid, True)
    def __setstate__(self, state):
        self._gid = state[0]
    @property
    def id(self):
        return self._gid
    def is_group(self):
        return True
    def __eq__(self, other):
        return isinstance(other, Group) and self._gid == other._gid
    def __str__(self):
        return "<gid={}>".format(self._gid)
    def __hash__(self):
        return hash(self._gid)

class I:
    def __init__(self, principal, inumber=None):
        if not isinstance(principal, Principal):
            raise TypeError("{} is not a Principal, is a {}".format(principal, type(principal)))
        if inumber is not None and not isinstance(inumber, int):
            raise TypeError("inumber {} is not an int, is a {}".format(inumber, type(inumber)))

        self._p = principal
        self._n = inumber
    def __getstate__(self):
        return (self._p, self._n)
    def __setstate__(self, state):
        self._p = state[0]
        self._n = state[1]
    @property
    def p(self):
        return self._p
    @property
    def n(self):
        return self._n
    def allocate(self, inumber):
        if self._n is not None:
            raise AssertionError("tried to re-allocate allocated I {} with inumber {}".format(self, inumber))
        self._n = inumber
    def allocated(self):
        return self._n is not None
    def __eq__(self, other):
        return isinstance(other, I) and self._p == other._p and self._n == other._n
    def __str__(self):
        if self.allocated():
            return "({}, {})".format(self._p, self._n)
        return "({}, <unallocated>)".format(self._p)
    def __hash__(self):
        if not self.allocated():
            raise TypeError("cannot hash unallocated i {}".format(self))
        return hash((self._p, self._n))
```

#### ./secfs/store/block.py

```python
# 该文件处理与SecFS服务器的blob存储的所有交互。

# 服务器连接句柄在装载时由secfs-fuse传递给我们
server = None
def register(_server):
    global server
    server = _server

def store(blob):
    """
    将给定的blob存储在服务器中，并返回内容的hash。
    """
    global server
    return server.store(blob)

def load(chash):
    """
    从服务器加载具有给定内容哈希的blob。
    """
    global server
    blob = server.read(chash)

    # RPC层将对二进制数据进行base64编码
    if "data" in blob:
        import base64
        blob = base64.b64decode(blob["data"])

    return blob
```

#### ./secfs/store/inode.py

```python
import pickle
import secfs.store.block
import secfs.crypto

class Inode:
    def __init__(self):
        self.size = 0
        self.kind = 0 # 0是目录，1是文件
        self.ex = False
        self.ctime = 0
        self.mtime = 0
        self.blocks = []

    @staticmethod
    def load(ihash):
        """
        根据一个inode的ihandle，加载其相关的所有元信息。
        """
        d = secfs.store.block.load(ihash)
        if d == None:
            return None

        n = Inode()
        n.__dict__.update(pickle.loads(d))
        return n

    def read(self):
        """
        读取该inode的块内容。
        """
        return b"".join([secfs.store.block.load(b) for b in self.blocks])

    def bytes(self):
        """
       序列化该inode并返回相应的字节串。
        """
        b = self.__dict__
        return pickle.dumps(b)
```



#### ./secfs/store/tree.py

```python
# 该文件提供了操作SecFS中的目录的功能。

import pickle
import secfs.fs
import secfs.crypto
import secfs.tables
import secfs.store.block
from secfs.store.inode import Inode
from secfs.types import I, Principal, User, Group

def find_under(dir_i, name):
    """
    尝试在i处的目录下查找给定名称的文件或目录的i。
    """
    if not isinstance(dir_i, I):
        raise TypeError("{} is not an I, is a {}".format(dir_i, type(dir_i)))

    dr = Directory(dir_i)
    for f in dr.children:
        if f[0] == name:
            return f[1]
    return None

class Directory:
    """
    目录用于封送和解封送目录inode的内容。要加载一个目录，必须给出一个i。
    """
    def __init__(self, i):
        if not isinstance(i, I):
            raise TypeError("{} is not an I, is a {}".format(i, type(i)))

        self.inode = None
        self.children = []

        self.inode = secfs.fs.get_inode(i)
        if self.inode.kind != 0:
            raise TypeError("inode with ihash {} is not a directory".format(secfs.tables.resolve(i)))

        cnt = self.inode.read()
        if len(cnt) != 0:
            self.children = pickle.loads(cnt)

    def bytes(self):
        return pickle.dumps(self.children)

def add(dir_i, name, i):
    """
    更新目录的inode内容，在给定名称下包含一个表示i的项。
    """
    if not isinstance(dir_i, I):
        raise TypeError("{} is not an I, is a {}".format(dir_i, type(dir_i)))
    if not isinstance(i, I):
        raise TypeError("{} is not an I, is a {}".format(i, type(i)))

    dr = Directory(dir_i)
    for f in dr.children:
        if f[0] == name:
            raise KeyError("asked to add i {} to dir {} under name {}, but name already exists".format(i, dir_i, name))

    dr.children.append((name, i))
    new_dhash = secfs.store.block.store(dr.bytes())
    dr.inode.blocks = [new_dhash]
    new_ihash = secfs.store.block.store(dr.inode.bytes())
    return new_ihash
```



### 实验任务

#### （1）Enable file/directory creation

​	在文件 secfs/fs.py 中，有一个名为create 的方法，它负责在文件系统中创建新文件和目录，并负责分 配和配置 inode，然后将其存储在服务器上，为新文件设置适当的 i，并将其链接到其父目录。如果你打开 这个文件，你会发现有一部分代码缺失了，缺失的部分用了一个大的 FIXME 注释块标识，解释丢失的代码 应该做什么。 

​	在补写代码之前，你将无法创建新文件或目录，即使是 root，但可以查找现有文件或目录（例如.users 或.groups）。因此，从这里开始我们的实验。 

​	为了补写代码，你首先应该尝试理解 secfs.tables.modmap 函数，这个函数修改 i-tables 将 i 映射为块哈 希。这是 SecFS 的关键函数，并在整个代码中广泛使用。要添加.和 ..，你应该查看 secfs.store.tree.add 函 数, 然后为了链接最后的 i，你将用到 secfs.fs.link 函数 （或者是 link，link 和create 在同一个文件中）。要 在服务器上存储数据，你需要使用相对简单的 secfs.store.block.store 函数。

​	成功实施_create 后，你应该能在文件系统的根目录中以 root 身份创建新文件和目录。

>In the file `secfs/fs.py`, there is a function called `_create`. It is used to create new files and directories in the file system, and is responsible for allocating and configuring an inode, storing it on the server, setting up an appropriate `i` for the new file, and linking it into its parent directory. If you open it up, you will see that a chunk of the code is missing, denoted by a large `FIXME` comment block explaining what the missing code is supposed to do.
>
>Until this code is filled in, you will be unable to create new files or directories, even as root, but looking up existing ones will work as expected (e.g. `.users` or `.groups`). This is therefore a natural place to start your implementation.
>
>In order to write this code, you should first try to build a cursory understanding of the `secfs.tables.modmap` function, which modifies the `i`-tables that map `i`s to block hashes. This is a critical component of SecFS, and is used extensively throughout the code. For adding `.` and `..`, you should look at `secfs.store.tree.add`, and for linking in the final `i`, you will need to use `secfs.fs.link` (or just `link` since `_create` is in the same file). To store data on the server, you will also need to use the relatively straightforward `secfs.store.block.store`. You may find `secfs.fs.init` a useful starting point.
>
>When you have implemented `_create` successfully, you should be able to create new files and directories as root in the root of the file system. You may also have to come back to this function when you implement multi-user support in Exercise 2 below.



#### （2）Multi-client support

你可能已经注意到，在出现第二个客户端之前可以正常运行 test.sh。当第二个客户端尝试访问已挂载 文件系统中的任何文件时，会出现错误：

```shell
LookupError: asked to resolve i ((0,False),0), but i does not exist
```

​	出现错误是因为第二个客户机没有访问文件系统的 i-tables，因为它们目前只存储在第一个客户机的内 存中。在 SUNDR 中，这些 i-tables 被持久保存在服务器上，通过对描述文件系统的版本结构（或 VSes）更 改 i 来更改对用户和组的 i-tables 。这些文件从服务器下载，然后用于验证本地下载的 i-tables。当文件系 统被更改时，一个新的、已签名的 VS 被上传到服务器，以便其他客户端可以看到更改。 

​	具体来说，实验任务 2 是为了能够在单独的挂载点上启动第二个 SecFS 客户机，并能够运行命令 ls -la 来显示.users 和.groups 的文件。要完成本实验，你必须用 SUNDR 的版本结构列表替换 secfs/tables.py 中的 current_itables 映射，该映射将用户和组句柄映射到文件哈希（参见论文的第 3.3.2 节）。这个列表必须与 服务器通信，以便其他客户机可以下载它，然后使用这些映射来探索文件系统。 

​	当你可以使用第二个客户机读取文件系统中的文件时，尝试在一个客户机中创建几个文件(以root身份)， 并验证在另一个客户机挂载后运行 ls 时该文件是否出现。

> As you may have noticed, running `test.sh` works fine until a second client appears. When this second client attempts to access any file in the mounted file system, an error is given:
>
> ```
> LookupError: asked to resolve i ((0, False), 0), but i does not exist
> ```
>
> This happens because the second client does not have access to the file system's `i`-tables, since these are (currently) only stored in the memory of the first client. In SUNDR, these `i`-tables are persisted on the server, and changes to the `i`-tables of users and groups are announced through Version Structures (or VSes) that describe *changes* to the file system. These are downloaded from the server, verified, and then used to verify downloaded `i`-tables locally. When the file system is changed, a new, signed VS is uploaded to the server, so that other clients can see the change.
>
> Specifically, your goal for the first exercise is to be able to start a second SecFS client (see "Interacting with the file system") on a separate mount point, and be able to run `ls -la` to reveal the `.users` and `.groups` files. To do so, you will have to replace the `current_itables` map in `secfs/tables.py`, which maps user and group handles to file hashes, with SUNDR's Version Structure List (see section 3.3.2 of the paper). This list must be communicated to the server so that other clients can download it, and then use those mappings to explore the file system.
>
> You may want to first get the list working, and only afterwards add cryptographic signing and verification of the VSes. You should consider implementing your cryptographic operations in `secfs/crypto.py`. Public keys for users are available in `secfs.fs.usermap` (key is a `User`).
>
> When you can read files in the file system using a second client, try to create a few file (as root) in one client, and verify that this file then appears when running `ls` in the other client's mountpoint.



#### 实验提示

​	实验中会用到 SUNDR 论文中的内容。我们在此处给出了从 SUNDR 论文中的图 2 和图 3 到 SecFS 中 文件的映射：

| structure         | location                                                     |
| :---------------- | :----------------------------------------------------------- |
| i-tables          | `secfs/tables.py`                                            |
| inodes            | `secfs/store/inode.py`                                       |
| directory block   | `secfs/store/tree.py`                                        |
| version structure | has not been implemented, but should probably replace `current_itables` in `secfs/tables.py` |

参考文献：inode.pdf——主要介绍了inode和i-table的关系

### 实验一步骤

先讲实验一，首先，由之前讲命名的那堂课可以知道，从文件名到磁盘上的块实现访问，需要经过十层间接层，中间就有一层是inode层。我们都知道，一个inode对应一个文件，且每个inode都有一个结点编号，元信息和指向块的指针。这几乎囊括了一个文件的所有信息。

这样我们只需要知道一个目录下有多少个inode编号，就可以知道有多少文件了，如何去高效的查找inode，这就用到了i-table，存有目录下的inode编号。

SUNDR使用i-handle来查找某个用户的i-table，这和实验一关系不大，所以略过不讲。



先来看需要补充的函数上方的init函数

![image-20230506104528577](https://cdn.lmark.cc/img/image-20230506104528577.png)

可以看到，首先先给Inode结点分配了ihash，然后给这个ihash建立一个映射给root_i；这个实验主要操作的数据对象就是这个I类型，这个类型是由principal和i-number组成的。

这里的root_i对应的是根目录，因为一个目录下，无论如何都会有两个`.和..`这两个目录，用于指向父目录和自己，所以同时也需要创建两个文件。这里使用的add方法，也无需了解其实现，只要知道怎么用的就行了，大概就是将某个I对象映射到某个目录下，并起个名字。



这里在获得new_ihash之后，为什么要使用一个modmap映射呢？乍一看这里写的很抽象，我们知道，modmap作用是建立ihash的映射，并且返回一个I对象，这里并没有返回值，这是为什么呢？

其实这是modmap函数的另一个用法，修改i-table里i-number到ihash的映射，因为文件或目录被修改之后，需要重新生成一个ihash，add函数就是给目录增加文件的同时，返回了最新的ihash。

然后就到`users`和`groups`文件的生成了，文件的生成和目录是差不多的，主要是少了一步add的步骤。还多了一步link，我们都知道，在Linux文件系统中，文件的只有在连接数为0的时候才会删除，也就是说，增加连接数才会让一个文件出现（？大概）

![image-20230506112453558](https://cdn.lmark.cc/img/image-20230506112453558.png)





综上，实验一的参考代码如下：

![image-20230506112516514](https://cdn.lmark.cc/img/image-20230506112516514.png)



### 实验二前瞻

反反复复看了好多遍实验一和SUNDR，才大概知道实验二要干嘛，我觉得吧，实验二主要是操作current_itables，让不同用户使用自己i-table，还有就是当文件修改后，要及时更新ihash且上传服务器，还有就是版本向量啥的，总之方向大概是这样。

