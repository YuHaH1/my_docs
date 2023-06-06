import{_ as s,M as a,p as t,q as p,N as e,a1 as o}from"./framework-5866ffd3.js";const c="/Vue/vueloader1.png",i={},l=o(`<h1 id="vue-loader初探" tabindex="-1"><a class="header-anchor" href="#vue-loader初探" aria-hidden="true">#</a> vue-loader初探</h1><h2 id="_1-vue-loader" tabindex="-1"><a class="header-anchor" href="#_1-vue-loader" aria-hidden="true">#</a> 1.vue-loader</h2><p>vue-loader使用vue/complier-sfc包中的compiler来解析模板、脚本和样式，</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> compiler <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;vue/complier-sfc&#39;</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">source</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> loaderContext <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span>context<span class="token punctuation">,</span>resourcePath<span class="token punctuation">,</span>resourceQuery<span class="token punctuation">}</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span>descriptor<span class="token punctuation">}</span> <span class="token operator">=</span> compiler<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token comment">//descriptor描述是一个解析后的对象</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span>script<span class="token punctuation">}</span> <span class="token operator">=</span> descriptor
    <span class="token keyword">const</span> code <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">const</span> stringifyRequest <span class="token operator">=</span> loaderContext<span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">contextify</span><span class="token punctuation">(</span>
   		context<span class="token punctuation">,</span>
        resourcePath<span class="token operator">+</span>resourceQuery
    <span class="token punctuation">)</span>
    srcipt <span class="token operator">&amp;&amp;</span> code<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>\`<span class="token keyword">import</span> script from $<span class="token punctuation">{</span><span class="token punctuation">}</span>\`<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">loader</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token keyword">this</span><span class="token operator">:</span> webpack<span class="token punctuation">.</span>loader<span class="token punctuation">.</span>LoaderContext<span class="token punctuation">,</span>
  <span class="token literal-property property">source</span><span class="token operator">:</span> string</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> loaderContext <span class="token operator">=</span> <span class="token keyword">this</span>
   <span class="token operator">...</span><span class="token operator">...</span><span class="token punctuation">.</span> 
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>vueloader做了什么：</p><ol><li><p>如果VueLoaderPlugin插件没有安装的情况下报错，==这个插件动态的添加loader处理从vue文件分割出来的js html css代码==</p><ol><li><img src="`+c+`" alt=""></li><li>pitcher处理js 其他的处理html css，最终重新定义loader的rules</li></ol></li><li><p>得出请求的路径 例如 import APP from &#39;./APP.vue&#39; ./APP.vue</p></li><li><p>取出参数</p></li><li><p>环境判断 生产环境？ node环境？</p></li><li><p>解析内容将 vue文件 模板 脚本 样式拆分成对象放到descriptor中</p></li><li><p>MAP结构缓存描述符</p><ol><li><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> fs <span class="token keyword">from</span> <span class="token string">&#39;fs&#39;</span>
<span class="token keyword">import</span> type <span class="token punctuation">{</span> SFCDescriptor <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue/compiler-sfc&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> parse <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue/compiler-sfc&#39;</span>

<span class="token keyword">const</span> cache <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token operator">&lt;</span>string<span class="token punctuation">,</span> SFCDescriptor<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">setDescriptor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">filename</span><span class="token operator">:</span> string<span class="token punctuation">,</span> <span class="token literal-property property">entry</span><span class="token operator">:</span> SFCDescriptor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  cache<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token function">cleanQuery</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span><span class="token punctuation">,</span> entry<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">getDescriptor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">filename</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span><span class="token operator">:</span> SFCDescriptor <span class="token punctuation">{</span>
  filename <span class="token operator">=</span> <span class="token function">cleanQuery</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>cache<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> cache<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span><span class="token operator">!</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> source <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> <span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> descriptor <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">parse</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    filename<span class="token punctuation">,</span>
    <span class="token literal-property property">sourceMap</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  cache<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> descriptor<span class="token punctuation">)</span>
  <span class="token keyword">return</span> descriptor
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">cleanQuery</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">str</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> i <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&#39;?&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> i <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">?</span> str<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span> <span class="token operator">:</span> str
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>getDescriptor这个函数只会在描述符之后调用，如果没有命中cache缓存可能是由于加载器在单独的线程中运行。处理这件事唯一办法直接从磁盘读取该文件</p></li></ol></li><li><p>拿文件路径并生成hash作为id-》热重载 当文件内容变化重新生成新的hash</p></li><li><p>查看是否包含scoped已经热重载功能是否需要 。（生产环境node或者选项hotReload=false都不需要以及这三个条件其中一个为真descriptor.script || descriptor.scriptSetup || descriptor.template）</p></li><li><p>const propsToAttach: [string, string][] = [] 定义变量，给脚本添加额外属性来为Tree-shaking做准备</p></li><li><p>分割vue文件 script template style，提取参数。</p><ol><li><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> query <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">?vue&amp;type=script</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>attrsQuery<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>resourceQuery<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
   <span class="token keyword">const</span> query <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">?vue&amp;type=template</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>idQuery<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>scopedQuery<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>tsQuery<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>attrsQuery<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>resourceQuery<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
      <span class="token keyword">const</span> query <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">?vue&amp;type=style&amp;index=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>idQuery<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>inlineQuery<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>attrsQuery<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>resourceQuery<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol></li><li><p>将生成的hash id放到css元素上</p><ol><li><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>hasScoped<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   propsToAttach<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">__scopeId</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&quot;data-v-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol></li><li><p>暴漏文件名利于devtools工具</p><ol><li><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Expose filename. This is used by the devtools and Vue runtime warnings.</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isProduction<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Expose the file&#39;s full path in development, so that it can be opened</span>
    <span class="token comment">// from the devtools.</span>
     <span class="token comment">//开发环境下暴露文件的全路径，以便于可以从开发工具中直接打开该文件</span>
    propsToAttach<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">__file</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
      <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>rawShortFilePath<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\\\</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>exposeFilename<span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token comment">//生产环境，库可以选择在生产版本中公开其组件的文件名。出于安全原因，在生产环境中只暴露文件的basename。</span>
    propsToAttach<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">__file</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">basename</span><span class="token punctuation">(</span>resourcePath<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol></li><li><p>添加TreeShake代码</p><ol><li><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//如果propsToAttach存在，添加else代码来Tree  shaking</span>
 <span class="token doc-comment comment">/**
  * 但我们可以通过 __PURE__
     注释来帮忙 terser。它给一个语句标记为没有副作用。就这样一个简单的改变就能够使下面的代码被 tree - shake 
     但仍然会有一些引入的问题，需要对其进行评估，因为它们产生了副作用。
     为了解决这个问题，我们需要在 package.json 中添加 &quot;sideEffects&quot; 属性。
     它类似于 __PURE__但是作用于模块的层面，而不是代码语句的层面。
     它表示的意思是(指&quot;sideEffects&quot; 属性)：“如果被标记为无副作用的模块没有被直接导出使用，
     打包工具会跳过进行模块的副作用分析评估。”。
 */</span>
 <span class="token comment">// finalize</span>
 <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>propsToAttach<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   code <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">\\n\\nconst __exports__ = script;</span><span class="token template-punctuation string">\`</span></span>
 <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
   code <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">\\n\\nimport exportComponent from </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>exportHelperPath<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
   code <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">\\nconst __exports__ = /*#__PURE__*/exportComponent(script, [</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>propsToAttach
     <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>key<span class="token punctuation">,</span> val<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">[&#39;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&#39;,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>val<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">]</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
     <span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;,&#39;</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">])</span><span class="token template-punctuation string">\`</span></span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol></li><li><p>添加热重载代码</p><ol><li><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//添加热重载的代码</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>needsHotReload<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    code <span class="token operator">+=</span> <span class="token function">genHotReloadCode</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> templateRequest<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol></li><li><p>attrsToQuery这个函数主要用于获取用户传入的参数并忽略用户传入的内置使用的属性const ignoreList = [&#39;id&#39;, &#39;index&#39;, &#39;src&#39;, &#39;type&#39;]</p></li></ol><p>总结：==vue-loader主要做的就是解析Vue文件，分别生成js css html，并分别进行相对应的处理。并做热更新和摇树的优化操作。==</p><h2 id="_2-vueloaderplugin" tabindex="-1"><a class="header-anchor" href="#_2-vueloaderplugin" aria-hidden="true">#</a> 2.VueLoaderPlugin</h2><p>在使用Vueloader的时候必须要在webpack.config.js的plugins中注册该插件。</p><p>这个插件的作用主要是将Vue分割出来的js html css都有对应的loader去处理。</p>`,11);function u(r,k){const n=a("CommentService");return t(),p("div",null,[l,e(n)])}const v=s(i,[["render",u],["__file","vue-loader初探.html.vue"]]);export{v as default};
