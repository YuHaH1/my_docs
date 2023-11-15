<template><div><h1 id="vue3" tabindex="-1"><a class="header-anchor" href="#vue3" aria-hidden="true">#</a> Vue3</h1>
<h2 id="vue3做了哪些优化" tabindex="-1"><a class="header-anchor" href="#vue3做了哪些优化" aria-hidden="true">#</a> Vue3做了哪些优化</h2>
<ol>
<li>响应式用proxy，并采用懒劫持的方式。</li>
<li>style中可以用<code v-pre>v-bind()</code>绑定响应式数据。</li>
<li>diff算法采用最长递增子序列效率更高。</li>
<li>编译时优化：
<ol>
<li>静态结点提升，提前将静态结点创建并缓存好减少更新时创建虚拟DOM的开销和内存占用（静态节点将提升升至渲染函数之外）。</li>
<li>在静态提升基础上，如果有大量连续的静态标签结点就做预字符串化（静态内同通过innerHTML设置性能上有优势）。</li>
<li>缓存内联事件处理函数例如<code v-pre>@click=falg = !flag</code>。避免造成不必要的组件更新（每次重新渲染，组件都会创建一个全新的props对象，同时props对象中的该内联事件函数也是全新的函数。这导致渲染器对组件进行更新造成额外的性能开销）。</li>
<li><code v-pre>v-once</code>指令会缓存全部或部分虚拟结点，避免组件更新重新创建虚拟DOM以及无意义的Diff操作</li>
</ol>
</li>
</ol>
<h2 id="同构渲染" tabindex="-1"><a class="header-anchor" href="#同构渲染" aria-hidden="true">#</a> 同构渲染</h2>
<p>当首次访问或者刷新页面时，整个页面的内容是在服务端完成渲染的，浏览器最终得到的是渲染好的 HTML 页面。但是该页面是纯静态的，这意味着用户还不能与页面进行任何交互，因为整个应用程序的脚本还没有加载和执行。</p>
<p>第一次请求之后客户端 JavaScript 资源加载完毕后，会进行激活操作，这里的激活就是我们在 Vue.js 中常说的 “hydration”。激活包含两部分工作内容。</p>
<ul>
<li><strong>Vue.js 在当前页面已经渲染的 DOM 元素以及 Vue.js 组件所渲染的虚拟 DOM 之间建立联系。</strong></li>
<li><strong>Vue.js 从 HTML 页面中提取由服务端序列化后发送过来的数据，用以初始化整个 Vue.js 应用程序。</strong></li>
</ul>
<p>激活完成后，整个应用程序已经完全被 Vue.js 接管为 CSR 应用程序了。后续操作都会按照 CSR 应用程序的流程来执行。当然，如果刷新页面，仍然会进行服务端渲染，然后再进行激活，如此往复。</p>
<CommentService/></div></template>


