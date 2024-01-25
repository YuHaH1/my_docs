<template><div><h1 id="微前端" tabindex="-1"><a class="header-anchor" href="#微前端" aria-hidden="true">#</a> 微前端</h1>
<h2 id="什么是微前端" tabindex="-1"><a class="header-anchor" href="#什么是微前端" aria-hidden="true">#</a> 什么是微前端</h2>
<p>微前端是一种多个团队通过独立发布功能的方式来共同构建现代化 web 应用的技术手段及方法策略。通俗来说，<strong>就是在一个<code v-pre>web</code>应用中可以独立的运行另一个<code v-pre>web</code>应用</strong></p>
<p>摘自wujie官网的一段话。为前端需要具备什么能力？</p>
<ul>
<li>
<p><strong>子应用的加载和卸载能力</strong></p>
<p>页面需要从一个子应用切换到另一个子应用，框架必须具备加载、渲染、切换的能力</p>
</li>
<li>
<p><strong>子应用独立运行的能力</strong></p>
<p>子应用运行会污染全局的 window 对象，样式会污染其他应用，必须有效的隔离起来</p>
</li>
<li>
<p><strong>子应用路由状态保持能力</strong></p>
<p>激活子应用后，浏览器刷新、前进、后退子应用的路由都应该可以正常工作</p>
</li>
<li>
<p><strong>应用间通信的能力</strong></p>
<p>应用间可以方便、<strong>快捷的通信</strong>。（通信的三种方式①事件订阅例如$bus，②全局window上的属性读取和写入，③框架提供props的接口）</p>
</li>
</ul>
<h2 id="微前端的技术方案" tabindex="-1"><a class="header-anchor" href="#微前端的技术方案" aria-hidden="true">#</a> 微前端的技术方案</h2>
<h3 id="iframe" tabindex="-1"><a class="header-anchor" href="#iframe" aria-hidden="true">#</a> iframe</h3>
<p><strong>优点</strong></p>
<ul>
<li>非常简单，使用没有任何心智负担</li>
<li><code v-pre>web</code>应用隔离的非常完美，无论是<code v-pre>js</code>、<code v-pre>css</code>、<code v-pre>dom</code>都完全隔离开来</li>
</ul>
<p><strong>iframe的缺点：</strong></p>
<ol>
<li>url 不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。</li>
<li>UI 不同步，DOM 结构不共享。想象一下屏幕右下角 1/4 的 iframe 里来一个带遮罩层的弹框，同时我们要求这个弹框要浏览器居中显示，还要浏览器 resize 时自动居中。</li>
<li>全局上下文完全隔离，内存变量不共享。iframe 内外系统的通信、数据同步等需求，主应用的 cookie 要透传到根域名都不同的子应用中实现免登效果。</li>
<li>慢。每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程。</li>
</ol>
<h3 id="spa" tabindex="-1"><a class="header-anchor" href="#spa" aria-hidden="true">#</a> SPA</h3>
<p><a href="https://zh-hans.single-spa.js.org/docs/getting-started-overview" target="_blank" rel="noopener noreferrer">single-spa<ExternalLinkIcon/></a>主要实现思路：</p>
<ul>
<li>预先注册子应用(激活路由、子应用资源、生命周期函数)</li>
<li>监听路由的变化，匹配到了激活的路由则加载子应用资源，顺序调用生命周期函数并最终渲染到容器</li>
</ul>
<p><strong>优点</strong></p>
<ul>
<li>监听路由自动的加载、卸载当前路由对应的子应用</li>
<li>完备的沙箱方案，<code v-pre>js</code>沙箱做了<code v-pre>SnapshotSandbox</code>、<code v-pre>LegacySandbox</code>、<code v-pre>ProxySandbox</code>三套渐进增强方案，<code v-pre>css</code>沙箱做了两套<code v-pre>strictStyleIsolation</code>、<code v-pre>experimentalStyleIsolation</code>两套适用不同场景的方案</li>
<li>路由保持，浏览器刷新、前进、后退，都可以作用到子应用</li>
<li>应用间通信简单，全局注入</li>
</ul>
<p>缺点</p>
<ul>
<li>基于路由匹配，无法同时<strong>激活多个子应用，也不支持子应用保活</strong>。</li>
<li>改造成本较大，从 <code v-pre>webpack</code>、代码、路由等等都要做一系列的适配</li>
<li><code v-pre>css</code> 沙箱无法绝对的隔离，<code v-pre>js</code> 沙箱在某些场景下执行性能下降严重</li>
<li><strong>无法支持 <code v-pre>vite</code> 等 <code v-pre>ESM</code> 脚本运行</strong></li>
</ul>
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
<p>qiankun 方案是基于 single-spa 的微前端方案。</p>
<p><strong>优点：</strong></p>
<ul>
<li>
<p>html entry 的方式引入子应用，相比 js entry 极大的降低了应用改造的成本；</p>
</li>
<li>
<p>完备的沙箱方案，js 沙箱做了 SnapshotSandbox、LegacySandbox、ProxySandbox 三套渐进增强方案，css 沙箱做了 strictStyleIsolation、experimentalStyleIsolation 两套适用不同场景的方案；</p>
</li>
<li>
<p>做了静态资源预加载能力；</p>
</li>
</ul>
<p><strong>缺点：</strong></p>
<ul>
<li>
<p>适配成本比较高，工程化、生命周期、静态资源路径、路由等都要做一系列的适配工作；</p>
</li>
<li>
<p>css 沙箱采用严格隔离会有各种问题，js 沙箱在某些场景下执行性能下降严重；</p>
</li>
<li>
<p>无法同时激活多个子应用，也不支持子应用保活；</p>
</li>
<li>
<p>无法支持 vite 等 esmodule 脚本运行；</p>
</li>
</ul>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="无界" tabindex="-1"><a class="header-anchor" href="#无界" aria-hidden="true">#</a> 无界</h2>
<p><strong>wujie优点：</strong></p>
<ul>
<li>
<p><strong>多应用同时激活在线</strong></p>
<p>框架具备同时激活多应用，并保持这些应用路由同步的能力</p>
</li>
<li>
<p><strong>组件式的使用方式</strong></p>
<p>无需注册，更无需路由适配，在组件内使用，跟随组件装载、卸载</p>
</li>
<li>
<p><strong>应用级别的 keep-alive</strong></p>
<p>子应用开启<a href="https://wujie-micro.github.io/doc/api/startApp.html#alive" target="_blank" rel="noopener noreferrer">保活模式<ExternalLinkIcon/></a>后，应用发生切换时整个子应用的状态可以保存下来不丢失，结合<a href="https://wujie-micro.github.io/doc/api/preloadApp.html#exec" target="_blank" rel="noopener noreferrer">预执行模式<ExternalLinkIcon/></a>可以获得类似<code v-pre>ssr</code>的打开体验</p>
</li>
<li>
<p><strong>纯净无污染</strong></p>
<ul>
<li>无界利用<code v-pre>iframe</code>和<code v-pre>webcomponent</code>来搭建天然的<code v-pre>js</code>隔离沙箱和<code v-pre>css</code>隔离沙箱</li>
<li>利用<code v-pre>iframe</code>的<code v-pre>history</code>和主应用的<code v-pre>history</code>在同一个<a href="https://html.spec.whatwg.org/multipage/browsers.html#top-level-browsing-context" target="_blank" rel="noopener noreferrer">top-level browsing context<ExternalLinkIcon/></a>来搭建天然的路由同步机制</li>
<li>副作用局限在沙箱内部，子应用切换无需任何清理工作，没有额外的切换成本</li>
</ul>
</li>
<li>
<p><strong>性能和体积兼具</strong></p>
<ul>
<li>子应用执行性能和原生一致，子应用实例<code v-pre>instance</code>运行在<code v-pre>iframe</code>的<code v-pre>window</code>上下文中，避免<code v-pre>with(proxyWindow){code}</code>这样指定代码执行上下文导致的性能下降，但是多了实例化<code v-pre>iframe</code>的一次性的开销，可以通过 <a href="https://wujie-micro.github.io/doc/api/preloadApp.html" target="_blank" rel="noopener noreferrer">preload<ExternalLinkIcon/></a> 提前实例化</li>
<li>体积比较轻量，借助<code v-pre>iframe</code>和<code v-pre>webcomponent</code>来实现沙箱，有效的减小了代码量</li>
</ul>
</li>
<li>
<p><strong>开箱即用</strong></p>
<p>不管是样式的兼容、路由的处理、弹窗的处理、热更新的加载，子应用完成接入即可开箱即用无需额外处理，应用<a href="https://wujie-micro.github.io/doc/guide/start.html#%E5%AD%90%E5%BA%94%E7%94%A8%E6%94%B9%E9%80%A0" target="_blank" rel="noopener noreferrer">接入成本<ExternalLinkIcon/></a>也极低</p>
</li>
</ul>
<p><strong>缺点：</strong></p>
<ul>
<li>
<p>隔离js使用一个空的iframe进行隔离</p>
</li>
<li>
<p>子应用axios需要自行适配</p>
</li>
<li>
<p>iframe沙箱的src设置了主应用的host，初始化iframe的时候需要等待iframe的location.orign从'about:blank'初始化为主应用的host，这个采用的计时器去等待的不是很悠亚。</p>
</li>
</ul>
<p><a href="https://wujie-micro.github.io/doc/guide/start.html" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a></p>
<p>如果是Vue3作为基座，安装<code v-pre>pnpm i wujie-vue3 -S </code>,react就执行<code v-pre>pnpm i wujie-react -S</code></p>
<p>然后在main.js中注册</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token keyword">import</span> <span class="token string">'./style.css'</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">'./App.vue'</span>
<span class="token keyword">import</span> WujieVue <span class="token keyword">from</span> <span class="token string">'wujie-vue3'</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
    
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>WujieVue<span class="token punctuation">)</span>    
    
app<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span>

<span class="token operator">&lt;</span>WujieVue
  width<span class="token operator">=</span><span class="token string">"100%"</span>
  height<span class="token operator">=</span><span class="token string">"100%"</span>
  name<span class="token operator">=</span><span class="token string">"xxx"</span> <span class="token comment">//必传子应用的唯一id</span>
  <span class="token operator">:</span>url<span class="token operator">=</span><span class="token string">"xxx"</span><span class="token comment">//必传子应用的url</span>
  <span class="token operator">:</span>sync<span class="token operator">=</span><span class="token string">"true"</span>
  <span class="token operator">:</span>fetch<span class="token operator">=</span><span class="token string">"fetch"</span>
  <span class="token operator">:</span>props<span class="token operator">=</span><span class="token string">"props"</span>
  <span class="token operator">:</span>beforeLoad<span class="token operator">=</span><span class="token string">"beforeLoad"</span>
  <span class="token operator">:</span>beforeMount<span class="token operator">=</span><span class="token string">"beforeMount"</span>
  <span class="token operator">:</span>afterMount<span class="token operator">=</span><span class="token string">"afterMount"</span>
  <span class="token operator">:</span>beforeUnmount<span class="token operator">=</span><span class="token string">"beforeUnmount"</span>
  <span class="token operator">:</span>afterUnmount<span class="token operator">=</span><span class="token string">"afterUnmount"</span>
<span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>WujieVue<span class="token operator">></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="wujie实现原理" tabindex="-1"><a class="header-anchor" href="#wujie实现原理" aria-hidden="true">#</a> wujie实现原理</h3>
<p>①js方面wujie将子应用的js代码注入到主应用的iframe中运行</p>
<p><strong>优点</strong></p>
<ul>
<li>
<p><strong>组件方式来使用微前端</strong></p>
<p>不用注册，不用改造路由，直接使用无界组件，化繁为简</p>
</li>
<li>
<p><strong>一个页面可以同时激活多个子应用</strong></p>
<p>子应用采用 iframe 的路由，不用关心路由占用的问题</p>
</li>
<li>
<p><strong>天然 js 沙箱，不会污染主应用环境</strong></p>
<p>不用修改主应用<code v-pre>window</code>任何属性，只在<code v-pre>iframe</code>内部进行修改</p>
</li>
<li>
<p><strong>应用切换没有清理成本</strong></p>
<p>由于不污染主应用，子应用销毁也无需做任何清理工作</p>
</li>
</ul>
<p>②html上wujie使用<code v-pre>webcomponent</code>将子应用的html结构渲染在里面，并通过代理iframe的document到webcomponent实现两者关联。</p>
<p>③应用保活原理。当子应用发生切换，<code v-pre>iframe</code>保留下来，子应用的容器可能销毁，但<code v-pre>webcomponent</code>依然可以选择保留，这样等应用切换回来将<code v-pre>webcomponent</code>再挂载回容器上，子应用可以获得类似<code v-pre>vue</code>的<code v-pre>keep-alive</code>的能力.</p>
<p><strong>优点</strong></p>
<ul>
<li>
<p><strong>天然 css 沙箱</strong></p>
<p>直接物理隔离，样式隔离子应用不用做任何修改</p>
</li>
<li>
<p><strong>天然适配弹窗问题</strong></p>
<p><code v-pre>document.body</code>的<code v-pre>appendChild</code>或者<code v-pre>insertBefore</code>会代理直接插入到<code v-pre>webcomponent</code>，子应用不用做任何改造</p>
</li>
<li>
<p><strong>子应用保活</strong></p>
<p>子应用保留<code v-pre>iframe</code>和<code v-pre>webcomponent</code>，应用内部的<code v-pre>state</code>不会丢失</p>
</li>
<li>
<p><strong>完整的 DOM 结构</strong></p>
<p><code v-pre>webcomponent</code>保留了子应用完整的<code v-pre>html</code>结构，样式和结构完全对应，子应用不用做任何修改</p>
</li>
</ul>
<p>④css利用shadowDOM隔离CSS</p>
<h3 id="通信方式" tabindex="-1"><a class="header-anchor" href="#通信方式" aria-hidden="true">#</a> 通信方式</h3>
<p>承载子应用的<code v-pre>iframe</code>和主应用是同域的，所以主、子应用天然就可以很好的进行通信，在无界我们提供三种通信方式</p>
<ul>
<li><strong>props 注入机制</strong></li>
</ul>
<p>子应用通过<code v-pre>$wujie.props</code>可以轻松拿到主应用注入的数据</p>
<ul>
<li><strong>window.parent 通信机制</strong></li>
</ul>
<p>子应用<code v-pre>iframe</code>沙箱和主应用同源，子应用可以直接通过<code v-pre>window.parent</code>和主应用通信</p>
<ul>
<li><strong>去中心化的通信机制</strong></li>
</ul>
<p>无界提供了<code v-pre>EventBus</code>实例，注入到主应用和子应用，所有的应用可以去中心化的进行通信</p>
<h3 id="源码" tabindex="-1"><a class="header-anchor" href="#源码" aria-hidden="true">#</a> 源码</h3>
<h4 id="学前知识" tabindex="-1"><a class="header-anchor" href="#学前知识" aria-hidden="true">#</a> 学前知识</h4>
<h4 id="base标签" tabindex="-1"><a class="header-anchor" href="#base标签" aria-hidden="true">#</a> base标签</h4>
<p><strong>HTML <base> 元素</strong> 指定用于一个文档中包含的所有相对 URL 的根 URL。一份中只能有一个 <base> 元素。</p>
<p>一个文档的基本 URL，可以通过使用 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Node/baseURI" target="_blank" rel="noopener noreferrer"><code v-pre>document.baseURI</code> (en-US)<ExternalLinkIcon/></a> 的 JS 脚本查询。如果文档不包含 <code v-pre>&lt;base&gt;</code> 元素，<code v-pre>baseURI</code> 默认为 <code v-pre>document.location.href</code>。</p>
<h4 id="_1-启动应用" tabindex="-1"><a class="header-anchor" href="#_1-启动应用" aria-hidden="true">#</a> 1.启动应用</h4>
<p>startApp</p>
<ol>
<li>
<p>调用<code v-pre>getWujieById</code>和<code v-pre>getOptionsById</code>从map结构中拿到子应用实例和子应用配置，如果刚启动应用则为null。然后调用<code v-pre>mergeOptions</code>合并配置项</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">startApp</span><span class="token punctuation">(</span>startOptions<span class="token operator">:</span> startOptions<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">Function</span> <span class="token operator">|</span> <span class="token keyword">void</span><span class="token operator">></span> <span class="token punctuation">{</span>
  <span class="token comment">//在map结构中注册该子应用id 也就是子应用传入的name，</span>
  <span class="token keyword">const</span> sandbox <span class="token operator">=</span> <span class="token function">getWujieById</span><span class="token punctuation">(</span>startOptions<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//从map结构中取出该子应用实例  首次为null</span>
  <span class="token keyword">const</span> cacheOptions <span class="token operator">=</span> <span class="token function">getOptionsById</span><span class="token punctuation">(</span>startOptions<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//从map结构中取出该子应用的配置项  首次为null</span>
  <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token function">mergeOptions</span><span class="token punctuation">(</span>startOptions<span class="token punctuation">,</span> cacheOptions<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token operator">...</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>如果<code v-pre>sandbox</code>存在也就是说已经创建过子应用实例了。</p>
</li>
<li>
<p>如果不存在则执行<code v-pre>new WuJie</code>创建沙箱环境。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> newSandbox <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WuJie</span><span class="token punctuation">(</span><span class="token punctuation">{</span> name<span class="token punctuation">,</span> url<span class="token punctuation">,</span> attrs<span class="token punctuation">,</span> degradeAttrs<span class="token punctuation">,</span> fiber<span class="token punctuation">,</span> degrade<span class="token punctuation">,</span> plugins<span class="token punctuation">,</span> lifecycles <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
<h4 id="_2-创建沙箱环境" tabindex="-1"><a class="header-anchor" href="#_2-创建沙箱环境" aria-hidden="true">#</a> 2.创建沙箱环境</h4>
<p>①先解析子应用的路径。调用<code v-pre>iframeGenerator</code>创建iframe</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// 创建目标地址的解析</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> urlElement<span class="token punctuation">,</span> appHostPath<span class="token punctuation">,</span> appRoutePath <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">appRouteParse</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> mainHostPath <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>inject<span class="token punctuation">;</span>
    <span class="token comment">// 创建iframe</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>iframe <span class="token operator">=</span> <span class="token function">iframeGenerator</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> attrs<span class="token punctuation">,</span> mainHostPath<span class="token punctuation">,</span> appHostPath<span class="token punctuation">,</span> appRoutePath<span class="token punctuation">)</span><span class="token punctuation">;</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②创建iframe，</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">iframeGenerator</span><span class="token punctuation">(</span>  
  sandbox<span class="token operator">:</span> WuJie<span class="token punctuation">,</span>
  attrs<span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  mainHostPath<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
  appHostPath<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
  appRoutePath<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
           <span class="token keyword">const</span> iframe <span class="token operator">=</span> window<span class="token punctuation">.</span>document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"iframe"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> attrsMerge <span class="token operator">=</span> <span class="token punctuation">{</span> src<span class="token operator">:</span> mainHostPath<span class="token punctuation">,</span> style<span class="token operator">:</span> <span class="token string">"display: none"</span><span class="token punctuation">,</span> <span class="token operator">...</span>attrs<span class="token punctuation">,</span> name<span class="token operator">:</span> sandbox<span class="token punctuation">.</span>id<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token constant">WUJIE_DATA_FLAG</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token string">""</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token function">setAttrsToElement</span><span class="token punctuation">(</span>iframe<span class="token punctuation">,</span> attrsMerge<span class="token punctuation">)</span><span class="token punctuation">;</span>
  window<span class="token punctuation">.</span>document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>iframe<span class="token punctuation">)</span><span class="token punctuation">;</span>    
    

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>③得到iframe的window并注入一些属性</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>iframeGenerator<span class="token punctuation">{</span>
   <span class="token keyword">const</span> iframeWindow <span class="token operator">=</span> iframe<span class="token punctuation">.</span>contentWindow<span class="token punctuation">;</span>
  <span class="token comment">// 变量需要提前注入，在入口函数通过变量防止死循环</span>
  <span class="token function">patchIframeVariable</span><span class="token punctuation">(</span>iframeWindow<span class="token punctuation">,</span> sandbox<span class="token punctuation">,</span> appHostPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">patchIframeVariable</span><span class="token punctuation">(</span>iframeWindow<span class="token operator">:</span> Window<span class="token punctuation">,</span> wujie<span class="token operator">:</span> WuJie<span class="token punctuation">,</span> appHostPath<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  iframeWindow<span class="token punctuation">.</span>__WUJIE <span class="token operator">=</span> wujie<span class="token punctuation">;</span>
  iframeWindow<span class="token punctuation">.</span>__WUJIE_PUBLIC_PATH__ <span class="token operator">=</span> appHostPath <span class="token operator">+</span> <span class="token string">"/"</span><span class="token punctuation">;</span>
  iframeWindow<span class="token punctuation">.</span>$wujie <span class="token operator">=</span> wujie<span class="token punctuation">.</span>provide<span class="token punctuation">;</span>
  iframeWindow<span class="token punctuation">.</span>__WUJIE_RAW_WINDOW__ <span class="token operator">=</span> iframeWindow<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>④为了防止运行主应用的js代码，给子应用带来很多副作用，用定时器去停止ifrm的widnow</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>iframeGenerator<span class="token punctuation">{</span>
  sandbox<span class="token punctuation">.</span>iframeReady <span class="token operator">=</span> <span class="token function">stopIframeLoading</span><span class="token punctuation">(</span>iframeWindow<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
  <span class="token keyword">return</span> iframe<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">stopIframeLoading</span><span class="token punctuation">(</span>iframeWindow<span class="token operator">:</span> Window<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> oldDoc <span class="token operator">=</span> iframeWindow<span class="token punctuation">.</span>document<span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">></span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">function</span> <span class="token function">loop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> newDoc<span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
          newDoc <span class="token operator">=</span> iframeWindow<span class="token punctuation">.</span>document<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          newDoc <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// wait for document ready</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>newDoc <span class="token operator">||</span> newDoc <span class="token operator">==</span> oldDoc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">loop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          iframeWindow<span class="token punctuation">.</span>stop <span class="token operator">?</span> iframeWindow<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> iframeWindow<span class="token punctuation">.</span>document<span class="token punctuation">.</span><span class="token function">execCommand</span><span class="token punctuation">(</span><span class="token string">"Stop"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">loop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>⑤在停止了子iframe的window加载后，初始化iframe的dom</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>  sandbox<span class="token punctuation">.</span>iframeReady <span class="token operator">=</span> <span class="token function">stopIframeLoading</span><span class="token punctuation">(</span>iframeWindow<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">initIframeDom</span><span class="token punctuation">(</span>iframeWindow<span class="token punctuation">,</span> sandbox<span class="token punctuation">,</span> mainHostPath<span class="token punctuation">,</span> appHostPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>⑥用全局window创建一个新的 HTML 文档，并拷贝一份，然后把这个拷贝的节点插入到iframe的文档中。如果<code v-pre>iframe.documentElement</code>存在就用新的替代旧的</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">initIframeDom</span><span class="token punctuation">(</span>iframeWindow<span class="token operator">:</span> Window<span class="token punctuation">,</span> wujie<span class="token operator">:</span> WuJie<span class="token punctuation">,</span> mainHostPath<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> appHostPath<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> iframeDocument <span class="token operator">=</span> iframeWindow<span class="token punctuation">.</span>document<span class="token punctuation">;</span>
  <span class="token keyword">const</span> newDoc <span class="token operator">=</span> window<span class="token punctuation">.</span>document<span class="token punctuation">.</span>implementation<span class="token punctuation">.</span><span class="token function">createHTMLDocument</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> newDocumentElement <span class="token operator">=</span> iframeDocument<span class="token punctuation">.</span><span class="token function">importNode</span><span class="token punctuation">(</span>newDoc<span class="token punctuation">.</span>documentElement<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  iframeDocument<span class="token punctuation">.</span>documentElement
    <span class="token operator">?</span> iframeDocument<span class="token punctuation">.</span><span class="token function">replaceChild</span><span class="token punctuation">(</span>newDocumentElement<span class="token punctuation">,</span> iframeDocument<span class="token punctuation">.</span>documentElement<span class="token punctuation">)</span>
    <span class="token operator">:</span> iframeDocument<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>newDocumentElement<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>⑦注入文档对象的查询和创建元素方法</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>  iframeWindow<span class="token punctuation">.</span>__WUJIE_RAW_DOCUMENT_HEAD__ <span class="token operator">=</span> iframeDocument<span class="token punctuation">.</span>head<span class="token punctuation">;</span>
  iframeWindow<span class="token punctuation">.</span>__WUJIE_RAW_DOCUMENT_QUERY_SELECTOR__ <span class="token operator">=</span> iframeWindow<span class="token punctuation">.</span>Document<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>querySelector<span class="token punctuation">;</span>
  iframeWindow<span class="token punctuation">.</span>__WUJIE_RAW_DOCUMENT_QUERY_SELECTOR_ALL__ <span class="token operator">=</span> iframeWindow<span class="token punctuation">.</span>Document<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>querySelectorAll<span class="token punctuation">;</span>
  iframeWindow<span class="token punctuation">.</span>__WUJIE_RAW_DOCUMENT_CREATE_ELEMENT__ <span class="token operator">=</span> iframeWindow<span class="token punctuation">.</span>Document<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>createElement<span class="token punctuation">;</span>
  iframeWindow<span class="token punctuation">.</span>__WUJIE_RAW_DOCUMENT_CREATE_TEXT_NODE__ <span class="token operator">=</span> iframeWindow<span class="token punctuation">.</span>Document<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>createTextNode<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>⑧初始化base标签，将base标签url设置为子应用的url，</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code> <span class="token function">initBase</span><span class="token punctuation">(</span>iframeWindow<span class="token punctuation">,</span> wujie<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initBase</span><span class="token punctuation">(</span>iframeWindow<span class="token operator">:</span> Window<span class="token punctuation">,</span> url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> iframeDocument <span class="token operator">=</span> iframeWindow<span class="token punctuation">.</span>document<span class="token punctuation">;</span>
  <span class="token keyword">const</span> baseElement <span class="token operator">=</span> iframeDocument<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"base"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> iframeUrlElement <span class="token operator">=</span> <span class="token function">anchorElementGenerator</span><span class="token punctuation">(</span>iframeWindow<span class="token punctuation">.</span>location<span class="token punctuation">.</span>href<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> appUrlElement <span class="token operator">=</span> <span class="token function">anchorElementGenerator</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
  baseElement<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"href"</span><span class="token punctuation">,</span> appUrlElement<span class="token punctuation">.</span>protocol <span class="token operator">+</span> <span class="token string">"//"</span> <span class="token operator">+</span> appUrlElement<span class="token punctuation">.</span>host <span class="token operator">+</span> iframeUrlElement<span class="token punctuation">.</span>pathname<span class="token punctuation">)</span><span class="token punctuation">;</span>
  iframeDocument<span class="token punctuation">.</span>head<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>baseElement<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>⑨重写History中的api<code v-pre>pushState</code>和<code v-pre>replaceState</code>保证iframe的url变化同步到Window中</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">patchIframeHistory</span><span class="token punctuation">(</span>iframeWindow<span class="token operator">:</span> Window<span class="token punctuation">,</span> appHostPath<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> mainHostPath<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> history <span class="token operator">=</span> iframeWindow<span class="token punctuation">.</span>history<span class="token punctuation">;</span>
  <span class="token keyword">const</span> rawHistoryPushState <span class="token operator">=</span> history<span class="token punctuation">.</span>pushState<span class="token punctuation">;</span>
  <span class="token keyword">const</span> rawHistoryReplaceState <span class="token operator">=</span> history<span class="token punctuation">.</span>replaceState<span class="token punctuation">;</span>
  history<span class="token punctuation">.</span><span class="token function-variable function">pushState</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>data<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> title<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> url<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> baseUrl <span class="token operator">=</span>
      mainHostPath <span class="token operator">+</span> iframeWindow<span class="token punctuation">.</span>location<span class="token punctuation">.</span>pathname <span class="token operator">+</span> iframeWindow<span class="token punctuation">.</span>location<span class="token punctuation">.</span>search <span class="token operator">+</span> iframeWindow<span class="token punctuation">.</span>location<span class="token punctuation">.</span>hash<span class="token punctuation">;</span>
    <span class="token keyword">const</span> mainUrl <span class="token operator">=</span> <span class="token function">getAbsolutePath</span><span class="token punctuation">(</span>url<span class="token operator">?.</span><span class="token function">replace</span><span class="token punctuation">(</span>appHostPath<span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">,</span> baseUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> ignoreFlag <span class="token operator">=</span> url <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>

    <span class="token function">rawHistoryPushState</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>history<span class="token punctuation">,</span> data<span class="token punctuation">,</span> title<span class="token punctuation">,</span> ignoreFlag <span class="token operator">?</span> <span class="token keyword">undefined</span> <span class="token operator">:</span> mainUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ignoreFlag<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token function">updateBase</span><span class="token punctuation">(</span>iframeWindow<span class="token punctuation">,</span> appHostPath<span class="token punctuation">,</span> mainHostPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">syncUrlToWindow</span><span class="token punctuation">(</span>iframeWindow<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  history<span class="token punctuation">.</span><span class="token function-variable function">replaceState</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>data<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> title<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> url<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> baseUrl <span class="token operator">=</span>
      mainHostPath <span class="token operator">+</span> iframeWindow<span class="token punctuation">.</span>location<span class="token punctuation">.</span>pathname <span class="token operator">+</span> iframeWindow<span class="token punctuation">.</span>location<span class="token punctuation">.</span>search <span class="token operator">+</span> iframeWindow<span class="token punctuation">.</span>location<span class="token punctuation">.</span>hash<span class="token punctuation">;</span>
    <span class="token keyword">const</span> mainUrl <span class="token operator">=</span> <span class="token function">getAbsolutePath</span><span class="token punctuation">(</span>url<span class="token operator">?.</span><span class="token function">replace</span><span class="token punctuation">(</span>appHostPath<span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">,</span> baseUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> ignoreFlag <span class="token operator">=</span> url <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>

    <span class="token function">rawHistoryReplaceState</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>history<span class="token punctuation">,</span> data<span class="token punctuation">,</span> title<span class="token punctuation">,</span> ignoreFlag <span class="token operator">?</span> <span class="token keyword">undefined</span> <span class="token operator">:</span> mainUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ignoreFlag<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token function">updateBase</span><span class="token punctuation">(</span>iframeWindow<span class="token punctuation">,</span> appHostPath<span class="token punctuation">,</span> mainHostPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">syncUrlToWindow</span><span class="token punctuation">(</span>iframeWindow<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模块联邦module-federation" tabindex="-1"><a class="header-anchor" href="#模块联邦module-federation" aria-hidden="true">#</a> 模块联邦Module Federation</h2>
<p>多个独立的构建可以组成一个应用程序，这些独立的构建之间不应该存在依赖关系，因此可以单独开发和部署它们。这通常被称作微前端，但并不仅限于此。比如a应用如果想使用b应用中form的组件，通过模块联邦可以直接在a中进行import('b/form')非常的方便。</p>
<p>模块联邦优点：可以单独部署对模块的更改，而不需要重新部署所有应用程序。应用程序自动使用组件库的最新版本。（例如将公共依赖发布到npm，其他依赖的项目安装即可，但是存在问题，如果依赖升级，所有项目都需要重新安装依赖。而模块联邦中，项目利用CDN共享，我们永远访问的是最新的代码。）</p>
<h3 id="modulefederationplugin-high-level" tabindex="-1"><a class="header-anchor" href="#modulefederationplugin-high-level" aria-hidden="true">#</a> ModuleFederationPlugin (high level)</h3>
<p><a href="https://www.webpackjs.com/plugins/module-federation-plugin/" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">ModuleFederationPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token comment">// 模块联邦名字，提供给其他模块使用</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'app1'</span><span class="token punctuation">,</span>
      <span class="token comment">// 提供给外部访问的资源入口</span>
      <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'App1RemoteEntry.js'</span><span class="token punctuation">,</span>
      <span class="token comment">// 引用的外部资源列表</span>
      <span class="token literal-property property">remotes</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         *  App2 引用其他应用模块的资源别名
         *  app2 是 APP2 的模块联邦名字
         *  http://localhost:3001 是 APP2 运行的地址
         *  App2RemoteEntry.js 是 APP2 提供的外部访问的资源名字
         *  可以访问到 APP2 通过 exposes 暴露给外部的资源
         */</span>
        <span class="token literal-property property">App2</span><span class="token operator">:</span> <span class="token string">'app2@http://localhost:3001/App2RemoteEntry.js'</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 暴露给外部的资源列表</span>
      <span class="token literal-property property">exposes</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 共享模块，pinia</span>
      <span class="token literal-property property">shared</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念" aria-hidden="true">#</a> 基本概念</h3>
<ol>
<li>本地模块：本地模块就是我们当前开发的代码模块。</li>
<li>远程模块：不属于当前开发代码，远程模块在运行时加载。</li>
<li>容器：就是构建的项目。每个构建的充当一个容器，也可以将其他构建作为容器。通过这种方式每个构建都能从对应容器中加载暴露的模块。</li>
<li>一个被引用得容器或称为remote，引用者被称为host，remote暴露模块给host，host则可以使用这些暴露的模块，这些模块被称为remote模块。</li>
</ol>
<CommentService/></div></template>


