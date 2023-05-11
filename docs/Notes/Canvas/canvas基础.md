---
lang: zh-CN
title: canvas基础
description: 关键功能
collapsible: true
---


# canvas基础

**Canvas API** 提供了一个通过[JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) 和 [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML)的[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas)元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。

Canvas API 主要聚焦于 2D 图形。而同样使用`<canvas>`元素的 [WebGL API](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API) 则用于绘制硬件加速的 2D 和 3D 图形。



## 1.Canvas上下文

[`HTMLCanvasElement.getContext()`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext) 方法获取这个画布的 context——图像稍后将在此被渲染

1. 参数一上下文类型

   1. `"2d`", 建立一个 [`CanvasRenderingContext2D`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 二维渲染上下文。
   2. `"webgl"` (或`"experimental-webgl"`) 这将创建一个 [`WebGLRenderingContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext) 三维渲染上下文对象。只在实现[WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API) 版本 1(OpenGL ES 2.0) 的浏览器上可用。
   3. "`webgl2`" (或 "`experimental-webgl2`") 这将创建一个 [`WebGL2RenderingContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL2RenderingContext) 三维渲染上下文对象。只在实现 [WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API) 版本 2 (OpenGL ES 3.0) 的浏览器上可用。实验性
   4. `"bitmaprenderer"` 这将创建一个只提供将 canvas 内容替换为指定[`ImageBitmap`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageBitmap)功能的[`ImageBitmapRenderingContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageBitmapRenderingContext) 。

2. 参数二上下文属性

   1. 2d 上下文属性：

      * **`alpha`**: [`boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)值表明`canvas`包含一个`alpha`通道。如果设置为`false`, 浏览器将认为`canvas`背景总是不透明的，这样可以加速绘制透明的内容和图片。
      * 非标准 (Gecko only) **`willReadFrequently`**: [`boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)值表明是否有重复读取计划。经常使用[`getImageData()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData)，这将迫使软件使用 2D `canvas` 并 节省内存（而不是硬件加速）。这个方案适用于存在属性 `gfx.canvas.willReadFrequently`的环境。并设置为`true` (缺省情况下，只有 B2G / Firefox OS).
      * 非标准 (Blink only) **`storage`**: [`string`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 这样表示使用哪种方式存储 (默认为：持久（"persistent"）).

      WebGL 上下文属性：

      * **`alpha`**: [`boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)值表明`canvas`包含一个`alpha`缓冲区。

      * **`antialias`**: [`boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)值表明是否开启抗锯齿。

      * **`depth`**: [`boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)值表明绘制缓冲区包含一个深度至少为 16 位的缓冲区。

      * **`failIfMajorPerformanceCaveat`**: 表明在一个系统性能低的环境是否创建该上下文的[`boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)值。

      * `powerPreference`

        : 指示浏览器在运行 WebGL 上下文时使用相应的 GPU 电源配置。可能值如下：

        * `"default"`:自动选择，默认值。
        * `"high-performance"`: 高性能模式。
        * `"low-power"`: 节能模式。

      * **`premultipliedAlpha`**: 表明排版引擎将假设绘制缓冲区包含预混合 alpha 通道的[`boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)值。

      * **`preserveDrawingBuffer`**: 如果这个值为`true`缓冲区将不会被清除，会保存下来，直到被清除或被使用者覆盖。

      * **`stencil`**: 表明绘制缓冲区包含一个深度至少为 8 位的模版缓冲区[`boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)值。

3. 返回值

   1. [`CanvasRenderingContext2D`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 为 `"2d"`,
   2. [`WebGLRenderingContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext) 为`"webgl"` 和`"experimental-webgl"`,
   3. [`WebGL2RenderingContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL2RenderingContext) 为`"webgl2"` 和`"experimental-webgl2"`, 或者
   4. [`ImageBitmapRenderingContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageBitmapRenderingContext) 为`"bitmaprenderer"`.

   如果 `contextType` 不是上述之一，返回[`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null).

~~~js
const c = documen.getElementById('c')
var ctx = canvas.getContext("2d");
~~~

## 1.填充和路径绘制

填充

**`CanvasRenderingContext2D.stroke()`** 是 Canvas 2D API 使用非零环绕规则，根据当前的画线样式，绘制当前或已经存在的路径的方法。


<CommentService/>