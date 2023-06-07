<template><div><h1 id="搭建vue3ts" tabindex="-1"><a class="header-anchor" href="#搭建vue3ts" aria-hidden="true">#</a> 搭建Vue3ts</h1>
<h2 id="_1-搭建项目目录" tabindex="-1"><a class="header-anchor" href="#_1-搭建项目目录" aria-hidden="true">#</a> 1.搭建项目目录</h2>
<ol>
<li>
<p>src存放源代码</p>
</li>
<li>
<p>public存放静态资源</p>
</li>
<li>
<p><code v-pre>pnpm init</code>初始化<code v-pre>package.json</code></p>
</li>
<li>
<p><code v-pre>tsc --init</code>初始化<code v-pre>ts.config.json</code></p>
</li>
<li>
<p>创建<code v-pre>env.d.ts</code>声明文件</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">//这样main.ts引入vue文件ts就不会报错了</span>
<span class="token keyword">declare</span> <span class="token keyword">module</span> <span class="token string">"*.vue"</span> <span class="token punctuation">{</span>
    <span class="token keyword">import</span> <span class="token punctuation">{</span> DefineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vue"</span>
    <span class="token keyword">const</span> component<span class="token operator">:</span> DefineComponent<span class="token operator">&lt;</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">></span>
    <span class="token keyword">export</span> <span class="token keyword">default</span> component
<span class="token punctuation">}</span>


<span class="token keyword">declare</span> <span class="token keyword">module</span> <span class="token string">'*.svg'</span>
<span class="token keyword">declare</span> <span class="token keyword">module</span> <span class="token string">'*.png'</span>
<span class="token keyword">declare</span> <span class="token keyword">module</span> <span class="token string">'*.jpg'</span>
<span class="token keyword">declare</span> <span class="token keyword">module</span> <span class="token string">'*.jpeg'</span>
<span class="token keyword">declare</span> <span class="token keyword">module</span> <span class="token string">'*.gif'</span>
<span class="token keyword">declare</span> <span class="token keyword">module</span> <span class="token string">'*.bmp'</span>
<span class="token keyword">declare</span> <span class="token keyword">module</span> <span class="token string">'*.tiff'</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="_2-安装plugins" tabindex="-1"><a class="header-anchor" href="#_2-安装plugins" aria-hidden="true">#</a> 2.安装plugins</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#1.webpack相关依赖</span>
<span class="token function">pnpm</span> <span class="token function">add</span> webpack webpack-cli webpack-dev-server
<span class="token comment">#2.html自动引入</span>
<span class="token function">pnpm</span> <span class="token function">add</span> html-webpack-plugin
<span class="token comment">#3.DefinePlugin定义全局变量这里要配置proces.env.NODE_ENV,很多包依赖了这个全局变量，不配置会报错</span>
<span class="token comment">#Vue警告-Feature flags __VUE_OPTIONS_API__, __VUE_PROD_DEVTOOLS__ are not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.</span>
const <span class="token punctuation">{</span> Configuration, DefinePlugin <span class="token punctuation">}</span> <span class="token operator">=</span> require<span class="token punctuation">(</span><span class="token string">'webpack'</span><span class="token punctuation">)</span>
new DefinePlugin<span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token string">"process.env"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                    <span class="token punctuation">..</span>.env
                <span class="token punctuation">}</span>,
                <span class="token string">'__VUE_OPTIONS_API__'</span><span class="token builtin class-name">:</span> true,
                <span class="token string">'__VUE_PROD_DEVTOOLS__'</span><span class="token builtin class-name">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>,
<span class="token comment"># 4.分析打包体积使用的时候new webpackBundleAnalyzer.BundleAnalyzerPlugin()</span>
<span class="token comment">#（vite中可视化插件时 rollup-plugin-visualizer）import {visualizer}from 'rollup-plugin-visualizer'  visualizer({open:true})</span>
<span class="token function">pnpm</span> <span class="token function">install</span> webpack-bundle-analyzer --save-dev
<span class="token comment"># 5.</span>
<span class="token function">pnpm</span> i <span class="token parameter variable">-D</span> @swc/core swc-loader

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-安装loaders" tabindex="-1"><a class="header-anchor" href="#_3-安装loaders" aria-hidden="true">#</a> 3.安装loaders</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 识别vue文件</span>
<span class="token function">pnpm</span> <span class="token function">add</span> vue-loader@next @vue/compiler-sfc
<span class="token comment"># 解析样式文件</span>
<span class="token function">pnpm</span> <span class="token function">add</span> css-loader style-loader sass-loader node-sass
<span class="token comment"># 解析ts </span>
<span class="token function">pnpm</span> <span class="token function">add</span> typescript ts-loader
<span class="token comment"># postcss</span>
<span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> postcss postcss-loader autoprefixer
<span class="token comment"># 图片压缩</span>
<span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> image-webpack-loader
<span class="token comment"># babel</span>
<span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> @babel/core @babel/preset-env babel-loader @babel/preset-typescript
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-配置webpack-config-js" tabindex="-1"><a class="header-anchor" href="#_4-配置webpack-config-js" aria-hidden="true">#</a> 4.配置webpack.config.js</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> Configuration<span class="token punctuation">,</span> DefinePlugin <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span>
<span class="token comment">// plugins</span>
<span class="token keyword">const</span> htmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"html-webpack-plugin"</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> webpackBundleAnalyzer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack-bundle-analyzer'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> VueLoaderPlugin <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'vue-loader'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> MiniCssExtractPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"mini-css-extract-plugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> CssMinimizerPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"css-minimizer-webpack-plugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@type</span> <span class="token class-name"><span class="token punctuation">{</span>Configuration<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">const</span> port <span class="token operator">=</span> <span class="token number">8888</span>

<span class="token keyword">const</span> <span class="token function-variable function">wbConfig</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">env<span class="token punctuation">,</span> argv</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>env<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">mode</span><span class="token operator">:</span> env<span class="token punctuation">.</span>production <span class="token operator">?</span> <span class="token string">'production'</span> <span class="token operator">:</span> <span class="token string">'development'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">devtool</span><span class="token operator">:</span> env<span class="token punctuation">.</span>production <span class="token operator">?</span> <span class="token string">'source-map'</span> <span class="token operator">:</span> <span class="token string">'eval'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">'./src/main.ts'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">clean</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'[hash:8].js'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'./dist'</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.vue$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
                    <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token string">'vue-loader'</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span>
                    <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.s[ac]ss$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
                    <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>MiniCssExtractPlugin<span class="token punctuation">.</span>loader<span class="token punctuation">,</span> <span class="token string">'css-loader'</span><span class="token punctuation">,</span> <span class="token string">'sass-loader'</span><span class="token punctuation">]</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span>
                    <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.ts$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
                    <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">"ts-loader"</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token literal-property property">configFile</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span><span class="token function">cwd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">'tsconfig.json'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">appendTsSuffixTo</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.vue$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">]</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token keyword">new</span> <span class="token class-name">CssMinimizerPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">'@'</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'src'</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token literal-property property">extensions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'.vue'</span><span class="token punctuation">,</span> <span class="token string">'.js'</span><span class="token punctuation">,</span> <span class="token string">'ts'</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            port<span class="token punctuation">,</span>
            <span class="token literal-property property">open</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token comment">/* 启动HMR热更新 */</span>
            <span class="token literal-property property">hot</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token comment">/* 一旦devServer(port:8888)服务器接收到 ^/api/xxx 的请求,就会把请求转发到另外一个服务器(target)上 */</span>
                <span class="token string-property property">"/api"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">http://localhost:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>port<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
                    <span class="token comment">/* 路径重写(代理时发送到target的请求去掉/api前缀) */</span>
                    <span class="token literal-property property">pathRewrite</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">"^/api"</span><span class="token operator">:</span> <span class="token string">""</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token keyword">new</span> <span class="token class-name">htmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">'./public/index.html'</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token keyword">new</span> <span class="token class-name">VueLoaderPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token keyword">new</span> <span class="token class-name">DefinePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token string-property property">"process.env"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token operator">...</span>env
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">'__VUE_OPTIONS_API__'</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                <span class="token string-property property">'__VUE_PROD_DEVTOOLS__'</span><span class="token operator">:</span> <span class="token boolean">false</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token keyword">new</span> <span class="token class-name">webpackBundleAnalyzer<span class="token punctuation">.</span>BundleAnalyzerPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token keyword">new</span> <span class="token class-name">MiniCssExtractPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> wbConfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-性能分析工具" tabindex="-1"><a class="header-anchor" href="#_5-性能分析工具" aria-hidden="true">#</a> 5.性能分析工具</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">install</span> webpack-bundle-analyzer <span class="token parameter variable">-D</span>
<span class="token function">pnpm</span> i speed-measure-webpack-plugin <span class="token parameter variable">-D</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>
<span class="token keyword">const</span> webpackBundleAnalyzer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack-bundle-analyzer'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> SpeedMeasureWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'speed-measure-webpack-plugin'</span><span class="token punctuation">)</span>
<span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">SpeedMeasureWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">webpackBundleAnalyzer<span class="token punctuation">.</span>BundleAnalyzerPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-性能优化" tabindex="-1"><a class="header-anchor" href="#_6-性能优化" aria-hidden="true">#</a> 6.性能优化</h2>
<h3 id="生产环境优化" tabindex="-1"><a class="header-anchor" href="#生产环境优化" aria-hidden="true">#</a> 生产环境优化</h3>
<p>1.不打包Vue，但是这种方式有个缺点需要外链引入vue，如果用户网不好这种方式首屏加载很慢</p>
<pre><code>&lt;script src=&quot;https://unpkg.com/vue@3/dist/vue.global.js&quot;&gt;&lt;/script&gt;
</code></pre>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">externals</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">vue</span><span class="token operator">:</span> <span class="token string">'Vue'</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.css压缩</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">install</span> css-minimizer-webpack-plugin --save-dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> MiniCssExtractPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"mini-css-extract-plugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> CssMinimizerPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"css-minimizer-webpack-plugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.s[ac]ss$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
                <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>MiniCssExtractPlugin<span class="token punctuation">.</span>loader<span class="token punctuation">,</span> <span class="token string">'css-loader'</span><span class="token punctuation">,</span> <span class="token string">'sass-loader'</span><span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token keyword">new</span> <span class="token class-name">CssMinimizerPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token keyword">new</span> <span class="token class-name">webpackBundleAnalyzer<span class="token punctuation">.</span>BundleAnalyzerPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token class-name">MiniCssExtractPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="/Webpack/result1.png" alt="">  <img src="/Webpack/result2.png" alt=""></p>
<p>3.代码分割</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
     <span class="token literal-property property">splitChunks</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">minSize</span><span class="token operator">:</span> <span class="token number">20000</span><span class="token punctuation">,</span><span class="token comment">// 形成一个新代码块最小的体积</span>
                <span class="token literal-property property">maxAsyncRequests</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>   <span class="token comment">// 按需加载时候最大的并行请求数</span>
      <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="开发环境优化" tabindex="-1"><a class="header-anchor" href="#开发环境优化" aria-hidden="true">#</a> 开发环境优化</h3>
<p>1.压缩CompressionPlugin</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">CompressionPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.js$|\.html$|\.css|\.ts</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token comment">//匹配文件名</span>
                <span class="token literal-property property">threshold</span><span class="token operator">:</span> <span class="token number">10240</span><span class="token punctuation">,</span> <span class="token comment">//对超过10k的数据进行压缩</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><CommentService/></div></template>


