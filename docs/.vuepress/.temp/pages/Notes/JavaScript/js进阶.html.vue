<template><div><h1 id="js进阶" tabindex="-1"><a class="header-anchor" href="#js进阶" aria-hidden="true">#</a> js进阶</h1>
<h2 id="_1、隐式转换" tabindex="-1"><a class="header-anchor" href="#_1、隐式转换" aria-hidden="true">#</a> 1、隐式转换</h2>
<p><u>我们知道js式弱类型语言，这意味着当操作涉及不匹配的类型是否，它将允许隐式类型转换，而不是抛出一个错误。</u></p>
<p>发生类型转换的情况如下：</p>
<ul>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/Date" target="_blank" rel="noopener noreferrer"><code v-pre>Date()</code><ExternalLinkIcon/></a> 构造函数，当它收到一个不是 <code v-pre>Date</code> 实例的参数时——字符串表示日期字符串，而数值表示时间戳。</li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Addition" target="_blank" rel="noopener noreferrer"><code v-pre>+</code><ExternalLinkIcon/></a> 运算符——如果运算对象是字符串，执行字符串串联；否则，执行数值相加。</li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Equality" target="_blank" rel="noopener noreferrer"><code v-pre>==</code><ExternalLinkIcon/></a> 运算符——如果一个运算对象是原始值，而另一个运算对象是对象（object），则该对象将转换为没有首选类型的原始值。</li>
</ul>
<p>如果值已经是原始值，则此操作不会进行任何转换。对象按以下顺序调用它的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive" target="_blank" rel="noopener noreferrer"><code v-pre>[@@toPrimitive]()</code><ExternalLinkIcon/></a>（将 hint 作为 <code v-pre>default</code>）、<code v-pre>valueOf()</code> 和 <code v-pre>toString()</code> 方法，将其转换为原始值。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>原始值转换会在 <code v-pre>toString()</code> 方法之前调用 <code v-pre>valueOf()</code> 方法，这与<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number#number_%E5%BC%BA%E5%88%B6%E8%BD%AC%E6%8D%A2" target="_blank" rel="noopener noreferrer">强制数字类型转换<ExternalLinkIcon/></a>的行为相似，但与<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String#%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%BC%BA%E5%88%B6%E8%BD%AC%E6%8D%A2" target="_blank" rel="noopener noreferrer">强制字符串类型转换<ExternalLinkIcon/></a>不同。</p>
</div>
<h3 id="_1、symbol-toprimitive" tabindex="-1"><a class="header-anchor" href="#_1、symbol-toprimitive" aria-hidden="true">#</a> 1、Symbol.toPrimitive</h3>
<p><strong><code v-pre>Symbol.toPrimitive</code></strong> 是内置的 symbol 属性，其指定了一种接受首选类型并返回对象原始值的表示的方法。它被所有的<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%BC%BA%E5%88%B6%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2" target="_blank" rel="noopener noreferrer">强类型转换制<ExternalLinkIcon/></a>算法优先调用。</p>
<p>在 <code v-pre>Symbol.toPrimitive</code> 属性（用作函数值）的帮助下，对象可以转换为一个原始值。该函数被调用时，会被传递一个字符串参数 <code v-pre>hint</code>，表示要转换到的原始值的预期类型。<code v-pre>hint</code> 参数的取值是 <code v-pre>&quot;number&quot;</code>、<code v-pre>&quot;string&quot;</code> 和 <code v-pre>&quot;default&quot;</code> 中的任意一个。</p>
<p>1、如果输入的值已经是一个原始值，则直接返回它</p>
<p>2、否则，如果输入的值是一个对象，则调用该对象的valueOf()方法，   如果valueOf()方法的返回值是一个原始值，则返回这个原始值。</p>
<p>3、否则，调用这个对象的toString()方法，如果toString()方法返回的是一个原始值，则返回这个原始值。</p>
<p>4、否则，抛出TypeError异常。</p>
<h3 id="_2-对象和数组之间的类型转换" tabindex="-1"><a class="header-anchor" href="#_2-对象和数组之间的类型转换" aria-hidden="true">#</a> 2.对象和数组之间的类型转换</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token operator">+</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "[object Object]"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>{}</code> 和 <code v-pre>[]</code> 都没有 <code v-pre>[@@toPrimitive]()</code> 方法。因此会调用<code v-pre>valueOf</code>方法，而<code v-pre>valuieOf</code>返回对象自身，由于返回值还是对象，因此继续调用<code v-pre>toString</code>方法，<code v-pre>{}.toString()</code>返回<code v-pre>&quot;[object Object]&quot;</code>而<code v-pre>[].toString()</code>返回是空字符串</p>
<h3 id="_3-number强制类型转换" tabindex="-1"><a class="header-anchor" href="#_3-number强制类型转换" aria-hidden="true">#</a> 3.Number强制类型转换</h3>
<ul>
<li>对于 Number 则总是返回自己</li>
<li><code v-pre>undefined</code> 变成了 <code v-pre>NaN</code>。</li>
<li><code v-pre>null</code> 变成了 <code v-pre>0</code>。</li>
<li><code v-pre>true</code> 变成了 <code v-pre>1</code>；<code v-pre>false</code> 变成了 <code v-pre>0</code>。</li>
<li>如果它们包含数字字面量，字符串通过解析它们来转换。如果解析失败，返回的结果为<code v-pre>NaN</code>。与实际数字字面量相比，它们有一些细微的差别。
<ul>
<li>忽略前导和尾随空格/行终止符。</li>
<li>前导数值 <code v-pre>0</code> 不会导致该数值成为八进制文本（或在严格模式下被拒绝）。</li>
<li><code v-pre>+</code> 和 <code v-pre>-</code> 允许在字符串的开头指示其符号。（在实际代码中，它们“看起来像”文字的一部分，但实际上是单独的一元运算符。）然而，该标志只能出现一次，不得后跟空格。</li>
<li><code v-pre>Infinity</code> 和 <code v-pre>-Infinity</code> 被当作是字面量。在实际代码中，它们是全局变量。</li>
<li>空字符串或仅空格字符串转换为 <code v-pre>0</code>。</li>
<li>不允许使用<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar#numeric_separators" target="_blank" rel="noopener noreferrer">数字分隔符<ExternalLinkIcon/></a>。</li>
</ul>
</li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt" target="_blank" rel="noopener noreferrer">BigInt<ExternalLinkIcon/></a> 抛出 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError" target="_blank" rel="noopener noreferrer"><code v-pre>TypeError</code><ExternalLinkIcon/></a>，以防止意外的强制隐式转换损失精度。</li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol" target="_blank" rel="noopener noreferrer">Symbol<ExternalLinkIcon/></a> 抛出 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError" target="_blank" rel="noopener noreferrer"><code v-pre>TypeError</code><ExternalLinkIcon/></a>。</li>
</ul>
<h3 id="_4-强制类型转换遵循的规则" tabindex="-1"><a class="header-anchor" href="#_4-强制类型转换遵循的规则" aria-hidden="true">#</a> 4.强制类型转换遵循的规则</h3>
<ul>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%BC%BA%E5%88%B6%E5%8E%9F%E5%A7%8B%E5%80%BC%E8%BD%AC%E6%8D%A2" target="_blank" rel="noopener noreferrer">强制原始值转换<ExternalLinkIcon/></a>：<code v-pre>[@@toPrimitive](&quot;default&quot;)</code> → <code v-pre>valueOf()</code> → <code v-pre>toString()</code></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%BC%BA%E5%88%B6%E6%95%B0%E5%AD%97%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2" target="_blank" rel="noopener noreferrer">强制数字类型转换<ExternalLinkIcon/></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number#number_%E5%BC%BA%E5%88%B6%E8%BD%AC%E6%8D%A2" target="_blank" rel="noopener noreferrer">强制 number 类型转换<ExternalLinkIcon/></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt#%E8%BD%AC%E5%8C%96" target="_blank" rel="noopener noreferrer">强制 BigInt 类型转换<ExternalLinkIcon/></a>：<code v-pre>[@@toPrimitive](&quot;number&quot;)</code> → <code v-pre>valueOf()</code> → <code v-pre>toString()</code></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String#%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%BC%BA%E5%88%B6%E8%BD%AC%E6%8D%A2" target="_blank" rel="noopener noreferrer">强制字符串类型转换<ExternalLinkIcon/></a>：<code v-pre>[@@toPrimitive](&quot;string&quot;)</code> → <code v-pre>toString()</code> → <code v-pre>valueOf()</code></li>
</ul>
<p>在所有情况下，<u><code v-pre>[@@toPrimitive]()</code> 如果存在，必须可调用并返回原始值</u>。</p>
<h3 id="_5-object-is" tabindex="-1"><a class="header-anchor" href="#_5-object-is" aria-hidden="true">#</a> 5.Object.is</h3>
<p><code v-pre>Object.is()</code> 确定两个值是否为相同值。如果以下其中一项成立，则两个值相同：</p>
<ul>
<li>都是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined" target="_blank" rel="noopener noreferrer"><code v-pre>undefined</code><ExternalLinkIcon/></a></li>
<li>都是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null" target="_blank" rel="noopener noreferrer"><code v-pre>null</code><ExternalLinkIcon/></a></li>
<li>都是 <code v-pre>true</code> 或者都是 <code v-pre>false</code></li>
<li>都是长度相同、字符相同、顺序相同的字符串</li>
<li>都是相同的对象（意味着两个值都引用了内存中的同一对象）</li>
<li>都是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt" target="_blank" rel="noopener noreferrer">BigInt<ExternalLinkIcon/></a> 且具有相同的数值</li>
<li>都是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol" target="_blank" rel="noopener noreferrer">symbol<ExternalLinkIcon/></a> 且引用相同的 symbol 值</li>
<li>都是数字且
<ul>
<li>都是 <code v-pre>+0</code></li>
<li>都是 <code v-pre>-0</code></li>
<li>都是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN" target="_blank" rel="noopener noreferrer"><code v-pre>NaN</code><ExternalLinkIcon/></a></li>
<li>都有相同的值，非零且都不是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN" target="_blank" rel="noopener noreferrer"><code v-pre>NaN</code><ExternalLinkIcon/></a></li>
</ul>
</li>
</ul>
<h2 id="_2、尾调用-尾递归" tabindex="-1"><a class="header-anchor" href="#_2、尾调用-尾递归" aria-hidden="true">#</a> 2、尾调用-尾递归</h2>
<p>尾调用是指函数作为另一个函数的最后一条语句被调用，就像这样.</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">doSomethingElse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ES5中在执行 doSomethingElse 函数的时候会新增一个栈帧，doSomething对应的栈帧会被保留在内存中，当存在循环调用时就容易出现程序问题，比如栈溢出等不可预期的错误。</p>
<p>如果满足以下条件，尾调用不再创建新的栈帧，而是清除并重用当前栈帧；</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token string">"use strict"</span><span class="token punctuation">;</span>

<span class="token comment">// 可以被优化</span>
<span class="token keyword">function</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    ／／优化后
    <span class="token keyword">return</span> <span class="token function">doSomethingElse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 无法优化，必须在返回值后添加其他操作</span>
<span class="token keyword">function</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">1</span><span class="token operator">+</span><span class="token function">doSomethingElse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 无法优化，调用不在尾部</span>
<span class="token keyword">function</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token function">doSomethingElse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 无法优化，func为闭包</span>
<span class="token keyword">function</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> num<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token function-variable function">func</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> num<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>乘阶</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token string">'use strict'</span><span class="token punctuation">;</span>
<span class="token comment">// 无优化 会一直创建栈帧</span>
<span class="token keyword">function</span> <span class="token function">factorial</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> n <span class="token operator">*</span> <span class="token function">factorial</span><span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 优化后</span>
<span class="token keyword">function</span> <span class="token function">factorial_opt</span><span class="token punctuation">(</span><span class="token parameter">n<span class="token punctuation">,</span> p<span class="token operator">=</span><span class="token number">1</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">~</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1</span> <span class="token operator">*</span> p<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> result <span class="token operator">=</span> n <span class="token operator">*</span> p
        <span class="token keyword">return</span> <span class="token function">factorial_opt</span><span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>斐波那契数列</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 一般的实现方式</span>
<span class="token keyword">function</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>n<span class="token operator">==</span><span class="token number">0</span> <span class="token operator">||</span> n <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> n<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span>n<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 尾调用优化后</span>
<span class="token string">'use strict'</span>
<span class="token keyword">function</span> <span class="token function">fibonacci_opt</span><span class="token punctuation">(</span><span class="token parameter">n<span class="token punctuation">,</span> current <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> next <span class="token operator">=</span> <span class="token number">1</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>n <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> next
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">fibonacci_opt</span><span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> next<span class="token punctuation">,</span> next<span class="token operator">+</span>current<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">fibonacci_opt</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-事件总线" tabindex="-1"><a class="header-anchor" href="#_3-事件总线" aria-hidden="true">#</a> 3.事件总线</h2>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">EventObj</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>event<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">Function</span><span class="token operator">></span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 全部事件存储map</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> appEventObjMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map<span class="token operator">&lt;</span>String<span class="token punctuation">,</span> EventObj<span class="token operator">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// eventBus 事件中心</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">EventBus</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token keyword">private</span> eventObj<span class="token operator">:</span> EventObj<span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>appEventObjMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      appEventObjMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>eventObj <span class="token operator">=</span> appEventObjMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 监听事件</span>
  <span class="token keyword">public</span> <span class="token function">$on</span><span class="token punctuation">(</span>event<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> fn<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">)</span><span class="token operator">:</span> EventBus <span class="token punctuation">{</span>
    <span class="token keyword">const</span> cbs <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>eventObj<span class="token punctuation">[</span>event<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>cbs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>eventObj<span class="token punctuation">[</span>event<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>fn<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>cbs<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span><span class="token punctuation">)</span> cbs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/** 任何$emit都会导致监听函数触发，第一个参数为事件名，后续的参数为$emit的参数 */</span>
  <span class="token keyword">public</span> <span class="token function">$onAll</span><span class="token punctuation">(</span><span class="token function-variable function">fn</span><span class="token operator">:</span> <span class="token punctuation">(</span>event<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> EventBus <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$on</span><span class="token punctuation">(</span><span class="token string">'ALL_EVENT'</span><span class="token punctuation">,</span> fn<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 一次性监听事件</span>
  <span class="token keyword">public</span> <span class="token function">$once</span><span class="token punctuation">(</span>event<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> fn<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token function-variable function">on</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$off</span><span class="token punctuation">(</span>event<span class="token punctuation">,</span> on<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">fn</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$on</span><span class="token punctuation">(</span>event<span class="token punctuation">,</span> on<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 取消监听</span>
  <span class="token keyword">public</span> <span class="token function">$off</span><span class="token punctuation">(</span>event<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> fn<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">)</span><span class="token operator">:</span> EventBus <span class="token punctuation">{</span>
    <span class="token keyword">const</span> cbs <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>eventObj<span class="token punctuation">[</span>event<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>event <span class="token operator">||</span> <span class="token operator">!</span>cbs <span class="token operator">||</span> <span class="token operator">!</span>cbs<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">'no event'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">let</span> cb<span class="token punctuation">;</span>
    <span class="token keyword">let</span> i <span class="token operator">=</span> cbs<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      cb <span class="token operator">=</span> cbs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>cb <span class="token operator">===</span> fn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        cbs<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 取消监听$onAll</span>
  <span class="token keyword">public</span> <span class="token function">$offAll</span><span class="token punctuation">(</span>fn<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">)</span><span class="token operator">:</span> EventBus <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$off</span><span class="token punctuation">(</span><span class="token string">'ALL_EVENT'</span><span class="token punctuation">,</span> fn<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 发送事件</span>
  <span class="token keyword">public</span> <span class="token function">$emit</span><span class="token punctuation">(</span>event<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">></span><span class="token punctuation">)</span><span class="token operator">:</span> EventBus <span class="token punctuation">{</span>
    <span class="token keyword">let</span> cbs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> allCbs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    appEventObjMap<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>eventObj<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>eventObj<span class="token punctuation">[</span>event<span class="token punctuation">]</span><span class="token punctuation">)</span> cbs <span class="token operator">=</span> cbs<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>eventObj<span class="token punctuation">[</span>event<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   		 <span class="token keyword">if</span> <span class="token punctuation">(</span>eventObj<span class="token punctuation">[</span><span class="token string">'ALL_EVENT'</span><span class="token punctuation">]</span><span class="token punctuation">)</span> allCbs <span class="token operator">=</span> allCbs<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>eventObj<span class="token punctuation">[</span><span class="token string">'ALL_EVENT'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>event <span class="token operator">||</span> <span class="token punctuation">(</span>cbs<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> allCbs<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">no envent </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>event<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> cbs<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> cbs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> allCbs<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> allCbs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">(</span>event<span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">error</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 清空当前所有的监听事件</span>
  <span class="token keyword">public</span> <span class="token function">$clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> EventBus <span class="token punctuation">{</span>
    <span class="token keyword">const</span> eventObj <span class="token operator">=</span> appEventObjMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token operator">??</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> events <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>eventObj<span class="token punctuation">)</span><span class="token punctuation">;</span>
    events<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">delete</span> eventObj<span class="token punctuation">[</span>event<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-js原理-v8" tabindex="-1"><a class="header-anchor" href="#_4-js原理-v8" aria-hidden="true">#</a> 4.JS原理-V8</h2>
<p>JS使用运行时编译（Just In Time Compliation），这种方式是在运行过程中生成机器代码，而不是提前编译生成。而将JS转成机器语言并执行的就是JS引擎。AOT与JIT刚好相反，AOT先生成机器码在运行</p>
<p>这些引擎都是先通过解析器（parser）解析成抽象语法AST，然后通过解释器（interpreter）将AST编译成字节码，字节码是跨平台的中间表示（字节码与平台无关，能在不同操作系统上运行），字节码通过编译器（Compiler）生成机器代码。</p>
<p>总结：</p>
<ul>
<li>解析器负责将代码解析成AST</li>
<li>解释器负责将AST编译成字节码并执行</li>
<li>编译器负责编译运行更高效的机器码</li>
</ul>
<h3 id="v8" tabindex="-1"><a class="header-anchor" href="#v8" aria-hidden="true">#</a> V8</h3>
<p>V8是一个接收js代码，编译代码然后执行的C++程序，编译后的代码可以再多种操作系统多种处理器上运行。</p>
<p>V8主要做以下工作</p>
<ul>
<li>编译执行JS代码，处理调用栈</li>
<li>内存分配</li>
<li>垃圾回收</li>
</ul>
<p>V8 @version5.9版本没有解释器（不编译为字节码），使用两个编译器。执行流程如下：</p>
<ul>
<li>js解析器解析生成AST</li>
<li>Full-codegen编译器1直接使用AS编译出机器码（Full-codegen是一个基准编译器，它生成的机器码是未被优化的机器码）</li>
<li>然后运行过程中通过Crankshaft优化编译器2来做代码优化，需要优化的代码重新解析生成AST，然后Crankshaft通过优化好的AST生成优化好的机器码</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>这样设计有优缺点</p>
<p>优点如下：</p>
<ul>
<li>没有了AST到字节码的转换时间，一定程度上提高浏览器执行JS的性能</li>
</ul>
<p>缺点：</p>
<ul>
<li>生成的机器码会占用大量内存。</li>
<li>缺少中间层机器码，无法实现一些优化策略。</li>
<li>这些编译器无法很好支持和优化JS新语法特性。</li>
</ul>
</div>
<p>V8新版本执行流程如下：</p>
<ul>
<li>解析器生成AST</li>
<li>使用Igniton基准解析器，生成字节码（此时清除AST释放内存空间）</li>
<li>生成的字节码直接作为基准执行模型，（在代码不断运行过程中解释器收集可以优化代码的信息【例如变量类型、函数使用频率】）</li>
<li>优化编译器TruboFan根据上面收集的优化信息来编译出经过优化的机器码</li>
<li>如果收集了错误信息，会逆向将机器码回退成字节码，然后由解释器解释执行（例如sum函数求两数之和多次调用，用整型a,b，突然传入字符串和对象相加这时候机器码不知道如何处理就会进行deoptimizetion回退成字节码，由解释器解释执行）</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>新版本的优点：</p>
<ul>
<li>字节码生成速度远高于机器码，所以网页解析执行js速度更快。</li>
<li>生成优化机器码时，不需要重新编译。</li>
</ul>
</div>
<p><strong>V8使用的优化策略如下</strong></p>
<ul>
<li>函数声明但未使用不会解析生成为AST</li>
<li>如果函数只被调用一次，则字节码直接被解释执行，不会对其进行优化编译</li>
<li>函数被调用多次，可能被标记为热点函数，可能会被编译成优化后的机器代码</li>
</ul>
<h3 id="解释型语言和编译型语言的区别" tabindex="-1"><a class="header-anchor" href="#解释型语言和编译型语言的区别" aria-hidden="true">#</a> 解释型语言和编译型语言的区别</h3>
<p>解释型语言和编译型语言是两种不同的编程语言类型，它们在代码<strong>执行方式和性能方面</strong>有所区别。</p>
<p><strong>解释型语言</strong>：</p>
<ul>
<li>解释型语言的代码在运行之前不需要经过编译器的处理。代码逐行地由解释器读取并执行。</li>
<li>解释型语言的代码是一行一行地解释执行的，每行代码都会在运行时被解释器翻译成机器代码并立即执行。</li>
<li>解释型语言的优点是开发过程中更加灵活，可以快速进行开发和调试，因为无需等待编译过程。</li>
<li>但是，解释型语言在执行时需要实时翻译和解释代码，因此通常比编译型语言的执行速度较慢。</li>
</ul>
<p><strong>型语言</strong>：</p>
<ul>
<li>编译型语言的代码在运行之前需要经过编译器的处理。编译器将源代码一次性地转换成机器代码（或称为目标代码）。</li>
<li>编译过程将源代码转换成机器代码的输出文件，可以在以后的执行中直接被计算机处理，无需重新翻译。</li>
<li>编译型语言的执行速度通常比解释型语言更快，因为代码在运行之前已经被完全转换成机器代码。</li>
<li>编译型语言的缺点是开发过程中相对不够灵活，因为每次修改代码后都需要重新编译才能运行。</li>
</ul>
<p>总结：</p>
<ul>
<li>解释型语言在运行时逐行解释执行代码，开发灵活但执行速度相对较慢。</li>
<li>编译型语言在运行之前将代码转换成机器代码，执行速度较快但开发过程相对不够灵活。</li>
<li>选择使用哪种类型的语言取决于项目的需求，包括开发速度、执行速度和可移植性等方面的考虑。</li>
</ul>
<h3 id="字节码和机器码" tabindex="-1"><a class="header-anchor" href="#字节码和机器码" aria-hidden="true">#</a> 字节码和机器码</h3>
<p><strong>字节码：</strong></p>
<p>字节码（Bytecode）是一种中间表示形式，位于源代码和机器码之间。它是一种由特定虚拟机（如Java虚拟机）执行的低级指令集。</p>
<p>字节码通常是由源代码经过编译器转换生成的，它是一种平台无关的形式，可以在不同的硬件和操作系统上执行。字节码使用一组指令来描述源代码的操作和逻辑，并以二进制形式存储。</p>
<p>字节码相比于源代码和机器码更接近于高级编程语言，它的指令通常比机器码更简单易懂。字节码指令可以执行诸如赋值、算术运算、条件判断、循环等基本操作，以及调用函数、创建对象等高级操作。</p>
<p>字节码需要通过解释器或即时编译器（Just-In-Time Compiler）在运行时逐条解释或编译成机器码来执行。解释器逐条解释字节码指令并执行相应的操作，而即时编译器将字节码编译成机器码，然后执行编译后的机器码。字节码的执行方式取决于所使用的虚拟机及其实现。</p>
<p>字节码在跨平台和动态性方面具有优势。由于字节码是平台无关的，在不同的操作系统和硬件上都可以执行。此外，字节码的中间表示形式使得一些动态特性成为可能，例如动态类型检查、反射和动态加载等。</p>
<p>Java 虚拟机（JVM）是一个广为人知的使用字节码的例子。Java 源代码首先被编译为字节码，然后由 JVM 的解释器或即时编译器将字节码解释或编译成机器码，最终由计算机硬件执行。这种方式使得 Java 程序具有跨平台的能力。</p>
<p><strong>机器码：</strong></p>
<p>机器码（Machine Code）是一种由计算机硬件直接可以识别和执行的二进制指令集。它是最底层的指令形式，由CPU（中央处理器）直接执行。</p>
<p>机器码是特定于硬件平台的，不同的处理器和操作系统有不同的机器码格式。每个处理器都有其特定的指令集架构，机器码是按照该指令集架构编码的指令序列。</p>
<p>机器码指令是由一系列二进制位组成的，每个位对应于特定的硬件操作。例如，一个机器码指令可能用于将两个寄存器中的值相加，或者将数据从内存加载到寄存器中。</p>
<p>机器码的执行是由CPU直接执行的，CPU会按照指令的编码解析每条机器码指令，并执行相应的操作。CPU根据指令的操作码（opcode）来确定执行的具体操作，使用指令中的操作数（operand）来获取操作所需的数据。</p>
<p>由于机器码是直接操作底层硬件资源的指令集，它提供了最高的执行效率。机器码的执行速度较快，因为它是硬件平台的本地指令，可以直接与底层硬件交互。</p>
<p>机器码通常是由汇编器将汇编语言程序转换生成的。汇编语言是一种与机器码一一对应的文本表示形式，使用助记符和符号来代表不同的机器码指令。汇编器将汇编语言程序转换成机器码，使得程序可以直接在计算机硬件上执行。</p>
<p>总结起来，机器码是计算机硬件直接可以识别和执行的二进制指令集，它是最底层的指令形式。与高级编程语言和字节码相比，机器码更接近硬件操作，提供了最高的执行效率。</p>
<CommentService/></div></template>


