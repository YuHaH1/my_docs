import{_ as s,M as a,p as t,q as p,N as e,a1 as o}from"./framework-5866ffd3.js";const c={},i=o(`<h1 id="响应式原理" tabindex="-1"><a class="header-anchor" href="#响应式原理" aria-hidden="true">#</a> 响应式原理</h1><h2 id="_1-vue2" tabindex="-1"><a class="header-anchor" href="#_1-vue2" aria-hidden="true">#</a> 1.Vue2</h2><h3 id="数组的响应式" tabindex="-1"><a class="header-anchor" href="#数组的响应式" aria-hidden="true">#</a> 数组的响应式</h3><p>重写数组方法</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Observer</span><span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 防止进入死循环，让其不可枚举，防止walk一直劫持</span>
        Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span><span class="token string">&quot;__ob__&quot;</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
            <span class="token literal-property property">value</span><span class="token operator">:</span><span class="token keyword">this</span><span class="token punctuation">,</span>
            <span class="token literal-property property">enumerable</span><span class="token operator">:</span><span class="token boolean">false</span>
        <span class="token punctuation">}</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">isArray</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">observerArray</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">,</span><span class="token function">walk</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">observerArray</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		data<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token function">Observe</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token function">walk</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   		Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token function">defineReactive</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span>key<span class="token punctuation">,</span>data<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">defineReactive</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>value</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">observer</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    Object<span class="token punctuation">.</span><span class="token function">definedProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span><span class="token punctuation">{</span>
        <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> value
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token function">set</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>newValue <span class="token operator">===</span> value <span class="token punctuation">)</span><span class="token keyword">return</span> 
            <span class="token function">observe</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span>
            value <span class="token operator">=</span> newValue
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>	
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">proxy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span>key<span class="token punctuation">,</span><span class="token punctuation">{</span>
        <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> vm<span class="token punctuation">[</span>target<span class="token punctuation">]</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">observe</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> data<span class="token operator">!==</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">||</span> data<span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
       <span class="token keyword">return</span> 
   <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Observer</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">enhanceArrayMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> originArrayprototype <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype
    	<span class="token keyword">let</span> newArrayPrototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>originArrayprototype<span class="token punctuation">)</span>
        <span class="token keyword">const</span> methods <span class="token operator">=</span> <span class="token punctuation">[</span>
            <span class="token string">&#39;push&#39;</span><span class="token punctuation">,</span>
            <span class="token string">&#39;shift&#39;</span><span class="token punctuation">,</span>
            <span class="token string">&#39;unshift&#39;</span><span class="token punctuation">,</span>
            <span class="token string">&#39;splice&#39;</span><span class="token punctuation">,</span>
            <span class="token string">&#39;sort&#39;</span><span class="token punctuation">,</span>
            <span class="token string">&#39;reverse&#39;</span><span class="token punctuation">,</span>
            <span class="token string">&#39;pop&#39;</span>
        <span class="token punctuation">]</span>
        methods<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">method</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
			newArrayPrototype<span class="token punctuation">[</span>method<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">const</span> result <span class="token operator">=</span> originArrayprototype<span class="token punctuation">[</span>method<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span><span class="token operator">...</span>args<span class="token punctuation">)</span>
               <span class="token comment">// 对新增数据进行劫持</span>
                <span class="token keyword">let</span> inserted 
                <span class="token keyword">switch</span><span class="token punctuation">(</span>method<span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token keyword">case</span> <span class="token string">&#39;push&#39;</span><span class="token operator">:</span>
                    <span class="token keyword">case</span> <span class="token string">&#39;unshift&#39;</span><span class="token operator">:</span>
                        inserted <span class="token operator">=</span> args
                    <span class="token keyword">case</span> <span class="token string">&#39;splice&#39;</span><span class="token operator">:</span>
                        inserted <span class="token operator">=</span> args<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>inserted<span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token comment">// 为了给新增的数据进行劫持需要拿到Observer的实例对象身上的方法，因此需要给this身上加上__ob__为Observer实例</span>
                    __ob__<span class="token punctuation">.</span><span class="token function">observerArray</span><span class="token punctuation">(</span>inserted<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> result 
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function l(u,r){const n=a("CommentService");return t(),p("div",null,[i,e(n)])}const d=s(c,[["render",l],["__file","响应式原理.html.vue"]]);export{d as default};
