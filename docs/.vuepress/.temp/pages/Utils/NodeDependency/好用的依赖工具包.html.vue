<template><div><h1 id="好用的依赖" tabindex="-1"><a class="header-anchor" href="#好用的依赖" aria-hidden="true">#</a> 好用的依赖</h1>
<h2 id="_1-node-html-parser" tabindex="-1"><a class="header-anchor" href="#_1-node-html-parser" aria-hidden="true">#</a> 1.node-html-parser</h2>
<p>[文档地址]([https://github.com/taoqf/node-fast-html-parser](vscode-file://vscode-app/d:/VScode/Microsoft VS Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html))</p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><CommentService/></div></template>


