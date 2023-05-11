<template><div><h1 id="canvas基础" tabindex="-1"><a class="header-anchor" href="#canvas基础" aria-hidden="true">#</a> canvas基础</h1>
<p><strong>Canvas API</strong> 提供了一个通过<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer">JavaScript<ExternalLinkIcon/></a> 和 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML" target="_blank" rel="noopener noreferrer">HTML<ExternalLinkIcon/></a>的<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas" target="_blank" rel="noopener noreferrer">``<ExternalLinkIcon/></a>元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。</p>
<p>Canvas API 主要聚焦于 2D 图形。而同样使用<code v-pre>&lt;canvas&gt;</code>元素的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API" target="_blank" rel="noopener noreferrer">WebGL API<ExternalLinkIcon/></a> 则用于绘制硬件加速的 2D 和 3D 图形。</p>
<h2 id="_1-canvas上下文" tabindex="-1"><a class="header-anchor" href="#_1-canvas上下文" aria-hidden="true">#</a> 1.Canvas上下文</h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext" target="_blank" rel="noopener noreferrer"><code v-pre>HTMLCanvasElement.getContext()</code><ExternalLinkIcon/></a> 方法获取这个画布的 context——图像稍后将在此被渲染</p>
<ol>
<li>
<p>参数一上下文类型</p>
<ol>
<li><code v-pre>&quot;2d</code>&quot;, 建立一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D" target="_blank" rel="noopener noreferrer"><code v-pre>CanvasRenderingContext2D</code><ExternalLinkIcon/></a> 二维渲染上下文。</li>
<li><code v-pre>&quot;webgl&quot;</code> (或<code v-pre>&quot;experimental-webgl&quot;</code>) 这将创建一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext" target="_blank" rel="noopener noreferrer"><code v-pre>WebGLRenderingContext</code><ExternalLinkIcon/></a> 三维渲染上下文对象。只在实现<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API" target="_blank" rel="noopener noreferrer">WebGL<ExternalLinkIcon/></a> 版本 1(OpenGL ES 2.0) 的浏览器上可用。</li>
<li>&quot;<code v-pre>webgl2</code>&quot; (或 &quot;<code v-pre>experimental-webgl2</code>&quot;) 这将创建一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL2RenderingContext" target="_blank" rel="noopener noreferrer"><code v-pre>WebGL2RenderingContext</code><ExternalLinkIcon/></a> 三维渲染上下文对象。只在实现 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API" target="_blank" rel="noopener noreferrer">WebGL<ExternalLinkIcon/></a> 版本 2 (OpenGL ES 3.0) 的浏览器上可用。实验性</li>
<li><code v-pre>&quot;bitmaprenderer&quot;</code> 这将创建一个只提供将 canvas 内容替换为指定<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/ImageBitmap" target="_blank" rel="noopener noreferrer"><code v-pre>ImageBitmap</code><ExternalLinkIcon/></a>功能的<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/ImageBitmapRenderingContext" target="_blank" rel="noopener noreferrer"><code v-pre>ImageBitmapRenderingContext</code><ExternalLinkIcon/></a> 。</li>
</ol>
</li>
<li>
<p>参数二上下文属性</p>
<ol>
<li>
<p>2d 上下文属性：</p>
<ul>
<li><strong><code v-pre>alpha</code></strong>: <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean" target="_blank" rel="noopener noreferrer"><code v-pre>boolean</code><ExternalLinkIcon/></a>值表明<code v-pre>canvas</code>包含一个<code v-pre>alpha</code>通道。如果设置为<code v-pre>false</code>, 浏览器将认为<code v-pre>canvas</code>背景总是不透明的，这样可以加速绘制透明的内容和图片。</li>
<li>非标准 (Gecko only) <strong><code v-pre>willReadFrequently</code></strong>: <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean" target="_blank" rel="noopener noreferrer"><code v-pre>boolean</code><ExternalLinkIcon/></a>值表明是否有重复读取计划。经常使用<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData" target="_blank" rel="noopener noreferrer"><code v-pre>getImageData()</code><ExternalLinkIcon/></a>，这将迫使软件使用 2D <code v-pre>canvas</code> 并 节省内存（而不是硬件加速）。这个方案适用于存在属性 <code v-pre>gfx.canvas.willReadFrequently</code>的环境。并设置为<code v-pre>true</code> (缺省情况下，只有 B2G / Firefox OS).</li>
<li>非标准 (Blink only) <strong><code v-pre>storage</code></strong>: <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String" target="_blank" rel="noopener noreferrer"><code v-pre>string</code><ExternalLinkIcon/></a> 这样表示使用哪种方式存储 (默认为：持久（&quot;persistent&quot;）).</li>
</ul>
<p>WebGL 上下文属性：</p>
<ul>
<li>
<p><strong><code v-pre>alpha</code></strong>: <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean" target="_blank" rel="noopener noreferrer"><code v-pre>boolean</code><ExternalLinkIcon/></a>值表明<code v-pre>canvas</code>包含一个<code v-pre>alpha</code>缓冲区。</p>
</li>
<li>
<p><strong><code v-pre>antialias</code></strong>: <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean" target="_blank" rel="noopener noreferrer"><code v-pre>boolean</code><ExternalLinkIcon/></a>值表明是否开启抗锯齿。</p>
</li>
<li>
<p><strong><code v-pre>depth</code></strong>: <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean" target="_blank" rel="noopener noreferrer"><code v-pre>boolean</code><ExternalLinkIcon/></a>值表明绘制缓冲区包含一个深度至少为 16 位的缓冲区。</p>
</li>
<li>
<p><strong><code v-pre>failIfMajorPerformanceCaveat</code></strong>: 表明在一个系统性能低的环境是否创建该上下文的<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean" target="_blank" rel="noopener noreferrer"><code v-pre>boolean</code><ExternalLinkIcon/></a>值。</p>
</li>
<li>
<p><code v-pre>powerPreference</code></p>
<p>: 指示浏览器在运行 WebGL 上下文时使用相应的 GPU 电源配置。可能值如下：</p>
<ul>
<li><code v-pre>&quot;default&quot;</code>:自动选择，默认值。</li>
<li><code v-pre>&quot;high-performance&quot;</code>: 高性能模式。</li>
<li><code v-pre>&quot;low-power&quot;</code>: 节能模式。</li>
</ul>
</li>
<li>
<p><strong><code v-pre>premultipliedAlpha</code></strong>: 表明排版引擎将假设绘制缓冲区包含预混合 alpha 通道的<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean" target="_blank" rel="noopener noreferrer"><code v-pre>boolean</code><ExternalLinkIcon/></a>值。</p>
</li>
<li>
<p><strong><code v-pre>preserveDrawingBuffer</code></strong>: 如果这个值为<code v-pre>true</code>缓冲区将不会被清除，会保存下来，直到被清除或被使用者覆盖。</p>
</li>
<li>
<p><strong><code v-pre>stencil</code></strong>: 表明绘制缓冲区包含一个深度至少为 8 位的模版缓冲区<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean" target="_blank" rel="noopener noreferrer"><code v-pre>boolean</code><ExternalLinkIcon/></a>值。</p>
</li>
</ul>
</li>
</ol>
</li>
<li>
<p>返回值</p>
<ol>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D" target="_blank" rel="noopener noreferrer"><code v-pre>CanvasRenderingContext2D</code><ExternalLinkIcon/></a> 为 <code v-pre>&quot;2d&quot;</code>,</li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext" target="_blank" rel="noopener noreferrer"><code v-pre>WebGLRenderingContext</code><ExternalLinkIcon/></a> 为<code v-pre>&quot;webgl&quot;</code> 和<code v-pre>&quot;experimental-webgl&quot;</code>,</li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL2RenderingContext" target="_blank" rel="noopener noreferrer"><code v-pre>WebGL2RenderingContext</code><ExternalLinkIcon/></a> 为<code v-pre>&quot;webgl2&quot;</code> 和<code v-pre>&quot;experimental-webgl2&quot;</code>, 或者</li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/ImageBitmapRenderingContext" target="_blank" rel="noopener noreferrer"><code v-pre>ImageBitmapRenderingContext</code><ExternalLinkIcon/></a> 为<code v-pre>&quot;bitmaprenderer&quot;</code>.</li>
</ol>
<p>如果 <code v-pre>contextType</code> 不是上述之一，返回<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null" target="_blank" rel="noopener noreferrer"><code v-pre>null</code><ExternalLinkIcon/></a>.</p>
</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> c <span class="token operator">=</span> documen<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'c'</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> ctx <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">"2d"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-填充和路径绘制" tabindex="-1"><a class="header-anchor" href="#_1-填充和路径绘制" aria-hidden="true">#</a> 1.填充和路径绘制</h2>
<p>填充</p>
<p><strong><code v-pre>CanvasRenderingContext2D.stroke()</code></strong> 是 Canvas 2D API 使用非零环绕规则，根据当前的画线样式，绘制当前或已经存在的路径的方法。</p>
<CommentService/></div></template>


