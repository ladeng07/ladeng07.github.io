---
title: 曙光平台安装llama-factory以及微调qwen2.5-VL-3B模型
cover: 'https://cdn.lmark.cc/img/300168_origin_20220531_200032.jpg'
top_img: 'https://cdn.lmark.cc/img/300157_origin_20220531_195958.jpg'
tags:
  - 大模型
  - 微调
  - 环境
abbrlink: d8057fb8
date: 2025-06-11 22:00:28
---

## 起因

毕设做完了，毕业典礼结束了，进组老师安排了一个复现大模型微调的任务，遂开始装环境，记录一下装环境遇到的各种坑。



## SCNet曙光平台conda环境

老师给我分了张A800，在云平台上。A800是A100的残血版，貌似砍了CUDA核心数，但是对于微调来说，倒也够用了。曙光平台进来之后直接开ssh，把连接信息和密钥填到配置文件里就能直接连了。

![image-20250708011324224](https://cdn.lmark.cc/img/image-20250708011324224.png)

连上之后首先要做的是配环境，默认环境中各种软体，应用程式都是缺失的，如conda，这就需要我们从module里load进来，然后创建环境：

```bash
module ava  #查看可用软体

module  load  anaconda3/2023.09 #conda

module load  compiler/gcc/12.2.0 #gcc12,可以先加载进来，待会编译库需要用到
```

![image-20250708153027703](https://cdn.lmark.cc/img/image-20250708153027703.png)

然后开始经典conda装环境部分，这次实验环境需要的库如下：
![image-20250708153306571](https://cdn.lmark.cc/img/image-20250708153306571.png)

```bash
conda  # 创建并激活虚拟环境（以 conda 为例）
conda create -n llm_finetune python=3.10
conda activate llm_finetune

echo """datasets==3.4.1
llamafactory==0.9.3
multiprocess==0.70.16
numpy==1.26.3
openai==1.70.0
pandas==2.2.3
tokenizers==0.21.0
torch==2.6.0
torchvision==0.21.0
transformers==4.50.0
vllm==0.8.2""" > requirements.txt

pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

此时在安装llamafactory的av依赖时，会报一个匪夷所思的错误：**ValueError: You are not using a virtual environment**

明明已经在conda虚拟环境里了。

```
  error: subprocess-exited-with-error
  
  × Getting requirements to build wheel did not run successfully.
  │ exit code: 1
  ╰─> [17 lines of output]
      Traceback (most recent call last):
        File "/work/home/huangnaixuan/.conda/envs/llm_finetune/lib/python3.10/site-packages/pip/_vendor/pyproject_hooks/_in_process/_in_process.py", line 389, in <module>
          main()
        File "/work/home/huangnaixuan/.conda/envs/llm_finetune/lib/python3.10/site-packages/pip/_vendor/pyproject_hooks/_in_process/_in_process.py", line 373, in main
          json_out["return_val"] = hook(**hook_input["kwargs"])
        File "/work/home/huangnaixuan/.conda/envs/llm_finetune/lib/python3.10/site-packages/pip/_vendor/pyproject_hooks/_in_process/_in_process.py", line 143, in get_requires_for_build_wheel
          return hook(config_settings)
        File "/tmp/pip-build-env-86tzotxm/overlay/lib/python3.10/site-packages/setuptools/build_meta.py", line 331, in get_requires_for_build_wheel
          return self._get_build_requires(config_settings, requirements=[])
        File "/tmp/pip-build-env-86tzotxm/overlay/lib/python3.10/site-packages/setuptools/build_meta.py", line 301, in _get_build_requires
          self.run_setup()
        File "/tmp/pip-build-env-86tzotxm/overlay/lib/python3.10/site-packages/setuptools/build_meta.py", line 512, in run_setup
          super().run_setup(setup_script=setup_script)
        File "/tmp/pip-build-env-86tzotxm/overlay/lib/python3.10/site-packages/setuptools/build_meta.py", line 317, in run_setup
          exec(code, locals())
        File "<string>", line 21, in <module>
      ValueError: You are not using a virtual environment
      [end of output]
```

官方仓库里的解决方法[Problem when installing av 15.0.0 · Issue #1946 · PyAV-Org/PyAV](https://github.com/PyAV-Org/PyAV/issues/1946)，添加变量 **GITHUB_ACTIONS=true**：试了一下，并不能解决：
![image-20250709005916232](https://cdn.lmark.cc/img/image-20250709005916232.png)

去pr里找了找，还真找到了这个bug.....

![image-20250709010258890](https://cdn.lmark.cc/img/image-20250709010258890.png)

世界果然是个巨大的草台班子。最后还是老老实实安装了av==14.4.0。anyway，能跑就行。



## 下载qwen2.5VL-3B-Instruct

国内的话，裸连抱抱脸大概率是连不上的，所以我选择用魔塔下：

```bash
pip install modelscope
modelscope download --model Qwen/Qwen2.5-VL-3B-Instruct
```



## 分配GPU并启动webui界面

平台的GPU有两种使用方式，主动抢占和任务提交。前者和本地运行类似，但是不手动释放GPU别人无法使用，适合调试；而任务提交可以离线处理任务，系统自动分配GPU，并且在计算资源不足时会自动排队等候，适合重复多次的调参任务。两种方法各有利弊吧，有些平台不支持长时间抢占GPU，所以有人开发出抢占脚本，提交任务后让GPU空转，需要时再连上去用（扯远了。
我们想用webui的话，得抢占GPU再启动界面，使用如下命令申请GPU：

```bash
salloc -p 节点名  -N 节点数 -n 核心数 --gres=gpu:GPU数量
# salloc 申请成功后会返回申请到的节点和作业ID等信息，假设申请到的是a4u03n07节点，作业ID为1078858
ssh a4u03n07      # 直接登录到刚刚申请到的节点a4u03n07调式作业
scancel 1078858   # 计算资源使用完后取消作业
squeue -j 1078858 # 查看作业是否还在运行，确保作业已经退出，避免产生不必要的费用
```

GPU数量为0也能申请，实测曙光平台申请GPU数量为0也能随便使用某节点所有卡。

这是切换虚拟环境再启动webui，出现一个问题：明明vscode的ssh自带了端口转发，但是我们还是访问不到webui。这是为什么呢？仔细观察会发现，连接了分配的节点后，pip软件包是安装不了的，说明了节点所在的网络和我们登录进来的网络是隔离的，也就是说我们最开始连接的是一个跳板机。知道了这个，问题就好解决了，只需要在连接节点是，配置一个端口转发到跳板机即可。

即

```bash
ssh a4u03n07  -L 7860:127.0.0.1:7860       #7860为llama-factory默认端口
llamafactory-cli webui                     							#启动ui界面
```

经过了漫长的等待，不出所料，报错了：

```bash
 ...... 
File "/work/home/huangnaixuan/.conda/envs/llm_finetune/lib/python3.10/importlib/__init__.py", line 126, in import_module
    return _bootstrap._gcd_import(name[level:], package, level)
  File "/work/home/huangnaixuan/.conda/envs/llm_finetune/lib/python3.10/site-packages/zmq/backend/cython/__init__.py", line 6, in <module>
    from . import _zmq
ImportError: /work/home/huangnaixuan/.conda/envs/llm_finetune/bin/../lib/libstdc++.so.6: version `GLIBCXX_3.4.30' not found (required by /work/home/huangnaixuan/.conda/envs/llm_finetune/lib/python3.10/site-packages/zmq/backend/cython/_zmq.cpython-310-x86_64-linux-gnu.so)
```

预编译vllm包的GCC版本比较高，conda默认的gcc是4.8.5，所有需要更新一下gcc版本：

```bash
conda install -c conda-forge gcc=12
```

不过不知道为什么我这里更新不了，只能把系统自带的gcc12的libstdc++链接过去：

```bash
ln -s /public/software/compiler/gcc-12.2.0/lib64/libstdc++.so.6.0.30 ~/.conda/envs/{环境名}/lib/libstdc++.so.6
```

终于跑起来了

![image-20250806021452585](https://cdn.lmark.cc/img/image-20250806021452585.png)





## 安装Flash-Attention-2

Flash-Attention-2能显著提升推理速度和减小显存占用，装一个是挺好的，先查看python，pytorch和cuda版本

```bash
python --version && python -c "import torch; print(torch.__version__); print(torch.cuda.is_available())"
```

![image-20250806025843287](https://cdn.lmark.cc/img/image-20250806025843287.png)

在[Releases · Dao-AILab/flash-attention](https://github.com/Dao-AILab/flash-attention/releases)中，下载对应的版本，值得注意的是，从v2.8.0.post1开始，官方提供的预编译包是在ubuntu-22.04编译的，在我的服务器上跑不起来，所以我选择用v2.7.4.post1的二进制包：
![image-20250806030216536](https://cdn.lmark.cc/img/image-20250806030216536.png)

还有一个点是cxx11abi选项，它指的是 C++ ABI（应用二进制接口），`cxx11abiTRUE` 表示使用 C++11 ABI 编译，`cxx11abiFALSE` 则表示不使用 C++11 ABI 编译。不同的编译器和系统可能对 C++ ABI 有不同的支持，因此需要根据自己的环境选择合适的版本。这里我用FALSE的版本，



## 安装deepspeed

直接

```bash
pip install deepspeed
```

即可



