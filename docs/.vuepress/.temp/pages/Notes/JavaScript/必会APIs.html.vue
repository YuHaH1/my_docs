<template><div><h1 id="js必会apis" tabindex="-1"><a class="header-anchor" href="#js必会apis" aria-hidden="true">#</a> JS必会APIs</h1>
<h2 id="_1-intersectionobserver视口交叉状态检测" tabindex="-1"><a class="header-anchor" href="#_1-intersectionobserver视口交叉状态检测" aria-hidden="true">#</a> 1.IntersectionObserver视口交叉状态检测</h2>
<p><code v-pre>IntersectionObserver</code>提供了一种异步观察目标元素与其祖先元素或顶级文档<a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Viewport" target="_blank" rel="noopener noreferrer">视口<ExternalLinkIcon/></a>（viewport）交叉状态的方法。其祖先元素或视口被称为根（root）。</p>
<p>当一个 <code v-pre>IntersectionObserver</code> 对象被创建时，其被配置为监听根中一段给定比例的可见区域。一旦 <code v-pre>IntersectionObserver</code> 被创建，则无法更改其配置，所以一个给定的观察者对象只能用来监听可见区域的特定变化值；然而，你可以在同一个观察者对象中配置监听多个目标元素。</p>
<ol>
<li>
<p>实例身上的属性</p>
<ol>
<li>root：测试交叉时，用作边界盒的<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Element" target="_blank" rel="noopener noreferrer">元素<ExternalLinkIcon/></a>或<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Document" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a>。如果构造函数未传入 <code v-pre>root</code> 或其值为<code v-pre>null</code>，则默认使用顶级文档的视口。</li>
<li>rootMargin：计算交叉时添加到根<a href="https://developer.mozilla.org/en-US/docs/Glossary/Bounding_box" target="_blank" rel="noopener noreferrer">边界盒 (en-US)<ExternalLinkIcon/></a>的矩形偏移量，可以有效的缩小或扩大根的判定范围从而满足计算需要。此属性返回的值可能与调用构造函数时指定的值不同，因此可能需要更改该值，以匹配内部要求。所有的偏移量均可用<strong>像素</strong>（<code v-pre>px</code>）或<strong>百分比</strong>（<code v-pre>%</code>）来表达，默认值为 “0px 0px 0px 0px”。</li>
<li>thresholds：一个包含阈值的列表，按升序排列，列表中的每个阈值都是监听对象的交叉区域与边界区域的比率。当监听对象的任何阈值被越过时，都会生成一个通知（Notification）。如果构造器未传入值，则默认值为 0。</li>
</ol>
</li>
<li>
<p>实例方法</p>
<ol>
<li>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/disconnect" target="_blank" rel="noopener noreferrer"><code v-pre>IntersectionObserver.disconnect()</code><ExternalLinkIcon/></a>使 <code v-pre>IntersectionObserver</code> 对象停止监听目标。</p>
</li>
<li>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/observe" target="_blank" rel="noopener noreferrer"><code v-pre>IntersectionObserver.observe()</code><ExternalLinkIcon/></a>使 <code v-pre>IntersectionObserver</code> 开始监听一个目标元素。</p>
</li>
<li>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/takeRecords" target="_blank" rel="noopener noreferrer"><code v-pre>IntersectionObserver.takeRecords()</code><ExternalLinkIcon/></a>返回所有观察目标的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserverEntry" target="_blank" rel="noopener noreferrer"><code v-pre>IntersectionObserverEntry</code><ExternalLinkIcon/></a> 对象数组。</p>
</li>
<li>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/unobserve" target="_blank" rel="noopener noreferrer"><code v-pre>IntersectionObserver.unobserve()</code><ExternalLinkIcon/></a>使 <code v-pre>IntersectionObserver</code> 停止监听特定目标元素。</p>
</li>
</ol>
</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">Intersection</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> img <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
    <span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">threshold</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token comment">//threshold：属性决定相交比例为多少时，触发回调函数。取值为 0 ~ 1，或者 0 ~ 1的数组。</span>
        <span class="token literal-property property">rootMargin</span><span class="token operator">:</span> <span class="token string">"0px"</span><span class="token punctuation">,</span><span class="token comment">//rootMargin： 类似于 CSS 的 margin 属性。用来缩小或扩大 rootBounds，从而影响相交的触发 </span>
        <span class="token literal-property property">root</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span><span class="token comment">//root：设置监视器的根节点，不传则默认为视口。</span>
    <span class="token punctuation">}</span>
    <span class="token comment">/*
        entries的属性
        time：发生相交到相应的时间，毫秒。
        rootBounds：根元素矩形区域的信息，如果没有设置根元素则返回null，图中蓝色部分区域。
        boundingClientRect：目标元素的矩形区域的信息，图中黑色边框的区域。
        intersectionRect：目标元素与视口（或根元素）的交叉区域的信息，图中蓝色方块和粉红色方块相交的区域。
        isIntersecting：目标元素与根元素是否相交
        intersectionRatio：目标元素与视口（或根元素）的相交比例。
        target：目标元素。
    */</span>
    <span class="token keyword">const</span> iso <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IntersectionObserver</span><span class="token punctuation">(</span><span class="token parameter">entries</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> timer <span class="token operator">=</span> <span class="token keyword">null</span>
        entries<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>v<span class="token punctuation">.</span>isIntersecting<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                index<span class="token operator">++</span>
                v<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'src'</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">./image/image</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>index<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.jpg</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
                iso<span class="token punctuation">.</span><span class="token function">unobserve</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span>target<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span>

    <span class="token comment">// 开启观察</span>
    img<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">element</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        iso<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-剪贴板clipboard" tabindex="-1"><a class="header-anchor" href="#_2-剪贴板clipboard" aria-hidden="true">#</a> 2.剪贴板Clipboard</h2>
<p>该 API 被设计用来取代使用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand" target="_blank" rel="noopener noreferrer"><code v-pre>document.execCommand()</code><ExternalLinkIcon/></a> 的剪贴板访问方式。</p>
<p>1.<code v-pre>document.execCommand()</code>实现</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>
<span class="token comment">// 复制文本</span>
<span class="token keyword">function</span> <span class="token function">copyText</span><span class="token punctuation">(</span><span class="token parameter">text</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 创建一个临时的文本输入框</span>
  <span class="token keyword">const</span> input <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'input'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  input<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'value'</span><span class="token punctuation">,</span> text<span class="token punctuation">)</span><span class="token punctuation">;</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
  input<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 执行复制命令</span>
  document<span class="token punctuation">.</span><span class="token function">execCommand</span><span class="token punctuation">(</span><span class="token string">'copy'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 删除临时文本输入框</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 粘贴文本</span>
<span class="token keyword">function</span> <span class="token function">pasteText</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 创建一个临时的文本输入框</span>
  <span class="token keyword">const</span> input <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'input'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
  input<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 执行粘贴命令</span>
  document<span class="token punctuation">.</span><span class="token function">execCommand</span><span class="token punctuation">(</span><span class="token string">'paste'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> text <span class="token operator">=</span> input<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
  <span class="token comment">// 删除临时文本输入框</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> text<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.clipboard实现</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>使用前必须focus聚焦在文档内，否则报错Uncaught (in promise) DOMException: Document is not focused。控制台触发就不行</p>
</div>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>复制
navigator<span class="token punctuation">.</span>clipboard<span class="token punctuation">.</span><span class="token function">writeText</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
粘贴
<span class="token keyword">const</span> clipboardData <span class="token operator">=</span> <span class="token keyword">await</span> navigator<span class="token punctuation">.</span>clipboard<span class="token punctuation">.</span><span class="token function">readText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-requestanimationframe" tabindex="-1"><a class="header-anchor" href="#_3-requestanimationframe" aria-hidden="true">#</a> 3.requestAnimationFrame</h2>
<p><strong><code v-pre>window.requestAnimationFrame()</code></strong> 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，<strong>该回调函数会在浏览器下一次重绘之前执行。</strong></p>
<p>window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。</p>
<p>与setTimeout相比，requestAnimationFrame最大的优势是由系统来决定回调函数的执行时机。具体一点讲，如果屏幕刷新率是60Hz,那么回调函数就每16.7ms被执行一次，如果刷新率是75Hz，那么这个时间间隔就变成了1000/75=13.3ms，换句话说就是，requestAnimationFrame的步伐跟着系统的刷新步伐走。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。</p>
<p>该方法会返回一个id可以用于<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame" target="_blank" rel="noopener noreferrer"><code v-pre>window.cancelAnimationFrame()</code><ExternalLinkIcon/></a>取消</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> id <span class="token operator">=</span> <span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span><span class="token punctuation">(</span>DOMHighResTimeStamp<span class="token operator">:</span><span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=></span> id<span class="token operator">:</span><span class="token builtin">number</span><span class="token punctuation">{</span>
            <span class="token comment">// 它表示 requestAnimationFrame() 开始执行回调函数的时刻。</span>
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>DOMHighResTimeStamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该API的优点：</p>
<ul>
<li>CPU节能：使用setTimeout实现的动画，当页面被隐藏或最小化时，setTimeout 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费CPU资源。而requestAnimationFrame则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统步伐走的requestAnimationFrame也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了CPU开销。</li>
<li>函数节流：在高频率事件(resize,scroll等)中，为了防止在一个刷新间隔内发生多次函数执行，使用requestAnimationFrame可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。一个刷新间隔内函数执行多次时没有意义的，因为显示器每16.7ms刷新一次，多次绘制并不会在屏幕上体现出来。</li>
</ul>
<h2 id="_4-requestidlecallback" tabindex="-1"><a class="header-anchor" href="#_4-requestidlecallback" aria-hidden="true">#</a> 4.requestIdleCallback</h2>
<p>一帧的生命周期</p>
<p><img src="/javaScript/frame.png" alt=""></p>
<p>假如某一帧里面要执行的任务不多，在不到16ms（1000/60)的时间内就完成了上述任务的话，那么这一帧就会有一定的空闲时间，这段时间就恰好可以用来执行requestIdleCallback的回调</p>
<p>方法插入一个函数，这个函数将在浏览器空闲时期被调用。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间<code v-pre>timeout</code>，则有可能为了在超时前执行函数而打乱执行顺序。</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>如果该回调任务必须执行，需要设置timeout防止超时，因此该函数一般用于执行低优先级的任务</p>
</div>
<p>该函数返回一个 ID，可以把它传入 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelIdleCallback" target="_blank" rel="noopener noreferrer"><code v-pre>Window.cancelIdleCallback()</code><ExternalLinkIcon/></a> 方法来结束回调。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> id <span class="token operator">=</span> <span class="token function">requestIdleCallback</span><span class="token punctuation">(</span><span class="token punctuation">(</span>IdleDeadline<span class="token operator">:</span><span class="token punctuation">{</span>didTimeout<span class="token operator">:</span><span class="token builtin">boolean</span><span class="token punctuation">,</span><span class="token function-variable function">timeRemaining</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token builtin">number</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>IdleDeadline<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
            timeout<span class="token operator">:</span> <span class="token number">2000</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>回调接收一个IdleDeadline参数对象，该对象的timeRemaining表示剩余多少闲置时间，如果 idle period 已经结束，则它的值是 0。你的回调函数 (传给 requestIdleCallback 的函数) 可以重复的访问这个属性用来判断当前线程的闲置时间是否可以在结束前执行更多的任务。</p>
<h2 id="_5-web-workers" tabindex="-1"><a class="header-anchor" href="#_5-web-workers" aria-hidden="true">#</a> 5.Web Workers</h2>
<p>Web Worker 为 Web 内容在后台线程中运行脚本提供了一种简单的方法。线程可以执行任务而不干扰用户界面。此外，他们可以使用<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest" target="_blank" rel="noopener noreferrer"><code v-pre>XMLHttpRequest</code><ExternalLinkIcon/></a>执行 I/O (尽管<code v-pre>responseXML</code>和<code v-pre>channel</code>属性总是为空)。一旦创建，一个 worker 可以将消息发送到创建它的 JavaScript 代码，通过将消息发布到该代码指定的事件处理程序（反之亦然）。本文提供了有关使用 Web Worker 的详细介绍。</p>
<h3 id="规则" tabindex="-1"><a class="header-anchor" href="#规则" aria-hidden="true">#</a> 规则：</h3>
<ol>
<li>
<p>一个 worker 是使用一个构造函数创建的一个对象 (e.g. <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/Worker" target="_blank" rel="noopener noreferrer"><code v-pre>Worker('xxx.js')</code><ExternalLinkIcon/></a>) 运行一个命名的 JavaScript 文件 - 这个文件包含将在工作线程中运行的代码; workers 运行在另一个全局上下文中，不同于当前的<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window" target="_blank" rel="noopener noreferrer"><code v-pre>window</code><ExternalLinkIcon/></a>. 因此，在 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Worker" target="_blank" rel="noopener noreferrer"><code v-pre>Worker</code><ExternalLinkIcon/></a> 内通过 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window" target="_blank" rel="noopener noreferrer"><code v-pre>window</code><ExternalLinkIcon/></a>获取全局作用域  将返回错误。<u>想要访问全局上下文用</u><code v-pre>self</code>关键字</p>
</li>
<li>
<p>worker内无法直接操纵DOM</p>
</li>
<li>
<p>workers和主线程数据使用postMessage方法发送消息</p>
</li>
<li>
<p>终止规则两种方法 1.<code v-pre>worker实例.terminate()</code> 2.workers调用自己的<code v-pre>close()</code>关闭</p>
</li>
<li>
<p>监听消息<code v-pre>onmessage</code></p>
</li>
<li>
<p><u>在主页面与 worker 之间传递的数据是通过<strong>拷贝</strong>，而不是共享来完成的。传递给 <code v-pre>worker</code> 的对象需要经过序列化，接下来在另一端还需要反序列化。页面与 <code v-pre>worker</code> <strong>不会共享同一个实例</strong>，最终的结果就是在每次通信结束时生成了数据的<strong>一个副本</strong>。</u></p>
</li>
<li>
<p>错误处理当 worker 出现运行中错误时，它的 <code v-pre>onerror</code> 事件处理函数会被调用。它会收到一个扩展了 <code v-pre>ErrorEvent</code> 接口的名为 <code v-pre>error</code>的事件。我们可以通过以下错误信息找到错误原因：</p>
<ol>
<li>
<p><code v-pre>message</code>可读性良好的错误消息。</p>
</li>
<li>
<p><code v-pre>filename</code>发生错误的脚本文件名。</p>
</li>
<li>
<p><code v-pre>lineno</code>发生错误时所在脚本文件的行号。</p>
</li>
</ol>
</li>
</ol>
<h4 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h4>
<ol>
<li>。由于 Worker 不能读取本地文件，所以这个脚本必须来自网络。如果下载没有成功（比如404错误），Worker 就会默默地失败。</li>
<li>加密数据 有些加解密的算法比较复杂，或者在加解密很多数据的时候，这会非常耗费计算资源，导致UI线程无响应，因此这是使用Web Worker的好时机，使用Worker线程可以让用户更加无缝的操作UI。 预取数据</li>
<li>有时候为了提升数据加载速度，可以提前使用Worker线程获取数据，因为Worker线程是可以是用 XMLHttpRequest 的。 预渲染在某些渲染场景下，比如渲染复杂的canvas的时候需要计算的效果比如反射、折射、光影、材料等，这些计算的逻辑可以使用Worker线程来执行，也可以使用多个Worker线程。</li>
<li>复杂数据处理场景某些检索、排序、过滤、分析会非常耗费时间，这时可以使用Web Worker来进行，不占用主线程。</li>
<li>预加载图片有时候一个页面有很多图片，或者有几个很大的图片的时候，如果业务限制不考虑懒加载，也可以使用Web Worker来加载图片。</li>
</ol>
<p>::: warning:</p>
<p>虽然使用worker线程不会占用主线程，但是启动worker会比较耗费资源。此外 主线程中使用XMLHttpRequest在请求过程中浏览器另开了一个异步http请求线程，但是交互过程中还是要消耗主线程资源</p>
<p>:::</p>
<h4 id="代码展示" tabindex="-1"><a class="header-anchor" href="#代码展示" aria-hidden="true">#</a> 代码展示</h4>
<p><strong>主进程代码示例</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> worker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Worker</span><span class="token punctuation">(</span><span class="token string">"worker.js"</span><span class="token punctuation">)</span>

worker<span class="token punctuation">.</span><span class="token function-variable function">onmessage</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'主进程监听消息'</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span>

<span class="token punctuation">}</span>

worker<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">这是一条主进程给worker的消息</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>document<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>workers代码示例</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>\<span class="token operator">*</span> Worker 内部如果要加载其他脚本，

\<span class="token operator">*</span> <span class="token function">有一个专门的方法importScripts</span><span class="token punctuation">(</span><span class="token punctuation">)</span>。 <span class="token function">importScripts</span><span class="token punctuation">(</span><span class="token string">'script1.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

\<span class="token operator">*</span> <span class="token function">该方法可以同时加载多个脚本importScripts</span><span class="token punctuation">(</span><span class="token string">'script1.js'</span><span class="token punctuation">,</span> <span class="token string">'script2.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token operator">*</span><span class="token operator">/</span>
<span class="token function">importScripts</span><span class="token punctuation">(</span><span class="token string">'./other_script.js'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> worker_data <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">123</span>
<span class="token punctuation">}</span>
<span class="token function-variable function">onmessage</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">ev</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'worker监听消息'</span><span class="token punctuation">,</span> ev<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">postMessage</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>worker_data<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="共享worker" tabindex="-1"><a class="header-anchor" href="#共享worker" aria-hidden="true">#</a> 共享worker</h4>
<p>一个共享 worker 可以被多个脚本使用——即使这些脚本正在被不同的 window、iframe 或者 worker 访问。</p>
<div class="custom-container danger"><p class="custom-container-title">DANGER</p>
<ol>
<li>如果共享 worker 可以被多个浏览上下文调用，所有这些浏览上下文必须属于同源（相同的协议，主机和端口号）。</li>
</ol>
</div>
<p>生成一个新的共享 worker 与生成一个专用 worker 非常相似，只是构造器的名字不同index.html 和 index2.html——生成共享 worker 的代码如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>const shareWorker = new SharedWorker('worker.js');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><u></u></p>
<h5 id="规则-1" tabindex="-1"><a class="header-anchor" href="#规则-1" aria-hidden="true">#</a> 规则</h5>
<ol>
<li>一个非常大的区别在于，与一个共享 worker 通信必须通过端口对象——》一个确切的打开的端口供脚本与 worker 通信（在专用 worker 中这一部分是隐式进行的）。</li>
<li>在传递消息之前，端口连接必须被显式的打开，打开方式是使用 onmessage 事件处理函数或者 start() 方法。start() 方法的调用只在一种情况下需要，那就是消息事件addEventListener() 方法被使用。</li>
<li>worker进程中使用 <code v-pre>onconnect</code> 事件处理函数来执行代码。</li>
</ol>
<h5 id="代码展示-1" tabindex="-1"><a class="header-anchor" href="#代码展示-1" aria-hidden="true">#</a> 代码展示</h5>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>index<span class="token punctuation">.</span>html <span class="token operator">-</span> <span class="token number">1</span>
    <span class="token operator">&lt;</span>script<span class="token operator">></span>
        <span class="token comment">/*
        * Worker 内部如果要加载其他脚本，
        * 有一个专门的方法importScripts()。 importScripts('script1.js');
        * 该方法可以同时加载多个脚本importScripts('script1.js', 'script2.js');
        */</span>

        <span class="token keyword">const</span> worker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SharedWorker</span><span class="token punctuation">(</span><span class="token string">"worker.js"</span><span class="token punctuation">)</span>
        worker<span class="token punctuation">.</span>port<span class="token punctuation">.</span><span class="token function-variable function">onmessage</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'主进程1监听消息'</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        worker<span class="token punctuation">.</span>port<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">这是一条主进程1给worker的消息</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>

    <span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>index<span class="token punctuation">.</span>html <span class="token operator">-</span> <span class="token number">2</span>

    <span class="token operator">&lt;</span>script<span class="token operator">></span>
        <span class="token comment">/*
        * Worker 内部如果要加载其他脚本，
        * 有一个专门的方法importScripts()。 importScripts('script1.js');
        * 该方法可以同时加载多个脚本importScripts('script1.js', 'script2.js');
        */</span>

        <span class="token keyword">const</span> worker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SharedWorker</span><span class="token punctuation">(</span><span class="token string">"worker.js"</span><span class="token punctuation">)</span>
        worker<span class="token punctuation">.</span>port<span class="token punctuation">.</span><span class="token function-variable function">onmessage</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'主进程2监听消息'</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        worker<span class="token punctuation">.</span>port<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">这是一条主进程2给worker的消息</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>

    <span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>worker

<span class="token function-variable function">onconnect</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//使用事件的 ports 属性来获取端口并存储在变量中。</span>
    <span class="token keyword">var</span> port <span class="token operator">=</span> e<span class="token punctuation">.</span>ports<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    port<span class="token punctuation">.</span><span class="token function-variable function">onmessage</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> workerResult <span class="token operator">=</span> <span class="token string">'Result: '</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>data<span class="token punctuation">;</span>
        port<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span>workerResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-pwa-渐进式-web-应用" tabindex="-1"><a class="header-anchor" href="#_6-pwa-渐进式-web-应用" aria-hidden="true">#</a> 6.PWA-渐进式 Web 应用</h2>
<p>**优点：**PWA 是可被发现、易安装、可链接、独立于网络、渐进式、可重用、响应性和安全的。关于这些含义的细节</p>
<p>**PWA能实现哪些功能？**1.添加主屏幕 2.推送消息通知 3.离线使用应用 4.可共享URL分享给他人</p>
<h3 id="pwa的架构" tabindex="-1"><a class="header-anchor" href="#pwa的架构" aria-hidden="true">#</a> PWA的架构</h3>
<p>渲染网站主要有两种方法 - 在服务器上或在客户端上。它们都有其优点和缺点，你可以适当地混合使用这两种方法</p>
<ul>
<li>服务器端渲染（SSR）的意思是在服务器上渲染网页，因此首次加载会更快，但是在不同页面之间导航都需要下载新的 HTML 内容。它的跨浏览器兼容性良好，但代价是页间加载时间延长，也就是总体感知上的性能降低：每加载一个页面，都需要一个服务器请求往返的时间。</li>
<li>客户端渲染（CSR）允许在导航到不同页面时几乎立即在浏览器中更新网站，但在开始时需要更多的初始下载和客户端上的额外渲染。首次访问时网站速度较慢，但后续访问速度要快得多。</li>
</ul>
<p>最流行的是“App Shell”概念，它完全按照上述方式混用 SSR 和 CSR；此外还遵循“离线优先”方法，这个我们将在后续文章中详细解释，也会在示例应用程序中使用。我们还会简要提及另一种涉及<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Streams_API" target="_blank" rel="noopener noreferrer">Streams API<ExternalLinkIcon/></a>的新方法</p>
<h3 id="添加主屏幕" tabindex="-1"><a class="header-anchor" href="#添加主屏幕" aria-hidden="true">#</a> 添加主屏幕</h3>
<p><strong>规则：</strong></p>
<ol>
<li>应用通过 HTTPS 提供服务——Web 正朝着更加安全的方向发展，包括 A2HS 在内的许多现代 Web 技术都将仅工作在安全的环境中。</li>
<li>从 HTML 头链接具有正确字段的 manifest 文件。</li>
<li>有合适的图标可显示在主屏幕上。(ui需要定制尺寸)</li>
<li>Chrome 浏览器还要求该应用程序注册一个 Service Worker（这样在离线状态下就也可以运行）。</li>
</ol>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<h4 id="manifest文件配置" tabindex="-1"><a class="header-anchor" href="#manifest文件配置" aria-hidden="true">#</a> manifest文件配置</h4>
<p><strong>manifest</strong>:Web manifest 以标准 JSON 格式编写，应放置在应用程序目录中的某个位置（最好是在根目录中）</p>
<p>html中需要引入该文件🎉</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>manifest<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>manifest.webmanifest<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>
<ul>
<li><code v-pre>background_color</code>：指定在某些应用程序上下文中使用的背景色。与 A2HS 最相关的一个是在点击主屏幕上的应用程序图标并首次开始加载时显示的初始屏幕（目前仅在通过 Chrome 将应用添加到主屏幕时显示）。</li>
<li><code v-pre>display</code>：指定应如何显示应用。为了使它看起来像一个应用程序而非网页，这里应该填写像是 <code v-pre>fullscreen</code> （根本不显示任何 UI）或 <code v-pre>standalone</code>（与前者非常相似，但是状态栏这样的系统级 UI 元素可能是可见的）的值。</li>
<li><code v-pre>icons</code>：指定在不同位置（例如，在任务切换器上或更重要的是在主屏幕上）表示应用程序时浏览器使用的图标。我们的演示中仅包含一个。(<u>请注意，每个图标对象中的 <code v-pre>type</code> 成员都指定了该图标的 MIME 类型，因此浏览器可以快速读取该图标的类型，并在不支持此类型时将其忽略并采用其他图标。</u>)</li>
<li><code v-pre>name</code>/<code v-pre>short_name</code>：这些字段提供了在不同位置表示应用程序时要显示的应用程序名称。<code v-pre>name</code> 提供完整的应用名称。<code v-pre>short_name</code> 则是当没有足够的空间显示全名时，提供的缩写名称。如果您的应用程序名称特别长，建议您同时提供两者。</li>
<li><code v-pre>start_url</code>：提供启动添加到主屏幕应用程序时应加载的资源的路径。请注意，这必须是一个相对 manifest 指向网站主页的相对路径。另请注意，Chrome 需要这条字段才能显示安装标语，而 Firefox 即使没有这条字段也会显示用于添加到主屏的含加号的主页图标。</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"js13kGames Progressive Web App"</span><span class="token punctuation">,</span>
    <span class="token property">"short_name"</span><span class="token operator">:</span> <span class="token string">"js13kPWA"</span><span class="token punctuation">,</span>
    <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"Progressive Web App that lists games submitted to the A-Frame category in the js13kGames 2017 competition."</span><span class="token punctuation">,</span>
    <span class="token property">"icons"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">"src"</span><span class="token operator">:</span> <span class="token string">"icons/icon-32.png"</span><span class="token punctuation">,</span>
            <span class="token property">"sizes"</span><span class="token operator">:</span> <span class="token string">"32x32"</span><span class="token punctuation">,</span>
            <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"image/png"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token property">"src"</span><span class="token operator">:</span> <span class="token string">"icons/icon-64.png"</span><span class="token punctuation">,</span>
            <span class="token property">"sizes"</span><span class="token operator">:</span> <span class="token string">"64x64"</span><span class="token punctuation">,</span>
            <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"image/png"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token property">"src"</span><span class="token operator">:</span> <span class="token string">"icons/icon-96.png"</span><span class="token punctuation">,</span>
            <span class="token property">"sizes"</span><span class="token operator">:</span> <span class="token string">"96x96"</span><span class="token punctuation">,</span>
            <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"image/png"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token property">"src"</span><span class="token operator">:</span> <span class="token string">"icons/icon-128.png"</span><span class="token punctuation">,</span>
            <span class="token property">"sizes"</span><span class="token operator">:</span> <span class="token string">"128x128"</span><span class="token punctuation">,</span>
            <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"image/png"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token property">"src"</span><span class="token operator">:</span> <span class="token string">"icons/icon-168.png"</span><span class="token punctuation">,</span>
            <span class="token property">"sizes"</span><span class="token operator">:</span> <span class="token string">"168x168"</span><span class="token punctuation">,</span>
            <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"image/png"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token property">"src"</span><span class="token operator">:</span> <span class="token string">"icons/icon-192.png"</span><span class="token punctuation">,</span>
            <span class="token property">"sizes"</span><span class="token operator">:</span> <span class="token string">"192x192"</span><span class="token punctuation">,</span>
            <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"image/png"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token property">"src"</span><span class="token operator">:</span> <span class="token string">"icons/icon-256.png"</span><span class="token punctuation">,</span>
            <span class="token property">"sizes"</span><span class="token operator">:</span> <span class="token string">"256x256"</span><span class="token punctuation">,</span>
            <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"image/png"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token property">"src"</span><span class="token operator">:</span> <span class="token string">"icons/icon-512.png"</span><span class="token punctuation">,</span>
            <span class="token property">"sizes"</span><span class="token operator">:</span> <span class="token string">"512x512"</span><span class="token punctuation">,</span>
            <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"image/png"</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"start_url"</span><span class="token operator">:</span> <span class="token string">"./index.html"</span><span class="token punctuation">,</span>
    <span class="token property">"display"</span><span class="token operator">:</span> <span class="token string">"fullscreen"</span><span class="token punctuation">,</span>
    <span class="token property">"theme_color"</span><span class="token operator">:</span> <span class="token string">"#B12A34"</span><span class="token punctuation">,</span>
    <span class="token property">"background_color"</span><span class="token operator">:</span> <span class="token string">"#B12A34"</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了使应用离线运行，你必须使用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API" target="_blank" rel="noopener noreferrer">Service Worker API<ExternalLinkIcon/></a> 来离线存储资源，如果需要，还可以使用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API" target="_blank" rel="noopener noreferrer">Web Storage<ExternalLinkIcon/></a> 或 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API" target="_blank" rel="noopener noreferrer">IndexedDB<ExternalLinkIcon/></a> 来存储其数据。</p>
<h4 id="js触发时间添加到主屏幕" tabindex="-1"><a class="header-anchor" href="#js触发时间添加到主屏幕" aria-hidden="true">#</a> JS触发时间添加到主屏幕</h4>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>    <span class="token operator">&lt;</span>button id<span class="token operator">=</span><span class="token string">"btn"</span><span class="token operator">></span>添加主屏幕<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
    <span class="token operator">&lt;</span>script<span class="token operator">></span>
        <span class="token keyword">const</span> btn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'btn'</span><span class="token punctuation">)</span>
        window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'beforeinstallprompt'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token comment">// 防止 Chrome 67 及更早版本自动显示安装提示</span>
            e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 稍后再触发此事件 将事件对象存储在 deferredPrompt 变量中，以便以后可以用于执行实际安装。之后使用 beforeinstallprompt 事件对象（存储在 deferredPrompt 中）上可用的 prompt() 方法触发显示安装提示。</span>
            deferredPrompt <span class="token operator">=</span> e<span class="token punctuation">;</span>
            <span class="token comment">// 更新 UI 以提醒用户可以将 App 安装到桌面</span>
            btn<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">'block'</span><span class="token punctuation">;</span>

            btn<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token comment">// 隐藏显示 A2HS 按钮的界面</span>
                btn<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">'none'</span><span class="token punctuation">;</span>
                <span class="token comment">// 显示安装提示</span>
                deferredPrompt<span class="token punctuation">.</span><span class="token function">prompt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 等待用户反馈</span>
                deferredPrompt<span class="token punctuation">.</span>userChoice<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">choiceResult</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>choiceResult<span class="token punctuation">.</span>outcome <span class="token operator">===</span> <span class="token string">'accepted'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'User accepted the A2HS prompt'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'User dismissed the A2HS prompt'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                     <span class="token comment">//将 deferredPrompt 设置为 null，因为不再需要它。</span>
                    deferredPrompt <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-pwa离线工作-service-worker" tabindex="-1"><a class="header-anchor" href="#_7-pwa离线工作-service-worker" aria-hidden="true">#</a> 7.PWA离线工作-Service Worker</h2>
<p>Service Worker 是浏览器和网络之间的虚拟代理。它们终于解决了前端开发人员多年来一直在努力解决的一些问题，其中最值得关注的是，<u>解决了如何正确缓存网站资源并使其在离线时可用的问题。</u></p>
<p>Service workers 非常强大，<u>因为他们可以控制网络请求、修改网络请求、返回缓存的自定义响应，或者合成响应。</u></p>
<h3 id="service-worker生命周期" tabindex="-1"><a class="header-anchor" href="#service-worker生命周期" aria-hidden="true">#</a> Service Worker生命周期</h3>
<p>https://github.com/mdn/pwa-examples/tree/main/js13kpwa缓存展示</p>
<ol>
<li>
<p>注册:主进程中注册，注册完成后，sw.js 文件会自动下载、安装，然后激活。</p>
<ol>
<li>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span><span class="token punctuation">(</span><span class="token string">'serviceWorker'</span> <span class="token keyword">in</span> navigator<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    navigator<span class="token punctuation">.</span>serviceWorker<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token string">'/pwa-examples/js13kpwa/sw.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</li>
<li>
<p>安装:在 <code v-pre>install</code> 的监听函数中，我们可以初始化缓存并添加离线应用时所需的文件</p>
<ol>
<li>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>self<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'install'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'[Service Worker] Install'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//ExtendableEvent.waitUntil() 方法告诉事件分发器该事件仍在进行。这个方法也可以用于检测进行的任务是否成功。在服务工作线程中，这个方法告诉浏览器事件一直进行，直至 promise 解决，浏览器不应该在事件中的异步操作完成之前终止服务工作线程。这里就是在缓存操作完成后才能终止服务工作线程在此之前将服务工作线程保持在 installing阶段</span>
  e<span class="token punctuation">.</span><span class="token function">waitUntil</span><span class="token punctuation">(</span>
      <span class="token operator">-</span>》缓存操作
    caches<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span>cacheName<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">cache</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'[Service Worker] Caching all: app shell and content'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> cache<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>contentToCache<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>缓存操作-》首先，创建一个存储缓存名字的变量，App Shell 所需的文件记录</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> cacheName <span class="token operator">=</span> <span class="token string">'缓存名字xxx'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> appShellFiles <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token comment">//需要缓存的文件</span>
  <span class="token string">'/pwa-examples/js13kpwa/'</span><span class="token punctuation">,</span>
  <span class="token string">'/pwa-examples/js13kpwa/index.html'</span><span class="token punctuation">,</span>
  <span class="token string">'/pwa-examples/js13kpwa/app.js'</span><span class="token punctuation">,</span>
  <span class="token string">'/pwa-examples/js13kpwa/style.css'</span><span class="token punctuation">,</span>
  <span class="token string">'/pwa-examples/js13kpwa/fonts/graduate.eot'</span><span class="token punctuation">,</span>
  <span class="token string">'/pwa-examples/js13kpwa/fonts/graduate.ttf'</span><span class="token punctuation">,</span>
  <span class="token string">'/pwa-examples/js13kpwa/fonts/graduate.woff'</span><span class="token punctuation">,</span>
  <span class="token string">'/pwa-examples/js13kpwa/favicon.ico'</span><span class="token punctuation">,</span>
  <span class="token string">'/pwa-examples/js13kpwa/img/js13kgames.png'</span><span class="token punctuation">,</span>
  <span class="token string">'/pwa-examples/js13kpwa/img/bg.png'</span><span class="token punctuation">,</span>
  <span class="token string">'/pwa-examples/js13kpwa/icons/icon-32.png'</span><span class="token punctuation">,</span>
  <span class="token string">'/pwa-examples/js13kpwa/icons/icon-64.png'</span><span class="token punctuation">,</span>
  <span class="token string">'/pwa-examples/js13kpwa/icons/icon-96.png'</span><span class="token punctuation">,</span>
  <span class="token string">'/pwa-examples/js13kpwa/icons/icon-128.png'</span><span class="token punctuation">,</span>
  <span class="token string">'/pwa-examples/js13kpwa/icons/icon-168.png'</span><span class="token punctuation">,</span>
  <span class="token string">'/pwa-examples/js13kpwa/icons/icon-192.png'</span><span class="token punctuation">,</span>
  <span class="token string">'/pwa-examples/js13kpwa/icons/icon-256.png'</span><span class="token punctuation">,</span>
  <span class="token string">'/pwa-examples/js13kpwa/icons/icon-512.png'</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</li>
<li>
<p>激活：<code v-pre>activate</code> 事件，它的用法跟 <code v-pre>install</code> 事件相同。这个事件通常用来删除那些我们已经不需要的文件或者做一些清理工作。</p>
<ol>
<li>
<p>清理不需要的缓存</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>self<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'activate'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  e<span class="token punctuation">.</span><span class="token function">waitUntil</span><span class="token punctuation">(</span>
    caches<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">keyList</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span>keyList<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>cacheName<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> caches<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</li>
<li>
<p>响应请求：<code v-pre>fetch</code> 事件对我们很有用，它在每次应用发起 HTTP 请求的时候被触发。这个事件对我们来说非常有用，它允许我们拦截请求并对请求作出自定义的响应。</p>
<ol>
<li>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>self<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'fetch'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'service worker 请求的url-》'</span><span class="token operator">+</span>e<span class="token punctuation">.</span>request<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>实际使用——》当缓存存在时，我们使用缓存来提供服务，而不重新请求数据。不管当前应用是在线还是离线，我们都这么做。当请求的文件不在缓存中时，我们会在响应之前将数据添加到缓存中。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>self<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'fetch'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//e.respondWith 方法将会接管响应控制，它会作为服务器和应用之间的代理服务。它允许我们对每一个请求作出我们想要的任何响应：Service Worker 会处理这一切，从缓存中获取这些数据，并在需要的情况下对它们进行修改。</span>
  e<span class="token punctuation">.</span><span class="token function">respondWith</span><span class="token punctuation">(</span>
      <span class="token comment">//检查给定的 Request 是否是 CacheStorage 对象跟踪的任何 Cache 对象的键，并返回一个 resolve 为该匹配的 Promise .</span>
    caches<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>request<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">r</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'[Service Worker] Fetching resource: '</span><span class="token operator">+</span>e<span class="token punctuation">.</span>request<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//如果缓存中没有就发请求然后缓存</span>
      <span class="token keyword">return</span> r <span class="token operator">||</span> <span class="token function">fetch</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>request<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> caches<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span>cacheName<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">cache</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          cache<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>request<span class="token punctuation">,</span> response<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">return</span> response<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</li>
</ol>
<h4 id="caches对象" tabindex="-1"><a class="header-anchor" href="#caches对象" aria-hidden="true">#</a> caches对象</h4>
<p><u>在 Service Worker 中使用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API" target="_blank" rel="noopener noreferrer">Web Storage<ExternalLinkIcon/></a> 将不会有效果，所以使用 Cache API 作为替代。</u></p>
<p>全局的 <strong><code v-pre>caches</code></strong> 只读属性返回与当前上下文紧密相关的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage" target="_blank" rel="noopener noreferrer"><code v-pre>CacheStorage</code><ExternalLinkIcon/></a> 对象。此对象激活了诸如存储用于离线使用的资源，并生成对请求的自定义响应等功能。</p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage/open" target="_blank" rel="noopener noreferrer"><code v-pre>CacheStorage.open()</code><ExternalLinkIcon/></a></p>
<p>返回一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank" rel="noopener noreferrer"><code v-pre>Promise</code><ExternalLinkIcon/></a> ，resolve 为匹配 <code v-pre>cacheName</code> （如果不存在则创建一个新的 cache）的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Cache" target="_blank" rel="noopener noreferrer"><code v-pre>Cache</code><ExternalLinkIcon/></a> 对象</p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage/delete" target="_blank" rel="noopener noreferrer"><code v-pre>CacheStorage.delete()</code><ExternalLinkIcon/></a></p>
<p>查找匹配 <code v-pre>cacheName</code> 的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Cache" target="_blank" rel="noopener noreferrer"><code v-pre>Cache</code><ExternalLinkIcon/></a> 对象，如果找到，则删除 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Cache" target="_blank" rel="noopener noreferrer"><code v-pre>Cache</code><ExternalLinkIcon/></a> 对象并返回一个 resolve 为 true 的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank" rel="noopener noreferrer"><code v-pre>Promise</code><ExternalLinkIcon/></a> 。如果没有找到 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Cache" target="_blank" rel="noopener noreferrer"><code v-pre>Cache</code><ExternalLinkIcon/></a> 对象，则返回 <code v-pre>false</code>.</p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage/keys" target="_blank" rel="noopener noreferrer"><code v-pre>CacheStorage.keys()</code><ExternalLinkIcon/></a></p>
<p>返回一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank" rel="noopener noreferrer"><code v-pre>Promise</code><ExternalLinkIcon/></a> ，它将使用一个包含与 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage" target="_blank" rel="noopener noreferrer"><code v-pre>CacheStorage</code><ExternalLinkIcon/></a> 追踪的所有命名 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Cache" target="_blank" rel="noopener noreferrer"><code v-pre>Cache</code><ExternalLinkIcon/></a> 对象对应字符串的数组来 resolve. 使用该方法迭代所有 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Cache" target="_blank" rel="noopener noreferrer"><code v-pre>Cache</code><ExternalLinkIcon/></a> 对象的列表。</p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage/match" target="_blank" rel="noopener noreferrer"><code v-pre>CacheStorage.match()</code><ExternalLinkIcon/></a></p>
<p>检查给定的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Request" target="_blank" rel="noopener noreferrer"><code v-pre>Request</code><ExternalLinkIcon/></a> 是否是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage" target="_blank" rel="noopener noreferrer"><code v-pre>CacheStorage</code><ExternalLinkIcon/></a> 对象跟踪的任何 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Cache" target="_blank" rel="noopener noreferrer"><code v-pre>Cache</code><ExternalLinkIcon/></a> 对象的键，并返回一个 resolve 为该匹配的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank" rel="noopener noreferrer"><code v-pre>Promise</code><ExternalLinkIcon/></a> .</p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage/has" target="_blank" rel="noopener noreferrer"><code v-pre>CacheStorage.has()</code><ExternalLinkIcon/></a></p>
<p>如果存在与 <code v-pre>cacheName</code> 匹配的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Cache" target="_blank" rel="noopener noreferrer"><code v-pre>Cache</code><ExternalLinkIcon/></a> 对象，则返回一个 resolve 为 true 的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank" rel="noopener noreferrer"><code v-pre>Promise</code><ExternalLinkIcon/></a> .</p>
<h4 id="更新service-worker" tabindex="-1"><a class="header-anchor" href="#更新service-worker" aria-hidden="true">#</a> 更新service worker</h4>
<p>我们存放在缓存名称中的版本号是这个问题的关键</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> cacheName <span class="token operator">=</span> <span class="token string">'js13kPWA-v1'</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们把版本号更新到 v2，Service Worker 会将我们所有的文件（包括那些新的文件）添加到一个新的缓存中。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>contentToCache<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'/pwa-examples/js13kpwa/icons/icon-32.png'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ...</span>

self<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'install'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  e<span class="token punctuation">.</span><span class="token function">waitUntil</span><span class="token punctuation">(</span>
    caches<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">'js13kPWA-v2'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">cache</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> cache<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>contentToCache<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个时候一个新的 Service Worker 会在后台被安装，而旧的 Service Worker 仍然会正常运行，直到没有任何页面使用到它为止，这时候新的 Service Worker 将会被激活，然后接管所有的页面。</p>
<h2 id="_8-pwa-消息推送和通知" tabindex="-1"><a class="header-anchor" href="#_8-pwa-消息推送和通知" aria-hidden="true">#</a> 8.PWA-消息推送和通知</h2>
<p>https://developer.mozilla.org/zh-CN/docs/Web/API/Push_API推送API</p>
<p>https://developer.mozilla.org/zh-CN/docs/Web/API/Notifications_API通知API</p>
<h3 id="_1-请求授权" tabindex="-1"><a class="header-anchor" href="#_1-请求授权" aria-hidden="true">#</a> 1.请求授权</h3>
<p>最好通过一些引导用户的事件去触发</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Notification<span class="token punctuation">.</span><span class="token function">requestPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">result</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>result <span class="token operator">===</span> <span class="token string">'granted'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">randomNotification</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用户的授权的结果有三种，default（默认）、granted（允许）或者 denied（拒绝），当用户没有做出选择的时候，授权结果会返回 default，      另外两种结果分别在用户选择了允许或者拒绝的时候返回。一旦用户选择授权，这个授权结果对通知 API 和推送 API 两者都有效。</p>
<h3 id="_2-创建通知" tabindex="-1"><a class="header-anchor" href="#_2-创建通知" aria-hidden="true">#</a> 2.创建通知</h3>
<p>在授权之后可以创建通知消息</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code> <span class="token keyword">function</span> <span class="token function">noti</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            Notification<span class="token punctuation">.</span><span class="token function">requestPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">result</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token operator">===</span> <span class="token string">'granted'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">randomNotification</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token operator">===</span> <span class="token string">'denied'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">noti</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token function">noti</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">function</span> <span class="token function">randomNotification</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">var</span> notifTitle <span class="token operator">=</span> <span class="token string">'这是通知标题'</span><span class="token punctuation">;</span>
            <span class="token keyword">var</span> notifBody <span class="token operator">=</span> <span class="token string">'通知内容'</span><span class="token punctuation">;</span>
            <span class="token keyword">var</span> notifImg <span class="token operator">=</span> <span class="token string">'./bgc.png'</span><span class="token punctuation">;</span>
            <span class="token keyword">var</span> options <span class="token operator">=</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">body</span><span class="token operator">:</span> notifBody<span class="token punctuation">,</span>
                <span class="token literal-property property">icon</span><span class="token operator">:</span> notifImg
            <span class="token punctuation">}</span>
            <span class="token keyword">var</span> notif <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Notification</span><span class="token punctuation">(</span>notifTitle<span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">setTimeout</span><span class="token punctuation">(</span>randomNotification<span class="token punctuation">,</span> <span class="token number">30000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="/javaScript/notification.png" alt="image-20230508185124595"></p>
<h3 id="_3-消息推送" tabindex="-1"><a class="header-anchor" href="#_3-消息推送" aria-hidden="true">#</a> 3.消息推送</h3>
<p>在 Service Worker 内部，存在一个消息推送服务订阅机制。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>registration<span class="token punctuation">.</span>pushManager<span class="token punctuation">.</span><span class="token function">getSubscription</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span> <span class="token comment">/* ... */</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了能够接收到推送的消息，我们需要在 Service Worker 文件里面监听 <a href="https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/push_event" target="_blank" rel="noopener noreferrer"><code v-pre>push</code> (en-US)<ExternalLinkIcon/></a> 事件：这些数据被接收后，将会以通知的方式立刻展现给用户，例如提醒用户一些待办事项，或者让用户知道 App 有了新内容。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>self.addEventListener('push', function(e) { /* ... */ });
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>demo:</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// Register a Service Worker.</span>
navigator<span class="token punctuation">.</span>serviceWorker<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token string">'service-worker.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

navigator<span class="token punctuation">.</span>serviceWorker<span class="token punctuation">.</span>ready
<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">registration</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 用PushManager获取用户对服务端推送服务的订阅 </span>
  <span class="token keyword">return</span> registration<span class="token punctuation">.</span>pushManager<span class="token punctuation">.</span><span class="token function">getSubscription</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">subscription</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//如果用户已经完成订阅，我们直接返回 subscription 对象并且跳转到订阅部分。如果没有，我们会初始化一个新的 subscription 对象：</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>subscription<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> subscription<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token comment">//App 会从服务器请求一个公钥并且把响应结果转化成文本，最后它还需要转化成一个 Uint8Array（为了兼容 Chrome）。</span>
    <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">'./vapidPublicKey'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> vapidPublicKey <span class="token operator">=</span> <span class="token keyword">await</span> response<span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> convertedVapidKey <span class="token operator">=</span> <span class="token function">urlBase64ToUint8Array</span><span class="token punctuation">(</span>vapidPublicKey<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//App 现在可以使用 PushManager 来订阅新用户。这个方法支持传递两个参数：第一个是 userVisibleOnly: true，意思是发送给用户的所有通知对他们都是可见的，第二个是 applicationServerKey，这个参数包含我们之前从服务端取得并转化的 VAPID key。</span>
    <span class="token keyword">return</span> registration<span class="token punctuation">.</span>pushManager<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">userVisibleOnly</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token literal-property property">applicationServerKey</span><span class="token operator">:</span> convertedVapidKey
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">subscription</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">// 首先使用 fetch 将 subscription 以 JSON 的方式发送给服务器。</span>
  <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">'./register'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">'Content-type'</span><span class="token operator">:</span> <span class="token string">'application/json'</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">body</span><span class="token operator">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">subscription</span><span class="token operator">:</span> subscription
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'doIt'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> payload <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'notification-payload'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
    <span class="token keyword">const</span> delay <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'notification-delay'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
    <span class="token keyword">const</span> ttl <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'notification-ttl'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>

<span class="token comment">//当按钮被点击的时候，fetch 会请求服务器根据给定的参数发送通知，payload 参数包含通知里面要显示的文本，delay 参数定义了通知将会延迟展示的秒数，ttl 是 time-to-live 的缩写，用来设置通知在服务器上的存活时间，依然是以秒为单位。</span>
    <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">'./sendNotification'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">'Content-type'</span><span class="token operator">:</span> <span class="token string">'application/json'</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">body</span><span class="token operator">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">subscription</span><span class="token operator">:</span> subscription<span class="token punctuation">,</span>
        <span class="token literal-property property">payload</span><span class="token operator">:</span> payload<span class="token punctuation">,</span>
        <span class="token literal-property property">delay</span><span class="token operator">:</span> delay<span class="token punctuation">,</span>
        <span class="token literal-property property">ttl</span><span class="token operator">:</span> ttl<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务端</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// Use the web-push library to hide the implementation details of the communication</span>
<span class="token comment">// between the application server and the push service.</span>
<span class="token comment">// For details, see https://tools.ietf.org/html/draft-ietf-webpush-protocol and</span>
<span class="token comment">// https://tools.ietf.org/html/draft-ietf-webpush-encryption.</span>
<span class="token keyword">const</span> webPush <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"web-push"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//web-push 模块被用来配置 VAPID 密钥，如果没有的话，还可以生成一个。</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">VAPID_PUBLIC_KEY</span> <span class="token operator">||</span> <span class="token operator">!</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">VAPID_PRIVATE_KEY</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
    <span class="token string">"You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY "</span> <span class="token operator">+</span>
      <span class="token string">"environment variables. You can use the following ones:"</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>webPush<span class="token punctuation">.</span><span class="token function">generateVAPIDKeys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// Set the keys used for encrypting the push messages.</span>
webPush<span class="token punctuation">.</span><span class="token function">setVapidDetails</span><span class="token punctuation">(</span>
  <span class="token string">"https://example.com/"</span><span class="token punctuation">,</span>
  process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">VAPID_PUBLIC_KEY</span><span class="token punctuation">,</span>
  process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">VAPID_PRIVATE_KEY</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 一个模块定义并导出了所有应用需要处理的路由：获取 VAPID 公钥、注册、发送通知等等。你可以看到来自 index.js 的 payload, delay 和ttl 变量在这里被用到了。</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">app<span class="token punctuation">,</span> route</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>route <span class="token operator">+</span> <span class="token string">"vapidPublicKey"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">VAPID_PUBLIC_KEY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  app<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span>route <span class="token operator">+</span> <span class="token string">"register"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// A real world application would store the subscription info.</span>
    res<span class="token punctuation">.</span><span class="token function">sendStatus</span><span class="token punctuation">(</span><span class="token number">201</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  app<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span>route <span class="token operator">+</span> <span class="token string">"sendNotification"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> subscription <span class="token operator">=</span> req<span class="token punctuation">.</span>body<span class="token punctuation">.</span>subscription<span class="token punctuation">;</span>
    <span class="token keyword">const</span> payload <span class="token operator">=</span> req<span class="token punctuation">.</span>body<span class="token punctuation">.</span>payload<span class="token punctuation">;</span>
    <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token constant">TTL</span><span class="token operator">:</span> req<span class="token punctuation">.</span>body<span class="token punctuation">.</span>ttl<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      webPush
        <span class="token punctuation">.</span><span class="token function">sendNotification</span><span class="token punctuation">(</span>subscription<span class="token punctuation">,</span> payload<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          res<span class="token punctuation">.</span><span class="token function">sendStatus</span><span class="token punctuation">(</span><span class="token number">201</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
          res<span class="token punctuation">.</span><span class="token function">sendStatus</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> req<span class="token punctuation">.</span>body<span class="token punctuation">.</span>delay <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>service——worker</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">//它做的就只是监听 push (en-US) 事件，创建 payload 变量，这个变量包含了来自 event.data 的文本（如果 data 是空的，就设置成 "no payload" 字符串），然后一直等到通知推送给用户为止。</span>
self<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'push'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Retrieve the textual payload from event.data (a PushMessageData object).</span>
  <span class="token comment">// 支持ArrayBuffer, Blob, JSON 这些数据</span>
  <span class="token keyword">const</span> payload <span class="token operator">=</span> event<span class="token punctuation">.</span>data <span class="token operator">?</span> event<span class="token punctuation">.</span>data<span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token string">'no data'</span><span class="token punctuation">;</span>
  <span class="token comment">// 保持推送状态直到接收到服务端的推送</span>
  event<span class="token punctuation">.</span><span class="token function">waitUntil</span><span class="token punctuation">(</span>
    <span class="token comment">// Show a notification with title 'ServiceWorker Cookbook' and use the payload</span>
    <span class="token comment">// as the body.</span>
    self<span class="token punctuation">.</span>registration<span class="token punctuation">.</span><span class="token function">showNotification</span><span class="token punctuation">(</span><span class="token string">'ServiceWorker Cookbook'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">body</span><span class="token operator">:</span> payload<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-mutationoberver" tabindex="-1"><a class="header-anchor" href="#_9-mutationoberver" aria-hidden="true">#</a> 9.MutationOberver</h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver" target="_blank" rel="noopener noreferrer"><code v-pre>MutationObserver</code><ExternalLinkIcon/></a> 接口提供了监视对 DOM 树所做更改的能力。它被设计为旧的 Mutation Events 功能的替代品，该功能是 DOM3 Events 规范的一部分。</p>
<p>语法：</p>
<ol>
<li>
<p>该构造函数接收一个回调函数</p>
<ol>
<li>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> mo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MutationObserver</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
</li>
<li>
<p>回调函数接收两个参数：一个是描述所有被触发改动的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/MutationRecord" target="_blank" rel="noopener noreferrer"><code v-pre>MutationRecord</code><ExternalLinkIcon/></a> 对象数组，另一个是调用该函数的 <code v-pre>MutationObserver</code> 对象。</p>
</li>
<li>
<p>该实例身上有三个方法</p>
<ol>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/disconnect" target="_blank" rel="noopener noreferrer"><code v-pre>disconnect()</code><ExternalLinkIcon/></a>阻止 <code v-pre>MutationObserver</code> 实例继续接收的通知，直到再次调用其 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe" target="_blank" rel="noopener noreferrer"><code v-pre>observe()</code><ExternalLinkIcon/></a> 方法，该观察者对象包含的回调函数都不会再被调用。</li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe" target="_blank" rel="noopener noreferrer"><code v-pre>observe()</code><ExternalLinkIcon/></a>配置 <code v-pre>MutationObserver</code> 在 DOM 更改匹配给定选项时，通过其回调函数开始接收通知。</li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/takeRecords" target="_blank" rel="noopener noreferrer"><code v-pre>takeRecords()</code><ExternalLinkIcon/></a>从 MutationObserver 的通知队列中删除所有待处理的通知，并将它们返回到 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/MutationRecord" target="_blank" rel="noopener noreferrer"><code v-pre>MutationRecord</code><ExternalLinkIcon/></a> 对象的新 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array" target="_blank" rel="noopener noreferrer"><code v-pre>Array</code><ExternalLinkIcon/></a> 中。</li>
</ol>
</li>
<li>
<p>observe必须要指定配置观察什么变动，每当观察带的配置变动就会触发回调的执行</p>
<ol>
<li>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// 观察器的配置（需要观察什么变动）</span>
<span class="token keyword">interface</span> <span class="token class-name">IObserverConfig</span> <span class="token punctuation">{</span>
    subtree<span class="token operator">:</span> <span class="token builtin">boolean</span>  <span class="token comment">//监听以target为根节点的整个子树及其子树的属性，</span>
    childList<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token comment">//监听target节点发生的节点新增或删除（如果subtree为true整个子树都生效）</span>
    attributes<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token comment">//监听节点属性值的变化  默认为true 但一旦声明characterDataOldValue|attributeFilter默认值就变为false</span>
    attributeFilter<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token comment">// 声明一个属性名数组用于监听。不过不声明默认任何属性变化都触发回调</span>
    attributeOldValue<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token comment">// 记录上一次被监听节点的属性变化</span>
    characterData<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token comment">// 监听target节点上的所有字符变化 默认值true  如果声明了characterDataOldValue默认值false</span>
    characterDataOldValue<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token comment">// 记录上一个被监听节点中发生的文本变化 默认false</span>
<span class="token punctuation">}</span>
MutationObserver <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">[</span><span class="token punctuation">[</span>Prototype<span class="token punctuation">]</span><span class="token punctuation">]</span>

MutationObserver
disconnect

ƒ <span class="token function">disconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
observe

ƒ <span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
takeRecords

ƒ <span class="token function">takeRecords</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</li>
<li>
<p>代码展示</p>
<ol>
<li>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>body<span class="token operator">></span>
    <span class="token operator">&lt;</span>ul id<span class="token operator">=</span><span class="token string">"ul"</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>li<span class="token operator">></span><span class="token number">1</span><span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
        <span class="token operator">&lt;</span>li<span class="token operator">></span><span class="token number">2</span><span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
        <span class="token operator">&lt;</span>li<span class="token operator">></span><span class="token number">3</span><span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
        <span class="token operator">&lt;</span>li<span class="token operator">></span><span class="token number">4</span><span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
        <span class="token operator">&lt;</span>li<span class="token operator">></span><span class="token number">5</span><span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>ul<span class="token operator">></span>
    <span class="token operator">&lt;</span>button id<span class="token operator">=</span><span class="token string">"btn"</span><span class="token operator">></span>aaa<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
    <span class="token operator">&lt;</span>script<span class="token operator">></span>

        <span class="token keyword">const</span> btn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'btn'</span><span class="token punctuation">)</span>
        <span class="token keyword">const</span> ul <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'ul'</span><span class="token punctuation">)</span>
        <span class="token keyword">const</span> children <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">const</span> <span class="token function-variable function">callback</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">MutationRecord<span class="token punctuation">,</span> MutationObserver</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            MutationRecord<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">mutation</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>mutation<span class="token punctuation">,</span> MutationObserver<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">const</span> mo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MutationObserver</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span>
        <span class="token keyword">const</span> observeConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">subtree</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token literal-property property">childList</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span>
        mo<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>ul<span class="token punctuation">,</span> observeConfig<span class="token punctuation">)</span>
        btn<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>children<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> iterator <span class="token keyword">of</span> ul<span class="token punctuation">.</span>children<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    children<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">cloneNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token keyword">break</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            ul<span class="token punctuation">.</span>children<span class="token punctuation">.</span>length <span class="token operator">?</span> ul<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span><span class="token operator">...</span>ul<span class="token punctuation">.</span>children<span class="token punctuation">)</span> <span class="token operator">:</span> ul<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span><span class="token operator">...</span>children<span class="token punctuation">)</span>
            Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> mo<span class="token punctuation">.</span><span class="token function">disconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</li>
</ol>
<h2 id="_10-存储相关indexeddb" tabindex="-1"><a class="header-anchor" href="#_10-存储相关indexeddb" aria-hidden="true">#</a> 10.存储相关IndexedDB</h2>
<p>indexedDB有什么用？解决了什么问题？<strong>虽然 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API" target="_blank" rel="noopener noreferrer">Web Storage<ExternalLinkIcon/></a> 在存储较少量的数据很有用，但对于存储更大量的结构化数据来说力不从心。IndexedDB 的主要设计目标之一就是允许大量数据可以被存储以供离线使用。可以在客户端存储大量的结构化数据（也包括文件/二进制大型对象（blobs））。该 API 使用索引实现对数据的高性能搜索。</strong></p>
<p>什么是IndexedDB？<strong>IndexedDB 是一个基于 JavaScript 的面向对象数据库。</strong></p>
<p>有什么特点？<strong>接口是异步的且支持事务（要么全部成功 要么全部失败）</strong></p>
<p>使用IndexedDB我们需要了解一些前置知识：</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>1.存储限制</p>
</div>
<p>浏览器的最大存储空间是动态的——它取决于您的硬盘大小。</p>
<p><strong>全局限制</strong>为可用磁盘空间的 50％。在 Firefox 中，一个名为 Quota Manager 的内部浏览器工具会跟踪每个源用尽的磁盘空间，并在必要时删除数据。</p>
<p>因此，如果您的硬盘驱动器是 500GB，那么浏览器的总存储容量为 250GB。如果超过此范围，则会发起称为<strong>源回收</strong>的过程，删除整个源的数据，直到存储量再次低于限制。删除源数据没有只删一部分的说法——因为这样可能会导致不一致的问题。</p>
<p>还有另一个限制称为<strong>组限制</strong>——这被定义为全局限制的 20％，但它至少有 10 MB，最大为 2GB。每个源都是一组（源组）的一部分。每个 eTLD+1 域都有一个组。例如：</p>
<ul>
<li><code v-pre>mozilla.org</code>——组 1，源 1</li>
<li><code v-pre>www.mozilla.org</code>——组 1，源 2</li>
<li><code v-pre>joe.blogs.mozilla.org</code>——组 1，源 3</li>
<li><code v-pre>firefox.com</code> ——组 2，源 4</li>
</ul>
<p>在这个组中，<code v-pre>mozilla.org</code>、<code v-pre>www.mozilla.org</code>和<code v-pre>joe.blogs.mozilla.org</code>可以聚合使用最多 20％的全局限制。firefox.com 单独最多使用 20％。</p>
<p><strong>解释以下组限制</strong>：组限制实际上是对同一个域名下的多个源的存储空间进行限制，以避免其中一个源占用过多的存储空间影响其他源的正常使用。而源限制则是对每个单独的源的存储空间进行限制，以避免该源占用过多的存储空间影响自身的使用和其他源的使用。</p>
<h3 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用" aria-hidden="true">#</a> 如何使用</h3>
<ol>
<li>
<p>兼容性判断</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>window<span class="token punctuation">.</span>indexedDB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    window<span class="token punctuation">.</span><span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>打开数据库,并创建一个对象仓库。（当你创建一个新的数据库或者增加已存在的数据库的版本号， <code v-pre>onupgradeneeded</code> 事件会被触发，<a href="https://developer.mozilla.org/en-US/docs/Web/API/IDBVersionChangeEvent" target="_blank" rel="noopener noreferrer">IDBVersionChangeEvent <ExternalLinkIcon/></a> 对象会作为参数传递给绑定在 <code v-pre>db </code>上的<code v-pre>onversionchange</code> 事件处理函数，你应该在此创建该版本需要的对象仓库）</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">//该 open 方法接受第二个参数，就是数据库的版本号。数据库的版本决定了数据库架构，即数据库的对象仓库（object store）和他的结构。如果数据库不存在，open 操作会创建该数据库，然后 onupgradeneeded 事件被触发，你需要在该事件的处理函数中创建数据库模式。如果数据库已经存在，但你指定了一个更高的数据库版本，会直接触发 onupgradeneeded 事件，允许你在处理函数中更新数据库模式。</span>
<span class="token comment">// 打开我们的数据库open 函数的结果是一个 IDBDatabase 对象的实例 。</span>
<span class="token keyword">const</span> request <span class="token operator">=</span> window<span class="token punctuation">.</span>indexedDB<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">"MyTestDatabase"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//open 请求不会立即打开数据库或者开始一个事务。对 open() 函数的调用会返回一个我们可以作为事件来处理的包含 result（成功的话）或者错误值的 IDBOpenDBRequest  对象。在 IndexedDB 中的大部分异步方法做的都是同样的事情 - 返回一个包含 result 或错误的 IDBRequest (en-US) 对象。</span>


<span class="token comment">// 该事件仅在较新的浏览器中实现了</span>
request<span class="token punctuation">.</span><span class="token function-variable function">onupgradeneeded</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 保存 IDBDataBase 接口</span>
  <span class="token keyword">const</span> db <span class="token operator">=</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">;</span>

  <span class="token comment">// 为该数据库创建一个对象仓库</span>
  <span class="token keyword">const</span> objectStore <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">createObjectStore</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">keyPath</span><span class="token operator">:</span> <span class="token string">"myKey"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尝试创建一个与已存在的对象仓库重名（或删除一个不存在的对象仓库）会抛出错误。如果 <code v-pre>onupgradeneeded</code>事件成功执行完成，打开数据库请求的 <code v-pre>onsuccess</code> 处理函数会被触发。</p>
</li>
<li>
<p>添加成功和失败处理函数</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>db<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Do something with request.errorCode!</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
request<span class="token punctuation">.</span><span class="token function-variable function">onsuccess</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            db <span class="token operator">=</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">;</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>db<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>启动一个事务，并发送一个请求来执行一些数据库操作，像增加或提取数据等。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> db <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token keyword">const</span> request <span class="token operator">=</span> indexedDB<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span>dbName<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
request<span class="token punctuation">.</span><span class="token function-variable function">onupgradeneeded</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    db <span class="token operator">=</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">;</span>
    <span class="token keyword">var</span> objectStore <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">createObjectStore</span><span class="token punctuation">(</span><span class="token string">"customers"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">keyPath</span><span class="token operator">:</span> <span class="token string">"custom_info"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<p>简单的例子</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>        <span class="token keyword">const</span> dbName <span class="token operator">=</span> <span class="token string">"my_test_db"</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> request <span class="token operator">=</span> indexedDB<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span>dbName<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> db <span class="token operator">=</span> <span class="token keyword">null</span>
        request<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 错误处理</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>

        request<span class="token punctuation">.</span><span class="token function-variable function">onupgradeneeded</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            db <span class="token operator">=</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">;</span>
            <span class="token comment">// 建立一个对象仓库来存储我们客户的相关信息，我们选择 custom_info 作为键路径（key path）</span>
            <span class="token comment">// 因为 ssn 可以保证是不重复的</span>
            <span class="token keyword">var</span> objectStore <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">createObjectStore</span><span class="token punctuation">(</span><span class="token string">"customers"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">keyPath</span><span class="token operator">:</span> <span class="token string">"custom_info"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 建立一个索引来通过姓名来搜索客户。名字可能会重复，所以我们不能使用 unique 索引</span>
            objectStore<span class="token punctuation">.</span><span class="token function">createIndex</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">unique</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 使用邮箱建立索引，我们向确保客户的邮箱不会重复，所以我们使用 unique 索引</span>
            objectStore<span class="token punctuation">.</span><span class="token function">createIndex</span><span class="token punctuation">(</span><span class="token string">"email"</span><span class="token punctuation">,</span> <span class="token string">"email"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">unique</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 使用事务的 oncomplete 事件确保在插入数据前对象仓库已经创建完毕</span>
            objectStore<span class="token punctuation">.</span>transaction<span class="token punctuation">.</span><span class="token function-variable function">oncomplete</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 将数据保存到新创建的对象仓库</span>
                <span class="token keyword">const</span> customerObjectStore <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">transaction</span><span class="token punctuation">(</span><span class="token string">"customers"</span><span class="token punctuation">,</span> <span class="token string">"readwrite"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">objectStore</span><span class="token punctuation">(</span><span class="token string">"customers"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                customerData<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">customer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    customerObjectStore<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>customer<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p><code v-pre>onupgradeneeded</code> 是我们唯一可以修改数据库结构的地方。在这里面，我们可以创建和删除对象存储空间以及构建和删除索引。但是该方法只有创建新的数据库和更新版本时才会调用。如果我们操作已存在的数据库需要在<code v-pre>onsuccess</code>事件中取<code v-pre>e.target.result</code></p>
</div>
<h3 id="实例方法" tabindex="-1"><a class="header-anchor" href="#实例方法" aria-hidden="true">#</a> 实例方法</h3>
<h4 id="createobjectstore" tabindex="-1"><a class="header-anchor" href="#createobjectstore" aria-hidden="true">#</a> createObjectStore</h4>
<p>该方法相当于创建了一张表。该方法创建并返回一个新的ObjectStore</p>
<blockquote>
<h6 id="参数" tabindex="-1"><a class="header-anchor" href="#参数" aria-hidden="true">#</a> 参数</h6>
</blockquote>
<ol>
<li>
<p>name</p>
<p>被创建的 object store 的名称。name可以是空。这个name可以理解为表名</p>
</li>
<li>
<p>optionalParameters（可选）</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>optionalParameters <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">//指定对象仓库中每个对象的主键（primary key）的名称或路径，类型为字符串或字符串数组。如果不指定，则使用自增长的整数作为主键。。</span>
    keyPath<span class="token operator">:</span><span class="token keyword">undefined</span> <span class="token operator">|</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token comment">//指定是否使用自增长的整数作为主键。如果为 true，则表示使用自增长的整数作为主键，如果为 false，则表示不使用自增长的整数作为主键。默认为 false。</span>
    autoIncrement<span class="token operator">:</span><span class="token builtin">boolean</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>返回值</p>
<p>新创建的 object store 对象。表实例对象</p>
</li>
</ol>
<h4 id="deleteobjectstore" tabindex="-1"><a class="header-anchor" href="#deleteobjectstore" aria-hidden="true">#</a> deleteObjectStore</h4>
<p><strong><code v-pre>eleteObjectStore()</code></strong> 方法从 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IDBDatabase" target="_blank" rel="noopener noreferrer"><code v-pre>IDBDatabase</code><ExternalLinkIcon/></a> 中销毁指定名称的对象存储，及这个对象存储所包含的任何索引。</p>
<p>参数 name</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> dbName <span class="token operator">=</span> <span class="token string">"sampleDB"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> dbVersion <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> request <span class="token operator">=</span> indexedDB<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span>dbName<span class="token punctuation">,</span> dbVersion<span class="token punctuation">)</span><span class="token punctuation">;</span>

request<span class="token punctuation">.</span><span class="token function-variable function">onupgradeneeded</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> db <span class="token operator">=</span> request<span class="token punctuation">.</span>result<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>oldVersion <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    db<span class="token punctuation">.</span><span class="token function">createObjectStore</span><span class="token punctuation">(</span><span class="token string">"store1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>oldVersion <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    db<span class="token punctuation">.</span><span class="token function">deleteObjectStore</span><span class="token punctuation">(</span><span class="token string">"store1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    db<span class="token punctuation">.</span><span class="token function">createObjectStore</span><span class="token punctuation">(</span><span class="token string">"store2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="transaction" tabindex="-1"><a class="header-anchor" href="#transaction" aria-hidden="true">#</a> transaction</h4>
<p>该方法返回一个事务对象，通过该对象我们可以进行增删改查,事务提供了三种模式：<code v-pre>readonly</code>、<code v-pre>readwrite</code> 和 <code v-pre>versionchange</code>。</p>
<blockquote>
<h6 id="参数-1" tabindex="-1"><a class="header-anchor" href="#参数-1" aria-hidden="true">#</a> 参数</h6>
<p>1.<code v-pre>storeNames：string | string[]</code></p>
<p>2.<code v-pre>mode?:'readonly'|'readwrite'|'readwriteflush'</code> 默认只读</p>
<p>3.<code v-pre>durability?:'default'|'strict'|'relaxed'</code>默认default</p>
<p>durability 提倡用relaxed对于临时数据  strict更重视数据安全的情况下使用</p>
</blockquote>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>
        <span class="token keyword">const</span> dbName <span class="token operator">=</span> <span class="token string">"my_test_db"</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> request <span class="token operator">=</span> indexedDB<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span>dbName<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> db <span class="token operator">=</span> <span class="token keyword">null</span>
        request<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 错误处理</span>
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        request<span class="token punctuation">.</span><span class="token function-variable function">onupgradeneeded</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            db <span class="token operator">=</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">;</span>
            <span class="token comment">// 建立一个对象仓库来存储我们客户的相关信息，我们选择 custom_info 作为键路径（key path）</span>
            <span class="token comment">// 因为 ssn 可以保证是不重复的</span>
            <span class="token keyword">var</span> objectStore <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">createObjectStore</span><span class="token punctuation">(</span><span class="token string">"customers"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> keyPath<span class="token operator">:</span> <span class="token string">"custom_info"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 建立一个索引来通过姓名来搜索客户。名字可能会重复，所以我们不能使用 unique 索引</span>
            objectStore<span class="token punctuation">.</span><span class="token function">createIndex</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> unique<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            objectStore<span class="token punctuation">.</span><span class="token function">createIndex</span><span class="token punctuation">(</span><span class="token string">"email"</span><span class="token punctuation">,</span> <span class="token string">"email"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> unique<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">const</span> transaction <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">transaction</span><span class="token punctuation">(</span><span class="token string">'customers'</span><span class="token punctuation">)</span>
            <span class="token keyword">const</span> transactions <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">transaction</span><span class="token punctuation">(</span>db<span class="token punctuation">.</span>objectStoreNames<span class="token punctuation">)</span>
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>transaction<span class="token punctuation">)</span>

        <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="增-删-改-查" tabindex="-1"><a class="header-anchor" href="#增-删-改-查" aria-hidden="true">#</a> 增 删 改 查</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>
    <span class="token operator">&lt;</span>script<span class="token operator">></span>
        <span class="token keyword">const</span> dbName <span class="token operator">=</span> <span class="token string">"my_test_db"</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> request <span class="token operator">=</span> indexedDB<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span>dbName<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> db <span class="token operator">=</span> <span class="token keyword">null</span>
        request<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 错误处理</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>

        request<span class="token punctuation">.</span><span class="token function-variable function">onsuccess</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            db <span class="token operator">=</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">;</span>
            <span class="token comment">// 对象仓库  </span>
            <span class="token keyword">const</span> customers_store <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">transaction</span><span class="token punctuation">(</span><span class="token string">'customers'</span><span class="token punctuation">,</span> <span class="token string">'readwrite'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">objectStore</span><span class="token punctuation">(</span><span class="token string">"customers"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 查数据</span>
            <span class="token keyword">const</span> get_res <span class="token operator">=</span> customers_store<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
            get_res<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 错误处理！</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'出错了'</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">;</span>
            get_res<span class="token punctuation">.</span><span class="token function-variable function">onsuccess</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 对 request.result 做些操作！</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>get_res<span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">;</span>
            <span class="token comment">// // 插入数据</span>
            <span class="token comment">// const add_res = customers_store.add({ email: 'xxxx@qq.com', age: 26, name: 'fancy' });</span>

            <span class="token comment">// add_res.onerror = function (event) {</span>
            <span class="token comment">//     // 错误处理！</span>
            <span class="token comment">//     console.log('出错了', event)</span>
            <span class="token comment">// };</span>
            <span class="token comment">// add_res.onsuccess = function (event) {</span>
            <span class="token comment">//     // 对 request.result 做些操作！</span>
            <span class="token comment">//     console.log(add_res.result);</span>
            <span class="token comment">// };</span>

            <span class="token comment">// 修改数据</span>
            <span class="token comment">// const put_res = customers_store.put({</span>
            <span class="token comment">//     user_id: 1,</span>
            <span class="token comment">//     email: '1074121761.163.com'</span>
            <span class="token comment">// })</span>
            <span class="token comment">// put_res.onerror = function (event) {</span>
            <span class="token comment">//     // 错误处理！</span>
            <span class="token comment">//     console.log('出错了')</span>
            <span class="token comment">// };</span>
            <span class="token comment">// put_res.onsuccess = function (event) {</span>
            <span class="token comment">//     // 对 request.result 做些操作！</span>
            <span class="token comment">//     console.log(put_res.result);</span>
            <span class="token comment">// };</span>
            <span class="token comment">// 删除数据</span>
            <span class="token comment">// const delete_res = customers_store.delete(1)</span>
            <span class="token comment">// delete_res.onerror = function (event) {</span>
            <span class="token comment">//     // 错误处理！</span>
            <span class="token comment">//     console.log('出错了')</span>
            <span class="token comment">// };</span>
            <span class="token comment">// delete_res.onsuccess = function (event) {</span>
            <span class="token comment">//     // 对 request.result 做些操作！</span>
            <span class="token comment">//     console.log(delete_res.result);</span>
            <span class="token comment">// };</span>

            <span class="token comment">// 在所有数据添加完毕后的处理</span>
            customers_store<span class="token punctuation">.</span><span class="token function-variable function">oncomplete</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// alert("All done!");</span>
            <span class="token punctuation">}</span><span class="token punctuation">;</span>
            customers_store<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 不要忘记错误处理！</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'事务错误'</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="add" tabindex="-1"><a class="header-anchor" href="#add" aria-hidden="true">#</a> add</h4>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>add() 方法的调用时，对象仓库中不能存在相同键的对象。如果你想修改一个已存在的条目，或者你不关心该数据是否已存在，你可以使用 put() 方法</p>
</div>
<h4 id="put" tabindex="-1"><a class="header-anchor" href="#put" aria-hidden="true">#</a> put</h4>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> objectStore <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">transaction</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">"customers"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">"readwrite"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">objectStore</span><span class="token punctuation">(</span><span class="token string">"customers"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> request <span class="token operator">=</span> objectStore<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
request<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 错误处理</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
request<span class="token punctuation">.</span><span class="token function-variable function">onsuccess</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 获取我们想要更新的数据</span>
  <span class="token keyword">var</span> data <span class="token operator">=</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">;</span>

  <span class="token comment">// 更新你想修改的数据</span>
  data<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>

  <span class="token comment">// 把更新过的对象放回数据库</span>
  <span class="token keyword">var</span> requestUpdate <span class="token operator">=</span> objectStore<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
   requestUpdate<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token comment">// 错误处理</span>
   <span class="token punctuation">}</span><span class="token punctuation">;</span>
   requestUpdate<span class="token punctuation">.</span><span class="token function-variable function">onsuccess</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token comment">// 完成，数据已更新！</span>
   <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="delete" tabindex="-1"><a class="header-anchor" href="#delete" aria-hidden="true">#</a> delete</h4>
<h4 id="get" tabindex="-1"><a class="header-anchor" href="#get" aria-hidden="true">#</a> get</h4>
<p>这里只用到一个对象仓库，你可以只传该对象仓库的名字作为参数，而不必传一个列表。并且，你只需读取数据，所以不需要 <code v-pre>readwrite</code> 事务。不指定事务模式来调用 <code v-pre>transaction</code> 你会得到一个 <code v-pre>readonly</code> 事务。另外一个微妙的地方在于你并没有保存请求对象到变量中。因为 DOM 事件把请求作为他的目标（target），你可以使用该事件来获取 <code v-pre>result</code> 属性。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>db<span class="token punctuation">.</span><span class="token function">transaction</span><span class="token punctuation">(</span><span class="token string">"customers"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">objectStore</span><span class="token punctuation">(</span><span class="token string">"customers"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"余瑞"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function-variable function">onsuccess</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"Name for SSN 444-44-4444 is "</span> <span class="token operator">+</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="getall" tabindex="-1"><a class="header-anchor" href="#getall" aria-hidden="true">#</a> getAll</h4>
<p>这个getALL方式和上面的游标查询结果相同。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>objectStore<span class="token punctuation">.</span><span class="token function">getAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function-variable function">onsuccess</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"Got all customers: "</span> <span class="token operator">+</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="getallkeys" tabindex="-1"><a class="header-anchor" href="#getallkeys" aria-hidden="true">#</a> getAllKeys</h4>
<p>检索对象存储中与指定参数匹配的所有对象的记录键。如果没给参数则给出所有对象的记录键。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">getAllKeys</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">getAllKeys</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span>
<span class="token function">getAllKeys</span><span class="token punctuation">(</span>query<span class="token punctuation">,</span> count<span class="token punctuation">)</span>



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table>
<thead>
<tr>
<th style="text-align:left">名称</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">query</td>
<td style="text-align:left">要查询的键或IDBKeyRange。如果不传递任何信息，则默认为选择此对象存储中的所有记录的键范围。</td>
</tr>
<tr>
<td style="text-align:left">count</td>
<td style="text-align:left">指定如果找到多个值要返回的值的数量。如果它小于0或大于2^32 - 1，则会抛出TypeError异常。</td>
</tr>
</tbody>
</table>
<h4 id="使用索引" tabindex="-1"><a class="header-anchor" href="#使用索引" aria-hidden="true">#</a> 使用索引</h4>
<p>如果你想要通过姓名来查找一个客户，那么，你将需要在数据库中迭代所有的主键 直到你找到正确的那个。以这种方式来查找将会非常的慢，相反你可以使用索引。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 首先，确定你已经在 request.onupgradeneeded 中创建了索引：</span>
<span class="token comment">// objectStore.createIndex("name", "name");</span>
<span class="token comment">// 否则你将得到 DOMException。</span>
<span class="token keyword">var</span> index <span class="token operator">=</span> objectStore<span class="token punctuation">.</span><span class="token function">index</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

index<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"Donna"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function-variable function">onsuccess</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"Donna's SSN is "</span> <span class="token operator">+</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">.</span>ssn<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用游标" tabindex="-1"><a class="header-anchor" href="#使用游标" aria-hidden="true">#</a> 使用游标</h4>
<p>使用 <code v-pre>get()</code> 要求你知道你想要检索哪一个键。如果你想要遍历对象存储空间中的所有值，那么你可以使用游标。看起来会像下面这样：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> objectStore <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">transaction</span><span class="token punctuation">(</span><span class="token string">"customers"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">objectStore</span><span class="token punctuation">(</span><span class="token string">"customers"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

objectStore<span class="token punctuation">.</span><span class="token function">openCursor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function-variable function">onsuccess</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> cursor <span class="token operator">=</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>cursor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Name for SSN "</span> <span class="token operator">+</span> cursor<span class="token punctuation">.</span>key <span class="token operator">+</span> <span class="token string">" is "</span> <span class="token operator">+</span> cursor<span class="token punctuation">.</span>value<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    cursor<span class="token punctuation">.</span><span class="token function">continue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'遍历完毕'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>openCursor()</code> 函数需要几个参数。首先，你可以使用一个 key range 对象来限制被检索的项目的范围。第二，你可以指定你希望进行迭代的方向。在上面的示例中，我们在以升序迭代所有的对象。游标成功的回调有点特别。游标对象本身是请求的 <code v-pre>result</code> （上面我们使用的是简写形式，所以是 <code v-pre>event.target.result</code>）。然后实际的 key 和 value 可以根据游标对象的 <code v-pre>key</code> 和 <code v-pre>value</code> 属性被找到。如果你想要保持继续前行，那么你必须调用游标上的 <code v-pre>continue()</code> 。当你已经到达数据的末尾时（或者没有匹配 <code v-pre>openCursor()</code> 请求的条目）你仍然会得到一个成功回调，但是 <code v-pre>result</code> 属性是 <code v-pre>undefined</code>。</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>查看游标的 <code v-pre>value</code> 属性会带来性能消耗，因为对象是被懒生成的。</p>
</div>
<p>如果你需要访问带有给定 <code v-pre>name</code> 的所有的记录你可以使用一个游标。你可以在索引上打开两个不同类型的游标。一个常规游标映射索引属性到对象存储空间中的对象。一个键索引映射索引属性到用来存储对象存储空间中的对象的键。不同之处被展示如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>index<span class="token punctuation">.</span><span class="token function">openCursor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function-variable function">onsuccess</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> cursor <span class="token operator">=</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>cursor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// cursor.key 是一个 name，就像 "Bill", 然后 cursor.value 是整个对象。</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"Name: "</span> <span class="token operator">+</span> cursor<span class="token punctuation">.</span>key <span class="token operator">+</span> <span class="token string">", SSN: "</span> <span class="token operator">+</span> cursor<span class="token punctuation">.</span>value<span class="token punctuation">.</span>ssn <span class="token operator">+</span> <span class="token string">", email: "</span> <span class="token operator">+</span> cursor<span class="token punctuation">.</span>value<span class="token punctuation">.</span>email<span class="token punctuation">)</span><span class="token punctuation">;</span>
    cursor<span class="token punctuation">.</span><span class="token function">continue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

index<span class="token punctuation">.</span><span class="token function">openKeyCursor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function-variable function">onsuccess</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> cursor <span class="token operator">=</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>cursor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// cursor.key 是一个 name，就像 "Bill", 然后 cursor.value 是那个 SSN。</span>
    <span class="token comment">// 没有办法可以得到存储对象的其余部分。</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"Name: "</span> <span class="token operator">+</span> cursor<span class="token punctuation">.</span>key <span class="token operator">+</span> <span class="token string">", SSN: "</span> <span class="token operator">+</span> cursor<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    cursor<span class="token punctuation">.</span><span class="token function">continue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>指定游标的范围和方向：</p>
<p>如果你想要限定你在游标中看到的值的范围，你可以使用一个 key range 对象然后把它作为第一个参数传给 <code v-pre>openCursor()</code> 或是 <code v-pre>openKeyCursor()</code>。你可以构造一个只允许一个单一 key 的 key range，或者一个具有下限或上限，或者一个既有上限也有下限。边界可以是“闭合的”（也就是说 key range 包含给定的值）或者是“开放的”（也就是说 key range 不包括给定的值）。这里是它如何工作的：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 仅匹配 "Donna"</span>
<span class="token keyword">var</span> singleKeyRange <span class="token operator">=</span> IDBKeyRange<span class="token punctuation">.</span><span class="token function">only</span><span class="token punctuation">(</span><span class="token string">"Donna"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 匹配所有超过“Bill”的，包括“Bill”</span>
<span class="token keyword">var</span> lowerBoundKeyRange <span class="token operator">=</span> IDBKeyRange<span class="token punctuation">.</span><span class="token function">lowerBound</span><span class="token punctuation">(</span><span class="token string">"Bill"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 匹配所有超过“Bill”的，但不包括“Bill”</span>
<span class="token keyword">var</span> lowerBoundOpenKeyRange <span class="token operator">=</span> IDBKeyRange<span class="token punctuation">.</span><span class="token function">lowerBound</span><span class="token punctuation">(</span><span class="token string">"Bill"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 匹配所有不超过“Donna”的，但不包括“Donna”</span>
<span class="token keyword">var</span> upperBoundOpenKeyRange <span class="token operator">=</span> IDBKeyRange<span class="token punctuation">.</span><span class="token function">upperBound</span><span class="token punctuation">(</span><span class="token string">"Donna"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 匹配所有在“Bill”和“Donna”之间的，但不包括“Donna”</span>
<span class="token keyword">var</span> boundKeyRange <span class="token operator">=</span> IDBKeyRange<span class="token punctuation">.</span><span class="token function">bound</span><span class="token punctuation">(</span><span class="token string">"Bill"</span><span class="token punctuation">,</span> <span class="token string">"Donna"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 使用其中的一个键范围，把它作为 openCursor()/openKeyCursor 的第一个参数</span>
<span class="token comment">//切换方向是通过传递 prev 到 openCursor(boundKeyRange,'prev') 方法来实现的：如果你只是想改变遍历的方向，而不想对结果进行筛选，你只需要给第一个参数传入 null。</span>
index<span class="token punctuation">.</span><span class="token function">openCursor</span><span class="token punctuation">(</span>boundKeyRange<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function-variable function">onsuccess</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> cursor <span class="token operator">=</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>cursor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 当匹配时进行一些操作</span>
    cursor<span class="token punctuation">.</span><span class="token function">continue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>去重</strong>如果你想要在游标在索引迭代过程中过滤出重复的，你可以传递 <code v-pre>nextunique</code> （或 <code v-pre>prevunique</code> 如果你正在向后寻找）作为方向参数。当 <code v-pre>nextunique</code> 或是 <code v-pre>prevunique</code> 被使用时，被返回的那个总是键最小的记录。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>index<span class="token punctuation">.</span><span class="token function">openKeyCursor</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> IDBCursor<span class="token punctuation">.</span>nextunique<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function-variable function">onsuccess</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> cursor <span class="token operator">=</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>cursor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Do something with the entries.</span>
    cursor<span class="token punctuation">.</span><span class="token function">continue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="—元素-样式相关apis—" tabindex="-1"><a class="header-anchor" href="#—元素-样式相关apis—" aria-hidden="true">#</a> —元素/样式相关APIs—</h2>
<h3 id="_1-getcomputedstyle" tabindex="-1"><a class="header-anchor" href="#_1-getcomputedstyle" aria-hidden="true">#</a> 1.getComputedStyle</h3>
<p><code v-pre>Window.getComputedStyle()</code>方法返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有 CSS 属性的值。私有的 CSS 属性值可以通过对象提供的 API 或通过简单地使用 CSS 属性名称进行索引来访问。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>element
用于获取计算样式的Element。

pseudoElt 可选
指定一个要匹配的伪元素的字符串。必须对普通元素省略（或<span class="token keyword">null</span>）。
<span class="token keyword">let</span> style <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">getComputedStyle</span><span class="token punctuation">(</span>element<span class="token punctuation">,</span> <span class="token punctuation">[</span>pseudoElt<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
返回的style是一个实时的 CSSStyleDeclaration 对象，当元素的样式更改时，它会自动更新本身。

 <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">getComputedStyle</span><span class="token punctuation">(</span>h3<span class="token punctuation">,</span> <span class="token string">'::after'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>content<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p><strong>返回的对象与从元素的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/style" target="_blank" rel="noopener noreferrer"><code v-pre>style</code><ExternalLinkIcon/></a> 属性返回的对象具有相同的类型;然而，两个对象具有不同的目的。从<code v-pre>getComputedStyle</code>返回的对象是只读的，可以用于检查元素的样式（包括由一个<code v-pre>&lt;style&gt;</code>元素或一个外部样式表设置的那些样式）。<code v-pre>elt.style</code>对象应用于在特定元素上设置样式。</strong></p>
</div>
<h3 id="_2-animate" tabindex="-1"><a class="header-anchor" href="#_2-animate" aria-hidden="true">#</a> 2.animate</h3>
<p><code v-pre>Element</code>接口的 <strong><code v-pre>animate()</code></strong> 方法是创建一个新的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Animation" target="_blank" rel="noopener noreferrer"><code v-pre>Animation</code><ExternalLinkIcon/></a> 的便捷方法，将它应用于元素，然后运行动画。它将返回一个新建的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Animation" target="_blank" rel="noopener noreferrer"><code v-pre>Animation</code><ExternalLinkIcon/></a> 对象实例</p>
<p><strong>①使用方式</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>某元素<span class="token punctuation">.</span><span class="token function">animate</span><span class="token punctuation">(</span>keyframes<span class="token punctuation">,</span>options<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>②参数</strong></p>
<p><code v-pre>1.keyframes</code>一个由多个关键帧的属性和值组成的对象所构成的<code v-pre>数组</code>。这是<a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/getKeyframes" target="_blank" rel="noopener noreferrer"><code v-pre>getKeyframes()</code> (en-US)<ExternalLinkIcon/></a>方法返回的规范格式。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>keyframes<span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> object
element<span class="token punctuation">.</span><span class="token function">animate</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token comment">// from</span>
    opacity<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    color<span class="token operator">:</span> <span class="token string">"#fff"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token comment">// to</span>
    opacity<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    color<span class="token operator">:</span> <span class="token string">"#000"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
element<span class="token punctuation">.</span><span class="token function">animate</span><span class="token punctuation">(</span><span class="token punctuation">[</span> <span class="token punctuation">{</span> opacity<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
                  <span class="token punctuation">{</span> opacity<span class="token operator">:</span> <span class="token number">0.1</span><span class="token punctuation">,</span> offset<span class="token operator">:</span> <span class="token number">0.7</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
                  <span class="token punctuation">{</span> opacity<span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token comment">//offset 的值必须是在 [0.0, 1.0] 这个区间内，且须升序排列。</span>
 <span class="token comment">//并非所有的关键帧都需要设置 offset。没有指定 offset 的关键帧将与相邻的关键帧均匀间隔。 可以通过提供easing过渡来给指定关键帧之间应用过渡效果，如下所示</span>
element<span class="token punctuation">.</span><span class="token function">animate</span><span class="token punctuation">(</span><span class="token punctuation">[</span> <span class="token punctuation">{</span> opacity<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> easing<span class="token operator">:</span> <span class="token string">'ease-out'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
                  <span class="token punctuation">{</span> opacity<span class="token operator">:</span> <span class="token number">0.1</span><span class="token punctuation">,</span> easing<span class="token operator">:</span> <span class="token string">'ease-in'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
                  <span class="token punctuation">{</span> opacity<span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对象格式关键帧</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>element<span class="token punctuation">.</span><span class="token function">animate</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">opacity</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>          <span class="token comment">// [ from, to ]</span>
  <span class="token literal-property property">color</span><span class="token operator">:</span>   <span class="token punctuation">[</span> <span class="token string">"#fff"</span><span class="token punctuation">,</span> <span class="token string">"#000"</span> <span class="token punctuation">]</span> <span class="token comment">// [ from, to ]</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
element<span class="token punctuation">.</span><span class="token function">animate</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">opacity</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0.9</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">offset</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0.8</span> <span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// [ 0, 0.8, 1 ] 的简写</span>
  <span class="token literal-property property">easing</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token string">'ease-in'</span><span class="token punctuation">,</span> <span class="token string">'ease-out'</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>2.options</code><strong>代表动画持续时间的整数</strong>（以毫秒为单位），或者一个包含一个或多个时间属性（在 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/KeyframeEffect/KeyframeEffect#%E5%8F%82%E6%95%B0" target="_blank" rel="noopener noreferrer"><code v-pre>KeyframeEffect()</code> options 参数<ExternalLinkIcon/></a>和下方列出）的对象：.</p>
<p><code v-pre>3.id</code> 可选在 <code v-pre>animate()</code> 里可作为唯一标识的属性：一个用来引用动画的字符串。</p>
<p>示例</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>  test<span class="token punctuation">.</span>value<span class="token punctuation">.</span><span class="token function">animate</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">transform</span><span class="token operator">:</span> <span class="token string">'rotate(0) scale(1)'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">transform</span><span class="token operator">:</span> <span class="token string">'rotate(360deg) scale(0)'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">easing</span><span class="token operator">:</span> <span class="token string">'steps(7, end)'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">direction</span><span class="token operator">:</span> <span class="token string">"reverse"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">duration</span><span class="token operator">:</span> <span class="token number">2000</span><span class="token punctuation">,</span>
  <span class="token literal-property property">playbackRate</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">iterations</span><span class="token operator">:</span> <span class="token number">Infinity</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="/javaScript/animate1.gif" alt=""></p>
<h2 id="事件api" tabindex="-1"><a class="header-anchor" href="#事件api" aria-hidden="true">#</a> 事件Api</h2>
<h3 id="event" tabindex="-1"><a class="header-anchor" href="#event" aria-hidden="true">#</a> Event</h3>
<p>接口表示在 DOM 中出现的事件。我们可以通过<code v-pre>Event</code>创建并返回一个 <code v-pre>Event</code> 对象。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">IEventinit</span><span class="token punctuation">{</span>
    bubbles<span class="token operator">?</span><span class="token operator">:</span><span class="token builtin">boolean</span>  默认<span class="token boolean">false</span>表示该事件是否冒泡。
    cancelable<span class="token operator">?</span><span class="token operator">:</span><span class="token builtin">boolean</span> 默认值为 <span class="token boolean">false</span>，表示该事件能否被取消。
    composed<span class="token operator">?</span><span class="token operator">:</span><span class="token builtin">boolean</span> 默认值为 <span class="token boolean">false</span>，指示事件是否会在影子 <span class="token constant">DOM</span> 根节点之外触发侦听器。
<span class="token punctuation">}</span>

<span class="token keyword">const</span> my_event <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Event</span><span class="token punctuation">(</span>typeArg<span class="token operator">:</span><span class="token string">'string'</span><span class="token punctuation">,</span>eventinit<span class="token operator">:</span>IEventinit<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>①创建一个事件</strong></p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> ev <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Event</span><span class="token punctuation">(</span><span class="token string">'my_event'</span><span class="token punctuation">)</span>
<span class="token comment">// 事件可以在任何元素触发</span>
document<span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span>ev<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="实例属性" tabindex="-1"><a class="header-anchor" href="#实例属性" aria-hidden="true">#</a> 实例属性</h4>
<p><code v-pre>1.bubbles</code> 返回一个布尔值，表明当前事件是否会向 DOM 树上层元素冒泡。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> bool <span class="token operator">=</span> event<span class="token punctuation">.</span>bubbles<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>2.cancelable</code>表明该事件是否可以被取消，即事件是否可以像从未发生一样被阻止</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>event<span class="token punctuation">.</span>cancelbale 
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> event<span class="token punctuation">.</span>cancelable <span class="token operator">!==</span> <span class="token string">'boolean'</span> <span class="token operator">||</span> event<span class="token punctuation">.</span>cancelable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>3.composed</code>用来指示该事件是否可以从 Shadow DOM 传递到一般的 DOM。如果返回的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean" target="_blank" rel="noopener noreferrer"><code v-pre>Boolean</code><ExternalLinkIcon/></a> 值为 <code v-pre>true</code>，表明当事件到达 shadow DOM 的根节点（也就是 shadow DOM 中事件开始传播的第一个节点）时，事件可以从 shadow DOM 传递到一般 DOM。当然，事件要具有可传播性，即该事件的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Event/bubbles" target="_blank" rel="noopener noreferrer"><code v-pre>bubbles</code><ExternalLinkIcon/></a> 属性必须为 <code v-pre>true</code>。你也可以通过调用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Event/composedPath" target="_blank" rel="noopener noreferrer"><code v-pre>composedPath()</code><ExternalLinkIcon/></a> 来查看事件从 shadow DOM 传播到普通 DOM 的路径。</p>
<p><code v-pre>4.currentTarget</code>只读属性 <strong><code v-pre>currentTarget</code></strong> 表示的，标识是当事件沿着 DOM 触发时事件的当前目标。它总是指向事件绑定的元素，而 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Event/target" target="_blank" rel="noopener noreferrer"><code v-pre>Event.target</code><ExternalLinkIcon/></a> 则是事件触发的元素。</p>
<p><code v-pre>5.defaultPrevented</code>返回一个布尔值，表明当前事件是否调用了 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault" target="_blank" rel="noopener noreferrer"><code v-pre>event.preventDefault()</code><ExternalLinkIcon/></a>方法。</p>
<p><code v-pre>6.isTrusted</code>是一个只读属性，它是一个布尔值（<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean" target="_blank" rel="noopener noreferrer"><code v-pre>Boolean</code><ExternalLinkIcon/></a>）。当事件是由用户行为生成的时候，这个属性的值为 <code v-pre>true</code> ，而当事件是由脚本创建、修改、通过 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent" target="_blank" rel="noopener noreferrer"><code v-pre>EventTarget.dispatchEvent()</code><ExternalLinkIcon/></a> 派发的时候，这个属性的值为 <code v-pre>false</code> 。</p>
<p><code v-pre>7.eventPhase</code>表示事件流当前处于哪一个阶段,<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Event/eventPhase#%E4%BA%8B%E4%BB%B6%E9%98%B6%E6%AE%B5%E5%B8%B8%E9%87%8F" target="_blank" rel="noopener noreferrer">事件阶段常量<ExternalLinkIcon/></a>.列出了不同的执行阶段</p>
<h2 id="网络监控api" tabindex="-1"><a class="header-anchor" href="#网络监控api" aria-hidden="true">#</a> 网络监控API</h2>
<h3 id="_1-navigator-connection" tabindex="-1"><a class="header-anchor" href="#_1-navigator-connection" aria-hidden="true">#</a> 1.navigator.connection</h3>
<p><strong><code v-pre>Navigator.connection</code></strong> 是只读的，提供一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/NetworkInformation" target="_blank" rel="noopener noreferrer"><code v-pre>NetworkInformation</code><ExternalLinkIcon/></a> 对象来获取设备的网络连接信息。例如用户设备的当前带宽或连接是否被计量，这可以用于基于用户的连接来选择高清晰度内容或低清晰度内容。</p>
<p>返回设备正在与网络进行通信的连接类型。它将是以下值之一：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// rtt延迟     donwnlink带宽</span>
navigator<span class="token punctuation">.</span>connection
NetworkInformation <span class="token punctuation">{</span><span class="token literal-property property">onchange</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token literal-property property">effectiveType</span><span class="token operator">:</span> <span class="token string">'4g'</span><span class="token punctuation">,</span> <span class="token literal-property property">rtt</span><span class="token operator">:</span> <span class="token number">150</span><span class="token punctuation">,</span> <span class="token literal-property property">downlink</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token literal-property property">saveData</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2.navigator.online</strong></p>
<p>判断是否在线，boolean类型</p>
<p><strong>3.事件</strong></p>
<p><strong>online</strong> 和 <strong>offline</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">//在线-》离线会触发</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'offline'</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">//离线-》在线会触发</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'online'</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">//网络类型的改变</span>
navigator<span class="token punctuation">.</span>connection<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'change'</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="如何判断强网和弱网环境" tabindex="-1"><a class="header-anchor" href="#如何判断强网和弱网环境" aria-hidden="true">#</a> 如何判断强网和弱网环境？</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>navigator<span class="token punctuation">.</span>connection
<span class="token comment">//结果</span>
NetworkInformation <span class="token punctuation">{</span><span class="token literal-property property">onchange</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token literal-property property">effectiveType</span><span class="token operator">:</span> <span class="token string">'4g'</span><span class="token punctuation">,</span> <span class="token literal-property property">rtt</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">downlink</span><span class="token operator">:</span> <span class="token number">3.35</span><span class="token punctuation">,</span> <span class="token literal-property property">saveData</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">}</span>
<span class="token literal-property property">downlink</span><span class="token operator">:</span> <span class="token number">3.35</span> 
<span class="token literal-property property">effectiveType</span><span class="token operator">:</span> <span class="token string">"4g"</span>
<span class="token literal-property property">onchange</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token literal-property property">rtt</span><span class="token operator">:</span> <span class="token number">100</span>
<span class="token literal-property property">saveData</span><span class="token operator">:</span> <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>downlink</code> 当前网络连接的估计下行速度 （单位Mbps）</li>
<li><code v-pre>effectiveType</code> 速度类型与设备无关（slow-2g，2g，3g，4g）</li>
<li><code v-pre>rtt</code> 当前网络的估计往返时间</li>
<li><code v-pre>saveData</code> 是否处于数据节省模式</li>
</ul>
<h2 id="性能监控api" tabindex="-1"><a class="header-anchor" href="#性能监控api" aria-hidden="true">#</a> 性能监控API</h2>
<p>Performance API 提供了重要的内置指标，并能够将你自己的测量结果添加到浏览器的性能时间线（performance timeline）中。性能时间线使用高精度的时间戳，且可以在开发者工具中显示。</p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Performance" target="_blank" rel="noopener noreferrer">文档地址<ExternalLinkIcon/></a></p>
<p>对于前端监控来说需要采集的指标有</p>
<p><strong>RUM</strong> <strong>(Real User Monitoring) 指标</strong>，包括 FP, TTI, FCP, FMP, FID, MPFID。</p>
<p><strong>Navigation Timing</strong>，包括 DNS, TCP, DOM 解析等阶段的指标。</p>
<p><strong>JS Error</strong>，解析后可以细分为运行时异常、以及静态资源异常。</p>
<p><strong>请求状态码</strong>，采集上报后，可以分析请求异常等信息。</p>
<p>Level2的指标</p>
<p><img src="/javaScript/perform.png" alt=""></p>
<p>对于<code v-pre>performance.timing</code>指标由于精度不够将来会废弃，</p>
<h3 id="rum指标采集" tabindex="-1"><a class="header-anchor" href="#rum指标采集" aria-hidden="true">#</a> RUM指标采集</h3>
<p><strong>真实用户性能指标</strong>也就是上文有所提及的 RUM 以及平台自己扩展的一些额外的指标，包括以下指标：</p>
<ul>
<li>
<p><strong>首次绘制时间（</strong> <strong>FP</strong> <strong>）</strong> ：即 First Paint，为首次渲染的时间点。</p>
</li>
<li>
<p><strong>首次内容绘制时间（</strong> <strong>FCP</strong> <strong>）</strong> ：即 First Contentful Paint，为首次有内容渲染的时间点。</p>
</li>
<li>
<p><strong>首次有效绘制时间（</strong> <strong>FMP</strong> <strong>）</strong> ：用户启动页面加载与页面呈现首屏之间的时间。</p>
</li>
<li>
<p><strong>首次交互时间（</strong> <strong>FID</strong> <strong>）</strong> ：即 First Input Delay，记录页面加载阶段，用户首次交互操作的延时时间。FID 指标影响用户对页面交互性和响应性的第一印象。</p>
</li>
<li>
<p><strong>交互中最大延时（</strong> <strong>MPFID</strong> <strong>）</strong> ：页面加载阶段，用户交互操作可能遇到的最大延时时间。</p>
</li>
<li>
<p><strong>完全可交互时间（TTI</strong>）：即 Time to interactive，记录从页面加载开始，到页面处于完全可交互状态所花费的时间。</p>
</li>
<li>
<p><strong>首次加载</strong> <strong>跳出率</strong>：第一个页面完全加载前用户跳出率。</p>
</li>
<li>
<p><strong>慢开比</strong>：完全加载耗时超过 5s 的 PV 占比。</p>
</li>
</ul>
<h3 id="timing" tabindex="-1"><a class="header-anchor" href="#timing" aria-hidden="true">#</a> timing</h3>
<p>测量TCP握手时间(connectEnd - connectStart)</p>
<p>测量DNS查找时间(domainLookupEnd - domainLookupStart)</p>
<p>测量重定向时间(redirectEnd - redirectStart)</p>
<p>测量请求时间(responseStart - requestStart)</p>
<p>测量TLS协商时间(requestStart - secureConnectionStart)</p>
<p>测量获取时间(没有重定向)(responseEnd - fetchStart)</p>
<p>测量ServiceWorker处理时间(fetchStart - workerStart)</p>
<p>检查内容是否被压缩(decodedBodySize不应该是encodedBodySize)</p>
<p>检查本地缓存是否被命中(transferSize应该是0)</p>
<p>检查是否使用了现代和快速的协议(nextHopProtocol应该是HTTP/2或HTTP/3)</p>
<p>检查正确的资源是否被渲染阻塞(renderBlockingStatus)</p>
<h2 id="网络请求api" tabindex="-1"><a class="header-anchor" href="#网络请求api" aria-hidden="true">#</a> 网络请求API</h2>
<h3 id="_1、xmlhttprequests" tabindex="-1"><a class="header-anchor" href="#_1、xmlhttprequests" aria-hidden="true">#</a> 1、XMLHttpRequests</h3>
<p>语法-》<code v-pre>new XMLHttpRequest();</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span>objParameters<span class="token punctuation">)</span><span class="token punctuation">;</span>
objParameters
有两个属性可以设置：
mozAnon
布尔值：将此属性设置为 <span class="token boolean">true</span> 将使浏览器在获取资源时不暴露自身来源和用户凭据。最重要的是，这意味着只有明确添加使用 setRequestHeader 才会发送 Cookies。
mozSystem
布尔值：将此属性设置为 <span class="token boolean">true</span> 允许建立跨站点的连接，而无需服务器选择使用（Cross<span class="token operator">-</span>Origin Resource Sharing 跨域资源共享）<span class="token operator">*</span>。必须同时将参数 mozAnon 设置为 <span class="token boolean">true</span>，即不能与 Cookie 或其他用户凭据同时发送。仅限于在 <span class="token function">privileged</span> <span class="token punctuation">(</span>reviewed<span class="token punctuation">)</span> apps 起效（译者注：此句原文 This only works <span class="token keyword">in</span> <span class="token function">privileged</span> <span class="token punctuation">(</span>reviewed<span class="token punctuation">)</span> apps<span class="token punctuation">;</span>）；在 Firefox 上任何网页加载后不起作用（译者注：此句原文 it does not work on arbitrary webpages loaded <span class="token keyword">in</span> Firefox<span class="token punctuation">.</span>）。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="实例属性-1" tabindex="-1"><a class="header-anchor" href="#实例属性-1" aria-hidden="true">#</a> 实例属性</h4>
<p>1.<code v-pre>readyState</code></p>
<table>
<thead>
<tr>
<th style="text-align:left">值</th>
<th style="text-align:left">状态</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>0</code></td>
<td style="text-align:left"><code v-pre>UNSENT</code></td>
<td style="text-align:left">代理被创建，但尚未调用 open() 方法。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>1</code></td>
<td style="text-align:left"><code v-pre>OPENED</code></td>
<td style="text-align:left"><code v-pre>open()</code> 方法已经被调用。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>2</code></td>
<td style="text-align:left"><code v-pre>HEADERS_RECEIVED</code></td>
<td style="text-align:left"><code v-pre>send()</code> 方法已经被调用，并且头部和状态已经可获得。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>3</code></td>
<td style="text-align:left"><code v-pre>LOADING</code></td>
<td style="text-align:left">下载中；<code v-pre>responseText</code> 属性已经包含部分数据。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>4</code></td>
<td style="text-align:left"><code v-pre>DONE</code></td>
<td style="text-align:left">下载操作已完成。</td>
</tr>
</tbody>
</table>
<p>2.status</p>
<p>浏览器状态码，一般由服务器指定。</p>
<p>3.response</p>
<p>如果请求尚未完成或未成功，则取值是 <code v-pre>null</code>。因此只能在raadyState值为4时才能获取到类型</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token string">'somePage.html'</span><span class="token punctuation">;</span> <span class="token comment">// 一个本地页面</span>

<span class="token keyword">function</span> <span class="token function">load</span><span class="token punctuation">(</span><span class="token parameter">url<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  xhr<span class="token punctuation">.</span><span class="token function-variable function">onreadystatechange</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>readyState <span class="token operator">===</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">callback</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">'GET'</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4.statusText</p>
<p>这个属性包含了返回状态对应的文本信息，例如&quot;OK&quot;或是&quot;Not Found&quot;。如果请求的状态<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState" target="_blank" rel="noopener noreferrer"><code v-pre>readyState</code><ExternalLinkIcon/></a>的值为&quot;UNSENT&quot;或者&quot;OPENED&quot;，则这个属性的值将会是一个空字符串。如果服务器未明确指定一个状态文本信息，则<code v-pre>statusText</code>的值将会被自动赋值为&quot;OK&quot;。</p>
<p>5.timeout</p>
<p>代表着一个请求在被自动终止前所消耗的毫秒数。默认值为 0，意味着没有超时。</p>
<p>6.upload</p>
<p>返回一个xhrUpload对象，用来表示上传进度。</p>
<p>可以被绑定在 upload 对象上的事件监听器如下：</p>
<table>
<thead>
<tr>
<th style="text-align:left">事件</th>
<th style="text-align:left">相应属性的信息类型</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>onloadstart</code></td>
<td style="text-align:left">获取开始</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>onprogress</code></td>
<td style="text-align:left">数据传输进行中</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>onabort</code></td>
<td style="text-align:left">获取操作终止</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>onerror</code></td>
<td style="text-align:left">获取失败</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>onload</code></td>
<td style="text-align:left">获取成功</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>ontimeout</code></td>
<td style="text-align:left">获取操作在用户规定的时间内未完成</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>onloadend</code></td>
<td style="text-align:left">获取完成（不论成功与否）</td>
</tr>
</tbody>
</table>
<h4 id="实例方法-1" tabindex="-1"><a class="header-anchor" href="#实例方法-1" aria-hidden="true">#</a> 实例方法</h4>
<ul>
<li>
<p><code v-pre>abort</code>取消请求</p>
</li>
<li>
<p><code v-pre>getAllResponseHeaders()</code>返回请求头</p>
</li>
<li>
<p><code v-pre>open</code>初始化一个新创建的请求，或重新初始化一个请求。</p>
<ul>
<li>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>xhrReq<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> url<span class="token punctuation">)</span><span class="token punctuation">;</span>
xhrReq<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> url<span class="token punctuation">,</span> async<span class="token punctuation">)</span><span class="token punctuation">;</span>
xhrReq<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> url<span class="token punctuation">,</span> async<span class="token punctuation">,</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>
xhrReq<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> url<span class="token punctuation">,</span> async<span class="token punctuation">,</span> user<span class="token punctuation">,</span> password<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>async一个可选的布尔参数，表示是否异步执行操作，默认为 true。如果值为 false，send() 方法直到收到答复前不会返回。如果 true，已完成事务的通知可供事件监听器使用。如果 multipart 属性为 true 则这个必须为 true，否则将引发异常。</p>
</li>
<li>
<p>user可选的用户名用于认证用途；默认为 <code v-pre>null</code></p>
</li>
<li>
<p>password可选的密码用于认证用途，默认为 <code v-pre>null</code>。</p>
</li>
</ul>
</li>
<li>
<p><code v-pre>send</code>用于发送 HTTP 请求。如果是异步请求（默认为异步请求），则此方法会在请求发送后立即返回；如果是同步请求，则此方法直到响应到达后才会返回。</p>
<ul>
<li>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>XMLHttpRequest<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<h4 id="事件" tabindex="-1"><a class="header-anchor" href="#事件" aria-hidden="true">#</a> 事件</h4>
<ul>
<li><code v-pre>loadstart</code>当程序开始加载时，loadstart 事件将被触发。这个事件可以被 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest" target="_blank" rel="noopener noreferrer"><code v-pre>XMLHttpRequest</code><ExternalLinkIcon/></a> 调用</li>
<li><code v-pre>load</code>请求完成的时候会触发<code v-pre>load</code> 事件</li>
<li><code v-pre>loadend</code>在一个资源的加载进度停止之后被触发 (例如，在已经触发“error”，“abort”或“load”事件之后)</li>
<li><code v-pre>process</code>请求接收到数据的时候被周期性触发。</li>
<li><code v-pre>readystatechange</code>这个方法不该用于同步的 requests 对象<strong>当一个 <code v-pre>XMLHttpRequest</code> 请求被 abort() 方法取消时，其对应的 <code v-pre>readystatechange</code> 事件不会被触发。</strong></li>
<li><code v-pre>timeout</code>超时触发</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>xhr<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'loadstart'</span><span class="token punctuation">,</span> handleEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'load'</span><span class="token punctuation">,</span> handleEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'loadend'</span><span class="token punctuation">,</span> handleEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'progress'</span><span class="token punctuation">,</span> handleEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'error'</span><span class="token punctuation">,</span> handleEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'abort'</span><span class="token punctuation">,</span> handleEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'readystatechange'</span><span class="token punctuation">,</span> handleEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'timeout'</span><span class="token punctuation">,</span> handleEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、fetch" tabindex="-1"><a class="header-anchor" href="#_2、fetch" aria-hidden="true">#</a> 2、Fetch</h3>
<h4 id="fetch" tabindex="-1"><a class="header-anchor" href="#fetch" aria-hidden="true">#</a> fetch（）</h4>
<p>它返回一个 promise，这个 promise 会在请求响应后被 resolve，并传回 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Response" target="_blank" rel="noopener noreferrer"><code v-pre>Response</code><ExternalLinkIcon/></a> 对象。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">fetch</span><span class="token punctuation">(</span>input<span class="token punctuation">[</span><span class="token punctuation">,</span> init<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String" target="_blank" rel="noopener noreferrer"><code v-pre>USVString</code><ExternalLinkIcon/></a> 字符串，包含要获取资源的 URL。一些浏览器会接受 <code v-pre>blob:</code> 和 <code v-pre>data:</code> 作为 schemes.</li>
<li>一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Request" target="_blank" rel="noopener noreferrer"><code v-pre>Request</code><ExternalLinkIcon/></a> 对象。</li>
</ul>
<p><em>init</em> 可选，一个配置项对象，包括所有对请求的设置。可选的参数有：</p>
<ul>
<li><code v-pre>method</code>: 请求使用的方法，如 <code v-pre>GET</code>、<code v-pre>POST</code>。</li>
<li><code v-pre>headers</code>: 请求的头信息，形式为 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Headers" target="_blank" rel="noopener noreferrer"><code v-pre>Headers</code><ExternalLinkIcon/></a> 的对象或包含 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String" target="_blank" rel="noopener noreferrer"><code v-pre>ByteString</code><ExternalLinkIcon/></a> 值的对象字面量。</li>
<li><code v-pre>body</code>: 请求的 body 信息：可能是一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Blob" target="_blank" rel="noopener noreferrer"><code v-pre>Blob</code><ExternalLinkIcon/></a>、<code v-pre>BufferSource</code>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/FormData" target="_blank" rel="noopener noreferrer"><code v-pre>FormData</code><ExternalLinkIcon/></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams" target="_blank" rel="noopener noreferrer"><code v-pre>URLSearchParams</code><ExternalLinkIcon/></a> 或者 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String" target="_blank" rel="noopener noreferrer"><code v-pre>USVString</code><ExternalLinkIcon/></a> 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。</li>
<li><code v-pre>mode</code>: 请求的模式，如 <code v-pre>cors</code>、<code v-pre>no-cors</code> 或者 <code v-pre>same-origin</code>。</li>
<li><code v-pre>credentials</code>: 请求的 credentials，如 <code v-pre>omit</code>、<code v-pre>same-origin</code> 或者 <code v-pre>include</code>。为了在当前域名内自动发送 cookie，必须提供这个选项，从 Chrome 50 开始，这个属性也可以接受 <code v-pre>FederatedCredential </code>实例或是一个 <code v-pre>PasswordCredential</code>实例。</li>
<li><code v-pre>cache</code>: 请求的 cache 模式：<code v-pre>default</code>、 <code v-pre>no-store</code>、 <code v-pre>reload</code> 、 <code v-pre>no-cache</code>、 <code v-pre>force-cache</code> 或者 <code v-pre>only-if-cached</code>。</li>
<li><code v-pre>redirect</code>: 可用的 redirect 模式：<code v-pre>follow</code> (自动重定向), <code v-pre>error</code> (如果产生重定向将自动终止并且抛出一个错误），或者 <code v-pre>manual</code> (手动处理重定向)。在 Chrome 中默认使用 <code v-pre>follow</code>（Chrome 47 之前的默认值是 <code v-pre>manual</code>）。</li>
<li><code v-pre>referrer</code>: 一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String" target="_blank" rel="noopener noreferrer"><code v-pre>USVString</code><ExternalLinkIcon/></a> 可以是 <code v-pre>no-referrer</code>、<code v-pre>client</code> 或一个 URL。默认是 <code v-pre>client</code>。</li>
<li><code v-pre>referrerPolicy</code>: 指定了 HTTP 头部 referer 字段的值。可能为以下值之一：<code v-pre>no-referrer</code>、 <code v-pre>no-referrer-when-downgrade</code>、<code v-pre>origin</code>、<code v-pre>origin-when-cross-origin</code>、 <code v-pre>unsafe-url</code>。</li>
</ul>
<h4 id="headers" tabindex="-1"><a class="header-anchor" href="#headers" aria-hidden="true">#</a> Headers</h4>
<p><strong>Headers</strong> 接口允许对 HTTP 请求和响应头执行各种操作。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">method</span><span class="token operator">:</span><span class="token string">'post'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">body</span><span class="token operator">:</span><span class="token string">'uname=lisi&amp;pwd=123'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">headers</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token string-property property">'Content-Type'</span><span class="token operator">:</span><span class="token string">'application/x-www-form=urlencoded'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> data<span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、navigator-sendbeacon" tabindex="-1"><a class="header-anchor" href="#_3、navigator-sendbeacon" aria-hidden="true">#</a> 3、navigator.sendBeacon</h3>
<p><code v-pre>navigator.sendBeacon</code>是为了解决当前页面卸载期间无法保证数据发送到服务端。</p>
<p>在没有<code v-pre>sendBeacon</code>之前通过以下方式解决页面卸载还能传输数据。</p>
<ul>
<li>
<p>页面卸载时同步使用ajxa发送请求，等服务端返回数据再卸载页面，缺点很明显，阻碍页面卸载。</p>
</li>
<li>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'beforeunload'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">'POST'</span><span class="token punctuation">,</span> <span class="token string">'/log'</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 第三个参数指定为 false，表示使用同步请求</span>
  xhr<span class="token punctuation">.</span><span class="token function">setRequestHeader</span><span class="token punctuation">(</span><span class="token string">'Content-Type'</span><span class="token punctuation">,</span> <span class="token string">'application/json'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> data <span class="token operator">=</span> <span class="token punctuation">{</span> 
    <span class="token literal-property property">userId</span><span class="token operator">:</span> <span class="token number">123</span><span class="token punctuation">,</span>
    <span class="token literal-property property">eventType</span><span class="token operator">:</span> <span class="token string">'pageView'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">pageUrl</span><span class="token operator">:</span> location<span class="token punctuation">.</span>href<span class="token punctuation">,</span>
    <span class="token literal-property property">timestamp</span><span class="token operator">:</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>创建Image对象，将要传输的数据作为查询参数传递到服务器，服务器返回一个空白图片，这样就可以在页面卸载时异步传输数据。<strong>这种方式不会阻塞页面卸载过程，但只支持 GET 请求，且只能传输较小的数据。</strong></p>
</li>
<li>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">sendAnalyticsData</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  img<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">'/analytics?'</span> <span class="token operator">+</span> <span class="token function">encodeURIComponent</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'beforeunload'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> data <span class="token operator">=</span> <span class="token punctuation">{</span> 
    <span class="token literal-property property">userId</span><span class="token operator">:</span> <span class="token number">123</span><span class="token punctuation">,</span>
    <span class="token literal-property property">eventType</span><span class="token operator">:</span> <span class="token string">'pageView'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">pageUrl</span><span class="token operator">:</span> location<span class="token punctuation">.</span>href<span class="token punctuation">,</span>
    <span class="token literal-property property">timestamp</span><span class="token operator">:</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token function">sendAnalyticsData</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>LocalStorage：将要传输的数据存储在 LocalStorage 中，然后在下一个页面加载时读取数据并发送到服务器。这种方式可以在页面卸载时异步传输数据，但需要额外的代码维护，且只能传输较小的数据，且可能会受到 LocalStorage 容量限制。</p>
</li>
<li>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">sendFormData</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'formData'</span><span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'formSubmitTime'</span><span class="token punctuation">,</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'beforeunload'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> data <span class="token operator">=</span> <span class="token punctuation">{</span> 
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'John Doe'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">email</span><span class="token operator">:</span> <span class="token string">'john.doe@example.com'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">'HelloWorld!'</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token function">sendFormData</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 在下一个页面加载时发送数据</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'load'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> formData <span class="token operator">=</span> localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'formData'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> formSubmitTime <span class="token operator">=</span> localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'formSubmitTime'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>formData <span class="token operator">&amp;&amp;</span> formSubmitTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> data <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>formData<span class="token punctuation">)</span><span class="token punctuation">;</span>
    data<span class="token punctuation">.</span>submitTime <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>formSubmitTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">sendDataToServer</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    localStorage<span class="token punctuation">.</span><span class="token function">removeItem</span><span class="token punctuation">(</span><span class="token string">'formData'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    localStorage<span class="token punctuation">.</span><span class="token function">removeItem</span><span class="token punctuation">(</span><span class="token string">'formSubmitTime'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">sendDataToServer</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 发送数据到服务器的代码</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p>输到服务器，避免在卸载页面时丢失数据。它是基于浏览器提供的 navigator.sendBeacon() 方法实现的，支持发送一些简单的数据，如日志数据、统计数据等。</p>
<p>使用 sendBeacon 的优点是<strong>它可以在页面卸载时异步传输数据，而且不会阻塞页面卸载过程</strong>，因此可以避免在卸载页面时因为数据传输而延迟卸载，提高用户体验。此外，sendBeacon 还可以在网络连接不稳定的情况下保证数据的可靠传输。</p>
<p>发送数据时，需要传入一个 URL 和一个包含数据的 Blob 或 ArrayBuffer 对象。如果传入的数据太大，可能会被浏览器截断或被服务器拒绝，因此建议只传输一些简单的数据。<code v-pre>data</code> 参数是将要发送的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer" target="_blank" rel="noopener noreferrer"><code v-pre>ArrayBuffer</code><ExternalLinkIcon/></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray" target="_blank" rel="noopener noreferrer"><code v-pre>ArrayBufferView</code><ExternalLinkIcon/></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Blob" target="_blank" rel="noopener noreferrer"><code v-pre>Blob</code><ExternalLinkIcon/></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String" target="_blank" rel="noopener noreferrer"><code v-pre>DOMString</code><ExternalLinkIcon/></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/FormData" target="_blank" rel="noopener noreferrer"><code v-pre>FormData</code><ExternalLinkIcon/></a> 或 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams" target="_blank" rel="noopener noreferrer"><code v-pre>URLSearchParams</code><ExternalLinkIcon/></a> 类型的数据。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> data <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"John"</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">30</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> blob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"application/json"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
navigator<span class="token punctuation">.</span><span class="token function">sendBeacon</span><span class="token punctuation">(</span><span class="token string">"/log"</span><span class="token punctuation">,</span> blob<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>sendBeacon 方法仅支持 POST 请求</p>
</div>
<h3 id="ajax和fetch区别" tabindex="-1"><a class="header-anchor" href="#ajax和fetch区别" aria-hidden="true">#</a> ajax和fetch区别</h3>
<p><code v-pre>fetch()</code>使用 Promise，不使用回调函数，因此大大简化了写法，写起来更简洁。</p>
<p><code v-pre>fetch()</code>采用模块化设计，API 分散在多个对象上（Response 对象、Request 对象、Headers 对象），更合理一些；相比之下，XMLHttpRequest 的 API 设计并不是很好，输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码。</p>
<p><code v-pre>fetch()</code>通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。XMLHTTPRequest 对象不支持数据流，所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。</p>
<h3 id="sse长连接" tabindex="-1"><a class="header-anchor" href="#sse长连接" aria-hidden="true">#</a> SSE长连接</h3>
<p>SSE利用长连接特性，在客户端和服务端之间建立一条持久化链接，并通过这条连接实现服务器向客户端实时数据推送</p>
<p>特点：客户端第一次发送请求后续由服务端推送消息，</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">/*configuration 可选
为配置新连接提供选项。可选项是：
withCredentials，默认为 false，指示 CORS 是否应包含凭据 ( credentials )。
*/</span>
<span class="token keyword">const</span> sse <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EventSource</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span>configuration<span class="token punctuation">)</span>
sse<span class="token punctuation">.</span><span class="token function">addEvenlistener</span><span class="token punctuation">(</span><span class="token string">'事件名称默认message,服务端可以设置'</span><span class="token punctuation">,</span><span class="token parameter">e</span><span class="token operator">=></span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与 WebSocket 不同的是，服务器发送事件是单向的。数据信息只能从服务端到发送到客户端（如用户的浏览器）。当不需要以消息形式将数据从客户端发送到服务器时，这使它们成为绝佳的选择。</p>
<p>实例身上默认有三个监听事件  <code v-pre>error message open</code> ，有一个<code v-pre>close</code>方法，有一个**<code v-pre>readyState</code>** 属性</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> evtSource <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EventSource</span><span class="token punctuation">(</span><span class="token string">"sse.php"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/*
0 — connecting
1 — open
2 — closed
*/</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>evtSource<span class="token punctuation">.</span>readyState<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><CommentService/></div></template>


