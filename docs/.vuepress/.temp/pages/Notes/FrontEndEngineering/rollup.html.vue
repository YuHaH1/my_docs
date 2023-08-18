<template><div><h1 id="rollup" tabindex="-1"><a class="header-anchor" href="#rollup" aria-hidden="true">#</a> rollup</h1>
<p><a href="https://cn.rollupjs.org/introduction/" target="_blank" rel="noopener noreferrer">Rollup官方文档<ExternalLinkIcon/></a></p>
<h2 id="_1-安装rollup" tabindex="-1"><a class="header-anchor" href="#_1-安装rollup" aria-hidden="true">#</a> 1.安装Rollup</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">install</span> rollup <span class="token parameter variable">-D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2-rollup命令行打包" tabindex="-1"><a class="header-anchor" href="#_2-rollup命令行打包" aria-hidden="true">#</a> 2.Rollup命令行打包</h2>
<p>编译成立即执行函数</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 编译为包含自执行函数（'iife'）的 &lt;script>。</span>
rollup main.js <span class="token parameter variable">--file</span> bundle.js <span class="token parameter variable">--format</span> iife
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>打包成cjs （将main.js以commenjs规范打包成bundle.js）</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 编译为一个 CommonJS 模块 ('cjs')</span>
rollup main.js <span class="token parameter variable">--file</span> bundle.js <span class="token parameter variable">--format</span> cjs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器和Node（将main.js以umd格式打包到bundle.js并声明全局变量名myBundle）</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># UMD 格式需要一个包名</span>
rollup main.js <span class="token parameter variable">--file</span> bundle.js <span class="token parameter variable">--format</span> umd <span class="token parameter variable">--name</span> <span class="token string">"myBundle"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li><code v-pre>-c</code>-&gt; <code v-pre>--config</code>后面跟配置文件路径</li>
<li><code v-pre>-o</code>-&gt;<code v-pre>--file</code>输出的文件名</li>
<li><code v-pre>--dir</code>当使用代码分割功能实现惰性动态加载（其中某些导入的模块仅在执行函数后加载）Rollup 将使用动态导入创建一个仅在需要时加载的单独块。为了让 Rollup 知道在哪里放置第二个<code v-pre>chunk</code>此时使用</li>
<li><code v-pre>-e</code>-&gt;<code v-pre>--external</code>排除需要被bundle的模块</li>
</ol>
<h2 id="_3-rollup集成typescript" tabindex="-1"><a class="header-anchor" href="#_3-rollup集成typescript" aria-hidden="true">#</a> 3.Rollup集成typescript</h2>
<p><code v-pre>Rollup</code>可以使用其他语言编写配置文件，比如 TypeScript。为此，安装相应的 Rollup 插件，例如 <code v-pre>@rollup/plugin-typescript</code>，并使用 <a href="https://cn.rollupjs.org/command-line-interface/#configplugin-plugin" target="_blank" rel="noopener noreferrer"><code v-pre>--configPlugin</code><ExternalLinkIcon/></a> 选项：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>rollup <span class="token parameter variable">--config</span> rollup.config.ts <span class="token parameter variable">--configPlugin</span> typescript
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-常用配置选项" tabindex="-1"><a class="header-anchor" href="#_4-常用配置选项" aria-hidden="true">#</a> 4.常用配置选项</h2>
<h3 id="external" tabindex="-1"><a class="header-anchor" href="#external" aria-hidden="true">#</a> external</h3>
<p>用于指定不需要打包成bundle的模块</p>
<ol>
<li>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>	<span class="token literal-property property">external</span><span class="token operator">:</span> <span class="token punctuation">[</span>
		<span class="token string">'some-externally-required-library'</span><span class="token punctuation">,</span>
		<span class="token function">fileURLToPath</span><span class="token punctuation">(</span>
			<span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span>
				<span class="token string">'src/some-local-file-that-should-not-be-bundled.js'</span><span class="token punctuation">,</span>
				<span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>url
			<span class="token punctuation">)</span>
		<span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">node_modules</span><span class="token regex-delimiter">/</span></span>
	<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="input" tabindex="-1"><a class="header-anchor" href="#input" aria-hidden="true">#</a> input</h3>
<p>指定 bundle 的入口文件。如果值为一个入口文件的数组或一个将名称映射到入口文件的对象，那么它们将被打包到单独的输出 chunks。除非使用 <a href="https://cn.rollupjs.org/configuration-options/#output-file" target="_blank" rel="noopener noreferrer"><code v-pre>output.file</code><ExternalLinkIcon/></a> 选项，否则生成的 chunk 名称将遵循 <a href="https://cn.rollupjs.org/configuration-options/#output-entryfilenames" target="_blank" rel="noopener noreferrer"><code v-pre>output.entryFileNames</code><ExternalLinkIcon/></a> 选项设置。</p>
<p>当选项的值使用对象形式时，可以通过在名称中添加 <code v-pre>/</code> 来将入口文件放入不同的子文件夹。以下例子将根据 <code v-pre>entry-a.js</code> 和 <code v-pre>entry-b/index.js</code>，产生至少两个入口 chunks，即 <code v-pre>index.js</code>文件将输出在 <code v-pre>entry-b</code> 文件夹中：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// rollup.config.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">input</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token string">'src/main-a.js'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'b/index'</span><span class="token operator">:</span> <span class="token string">'src/main-b.js'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span><span class="token punctuation">,</span>
    <span class="token literal-property property">entryFileNames</span><span class="token operator">:</span> <span class="token string">'entry-[name].js'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="output" tabindex="-1"><a class="header-anchor" href="#output" aria-hidden="true">#</a> output</h3>
<h4 id="dir和file" tabindex="-1"><a class="header-anchor" href="#dir和file" aria-hidden="true">#</a> dir和file</h4>
<p>该选项用于指定所有生成的 chunk 被放置在哪个目录中。如果生成一个以上的 chunk，那么这个选项是必需的。否则，可以使用 <code v-pre>file</code> 选项来代替。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">output</span><span class="token operator">:</span><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">dir</span><span class="token operator">:</span><span class="token string">'bundle.js'</span>
        <span class="token operator">...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
也可以用file替代
<span class="token literal-property property">output</span><span class="token operator">:</span><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">file</span><span class="token operator">:</span><span class="token string">'dist/bundle.js'</span>
        <span class="token operator">...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="format" tabindex="-1"><a class="header-anchor" href="#format" aria-hidden="true">#</a> format</h4>
<p>该选项用于指定生成的 bundle 的格式。满足以下其中之一：</p>
<ul>
<li><code v-pre>amd</code> – 异步模块加载，适用于 RequireJS 等模块加载器</li>
<li><code v-pre>cjs</code> – CommonJS，适用于 Node 环境和其他打包工具（别名：<code v-pre>commonjs</code>）</li>
<li><code v-pre>es</code> – 将 bundle 保留为 ES 模块文件，适用于其他打包工具，以及支持 <code v-pre>&lt;script type=module&gt;</code> 标签的浏览器。（别名：<code v-pre>esm</code>，<code v-pre>module</code>）</li>
<li><code v-pre>iife</code> – 自执行函数，适用于 <code v-pre>&lt;script&gt;</code> 标签（如果你想为你的应用程序创建 bundle，那么你可能会使用它）。</li>
<li><code v-pre>umd</code> – 通用模块定义规范，同时支持 <code v-pre>amd</code>，<code v-pre>cjs</code> 和 <code v-pre>iife</code></li>
<li><code v-pre>system</code> – SystemJS 模块加载器的原生格式（别名：<code v-pre>systemjs</code>）</li>
</ul>
<h4 id="generatedcode" tabindex="-1"><a class="header-anchor" href="#generatedcode" aria-hidden="true">#</a> generatedCode</h4>
<p>代码降级</p>
<ul>
<li><code v-pre>&quot;es5&quot;</code>：不能使用 ES2015+ 的特性，比如箭头函数，不能使用引号包裹的预留词汇作为属性名。</li>
<li><code v-pre>&quot;es2015&quot;</code>：使用任意 ES2015 之前的 JavaScript 特性。</li>
</ul>
<p><code v-pre>output.generatedCode.arrowFunctions</code></p>
<table>
<thead>
<tr>
<th style="text-align:right">类型：</th>
<th><code v-pre>boolean</code></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:right">CLI：</td>
<td><code v-pre>--generatedCode.arrowFunctions</code>/<code v-pre>--no-generatedCode.arrowFunctions</code></td>
</tr>
<tr>
<td style="text-align:right">默认：</td>
<td><code v-pre>false</code></td>
</tr>
</tbody>
</table>
<p>该选项表示是否为自动生成的代码片段使用箭头函数。请注意，在某些地方，比如模块封装器，Rollup 会继续生成用小括号封装的常规函数，因为在一些 JavaScript 引擎中，这些函数会提供 <a href="https://v8.dev/blog/preparser#pife" target="_blank" rel="noopener noreferrer">明显更好的性能<ExternalLinkIcon/></a>。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>小括号封装的常规函数为什么能获得更好的性能？</p>
<p>通过急切解析和编译 立即执行函数，V8 引擎可以更早地得知哪些函数在启动过程中是需要的，从而避免了不必要的预解析。但是也会带来一定的内存开销。</p>
</div>
<p><code v-pre>output.generatedCode.constBindings</code>
将var替换成const</p>
<table>
<thead>
<tr>
<th style="text-align:right">类型：</th>
<th><code v-pre>boolean</code></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:right">CLI：</td>
<td><code v-pre>--generatedCode.constBindings</code>/<code v-pre>--no-generatedCode.constBindings</code></td>
</tr>
<tr>
<td style="text-align:right">默认：</td>
<td><code v-pre>false</code></td>
</tr>
</tbody>
</table>
<h4 id="minifyinternalexports" tabindex="-1"><a class="header-anchor" href="#minifyinternalexports" aria-hidden="true">#</a> minifyInternalExports</h4>
<table>
<thead>
<tr>
<th style="text-align:right">类型：</th>
<th><code v-pre>boolean</code></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:right">CLI：</td>
<td><code v-pre>--minifyInternalExports</code>/<code v-pre>--no-minifyInternalExports</code></td>
</tr>
<tr>
<td style="text-align:right">默认：</td>
<td>在 <code v-pre>es</code>、<code v-pre>system</code> 格式下或者 <code v-pre>output.compact</code> 值为 <code v-pre>true</code> 的情况下值为 <code v-pre>true</code>，否则为 <code v-pre>false</code></td>
</tr>
</tbody>
</table>
<p>默认情况下，在 <code v-pre>es</code>、<code v-pre>system</code> 格式下或者 <code v-pre>output.compact</code> 值为 <code v-pre>true</code> 的情况下该选项值为 <code v-pre>true</code>，这意味着 Rollup 会尝试把内部变量导出为单个字母的变量，以便更好地压缩代码。</p>
<h4 id="sourcemapfile" tabindex="-1"><a class="header-anchor" href="#sourcemapfile" aria-hidden="true">#</a> SourcemapFile</h4>
<table>
<thead>
<tr>
<th style="text-align:right">类型：</th>
<th><code v-pre>string</code></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:right">CLI：</td>
<td><code v-pre>--sourcemapFile &lt;file-name-with-path&gt;</code></td>
</tr>
</tbody>
</table>
<p>该选项用于指定生成 sourcemap 文件的位置。如果是一个绝对路径，那么 sourcemap 文件中的所有 <code v-pre>sources</code> 文件路径都相对于该路径。<code v-pre>map.file</code> 属性是 <code v-pre>sourcemapFile</code> 的基本名称，因为 sourcemap 文件一般是和其构建后的 bundle 处于同一目录。</p>
<p>如果 <code v-pre>output</code> 设置了值，那么 <code v-pre>sourcemapFile</code> 不是必须的，这种情况下，它的值会通过输出文件名中添加“.map”推断出来。</p>
<h3 id="cahe" tabindex="-1"><a class="header-anchor" href="#cahe" aria-hidden="true">#</a> cahe</h3>
<p>使用该设置，Rollup 将只会对改变的模块重新分析，从而加速观察模式中后续的构建。</p>
<h2 id="_5-插件开发" tabindex="-1"><a class="header-anchor" href="#_5-插件开发" aria-hidden="true">#</a> 5.插件开发</h2>
<p>固定格式</p>
<ul>
<li>插件应该有一个明确的名称，并以<code v-pre>rollup-plugin-</code>作为前缀。</li>
<li>在<code v-pre>package.json</code>中包含<code v-pre>rollup-plugin</code>关键字。</li>
<li>插件应该被测试，我们推荐 <a href="https://github.com/mochajs/mocha" target="_blank" rel="noopener noreferrer">mocha<ExternalLinkIcon/></a> 或 <a href="https://github.com/avajs/ava" target="_blank" rel="noopener noreferrer">ava<ExternalLinkIcon/></a>，它们支持 Promise。</li>
<li>可能的话，使用异步方法，例如 <code v-pre>fs.readFile</code> 而不是 <code v-pre>fs.readFileSync</code></li>
<li>用英文文档描述你的插件。</li>
<li>确保如果适当，你的插件输出正确的源映射。</li>
<li>如果插件使用“虚拟模块”（例如用于辅助函数），请使用<code v-pre>\0</code>前缀模块 ID。这可以防止其他插件尝试处理它。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">myPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'my-plugin'</span><span class="token punctuation">,</span><span class="token comment">//插件的名称将在警告和错误中出现</span>
        <span class="token function">resolveId</span> <span class="token punctuation">(</span> <span class="token parameter">source</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>source <span class="token operator">===</span> <span class="token string">'virtual-module'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 这表示 rollup 不应询问其他插件或</span>
        <span class="token comment">// 从文件系统检查以找到此 ID</span>
        <span class="token keyword">return</span> source<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// 其他ID应按通常方式处理</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">load</span> <span class="token punctuation">(</span> <span class="token parameter">id</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>id <span class="token operator">===</span> <span class="token string">'virtual-module'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// "virtual-module"的源代码</span>
        <span class="token keyword">return</span> <span class="token string">'export default "This is virtual!"'</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// 其他ID应按通常方式处理</span>
    <span class="token punctuation">}</span>
        
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// rollup.config.js</span>
<span class="token keyword">import</span> myPlugin <span class="token keyword">from</span> <span class="token string">'./rollup-plugin-my-example.js'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">input</span><span class="token operator">:</span> <span class="token string">'virtual-module'</span><span class="token punctuation">,</span> <span class="token comment">// 由我们的插件解析</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">myPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
    <span class="token literal-property property">file</span><span class="token operator">:</span> <span class="token string">'bundle.js'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token string">'es'</span>
  <span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="一些常用声明周期钩子" tabindex="-1"><a class="header-anchor" href="#一些常用声明周期钩子" aria-hidden="true">#</a> 一些常用声明周期钩子</h3>
<p>buildEnd钩子</p>
<table>
<thead>
<tr>
<th style="text-align:right">类型：</th>
<th><code v-pre>(error?: Error) =&gt; void</code></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:right">类别：</td>
<td>async, parallel</td>
</tr>
<tr>
<td style="text-align:right">上一个钩子：</td>
<td><a href="https://cn.rollupjs.org/plugin-development/#moduleparsed" target="_blank" rel="noopener noreferrer"><code v-pre>moduleParsed</code><ExternalLinkIcon/></a>、<a href="https://cn.rollupjs.org/plugin-development/#resolveid" target="_blank" rel="noopener noreferrer"><code v-pre>resolveId</code><ExternalLinkIcon/></a> 或 <a href="https://cn.rollupjs.org/plugin-development/#resolvedynamicimport" target="_blank" rel="noopener noreferrer"><code v-pre>resolveDynamicImport</code><ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:right">下一个钩子：</td>
<td>输出生成阶段的 <a href="https://cn.rollupjs.org/plugin-development/#outputoptions" target="_blank" rel="noopener noreferrer"><code v-pre>outputOptions</code><ExternalLinkIcon/></a>，因为这是构建阶段的最后一个钩子</td>
</tr>
</tbody>
</table>
<p>在 Rollup 完成产物但尚未调用 <code v-pre>generate</code> 或 <code v-pre>write</code> 之前调用；也可以返回一个 Promise。如果在构建过程中发生错误，则将其传递给此钩子。</p>
<p><a href="https://cn.rollupjs.org/plugin-development/#buildstart" target="_blank" rel="noopener noreferrer">buildStart<ExternalLinkIcon/></a></p>
<p>这个钩子使用在获取用户选项</p>
<table>
<thead>
<tr>
<th style="text-align:right">类型：</th>
<th><code v-pre>(options: InputOptions) =&gt; void</code></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:right">类别：</td>
<td>async, parallel</td>
</tr>
<tr>
<td style="text-align:right">上一个钩子：</td>
<td><a href="https://cn.rollupjs.org/plugin-development/#options" target="_blank" rel="noopener noreferrer"><code v-pre>options</code><ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:right">下一个钩子：</td>
<td>并行解析每个入口点的 <a href="https://cn.rollupjs.org/plugin-development/#resolveid" target="_blank" rel="noopener noreferrer"><code v-pre>resolveId</code><ExternalLinkIcon/></a></td>
</tr>
</tbody>
</table>
<p>在每个 <code v-pre>rollup.rollup</code> 构建上调用。当你需要访问传递给 <code v-pre>rollup.rollup()</code> 的选项时，建议使用此钩子，因为它考虑了所有 <a href="https://cn.rollupjs.org/plugin-development/#options" target="_blank" rel="noopener noreferrer"><code v-pre>options</code><ExternalLinkIcon/></a> 钩子的转换，并且还包含未设置选项的正确默认值。</p>
<p>transform</p>
<table>
<thead>
<tr>
<th style="text-align:right">类型:</th>
<th><code v-pre>(code: string, id: string) =&gt; TransformResult</code></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:right">类别:</td>
<td>async, sequential</td>
</tr>
<tr>
<td style="text-align:right">上一个钩子:</td>
<td><a href="https://cn.rollupjs.org/plugin-development/#load" target="_blank" rel="noopener noreferrer"><code v-pre>load</code><ExternalLinkIcon/></a>，用于加载当前处理的文件。如果使用缓存并且该模块有一个缓存副本，则为 <a href="https://cn.rollupjs.org/plugin-development/#shouldtransformcachedmodule" target="_blank" rel="noopener noreferrer"><code v-pre>shouldTransformCachedModule</code><ExternalLinkIcon/></a>，如果插件为该钩子返回了 <code v-pre>true</code></td>
</tr>
<tr>
<td style="text-align:right">下一个钩子:</td>
<td><a href="https://cn.rollupjs.org/plugin-development/#moduleparsed" target="_blank" rel="noopener noreferrer"><code v-pre>moduleParsed</code><ExternalLinkIcon/></a>，一旦文件已被处理和解析</td>
</tr>
</tbody>
</table>
<p>可用于转换单个模块。为了避免额外的解析开销，例如此钩子已经使用 <code v-pre>this.parse</code> 生成了 AST，此钩子可以选择性地返回一个 <code v-pre>{ code, ast, map }</code> 对象。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>在观察模式下或明确使用缓存时，当重新构建时，此钩子的结果会被缓存，仅当模块的 <code v-pre>code</code> 发生更改或上次触发此钩子时添加了通过 <code v-pre>this.addWatchFile</code> 添加的文件时，才会再次触发该模块的钩子。</p>
</div>
<CommentService/></div></template>


