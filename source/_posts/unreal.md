---
title: UE5.6使用Unrealcv和MatrixCityPlugin遇到的一些问题：
cover: 'https://cdn.lmark.cc/img/300160_origin_20220531_200001.jpg'
top_img: 'https://cdn.lmark.cc/img/300152_origin_20220531_195623.jpg'
tags:
  - Unreal
  - 虚幻5
  - 地编
  - Bug
abbrlink: 1020f683
date: 2025-10-11 22:08:50
---

### 起因

最近需要用干一些地编的活，需要用虚幻引擎来采集深度数据，遂找了俩可以采集深度图的插件Unrealcv和MatrixCityPlugin，在编译的过程中遇到了些抽象问题。



### 报错：ConcurrentLinearAllocator.h(31): error C4668: ‘__has_feature’ is not defined as a preprocessor macro, replacing with ‘0’ for ‘#if/#elif’

编译插件建议开一个空项目，丢进去先编译好在放到项目里。编译Unrealcv遇到了：

> ConcurrentLinearAllocator.h(31): error C4668: ‘__has_feature’ is not defined as a preprocessor macro, replacing with ‘0’ for ‘#if/#elif’

这个问题原因是新版vs使用了新版的msvc, 而它移除了该宏。解决方法很简单，先在vs installer下一个旧版本的msvc，然后在`C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC`目录下可以找到刚刚安装的旧版本号。

![image-20251011202611581](https://cdn.lmark.cc/img/image-20251011202611581.png)

然后找到`BuildConfiguration.xml`，注意是UE5的对应文件，不是项目文件里的，默认路径在：`C:\Users\{yourname}}\AppData\Roaming\Unreal Engine\UnrealBuildTool\BuildConfiguration.xml`

```xml
<Configuration xmlns="https://www.unrealengine.com/BuildConfiguration">
<WindowsPlatform>
<CompilerVersion>14.38.33130</CompilerVersion>
<ToolchainVersion>14.38.33130</ToolchainVersion>
</WindowsPlatform>
</Configuration>
```

将里面的版本号替换成旧版的即可。当然你是从源码编译的UE5话，还可以直接修改这个调用，打开`Engine\Source\Runtime\Core\Public\Experimental\ConcurrentLinearAllocator.h`

用

```cpp
#elif defined(__has_feature)*
#if __has_feature(address_sanitizer)*
```

替换掉

```cpp
#elif __has_feature(address_sanitizer)*
```

重新编译UE5即可。

### UE5.6 Magick.NET-Q16-HDRI-AnyCPU 高危漏洞

Unrealcv编译好用了几天后，再编译时，突然发现编译不通过了，报错说项目有高危漏洞。解决方法是打开vs项目，右边解决方案栏里会有提示，根据提示更新就行，参考：[UE5.6.0 Magick.NET-Q16-HDRI-AnyCPU 高位漏洞 更新Automation project指南 - 知乎](https://zhuanlan.zhihu.com/p/1932541266320664119)



### MSB3073 exited with code 8

忘记怎么解决的了，好像是当时用了c4d插件，死活编译不过，报这个错，然后我禁用就好了，参考：[MSB3073 以代码 8 退出 - 开发 / 编程与脚本 - 埃及开发者社区论坛 --- MSB3073 exited with code 8 - Development / Programming & Scripting - Epic Developer Community Forums](https://forums.unrealengine.com/t/msb3073-exited-with-code-8/1901997)



### MatrixCityPlugin插件在5.6.1编译失败

UE5.6更新了许多特性，但是MatrixCityPlugin官方只提供了5.0的二进制，当我尝试使用runUAT去移植时，出现了下面的报错：
![image-20251011213759000](https://cdn.lmark.cc/img/image-20251011213759000.png)

使用的命令是：

```cmd
RunUAT.bat BuildPlugin -Plugin="C:\Users\{yourname}\Desktop\MatrixCity\MatrixCityPlugin\MatrixCityPlugin.uplugin" -Package="C:\sbue5\plgtest"
```



发现是找不到一个头文件`MoviePipelineMasterConfig.h`，查阅资料发现，从UE5.2开始，这个头文件改名为了`MovePipelinePrimaryConfig.h`，同时里面的`UMoviePipelineMasterConfig `类也更名为了` UMoviePipelineMasterConfig`。

参考[UnrealEngine/Engine/Plugins/MovieScene/MovieRenderPipeline/Source/MovieRenderPipelineCore/Public/MoviePipelineMasterConfig.h ](https://github.com/chenyong2github/UnrealEngine/blob/c865e168d0935b8e5f4bd865ddcc1c733c8ce7cf/Engine/Plugins/MovieScene/MovieRenderPipeline/Source/MovieRenderPipelineCore/Public/MoviePipelineMasterConfig.h#L6)

把头文件一改，相关函数一改，重新编译，又报错了：

```powershell
Unable to instantiate module 'UnrealEd': Unable to instantiate UnrealEd module for non-editor targets.
(referenced via Target -> MatrixCityPlugin.Build.cs -> MovieRenderPipelineEditor.Build.cs -> MovieSceneTools.Build.cs)
```

这个错误是由于插件里引用了仅限编辑器使用的模块，这些模块无法在非编辑器目标（如游戏发布版本）中使用。遂放弃用runUAT，老老实实丢到一个项目里去编译了。最后用起来是没有啥问题的，这里贴一个适配UE5.6的MatrixCity项目链接：[ladeng07/MatrixCity: [ICCV 2023\] MatrixCity: A Large-scale City Dataset for City-scale Neural Rendering and Beyond.](https://github.com/ladeng07/MatrixCity)



