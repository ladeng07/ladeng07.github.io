---
title: 关于Django以前忽略的一些东西
cover: 'http://cdn.lmark.cc/img/8KTbdUZovNG1DgH.jpg'
top_img: 'http://cdn.lmark.cc/img/sFGpRjcrt2vNXoh.jpg'
tags:
  - Django
  - Python
abbrlink: a0885322
date: 2024-02-27 11:49:26
---



## Django直接使用sql查询

官方文档：[执行原生 SQL 查询 | Django 文档 | Django (djangoproject.com)](https://docs.djangoproject.com/zh-hans/4.1/topics/db/sql/)

### 将查询字段映射为模型字段[¶](https://docs.djangoproject.com/zh-hans/4.1/topics/db/sql/#mapping-query-fields-to-model-fields)

`raw()` 字段将查询语句中的字段映射至模型中的字段。

查询语句中的字段排序并不重要。换而言之，以下两种查询是一致的:

```python
>>> Person.objects.raw('SELECT id, first_name, last_name, birth_date FROM myapp_person')
...
>>> Person.objects.raw('SELECT last_name, birth_date, first_name, id FROM myapp_person')
```



### 直接执行自定义 SQL[¶](https://docs.djangoproject.com/zh-hans/4.1/topics/db/sql/#executing-custom-sql-directly)

有时候，甚至 [`Manager.raw()`](https://docs.djangoproject.com/zh-hans/4.1/topics/db/sql/#django.db.models.Manager.raw) 都无法满足需求：你可能要执行不明确映射至模型的查询语句，或者就是直接执行 `UPDATE`， `INSERT` 或 `DELETE` 语句。

这些情况下，你总是能直接访问数据库，完全绕过模型层。

对象 `django.db.connection` 代表默认数据库连接。要使用这个数据库连接，调用 `connection.cursor()` 来获取一个指针对象。然后，调用 `cursor.execute(sql, [params])` 来执行该 SQL 和 `cursor.fetchone()`，或 `cursor.fetchall()` 获取结果数据。

例如：

```
from django.db import connection

def my_custom_sql(self):
    with connection.cursor() as cursor:
        cursor.execute("UPDATE bar SET foo = 1 WHERE baz = %s", [self.baz])
        cursor.execute("SELECT foo FROM bar WHERE baz = %s", [self.baz])
        row = cursor.fetchone()

    return row
```

要避免 SQL 注入，你绝对不能在 SQL 字符串中用引号包裹 `%s` 占位符。

注意，若要在查询中包含文本的百分号，你需要在传入参数使用两个百分号:

```
cursor.execute("SELECT foo FROM bar WHERE baz = '30%'")
cursor.execute("SELECT foo FROM bar WHERE baz = '30%%' AND id = %s", [self.id])
```

若你同时使用 [不止一个数据库](https://docs.djangoproject.com/zh-hans/4.1/topics/db/multi-db/)，你可以使用 `django.db.connections` 获取指定数据库的连接（和指针）。 `django.db.connections` 是一个类字典对象，它允许你通过连接别名获取指定连接:

```
from django.db import connections
with connections['my_db_alias'].cursor() as cursor:
    # Your code here...
```





## Queryset的缓存行为

Queryset是有缓存的，但也不是一直都缓存，得遍历过一遍之后才会有缓存。

官方文档：[执行查询 | Django 文档 | Django (djangoproject.com)](https://docs.djangoproject.com/zh-hans/4.1/topics/db/queries/#caching-and-querysets)

#### 当 `QuerySet` 未被缓存时[¶](https://docs.djangoproject.com/zh-hans/4.1/topics/db/queries/#when-querysets-are-not-cached)

查询结果集并不总是缓存结果。当仅计算查询结果集的 *部分* 时，会校验缓存，若没有填充缓存，则后续查询返回的项目不会被缓存。特别地说，这意味着使用数组切片或索引的 [限制查询结果集](https://docs.djangoproject.com/zh-hans/4.1/topics/db/queries/#limiting-querysets) 不会填充缓存。

例如，重复的从某个查询结果集对象中取指定索引的对象会每次都查询数据库:

```python
>>> queryset = Entry.objects.all()
>>> print(queryset[5]) # Queries the database
>>> print(queryset[5]) # Queries the database again
```

不过，若全部查询结果集已被检出，就会去检查缓存:

```python
>>> queryset = Entry.objects.all()
>>> [entry for entry in queryset] # Queries the database
>>> print(queryset[5]) # Uses cache
>>> print(queryset[5]) # Uses cache
```





## Django使用test

[编写并运行测试 | Django 文档 | Django (djangoproject.com)](https://docs.djangoproject.com/zh-hans/4.1/topics/testing/overview/)
