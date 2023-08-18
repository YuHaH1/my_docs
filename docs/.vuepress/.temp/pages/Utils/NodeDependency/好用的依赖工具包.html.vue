<template><div><h1 id="好用的依赖" tabindex="-1"><a class="header-anchor" href="#好用的依赖" aria-hidden="true">#</a> 好用的依赖</h1>
<h2 id="_1-node-html-parser" tabindex="-1"><a class="header-anchor" href="#_1-node-html-parser" aria-hidden="true">#</a> 1.node-html-parser</h2>
<p><a href="https://github.com/taoqf/node-fast-html-parser" target="_blank" rel="noopener noreferrer">文档地址<ExternalLinkIcon/></a></p>
<p>在node端将html解析成DOM，可以通过像操作DOM一样添加删除一些节点，然后可以转成字符串写入html文件</p>
<h2 id="_2-url-regex" tabindex="-1"><a class="header-anchor" href="#_2-url-regex" aria-hidden="true">#</a> 2.url-regex</h2>
<p><a href="https://github.com/kevva/url-regex#readme" target="_blank" rel="noopener noreferrer">文档地址<ExternalLinkIcon/></a></p>
<p>可以 解析url进行正则匹配</p>
<h2 id="_3-tsup" tabindex="-1"><a class="header-anchor" href="#_3-tsup" aria-hidden="true">#</a> 3.tsup</h2>
<p><a href="https://tsup.egoist.dev/" target="_blank" rel="noopener noreferrer">文档地址<ExternalLinkIcon/></a></p>
<p>ts打包工具</p>
<h2 id="_4-swc" tabindex="-1"><a class="header-anchor" href="#_4-swc" aria-hidden="true">#</a> 4.swc</h2>
<p><a href="https://swc.rs/docs/getting-started" target="_blank" rel="noopener noreferrer">文档地址<ExternalLinkIcon/></a></p>
<p>js、ts的编译工具</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> esbuild <span class="token keyword">from</span> <span class="token string">'esbuild'</span><span class="token comment">//打包工具</span>
<span class="token keyword">import</span> swc <span class="token keyword">from</span> <span class="token string">'@swc/core'</span><span class="token comment">//类似于babel es6 转 es5</span>
<span class="token keyword">import</span> fs <span class="token keyword">from</span> <span class="token string">'node:fs'</span>
<span class="token keyword">await</span> esbuild<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    entryPoints<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'./index.ts'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">//入口文件</span>
    bundle<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">//模块单独打包</span>
    loader<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">'.js'</span><span class="token operator">:</span> <span class="token string">'js'</span><span class="token punctuation">,</span>
        <span class="token string-property property">'.ts'</span><span class="token operator">:</span> <span class="token string">'ts'</span><span class="token punctuation">,</span>
        <span class="token string-property property">'.jsx'</span><span class="token operator">:</span> <span class="token string">'jsx'</span><span class="token punctuation">,</span>
        <span class="token string-property property">'.tsx'</span><span class="token operator">:</span> <span class="token string">'tsx'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    treeShaking<span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span>
    define<span class="token operator">:</span> <span class="token punctuation">{</span>
       <span class="token string-property property">'process.env.NODE_ENV'</span><span class="token operator">:</span> <span class="token string">'"production"'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//实现自定义loader</span>
            name<span class="token operator">:</span> <span class="token string">"swc-loader"</span><span class="token punctuation">,</span>
            <span class="token function">setup</span><span class="token punctuation">(</span>build<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                build<span class="token punctuation">.</span><span class="token function">onLoad</span><span class="token punctuation">(</span><span class="token punctuation">{</span> filter<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(js|ts|tsx|jsx)$</span><span class="token regex-delimiter">/</span></span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>args<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                   <span class="token comment">// console.log(args);</span>
                    <span class="token keyword">const</span> content <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span>args<span class="token punctuation">.</span>path<span class="token punctuation">,</span> <span class="token string">"utf-8"</span><span class="token punctuation">)</span>
                    <span class="token keyword">const</span> <span class="token punctuation">{</span> code <span class="token punctuation">}</span> <span class="token operator">=</span> swc<span class="token punctuation">.</span><span class="token function">transformSync</span><span class="token punctuation">(</span>content<span class="token punctuation">,</span> <span class="token punctuation">{</span>
                        filename<span class="token operator">:</span> args<span class="token punctuation">.</span>path
                    <span class="token punctuation">}</span><span class="token punctuation">)</span>
                    <span class="token keyword">return</span> <span class="token punctuation">{</span>
                        contents<span class="token operator">:</span> code
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    outdir<span class="token operator">:</span> <span class="token string">"dist"</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-postcss-px-to-vw移动端适配" tabindex="-1"><a class="header-anchor" href="#_5-postcss-px-to-vw移动端适配" aria-hidden="true">#</a> 5.postcss-px-to-vw移动端适配</h2>
<p>1.rem</p>
<p>我们将rem设置为100px的换算关系，例如750px设计稿  100px = （100/750）= 0.13333 * 100 = 13.3vw    rem = 13.3vw 这样我们只需要按照设计稿尺寸，然后小数点前移两位即可不需要任何插件</p>
<p>2.postcsspxtovw</p>
<p><a href="https://github.com/evrone/postcss-px-to-viewport" target="_blank" rel="noopener noreferrer">文档地址<ExternalLinkIcon/></a></p>
<h2 id="_6-轻量级请求库alova" tabindex="-1"><a class="header-anchor" href="#_6-轻量级请求库alova" aria-hidden="true">#</a> 6.轻量级请求库alova</h2>
<p><a href="https://alova.js.org/zh-CN/" target="_blank" rel="noopener noreferrer">文档地址<ExternalLinkIcon/></a></p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createAlova <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'alova'</span>
<span class="token keyword">import</span> GlobalFetch <span class="token keyword">from</span> <span class="token string">'alova/GlobalFetch'</span>
<span class="token keyword">import</span> VueHook <span class="token keyword">from</span> <span class="token string">'alova/vue'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ElMessage <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'element-plus'</span>

<span class="token keyword">function</span> <span class="token function">getToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> tempToken <span class="token operator">=</span> <span class="token string">''</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>tempToken<span class="token punctuation">)</span> <span class="token keyword">return</span> tempToken
    <span class="token keyword">const</span> token <span class="token operator">=</span> localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'TOKEN'</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      tempToken <span class="token operator">=</span> token
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> tempToken
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> token <span class="token operator">=</span> <span class="token function">getToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> alovaIns <span class="token operator">=</span> <span class="token function">createAlova</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// 假设我们需要与这个域名的服务器交互</span>
  baseURL<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>

  <span class="token comment">// 在vue项目下引入VueHook，它可以帮我们用vue的ref函数创建请求相关的，可以被alova管理的状态</span>
  statesHook<span class="token operator">:</span> VueHook<span class="token punctuation">,</span>

  <span class="token comment">// 请求适配器，这里我们使用fetch请求适配器</span>
  requestAdapter<span class="token operator">:</span> <span class="token function">GlobalFetch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

  <span class="token comment">// 设置全局的请求拦截器，与axios相似</span>
  <span class="token function">beforeRequest</span><span class="token punctuation">(</span><span class="token punctuation">{</span> config <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 假设我们需要添加token到请求头</span>
    config<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>Authorization <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Bearer </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token function">token</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>

    config<span class="token punctuation">.</span>headers<span class="token punctuation">[</span><span class="token string">'Content-Type'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'application/json; charset=utf-8'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token comment">// 响应拦截器，也与axios类似</span>
  <span class="token function-variable function">responsed</span><span class="token operator">:</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>response<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> json <span class="token operator">=</span> <span class="token keyword">await</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>response<span class="token punctuation">.</span>status <span class="token operator">!==</span> <span class="token number">200</span> <span class="token operator">||</span> <span class="token operator">!</span>json<span class="token punctuation">.</span>success<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 这边抛出错误时，将会进入请求失败拦截器内</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>json<span class="token punctuation">.</span>errMsg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 空 token 且 状态码 401 不弹提示</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">token</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> response<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">401</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">//</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          ElMessage<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>json<span class="token punctuation">.</span>errMsg<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>json<span class="token punctuation">.</span>errMsg<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>json<span class="token punctuation">.</span>message<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> json<span class="token punctuation">.</span>data
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><CommentService/></div></template>


