<template><div><h1 id="webpack必懂知识" tabindex="-1"><a class="header-anchor" href="#webpack必懂知识" aria-hidden="true">#</a> webpack必懂知识</h1>
<h2 id="_1-打包原理" tabindex="-1"><a class="header-anchor" href="#_1-打包原理" aria-hidden="true">#</a> 1.打包原理</h2>
<p><img src="/Webpack/webpack1.png" alt=""></p>
<p>打包的步骤</p>
<p>1.初始化阶段：</p>
<ol>
<li><strong>初始化参数</strong>：从配置文件、 配置对象、Shell 参数中读取，与默认配置结合得出最终的参数</li>
<li><strong>创建编译器对象</strong>：用上一步得到的参数创建 <code v-pre>Compiler</code> 对象</li>
<li><strong>初始化编译环境</strong>：包括注入内置插件、注册各种模块工厂、初始化 RuleSet 集合、加载配置的插件等</li>
<li><strong>开始编译</strong>：执行 <code v-pre>compiler</code> 对象的 <code v-pre>run</code> 方法</li>
<li><strong>确定入口</strong>：根据配置中的 <code v-pre>entry</code> 找出所有的入口文件，调用 <code v-pre>compilition.addEntry</code> 将入口文件转换为 <code v-pre>dependence</code> 对象</li>
</ol>
<p>2.构建阶段：</p>
<ol>
<li><strong>编译模块(make)</strong>：根据 <code v-pre>entry</code> 对应的 <code v-pre>dependence</code> 创建 <code v-pre>module</code> 对象，调用 <code v-pre>loader</code> 将模块转译为标准 JS 内容，调用 JS 解释器将内容转换为 AST 对象，从中找出该模块依赖的模块，再 递归 本步骤直到所有入口依赖的文件都经过了本步骤的处理</li>
<li><strong>完成模块编译</strong>：上一步递归处理所有能触达到的模块后，得到了每个模块被翻译后的内容以及它们之间的 <strong>依赖关系图</strong></li>
</ol>
<p>3.生成阶段：</p>
<ol>
<li><strong>输出资源(seal)</strong>：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 <code v-pre>Chunk</code>，再把每个 <code v-pre>Chunk</code> 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会</li>
<li><strong>写入文件系统(emitAssets)</strong>：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统</li>
</ol>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p><code v-pre>Entry</code>：编译入口，webpack 编译的起点</p>
<p><code v-pre>Compiler</code>：编译管理器，webpack 启动后会创建 <code v-pre>compiler</code> 对象，该对象一直存活知道结束退出</p>
<p><code v-pre>Compilation</code>：单次编辑过程的管理器，比如 <code v-pre>watch = true</code> 时，运行过程中只有一个 <code v-pre>compiler</code> 但每次文件变更触发重新编译时，都会创建一个新的 <code v-pre>compilation</code> 对象</p>
<p><code v-pre>Dependence</code>：依赖对象，webpack 基于该类型记录模块间依赖关系</p>
<p><code v-pre>Module</code>：webpack 内部所有资源都会以“module”对象形式存在，所有关于资源的操作、转译、合并都是以 “module” 为基本单位进行的</p>
<p><code v-pre>Chunk</code>：编译完成准备输出时，webpack 会将 <code v-pre>module</code> 按特定的规则组织成一个一个的 <code v-pre>chunk</code>，这些 <code v-pre>chunk</code> 某种程度上跟最终输出一一对应</p>
<p><code v-pre>Loader</code>：资源内容转换器，其实就是实现从内容 A 转换 B 的转换器</p>
<p><code v-pre>Plugin</code>：webpack构建过程中，会在特定的时机广播对应的事件，插件监听这些事件，在特定时间点介入编译过程</p>
</div>
<h3 id="_1-1、初始化阶段" tabindex="-1"><a class="header-anchor" href="#_1-1、初始化阶段" aria-hidden="true">#</a> 1.1、初始化阶段</h3>
<p>初始化阶段会做哪些？</p>
<p>将 <code v-pre>process.args + webpack.config.js</code> 合并成用户配置</p>
<p>调用 <code v-pre>validateSchema</code> 校验配置</p>
<p>调用 <code v-pre>getNormalizedWebpackOptions + applyWebpackOptionsBaseDefaults</code> 合并出最终配置</p>
<p>创建 <code v-pre>compiler</code> 对象</p>
<p>遍历用户定义的 <code v-pre>plugins</code> 集合，执行插件的 <code v-pre>apply</code> 方法</p>
<p>调用 <code v-pre>new WebpackOptionsApply().process</code> 方法，加载各种内置插件</p>
<h3 id="_1-2、构建阶段" tabindex="-1"><a class="header-anchor" href="#_1-2、构建阶段" aria-hidden="true">#</a> 1.2、构建阶段</h3>
<p>构建阶段从 <code v-pre>entry</code> 开始递归解析资源与资源的依赖，在 <code v-pre>compilation</code> 对象内逐步构建出 <code v-pre>module</code> 集合以及 <code v-pre>module</code> 之间的依赖关系</p>
<p>调用 <code v-pre>handleModuleCreate</code> ，根据文件类型构建 <code v-pre>module</code> 子类</p>
<p>调用 <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Floader-runner" target="_blank" rel="noopener noreferrer">loader-runner<ExternalLinkIcon/></a> 仓库的 <code v-pre>runLoaders</code> 转译 <code v-pre>module</code> 内容，通常是从各类资源类型转译为 JavaScript 文本</p>
<p>调用 <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Facorn" target="_blank" rel="noopener noreferrer">acorn<ExternalLinkIcon/></a> 将 JS 文本解析为AST</p>
<p>遍历 AST，触发各种钩子</p>
<ol>
<li>在 <code v-pre>HarmonyExportDependencyParserPlugin</code> 插件监听 <code v-pre>exportImportSpecifier</code> 钩子，解读 JS 文本对应的资源依赖</li>
<li>调用 <code v-pre>module</code> 对象的 <code v-pre>addDependency</code> 将依赖对象加入到 <code v-pre>module</code> 依赖列表中</li>
</ol>
<p>AST 遍历完毕后，调用 <code v-pre>module.handleParseResult</code> 处理模块依赖</p>
<p>对于 <code v-pre>module</code> 新增的依赖，调用 <code v-pre>handleModuleCreate</code> ，控制流回到第一步</p>
<p>所有依赖都解析完毕后，构建阶段结束</p>
<p>总结如下-》</p>
<ul>
<li>构建阶段会读取源码，解析为 AST 集合。</li>
<li>Webpack 读出 AST 之后仅遍历 AST 集合；babel 则对源码做等价转换</li>
<li>Webpack 遍历 AST 集合过程中，识别 <code v-pre>require/ import</code> 之类的导入语句，确定模块对其他资源的依赖关系</li>
</ul>
<h3 id="_1-3、生成阶段" tabindex="-1"><a class="header-anchor" href="#_1-3、生成阶段" aria-hidden="true">#</a> 1.3、生成阶段</h3>
<p>开始执行 <code v-pre>compilation.seal</code> 函数：完成从 <code v-pre>module</code> 到 <code v-pre>chunks</code> 的转化</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>javascript复制代码<span class="token comment">// 取自 webpack/lib/compiler.js </span>
<span class="token function">compile</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> params <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">newCompilationParams</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>beforeCompile<span class="token punctuation">.</span><span class="token function">callAsync</span><span class="token punctuation">(</span>params<span class="token punctuation">,</span> <span class="token parameter">err</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
      <span class="token keyword">const</span> compilation <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">newCompilation</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>make<span class="token punctuation">.</span><span class="token function">callAsync</span><span class="token punctuation">(</span>compilation<span class="token punctuation">,</span> <span class="token parameter">err</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>finishMake<span class="token punctuation">.</span><span class="token function">callAsync</span><span class="token punctuation">(</span>compilation<span class="token punctuation">,</span> <span class="token parameter">err</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token comment">// ...</span>
          process<span class="token punctuation">.</span><span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            compilation<span class="token punctuation">.</span><span class="token function">finish</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token operator">**</span>compilation<span class="token punctuation">.</span>seal<span class="token operator">**</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-如何实现的分包" tabindex="-1"><a class="header-anchor" href="#_2-如何实现的分包" aria-hidden="true">#</a> 2.如何实现的分包</h2>
<h2 id="_3-webpack的缓存机制" tabindex="-1"><a class="header-anchor" href="#_3-webpack的缓存机制" aria-hidden="true">#</a> 3.webpack的缓存机制</h2>
<h2 id="_3-loader和plugin" tabindex="-1"><a class="header-anchor" href="#_3-loader和plugin" aria-hidden="true">#</a> 3.loader和plugin</h2>
<h3 id="_3-1、plugin" tabindex="-1"><a class="header-anchor" href="#_3-1、plugin" aria-hidden="true">#</a> 3.1、plugin</h3>
<p>插件通常是一个带有 <code v-pre>apply</code> 函数的类：<code v-pre>apply</code> 函数运行时会得到参数 <code v-pre>compiler</code> ，以此为起点可以调用 <code v-pre>hook</code> 对象注册各种钩子回调，例如： <code v-pre>compiler.hooks.make.tapAsync</code> ，这里面 <code v-pre>make</code> 是钩子名称，<code v-pre>tapAsync</code> 定义了钩子的调用方式，webpack 的插件架构基于这种模式构建而成，插件开发者可以使用这种模式在钩子回调中，插入特定代码。webpack 各种内置对象都带有 <code v-pre>hooks</code> 属性，比如 <code v-pre>compilation</code> 对象：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">SomePlugin</span> <span class="token punctuation">{</span>
    <span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">compiler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>常用的钩子</p>
<p><code v-pre>compiler.hooks.compilation</code> ：</p>
<ul>
<li>时机：启动编译创建出 compilation 对象后触发</li>
<li>参数：当前编译的 compilation 对象</li>
<li>示例：很多插件基于此事件获取 compilation 实例</li>
</ul>
<p><code v-pre>compiler.hooks.make</code>：</p>
<ul>
<li>时机：正式开始编译时触发</li>
<li>参数：同样是当前编译的 <code v-pre>compilation</code> 对象</li>
<li>示例：webpack 内置的 <code v-pre>EntryPlugin</code> 基于此钩子实现 <code v-pre>entry</code> 模块的初始化</li>
</ul>
<p><code v-pre>compilation.hooks.optimizeChunks</code> ：</p>
<ul>
<li>时机： <code v-pre>seal</code> 函数中，<code v-pre>chunk</code> 集合构建完毕后触发</li>
<li>参数：<code v-pre>chunks</code> 集合与 <code v-pre>chunkGroups</code> 集合</li>
<li>示例： <code v-pre>SplitChunksPlugin</code> 插件基于此钩子实现 <code v-pre>chunk</code> 拆分优化</li>
</ul>
<p><code v-pre>compiler.hooks.done</code>：</p>
<ul>
<li>时机：编译完成后触发</li>
<li>参数： <code v-pre>stats</code> 对象，包含编译过程中的各类统计信息</li>
<li>示例： <code v-pre>webpack-bundle-analyzer</code> 插件基于此钩子实现打包分析</li>
</ul>
<h3 id="_3-2、loader" tabindex="-1"><a class="header-anchor" href="#_3-2、loader" aria-hidden="true">#</a> 3.2、loader</h3>
<p>loader 用于对模块的源代码进行转换。loader 可以使你在 <code v-pre>import</code> 或 &quot;load(加载)&quot; 模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的得力方式。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript 或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 <code v-pre>import</code> CSS 文件！</p>
<p>loader 的职责不外乎是将内容 A 转化为内容 B，但是在具体用法层面还挺多讲究的，有 pitch、pre、post、inline 等概念用于应对各种场景。</p>
<p><strong>1.loader的配置</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">.ts$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token string">'ts-loader'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2.loader的执行顺序</strong></p>
<ul>
<li>相同优先级的 loader 执行顺序为：<code v-pre>从右到左，从下到上</code>。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">.less$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'style-loader'</span><span class="token punctuation">,</span><span class="token string">'css-loader'</span><span class="token punctuation">,</span><span class="token string">'less-loader'</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3.loader结构</strong></p>
<p>当只有一个 loader 应用于资源文件时，它接收源码作为参数，输出转换后的 js 代码。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">loader</span> <span class="token punctuation">(</span><span class="token parameter">source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> source<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="pitch" tabindex="-1"><a class="header-anchor" href="#pitch" aria-hidden="true">#</a> pitch</h4>
<p><code v-pre>pitch</code> 是 loader 上的一个方法，它的作用是阻断 loader 链。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// loaders/simple-loader-with-pitch.js</span>
<span class="token keyword">const</span> <span class="token function-variable function">loader</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'normal excution'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   
    <span class="token keyword">return</span> source<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
loader<span class="token punctuation">.</span><span class="token function-variable function">pitch</span> <span class="token operator">=</span>  <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'pitching graph'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// loader上的pitch方法，非必须</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> loader
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>webpack 会先从左到右执行 loader 链中的每个 loader 上的 pitch 方法（如果有），然后再从右到左执行 loader 链中的每个 loader 上的普通 loader 方法。在这个过程中如果任何 pitch 有返回值，则 loader 链被阻断。webpack 会跳过后面所有的的 pitch 和 loader，直接进入上一个 loader 去执行。</p>
<p><img src="/Webpack/loader.png" alt=""></p>
<h2 id="_4-性能分析工具" tabindex="-1"><a class="header-anchor" href="#_4-性能分析工具" aria-hidden="true">#</a> 4.性能分析工具</h2>
<p>①添加 <code v-pre>profile = true</code> 配置：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// webpack.config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token literal-property property">profile</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②运行编译命令，并添加 <code v-pre>--json</code> 参数，参数值为最终生成的统计文件名，然后https://mshustov.github.io/webpack-deps-tree/static/打开生成的json文件可以看到一些详细信息</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code>npx webpack --json=stats.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>modules</code>：本次打包处理的所有模块列表，内容包含模块的大小、所属 <code v-pre>chunk</code>、构建原因、依赖模块等，特别是 <code v-pre>modules.profile</code> 属性，包含了构建该模块时，解析路径、编译、打包、子模块打包等各个环节所花费的时间，非常有用；</li>
<li><code v-pre>chunks</code>：构建过程生成的 <code v-pre>chunks</code> 列表，数组内容包含 <code v-pre>chunk</code> 名称、大小、包含了哪些模块等；</li>
<li><code v-pre>assets</code>：编译后最终输出的产物列表、文件路径、文件大小等；</li>
<li><code v-pre>entrypoints</code>：entry 列表，包括动态引入所生产的 entry 项也会包含在这里面；</li>
<li><code v-pre>children</code>：子 Compiler 对象的性能数据，例如 <code v-pre>extract-css-chunk-plugin</code> 插件内部就会调用 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub1s.com%2Ffaceyspacey%2Fextract-css-chunks-webpack-plugin%2Fblob%2FHEAD%2Fsrc%2Floader.js%23L82" target="_blank" rel="noopener noreferrer">compilation.createChildCompiler<ExternalLinkIcon/></a> 函数创建出子 Compiler 来做 CSS 抽取的工作。</li>
</ul>
<p>③statoscope也是一个非常强大的可视化分析工具，主要提供如下功能：</p>
<ul>
<li>完整的依赖关系视图，涵盖 modules/chunks/assets/entrypoints/packages 维度；</li>
<li>entrypoints/chunks/packages/module 体积分析；</li>
<li>重复包检测；</li>
<li>多份 <code v-pre>stats</code> 数据对比；</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> @statoscope/webpack-plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> StatoscopeWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'@statoscope/webpack-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>default<span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">StatoscopeWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>④Webpack Bundle Analyzer</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> webpack-bundle-analyzer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> BundleAnalyzerPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"webpack-bundle-analyzer"</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span>BundleAnalyzerPlugin<span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">BundleAnalyzerPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
也可以直接打开json
npx webpack<span class="token operator">-</span>bundle<span class="token operator">-</span>analyzer <span class="token punctuation">.</span><span class="token operator">/</span>stats<span class="token punctuation">.</span>json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>⑤Webpack Visualizer</p>
<p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fchrisbateman.github.io%2Fwebpack-visualizer%2F" target="_blank" rel="noopener noreferrer">Webpack Visualizer<ExternalLinkIcon/></a> 是一个在线分析工具，可用于检测、可视化 Webpack 产物的构成模块。有两种用法，一是将 <code v-pre>stats.json</code> 文件上传到在线 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fchrisbateman.github.io%2Fwebpack-visualizer%2F" target="_blank" rel="noopener noreferrer">页面<ExternalLinkIcon/></a>；二是使用 <code v-pre>webpack-visualizer-plugin</code> 生成统计页面，用法：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">add</span> —D webpack-visualizer-plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// webpack.config.js</span>
<span class="token keyword">const</span> VisualizerPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack-visualizer-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">Visualizer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'./stats.html'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token comment">//...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>⑥Webpack Dashboard</p>
<p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fwebpack-dashboard" target="_blank" rel="noopener noreferrer">webpack-dashboard<ExternalLinkIcon/></a> 是一个命令行可视化工具，能够在编译过程中实时展示编译进度、模块分布、产物信息等，用法：</p>
<ol>
<li>安装依赖：</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> webpack-dashboard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol>
<li>注册插件：</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> DashboardPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"webpack-dashboard/plugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">DashboardPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>注意了，需要用 <code v-pre>webpack-dashboard</code> 命令启动编译：</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 打包</span>
npx webpack-dashboard -- webpack
<span class="token comment"># Dev Server</span>
npx webpack-dashboard -- webpack-dev-server
<span class="token comment"># 运行 Node 程序</span>
npx webpack-dashboard -- <span class="token function">node</span> index.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，就可以在命令行看到一个漂亮的可视化界面：</p>
<h2 id="_5、性能优化之开发环境性能" tabindex="-1"><a class="header-anchor" href="#_5、性能优化之开发环境性能" aria-hidden="true">#</a> 5、性能优化之开发环境性能</h2>
<h3 id="_1-持久化缓存" tabindex="-1"><a class="header-anchor" href="#_1-持久化缓存" aria-hidden="true">#</a> 1.持久化缓存</h3>
<p>Webpack5 会将首次构建出的 Module、Chunk、ModuleGraph 等对象序列化后保存到硬盘中，后面再运行的时候，就可以跳过许多耗时的编译动作，直接复用缓存数据。</p>
<p>仅仅需要在 Webpack5 中设置 <code v-pre>cache.type = 'filesystem'</code> 即可开启。</p>
<ul>
<li>
<p><code v-pre>cache.type</code>：缓存类型，支持 <code v-pre>'memory' | 'filesystem'</code>，需要设置为 <code v-pre>filesystem</code> 才能开启持久缓存；</p>
</li>
<li>
<p><code v-pre>cache.cacheDirectory</code>：缓存文件路径，默认为 <code v-pre>node_modules/.cache/webpack</code> ；</p>
</li>
<li>
<p><code v-pre>cache.buildDependencies</code>：额外的依赖文件，当这些文件内容发生变化时，缓存会完全失效而执行完整的编译构建，通常可设置为各种配置文件，如下：</p>
<ul>
<li>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">cache</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'filesystem'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">buildDependencies</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">config</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token comment">// 当下面文件变化会重新编译构建</span>
        path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'webpack.dll_config.js'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'.babelrc'</span><span class="token punctuation">)</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p><code v-pre>cache.managedPaths</code>：受控目录，Webpack 构建时会跳过新旧代码哈希值与时间戳的对比，直接使用缓存副本，默认值为 <code v-pre>['./node_modules']</code>；</p>
</li>
<li>
<p><code v-pre>cache.profile</code>：是否输出缓存处理过程的详细日志，默认为 <code v-pre>false</code>；</p>
</li>
<li>
<p><code v-pre>cache.maxAge</code>：缓存失效时间，默认值为 <code v-pre>5184000000</code> 。</p>
</li>
</ul>
<h3 id="_2-并行构建" tabindex="-1"><a class="header-anchor" href="#_2-并行构建" aria-hidden="true">#</a> 2.并行构建</h3>
<p>①使用 HappyPack</p>
<p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Famireh%2Fhappypack" target="_blank" rel="noopener noreferrer">HappyPack<ExternalLinkIcon/></a> 能够将耗时的<strong>文件加载</strong>（Loader）操作拆散到多个子进程中并发执行，子进程执行完毕后再将结果合并回传到 Webpack 进程，从而提升构建性能。不过，HappyPack 的用法稍微有点难以理解，需要同时：</p>
<ul>
<li>使用 <code v-pre>happypack/loader</code> 代替原本的 Loader 序列；</li>
<li>使用 <code v-pre>HappyPack</code> 插件注入代理执行 Loader 序列的逻辑。</li>
</ul>
<ol>
<li>安装依赖：</li>
</ol>
<div class="language-Bash line-numbers-mode" data-ext="Bash"><pre v-pre class="language-Bash"><code>pnpm add -D happypack
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol>
<li>将原有 <code v-pre>loader</code> 配置替换为 <code v-pre>happypack/loader</code>，如：</li>
</ol>
<div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre v-pre class="language-JavaScript"><code>module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: &quot;happypack/loader&quot;,
        // 原始配置如：
        // use: [
        //  {
        //      loader: 'babel-loader',
        //      options: {
        //          presets: ['@babel/preset-env']
        //      }
        //  },
        //  'eslint-loader'
        // ]
      },
    ],
  },
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>创建 <code v-pre>happypack</code> 插件实例，并将原有 loader 配置迁移到插件中，完整配置：</li>
</ol>
<div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre v-pre class="language-JavaScript"><code>const HappyPack = require(&quot;happypack&quot;);

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: &quot;happypack/loader&quot;,
        // 原始配置如：
        // use: [
        //  {
        //      loader: 'babel-loader',
        //      options: {
        //          presets: ['@babel/preset-env']
        //      }
        //  },
        //  'eslint-loader'
        // ]
      },
    ],
  },
  plugins: [
    new HappyPack({
      // 将原本定义在 `module.rules.use` 中的 Loader 配置迁移到 HappyPack 实例中
      loaders: [
        {
          loader: &quot;babel-loader&quot;,
          option: {
            presets: [&quot;@babel/preset-env&quot;],
          },
        },
        &quot;eslint-loader&quot;,
      ],
    }),
  ],
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②thread-loader</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> thread-loader
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Thread-loader 还提供了一系列用于控制并发逻辑的配置项，包括：</p>
<ul>
<li><code v-pre>workers</code>：子进程总数，默认值为 <code v-pre>require('os').cpus() - 1</code>；</li>
<li><code v-pre>workerParallelJobs</code>：单个进程中并发执行的任务数；</li>
<li><code v-pre>poolTimeout</code>：子进程如果一直保持空闲状态，超过这个时间后会被关闭；</li>
<li><code v-pre>poolRespawn</code>：是否允许在子进程关闭后重新创建新的子进程，一般设置为 <code v-pre>false</code> 即可；</li>
<li><code v-pre>workerNodeArgs</code>：用于设置启动子进程时，额外附加的参数。</li>
</ul>
<p>Thread-loader 也同样面临着频繁的子进程创建、销毁所带来的性能问题，为此，Thread-loader 提供了 <code v-pre>warmup</code> 接口用于前置创建若干工作子进程，降低构建时延，</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> threadLoader <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"thread-loader"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

threadLoader<span class="token punctuation">.</span><span class="token function">warmup</span><span class="token punctuation">(</span>
  <span class="token punctuation">{</span>
    <span class="token comment">// 可传入上述 thread-loader 参数</span>
    <span class="token literal-property property">workers</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token literal-property property">workerParallelJobs</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>
    <span class="token comment">// 子进程中需要预加载的 node 模块</span>
    <span class="token string">"babel-loader"</span><span class="token punctuation">,</span>
    <span class="token string">"babel-preset-es2015"</span><span class="token punctuation">,</span>
    <span class="token string">"sass-loader"</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-懒编译" tabindex="-1"><a class="header-anchor" href="#_3-懒编译" aria-hidden="true">#</a> 3.懒编译</h3>
<p>Webpack 5.17.0 之后引入实验特性 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Fexperiments%2F%23experimentslazycompilation" target="_blank" rel="noopener noreferrer">lazyCompilation<ExternalLinkIcon/></a>，用于实现 <code v-pre>entry</code> 或异步引用模块的<strong>按需编译</strong>，这是一个非常实用的新特性！</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// webpack.config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token literal-property property">experiments</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">lazyCompilation</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动 <code v-pre>lazyCompilation</code> 后，代码中通过异步引用语句如 <code v-pre>import('./xxx')</code> 导入的模块（以及未被访问到的 <code v-pre>entry</code>）都不会被立即编译，而是直到页面正式请求该模块资源（例如切换到该路由）时才开始构建，效果与 Vite 相似，能够极大提升冷启速度。</p>
<p>此外，<code v-pre>lazyCompilation</code> 支持如下参数：</p>
<ul>
<li><code v-pre>backend</code>： 设置后端服务信息，一般保持默认值即可；</li>
<li><code v-pre>entries</code>：设置是否对 <code v-pre>entry</code> 启动按需编译特性；</li>
<li><code v-pre>imports</code>：设置是否对异步模块启动按需编译特性；</li>
<li><code v-pre>test</code>：支持正则表达式，用于声明对那些异步模块启动按需编译特性。</li>
</ul>
<h3 id="_4-开发模式禁用产物优化" tabindex="-1"><a class="header-anchor" href="#_4-开发模式禁用产物优化" aria-hidden="true">#</a> 4.开发模式禁用产物优化</h3>
<ul>
<li>确保 <code v-pre>mode='development'</code> 或 <code v-pre>mode = 'none'</code>，关闭默认优化策略；</li>
<li><code v-pre>optimization.minimize</code> 保持默认值或 <code v-pre>false</code>，关闭代码压缩；</li>
<li><code v-pre>optimization.concatenateModules</code> 保持默认值或 <code v-pre>false</code>，关闭模块合并；</li>
<li><code v-pre>optimization.splitChunks</code> 保持默认值或 <code v-pre>false</code>，关闭代码分包；</li>
<li><code v-pre>optimization.usedExports</code> 保持默认值或 <code v-pre>false</code>，关闭 Tree-shaking 功能；</li>
</ul>
<h3 id="_5-搜小watch监控返回" tabindex="-1"><a class="header-anchor" href="#_5-搜小watch监控返回" aria-hidden="true">#</a> 5.搜小watch监控返回</h3>
<p>通常情况下前端项目中部分资源并不会频繁更新，例如 <code v-pre>node_modules</code> ，此时可以设置 <code v-pre>watchOptions.ignored</code> 属性忽略这些文件，例如：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// webpack.config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
  <span class="token literal-property property">watchOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">ignored</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">node_modules</span><span class="token regex-delimiter">/</span></span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-source-map" tabindex="-1"><a class="header-anchor" href="#_6-source-map" aria-hidden="true">#</a> 6.source-map</h3>
<p><code v-pre>source-map</code> 是一种将经过编译、压缩、混淆的代码映射回源码的技术，它能够帮助开发者迅速定位到更有意义、更结构化的源码中，方便调试。不过，<code v-pre>source-map</code> 操作本身也有很大构建性能开销，建议读者根据实际场景慎重选择最合适的 <code v-pre>source-map</code> 方案。</p>
<p>针对 <code v-pre>source-map</code> 功能，Webpack 提供了 <code v-pre>devtool</code> 选项，可以配置 <code v-pre>eval</code>、<code v-pre>source-map</code>、<code v-pre>cheap-source-map</code> 等值，不考虑其它因素的情况下，最佳实践：</p>
<ul>
<li>
<p>开发环境使用 <code v-pre>eval</code> ，确保最佳编译速度；</p>
</li>
<li>
<p>生产环境使用 <code v-pre>source-map</code>，获取最高质量。</p>
</li>
</ul>
<h2 id="_6、性能优化之生产环境性能" tabindex="-1"><a class="header-anchor" href="#_6、性能优化之生产环境性能" aria-hidden="true">#</a> 6、性能优化之生产环境性能</h2>
<h3 id="_1-分包" tabindex="-1"><a class="header-anchor" href="#_1-分包" aria-hidden="true">#</a> 1.分包</h3>
<p>SplitChunksPlugin，由于 Webpack4 开始已经内置支持 <code v-pre>SplitChunksPlugin</code> ，我们不需要额外安装依赖，直接修改 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foptimization%2F%23optimizationsplitchunks" target="_blank" rel="noopener noreferrer">optimization.splitChunks<ExternalLinkIcon/></a> 配置项即可实现自定义的分包策略：</p>
<ul>
<li>
<p>SplitChunksPlugin 支持根据 Module 路径、Module 被引用次数、Chunk 大小、Chunk 请求数等决定是否对 Chunk 做进一步拆解，这些决策都可以通过 optimization.splitChunks 相应配置项调整定制，基于这些能力我们可以实现：</p>
<ul>
<li>单独打包某些特定路径的内容，例如 node_modules 打包为 vendors；</li>
<li>单独打包使用频率较高的文件；</li>
</ul>
</li>
<li>
<p>SplitChunksPlugin 还提供了 optimization.splitChunks.cacheGroup 概念，用于对不同特点的资源做分组处理，并为这些分组设置更有针对性的分包规则；</p>
</li>
<li>
<p>SplitChunksPlugin 还内置了 default 与 defaultVendors 两个 cacheGroup，提供一些开箱即用的分包特性：</p>
<ul>
<li>node_modules 资源会命中 defaultVendors 规则，并被单独打包；</li>
<li>只有包体超过 20kb 的 Chunk 才会被单独打包；</li>
<li>加载 Async Chunk 所需请求数不得超过 30；</li>
<li>加载 Initial Chunk 所需请求数不得超过 30。</li>
</ul>
<p><code v-pre>chunks</code> 调整作用范围，该配置项支持如下值：</p>
<ul>
<li>字符串 <code v-pre>'all'</code> ：对 Initial Chunk 与 Async Chunk 都生效，建议优先使用该值；</li>
<li>字符串 <code v-pre>'initial'</code> ：只对 Initial Chunk 生效；</li>
<li>字符串 <code v-pre>'async'</code> ：只对 Async Chunk 生效；</li>
<li>函数 <code v-pre>(chunk) =&gt; boolean</code> ：该函数返回 <code v-pre>true</code> 时生效；</li>
</ul>
<p>限制分包体积</p>
<ul>
<li><code v-pre>minSize</code>： 超过这个尺寸的 Chunk 才会正式被分包；</li>
<li><code v-pre>maxSize</code>： 超过这个尺寸的 Chunk 会尝试进一步拆分出更小的 Chunk；</li>
<li><code v-pre>maxAsyncSize</code>： 与 <code v-pre>maxSize</code> 功能类似，但只对异步引入的模块生效；</li>
<li><code v-pre>maxInitialSize</code>： 与 <code v-pre>maxSize</code> 类似，但只对 <code v-pre>entry</code> 配置的入口模块生效；</li>
<li><code v-pre>enforceSizeThreshold</code>： 超过这个尺寸的 Chunk 会被强制分包，忽略上述其它 Size 限制。</li>
</ul>
<p>限制分包数量：在 <code v-pre>minChunks</code> 基础上，为防止最终产物文件数量过多导致 HTTP 网络请求数剧增，反而降低应用性能，Webpack 还提供了 <code v-pre>maxInitialRequest/maxAsyncRequest</code> 配置项，用于限制分包数量：</p>
<ul>
<li><code v-pre>maxInitialRequest</code>：用于设置 Initial Chunk 最大并行请求数；</li>
<li><code v-pre>maxAsyncRequests</code>：用于设置 Async Chunk 最大并行请求数。</li>
</ul>
<p>缓存组：用于为不同文件组设置不同的规则，例如：</p>
<ul>
<li>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
  <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">splitChunks</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">cacheGroups</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">vendors</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[\\/]node_modules[\\/]</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
            <span class="token literal-property property">minChunks</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token literal-property property">minSize</span><span class="token operator">:</span> <span class="token number">0</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">//所有命中 vendors.test 规则的模块都会被归类 vendors 分组，优先应用该组下的 minChunks、minSize 等分包配置。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>test</code>：接受正则表达式、函数及字符串，所有符合 <code v-pre>test</code> 判断的 Module 或 Chunk 都会被分到该组；</p>
</li>
<li>
<p><code v-pre>type</code>：接受正则表达式、函数及字符串，与 <code v-pre>test</code> 类似均用于筛选分组命中的模块，区别是它判断的依据是文件类型而不是文件名，例如 <code v-pre>type = 'json'</code> 会命中所有 JSON 文件；</p>
</li>
<li>
<p><code v-pre>idHint</code>：字符串型，用于设置 Chunk ID，它还会被追加到最终产物文件名中，例如 <code v-pre>idHint = 'vendors'</code> 时，输出产物文件名形如 <code v-pre>vendors-xxx-xxx.js</code> ；</p>
</li>
<li>
<p><code v-pre>priority</code>：数字型，用于设置该分组的优先级，若模块命中多个缓存组，则优先被分到 <code v-pre>priority</code> 更大的组。</p>
</li>
</ul>
</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
  <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">splitChunks</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
      <span class="token comment">// 设定引用次数超过 2 的模块才进行分包</span>
      <span class="token literal-property property">minChunks</span><span class="token operator">:</span> <span class="token number">2</span>
      maxInitialRequest：<span class="token number">2</span><span class="token comment">//用于设置 Initial Chunk 最大并行请求数；</span>
	  maxAsyncRequests：<span class="token number">2</span><span class="token comment">//用于设置 Async Chunk 最大并行请求数。</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-压缩" tabindex="-1"><a class="header-anchor" href="#_2-压缩" aria-hidden="true">#</a> 2.压缩</h3>
<h4 id="js压缩" tabindex="-1"><a class="header-anchor" href="#js压缩" aria-hidden="true">#</a> js压缩</h4>
<p>Webpack5.0 后默认使用 Terser 作为 JavaScript 代码压缩器，简单用法只需通过 <code v-pre>optimization.minimize</code> 配置项开启压缩功能即可。</p>
<p>Terser 支持许多压缩 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fterser%2Fterser%23compress-options" target="_blank" rel="noopener noreferrer">配置<ExternalLinkIcon/></a>：</p>
<ul>
<li><code v-pre>dead_code</code>：是否删除不可触达的代码 —— 也就是所谓的死代码；</li>
<li><code v-pre>booleans_as_integers</code>：是否将 Boolean 值字面量转换为 0、1；</li>
<li><code v-pre>join_vars</code>：是否合并连续的变量声明，如 <code v-pre>var a = 1; var b = 2;</code> 合并为 <code v-pre>var a=1,b=2;</code></li>
</ul>
<p>多数情况下使用默认 Terser 配置即可，必要时也可以手动创建 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebpack-contrib%2Fterser-webpack-plugin" target="_blank" rel="noopener noreferrer">terser-webpack-plugin<ExternalLinkIcon/></a> 实例并传入压缩配置实现更精细的压缩功能，例如：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> TerserPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"terser-webpack-plugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">minimize</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token keyword">new</span> <span class="token class-name">TerserPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">terserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">compress</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">reduce_vars</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token literal-property property">pure_funcs</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"console.log"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token comment">// ...</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>提示：示例中的 <code v-pre>minimize</code> 用于控制是否开启压缩，只有 <code v-pre>minimize = true'</code> 时才会调用 <code v-pre>minimizer</code> 声明的压缩器数组（没错，这是数组形式）执行压缩操作。</p>
</div>
<p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebpack-contrib%2Fterser-webpack-plugin" target="_blank" rel="noopener noreferrer">terser-webpack-plugin<ExternalLinkIcon/></a> 插件并不只是 Terser 的简单包装，它更像是一个代码压缩功能骨架，底层还支持使用 SWC、UglifyJS、ESBuild 作为压缩器，使用时只需要通过 <code v-pre>minify</code> 参数切换即可，例如：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">minimize</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token keyword">new</span> <span class="token class-name">TerserPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">minify</span><span class="token operator">:</span> TerserPlugin<span class="token punctuation">.</span>swcMinify<span class="token punctuation">,</span>
        <span class="token comment">// `terserOptions` 将被传递到 `swc` (`@swc/core`) 工具</span>
        <span class="token comment">// 具体配置参数可参考：https://swc.rs/docs/config-js-minify</span>
        <span class="token literal-property property">terserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
TerserPlugin 内置如下压缩器：

TerserPlugin<span class="token punctuation">.</span>terserMinify：依赖于 terser 库；
TerserPlugin<span class="token punctuation">.</span>uglifyJsMinify：依赖于 uglify<span class="token operator">-</span>js，需要手动安装 yarn add <span class="token operator">-</span><span class="token constant">D</span> uglify<span class="token operator">-</span>js；
TerserPlugin<span class="token punctuation">.</span>swcMinify：依赖于 @swc<span class="token operator">/</span>core，需要手动安装 yarn add <span class="token operator">-</span><span class="token constant">D</span> @swc<span class="token operator">/</span>core；
TerserPlugin<span class="token punctuation">.</span>esbuildMinify：依赖于 esbuild，需要手动安装 yarn add <span class="token operator">-</span><span class="token constant">D</span> esbuild。
另外，terserOptions 配置也不仅仅专供 terser 使用，而是会透传给具体的 minifier，因此使用不同压缩器时支持的配置选项也会不同。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="css压缩" tabindex="-1"><a class="header-anchor" href="#css压缩" aria-hidden="true">#</a> css压缩</h4>
<p>CssMinimizerWebpackPlugin</p>
<ol>
<li>安装依赖：</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> css-minimizer-webpack-plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol>
<li>修改 Webpack 配置：</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> CssMinimizerPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"css-minimizer-webpack-plugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> MiniCssExtractPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"mini-css-extract-plugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token comment">// 注意，这里用的是 `MiniCssExtractPlugin.loader` 而不是 `style-loader`</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>MiniCssExtractPlugin<span class="token punctuation">.</span>loader<span class="token punctuation">,</span> <span class="token string">"css-loader"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">minimize</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token comment">// Webpack5 之后，约定使用 `'...'` 字面量保留默认 `minimizer` 配置</span>
      <span class="token string">"..."</span><span class="token punctuation">,</span>
      <span class="token keyword">new</span> <span class="token class-name">CssMinimizerPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 需要使用 `mini-css-extract-plugin` 将 CSS 代码抽取为单独文件</span>
  <span class="token comment">// 才能命中 `css-minimizer-webpack-plugin` 默认的 `test` 规则</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">MiniCssExtractPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的配置逻辑，一是使用 <code v-pre>mini-css-extract-plugin</code> 将 CSS 代码抽取为单独的 CSS 产物文件，这样才能命中 <code v-pre>css-minimizer-webpack-plugin</code> 默认的 <code v-pre>test</code> 逻辑；二是使用 <code v-pre>css-minimizer-webpack-plugin</code> 压缩 CSS 代码</p>
<ul>
<li><code v-pre>CssMinimizerPlugin.cssnanoMinify</code>：默认值，使用 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fcssnano.co%2F" target="_blank" rel="noopener noreferrer">cssnano<ExternalLinkIcon/></a> 压缩代码，不需要额外安装依赖；</li>
<li><code v-pre>CssMinimizerPlugin.cssoMinify</code>：使用 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fcss%2Fcsso" target="_blank" rel="noopener noreferrer">csso<ExternalLinkIcon/></a> 压缩代码，需要手动安装依赖 <code v-pre>yarn add -D csso</code>；</li>
<li><code v-pre>CssMinimizerPlugin.cleanCssMinify</code>：使用 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fclean-css%2Fclean-css" target="_blank" rel="noopener noreferrer">clean-css<ExternalLinkIcon/></a> 压缩代码，需要手动安装依赖 <code v-pre>yarn add -D clean-css</code>；</li>
<li><code v-pre>CssMinimizerPlugin.esbuildMinify</code>：使用 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fesbuild.github.io%2F" target="_blank" rel="noopener noreferrer">ESBuild<ExternalLinkIcon/></a> 压缩代码，需要手动安装依赖 <code v-pre>yarn add -D esbuild</code>；</li>
<li><code v-pre>CssMinimizerPlugin.parcelCssMinify</code>：使用 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fparcel-bundler%2Fparcel-css" target="_blank" rel="noopener noreferrer">parcel-css<ExternalLinkIcon/></a> 压缩代码，需要手动安装依赖 <code v-pre>yarn add -D</code> <code v-pre>@parcel/css</code>。</li>
<li>其中 <code v-pre>parcel-css</code> 与 <code v-pre>ESBuild</code> 压缩性能相对较佳</li>
</ul>
<h4 id="html压缩" tabindex="-1"><a class="header-anchor" href="#html压缩" aria-hidden="true">#</a> HTML压缩</h4>
<p><a href="https://github.com/terser/html-minifier-terser#options-quick-reference" target="_blank" rel="noopener noreferrer">html-minimizer-plugin<ExternalLinkIcon/></a></p>
<p><a href="https://webpack.js.org/plugins/html-minimizer-webpack-plugin/" target="_blank" rel="noopener noreferrer">HtmlMinimizerWebpackPlugin<ExternalLinkIcon/></a></p>
<p>现代 Web 应用大多会选择使用 React、Vue 等 MVVM 框架，这衍生出来的一个副作用是原生 HTML 的开发需求越来越少，HTML 代码占比越来越低，所以大多数现代 Web 项目中其实并不需要考虑为 HTML 配置代码压缩工作流。不过凡事都有例外，某些场景如 SSG 或官网一类偏静态的应用中就存在大量可被优化的 HTML 代码，为此社区也提供了一些相关的工程化工具，例如 <code v-pre>html-minifier-terser</code>。</p>
<ol>
<li>安装依赖：</li>
</ol>
<div class="language-csharp line-numbers-mode" data-ext="cs"><pre v-pre class="language-csharp"><code>yarn <span class="token keyword">add</span> <span class="token operator">-</span>D html<span class="token operator">-</span>minimizer<span class="token operator">-</span>webpack<span class="token operator">-</span>plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol>
<li>修改 Webpack 配置，如：</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> HtmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"html-webpack-plugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> HtmlMinimizerPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"html-minimizer-webpack-plugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">minimize</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token comment">// Webpack5 之后，约定使用 `'...'` 字面量保留默认 `minimizer` 配置</span>
      <span class="token string">"..."</span><span class="token punctuation">,</span>
      <span class="token keyword">new</span> <span class="token class-name">HtmlMinimizerPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">minimizerOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token comment">// 折叠 Boolean 型属性</span>
          <span class="token literal-property property">collapseBooleanAttributes</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          <span class="token comment">// 使用精简 `doctype` 定义</span>
          <span class="token literal-property property">useShortDoctype</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          <span class="token comment">// ...</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// 简单起见，这里我们使用 `html-webpack-plugin` 自动生成 HTML 演示文件</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">templateContent</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    &lt;html>
      &lt;head>
        &lt;meta charset="UTF-8" />
        &lt;title>webpack App&lt;/title>
      &lt;/head>
      &lt;body>
        &lt;input readonly="readonly"/>
        &lt;!-- comments -->
        &lt;script src="index_bundle.js">&lt;/script>
      &lt;/body>
    &lt;/html></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-sourcemap" tabindex="-1"><a class="header-anchor" href="#_7-sourcemap" aria-hidden="true">#</a> 7.sourcemap</h2>
<p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fdocs.google.com%2Fdocument%2Fd%2F1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k%2Fedit%23heading%3Dh.qz3o9nc69um5" target="_blank" rel="noopener noreferrer">Sourcemap 协议<ExternalLinkIcon/></a> 最初由 Google 设计并率先在 Closure Inspector 实现，它的主要作用就是将经过压缩、混淆、合并的产物代码还原回未打包的原始形态，帮助开发者在生产环境中精确定位问题发生的行列位置</p>
<p>在 Webpack 内部，这段生成 Sourcemap 映射数据的逻辑并不复杂，一句话总结：在 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fapi%2Fcompilation-hooks%2F%23processassets" target="_blank" rel="noopener noreferrer">processAssets<ExternalLinkIcon/></a> 钩子遍历产物文件 <code v-pre>assets</code> 数组，调用 <code v-pre>webpack-sources</code> 提供的 <code v-pre>map</code> 方法，最终计算出 <code v-pre>asset</code> 与源码 <code v-pre>originSource</code> 之间的映射关系。</p>
<p>这个过程真正的难点在于 「如何计算映射关系」，因此本文会展开详细讲解 Sourcemap 映射结构与 VLQ 编码规则，以及 Webpack 提供的 <code v-pre>devtool</code> 配置项的详细用法。</p>
<p>Sourcemap 最初版本生成的 <code v-pre>.map</code> 文件非常大，体积大概为编译产物的 10 倍；V2 之后引入 Base64 编码等算法，将之减少 20% ~ 30%；而最新版本 V3 又在 V2 基础上引入 VLQ 算法，体积进一步压缩了 50%。</p>
<p>这一系列进化造就了一个效率极高的 Sourcemap 体系，但伴随而来的则是较为复杂的 <code v-pre>mappings</code> 编码规则。V3 版本 Sourcemap 文件由三部分组成:</p>
<ul>
<li>开发者编写的原始代码；</li>
<li>经过 Webpack 压缩、转化、合并后的产物，且产物中必须包含指向 Sourcemap 文件地址的 <code v-pre>//# sourceMappingURL=https://xxxx/bundle.js.map</code> 指令；</li>
<li>记录原始代码与经过工程化处理代码之间位置映射关系 Map 文件。</li>
</ul>
<p>页面初始运行时只会加载编译构建产物，直到特定事件发生 —— 例如在 Chrome 打开 Devtool 面板时，才会根据 <code v-pre>//# sourceMappingURL</code> 内容自动加载 Map 文件，并按 Sourcemap 协议约定的映射规则将代码重构还原回原始形态，这既能保证终端用户的性能体验，又能帮助开发者快速还原现场，提升线上问题的定位与调试效率。</p>
<h2 id="_8-原理" tabindex="-1"><a class="header-anchor" href="#_8-原理" aria-hidden="true">#</a> 8.原理</h2>
<p>Webpack 之所以能够应对 Web 场景下极度复杂、多样的构建需求，关键就在于其健壮、扩展性极强的插件架构，而插件架构的精髓又在于其灵活多变的 Hook 体系。Webpack 的插件体系是一种基于 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebpack%2Ftapable" target="_blank" rel="noopener noreferrer">Tapable<ExternalLinkIcon/></a> 实现的强耦合架构，它在特定时机触发钩子时会附带上足够的上下文信息，插件定义的钩子回调中，能也只能与这些上下文背后的数据结构、接口交互产生 side effect，进而影响到编译状态和后续流程。</p>
<CommentService/></div></template>


