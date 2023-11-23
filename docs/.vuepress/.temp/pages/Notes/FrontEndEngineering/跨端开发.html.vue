<template><div><h1 id="跨端开发" tabindex="-1"><a class="header-anchor" href="#跨端开发" aria-hidden="true">#</a> 跨端开发</h1>
<p>跨端开发有三种</p>
<ul>
<li>Webview：该方案能够解析html，css并利用js引擎执行js，通过JSBridge完成原生的调用。</li>
<li>RN：利用原生UI去渲染，通过Android Bridge和IOS Bridge调用原生接口。</li>
<li>Flutter：利用Dart，给Skia渲染引擎提供数据，利用Skia绘图引擎进行绘制页面不要依赖任何原生的控件，没有中间损耗</li>
</ul>
<h2 id="webview" tabindex="-1"><a class="header-anchor" href="#webview" aria-hidden="true">#</a> Webview</h2>
<p>WebView 是跨端领域比较主流的方式，其本质就是在移动端系统中，内嵌的可以用来展示 Web 应用的组件。这让移动端可以像打开浏览器一样打开页面，被称为 Hybrid （混合）模式。</p>
<p>在 WebView 模式下，主流的技术落地有两种：一种是嵌入 H5 的混合 App，另外一种是小程序。这两种方式在<strong>渲染流程和通信流程</strong>上有一定区别。</p>
<h3 id="_1-1小程序的架构" tabindex="-1"><a class="header-anchor" href="#_1-1小程序的架构" aria-hidden="true">#</a> 1.1小程序的架构</h3>
<p>小程序分为逻辑层和渲染层。逻辑层=我们的业务代码。</p>
<p>小程序的示例代码</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// app.json中注册</span>
<span class="token punctuation">{</span>
  <span class="token string-property property">"pages"</span><span class="token operator">:</span><span class="token punctuation">[</span>
    <span class="token string">"pages/index/index"</span><span class="token punctuation">,</span> <span class="token comment">//然后在项目结构中创建对应的文件</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">"window"</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token string-property property">"backgroundTextStyle"</span><span class="token operator">:</span><span class="token string">"light"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"navigationBarBackgroundColor"</span><span class="token operator">:</span> <span class="token string">"#fff"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token comment">// index.js</span>
<span class="token function">Page</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token literal-property property">message</span><span class="token operator">:</span><span class="token string">'hello,world'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">context</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">'小程序'</span>，<span class="token string">'React Native'</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">onLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'===小程序页面 onLoad 执行==>'</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span> <span class="token comment">// undefined</span>
    
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">onReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'===小程序页面 onReady 执行==>'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">handleClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'点击事件'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// WXML</span>
<span class="token operator">&lt;</span>view bind<span class="token operator">:</span>tap<span class="token operator">=</span><span class="token string">"handleClick"</span> <span class="token operator">></span>hello<span class="token punctuation">,</span>world<span class="token operator">&lt;</span><span class="token operator">/</span>view<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>小程序中存在很多特有的函数，比如 Page、Component、Behaivor 等。这些函数通过<code v-pre>app-service.js</code>创建</p>
<p>WebView 是跨端领域比较主流的方式，其本质就是在移动端系统中，内嵌的可以用来展示 Web 应用的组件。这让移动端可以像打开浏览器一样打开页面，被称为 Hybrid （混合）模式。</p>
<p>在 WebView 模式下，主流的技术落地有两种：一种是嵌入 H5 的混合 App，另外一种是小程序。这两种方式在渲染流程和通信流程上有一定区别。</p>
<p>在渲染流程中，WebView H5 方案类似于传统的 Web 应用，先由 Native 打开一个 WebView 容器，WebView 就像浏览器一样，打开 WebView 对应的 URL 地址，然后进行请求资源、加载数据、绘制页面，最终页面呈现在我们眼前。</p>
<p>但是，小程序的 WebView 方案有所不同。小程序采用双线程架构，分为逻辑层和渲染层。首先也是 Native 打开一个 WebView 页面，渲染层加载 WXML 和 WXSS 编译后的文件，同时逻辑层用于逻辑处理，比如触发网络请求、setData 更新等等。接下来是请求资源，请求到数据之后，数据先通过逻辑层传递给 Native，然后通过 Native 把数据传递给渲染层 WebView，再进行渲染。</p>
<p>WebView H5 的通信流程也很简单，由 DOM 触发事件，像 Vue 或者 React 构建的 Web 应用会响应事件，然后通过数据驱动，更新视图。</p>
<p>但是在小程序中，触发的事件首先需要传递给 Native，再传递给逻辑层，逻辑层处理事件，再把处理好的数据传递给 Native，最后 Native 传递给渲染层，由渲染层负责渲染。</p>
<p>H5 模式我们再熟悉不过了，所以接下来我们重点介绍小程序逻辑层和渲染层的架构设计。要声明一点，这里的小程序不限于微信小程序，而是市面上小程序普遍的实现方案，包括支付宝小程序、京东小程序、美团小程序等。</p>
<h3 id="_1-2小程序逻辑层" tabindex="-1"><a class="header-anchor" href="#_1-2小程序逻辑层" aria-hidden="true">#</a> 1.2小程序逻辑层</h3>
<p>逻辑层处理
逻辑层到底长什么样子？
所谓小程序的逻辑层，指的就是我们在小程序 js 文件中写的业务逻辑。它和单页面应用 SPA 类似，不过有一定的差异。我们先来回顾一下 SPA 应用，以 React 框架为例，JSX 语法能够形象地表述出页面的结构，但其本质仍是 JS。页面即组件，组件本质上是函数，如果不做代码分割，所有的代码都会打包成一个 js 文件。</p>
<p>这一点小程序也比较像，如果想在小程序中开发一个页面，那么首先在 app.json 中注册页面。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token string-property property">"pages"</span><span class="token operator">:</span><span class="token punctuation">[</span>
    <span class="token string">"pages/index/index"</span><span class="token punctuation">,</span> 
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">"window"</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token string-property property">"backgroundTextStyle"</span><span class="token operator">:</span><span class="token string">"light"</span><span class="token punctuation">,</span>
    <span class="token string-property property">"navigationBarBackgroundColor"</span><span class="token operator">:</span> <span class="token string">"#fff"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
如上在 pages 属性下加入 pages<span class="token operator">/</span>index<span class="token operator">/</span>index ，就注册了第一个页面，然后我们在项目结构中创建对应的文件，如下所示：

WechatIMG11015<span class="token punctuation">.</span>png

接下来我们在 index<span class="token punctuation">.</span>js 中这么写：

<span class="token function">Page</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token literal-property property">message</span><span class="token operator">:</span><span class="token string">'hello,world'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">context</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">'小程序'</span>，<span class="token string">'React Native'</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">onLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'===小程序页面 onLoad 执行==>'</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span> <span class="token comment">// undefined</span>
    
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">onReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'===小程序页面 onReady 执行==>'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">handleClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'点击事件'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
在 <span class="token constant">WXML</span> 中这么写：

<span class="token operator">&lt;</span>view bind<span class="token operator">:</span>tap<span class="token operator">=</span><span class="token string">"handleClick"</span> <span class="token operator">></span>hello<span class="token punctuation">,</span>world<span class="token operator">&lt;</span><span class="token operator">/</span>view<span class="token operator">></span>
这样就能在页面呈现出hello<span class="token punctuation">,</span>world。那么，一个小程序的页面就创建出来了，但却暴露出了几个问题：

index 中的 Page 函数又是怎么来的？我们都知道小程序中存在很多特有的函数，比如 Page、Component、Behaivor 等。它们是从哪里来，又做了些什么呢？
在 index<span class="token punctuation">.</span>js 中的代码是如何执行的？message 属性都是怎么通过 <span class="token constant">JS</span> 传到了 <span class="token constant">WXML</span> 中，并渲染到页面上的。
我们带着上面两个问题来分析一下。首先，在浏览器环境下是不存在 Page 等函数的，并且如上在 onLoad 函数中，打印 window 对象为 <span class="token keyword">undefined</span>，这就说明逻辑层的 runtime 运行时并不是浏览器环境提供的。

小程序会有很多页面，一般情况下主包内容会被打包到一起，形成一个 js 文件，我们先称之为 app<span class="token operator">-</span>service<span class="token punctuation">.</span>js。这样一来，像 WebView 打开 pages<span class="token operator">/</span>index<span class="token operator">/</span>index 页面，逻辑层就会执行 app<span class="token operator">-</span>service<span class="token punctuation">.</span>js 中对应的代码，大致如下实现方式：

<span class="token comment">/* 存放对应的页面 */</span>
self<span class="token punctuation">.</span>source_code<span class="token punctuation">.</span>pages <span class="token operator">=</span> <span class="token punctuation">[</span>
   <span class="token punctuation">{</span>
       <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'pages/index/index'</span><span class="token punctuation">,</span> <span class="token comment">//对应的页面路径</span>
       <span class="token literal-property property">source</span><span class="token operator">:</span><span class="token punctuation">{</span> <span class="token comment">// js 逻辑资源</span>
           <span class="token function-variable function">jsCode</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">exports<span class="token punctuation">,</span> require<span class="token punctuation">,</span> module</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
               module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">wx<span class="token punctuation">,</span>App<span class="token punctuation">,</span>Page<span class="token punctuation">,</span>Component<span class="token punctuation">,</span>getApp<span class="token punctuation">,</span>global</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                   <span class="token comment">// 编译后小程序业务代码，这样就可以获取 wx,Page,Component 属性。</span>
                   <span class="token comment">// 业务代码</span>
               <span class="token punctuation">}</span>
           <span class="token punctuation">}</span><span class="token punctuation">,</span>
           <span class="token literal-property property">jsJson</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span>
       <span class="token punctuation">}</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span>
       <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'/app'</span> <span class="token comment">// 小程序 app 文件</span>
       <span class="token literal-property property">source</span><span class="token operator">:</span><span class="token punctuation">{</span>
           <span class="token function-variable function">jsCode</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">exports<span class="token punctuation">,</span> require<span class="token punctuation">,</span> module</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">wx<span class="token punctuation">,</span>App<span class="token punctuation">,</span>Page<span class="token punctuation">,</span>Component<span class="token punctuation">,</span>getApp<span class="token punctuation">,</span>global</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                   <span class="token comment">// 业务代码 </span>
                   <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
           <span class="token punctuation">}</span><span class="token punctuation">,</span>
       <span class="token punctuation">}</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">/* 存放对应的组件 */</span>
self<span class="token punctuation">.</span>source_code<span class="token punctuation">.</span>components <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token comment">/* 存放正常的 js 文件 */</span>
self<span class="token punctuation">.</span>source_code<span class="token punctuation">.</span>modules <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token comment">//对于 index.js 里面的代码，可以用 jsCode 函数包装；</span>
<span class="token comment">//对于组件（Component）层面的文件放在 components 数组里面；</span>
<span class="token comment">//对于一些其他的 js用 modules 数组来保存。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>webview实现多页面架构的优点</strong></p>
</blockquote>
<p>在单页面应用中，可以通过 router 控制路由的状态，如果要改变路由跳转到新页面，本质上还是要通过路由跳转，先找到对应的路由组件，再卸载掉之前组件，然后渲染新的组件，这种体验非常不好。而我们看到，很多原生 App 有很好的用户体验，比如 A 页面跳转到 B 页面，那么在 B 页面可以通过返回手势丝滑地回到 A 页面，这是单页面 SPA 应用难以做到的。</p>
<p>而<strong>小程序多页面架，每一个跳转页面都会创建WebView（最多10个，采用栈结构超过10个出栈，防止占用内存越来越大）</strong></p>
<h3 id="_1-3小程序渲染层" tabindex="-1"><a class="header-anchor" href="#_1-3小程序渲染层" aria-hidden="true">#</a> 1.3小程序渲染层</h3>
<p>视图层由多个 WebView 构成，每个 WebView 主体部分由 HTML 构成。我们在小程序写的 WXML 结构最后会被转变成 HTML 结构，写的 WXSS 结构，最后被转变成 CSS 结构。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span><span class="token operator">!</span><span class="token constant">DOCTYPE</span> html<span class="token operator">></span>
<span class="token operator">&lt;</span>html lang<span class="token operator">=</span><span class="token string">"en"</span><span class="token operator">></span>
<span class="token operator">&lt;</span>head<span class="token operator">></span>
    <span class="token operator">&lt;</span>meta charset<span class="token operator">=</span><span class="token string">"UTF-8"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>meta name<span class="token operator">=</span><span class="token string">"viewport"</span> content<span class="token operator">=</span><span class="token string">"width=device-width, initial-scale=1.0"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>title<span class="token operator">></span>page<span class="token operator">/</span>index<span class="token operator">/</span>index<span class="token operator">&lt;</span><span class="token operator">/</span>title<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>head<span class="token operator">></span>
<span class="token operator">&lt;</span>body<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 小程序基础库 <span class="token operator">--</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>script src<span class="token operator">=</span><span class="token string">"/page-frame/app.js"</span> <span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
    <span class="token operator">&lt;</span>script<span class="token operator">></span>
        <span class="token keyword">function</span> <span class="token function">bootstrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">/* 页面逻辑  */</span>
            window<span class="token punctuation">.</span>_pageName  <span class="token operator">=</span> <span class="token string">'page/index/index'</span>
            <span class="token keyword">var</span> script <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'script'</span><span class="token punctuation">)</span>
            <span class="token comment">/* 加载视图层的 js */</span>
            script<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'type'</span><span class="token punctuation">,</span><span class="token string">'text/javascript'</span><span class="token punctuation">)</span>
            script<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'src'</span><span class="token punctuation">,</span><span class="token string">'/_app/app-view.js'</span><span class="token punctuation">)</span>
            document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token function">bootstrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>html<span class="token operator">></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如何转化的呢？</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>view <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"container {{ show ? 'in' : 'out' }}"</span>  <span class="token operator">></span>
   <span class="token operator">&lt;</span>view bind<span class="token operator">:</span>tap<span class="token operator">=</span><span class="token string">"handleClick"</span> <span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span> message <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>view<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>view<span class="token operator">></span>
<span class="token comment">// -》》》》</span>
window<span class="token punctuation">.</span>source_code<span class="token punctuation">.</span>pages <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
    name<span class="token operator">:</span><span class="token string">'page/index/index'</span><span class="token punctuation">,</span>
    source<span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token string">'wxml'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            template<span class="token operator">:</span><span class="token keyword">null</span><span class="token punctuation">,</span>
            include<span class="token operator">:</span><span class="token keyword">null</span><span class="token punctuation">,</span>
            <span class="token function-variable function">render</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
               <span class="token keyword">return</span> <span class="token punctuation">[</span>
                   context<span class="token punctuation">.</span><span class="token function">renderNode</span><span class="token punctuation">(</span><span class="token string">'view'</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
                       props<span class="token operator">:</span><span class="token keyword">null</span><span class="token punctuation">,</span>
                       meta<span class="token operator">:</span><span class="token punctuation">{</span>
                           <span class="token comment">/* 合并 class 属性 */</span>
                           <span class="token keyword">class</span><span class="token operator">:</span> context<span class="token punctuation">.</span><span class="token function">mergeClass</span><span class="token punctuation">(</span><span class="token string">'container'</span><span class="token punctuation">,</span> context<span class="token punctuation">.</span><span class="token function">getPropsData</span><span class="token punctuation">(</span><span class="token string">'show'</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token string">'in'</span> <span class="token operator">:</span> <span class="token string">'out'</span>  <span class="token punctuation">)</span>
                       <span class="token punctuation">}</span><span class="token punctuation">,</span>
                   <span class="token punctuation">}</span><span class="token punctuation">,</span>
                   <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                           <span class="token keyword">return</span> <span class="token punctuation">[</span>
                               context<span class="token punctuation">.</span><span class="token function">renderNode</span><span class="token punctuation">(</span><span class="token string">'view'</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
                                   props<span class="token operator">:</span><span class="token keyword">null</span><span class="token punctuation">,</span>
                                   meta<span class="token operator">:</span><span class="token punctuation">[</span>
                                       on<span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">{</span>
                                           name<span class="token operator">:</span><span class="token string">'tap'</span><span class="token punctuation">,</span>
                                           event<span class="token operator">:</span><span class="token string">'handleClick'</span>
                                       <span class="token punctuation">}</span><span class="token punctuation">]</span>
                                   <span class="token punctuation">]</span>
                               <span class="token punctuation">}</span><span class="token punctuation">,</span>
                               <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                                   <span class="token keyword">return</span> <span class="token punctuation">[</span>
                                       <span class="token comment">/* 从 data 中获取 message 属性 */</span>
                                       context<span class="token punctuation">.</span><span class="token function">getPropsData</span><span class="token punctuation">(</span><span class="token string">'message'</span><span class="token punctuation">)</span>
                                   <span class="token punctuation">]</span>
                               <span class="token punctuation">}</span>
                               <span class="token punctuation">)</span>
                           <span class="token punctuation">]</span>
                     <span class="token punctuation">}</span>
                   <span class="token punctuation">)</span>
               <span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>context</code>包含<code v-pre>{renderNode，mergeClass}</code></p>
<h3 id="_2-1渲染层和逻辑层的通信jsbridge" tabindex="-1"><a class="header-anchor" href="#_2-1渲染层和逻辑层的通信jsbridge" aria-hidden="true">#</a> 2.1渲染层和逻辑层的通信JSBridge</h3>
<p><strong>JSBridge本质是Native约定好API实现方式，JS根据约定好的规则去实现。（比如 WebView 映射 Native 的方法叫做 JSOriginBridge，那么在 JS 端就需要调用 window 属性上的 JSOriginBridge 来实现通信。）</strong></p>
<p>JSBridge 简单理解就是向 JavaScript 中提供了可以调用 Native 方法的 api，并且 JavaScript 提供了 Native 调用的回调函数。这就实现了通信的<code v-pre>一来一回</code>，WebView 端可以向 Native 通信，Native 端也可以向 WebView 通信。</p>
<p>通过 Native 注入 api 本质上是 WebView 提供对应的接口，Native 可以通过接口把方法进行映射，并最终挂载 window 对象上。当 JavaScript 中调用该方法时，本质上调用的就是与之对应的 Native 方法。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">possNativeMessage</span><span class="token punctuation">(</span><span class="token parameter">message</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> isAndroid <span class="token operator">=</span> window<span class="token punctuation">.</span>navigator<span class="token punctuation">.</span>userAgent<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'Android'</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>isAndroid<span class="token punctuation">)</span><span class="token punctuation">{</span>
        window<span class="token punctuation">.</span>JSOriginBridge<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
        window<span class="token punctuation">.</span>webkit<span class="token punctuation">.</span>messageHandlers<span class="token punctuation">.</span>JSOriginBridge<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>前端实现</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> isAndroid <span class="token operator">=</span> window<span class="token punctuation">.</span>navigator<span class="token punctuation">.</span>userAgent<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'Android'</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span>
​
 <span class="token keyword">function</span> <span class="token function">possNativeMessage</span><span class="token punctuation">(</span><span class="token parameter">message</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>isAndroid<span class="token punctuation">)</span><span class="token punctuation">{</span>
        window<span class="token punctuation">.</span>JSOriginBridge<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
        window<span class="token punctuation">.</span>webkit<span class="token punctuation">.</span>messageHandlers<span class="token punctuation">.</span>JSOriginBridge<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
​
<span class="token comment">/* 向 Native 发布事件 */</span>
<span class="token keyword">function</span> <span class="token function">publishNativeMessage</span><span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> message <span class="token operator">=</span> <span class="token punctuation">{</span>
        eventType<span class="token operator">:</span><span class="token string">'publish'</span><span class="token punctuation">,</span>
        data<span class="token operator">:</span>params
    <span class="token punctuation">}</span>
    <span class="token function">possNativeMessage</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
​
<span class="token comment">/* 触发 Native 方法, 触发回调函数 */</span>
<span class="token keyword">function</span> <span class="token function">invokeNativeEvent</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span>params<span class="token punctuation">,</span>callbackId</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> message <span class="token operator">=</span> <span class="token punctuation">{</span>
        eventType<span class="token operator">:</span><span class="token string">'invoke'</span><span class="token punctuation">,</span>
        type<span class="token operator">:</span>name<span class="token punctuation">,</span>
        data<span class="token operator">:</span>params<span class="token punctuation">,</span>
        callbackId
    <span class="token punctuation">}</span>
    <span class="token function">possNativeMessage</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
​
<span class="token keyword">class</span> <span class="token class-name">JSBridge</span> <span class="token punctuation">{</span>
    <span class="token comment">/* 保存 */</span>
    eventHandlers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    responseCallbacks <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    callbackID <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        window<span class="token punctuation">.</span>_handleNativeCallback <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleNativeCallback</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
        window<span class="token punctuation">.</span>_handleNativeEvent <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleNativeEvent</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">/* 向 native 发送消息 */</span>
    <span class="token function">postMessage</span><span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span>
        <span class="token function">publishNativeMessage</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
     <span class="token comment">/* 向 native 发送消息,等待回调函数 */</span>
    <span class="token function">invoke</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span>payload<span class="token punctuation">,</span>callback</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>callbackID<span class="token operator">++</span>
        <span class="token comment">/* 将回调函数保存起来 */</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>responseCallbacks<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>callbackID<span class="token punctuation">,</span>callback<span class="token punctuation">)</span>
        <span class="token function">invokeNativeEvent</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span>payload<span class="token punctuation">,</span><span class="token keyword">this</span><span class="token punctuation">.</span>callbackID<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">/* 
    处理 native 调用 window 上的 _handleNativeCallback 方法。
    当执行 invoke 回调的时候，执行该方法
    */</span>
    <span class="token function">handleNativeCallback</span><span class="token punctuation">(</span><span class="token parameter">jsonResponse</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>jsonResponse<span class="token punctuation">)</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> callbackID<span class="token punctuation">,</span><span class="token operator">...</span>params <span class="token punctuation">}</span> <span class="token operator">=</span> res
        <span class="token keyword">const</span> callback <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>responseCallbacks<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>callbackID<span class="token punctuation">)</span>
        <span class="token comment">/* 取出回调函数并且执行 */</span>
        callback <span class="token operator">&amp;&amp;</span> <span class="token function">callback</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span>
        <span class="token comment">/* 删除对应的回调函数 */</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>responseCallbacks<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>callbackID<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">/* 
     处理 native 调用 window 上的 _handleNativeEvent 方法。
     处理绑定在 native 的事件
     */</span>
    <span class="token function">handleNativeEvent</span><span class="token punctuation">(</span><span class="token parameter">jsonResponse</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>jsonResponse<span class="token punctuation">)</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> eventName<span class="token punctuation">,</span><span class="token operator">...</span>params <span class="token punctuation">}</span> <span class="token operator">=</span> res
        <span class="token keyword">const</span> callback <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>eventHandlers<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>eventName<span class="token punctuation">)</span>
        <span class="token function">callback</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">/* 绑定注册事件 */</span>
    <span class="token function">registerEvent</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span>callback</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>eventHandlers<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span>callback<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">/* 解绑事件 */</span>
    <span class="token function">unRegisterEvent</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>eventHandlers<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">new</span> <span class="token class-name">JSBridge</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>初始化阶段会向 window 对象上绑定两个方法，_handleNativeCallback 和 _handleNativeEvent 这些方法是约定好的，可以由 Native 主动调用；</li>
<li>当向 Native 发送消息的时候，调用 postMessage 方法 ，本质上调用的是 publishNativeMessage，里面会判断系统类型调用不同的方法，<strong>向 Native 通信</strong>；</li>
<li>当调用 Native 方法 invoke 时候，首先会在 JS 端形成一个 callbackId，并通过键值对的形式把回调函数用 responseCallbacks 保存起来。接下来会<strong>向 Native 通信</strong>，当 Native 完成事件处理之后，会调用 _handleNativeCallback ，<strong>向 js 通信</strong>，参数里面有对应的 callbackId，这样 JS 可以通过 callbackId 找到对应回调函数并执行，然后清除回调函数就可以了。</li>
<li>当绑定 Native 事件的时候，本质上是通过 eventHandlers 保存回调函数，如果 Native 向 JS 主动通信，就会执行 _handleNativeEvent 方法，通过返回的参数找到绑定的函数，执行对应的函数就可以了。这样就完成了 Native 和 WebView 通信的全流程。</li>
</ol>
<h3 id="_2-2通信url-scheme拦截" tabindex="-1"><a class="header-anchor" href="#_2-2通信url-scheme拦截" aria-hidden="true">#</a> 2.2通信url scheme拦截</h3>
<p>通过 locaiton.href 或者 iframe.src 改变 url，Native 可以感知到 scheme 的变化进行拦截，参数会以 query string 的方式存在于 url 上。</p>
<p>scheme 跳转会有对应跳转协议，而头部大厂 App 中 scheme 的跳转和拦截都会有自己的一套规范。当然，这种方式的通信也有一些隐患，比如 url 长度的限制等。一个传统的自定义 scheme 如下：</p>
<p>xxx://xxx.xxx.com/message?name=alien</p>
<h3 id="_2-3native调用js方法" tabindex="-1"><a class="header-anchor" href="#_2-3native调用js方法" aria-hidden="true">#</a> 2.3Native调用JS方法</h3>
<p>Native 调用 JavaScipt 的方式本质上就是调用 WebView 上的方法。Native 调用 JavaScript 其实就是执行拼接 JavaScript 字符串，从外部调用 JavaScript 中的方法，因此 JavaScript 的方法必须在全局的 window 上。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">//这种方式可以直接调用 JS 中定义的函数</span>
WebView<span class="token punctuation">.</span><span class="token function">loadUrl</span><span class="token punctuation">(</span><span class="token string">"javascript:xxxfunction()"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//这种方式在 Android 4.4 以上的系统中使用效率会很高，并且能够接收到执行 js 方法后的返回值。</span>
webView<span class="token punctuation">.</span><span class="token function">evaluateJavascript</span><span class="token punctuation">(</span><span class="token string">"javascript:alert('大前端跨端开发指南')"</span><span class="token punctuation">,</span>resultCallback<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4小程序的通信" tabindex="-1"><a class="header-anchor" href="#_1-4小程序的通信" aria-hidden="true">#</a> 1.4小程序的通信</h3>
<p>小程序的双线程模型，即<strong>视图层</strong>和<strong>逻辑层</strong>是不能直接通信的，消息需要在 Native 中做中转，比如发生一次 setData ，通信方案就是数据从逻辑层的 JS 传递给 Native 层，再由 Native 层传递到 WebView 的 JS 层，然后再渲染视图，这期间数据需要经过序列化和反序列化，并且需要两次桥通信。</p>
<h3 id="_1-5小程序的编译" tabindex="-1"><a class="header-anchor" href="#_1-5小程序的编译" aria-hidden="true">#</a> 1.5小程序的编译</h3>
<p>WXML是在我们上传小程序包到后台的时候，就已经是 HTML 结构的包了，这一流程在本地就已经执行完毕。具体是通过开发者工具中两个模块来实现的。</p>
<ul>
<li><strong>wcc 模块</strong>：这个模块可以编译 WXML 文件，把 WXML 文件变成 <strong>《WebView 篇：小程序架构设计》</strong> 中提到的 JS 结构，接下来可以用小程序的运行时函数解析 WXML 树形成虚拟 DOM 树，最终通过 WebView 渲染到 HTML 文件上。</li>
<li><strong>wcsc 模块</strong>： 这个模块用于编译 WXSS 文件，可以通过不同的手机换算 rpx，最终形成可以识别的 px 单位。</li>
</ul>
<p>最后文件会被打包成 xxx.wxvpkg 格式的文件。那我们可以将小程序的代码和资源文件打包成一个文件，方便上传、发布和管理。wxvpkg 文件是一个压缩包，内部包含了小程序的所有代码、页面结构、样式、图片等静态资源。可以通过相关的反解 wxvpkg 文件，得到 html 等结构。</p>
<p>wxss文件会被解析编译，变成字符串数组，最后变成字符串结构拼接，并通过 JS 来动态创建 style 标签插入到 head 里。</p>
<p>example</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>page<span class="token punctuation">{</span>
    <span class="token literal-property property">background</span><span class="token operator">:</span>#ccc<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">.</span>box<span class="token punctuation">{</span>
    <span class="token literal-property property">background</span><span class="token operator">:</span>pink<span class="token punctuation">;</span>
    <span class="token literal-property property">width</span><span class="token operator">:</span>200rpx<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
上面的代码会被转化为
<span class="token punctuation">[</span><span class="token string">'.box { background:pink;width:'</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token string">';}\n'</span><span class="token punctuation">,</span> <span class="token string">'page'</span><span class="token punctuation">,</span> <span class="token string">'{ background:#ccc; }'</span> <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p>wxml最终也会变长 JS 结构，其本质就是模版函数。在小程序 WebView 中可以通过 <code v-pre>$gwx(path)</code> 来获取对应页面的模版函数。example:</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>view  <span class="token operator">></span>
    <span class="token operator">&lt;</span>text<span class="token operator">></span>hello<span class="token punctuation">,</span>world<span class="token operator">&lt;</span><span class="token operator">/</span>text<span class="token operator">></span>
	<span class="token operator">&lt;</span>view<span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span>msg<span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token operator">&lt;</span><span class="token operator">/</span>view<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>view<span class="token operator">></span>
<span class="token literal-property property">data</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token literal-property property">msg</span><span class="token operator">:</span><span class="token string">'hello,world'</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token operator">-</span><span class="token operator">>>></span><span class="token operator">></span>
<span class="token keyword">function</span> <span class="token function">templateFun</span><span class="token punctuation">(</span><span class="token parameter">context<span class="token punctuation">,</span>scope</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token punctuation">[</span>
       context<span class="token punctuation">.</span><span class="token function">createNode</span><span class="token punctuation">(</span>
           <span class="token string">'view'</span><span class="token punctuation">,</span>
           <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
           <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
               <span class="token keyword">return</span> <span class="token punctuation">[</span>
                   context<span class="token punctuation">.</span><span class="token function">createNode</span><span class="token punctuation">(</span><span class="token string">'text'</span><span class="token punctuation">,</span>
                   <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                       <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token string">'hello,world'</span><span class="token punctuation">]</span>
                    <span class="token punctuation">}</span>
                   <span class="token punctuation">)</span>
               <span class="token punctuation">]</span>
           <span class="token punctuation">}</span>
        <span class="token punctuation">)</span>
   <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">createNode</span><span class="token punctuation">(</span><span class="token parameter">tag<span class="token punctuation">,</span>attr<span class="token punctuation">,</span>children</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token punctuation">{</span>
       tag<span class="token punctuation">,</span>
       attr<span class="token punctuation">,</span>
       childten
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> vnode
<span class="token punctuation">}</span>
对于模板中的数据
<span class="token function">createNode</span><span class="token punctuation">(</span><span class="token string">'view'</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span>
        context<span class="token punctuation">.</span><span class="token function">getPropsData</span><span class="token punctuation">(</span><span class="token string">'msg'</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-6小程序基础库" tabindex="-1"><a class="header-anchor" href="#_1-6小程序基础库" aria-hidden="true">#</a> 1.6小程序基础库</h3>
<p>小程序的基础库主要由两部分组成 <strong>WAService</strong> 和 <strong>WAWebview</strong>。</p>
<ul>
<li>WAWebview：小程序视图层基础库，可以提供视图层基础能力。</li>
<li>WAService：小程序逻辑层基础库，提供逻辑层基础能力。</li>
</ul>
<p>其中 WAWebview 最主要的几个部分如下所示。</p>
<ul>
<li>
<p>Foundation：基础模块(发布订阅、通信和处理事件)。</p>
<ul>
<li>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">EventEmitter</span><span class="token operator">:</span><span class="token keyword">class</span> <span class="token class-name">i</span>
  <span class="token literal-property property">emit</span><span class="token operator">:</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token literal-property property">on</span><span class="token operator">:</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token literal-property property">once</span><span class="token operator">:</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token literal-property property">emitConfigReady</span><span class="token operator">:</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token literal-property property">global</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span>
  <span class="token literal-property property">env</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>weixinJsBridge：负责通信的模块 JSBridge 。</p>
</li>
<li>
<p>exparser：这是微信中的组件模块，它实现了一套自定义的组件模型，其本质是利用 <code v-pre>WebComponent </code>形成的一套自定义的标签系统。比如微信中的 view，可以通过自定义的 wx-view 来实现；再比如 text，其本质就是自定义的 wx-text。</p>
<ul>
<li>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">ELement</span><span class="token operator">:</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token literal-property property">Observer</span><span class="token operator">:</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token literal-property property">ShadowRoot</span><span class="token operator">:</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">// 元素相关</span>
  <span class="token literal-property property">registerElement</span><span class="token operator">:</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
  <span class="token literal-property property">createELement</span><span class="token operator">:</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token literal-property property">appendChild</span><span class="token operator">:</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token literal-property property">removeChild</span><span class="token operator">:</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">// 处理事件</span>
  <span class="token literal-property property">triggerEvent</span><span class="token operator">:</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token literal-property property">Event</span><span class="token operator">:</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>virtualDOM：小程序的虚拟 DOM，小程序也有一套自己的虚拟 DOM 系统。</p>
</li>
<li>
<p>Reporter：日志上报模块(异常和性能统计数据)。</p>
</li>
</ul>
<p>WAService 的主要部分。</p>
<ul>
<li>Foundation：提供逻辑层的基础模块。</li>
<li>WeixinJSBridge：之前讲到小程序是双线程架构模型，实现通信。</li>
<li>JSContext：JS 引擎提供了运行时的上下文。</li>
<li>基础方法：比如小程序的 App、Page、Component、Behavior、getApp、getCurrentPages 等构造函数。</li>
</ul>
<h3 id="_3-1-webview的本质" tabindex="-1"><a class="header-anchor" href="#_3-1-webview的本质" aria-hidden="true">#</a> 3.1 webview的本质</h3>
<p>WebView是一种用于在应用程序中显示Web内容的组件或控件。它可以嵌入到应用程序的用户界面中，用于加载和显示Web页面、HTML内容或者其他Web相关的资源。WebView的本质是一个用于渲染Web内容的浏览器引擎。它通常基于操作系统或者特定平台提供的浏览器引擎，如WebKit或Chromium。WebView提供了一种将Web内容集成到原生应用程序中的方式，使得应用程序能够显示Web页面，并与Web内容进行交互。</p>
<p>了解Vue、React框架运行本质</p>
<p><img src="/Project/vue_and_react.png" alt=""></p>
<p>运行时：Vue-&gt;浏览器会加载相关资源，然后通过 Vue 运行时 api 形成虚拟 DOM 树，并渲染视图。Reac-&gt;当浏览器打开应用的时候，会加载这些文件，然后 js 会通过 React 运行时提供的 API 变成 fiber 树结构，接下来就会形成 DOM 树，然后浏览器用 html 作为载体，加入 css 树和 DOM 树，形成渲染树，这样视图就呈现了。</p>
<p>再看小程序运行结构图</p>
<p><img src="/Project/small_project.png" alt=""></p>
<p>运行时：在 Native 启动小程序的时候，会下载压缩包，变成逻辑层的 js 文件，和视图层的 js 文件，并分别在视图层和逻辑层注入小程序的基础库。对于逻辑层的执行，是 Native 创建的独立的 js 引擎来驱动，并完成初始化流程的；对于视图层，则是打开一个 html 文件，加载视图层的 js , 视图层的 js 可以吧样式动态插入 <code v-pre>&lt;head&gt;</code> 标签里。然后通过 $gwx 找到对应的视图层结构，形成虚拟 DOM 并渲染。</p>
<blockquote>
<p>DSL(领域特定语言（英语：domain-specific language）简称 DSL，比如 SQL , JSON 等。)</p>
</blockquote>
<p>DSL 分为内部 DSL 和外部 DSL 。</p>
<ul>
<li>使用独立的解释器或编译器实现的 DSL 被称为外部 DSL。 外部 DSL 的优点在于它是独立于程序开发语言的。对某个特定领域进行操作的程序不一定是使用同一种语言来写的。SQL 就是一种 DSL，学会了 SQL 就可以在不同的语言中使用相同的 SQL 来操作数据库。</li>
<li>内部 DSL。（则是在一个宿主语言（host language）中实现，它一般以库的形式实现，并倾向于使用宿主语言中的语法。内部 DSL 的优点和缺点与外部 DSL 相反，它借助了宿主语言的语法，程序员无需学习一种新的语言。但是它被限制在宿主语言能够描述的范围内，因此自由度较低。(例如Vue、React 依赖js)</li>
</ul>
<blockquote>
<p>example–》<strong>以 React 做 DSL 应用转 小程序应用</strong></p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">MyReactDemo</span> <span class="token keyword">extends</span> <span class="token class-name">MyReact<span class="token punctuation">.</span>Component</span><span class="token punctuation">{</span>
    state<span class="token operator">=</span><span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'大前端跨端开发指南'</span>
    <span class="token punctuation">}</span>
    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> name <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state
        <span class="token keyword">const</span> list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=></span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> name <span class="token operator">+</span> item
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token operator">&lt;</span>View<span class="token operator">></span> 
           <span class="token punctuation">{</span> list<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=></span><span class="token punctuation">{</span> 
               <span class="token keyword">return</span> <span class="token operator">&lt;</span>View<span class="token operator">></span><span class="token punctuation">{</span>item<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>View<span class="token operator">></span>
           <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>View<span class="token operator">></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
————》》
<span class="token operator">&lt;</span>view<span class="token operator">></span>
    <span class="token operator">&lt;</span>view wx<span class="token operator">:</span><span class="token keyword">for</span><span class="token operator">=</span><span class="token string">"{{ render_data1 }}"</span> <span class="token literal-property property">wx</span><span class="token operator">:</span><span class="token keyword">for</span><span class="token operator">-</span>item<span class="token operator">=</span><span class="token string">"item"</span> <span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span> item <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>view<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>viewe<span class="token operator">></span>
<span class="token function">$$createData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> name <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>data
    <span class="token keyword">const</span> render_data1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=></span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> name <span class="token operator">+</span> item
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
       render_data1
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2webview的优-缺点" tabindex="-1"><a class="header-anchor" href="#_3-2webview的优-缺点" aria-hidden="true">#</a> 3.2webview的优/缺点</h3>
<p>优点：</p>
<ul>
<li>版本控制灵活：前端Web应用可以单独进行版本控制，而后端或原生应用程序可以保持相对稳定，只需根据需要更新Web内容。这样，前端开发团队可以独立于后端或原生应用程序团队进行版本控制和发布，从而提高开发效率和部署灵活性。</li>
<li>跨平台兼容性：WebView通常具有良好的跨平台兼容性，因为Web技术是跨平台的。一次开发可以在多个平台上使用WebView来呈现Web内容，包括Android、iOS和其他平台。这样可以减少开发人员的工作量，并确保应用程序在多个平台上具有一致的外观和行为。</li>
<li>动态化更新：由于WebView可以加载和显示Web内容，因此可以在不更新应用程序本身的情况下，通过重新部署前端Web应用来实现动态化更新。这意味着开发人员可以更快速地更新应用程序的界面、布局、样式和功能，以及修复和改进应用程序，而无需用户下载和安装新的应用程序版本。</li>
</ul>
<p>但是 webview 渲染模式的应用也有比较明显的缺陷：</p>
<ul>
<li>第一个就是性能方面上不如原生 Native 应用，而且 Native 应用还有一些原生组件的支持，比如长列表组件 RecyclerView 等。</li>
<li>第二个就是 webview 应用没有 Native 应用直接调用设备的能力，如果想要实现，可能还需要与 Native 进行桥通信。</li>
<li>安全性风险：WebView渲染可能面临一些安全风险。WebView加载和执行Web内容，包括来自不受信任来源的代码，这可能导致安全漏洞。不正确的WebView配置和处理可能使应用程序容易受到跨站脚本攻击（XSS）或其他安全漏洞的影响。开发人员需要采取适当的安全措施来保护WebView应用程序免受潜在的安全威胁。</li>
</ul>
<h3 id="_3-3native原生渲染" tabindex="-1"><a class="header-anchor" href="#_3-3native原生渲染" aria-hidden="true">#</a> 3.3Native原生渲染</h3>
<p>Native 应用无法实现<strong>动态化</strong>，每次都需要重新发版本，并且还有包体积等因素限制，所以在传统 web 应用和原生 Native 应用，需要一种中间态，既能够实现动态化发版本，也能解决性能等瓶颈，这个就是 <strong>DSL Native 渲染模式</strong>。</p>
<p>Native 渲染模式的前端框架，有 React 官方提供的 React Native，也有以 React 语法做 DSL 的框架 Rax, 再或者用 Vue 做 DSL 的 weex 。 这些跨端框架，也可以通过强大的<strong>运行时</strong>和<strong>编译时</strong>能力，在 web 应用和小程序应用中，实现相互转化，在动态化的基础上实现了<strong>多端复用</strong>。</p>
<p><strong>Native</strong> 本质上就是用 JavaScript 作为逻辑层的处理，再用 Native 进行渲染的方式。也就是视图的描述和整体的逻辑交互都是在 JS 层面处理的。当 JS 处理完逻辑之后，会通知给 Native 去重新渲染视图。这样就保障了 Native 渲染的高性能。同样实现动态化也非常容易，Native 渲染模式下，逻辑层就是 JS ,那么可以把对应的 JS 上传到云平台，然后 Native 动态向平台拉去最新的 JS 文件，这样就可以实现动态化的更新了。</p>
<h2 id="rn" tabindex="-1"><a class="header-anchor" href="#rn" aria-hidden="true">#</a> RN</h2>
<h3 id="rn应用的引擎" tabindex="-1"><a class="header-anchor" href="#rn应用的引擎" aria-hidden="true">#</a> RN应用的引擎</h3>
<p>RN 在 0.60 版本之前使用 JSCore 作为默认的 JS 引擎。JSCore 全名 JavaScriptCore，是 WebKit 默认内嵌的 JS 引擎，JSCore作为一个系统级 Framework 被苹果提供给开发者，作为苹果的浏览器引擎 WebKit 中重要组成部分。但是 JSCore 没有对 Android 机型做好适配，在性能、体积和内存上和 V8 有着明显的差别。基于这个背景，RN 团队提供了 JSI （JavaScript Interface）框架，JSI 并不是 RN 的一部分，JSI 可以视作一个兼容层，意在磨平不同 JS 引擎中的差异性。JSI 实现了引擎切换，比如在 iOS 平台运行的 JSCore，在 Andriod 中运行的是 Hermes 引擎。我们来看一下具体的实现细节。JSI 作为引擎统一的通用层，JSI 会定义与 JS 引擎交互的接口以及数据转化的方法。比如在 JSI 中定义了一个执行 JS 的方法叫做 evaluateJavaScript()。具体如何执行 JS 代码其实是由各引擎实现的，通过这种方式屏蔽不同引擎间的差异，可以方便地实现 JS 引擎切换。</p>
<p>RN的中间通信层是C++，而且数据传输不需要序列化，所以效率会高一些</p>
<h2 id="flutter" tabindex="-1"><a class="header-anchor" href="#flutter" aria-hidden="true">#</a> Flutter</h2>
<p><img src="/Flutter/render.png" alt=""></p>
<ul>
<li>flutter用dart构建图层树</li>
<li>图层树在GPU线程进行合成</li>
<li>合成后的数据给Skia引擎</li>
<li>Skia引擎通过OpenGl或者Vulkan将显示的内容给GPU</li>
</ul>
<p>Flutter为什么能跨平台？</p>
<p>因为Skia是跨平台的，他作为Fultter IOS渲染引擎被嵌入到Flutter的IOS SDK中替代了IOS闭源的Core Graphics/Core Animation/Core Text，因此Flutter IOS SDK打包的体积比安卓要大一些。</p>
<h2 id="帧率和刷新率的关系" tabindex="-1"><a class="header-anchor" href="#帧率和刷新率的关系" aria-hidden="true">#</a> 帧率和刷新率的关系</h2>
<ul>
<li>GPU/CPU向Buffer中生成图像，屏幕从Buffer中取图像。理想情况帧率和刷新频率相同。</li>
<li>但实际上他们往往不同，例如当帧率大于刷新率，屏幕还没有刷新第n-1帧时，GPU已经生成第n帧了。从上往下开始覆盖第n-1帧的数据，当屏幕开始刷新n-1帧时，Buffer中上半部分是第n帧数据，下班部分是第n-1帧数据。显示出来的图像出现偏差这种现象成为<strong>撕裂</strong></li>
<li>解决撕裂方案**：双缓存和垂直同步信号VSync**。GPU向Back Buffer中写入数据，屏幕从Frame Buffer中读取数据，VSync负责调度从Back -》Frame的复制操作。（这里的复制是教化内存地址的方式）当VSync完成复制操作后，通知GPU/CPU绘制下一帧图像。</li>
</ul>
<p>双缓存可能存在的问题：某一帧绘制时间过长，导致画面产生空白。使用三重缓存解决。</p>
<CommentService/></div></template>


