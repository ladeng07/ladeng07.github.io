---
title: 我的一些常用的工具函数（持续更新）
abbrlink: cfb06458
date: 2022-04-07 09:05:33
cover: 'https://s2.loli.net/2022/04/07/i8UAOLXjQIDbfHw.png'
top_img: 'https://s2.loli.net/2022/04/07/5KvXmE2iPDSGCyQ.png'
tags: Tool
---

之前写的一些有意思的函数，因为每次自己再敲一遍又很麻烦，故写好了可以直接复制就可以用了

#### 1.跑跑弱口令字典

之前一个课上用的，字典是从github上找的：https://github.com/fuzz-security/SuperWordlist

```python
flag = False
with open("MidPwds.txt", "r",encoding='utf-8') as f:
    for line in f.readlines():
        line = line.strip('\n') 
        if line == pwd:
            flag = True
            break
```



#### 2.发邮件函数

自己封装了个发邮件函数，写一些自动化任务可能会用到

需要的参数：

- 邮箱
- 邮箱TOKEN

需要用到的库：
- smtplib
- email.mime.text
- email.utils

```python
#需要用到的库
import smtplib
from email.mime.text import MIMEText
from email.utils import formataddr
# text 是你需要发送的内容，email 是邮箱，可以传入一个或者一堆
def email(text,email):
    my_sender = '你的邮箱'
    my_pass = "邮箱TOKEN"
    msg=MIMEText(text,'plain','utf-8')
    
    msg['Subject']="这是一个主题"
    msg['From']=formataddr(["我是发件人",my_sender])  # 括号里的对应发件人邮箱昵称、发件人邮箱账号
    msg['To']=formataddr(["我是收件人",email])              # 括号里的对应收件人邮箱昵称、收件人邮箱账号
     
    # QQ邮箱的smtp服务器：smtp.qq.com   端口 465
    # 163邮箱smtp服务器 smtp.163.com 端口 25
    server=smtplib.SMTP("smtp.163.com", 25)  # 发件人邮箱中的SMTP服务器，端口是25
    server.login(my_sender, my_pass)  # 括号中对应的是发件人邮箱账号、邮箱密码
    server.sendmail(my_sender,email,msg.as_string())  # 括号中对应的是发件人邮箱账号、收件人邮箱账号、发送邮件
    server.quit()  # 关闭连接
```



#### 3.获取B站视频播放量/专栏阅读数和粉丝



需要一个参数**UID**

还有需要requests和json库

返回两个参数:

- fans_data : 粉丝数
- views : 总播放量
- article_views : 专栏阅读量

```python
import requests,json

def bilibili(UID):
    url1 = 'https://api.bilibili.com/x/space/arc/search?mid='+str(UID)+'&ps=30&tid=0&pn=1&keyword=&order=pubdate&jsonp=jsonp'
    url2 = 'https://api.bilibili.com/x/relation/stat?vmid='+str(UID)+'&jsonp=jsonp'
    url3 = "https://api.bilibili.com/x/space/article?mid="+str(UID)+"&pn=1&ps=12&sort=view&jsonp=jsonp"
    try:
        views_data = json.loads(requests.get(url1).text)['data']['list']['vlist']
        articles_data = json.loads(requests.get(url3).text)["data"]["articles"]
        fans_data = json.loads(requests.get(url2).text)['data']['follower']
    except:
        return "数据获取失败"
    views=0
    for i in views_data:
        views+=i['play']

    article_views = 0
    for i in articles_data:
        article_views+=i["stats"]["view"]
    return fans_data,views,article_views
```

效果图：

![](https://s2.loli.net/2022/04/12/E917W2tOC83XUqb.png)



#### 4.获取宿舍电量
