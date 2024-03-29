<template><div><h1 id="设计模式" tabindex="-1"><a class="header-anchor" href="#设计模式" aria-hidden="true">#</a> 设计模式</h1>
<p>23中设计模式分了三个类型</p>
<ol>
<li>创建型 ——如何创建一个对象</li>
<li>结构性 ——如何灵活将对象<strong>组装</strong>成较大的结构</li>
<li>行为型 ——负责对象之间高效通信和职责划分</li>
</ol>
<h2 id="前端场景下的设计模式" tabindex="-1"><a class="header-anchor" href="#前端场景下的设计模式" aria-hidden="true">#</a> 前端场景下的设计模式</h2>
<h2 id="浏览器中的设计模式" tabindex="-1"><a class="header-anchor" href="#浏览器中的设计模式" aria-hidden="true">#</a> 浏览器中的设计模式</h2>
<h3 id="_1-单例模式" tabindex="-1"><a class="header-anchor" href="#_1-单例模式" aria-hidden="true">#</a> 1.单例模式</h3>
<p>单例模式就是一个全局唯一访问的对象，在任何地方访问都是同一个对象，例如window，Vuex</p>
<p><strong>应用场景</strong>：全局缓存，全局状态管理</p>
<h3 id="_2-发布订阅模式" tabindex="-1"><a class="header-anchor" href="#_2-发布订阅模式" aria-hidden="true">#</a> 2.发布订阅模式</h3>
<p>一种订阅机制，可以在被订阅对象发生变化时通知订阅者</p>
<p><strong>应用场景</strong>：从系统架构之间解耦，到业务中一些实现模式，像邮件订阅，用户上线订阅等</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Notify</span> <span class="token operator">=</span> <span class="token punctuation">(</span>user<span class="token operator">:</span>User<span class="token punctuation">)</span><span class="token operator">=></span><span class="token keyword">void</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">User</span><span class="token punctuation">{</span>
    name<span class="token operator">:</span><span class="token builtin">string</span>
    status<span class="token operator">:</span><span class="token string">"offline"</span><span class="token operator">|</span><span class="token string">"online"</span>
    followers<span class="token operator">:</span><span class="token punctuation">{</span>user<span class="token operator">:</span>User<span class="token punctuation">;</span>notify<span class="token operator">:</span>Notify<span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span>name<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
        <span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token string">"offline"</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>followers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    <span class="token function">subscribe</span><span class="token punctuation">(</span>user<span class="token operator">:</span>User<span class="token punctuation">,</span>notify<span class="token operator">:</span>Notify<span class="token punctuation">)</span><span class="token punctuation">{</span>
        user<span class="token punctuation">.</span>followers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>user<span class="token punctuation">,</span>notify<span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token function">online</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token string">"online"</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>followers<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span>notify<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
            <span class="token function">notify</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="js设计模式" tabindex="-1"><a class="header-anchor" href="#js设计模式" aria-hidden="true">#</a> JS设计模式</h2>
<h3 id="原型模式" tabindex="-1"><a class="header-anchor" href="#原型模式" aria-hidden="true">#</a> 原型模式</h3>
<p>定义：复制已有对象来创建新对象</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> baseUser <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span><span class="token string">''</span><span class="token punctuation">,</span>
    status<span class="token operator">:</span><span class="token string">"offline"</span><span class="token punctuation">,</span>
    followers<span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

    <span class="token function">subscribe</span><span class="token punctuation">(</span>user<span class="token punctuation">,</span>notify<span class="token punctuation">)</span><span class="token punctuation">{</span>
        user<span class="token punctuation">.</span>followers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>user<span class="token punctuation">,</span>notify<span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">online</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token string">"online"</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>followers<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span>notify<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
            <span class="token function">notify</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">createUser</span> <span class="token operator">=</span> <span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// baseUser将作为创建对象的原型</span>
    <span class="token keyword">const</span> user <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>baseUser<span class="token punctuation">)</span>
    user<span class="token punctuation">.</span>name <span class="token operator">=</span> name
    user<span class="token punctuation">.</span>followers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">return</span> user
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="代理模式" tabindex="-1"><a class="header-anchor" href="#代理模式" aria-hidden="true">#</a> 代理模式</h3>
<p>可有自定义控制对元对象的访问和写入方式，并允许在更新前后做一些额外处理。</p>
<p><strong>应用场景</strong>：监控（错误监控）前端框架Vue</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">createProxyUser</span> <span class="token operator">=</span> <span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> proxyUser <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>user<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token punctuation">(</span>target<span class="token punctuation">,</span> prop<span class="token operator">:</span> <span class="token keyword">keyof</span> UserActivation<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            target<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> value<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>prop <span class="token operator">===</span> <span class="token string">'status'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">notifyStatusHandlers</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> notifyStatusHandlers <span class="token operator">=</span> <span class="token punctuation">(</span>user<span class="token operator">:</span> User<span class="token punctuation">,</span> status<span class="token operator">:</span> <span class="token string">"online"</span> <span class="token operator">|</span> <span class="token string">"offline"</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>status <span class="token operator">===</span> <span class="token string">"online"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
            user<span class="token punctuation">.</span>followers<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span> notify <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token function">notify</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代理用户上线的行为逻辑</p>
<h3 id="迭代器模式" tabindex="-1"><a class="header-anchor" href="#迭代器模式" aria-hidden="true">#</a> 迭代器模式</h3>
<p>在不暴露数据类型的情况下，访问集合中的数据</p>
<p>例子：树形结构的迭代器</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>先序遍历的一种迭代器方式
<span class="token keyword">class</span> <span class="token class-name">DomElement</span> <span class="token punctuation">{</span>
    tag<span class="token operator">:</span> <span class="token builtin">string</span>
    children<span class="token operator">:</span> DomElement<span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span>tag<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>tag <span class="token operator">=</span> tag
        <span class="token keyword">this</span><span class="token punctuation">.</span>children <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    <span class="token function">addChildren</span><span class="token punctuation">(</span>component<span class="token operator">:</span> DomElement<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>component<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>children<span class="token punctuation">]</span>
        <span class="token keyword">let</span> node 
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
            <span class="token function-variable function">next</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>node <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    node<span class="token punctuation">.</span>children<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> list<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">...</span>node<span class="token punctuation">.</span>children<span class="token punctuation">)</span>
                    <span class="token keyword">return</span> <span class="token punctuation">{</span>value<span class="token operator">:</span>node<span class="token punctuation">,</span>done<span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> <span class="token punctuation">{</span>value<span class="token operator">:</span><span class="token keyword">null</span><span class="token punctuation">,</span>done<span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><CommentService/></div></template>


