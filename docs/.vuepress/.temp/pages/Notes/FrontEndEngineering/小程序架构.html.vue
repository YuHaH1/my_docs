<template><div><h1 id="小程序架构" tabindex="-1"><a class="header-anchor" href="#小程序架构" aria-hidden="true">#</a> 小程序架构</h1>
<p><img src="/Eng/minprogram.png" alt=""></p>
<h2 id="前置知识" tabindex="-1"><a class="header-anchor" href="#前置知识" aria-hidden="true">#</a> 前置知识</h2>
<p>1.<code v-pre>WebView</code></p>
<p><code v-pre>WebView</code> 是移动端（手机、IPad）提供的运行 <code v-pre>JavaScript</code> 的环境，是系统渲染 Web 网页的一个控件，可与页面 <code v-pre>JavaScript</code> 交互，实现 APP 与 Web 的混合开发，<code v-pre>WebView</code> 渲染 Web 页面需要强大的渲染内核支持，这其中 Android 与 IOS 系统的内核又有所不一样。</p>
<p><code v-pre>Webview</code> 基于<code v-pre>webkit</code>引擎，可以解析<code v-pre>DOM</code> 元素，展示<code v-pre>html</code>页面的控件，它和浏览器展示页面的原理是相同的， 所以可以把它当做浏览器看待。（chrome浏览器也是基于<code v-pre>webkit</code>引擎开发的，Mozilla浏览器是基于Gecko引擎开发的）</p>
<h2 id="_2-执行环境" tabindex="-1"><a class="header-anchor" href="#_2-执行环境" aria-hidden="true">#</a> 2.执行环境</h2>
<ul>
<li>网页开发，渲染线程和脚本是互斥的，这也是为什么长时间的脚本运行可能会导致页面失去响应的原因，本质就是我们常说的 <code v-pre>JS</code> 是单线程的。</li>
<li>小程序，视图层和逻辑层是分开的，双线程同时运行，视图层的界面使用 <code v-pre>WebView</code> 进行渲染，逻辑层运行在 <code v-pre>JSCore</code> 中。</li>
<li>网页开发，主要面对各厂商的浏览器，在移动端还需要面对 <code v-pre>Safari</code>、<code v-pre>Chrome</code> 以及 <code v-pre>iOS</code>、<code v-pre>Android</code> 系统中的各式 <code v-pre>WebView</code>。</li>
<li>小程序，主要面对两大操作系统IOS和Android的微信客户端，还有开发工具、PC端（window）、Mac。开发时候需要注意的是微信客户端的版本号和小程序API 支持的基础库版本号。</li>
</ul>
<CommentService/></div></template>


