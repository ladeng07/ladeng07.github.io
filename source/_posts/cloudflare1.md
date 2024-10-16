---
title: 使用脚本自动更新实验室电脑IP到cloudflare域名
cover: 'https://cdn.lmark.cc/img/300186_origin_20220531_200449.jpg'
top_img: 'https://cdn.lmark.cc/img/300186_origin_20220531_200449.jpg'
tags: Cloudflare
abbrlink: efb03d74
date: 2024-10-09 16:14:27
---



## 起因

之前实验室路由器用的老师的账号，有段时间网络不好，校园网老掉，师兄他们得经常重新登录，每次重新登陆容易造成实验室路由器IP改变，因为我的loongson电脑放在实验室，打洞在校园网。每次换IP我还得跑到实验室去重新看，累死我。然后想到可以像DDNS一样，请求一下API来定时更新IP。因为我的域名是停靠在CF的，所以得用CF的API。

## 步骤

理论上只要一条请求就可以更新了，但是在这之前，得先获取别的信息，所以整个过程要分三步。

- 先获取zone的id
- 在获取对应子域名的id
- 最后组装成更新请求

在开始之前，我们需要先去CF申请一个API的令牌：[User API Tokens | Cloudflare](https://dash.cloudflare.com/profile/api-tokens)

![img](https://cdn.lmark.cc/img/image-20240312211343051.png)

选择你的域名，然后点击进入，滑倒下面，找到`Get your API token`，进去后点击右上角的create，选择下图的`Edit zone DNS`

![img](https://cdn.lmark.cc/img/image-20240312211626694.png)

然后配置大概如下，然后再continue就可以了，最后保存好你的密钥。

![img](https://cdn.lmark.cc/img/image-20240312211706353.png)

### 获取zone的id

命令如下，

```bash
curl -X GET "https://api.cloudflare.com/client/v4/zones" -H "Authorization: Bearer TOKEN" -H "Content-Type: application/json"
```

返回格式

```json
{
    "result": [
        {
            "id": "这是你获取的id",
            "name": "lmark.cc",
            "status": "active",
            "paused": false,
            "type": "full",
            "development_mode": -15935750,
            "name_servers": [
                "clayton.ns.cloudflare.com",
                "sreeni.ns.cloudflare.com"
            ],
   .....
}
```



这是我参考的教程给的方法，然而我在写这篇文章的时候，才发现，原来域名的主页里有区域id

![img](https://cdn.lmark.cc/img/image-20240312211921352.png)

### 获取对应子域名的id

在获取了区域id之后，使用如下命令获取子域名id

```bash
curl -X GET "https://api.cloudflare.com/client/v4/zones/你的区域id/dns_records?page=1&per_page=20&order=type&direction=asc" -H "Authorization: Bearer TOKEN" -H "Content-Type: application/json"
```

结果很多，可以粘贴出来搜索需要的内容

```json
{
    "result": [
        {
            "id": "子域名的id",
            "zone_id": "你的区域id",
            "zone_name": "lmark.cc",
            "name": "api.lmark.cc",
            "type": "A",
            "content": "1.1.1.1",
            "proxiable": true,
            "proxied": true,
            "ttl": 1,
            "locked": false,
            "meta": {
                "auto_added": false,
                "managed_by_apps": false,
                "managed_by_argo_tunnel": false
            },
            "comment": null,
            "tags": [],
            "created_on": "2023-09-03T02:54:21.743348Z",
            "modified_on": "2023-09-03T02:54:21.743348Z"
        },
        .......
 }
```

### 组装成更新请求

最后一步就简单了，只要把前面的区域id和子域名id组装起来，再传入你的数据就可以更新了。

```
bash
curl -X PUT "https://api.cloudflare.com/client/v4/zones/区域id/dns_records/子域名id"  -H "Authorization: Bearer TOKEN" -H "Content-Type: application/json" --data '{"type":"A","name":"ouc.lmark.cc","content":"127.0.0.1","ttl":120,"proxied":false}'
```

返回结果大致如下

```json
{
    "result": {
        "id": "",
        "zone_id": "",
        "zone_name": "lmark.cc",
        "name": "ouc.lmark.cc",
        "type": "A",
        "content": "127.0.0.1",
        "proxiable": false,
        "proxied": false,
        "ttl": 120,
        "locked": false,
        "meta": {
            "auto_added": false,
            "managed_by_apps": false,
            "managed_by_argo_tunnel": false
        },
        "comment": null,
        "tags": [],
        "created_on": "2023-09-03T08:06:07.802736Z",
        "modified_on": "2024-03-05T17:31:41.526573Z"
    },
    "success": true,
    "errors": [],
    "messages": []
}
```

## 实现实验室电脑获取路由器IP并更新

由于我没有路由器的访问权限，所以我的脚本只能跑在loongson电脑上，幸好学校有专门看IP的工具，直接在电脑上访问就可以获取当前路由器的IP了。脚本如下：

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/zones/区域id/dns_records/子域名id"  -H "Authorization: Bearer TOKEN" -H "Content-Type: application/json" --data '{"type":"A","name":"loong.lmark.cc","content":"'$(curl -s http://ip4.ouc.edu.cn/Default2.aspx | grep -oE '[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+')'","ttl":120,"proxied":false}'
```
