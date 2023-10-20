import{_ as s,M as a,p as e,q as t,N as p,a1 as o}from"./framework-a97ca956.js";const i={},l=o(`<h1 id="项目初始化" tabindex="-1"><a class="header-anchor" href="#项目初始化" aria-hidden="true">#</a> 项目初始化</h1><h2 id="eslint" tabindex="-1"><a class="header-anchor" href="#eslint" aria-hidden="true">#</a> eslint</h2><p>检测js代码</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">add</span> eslint <span class="token parameter variable">-D</span>
<span class="token comment"># 生成.eslint.cjs文件</span>
npx eslint <span class="token parameter variable">--init</span> 

  To check syntax only
  To check syntax and <span class="token function">find</span> problems <span class="token comment"># 选这个</span>
  To check syntax, <span class="token function">find</span> problems, and enforce code style
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// 运行环境</span>
    <span class="token string-property property">&quot;env&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">&quot;browser&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;es2021&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 继承规则</span>
    <span class="token string-property property">&quot;extends&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;eslint:recommended&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;plugin:vue/vue3-essential&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;plugin:@typescript-eslint/recommended&quot;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 为特定类型文件制定处理器</span>
    <span class="token string-property property">&quot;overrides&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 指定解析器</span>
    <span class="token string-property property">&quot;parser&quot;</span><span class="token operator">:</span> <span class="token string">&quot;@typescript-eslint/parser&quot;</span><span class="token punctuation">,</span>
    <span class="token comment">// 解析器选项</span>
    <span class="token string-property property">&quot;parserOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">&quot;ecmaVersion&quot;</span><span class="token operator">:</span> <span class="token string">&quot;latest&quot;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;sourceType&quot;</span><span class="token operator">:</span> <span class="token string">&quot;module&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 插件  检测vue和ts</span>
    <span class="token string-property property">&quot;plugins&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;vue&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;@typescript-eslint&quot;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 规则配置</span>
    <span class="token string-property property">&quot;rules&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">&quot;no-var&quot;</span><span class="token operator">:</span> <span class="token string">&quot;error&quot;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;no-multiple-empty-lines&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;warn&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">max</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;no-console&quot;</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">?</span> <span class="token string">&#39;error&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;off&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;no-debugger&quot;</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">?</span> <span class="token string">&#39;error&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;off&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;no-unexpected-multiline&quot;</span><span class="token operator">:</span> <span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;no-useless-escape&quot;</span><span class="token operator">:</span> <span class="token string">&#39;off&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;@typescript-eslint/no-unused-vars&quot;</span><span class="token operator">:</span> <span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;@typescript-eslint/prefer-ts-expect-error&quot;</span><span class="token operator">:</span> <span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span>
        <span class="token comment">// &quot;@typescript-eslint/no-explicit-any&quot;:&#39;off&#39;,</span>
        <span class="token string-property property">&quot;@typescript-eslint/no-non-null-assertion&quot;</span><span class="token operator">:</span> <span class="token string">&#39;off&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;@typescript-eslint/no-namespace&quot;</span><span class="token operator">:</span> <span class="token string">&quot;off&quot;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;@typescript-eslint/semi&quot;</span><span class="token operator">:</span> <span class="token string">&#39;off&#39;</span><span class="token punctuation">,</span>

        <span class="token string-property property">&quot;vue/muti-word-component-names&quot;</span><span class="token operator">:</span> <span class="token string">&#39;off&#39;</span><span class="token punctuation">,</span><span class="token comment">// 组件名 - 连接</span>
        <span class="token string-property property">&#39;vue/script-setup-uses-vars&#39;</span><span class="token operator">:</span> <span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;vue/no-mutating-props&#39;</span><span class="token operator">:</span> <span class="token string">&#39;off&#39;</span><span class="token punctuation">,</span><span class="token comment">// 不允许组件prop的改变</span>
        <span class="token string-property property">&#39;vue/attribute-hyphenation&#39;</span><span class="token operator">:</span> <span class="token string">&#39;off&#39;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置eslint的忽略文件</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>dist 
node_modules
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>脚本配置</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;lint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eslint src&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;fix&quot;</span><span class="token operator">:</span><span class="token string">&quot;eslint src --fix&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="prettier" tabindex="-1"><a class="header-anchor" href="#prettier" aria-hidden="true">#</a> prettier</h2><p>格式化代码</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> eslint-plugin-prettier prettier eslint-config-prettier
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>添加.prettierrc.json配置文件</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;singleQuote&quot;</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">// 字符串单引号</span>
    <span class="token property">&quot;semi&quot;</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token comment">// 不需要分号</span>
    <span class="token property">&quot;bracketSpacing&quot;</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">&quot;htmlWhitespacesSensitivity&quot;</span><span class="token operator">:</span><span class="token string">&quot;ignore&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;endOfLine&quot;</span><span class="token operator">:</span><span class="token string">&quot;auto&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;trailingComma&quot;</span><span class="token operator">:</span><span class="token string">&quot;all&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;tabWidth&quot;</span><span class="token operator">:</span><span class="token number">2</span> <span class="token comment">// 缩进</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置prettier忽略文件</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>/dist/*
/html/*
.local
/node_modules/** 
**/*.svg
**/*.sh
/public/*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="stylelint" tabindex="-1"><a class="header-anchor" href="#stylelint" aria-hidden="true">#</a> stylelint</h2><p>css格式规范和校验</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> sass-loader sass stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&#39;stylelint-config-standard&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;stylelint-config-html/vue&#39;</span><span class="token punctuation">,</span><span class="token comment">// template样式格式化</span>
        <span class="token string">&#39;stylelint-config-standard-scss&#39;</span><span class="token punctuation">,</span><span class="token comment">//scss插件</span>
        <span class="token string">&#39;stylelint-config-recommend-vue/scss&#39;</span><span class="token punctuation">,</span><span class="token comment">// vue中scss格式化</span>
        <span class="token string">&#39;stylelint-config-recess-order&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;stylelint-config-prettier&#39;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">overrides</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">files</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;**/*.(scss|css|vue|html)&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token literal-property property">customSyntax</span><span class="token operator">:</span> <span class="token string">&#39;postcss-scss&#39;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">files</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;**/*.(html|vue)&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token literal-property property">customSyntax</span><span class="token operator">:</span> <span class="token string">&#39;postcss-html&#39;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">ignoreFiles</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&#39;**/*.js&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;**/*.jsx&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;**/*.ts&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;**/*.tsx&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;**/*.json&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;**/*.yaml&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;**/*.md&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">&#39;value-keyword-case&#39;</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;no-descending-specificity&#39;</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;function-url-quotes&#39;</span><span class="token operator">:</span> <span class="token string">&#39;always&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;no-empty-source&#39;</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;selector-class-pattern&#39;</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;property-no-unknow&#39;</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;block-opening-brace-sapce-before&#39;</span><span class="token operator">:</span> <span class="token string">&#39;always&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;value-no-vendor-prefix&#39;</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;selector-pseudo-class-no-unknow&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">ignorePseudoClasses</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;global&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;v-deep&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;deeps&#39;</span><span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>脚本配置</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;format&quot;</span><span class="token operator">:</span><span class="token string">&quot;prettier --write \\&quot;./**/*/{html,vue,ts,js.json,md}\\&quot;&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;lint:eslint&quot;</span><span class="token operator">:</span><span class="token string">&quot;eslint src/**/*.{ts,vue} --cache --fix&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;lint:style&quot;</span><span class="token operator">:</span><span class="token string">&quot;stylelint src/**/*.{css,scss,vue} --cache --fix&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="husky配置" tabindex="-1"><a class="header-anchor" href="#husky配置" aria-hidden="true">#</a> husky配置</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> husky

npx husky-init   
<span class="token comment"># Activate hooks</span>
npx husky <span class="token function">install</span>
<span class="token comment"># 添加钩子</span>
npx husky <span class="token function">add</span> .husky/commit-msg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后可以在生成的文件中去配置运行命令</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token hashbang comment">#!/usr/bin/env sh</span>
<span class="token punctuation">.</span> <span class="token string">&quot;$(dirname -- &quot;</span>$0<span class="token string">&quot;)/_/husky.sh&quot;</span>

pnpm run format
pnpm run commitlint
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="commitlint" tabindex="-1"><a class="header-anchor" href="#commitlint" aria-hidden="true">#</a> commitlint</h2><p>git commit 规范</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">install</span>  <span class="token parameter variable">-D</span>  @commitlint/config-conventional @commitlint/cli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置</p><div class="language-commitlint.config.cjs line-numbers-mode" data-ext="commitlint.config.cjs"><pre class="language-commitlint.config.cjs"><code>module.exports = {
    extends: [&#39;@commitlint/config-conventional&#39;],
    rules: {
        &#39;type-enum&#39;: [
            2,
            &#39;always&#39;,
            [
                &#39;feat&#39;,
                &#39;fix&#39;,
                &#39;docs&#39;,
                &#39;style&#39;,
                &#39;refactor&#39;,
                &#39;perf&#39;,
                &#39;test&#39;,
                &#39;chore&#39;,
                &#39;revert&#39;,
                &#39;build&#39;
            ]
        ],
        &#39;type-case&#39;: [0],
        &#39;type-empty&#39;: [0],
        &#39;scope-empty&#39;: [0],
        &#39;scope-case&#39;: [0],
        &#39;subject-full-stop&#39;: [0, &#39;never&#39;],
        &#39;subject-case&#39;: [0, &#39;never&#39;],
        &#39;header-max-length&#39;: [0, &#39;always&#39;, 72],

    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;commitlint&quot;</span><span class="token operator">:</span><span class="token string">&quot;commitlint --config commitlint.config.cjs -e -V&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="统一包管理工具" tabindex="-1"><a class="header-anchor" href="#统一包管理工具" aria-hidden="true">#</a> 统一包管理工具</h2><p>写一个判断脚本</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">pnpm</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span>npm_execpath <span class="token operator">||</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">&#39;you must use pnpm as the package manager&#39;</span><span class="token punctuation">)</span>
    process<span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在package.json中配置install钩子执行该脚本</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;sciprt&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
     <span class="token property">&quot;preinstall&quot;</span><span class="token operator">:</span> <span class="token string">&quot;node preinstall.js&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,38);function c(r,u){const n=a("CommentService");return e(),t("div",null,[l,p(n)])}const v=s(i,[["render",c],["__file","项目初始化.html.vue"]]);export{v as default};
