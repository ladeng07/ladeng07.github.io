---
title: 解决批处理脚本报错：The system cannot find the batch label XXXX
cover: 'https://cdn.lmark.cc/img/300176_origin_20220531_200309.jpg'
top_img: 'https://cdn.lmark.cc/img/300177_origin_20220531_200311.jpg'
tags:
  - Windows
  - Bug
abbrlink: ccc0c16f
date: 2025-10-16 15:37:37
---



### 起因

这两天在装[guaguastandup/zotero-pdf2zh: PDF2zh for Zotero | Zotero PDF中文翻译插件](https://github.com/guaguastandup/zotero-pdf2zh时，用它的安装脚本时，出了个抽象的错：

```bash
The system cannot find the batch label specified - create_conda_env
```

把报错拿去问chat哥和ge哥，他俩给出的答案都是说原本的脚本用了`UTF-8 with BOM`编码，导致开头有两字节数据，同时还说是结尾用了LF而不是CRLF导致的。

根据它们说的方法排查一遍之后，发现还是不行。于是只能用匠心传承的古法debug，上stackflow搜索，还真让我找到一个十几年前类似的回答[windows - Why "The system cannot find the batch label specified" is thrown even if label exists? - Stack Overflow](https://stackoverflow.com/questions/232651/why-the-system-cannot-find-the-batch-label-specified-is-thrown-even-if-label-e)：


![image-20251017110358112](https://cdn.lmark.cc/img/image-20251017110358112.png)

里面有一条回答非常细节：

> GitHub's "Raw" download is just HTTP-serving the blob as it sits in the repo storage (which Git always normalizes to LF internally). It does not invoke Git's clean/smudge process, so you always get LF, even if you committed CRLF or have a `.gitattributes` rule.
> GitHub 的"原始"下载只是将存储在仓库中的 blob 作为 HTTP 服务提供（Git 内部始终将其标准化为 LF）。它不会调用 Git 的 clean/smudge 过程，因此你始终会得到 LF，即使你提交了 CRLF 或有一个 `.gitattributes` 规则。
>
> If you clone the repo or pull changes, Git will see your `.gitattributes` and convert `.bat` files to CRLF on disk.
> 如果你克隆仓库或拉取更改，Git 会看到你的 `.gitattributes` 并将 `.bat` 文件转换为 CRLF 在磁盘上。
>
> But if you grab the file via the **Raw** link on gitHub.com, you will always get LF endings: the "missing label" symptom will still occur until you convert to CRLF yourself.
> 但如果你通过 gitHub.com 上的原始链接获取文件，你将始终得到 LF 结尾：直到你自行转换为 CRLF，"缺失标签"的症状仍然会发生。

以前都不知道github还有这么细节的处理，也是学习到了。虽然这不是这次报错的原因。



### 解决方法

其实真正的问题是，脚本用使用conda创建环境命令前面都没有`CALL`，导致了函数作用域发生变化。

![image-20251017110935145](https://cdn.lmark.cc/img/image-20251017110935145.png)

脚本如下：

![image-20251017112235966](https://cdn.lmark.cc/img/image-20251017112235966.png)给74行的conda前加上call就好了。
