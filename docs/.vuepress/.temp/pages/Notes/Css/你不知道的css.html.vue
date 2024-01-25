<template><div><h1 id="你不知道的css" tabindex="-1"><a class="header-anchor" href="#你不知道的css" aria-hidden="true">#</a> 你不知道的css</h1>
<h2 id="文字不允许选中" tabindex="-1"><a class="header-anchor" href="#文字不允许选中" aria-hidden="true">#</a> 文字不允许选中</h2>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code>
<span class="token property">user-select</span><span class="token punctuation">:</span>none

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="houdini" tabindex="-1"><a class="header-anchor" href="#houdini" aria-hidden="true">#</a> Houdini</h2>
<p>Houdini 是一组底层 API，它们公开了 CSS 引擎的各个部分，从而使开发人员能够通过加入浏览器渲染引擎的样式和布局过程来扩展 CSS。Houdini 是一组 API，它们使开发人员可以直接访问<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Object_Model" target="_blank" rel="noopener noreferrer">CSS 对象模型<ExternalLinkIcon/></a> （CSSOM），使开发人员可以编写浏览器可以解析为 CSS 的代码，从而创建新的 CSS 功能，而无需等待它们在浏览器中本地实现。</p>
<p>Houdini的优点</p>
<ul>
<li>当样式改变时 Houdini 相比行内样式的方式能够能够更快的解析。</li>
<li>一个 CSS Houdini 的特性就是 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Worklet" target="_blank" rel="noopener noreferrer">Worklet (en-US)<ExternalLinkIcon/></a>。在它的帮助下，你可以通过引入一行 JavaScript 代码来引入配置化的组件，从而创建模块式的 CSS。不依赖任何前置处理器、后置处理器或者 JavaScript 框架。</li>
</ul>
<h3 id="css属性" tabindex="-1"><a class="header-anchor" href="#css属性" aria-hidden="true">#</a> CSS属性</h3>
<p>1️⃣注册自定义属性</p>
<p>--注册的属性是自定义属性，只有被<code v-pre>var()</code>使用的自定义属性才是css变量</p>
<p>普通自定义属性声明，可以看到CSS自定义属性无法声明他的类型，自定义属性只不过是个字符串。</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token selector">:root</span><span class="token punctuation">{</span>
	<span class="token property">--main-color</span><span class="token punctuation">:</span>#fff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CSS Houdini 对CSS自定义属性进行了扩展 CSS Houdini有两种声明属性方式</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token selector">CSS.registerProperty(</span><span class="token punctuation">{</span>
    <span class="token property">name</span><span class="token punctuation">:</span><span class="token string">'--main-color'</span><span class="token punctuation">,</span>
    <span class="token property">syntax</span><span class="token punctuation">:</span><span class="token string">'&lt;color>'</span><span class="token punctuation">,</span>
    <span class="token property">inhertis</span><span class="token punctuation">:</span>false<span class="token punctuation">,</span>
    <span class="token property">initialValue</span><span class="token punctuation">:</span><span class="token string">'#fff'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
// 方式二
<span class="token atrule"><span class="token rule">@property</span> --main-color</span><span class="token punctuation">{</span>
    <span class="token property">syntax</span><span class="token punctuation">:</span><span class="token string">'&lt;color>'</span><span class="token punctuation">;</span>
    <span class="token property">initial-value</span><span class="token punctuation">:</span>#fff<span class="token punctuation">;</span>
    <span class="token property">inherits</span><span class="token punctuation">:</span>false<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2️⃣自定义属性作用域</p>
<p>一般放在<code v-pre>:root和html</code>选择器中的自定义属性是全局的，html权重小于root.</p>
<h3 id="var函数" tabindex="-1"><a class="header-anchor" href="#var函数" aria-hidden="true">#</a> var函数</h3>
<p>1️⃣var支持回退</p>
<p>var函数可以传入一个css自定义属性，并且var函数支持回退，也就是默认值（当var函数引用了一个未定义的自定义属性就会采用第二个参数作为引用的值）。</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token selector">:root</span><span class="token punctuation">{</span>
    <span class="token property">--main-color</span><span class="token punctuation">:</span>#fff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.test</span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span><span class="token function">var</span><span class="token punctuation">(</span>--main<span class="token punctuation">,</span><span class="token string">'red'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2️⃣var可以嵌套</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>.box{
	background-color:var(--a,var(--b))
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="js操作" tabindex="-1"><a class="header-anchor" href="#js操作" aria-hidden="true">#</a> JS操作</h4>
<p>1️⃣设置自定义属性</p>
<p>普通CSS自定义属性的操作</p>
<p>我们除了可以使用<code v-pre>--var</code>注册一个css自定义属性还可以通过js的<code v-pre>style.setProperty</code>动态注册一个自定义属性。例如<code v-pre>div.style.setProperty('--main-color','#fff')</code>执行完这个脚本后会在标签上添加style属性例如<code v-pre>&lt;div style=&quot;--main-color:#fff&quot;&gt;&lt;/div&gt;</code></p>
<p>Houdini操作</p>
<p>在JS中我们可以使用以下方式来注册一个自定义属性</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token constant">CSS</span><span class="token punctuation">.</span><span class="token function">registerProperty</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'--main-color'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">syntax</span><span class="token operator">:</span><span class="token string">'&lt;color>'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">inherits</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">initialValue</span><span class="token operator">:</span><span class="token string">'#fff'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2️⃣获取自定义属性的值</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">getComputedStyle</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>documentElement<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPropertyValue</span><span class="token punctuation">(</span><span class="token string">'--main-color'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="容器查询" tabindex="-1"><a class="header-anchor" href="#容器查询" aria-hidden="true">#</a> 容器查询</h2>
<p>容器查询使你能够根据元素容器的大小应用样式。例如，如果容器在周围的上下文中可用的空间更少，你可以隐藏某些元素或使用较小的字体。容器查询是<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_media_queries" target="_blank" rel="noopener noreferrer">媒体查询<ExternalLinkIcon/></a>的另一种选择，后者根据视口大小或其他设备特征为元素应用样式。</p>
<h3 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法</h3>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token atrule"><span class="token rule">@container</span> [container_name] &lt;container-condition></span> <span class="token punctuation">{</span>
  &lt;stylesheet>
<span class="token punctuation">}</span>
<span class="token property">eg</span><span class="token punctuation">:</span>
<span class="token atrule"><span class="token rule">@container</span> <span class="token punctuation">(</span>width > 400px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token selector">h2</span> <span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 1.5em<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="单位" tabindex="-1"><a class="header-anchor" href="#单位" aria-hidden="true">#</a> 单位</h3>
<ul>
<li>cqw 容器查询宽度（Container Query Width）占比。1cqw 等于容器宽度的 1%。假设容器宽度是 1000px，则此时 1cqw 对应的计算值就是 10px。</li>
<li>cqh 容器查询高度（Container Query Height）占比。1cqh 等于容器高度的 1%。</li>
<li>cqi 表示容器查询内联方向尺寸（Container Query Inline-Size）占比。这个是逻辑属性单位，默认情况下等同于 cqw</li>
<li>cqb 容器查询块级方向尺寸（Container Query Block-Size）占比。同上，默认情况下等同于 cqh</li>
<li>cqmin 容器查询较小尺寸的（Container Query Min）占比。取 cqw 和 cqh 中较小的一个</li>
<li>cqmax 表示容器查询较大尺寸的（Container Query Min）占比。取 cqw 和 cqh 中较大的一个</li>
</ul>
<CommentService/></div></template>


