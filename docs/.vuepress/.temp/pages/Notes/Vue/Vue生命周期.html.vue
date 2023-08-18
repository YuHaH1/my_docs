<template><div><h1 id="vue生命周期" tabindex="-1"><a class="header-anchor" href="#vue生命周期" aria-hidden="true">#</a> Vue生命周期</h1>
<h2 id="vue2生命周期" tabindex="-1"><a class="header-anchor" href="#vue2生命周期" aria-hidden="true">#</a> Vue2生命周期</h2>
<p>Vue的生命周期初始化在initMixin中完成</p>
<p>src/core/instancec/init.ts</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initMixin</span><span class="token punctuation">(</span>Vue<span class="token operator">:</span> <span class="token keyword">typeof</span> Component<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Vue<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">_init</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>options<span class="token operator">?</span><span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> vm<span class="token operator">:</span> Component <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token comment">// a uid</span>
    vm<span class="token punctuation">.</span>_uid <span class="token operator">=</span> uid<span class="token operator">++</span>

    <span class="token keyword">let</span> startTag<span class="token punctuation">,</span> endTag
    <span class="token comment">/* istanbul ignore if */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__ <span class="token operator">&amp;&amp;</span> config<span class="token punctuation">.</span>performance <span class="token operator">&amp;&amp;</span> mark<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      startTag <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vue-perf-start:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>vm<span class="token punctuation">.</span>_uid<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
      endTag <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vue-perf-end:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>vm<span class="token punctuation">.</span>_uid<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
      <span class="token function">mark</span><span class="token punctuation">(</span>startTag<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// a flag to mark this as a Vue instance without having to do instanceof</span>
    <span class="token comment">// check</span>
    vm<span class="token punctuation">.</span>_isVue <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token comment">// avoid instances from being observed</span>
    vm<span class="token punctuation">.</span>__v_skip <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token comment">// effect scope</span>
    vm<span class="token punctuation">.</span>_scope <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EffectScope</span><span class="token punctuation">(</span><span class="token boolean">true</span> <span class="token comment">/* detached */</span><span class="token punctuation">)</span>
    vm<span class="token punctuation">.</span>_scope<span class="token punctuation">.</span>_vm <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token comment">// merge options</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>options <span class="token operator">&amp;&amp;</span> options<span class="token punctuation">.</span>_isComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// optimize internal component instantiation</span>
      <span class="token comment">// since dynamic options merging is pretty slow, and none of the</span>
      <span class="token comment">// internal component options needs special treatment.</span>
      <span class="token function">initInternalComponent</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> options <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      vm<span class="token punctuation">.</span>$options <span class="token operator">=</span> <span class="token function">mergeOptions</span><span class="token punctuation">(</span>
        <span class="token function">resolveConstructorOptions</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>constructor <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        options <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        vm
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">/* istanbul ignore else */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">initProxy</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      vm<span class="token punctuation">.</span>_renderProxy <span class="token operator">=</span> vm
    <span class="token punctuation">}</span>
    <span class="token comment">// expose real self</span>
    vm<span class="token punctuation">.</span>_self <span class="token operator">=</span> vm
    <span class="token function">initLifecycle</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
    <span class="token function">initEvents</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
    <span class="token function">initRender</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
    <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">'beforeCreate'</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token boolean">false</span> <span class="token comment">/* setContext */</span><span class="token punctuation">)</span>
    <span class="token function">initInjections</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span> <span class="token comment">// resolve injections before data/props</span>
    <span class="token function">initState</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
    <span class="token function">initProvide</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span> <span class="token comment">// resolve provide after data/props</span>
    <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">'created'</span><span class="token punctuation">)</span>

    <span class="token comment">/* istanbul ignore if */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__ <span class="token operator">&amp;&amp;</span> config<span class="token punctuation">.</span>performance <span class="token operator">&amp;&amp;</span> mark<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      vm<span class="token punctuation">.</span>_name <span class="token operator">=</span> <span class="token function">formatComponentName</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
      <span class="token function">mark</span><span class="token punctuation">(</span>endTag<span class="token punctuation">)</span>
      <span class="token function">measure</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vue </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>vm<span class="token punctuation">.</span>_name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> init</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> startTag<span class="token punctuation">,</span> endTag<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>el<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      vm<span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>el<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>先初始化生命周期的基本配置</p>
<ul>
<li>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>  vm<span class="token punctuation">.</span>_watcher <span class="token operator">=</span> <span class="token keyword">null</span>
  vm<span class="token punctuation">.</span>_inactive <span class="token operator">=</span> <span class="token keyword">null</span>
  vm<span class="token punctuation">.</span>_directInactive <span class="token operator">=</span> <span class="token boolean">false</span>
  vm<span class="token punctuation">.</span>_isMounted <span class="token operator">=</span> <span class="token boolean">false</span>
  vm<span class="token punctuation">.</span>_isDestroyed <span class="token operator">=</span> <span class="token boolean">false</span>
  vm<span class="token punctuation">.</span>_isBeingDestroyed <span class="token operator">=</span> <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>初始化事件，收集<code v-pre>onClick</code>例如这样的事件</p>
</li>
<li>
<p>初始化<code v-pre>Render</code>，给每个组件绑定好各自的上下文</p>
</li>
<li>
<p>调用<code v-pre>beforeCreate</code>钩子</p>
</li>
<li>
<p>初始化注入，给注入的数据变成响应式，</p>
<ul>
<li>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initInjections</span><span class="token punctuation">(</span>vm<span class="token operator">:</span> Component<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">resolveInject</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>inject<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">toggleObserving</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
    Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>key <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">/* istanbul ignore else */</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">defineReactive</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> key<span class="token punctuation">,</span> result<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token function">warn</span><span class="token punctuation">(</span>
            <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Avoid mutating an injected value directly since the changes will be </span><span class="token template-punctuation string">`</span></span> <span class="token operator">+</span>
              <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">overwritten whenever the provided component re-renders. </span><span class="token template-punctuation string">`</span></span> <span class="token operator">+</span>
              <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">injection being mutated: "</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
            vm
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">defineReactive</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> key<span class="token punctuation">,</span> result<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">toggleObserving</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>toggleObserving(false)</code>避免被观察进行响应式代理，对于注入的数据只需要<code v-pre>definedReactive</code>，不会挂载<code v-pre>Observer</code>实例</p>
</li>
<li>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code> <span class="token keyword">if</span> <span class="token punctuation">(</span>
    shouldObserve <span class="token operator">&amp;&amp;</span>
    <span class="token punctuation">(</span>ssrMockReactivity <span class="token operator">||</span> <span class="token operator">!</span><span class="token function">isServerRendering</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    <span class="token punctuation">(</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">isPlainObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    Object<span class="token punctuation">.</span><span class="token function">isExtensible</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    <span class="token operator">!</span>value<span class="token punctuation">.</span>__v_skip <span class="token comment">/* ReactiveFlags.SKIP */</span> <span class="token operator">&amp;&amp;</span>
    <span class="token operator">!</span><span class="token function">isRef</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    <span class="token operator">!</span><span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">VNode</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Observer</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> shallow<span class="token punctuation">,</span> ssrMockReactivity<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>初始化状态，这里会初始化<code v-pre>props</code>、<code v-pre>methods</code>、<code v-pre>computed</code>、<code v-pre>watch</code>等选项</p>
<ul>
<li>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initState</span><span class="token punctuation">(</span>vm<span class="token operator">:</span> Component<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> opts <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options
  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>props<span class="token punctuation">)</span> <span class="token function">initProps</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>props<span class="token punctuation">)</span>

  <span class="token comment">// Composition API</span>
  <span class="token function">initSetup</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>methods<span class="token punctuation">)</span> <span class="token function">initMethods</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>methods<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">initData</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> ob <span class="token operator">=</span> <span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>_data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    ob <span class="token operator">&amp;&amp;</span> ob<span class="token punctuation">.</span>vmCount<span class="token operator">++</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>computed<span class="token punctuation">)</span> <span class="token function">initComputed</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>computed<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>watch <span class="token operator">&amp;&amp;</span> opts<span class="token punctuation">.</span>watch <span class="token operator">!==</span> nativeWatch<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">initWatch</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>watch<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>初始化生产者，</p>
<ul>
<li>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initProvide</span><span class="token punctuation">(</span>vm<span class="token operator">:</span> Component<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> provideOption <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>provide
  <span class="token keyword">if</span> <span class="token punctuation">(</span>provideOption<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> provided <span class="token operator">=</span> <span class="token function">isFunction</span><span class="token punctuation">(</span>provideOption<span class="token punctuation">)</span>
      <span class="token operator">?</span> <span class="token function">provideOption</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
      <span class="token operator">:</span> provideOption
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isObject</span><span class="token punctuation">(</span>provided<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> source <span class="token operator">=</span> <span class="token function">resolveProvided</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
    <span class="token comment">// IE9 doesn't support Object.getOwnPropertyDescriptors so we have to</span>
    <span class="token comment">// iterate the keys ourselves.</span>
    <span class="token keyword">const</span> keys <span class="token operator">=</span> hasSymbol <span class="token operator">?</span> Reflect<span class="token punctuation">.</span><span class="token function">ownKeys</span><span class="token punctuation">(</span>provided<span class="token punctuation">)</span> <span class="token operator">:</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>provided<span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> keys<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> key <span class="token operator">=</span> keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
      Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>
        source<span class="token punctuation">,</span>
        key<span class="token punctuation">,</span>
        Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>provided<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token operator">!</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>初始化完成调用<code v-pre>created</code>钩子</p>
</li>
<li>
<p>然后开始挂载调用vm.$mount</p>
<ul>
<li>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// public mount method</span>
Vue<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$mount</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>
  el<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> Element<span class="token punctuation">,</span>
  hydrating<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span>
<span class="token punctuation">)</span><span class="token operator">:</span> Component <span class="token punctuation">{</span>
  el <span class="token operator">=</span> el <span class="token operator">&amp;&amp;</span> inBrowser <span class="token operator">?</span> <span class="token function">query</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">undefined</span>
  <span class="token keyword">return</span> <span class="token function">mountComponent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> el<span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">mountComponent</span><span class="token punctuation">(</span>
  vm<span class="token operator">:</span> Component<span class="token punctuation">,</span>
  el<span class="token operator">:</span> Element <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
  hydrating<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span>
<span class="token punctuation">)</span><span class="token operator">:</span> Component <span class="token punctuation">{</span>
  vm<span class="token punctuation">.</span>$el <span class="token operator">=</span> el
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>render<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// @ts-expect-error invalid type</span>
    <span class="token class-name">vm</span><span class="token punctuation">.</span>$options<span class="token punctuation">.</span>render <span class="token operator">=</span> createEmptyVNode
    <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">/* istanbul ignore if */</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>
        <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>template <span class="token operator">&amp;&amp;</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>template<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token string">'#'</span><span class="token punctuation">)</span> <span class="token operator">||</span>
        vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>el <span class="token operator">||</span>
        el
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">warn</span><span class="token punctuation">(</span>
          <span class="token string">'You are using the runtime-only build of Vue where the template '</span> <span class="token operator">+</span>
            <span class="token string">'compiler is not available. Either pre-compile the templates into '</span> <span class="token operator">+</span>
            <span class="token string">'render functions, or use the compiler-included build.'</span><span class="token punctuation">,</span>
          vm
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">warn</span><span class="token punctuation">(</span>
          <span class="token string">'Failed to mount component: template or render function not defined.'</span><span class="token punctuation">,</span>
          vm
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">'beforeMount'</span><span class="token punctuation">)</span>

  <span class="token keyword">let</span> updateComponent
  <span class="token comment">/* istanbul ignore if */</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__ <span class="token operator">&amp;&amp;</span> config<span class="token punctuation">.</span>performance <span class="token operator">&amp;&amp;</span> mark<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">updateComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> name <span class="token operator">=</span> vm<span class="token punctuation">.</span>_name
      <span class="token keyword">const</span> id <span class="token operator">=</span> vm<span class="token punctuation">.</span>_uid
      <span class="token keyword">const</span> startTag <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vue-perf-start:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
      <span class="token keyword">const</span> endTag <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vue-perf-end:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>

      <span class="token function">mark</span><span class="token punctuation">(</span>startTag<span class="token punctuation">)</span>
      <span class="token keyword">const</span> vnode <span class="token operator">=</span> vm<span class="token punctuation">.</span><span class="token function">_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token function">mark</span><span class="token punctuation">(</span>endTag<span class="token punctuation">)</span>
      <span class="token function">measure</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vue </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> render</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> startTag<span class="token punctuation">,</span> endTag<span class="token punctuation">)</span>

      <span class="token function">mark</span><span class="token punctuation">(</span>startTag<span class="token punctuation">)</span>
      vm<span class="token punctuation">.</span><span class="token function">_update</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
      <span class="token function">mark</span><span class="token punctuation">(</span>endTag<span class="token punctuation">)</span>
      <span class="token function">measure</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vue </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> patch</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> startTag<span class="token punctuation">,</span> endTag<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">updateComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      vm<span class="token punctuation">.</span><span class="token function">_update</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span><span class="token function">_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> watcherOptions<span class="token operator">:</span> WatcherOptions <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function">before</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>_isMounted <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>vm<span class="token punctuation">.</span>_isDestroyed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">'beforeUpdate'</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    watcherOptions<span class="token punctuation">.</span><span class="token function-variable function">onTrack</span> <span class="token operator">=</span> e <span class="token operator">=></span> <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">'renderTracked'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>e<span class="token punctuation">]</span><span class="token punctuation">)</span>
    watcherOptions<span class="token punctuation">.</span><span class="token function-variable function">onTrigger</span> <span class="token operator">=</span> e <span class="token operator">=></span> <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">'renderTriggered'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>e<span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// we set this to vm._watcher inside the watcher's constructor</span>
  <span class="token comment">// since the watcher's initial patch may call $forceUpdate (e.g. inside child</span>
  <span class="token comment">// component's mounted hook), which relies on vm._watcher being already defined</span>
  <span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span>
    vm<span class="token punctuation">,</span>
    updateComponent<span class="token punctuation">,</span>
    noop<span class="token punctuation">,</span>
    watcherOptions<span class="token punctuation">,</span>
    <span class="token boolean">true</span> <span class="token comment">/* isRenderWatcher */</span>
  <span class="token punctuation">)</span>
  hydrating <span class="token operator">=</span> <span class="token boolean">false</span>

  <span class="token comment">// flush buffer for flush: "pre" watchers queued in setup()</span>
  <span class="token keyword">const</span> preWatchers <span class="token operator">=</span> vm<span class="token punctuation">.</span>_preWatchers
  <span class="token keyword">if</span> <span class="token punctuation">(</span>preWatchers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> preWatchers<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      preWatchers<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// manually mounted instance, call mounted on self</span>
  <span class="token comment">// mounted is called for render-created child components in its inserted hook</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>$vnode <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    vm<span class="token punctuation">.</span>_isMounted <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">'mounted'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> vm
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>我们可以看到在上面<code v-pre>$mount</code>的时候定义了一个<code v-pre>watcherOptions.before</code>函数，该函数会在更新之前触发</p>
<ul>
<li>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">flushSchedulerQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  currentFlushTimestamp <span class="token operator">=</span> <span class="token function">getNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  flushing <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token keyword">let</span> watcher<span class="token punctuation">,</span> id

	<span class="token comment">// 排序按组件顺序父-》子</span>
  queue<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>sortCompareFn<span class="token punctuation">)</span>

  <span class="token comment">// do not cache length because more watchers might be pushed</span>
  <span class="token comment">// as we run existing watchers</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span>index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> index <span class="token operator">&lt;</span> queue<span class="token punctuation">.</span>length<span class="token punctuation">;</span> index<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    watcher <span class="token operator">=</span> queue<span class="token punctuation">[</span>index<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>watcher<span class="token punctuation">.</span>before<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      watcher<span class="token punctuation">.</span><span class="token function">before</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    id <span class="token operator">=</span> watcher<span class="token punctuation">.</span>id
    has<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span>
    watcher<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// in dev build, check and stop circular updates.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__ <span class="token operator">&amp;&amp;</span> has<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      circular<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span>circular<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>circular<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">></span> <span class="token constant">MAX_UPDATE_COUNT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">warn</span><span class="token punctuation">(</span>
          <span class="token string">'You may have an infinite update loop '</span> <span class="token operator">+</span>
            <span class="token punctuation">(</span>watcher<span class="token punctuation">.</span>user
              <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">in watcher with expression "</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>watcher<span class="token punctuation">.</span>expression<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span><span class="token template-punctuation string">`</span></span>
              <span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">in a component render function.</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          watcher<span class="token punctuation">.</span>vm
        <span class="token punctuation">)</span>
        <span class="token keyword">break</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// keep copies of post queues before resetting state</span>
  <span class="token keyword">const</span> activatedQueue <span class="token operator">=</span> activatedChildren<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> updatedQueue <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token function">resetSchedulerState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token comment">// call component updated and activated hooks</span>
  <span class="token function">callActivatedHooks</span><span class="token punctuation">(</span>activatedQueue<span class="token punctuation">)</span>
  <span class="token function">callUpdatedHooks</span><span class="token punctuation">(</span>updatedQueue<span class="token punctuation">)</span>
  <span class="token function">cleanupDeps</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token comment">// devtool hook</span>
  <span class="token comment">/* istanbul ignore if */</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>devtools <span class="token operator">&amp;&amp;</span> config<span class="token punctuation">.</span>devtools<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    devtools<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">'flush'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
  <span class="token function">callUpdatedHooks</span><span class="token punctuation">(</span>updatedQueue<span class="token punctuation">)</span>
<span class="token keyword">function</span> <span class="token function">callUpdatedHooks</span><span class="token punctuation">(</span>queue<span class="token operator">:</span> Watcher<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> i <span class="token operator">=</span> queue<span class="token punctuation">.</span>length
  <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> watcher <span class="token operator">=</span> queue<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token keyword">const</span> vm <span class="token operator">=</span> watcher<span class="token punctuation">.</span>vm
    <span class="token keyword">if</span> <span class="token punctuation">(</span>vm <span class="token operator">&amp;&amp;</span> vm<span class="token punctuation">.</span>_watcher <span class="token operator">===</span> watcher <span class="token operator">&amp;&amp;</span> vm<span class="token punctuation">.</span>_isMounted <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>vm<span class="token punctuation">.</span>_isDestroyed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">'updated'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>当组件卸载时会调用<code v-pre>$destroy</code>，卸载时判断有没有<code v-pre>keepAlive</code>有的话旧调用<code v-pre>deactivate</code>钩子了</p>
<ul>
<li>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>  <span class="token function">destroy</span><span class="token punctuation">(</span>vnode<span class="token operator">:</span> MountedComponentVNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> componentInstance <span class="token punctuation">}</span> <span class="token operator">=</span> vnode
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>componentInstance<span class="token punctuation">.</span>_isDestroyed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>vnode<span class="token punctuation">.</span>data<span class="token punctuation">.</span>keepAlive<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        componentInstance<span class="token punctuation">.</span><span class="token function">$destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">deactivateChildComponent</span><span class="token punctuation">(</span>componentInstance<span class="token punctuation">,</span> <span class="token boolean">true</span> <span class="token comment">/* direct */</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>  
Vue<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$destroy</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> vm<span class="token operator">:</span> Component <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>_isBeingDestroyed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">'beforeDestroy'</span><span class="token punctuation">)</span>
    vm<span class="token punctuation">.</span>_isBeingDestroyed <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token comment">// remove self from parent</span>
    <span class="token keyword">const</span> parent <span class="token operator">=</span> vm<span class="token punctuation">.</span>$parent
    <span class="token keyword">if</span> <span class="token punctuation">(</span>parent <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>parent<span class="token punctuation">.</span>_isBeingDestroyed <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span><span class="token keyword">abstract</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">remove</span><span class="token punctuation">(</span>parent<span class="token punctuation">.</span>$children<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// teardown scope. this includes both the render watcher and other</span>
    <span class="token comment">// watchers created</span>
    vm<span class="token punctuation">.</span>_scope<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// remove reference from data ob</span>
    <span class="token comment">// frozen object may not have observer.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>_data<span class="token punctuation">.</span>__ob__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      vm<span class="token punctuation">.</span>_data<span class="token punctuation">.</span>__ob__<span class="token punctuation">.</span>vmCount<span class="token operator">--</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// call the last hook...</span>
    vm<span class="token punctuation">.</span>_isDestroyed <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token comment">// invoke destroy hooks on current rendered tree</span>
    vm<span class="token punctuation">.</span><span class="token function">__patch__</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>_vnode<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token comment">// fire destroyed hook</span>
    <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">'destroyed'</span><span class="token punctuation">)</span>
    <span class="token comment">// turn off all instance listeners.</span>
    vm<span class="token punctuation">.</span><span class="token function">$off</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// remove __vue__ reference</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>$el<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      vm<span class="token punctuation">.</span>$el<span class="token punctuation">.</span>__vue__ <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// release circular reference (#6759)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>$vnode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      vm<span class="token punctuation">.</span>$vnode<span class="token punctuation">.</span>parent <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li></li>
</ul>
</li>
</ul>
<p>​</p>
<CommentService/></div></template>


