import{_ as n,p as s,q as a,a1 as e}from"./framework-5866ffd3.js";const p="/Sass/for_each.png",t="/Sass/mixin_include.gif",c={},o=e(`<h1 id="sass" tabindex="-1"><a class="header-anchor" href="#sass" aria-hidden="true">#</a> Sass</h1><h2 id="_1、-extend" tabindex="-1"><a class="header-anchor" href="#_1、-extend" aria-hidden="true">#</a> 1、@extend</h2><p>一个元素使用的样式与另一个元素完全相同，但又添加了额外的样式。</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.a</span><span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> greenyellow<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token selector">.b</span><span class="token punctuation">{</span>
        <span class="token keyword">@extend</span> .a<span class="token punctuation">;</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> orangered<span class="token punctuation">;</span><span class="token comment">//覆盖.a继承来的背景色</span>
<span class="token punctuation">}</span>
<span class="token selector">结果-》
.b[data-v-5d9daadb] </span><span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> orangered<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">&lt;style&gt;
.a[data-v-5d9daadb], .b[data-v-5d9daadb] </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> greenyellow<span class="token punctuation">;</span>--这个被覆盖掉
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、-if-else-if-else" tabindex="-1"><a class="header-anchor" href="#_2、-if-else-if-else" aria-hidden="true">#</a> 2、@if @else if @else</h2><p>当 <code>@if</code> 的表达式返回值不是 <code>false</code> 或者 <code>null</code> 时，条件成立，输出 <code>{}</code> 内的代码：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">p </span><span class="token punctuation">{</span>
  <span class="token keyword">@if</span> <span class="token selector">1 + 1 == 2 </span><span class="token punctuation">{</span> <span class="token property">border</span><span class="token punctuation">:</span> 1px solid<span class="token punctuation">;</span> <span class="token punctuation">}</span>
  <span class="token keyword">@if</span> <span class="token selector">5 &lt; 3 </span><span class="token punctuation">{</span> <span class="token property">border</span><span class="token punctuation">:</span> 2px dotted<span class="token punctuation">;</span> <span class="token punctuation">}</span>
  <span class="token keyword">@if</span> <span class="token selector">null  </span><span class="token punctuation">{</span> <span class="token property">border</span><span class="token punctuation">:</span> 3px double<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token selector">-》
p </span><span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
if else if else
<span class="token property"><span class="token variable">$type</span></span><span class="token punctuation">:</span> monster<span class="token punctuation">;</span>
<span class="token selector">p </span><span class="token punctuation">{</span>
  <span class="token keyword">@if</span> <span class="token selector"><span class="token variable">$type</span> == ocean </span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">@else if</span> <span class="token selector"><span class="token variable">$type</span> == matador </span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">@else if</span> <span class="token selector"><span class="token variable">$type</span> == monster </span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">@else</span> <span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> black<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token selector">p </span><span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、循环-for-while" tabindex="-1"><a class="header-anchor" href="#_3、循环-for-while" aria-hidden="true">#</a> 3、循环@for @while</h2><blockquote><h5 id="for" tabindex="-1"><a class="header-anchor" href="#for" aria-hidden="true">#</a> @for</h5></blockquote><p><code>@for</code> 指令可以在限制的范围内重复输出格式，每次按要求（变量的值）对输出结果做出变动。这个指令包含两种格式：<code>@for $var from &lt;start&gt; through &lt;end&gt;</code>，或者 <code>@for $var from &lt;start&gt; to &lt;end&gt;</code>，区别在于 <code>through</code> 与 <code>to</code> 的含义：<em>当使用 <code>through</code> 时，条件范围包含 <code>&lt;start&gt;</code> 与 <code>&lt;end&gt;</code> 的值，而使用 <code>to</code> 时条件范围只包含 <code>&lt;start&gt;</code> 的值不包含 <code>&lt;end&gt;</code> 的值</em>。另外，<code>$var</code> 可以是任何变量，比如 <code>$i</code>；<code>&lt;start&gt;</code> 和 <code>&lt;end&gt;</code> 必须是整数值。</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@for</span> <span class="token variable">$i</span> <span class="token keyword">from</span> 1 <span class="token keyword">through</span> <span class="token selector">3 </span><span class="token punctuation">{</span>
  <span class="token selector">.item-<span class="token variable">#{$i}</span> </span><span class="token punctuation">{</span> <span class="token property">width</span><span class="token punctuation">:</span> 2em <span class="token operator">*</span> <span class="token variable">$i</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token selector">.item-1 </span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 2em<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">.item-2 </span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 4em<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">.item-3 </span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 6em<span class="token punctuation">;</span> <span class="token punctuation">}</span>
这里的i 1 2 3 。如果使用from  to 这里的i 就是1 2 不包含end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h5 id="while" tabindex="-1"><a class="header-anchor" href="#while" aria-hidden="true">#</a> @while</h5></blockquote><p><code>@while</code> 指令重复输出格式直到表达式返回结果为 <code>false</code>。这样可以实现比 <code>@for</code> 更复杂的循环，只是很少会用到。例如：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$i</span></span><span class="token punctuation">:</span> 6<span class="token punctuation">;</span>
<span class="token keyword">@while</span> <span class="token selector"><span class="token variable">$i</span> &gt; 0 </span><span class="token punctuation">{</span>
  <span class="token selector">.item-<span class="token variable">#{$i}</span> </span><span class="token punctuation">{</span> <span class="token property">width</span><span class="token punctuation">:</span> 2em <span class="token operator">*</span> <span class="token variable">$i</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
  <span class="token property"><span class="token variable">$i</span></span><span class="token punctuation">:</span> <span class="token variable">$i</span> <span class="token operator">-</span> 2<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.item-6 </span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 12em<span class="token punctuation">;</span> <span class="token punctuation">}</span>

<span class="token selector">.item-4 </span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 8em<span class="token punctuation">;</span> <span class="token punctuation">}</span>

<span class="token selector">.item-2 </span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 4em<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4、-each" tabindex="-1"><a class="header-anchor" href="#_4、-each" aria-hidden="true">#</a> 4、@each</h2><p>each相当于for in，能够遍历一个列表。</p><p><code>@each</code> 指令的格式是 <code>$var in &lt;list&gt;</code>, <code>$var</code> 可以是任何变量名，比如 <code>$length</code> 或者 <code>$name</code>，而 <code>&lt;list&gt;</code> 是一连串的值，也就是值列表。</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@each</span> <span class="token selector"><span class="token variable">$var</span> in -1,-2,-3</span><span class="token punctuation">{</span>
    <span class="token selector">.item<span class="token variable">#{$var}</span></span><span class="token punctuation">{</span>
        <span class="token property">color</span><span class="token punctuation">:</span>red<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
这里的<span class="token variable">$var</span> 就是-1 -2 -3

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+p+`" alt=""></p><h2 id="_5、mixin混合-include引入混合" tabindex="-1"><a class="header-anchor" href="#_5、mixin混合-include引入混合" aria-hidden="true">#</a> 5、<strong><u>Mixin混合</u></strong> @include引入混合</h2><p>混合指令（Mixin）用于定义可重复使用的样式，避免了使用无语意的 class，比如 <code>.float-left</code>。混合指令可以包含所有的 CSS 规则，绝大部分 Sass 规则，甚至通过参数功能引入变量，输出多样化的样式。</p><p>使用 <code>@include</code> 指令引用混合样式，格式是在其后添加混合名称，以及需要的参数（可选）：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@mixin</span> <span class="token selector">center_hover</span><span class="token punctuation">{</span>
    <span class="token selector"><span class="token parent important">&amp;</span>:hover</span><span class="token punctuation">{</span>
        <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
        <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token property">align-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token property">color</span><span class="token punctuation">:</span> yellow<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
 <span class="token selector">.a</span><span class="token punctuation">{</span>
        <span class="token keyword">@include</span> center_<span class="token function">hover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> greenyellow<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.b</span><span class="token punctuation">{</span>
        <span class="token keyword">@extend</span> .a<span class="token punctuation">;</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> orangered<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+t+`" alt=""></p><h3 id="_5-1、混入传参" tabindex="-1"><a class="header-anchor" href="#_5-1、混入传参" aria-hidden="true">#</a> 5.1、混入传参</h3><p>参数用于给混合指令中的样式设定变量，并且赋值使用。在定义混合指令的时候，按照变量的格式，通过逗号分隔，将参数写进圆括号里。引用指令时，按照参数的顺序，再将所赋的值对应写进括号：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@mixin</span> center_<span class="token function">hover</span><span class="token punctuation">(</span><span class="token variable">$bgc</span><span class="token punctuation">,</span><span class="token variable">$tx</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token selector"><span class="token parent important">&amp;</span>:hover</span><span class="token punctuation">{</span>
        <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
        <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token property">align-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$bgc</span><span class="token punctuation">;</span>
        <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateX</span><span class="token punctuation">(</span><span class="token variable">$tx</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token selector">.a</span><span class="token punctuation">{</span>
        <span class="token keyword">@include</span> center_<span class="token function">hover</span><span class="token punctuation">(</span>gray<span class="token punctuation">,</span>10px<span class="token punctuation">)</span><span class="token punctuation">;</span>
    	也可以写成关键词参数 <span class="token keyword">@include</span> center_<span class="token function">hover</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$bgc</span></span><span class="token punctuation">:</span>gray<span class="token punctuation">,</span><span class="token property"><span class="token variable">$tx</span></span><span class="token punctuation">:</span>10px<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> greenyellow<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.b</span><span class="token punctuation">{</span>
        <span class="token keyword">@extend</span> .a<span class="token punctuation">;</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> orangered<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2、向混入中导入内容-content" tabindex="-1"><a class="header-anchor" href="#_5-2、向混入中导入内容-content" aria-hidden="true">#</a> 5.2、向混入中导入内容@content</h3><p><u>类似于插槽</u></p><p>在引用混合样式的时候，可以先将一段代码导入到混合指令中，然后再输出混合样式，额外导入的部分将出现在 <code>@content</code> 标志的地方：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@mixin</span> content_<span class="token function">margin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">@content</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">@include</span> <span class="token selector">content_margin</span><span class="token punctuation">{</span>
    <span class="token selector">.a</span><span class="token punctuation">{</span>
        <span class="token property">margin</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
 <span class="token selector">.a</span><span class="token punctuation">{</span>
        <span class="token keyword">@include</span> content_<span class="token function">margin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6、函数指令-function" tabindex="-1"><a class="header-anchor" href="#_6、函数指令-function" aria-hidden="true">#</a> 6、函数指令@function</h2><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@function</span> computed_<span class="token function">width</span><span class="token punctuation">(</span><span class="token variable">$n</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">@return</span> <span class="token variable">$n</span>*100px 
<span class="token punctuation">}</span>

 <span class="token property">width</span><span class="token punctuation">:</span> computed_<span class="token function">width</span><span class="token punctuation">(</span>7<span class="token punctuation">)</span><span class="token punctuation">;</span> -&gt;700px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7、关键词" tabindex="-1"><a class="header-anchor" href="#_7、关键词" aria-hidden="true">#</a> 7、关键词</h2><h3 id="_7-1、插值语句" tabindex="-1"><a class="header-anchor" href="#_7-1、插值语句" aria-hidden="true">#</a> 7.1、插值语句<code>#{}</code></h3><p><code>#{}</code>插值语句：通过 <code>#{}</code> 插值语句可以在选择器或属性名中使用变量：</p><ol><li><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$name</span></span><span class="token punctuation">:</span> foo<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$attr</span></span><span class="token punctuation">:</span> border<span class="token punctuation">;</span>
<span class="token selector">p.<span class="token variable">#{$name}</span> </span><span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">#{$attr}</span>-color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="_7-2、父级元素选择器" tabindex="-1"><a class="header-anchor" href="#_7-2、父级元素选择器" aria-hidden="true">#</a> 7.2、父级元素选择器&amp;</h3><p>&amp;<code>参考当前元素的父元素选择器，当父元素不存在</code>&amp;\`将为null</p><p>如果父元素是<code>a</code>,下面代码就是<code>a:hover</code></p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector"><span class="token parent important">&amp;</span>:hover</span><span class="token punctuation">{</span>
	<span class="token property">color</span><span class="token punctuation">:</span>red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,41),i=[o];function l(u,d){return s(),a("div",null,i)}const k=n(c,[["render",l],["__file","grammar.html.vue"]]);export{k as default};
