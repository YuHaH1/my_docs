<template><div><ol>
<li>
<p>typeof 取对象身上的类型</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    job<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span><span class="token number">18</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">p</span> <span class="token operator">=</span> <span class="token keyword">typeof</span> person
<span class="token operator">-</span><span class="token operator">>></span>
<span class="token keyword">type</span> <span class="token class-name">p</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    job<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>keyof取一个类型的属性明作为一个联合类型</p>
<ol>
<li>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    job<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">18</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">p</span> <span class="token operator">=</span> <span class="token keyword">typeof</span> person
<span class="token keyword">type</span> <span class="token class-name">k</span> <span class="token operator">=</span> <span class="token keyword">keyof</span> p 
<span class="token operator">--</span>》》
<span class="token keyword">type</span> <span class="token class-name">k</span> <span class="token operator">=</span> <span class="token string">"name"</span> <span class="token operator">|</span> <span class="token string">"job"</span> <span class="token operator">|</span> <span class="token string">"age"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</li>
<li>
<p>Partial将传入的泛型中每个属性都变成可选属性</p>
<ol>
<li>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>源码
<span class="token keyword">type</span> <span class="token class-name">Par<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">?</span><span class="token operator">:</span><span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>



<span class="token keyword">interface</span> <span class="token class-name">person</span>  <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    job<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">a</span> <span class="token operator">=</span> Partial<span class="token operator">&lt;</span>person<span class="token operator">></span>
<span class="token operator">-</span>》》
<span class="token keyword">type</span> <span class="token class-name">a</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
    job<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
    age<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</li>
<li>
<p>Pick在传入泛型T中筛选出指定属性K的类型</p>
<ol>
<li>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>源码
<span class="token keyword">type</span> <span class="token class-name">Pick<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span><span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token constant">K</span><span class="token punctuation">]</span><span class="token operator">:</span><span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">person</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    job<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">pick</span> <span class="token operator">=</span> Pick<span class="token operator">&lt;</span>person<span class="token punctuation">,</span> <span class="token string">'age'</span><span class="token operator">></span>
——》》
<span class="token keyword">interface</span> <span class="token class-name">person</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    job<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</li>
<li>
<p>Record将泛型K作为属性名（K可是联合类型） T作为属性类型</p>
<ol>
<li>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Record<span class="token operator">&lt;</span><span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token builtin">any</span><span class="token punctuation">,</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token constant">K</span><span class="token punctuation">]</span><span class="token operator">:</span><span class="token constant">T</span>
<span class="token punctuation">}</span>
<span class="token keyword">keyof</span> <span class="token builtin">any</span> <span class="token operator">=</span> <span class="token operator">-</span><span class="token operator">>>></span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token builtin">symbol</span>

<span class="token keyword">interface</span> <span class="token class-name">person</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    job<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">human</span> <span class="token operator">=</span> <span class="token string">'name'</span> <span class="token operator">|</span> <span class="token string">'job'</span>
<span class="token keyword">type</span> <span class="token class-name">record</span> <span class="token operator">=</span> Record<span class="token operator">&lt;</span>human<span class="token punctuation">,</span> person<span class="token operator">></span>
<span class="token keyword">type</span> <span class="token class-name">record</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> person<span class="token punctuation">;</span>
    job<span class="token operator">:</span> person<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</li>
<li>
<p>Readonly将传入的泛型全部属性变成只读</p>
<ol>
<li>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Readonly<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token keyword">readonly</span> <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">:</span><span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">person</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    job<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token keyword">readonly</span></span> <span class="token operator">=</span> Readonly<span class="token operator">&lt;</span>person<span class="token operator">></span>
<span class="token operator">--</span><span class="token operator">-</span><span class="token operator">></span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token keyword">readonly</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token keyword">readonly</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    <span class="token keyword">readonly</span> job<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    <span class="token keyword">readonly</span> age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</li>
<li>
<p>infer：如果传入泛型T是数组类型就取数组元素的类型否则传入什么类型返回什么类型</p>
<ol>
<li>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name"><span class="token constant">TYPE</span><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token keyword">infer</span> <span class="token constant">U</span><span class="token operator">></span></span> <span class="token operator">?</span> <span class="token constant">U</span> <span class="token operator">:</span> <span class="token constant">T</span>
<span class="token keyword">type</span> <span class="token class-name">t</span> <span class="token operator">=</span> <span class="token constant">TYPE</span><span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token builtin">number</span><span class="token operator">|</span><span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</li>
</ol>
<CommentService/></div></template>


