<template><div><h1 id="vite插件开发" tabindex="-1"><a class="header-anchor" href="#vite插件开发" aria-hidden="true">#</a> Vite插件开发</h1>
<h2 id="dns预解析插件" tabindex="-1"><a class="header-anchor" href="#dns预解析插件" aria-hidden="true">#</a> DNS预解析插件</h2>
<h3 id="_1-初始化项目" tabindex="-1"><a class="header-anchor" href="#_1-初始化项目" aria-hidden="true">#</a> 1.初始化项目</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">add</span> vite typescript @mistjs/tsconfig-vue eslint @mistjs/eslint-config-vue tsup vitest @vitejs/plugin-vue vue vite-plugin-inspect <span class="token parameter variable">-D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>vite核心包，用于开发vite插件</li>
<li>@types/node：node的类型声明</li>
<li>typescript：ts类型声明</li>
<li>@mistjs/tsconfig-vue:ts配置文件</li>
<li>eslint:代码检查</li>
<li>@mistjs/eslint-config-vue：eslint配置文件</li>
<li>vite-plugin-inspect:插件调试</li>
<li>@vitejs/plugin-vue:vite的vue插件</li>
<li>tsup：基于rooup的构建工具，构建插件包</li>
</ul>
<p>定义script脚本</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"vite-plugin-dns-prefetch"</span><span class="token punctuation">,</span>
  <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"1.1.1"</span><span class="token punctuation">,</span>
  <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"a plugin of dns-prefetch"</span><span class="token punctuation">,</span>
  <span class="token property">"module"</span><span class="token operator">:</span> <span class="token string">"dist/main.mjs"</span><span class="token punctuation">,</span>
  <span class="token property">"types"</span><span class="token operator">:</span> <span class="token string">"dist/main.d.ts"</span><span class="token punctuation">,</span>
  <span class="token property">"main"</span><span class="token operator">:</span> <span class="token string">"dist/main.js"</span><span class="token punctuation">,</span>
  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"dev:eg"</span><span class="token operator">:</span> <span class="token string">"vite dev vite-project"</span><span class="token punctuation">,</span>
    <span class="token property">"build:eg"</span><span class="token operator">:</span> <span class="token string">"vite build vite-project"</span><span class="token punctuation">,</span>
    <span class="token property">"preview:eg"</span><span class="token operator">:</span> <span class="token string">"vite preview vite-project"</span><span class="token punctuation">,</span>
    <span class="token property">"build"</span><span class="token operator">:</span> <span class="token string">"tsup"</span><span class="token punctuation">,</span>
    <span class="token property">"release"</span><span class="token operator">:</span> <span class="token string">"bumpp"</span><span class="token punctuation">,</span>
    <span class="token property">"changelog"</span><span class="token operator">:</span><span class="token string">"changelogen --output CHANGELOG.md"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"files"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">"dist"</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"keywords"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">"vite-plugin-dns-prefetch"</span><span class="token punctuation">,</span>
    <span class="token string">"dns-prefetch"</span><span class="token punctuation">,</span>
    <span class="token string">"prefetch"</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"author"</span><span class="token operator">:</span> <span class="token string">"fancy_fish"</span><span class="token punctuation">,</span>
  <span class="token property">"license"</span><span class="token operator">:</span> <span class="token string">"ISC"</span><span class="token punctuation">,</span>
  <span class="token property">"devDependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"@mistjs/eslint-config-vue"</span><span class="token operator">:</span> <span class="token string">"^0.0.5"</span><span class="token punctuation">,</span>
    <span class="token property">"@mistjs/tsconfig-vue"</span><span class="token operator">:</span> <span class="token string">"^1.1.2"</span><span class="token punctuation">,</span>
    <span class="token property">"@types/node"</span><span class="token operator">:</span> <span class="token string">"^20.1.7"</span><span class="token punctuation">,</span>
    <span class="token property">"@vitejs/plugin-vue"</span><span class="token operator">:</span> <span class="token string">"^4.2.3"</span><span class="token punctuation">,</span>
    <span class="token property">"changelogen"</span><span class="token operator">:</span> <span class="token string">"^0.5.3"</span><span class="token punctuation">,</span>
    <span class="token property">"eslint"</span><span class="token operator">:</span> <span class="token string">"^8.40.0"</span><span class="token punctuation">,</span>
    <span class="token property">"node-html-parser"</span><span class="token operator">:</span> <span class="token string">"^6.1.5"</span><span class="token punctuation">,</span>
    <span class="token property">"tsup"</span><span class="token operator">:</span> <span class="token string">"^6.7.0"</span><span class="token punctuation">,</span>
    <span class="token property">"typescript"</span><span class="token operator">:</span> <span class="token string">"^5.0.4"</span><span class="token punctuation">,</span>
    <span class="token property">"url-regex"</span><span class="token operator">:</span> <span class="token string">"^5.0.0"</span><span class="token punctuation">,</span>
    <span class="token property">"vite"</span><span class="token operator">:</span> <span class="token string">"^4.3.7"</span><span class="token punctuation">,</span>
    <span class="token property">"vite-plugin-inspect"</span><span class="token operator">:</span> <span class="token string">"^0.7.26"</span><span class="token punctuation">,</span>
    <span class="token property">"vitest"</span><span class="token operator">:</span> <span class="token string">"^0.31.0"</span><span class="token punctuation">,</span>
    <span class="token property">"vue"</span><span class="token operator">:</span> <span class="token string">"^3.3.2"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>tsup的配置</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'tsup'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  entry<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">'src/main.ts'</span><span class="token punctuation">,</span> <span class="token comment">// 入口</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  dts<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 生成dist</span>
  clean<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  format<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'cjs'</span><span class="token punctuation">,</span> <span class="token string">'esm'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>tsconfig.json</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"extends"</span><span class="token operator">:</span> <span class="token string">"@mistjs/tsconfig-vue"</span><span class="token punctuation">,</span>
    <span class="token property">"compilerOptions"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"moduleResolution"</span><span class="token operator">:</span><span class="token string">"node"</span><span class="token punctuation">,</span>
        <span class="token property">"isolatedModules"</span><span class="token operator">:</span><span class="token boolean">false</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>eslintrc</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"extends"</span><span class="token operator">:</span> <span class="token string">"@mistjs/eslint-config-vue"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>文件目录</p>
<p><img src="/Vite/plugin.png" alt=""></p>
<h3 id="_2-思路" tabindex="-1"><a class="header-anchor" href="#_2-思路" aria-hidden="true">#</a> 2.思路</h3>
<ol>
<li>dns预解析只需要在生产环境中使用，因此插件配置<code v-pre>apply:’build’</code></li>
<li>解析用户文件中包含https的url</li>
<li>在transformIndexHtml钩子的head里添加<code v-pre>&lt;link rel=&quot;dns-prefetch&quot; href=&quot;${url}&quot;/&gt;</code>即可</li>
</ol>
<h3 id="_3-用户自定义扩展" tabindex="-1"><a class="header-anchor" href="#_3-用户自定义扩展" aria-hidden="true">#</a> 3.用户自定义扩展</h3>
<ol>
<li><code v-pre>limit</code>:限制最多添加多少个dns预解析，太多对网络也是负担，这里默认是10个</li>
<li><code v-pre>parseFile</code>：解析哪些文件，数组类型，例如指定<code v-pre>’.ts’|’.js’</code></li>
<li><code v-pre>excludeDnsPrefetchUrl</code>:对于哪些url不采用预解析（一些大家可能经常访问的url本身就在缓存里了就没必要预解析了）</li>
<li><code v-pre>addDnsUrl</code>：用户也可以直接添加一些URL进行预解析。</li>
</ol>
<CommentService/></div></template>


