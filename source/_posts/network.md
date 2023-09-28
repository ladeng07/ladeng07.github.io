---
title: 网络破防实践先导实验一————数组越界检测心得
tags: 网络破防实践先导
cover: 'https://s2.loli.net/2022/04/05/kq4YLIQsoemf1g5.jpg'
top_img: 'https://s2.loli.net/2022/04/05/7kQeTq3WU1goBs2.jpg'
abbrlink: 94f62543
date: 2022-04-01 02:45:36
---

### 1.前言

**网络攻防实践先导**，听着名字很高大上吧，正如它的名字那般，它的难度也是非常的大: (。作为一门今年新开的课，属于四门先导课程之一（剩下三门分别是软件工程先导、人工智能先导和忘了叫啥先导）。在上学期选课的时候，110人的课，选了139人，可见其火爆程度，也许是**网络**和**攻防**这两个要素吸引人，所以这门课的第一个实验——**数组越界的检测**，与上述两点看起来似乎没有丝毫关系，但是难度还极大，这就造成了，很多人退课（毕竟才0.5学分）。截止至2022年4月1日02点54分，139的课现在还剩39人.......我捏，有幸忝列其中。这足以看出这门课有多难了吧，接下来我给大家分享一下我写这门课的一些心得与体会吧（主要是写给自己看的，要是有不认识我的人看到了这篇博客，算你厉害🤔）



### 2.实验介绍

实验的要求很简单，编写一个文件checker.cpp，要求实现数组越界的检测。以下是原话：

> 本次实验自拟了一种类似C语言数组的语法，称为easy C，其仅包含简单的变量声明，算术表达式和数组操作，文件后缀为`.ec`。本次实验的目的是**使用c++语言编写一个检测程序，检测输入的`.ec`文件中数组使用的索引值是否超过数组定义的最大长度**。



看起来，似乎很简单，巴特，然并不。



### 3.实验分析

由于使用了自定义的easyc语法，所以逻辑上和我们平时的c语言有些许不同，但是还好，easyc简化很多东西，使其变得和Python语法那般简洁。在easyc中，程序执行被分为两部分：**变量赋值VarDef**（保存在VarDefList） 和 **数组引用ArrayUse**（保存在ArrayUseList），执行顺序上，先执行完所有变量赋值后，再进行数组引用。我们的任务就是，**遍历这两个部分，遍历其中的和数组越界有关的表达式，并判断其是否越界**。在存储结构中，变量的定义和数组的引用大量的用到了树结构，如下图：

![image-20220401032431540](https://s2.loli.net/2022/04/01/rudhv5mA3Dit7f9.png)

![image-20220401032527321](https://s2.loli.net/2022/04/01/njyuRsqIr98kltP.png)

上图中`VarDefList`元素从0开始，长度为3，表示图中从左至右3个变量的定义语句，`ArrayUseList`元素从0开始，长度为4，表示图中从左至右4个表达式语句。

然后，这个checker文件里面，定义了四种结构体，分别是`ArrExpr`、`Expression`、`ArrayUse`和`VarDef`,这四个结构体就是整个实验要操作的对象，

`ArrExpr`结构体定义了数组表达式：

```c++
struct ArrExpr{
    std::string id;
    int dimension;
    std::vector<struct Expression*> length;
};
```



`Expression`表达表达式结构:

```c++
struct Expression{
    int grammartype;
    std::string id;
    std::string op;
    struct ArrExpr *arrexpr;
    struct Expression* expr;
    std::string digitsequence;
};
```



`ArrayUse`代表数组的使用:

```
struct ArrayUse{
    int grammartype;
    struct ArrExpr *arrexpr;
    struct Expression *expression;
    std::string id;
    std::string op;
};
```



`VarDef`表示变量的定义:

```
struct VarDef{
    int grammartype;
    std::string id;
    int dimension;
    std::vector<struct Expression*> length;
};
```



这些大概就是题目的信息了，对我们来说，难点有以下这些：

- 对C++的函数和语法不熟悉（大一限定）

- 对C++的vector容器用法的不熟悉（大一限定）

- 对树和栈概念的不熟悉（大一限定）

- 计算Expression的值

- 调试需要在linux下进行，报错信息极少（不会用Linux下调试限定）

- 别的科目占用时间较多

- 懒.......

  

可以看到，这个实验对大一来说真心不友好。寄！

不过还好这个实验是面向41个样例进行的编程，不用考虑过多情况。



### 4.实验部分代码展示

这个实验最难的部分是实现Expression的计算，因为这个Expression是可以嵌套调用的，所以需要用到栈的知识，这里我选择使用使用递归函数解决，因为所有的表达式，进行拆分，最后的结果只能是：**常数**，**数组的引用** 和 **变量的引用** 三个中的其中一个，所以只要以这三种结果为递归函数的出口，就可以实现EXpression的计算了。

我编写的计算Expression的calc函数:

```c++
int calc(struct Expression* exp){
	if (!checkflag and exp->arrexpr != NULL){		
		int uselen;
		for (int j=0;j<exp->arrexpr->dimension;j++){
			uselen = calc(exp->arrexpr->length[j]);			//判断Expression的值是否合法 
			if (uselen < 0 or uselen >= idmap[exp->arrexpr->id + "+" + std::to_string(j+1)]) checkflag = true;
		}
	}
	if (!exp->digitsequence.empty() and exp->op.empty()){  //常数的出口 
		return std::stoi(exp->digitsequence);
	}
	else if (!exp->id.empty() and exp->op.empty()){		//变量的出口 
		return idmap[exp->id];
	}
	else if (exp->arrexpr != NULL and exp->op.empty()){	//数组引用的出口 
		std::string id;
		id = exp->arrexpr->id;
		for (int j=0; j < exp->arrexpr->dimension ; j++){
			id += "_" + std::to_string(calc(exp->arrexpr->length[j]));
		}
		return idmap[id];

	}
	else{
		//由于没有考虑算数优先级，所以每种符号的引用方式是相同的，可以扩展到无穷多种符号 
		if (exp->op == "+"){
			if (!exp->digitsequence.empty()) return std::stoi(exp->digitsequence) + calc(exp->expr);   //常数 
			else if (!exp->id.empty()) return idmap[exp->id] + calc(exp->expr);						   //变量 
			else{																				   	   //数组 
				std::string id;
				id = exp->arrexpr->id;
				for (int j=0; j < exp->arrexpr->dimension ; j++) {
					id += "_" + std::to_string(calc(exp->arrexpr->length[j]));}
				return idmap[id] + calc(exp->expr);
			} 
		}
		else if (exp->op == "-"){
                      if (!exp->digitsequence.empty()) return std::stoi(exp->digitsequence) - calc(exp->expr);
                      else if (!exp->id.empty()) return idmap[exp->id] - calc(exp->expr);
                      else{ 
                                std::string id;
                                id = exp->arrexpr->id;
                                for (int j=0; j < exp->arrexpr->dimension ; j++) id += "_" + std::to_string(calc(exp->arrexpr->length[j]));
                                return idmap[id] - calc(exp->expr);
                        }

              }
              else if (exp->op == "*"){
                      if (!exp->digitsequence.empty()) return std::stoi(exp->digitsequence) * calc(exp->expr);
                      else if (!exp->id.empty()) return idmap[exp->id] * calc(exp->expr);
                      else{ 
                                std::string id;
                                id = exp->arrexpr->id;
                                for (int j=0; j < exp->arrexpr->dimension ; j++) id += "_" + std::to_string(calc(exp->arrexpr->length[j]));
				return idmap[id] * calc(exp->expr);
                        }

              }
              else if (exp->op == "/"){
                      if (!exp->digitsequence.empty()) return std::stoi(exp->digitsequence) / calc(exp->expr);
                      else if (!exp->id.empty()) return idmap[exp->id] / calc(exp->expr);
                      else{ 
                                std::string id;
                                id = exp->arrexpr->id;
                                for (int j=0; j < exp->arrexpr->dimension ; j++) id += "_" + std::to_string(calc(exp->arrexpr->length[j]));
                                return idmap[id] / calc(exp->expr);
                        }
 
              }
		}
	}
```

目前已知的问题：没有考虑算数优先级，所以计算出来的结果不一定正确。



checker函数：

```c++
std::map<std::string, int> idmap;
int calc(struct Expression* exp);
bool checkflag = false;

void checker(){
    for (int i = 0; i < ArrayUseList.size(); ++i) {
	    struct ArrayUse* arruse = ArrayUseList[i];
	    if (arruse->arrexpr == NULL){
		    idmap[arruse->id] = std::stoi(arruse->expression->digitsequence);
	    }
    }  //在数组定义之前，先进行变量的赋值，防止出现定义时变量值未知的情况 
    
    
    for (int i = 0; i < VarDefList.size(); ++i) {
        struct VarDef *def = VarDefList[i];
	std::string id;
	if (def->dimension == 0){    //变量定义 
		continue;
		}
	for (int j = 0; j < def->dimension;j++){     //数组定义 
		idmap[def->id + "+" + std::to_string(j+1)] = calc(def->length[j]);	
		}
	}
	//变量和数组定义 
	

    for (int i = 0; i < ArrayUseList.size(); ++i) {
        struct ArrayUse* arruse = ArrayUseList[i];
		int uselen = 0;
        std::string id;
		if (checkflag == true) break;
		
		if (arruse->arrexpr == NULL){       //变量的赋值 
			id = arruse->id;
			idmap[id] = std::stoi(arruse->expression->digitsequence);
		}
		
		else{				    //数组的引用 
			id = arruse->arrexpr->id;
			for (int j=0;j<arruse->arrexpr->dimension;j++){
					
				uselen = calc(arruse->arrexpr->length[j]);
				
				if (checkflag or uselen < 0 or uselen >= idmap[arruse->arrexpr->id + "+" + std::to_string(j+1)]){
					checkflag = true;
					break;    //判断数组是否越界（其索引值是否为负数或者超出定义值） 
				}
				
				id += "_" + std::to_string(calc(arruse->arrexpr->length[j]));
			}
			if (checkflag) break;
			idmap[id] = calc(arruse->expression);//将合法的数组赋值添加到映射表中，以便接下来引用	
		}
 
 }
    if (checkflag == false){
	    std::cout<<"Correct"<<std::endl;  //输出结果 
    }
    else std::cout<<"Out of bound"<<std::endl;

}
```



### 5.心得

好难好难好难好难，当时和好兄弟在形策课上激情讨论，然后也没取得啥实质性进展（当天下午就被封校了，现在距离封校都过去了三周，没有啥解封的迹象，焯！），晚上熬了几个大夜，遇到了一堆奇奇怪怪的bug。最恶心的是，直接编译运行，报错信息只有核心错误，这就导致了我Debug的时间比写代码的时间长得多的多的多。这也让我后来跑去学了学怎么在IDE里边打断点调试（之前我都是Print战士，焯）。总之，这次实验还是让我学到不少好东西的，于是就有了这篇一大堆废话的文章（反正也是我自己看的嘻嘻）。
