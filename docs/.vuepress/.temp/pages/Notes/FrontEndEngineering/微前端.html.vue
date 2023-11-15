<template><div><h1 id="微前端" tabindex="-1"><a class="header-anchor" href="#微前端" aria-hidden="true">#</a> 微前端</h1>
<h2 id="为什么不用iframe" tabindex="-1"><a class="header-anchor" href="#为什么不用iframe" aria-hidden="true">#</a> 为什么不用iframe</h2>
<p>如果考虑实际问题iframe是最完美的微前端方案</p>
<p>iframe 最大的特性就是提供了浏览器原生的硬隔离方案，不论是样式隔离、js 隔离这类问题统统都能被完美解决。但他的最大问题也在于他的隔离性无法被突破，导致应用间上下文无法被共享，随之带来的开发体验、产品体验的问题。</p>
<p><strong>iframe的缺点：</strong></p>
<ol>
<li>url 不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。</li>
<li>UI 不同步，DOM 结构不共享。想象一下屏幕右下角 1/4 的 iframe 里来一个带遮罩层的弹框，同时我们要求这个弹框要浏览器居中显示，还要浏览器 resize 时自动居中。</li>
<li>全局上下文完全隔离，内存变量不共享。iframe 内外系统的通信、数据同步等需求，主应用的 cookie 要透传到根域名都不同的子应用中实现免登效果。</li>
<li>慢。每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程。</li>
</ol>
<h2 id="_1-微前端解决了什么问题" tabindex="-1"><a class="header-anchor" href="#_1-微前端解决了什么问题" aria-hidden="true">#</a> 1.微前端解决了什么问题？</h2>
<p>1.随着应用程序的规模不断增大，代码库也会变得越来越复杂，导致开发人员难以理解和维护。</p>
<p>2.在传统的前端应用程序中，所有的开发人员都必须使用相同的技术栈和框架进行开发，这限制了开发人员的选择和自由度。</p>
<p>微前端的优点</p>
<p>1.**大型应用程序的可维护性：**微前端将应用程序拆分成小块，每个小块都有自己的职责和功能，使得代码库更加清晰和易于维护。</p>
<p>2.<strong>团队协作便利性</strong>：微前端允许每个小块使用不同的技术栈和框架，使得开发人员可以选择最适合自己的工具和技术进行开发，从而提高团队协作的效率和质量。</p>
<p>3.**可独立部署和扩展：**微前端允许每个小块独立地进行部署和扩展，这样可以避免整个应用程序的停机时间和风险，并且可以更加灵活地扩展应用程序的功能。此外，微前端还可以让不同的小块在不同的服务器上运行，从而提高应用程序的性能和可用性。</p>
<p>4.<strong>适应不同的场景和需求</strong>：微前端可以将应用程序拆分成小块，每个小块都可以被设计为不同的场景和需求。</p>
<p>下面两个问题是微前端需要考虑的问题。</p>
<p>1.JS沙箱问题</p>
<p>2.样式隔离问题</p>
<h2 id="_2-js沙盒" tabindex="-1"><a class="header-anchor" href="#_2-js沙盒" aria-hidden="true">#</a> 2.JS沙盒</h2>
<p>JS沙盒是一种安全的JavaScript执行环境，可以限制脚本的访问权限，从而保护宿主环境免受恶意脚本的攻击。在微前端中，我们需要给子应用提供沙盒环境，<strong>防止应用之间互相污染以及污染全局变量。</strong></p>
<p><strong>with() + new Function(code) + Proxy</strong></p>
<p><code v-pre>with</code> 语法用于改变作用域链，这里用来拦截写访问全局变量时对 window 的查找，如直接访问 <code v-pre>Array.from</code> 而不是 <code v-pre>window.Array.from</code> 写法时；</p>
<p><code v-pre>new Function</code> 执行 code 作用等同于 eval，但 eval 能访问到当前局部作用域变量，new Function 返回函数不管哪里执行，都只能访问全局作用域，正是我们想要的。</p>
<p>而 <code v-pre>Proxy</code> 提供的是 with 和 new Function 闭包中用到的充当 window 作用域的对象，通过白名单属性限制能访问真正 window 上的部分元素，通过 Proxy 让删除 / 添加全局变量 / api 时不会对真正全局 window 产生影响；</p>
<p>同时对 document / history / localtion 上各类操作做劫持，比如把 document.body 上插入元素乾坤大挪移、把 history.push 改写再同步到 url、把 localtion path 拦截让子应用只获取内部路由， 等等，这些种种限制组成沙箱环境；</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 简化伪代码示例</span>
window <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span><span class="token function">pick</span><span class="token punctuation">(</span>window<span class="token punctuation">,</span> whiteListProperties<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
document <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>document<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token operator">...</span>

sandbox <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Function</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
  return function ({ window, location, history, document }, code){
    with(window) {
      </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>code<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
    }
}</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>

<span class="token function">sandbox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>window<span class="token punctuation">,</span> <span class="token punctuation">{</span> window<span class="token punctuation">,</span> location<span class="token punctuation">,</span> history<span class="token punctuation">,</span> document <span class="token punctuation">}</span><span class="token punctuation">,</span> code<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1、快照沙箱" tabindex="-1"><a class="header-anchor" href="#_2-1、快照沙箱" aria-hidden="true">#</a> 2.1、快照沙箱</h3>
<p><strong>把主应用的 <code v-pre>window</code> 对象做浅拷贝，将 <code v-pre>window</code> 的键值对存成一个 <code v-pre>Hash Map</code>。之后无论微应用对 <code v-pre>window</code> 做任何改动，当要在恢复环境时，把这个 <code v-pre>Hash Map</code> 又应用到 <code v-pre>window</code> 上就可以了</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">iter</span><span class="token punctuation">(</span>obj<span class="token operator">:</span> <span class="token keyword">typeof</span> window<span class="token punctuation">,</span> <span class="token function-variable function">callbackFn</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">prop</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// eslint-disable-next-line guard-for-in, no-restricted-syntax</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> prop <span class="token keyword">in</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>prop<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">callbackFn</span><span class="token punctuation">(</span>prop<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 基于 diff 方式实现的沙箱，用于不支持 Proxy 的低版本浏览器
 */</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">SnapshotSandbox</span> <span class="token keyword">implements</span> <span class="token class-name">SandBox</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">proxy</span><span class="token operator">:</span> WindowProxy<span class="token punctuation">;</span>

  <span class="token literal-property property">name</span><span class="token operator">:</span> string<span class="token punctuation">;</span>

  <span class="token literal-property property">type</span><span class="token operator">:</span> SandBoxType<span class="token punctuation">;</span>

  sandboxRunning <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

  <span class="token keyword">private</span> windowSnapshot<span class="token operator">!</span><span class="token operator">:</span> Window<span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token literal-property property">modifyPropsMap</span><span class="token operator">:</span> Record<span class="token operator">&lt;</span>any<span class="token punctuation">,</span> any<span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">name</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>proxy <span class="token operator">=</span> window<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> SandBoxType<span class="token punctuation">.</span>Snapshot<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">active</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 记录当前快照</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>windowSnapshot <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token keyword">as</span> Window<span class="token punctuation">;</span>
    <span class="token function">iter</span><span class="token punctuation">(</span>window<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">prop</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>windowSnapshot<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> window<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 恢复之前的变更</span>
    Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>modifyPropsMap<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">p</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      window<span class="token punctuation">[</span>p<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>modifyPropsMap<span class="token punctuation">[</span>p<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>sandboxRunning <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">inactive</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>modifyPropsMap <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token function">iter</span><span class="token punctuation">(</span>window<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">prop</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>window<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">!==</span> <span class="token keyword">this</span><span class="token punctuation">.</span>windowSnapshot<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 记录变更，恢复环境</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>modifyPropsMap<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> window<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">;</span>
        window<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>windowSnapshot<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">'development'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">[qiankun:sandbox] </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> origin window restore...</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>modifyPropsMap<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>sandboxRunning <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>子应用 <code v-pre>mount</code> 时</p>
<ul>
<li>先把上一次记录的变更 <code v-pre>modifyPropsMap</code> 应用到子应用的全局 <code v-pre>window</code>，没有则跳过</li>
<li>浅复制主应用的 <code v-pre>window</code> key-value 快照，用于下次恢复全局环境</li>
</ul>
<p>子应用  <code v-pre>unmount</code> 时</p>
<ul>
<li>将当前子应用  <code v-pre>window</code> 的 <code v-pre>key-value</code> 和 <code v-pre>快照</code> 的 <code v-pre>key-value</code> 进行 Diff，Diff 出来的结果用于下次恢复微应用环境的依据</li>
<li>将上次快照的 <code v-pre>key-value</code> 拷贝到主应用的 <code v-pre>window</code> 上，以此恢复环境</li>
</ul>
</div>
<p><strong>快照沙箱存在的问题</strong>：</p>
<p>1.会改变全局window的属性，如果同时运行多个微应用，多个应用同时改写window上的属性，势必会出现状态混乱，<strong>支持多应用的代理沙箱</strong>可以很好的解决这个问题；</p>
<p>2.会通过<code v-pre>for(prop in window){}</code>的方式来遍历window上的所有属性，window属性众多，这其实是一件很耗费性能的事情。关于这个问题<strong>支持单应用的代理沙箱</strong>和<strong>支持多应用的代理沙箱</strong>都可以规避。</p>
<h3 id="_2-2、代理沙箱" tabindex="-1"><a class="header-anchor" href="#_2-2、代理沙箱" aria-hidden="true">#</a> 2.2、代理沙箱</h3>
<p>实现原理：</p>
<ol>
<li>用<code v-pre>fakewindow</code>做一个代理，当写入某个属性值时判断window身上是否存在该属性，如果不存在则将该属性和值放入<code v-pre>addedmap</code>中如果存在也就意味着客户在做修改，就将该属性原始值放入<code v-pre>modifiedmap</code>中，将修改后的值放入<code v-pre>currentMap</code>中</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Legacy</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 沙箱期间新增的全局变量</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>addedPropsMapInSandbox <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token comment">// 沙箱期间更新的全局变量</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>modifiedPropsOriginalValueMapInSandbox <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token comment">// 持续记录更新的(新增和修改的)全局变量的 map，用于在任意时刻做 snapshot</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>currentUpdatedPropsValueMap <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> rawWindow <span class="token operator">=</span> window<span class="token punctuation">;</span>
    <span class="token keyword">const</span> fakeWindow <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>sandboxRunning <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>fakeWindow<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> prop<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果是激活状态</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>sandboxRunning<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 判断当前window上存不存在该属性</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>rawWindow<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>prop<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 记录新增值</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>addedPropsMapInSandbox<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> value<span class="token punctuation">;</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>modifiedPropsOriginalValueMapInSandbox<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 记录更新值的初始值</span>
            <span class="token keyword">const</span> originValue <span class="token operator">=</span> rawWindow<span class="token punctuation">[</span>prop<span class="token punctuation">]</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>modifiedPropsOriginalValueMapInSandbox<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> originValue<span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token comment">// 纪录此次修改的属性</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>currentUpdatedPropsValueMap<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> value<span class="token punctuation">;</span>
          <span class="token comment">// 将设置的属性和值赋给了当前window，还是污染了全局window变量</span>
          rawWindow<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> value<span class="token punctuation">;</span>
          <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> prop</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> rawWindow<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>proxy <span class="token operator">=</span> proxy<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">active</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>sandboxRunning<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 还原上次修改的值</span>
      <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>currentUpdatedPropsValueMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        window<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>currentUpdatedPropsValueMap<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>sandboxRunning <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">inactive</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 将更新值的初始值还原给window</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>modifiedPropsOriginalValueMapInSandbox<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      window<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>modifiedPropsOriginalValueMapInSandbox<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 将新增的值删掉</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>addedPropsMapInSandbox<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">delete</span> window<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>sandboxRunning <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过三个变量来记住沙箱激活后window发生变化过的所有属性，这样在后续的状态还原时候就不再需要遍历window的所有属性来进行对比，提升了程序运行的性能。但是这仍然改变不了这种机制仍然污染了window的状态的事实，因此也就无法承担起同时支持多个微应用运行的任务。</p>
<h3 id="_2-3、多应用代理沙箱" tabindex="-1"><a class="header-anchor" href="#_2-3、多应用代理沙箱" aria-hidden="true">#</a> 2.3、多应用代理沙箱</h3>
<p><strong>不会污染全局window，支持多个子应用同时加载。</strong></p>
<p>激活沙箱后，每次对<code v-pre>window</code>取值的时候，先从自己沙箱环境的<code v-pre>fakeWindow</code>里面找，如果不存在，就从<code v-pre>rawWindow</code>(外部的<code v-pre>window</code>)里去找；当对沙箱内部的<code v-pre>window</code>对象赋值的时候，会直接操作<code v-pre>fakeWindow</code>，而不会影响到<code v-pre>rawWindow</code>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>
<span class="token doc-comment comment">/**
 * 基于 Proxy 实现的沙箱
 */</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">ProxySandbox</span> <span class="token keyword">implements</span> <span class="token class-name">SandBox</span> <span class="token punctuation">{</span>
  <span class="token doc-comment comment">/** window 值变更记录 */</span>
  <span class="token keyword">private</span> updatedValueSet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token operator">&lt;</span>PropertyKey<span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token literal-property property">name</span><span class="token operator">:</span> string<span class="token punctuation">;</span>

  <span class="token literal-property property">type</span><span class="token operator">:</span> SandBoxType<span class="token punctuation">;</span>

  <span class="token literal-property property">proxy</span><span class="token operator">:</span> WindowProxy<span class="token punctuation">;</span>

  sandboxRunning <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

  <span class="token literal-property property">latestSetProp</span><span class="token operator">:</span> PropertyKey <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

  <span class="token function">active</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>sandboxRunning<span class="token punctuation">)</span> activeSandboxCount<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>sandboxRunning <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">inactive</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">'development'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">[qiankun:sandbox] </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> modified global properties restore...</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
        <span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>updatedValueSet<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">--</span>activeSandboxCount <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      variableWhiteList<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">p</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>proxy<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// @ts-ignore</span>
          <span class="token keyword">delete</span> window<span class="token punctuation">[</span>p<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>sandboxRunning <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">name</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> SandBoxType<span class="token punctuation">.</span>Proxy<span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> updatedValueSet <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> rawWindow <span class="token operator">=</span> window<span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> fakeWindow<span class="token punctuation">,</span> propertiesWithGetter <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">createFakeWindow</span><span class="token punctuation">(</span>rawWindow<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> descriptorTargetMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token operator">&lt;</span>PropertyKey<span class="token punctuation">,</span> SymbolTarget<span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token function-variable function">hasOwnProperty</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">key</span><span class="token operator">:</span> PropertyKey</span><span class="token punctuation">)</span> <span class="token operator">=></span> fakeWindow<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token operator">||</span> rawWindow<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>fakeWindow<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">set</span><span class="token operator">:</span> <span class="token punctuation">(</span>target<span class="token operator">:</span> FakeWindow<span class="token punctuation">,</span> <span class="token literal-property property">p</span><span class="token operator">:</span> PropertyKey<span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token parameter">boolean</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>sandboxRunning<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// We must kept its description while the property existed in rawWindow before</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>target<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> rawWindow<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> descriptor <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>rawWindow<span class="token punctuation">,</span> p<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">const</span> <span class="token punctuation">{</span> writable<span class="token punctuation">,</span> configurable<span class="token punctuation">,</span> enumerable <span class="token punctuation">}</span> <span class="token operator">=</span> descriptor<span class="token operator">!</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>writable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> p<span class="token punctuation">,</span> <span class="token punctuation">{</span>
                configurable<span class="token punctuation">,</span>
                enumerable<span class="token punctuation">,</span>
                writable<span class="token punctuation">,</span>
                value<span class="token punctuation">,</span>
              <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// @ts-ignore</span>
            target<span class="token punctuation">[</span>p<span class="token punctuation">]</span> <span class="token operator">=</span> value<span class="token punctuation">;</span>
          <span class="token punctuation">}</span>

          <span class="token keyword">if</span> <span class="token punctuation">(</span>variableWhiteList<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// @ts-ignore</span>
            rawWindow<span class="token punctuation">[</span>p<span class="token punctuation">]</span> <span class="token operator">=</span> value<span class="token punctuation">;</span>
          <span class="token punctuation">}</span>

          updatedValueSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token keyword">this</span><span class="token punctuation">.</span>latestSetProp <span class="token operator">=</span> p<span class="token punctuation">;</span>

          <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">'development'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">[qiankun] Set window.</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>p<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> while sandbox destroyed or inactive in </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">!</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 在 strict-mode 下，Proxy 的 handler.set 返回 false 会抛出 TypeError，在沙箱卸载的情况下应该忽略错误</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>

      <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token operator">:</span> FakeWindow<span class="token punctuation">,</span> <span class="token literal-property property">p</span><span class="token operator">:</span> PropertyKey<span class="token punctuation">)</span><span class="token operator">:</span> any <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">===</span> Symbol<span class="token punctuation">.</span>unscopables<span class="token punctuation">)</span> <span class="token keyword">return</span> unscopables<span class="token punctuation">;</span>

        <span class="token comment">// avoid who using window.window or window.self to escape the sandbox environment to touch the really window</span>
        <span class="token comment">// see https://github.com/eligrey/FileSaver.js/blob/master/src/FileSaver.js#L13</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">===</span> <span class="token string">'window'</span> <span class="token operator">||</span> p <span class="token operator">===</span> <span class="token string">'self'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> proxy<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>
          p <span class="token operator">===</span> <span class="token string">'top'</span> <span class="token operator">||</span>
          p <span class="token operator">===</span> <span class="token string">'parent'</span> <span class="token operator">||</span>
          <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">'test'</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>p <span class="token operator">===</span> <span class="token string">'mockTop'</span> <span class="token operator">||</span> p <span class="token operator">===</span> <span class="token string">'mockSafariTop'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// if your master app in an iframe context, allow these props escape the sandbox</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>rawWindow <span class="token operator">===</span> rawWindow<span class="token punctuation">.</span>parent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> proxy<span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">return</span> <span class="token punctuation">(</span>rawWindow <span class="token keyword">as</span> any<span class="token punctuation">)</span><span class="token punctuation">[</span>p<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// proxy.hasOwnProperty would invoke getter firstly, then its value represented as rawWindow.hasOwnProperty</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">===</span> <span class="token string">'hasOwnProperty'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> hasOwnProperty<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// mark the symbol to document while accessing as document.createElement could know is invoked by which sandbox for dynamic append patcher</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token operator">===</span> <span class="token string">'document'</span> <span class="token operator">||</span> p <span class="token operator">===</span> <span class="token string">'eval'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">setCurrentRunningSandboxProxy</span><span class="token punctuation">(</span>proxy<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token comment">// FIXME if you have any other good ideas</span>
          <span class="token comment">// remove the mark in next tick, thus we can identify whether it in micro app or not</span>
          <span class="token comment">// this approach is just a workaround, it could not cover all complex cases, such as the micro app runs in the same task context with master in some case</span>
          <span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">setCurrentRunningSandboxProxy</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">switch</span> <span class="token punctuation">(</span>p<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token string">'document'</span><span class="token operator">:</span>
              <span class="token keyword">return</span> document<span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token string">'eval'</span><span class="token operator">:</span>
              <span class="token comment">// eslint-disable-next-line no-eval</span>
              <span class="token keyword">return</span> eval<span class="token punctuation">;</span>
            <span class="token comment">// no default</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// eslint-disable-next-line no-nested-ternary</span>
        <span class="token keyword">const</span> value <span class="token operator">=</span> propertiesWithGetter<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span>
          <span class="token operator">?</span> <span class="token punctuation">(</span>rawWindow <span class="token keyword">as</span> any<span class="token punctuation">)</span><span class="token punctuation">[</span>p<span class="token punctuation">]</span>
          <span class="token operator">:</span> p <span class="token keyword">in</span> target
          <span class="token operator">?</span> <span class="token punctuation">(</span>target <span class="token keyword">as</span> any<span class="token punctuation">)</span><span class="token punctuation">[</span>p<span class="token punctuation">]</span>
          <span class="token operator">:</span> <span class="token punctuation">(</span>rawWindow <span class="token keyword">as</span> any<span class="token punctuation">)</span><span class="token punctuation">[</span>p<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">getTargetValue</span><span class="token punctuation">(</span>rawWindow<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>proxy <span class="token operator">=</span> proxy<span class="token punctuation">;</span>

    activeSandboxCount<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">createFakeWindow</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">global</span><span class="token operator">:</span> Window</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// map always has the fastest performance in has check scenario</span>
  <span class="token comment">// see https://jsperf.com/array-indexof-vs-set-has/23</span>
  <span class="token keyword">const</span> propertiesWithGetter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token operator">&lt;</span>PropertyKey<span class="token punctuation">,</span> boolean<span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> fakeWindow <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token keyword">as</span> FakeWindow<span class="token punctuation">;</span>

  <span class="token comment">/*
   copy the non-configurable property of global to fakeWindow
   see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor
   > A property cannot be reported as non-configurable, if it does not exists as an own property of the target object or if it exists as a configurable own property of the target object.
   */</span>
  Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyNames</span><span class="token punctuation">(</span>global<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">p</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> descriptor <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>global<span class="token punctuation">,</span> p<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token operator">!</span>descriptor<span class="token operator">?.</span>configurable<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">p</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> descriptor <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>global<span class="token punctuation">,</span> p<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>descriptor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> hasGetter <span class="token operator">=</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>descriptor<span class="token punctuation">,</span> <span class="token string">'get'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">/*
         make top/self/window property configurable and writable, otherwise it will cause TypeError while get trap return.
         see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
         > The value reported for a property must be the same as the value of the corresponding target object property if the target object property is a non-writable, non-configurable data property.
         */</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>
          p <span class="token operator">===</span> <span class="token string">'top'</span> <span class="token operator">||</span>
          p <span class="token operator">===</span> <span class="token string">'parent'</span> <span class="token operator">||</span>
          p <span class="token operator">===</span> <span class="token string">'self'</span> <span class="token operator">||</span>
          p <span class="token operator">===</span> <span class="token string">'window'</span> <span class="token operator">||</span>
          <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">'test'</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>p <span class="token operator">===</span> <span class="token string">'mockTop'</span> <span class="token operator">||</span> p <span class="token operator">===</span> <span class="token string">'mockSafariTop'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span> <span class="token punctuation">{</span>
          descriptor<span class="token punctuation">.</span>configurable <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
          <span class="token comment">/*
           The descriptor of window.window/window.top/window.self in Safari/FF are accessor descriptors, we need to avoid adding a data descriptor while it was
           Example:
            Safari/FF: Object.getOwnPropertyDescriptor(window, 'top') -> {get: function, set: undefined, enumerable: true, configurable: false}
            Chrome: Object.getOwnPropertyDescriptor(window, 'top') -> {value: Window, writable: false, enumerable: true, configurable: false}
           */</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>hasGetter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            descriptor<span class="token punctuation">.</span>writable <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>hasGetter<span class="token punctuation">)</span> propertiesWithGetter<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>p<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// freeze the descriptor to avoid being modified by zone.js</span>
        <span class="token comment">// see https://github.com/angular/zone.js/blob/a5fe09b0fac27ac5df1fa746042f96f05ccb6a00/lib/browser/define-property.ts#L71</span>
        <span class="token function">rawObjectDefineProperty</span><span class="token punctuation">(</span>fakeWindow<span class="token punctuation">,</span> p<span class="token punctuation">,</span> Object<span class="token punctuation">.</span><span class="token function">freeze</span><span class="token punctuation">(</span>descriptor<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    fakeWindow<span class="token punctuation">,</span>
    propertiesWithGetter<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将window的属性复制到各个子应用的window副本(fakeWindow)，子应用里面的环境和外面的环境完全隔离。因为这种模式不直接操作window，所以在激活和卸载时也不需要操作状态池去更新/还原主子应用的环境状态了，同时也支持了统一url下多个子应用的场景。</p>
<h2 id="_3-样式隔离" tabindex="-1"><a class="header-anchor" href="#_3-样式隔离" aria-hidden="true">#</a> 3.样式隔离</h2>
<ol>
<li>利用了 shadow DoM，可以做到css完全隔离，但是有很多问题（1、弹窗由于挂在到document.Body下导致样式失效 2、shadowdom下不能注册字体）。</li>
<li>类似于Vue的scoped给每一个子应用的css添加前缀</li>
</ol>
<h2 id="qiankun使用" tabindex="-1"><a class="header-anchor" href="#qiankun使用" aria-hidden="true">#</a> qiankun使用</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">add</span> qiankun <span class="token parameter variable">-S</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="在主应用中注册微应用" tabindex="-1"><a class="header-anchor" href="#在主应用中注册微应用" aria-hidden="true">#</a> 在主应用中注册微应用</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> registerMicroApps<span class="token punctuation">,</span> start <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'qiankun'</span><span class="token punctuation">;</span>

<span class="token function">registerMicroApps</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'react app'</span><span class="token punctuation">,</span> <span class="token comment">// app name registered</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">'//localhost:7100'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">container</span><span class="token operator">:</span> <span class="token string">'#yourContainer'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">activeRule</span><span class="token operator">:</span> <span class="token string">'/yourActiveRule'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'vue app'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">scripts</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'//localhost:7100/main.js'</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">container</span><span class="token operator">:</span> <span class="token string">'#yourContainer2'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">activeRule</span><span class="token operator">:</span> <span class="token string">'/yourActiveRule2'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="微应用配置" tabindex="-1"><a class="header-anchor" href="#微应用配置" aria-hidden="true">#</a> 微应用配置</h3>
<p>微应用分为有 <code v-pre>webpack</code> 构建和无 <code v-pre>webpack</code> 构建项目，有 <code v-pre>webpack</code> 的微应用（主要是指 Vue、React、Angular）需要做的事情有：</p>
<ol>
<li>新增 <code v-pre>public-path.js</code> 文件，用于修改运行时的 <code v-pre>publicPath</code>。<a href="https://webpack.docschina.org/guides/public-path/#on-the-fly" target="_blank" rel="noopener noreferrer">什么是运行时的 publicPath ？<ExternalLinkIcon/></a>。</li>
</ol>
<p>注意：运行时的 publicPath 和构建时的 publicPath 是不同的，两者不能等价替代。</p>
<ol>
<li>微应用建议使用 <code v-pre>history</code> 模式的路由，需要设置路由 <code v-pre>base</code>，值和它的 <code v-pre>activeRule</code> 是一样的。</li>
<li>在入口文件最顶部引入 <code v-pre>public-path.js</code>，修改并导出三个生命周期函数。</li>
<li>修改 <code v-pre>webpack</code> 打包，允许开发环境跨域和 <code v-pre>umd</code> 打包。</li>
</ol>
<p>主要的修改就是以上四个，可能会根据项目的不同情况而改变。例如，你的项目是 <code v-pre>index.html</code> 和其他的所有文件分开部署的，说明你们已经将构建时的 <code v-pre>publicPath</code> 设置为了完整路径，则不用修改运行时的 <code v-pre>publicPath</code> （第一步操作可省）。</p>
<p>无 <code v-pre>webpack</code> 构建的微应用直接将 <code v-pre>lifecycles</code> 挂载到 <code v-pre>window</code> 上即可。</p>
<p>微应用需要在自己的入口 js (通常就是你配置的 webpack 的 entry js) 导出 <code v-pre>bootstrap</code>、<code v-pre>mount</code>、<code v-pre>unmount</code> 三个生命周期钩子，以供主应用在适当的时机调用。</p>
<p>以 <code v-pre>vue-cli 3+</code> 生成的 <code v-pre>vue 2.x</code> 项目为例，<code v-pre>vue 3</code> 版本等稳定后再补充。</p>
<ol>
<li>
<p>在 <code v-pre>src</code> 目录新增 <code v-pre>public-path.js</code>：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>window<span class="token punctuation">.</span>__POWERED_BY_QIANKUN__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  __webpack_public_path__ <span class="token operator">=</span> window<span class="token punctuation">.</span>__INJECTED_PUBLIC_PATH_BY_QIANKUN__<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>入口文件 <code v-pre>main.js</code> 修改，为了避免根 id <code v-pre>#app</code> 与其他的 DOM 冲突，需要限制查找范围。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token string">'./public-path'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> VueRouter <span class="token keyword">from</span> <span class="token string">'vue-router'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">'./App.vue'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> routes <span class="token keyword">from</span> <span class="token string">'./router'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> store <span class="token keyword">from</span> <span class="token string">'./store'</span><span class="token punctuation">;</span>


Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>productionTip <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>


<span class="token keyword">let</span> router <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> instance <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">props <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> container <span class="token punctuation">}</span> <span class="token operator">=</span> props<span class="token punctuation">;</span>
  router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">base</span><span class="token operator">:</span> window<span class="token punctuation">.</span>__POWERED_BY_QIANKUN__ <span class="token operator">?</span> <span class="token string">'/app-vue/'</span> <span class="token operator">:</span> <span class="token string">'/'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">'history'</span><span class="token punctuation">,</span>
    routes<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


  instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    router<span class="token punctuation">,</span>
    store<span class="token punctuation">,</span>
    <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">h</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">h</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span>container <span class="token operator">?</span> container<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token string">'#app'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token comment">// 独立运行时</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>window<span class="token punctuation">.</span>__POWERED_BY_QIANKUN__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token keyword">export</span> <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">bootstrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'[vue] vue app bootstraped'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">mount</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'[vue] props from main framework'</span><span class="token punctuation">,</span> props<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">render</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">unmount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  instance<span class="token punctuation">.</span><span class="token function">$destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  instance<span class="token punctuation">.</span>$el<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
  instance <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  router <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>打包配置修改（<code v-pre>vue.config.js</code>）：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> name <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./package'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">'Access-Control-Allow-Origin'</span><span class="token operator">:</span> <span class="token string">'*'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">configureWebpack</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">library</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-[name]</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
      <span class="token literal-property property">libraryTarget</span><span class="token operator">:</span> <span class="token string">'umd'</span><span class="token punctuation">,</span> <span class="token comment">// 把微应用打包成 umd 库格式</span>
      <span class="token literal-property property">jsonpFunction</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">webpackJsonp_</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token comment">// webpack 5 需要把 jsonpFunction 替换成 chunkLoadingGlobal</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h4 id="微应用打包配置" tabindex="-1"><a class="header-anchor" href="#微应用打包配置" aria-hidden="true">#</a> 微应用打包配置</h4>
<p>webpack v5:</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> packageName <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./package.json'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>name<span class="token punctuation">;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">library</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>packageName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-[name]</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
    <span class="token literal-property property">libraryTarget</span><span class="token operator">:</span> <span class="token string">'umd'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">chunkLoadingGlobal</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">webpackJsonp_</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>packageName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>webpack v4:</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> packageName <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./package.json'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>name<span class="token punctuation">;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">library</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>packageName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-[name]</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
    <span class="token literal-property property">libraryTarget</span><span class="token operator">:</span> <span class="token string">'umd'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">jsonpFunction</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">webpackJsonp_</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>packageName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><CommentService/></div></template>


