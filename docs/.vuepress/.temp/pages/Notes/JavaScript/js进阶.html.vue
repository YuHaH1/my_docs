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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><CommentService/></div></template>


