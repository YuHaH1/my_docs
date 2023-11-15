<template><div><h1 id="项目初始化" tabindex="-1"><a class="header-anchor" href="#项目初始化" aria-hidden="true">#</a> 项目初始化</h1>
<h2 id="eslint" tabindex="-1"><a class="header-anchor" href="#eslint" aria-hidden="true">#</a> eslint</h2>
<p>检测js代码</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">add</span> eslint <span class="token parameter variable">-D</span>
<span class="token comment"># 生成.eslint.cjs文件</span>
npx eslint <span class="token parameter variable">--init</span> 

  To check syntax only
  To check syntax and <span class="token function">find</span> problems <span class="token comment"># 选这个</span>
  To check syntax, <span class="token function">find</span> problems, and enforce code style
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// 运行环境</span>
    <span class="token string-property property">"env"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">"browser"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token string-property property">"es2021"</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 继承规则</span>
    <span class="token string-property property">"extends"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">"eslint:recommended"</span><span class="token punctuation">,</span>
        <span class="token string">"plugin:vue/vue3-essential"</span><span class="token punctuation">,</span>
        <span class="token string">"plugin:@typescript-eslint/recommended"</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 为特定类型文件制定处理器</span>
    <span class="token string-property property">"overrides"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 指定解析器</span>
    <span class="token string-property property">"parser"</span><span class="token operator">:</span> <span class="token string">"@typescript-eslint/parser"</span><span class="token punctuation">,</span>
    <span class="token comment">// 解析器选项</span>
    <span class="token string-property property">"parserOptions"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">"ecmaVersion"</span><span class="token operator">:</span> <span class="token string">"latest"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"sourceType"</span><span class="token operator">:</span> <span class="token string">"module"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 插件  检测vue和ts</span>
    <span class="token string-property property">"plugins"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">"vue"</span><span class="token punctuation">,</span>
        <span class="token string">"@typescript-eslint"</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 规则配置</span>
    <span class="token string-property property">"rules"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">"no-var"</span><span class="token operator">:</span> <span class="token string">"error"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"no-multiple-empty-lines"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'warn'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">max</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token string-property property">"no-console"</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">'production'</span> <span class="token operator">?</span> <span class="token string">'error'</span> <span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span>
        <span class="token string-property property">"no-debugger"</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">'production'</span> <span class="token operator">?</span> <span class="token string">'error'</span> <span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span>
        <span class="token string-property property">"no-unexpected-multiline"</span><span class="token operator">:</span> <span class="token string">'error'</span><span class="token punctuation">,</span>
        <span class="token string-property property">"no-useless-escape"</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span>
        <span class="token string-property property">"@typescript-eslint/no-unused-vars"</span><span class="token operator">:</span> <span class="token string">'error'</span><span class="token punctuation">,</span>
        <span class="token string-property property">"@typescript-eslint/prefer-ts-expect-error"</span><span class="token operator">:</span> <span class="token string">'error'</span><span class="token punctuation">,</span>
        <span class="token comment">// "@typescript-eslint/no-explicit-any":'off',</span>
        <span class="token string-property property">"@typescript-eslint/no-non-null-assertion"</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span>
        <span class="token string-property property">"@typescript-eslint/no-namespace"</span><span class="token operator">:</span> <span class="token string">"off"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"@typescript-eslint/semi"</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span>

        <span class="token string-property property">"vue/muti-word-component-names"</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span><span class="token comment">// 组件名 - 连接</span>
        <span class="token string-property property">'vue/script-setup-uses-vars'</span><span class="token operator">:</span> <span class="token string">'error'</span><span class="token punctuation">,</span>
        <span class="token string-property property">'vue/no-mutating-props'</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span><span class="token comment">// 不允许组件prop的改变</span>
        <span class="token string-property property">'vue/attribute-hyphenation'</span><span class="token operator">:</span> <span class="token string">'off'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置eslint的忽略文件</p>
<div class="language-txt line-numbers-mode" data-ext="txt"><pre v-pre class="language-txt"><code>dist 
node_modules
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>脚本配置</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code>  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"lint"</span><span class="token operator">:</span> <span class="token string">"eslint src"</span><span class="token punctuation">,</span>
    <span class="token property">"fix"</span><span class="token operator">:</span><span class="token string">"eslint src --fix"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="prettier" tabindex="-1"><a class="header-anchor" href="#prettier" aria-hidden="true">#</a> prettier</h2>
<p>格式化代码</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> eslint-plugin-prettier prettier eslint-config-prettier
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>添加.prettierrc.json配置文件</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"singleQuote"</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">// 字符串单引号</span>
    <span class="token property">"semi"</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span><span class="token comment">// 不需要分号</span>
    <span class="token property">"bracketSpacing"</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">"htmlWhitespacesSensitivity"</span><span class="token operator">:</span><span class="token string">"ignore"</span><span class="token punctuation">,</span>
    <span class="token property">"endOfLine"</span><span class="token operator">:</span><span class="token string">"auto"</span><span class="token punctuation">,</span>
    <span class="token property">"trailingComma"</span><span class="token operator">:</span><span class="token string">"all"</span><span class="token punctuation">,</span>
    <span class="token property">"tabWidth"</span><span class="token operator">:</span><span class="token number">2</span> <span class="token comment">// 缩进</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置prettier忽略文件</p>
<div class="language-txt line-numbers-mode" data-ext="txt"><pre v-pre class="language-txt"><code>/dist/*
/html/*
.local
/node_modules/** 
**/*.svg
**/*.sh
/public/*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="stylelint" tabindex="-1"><a class="header-anchor" href="#stylelint" aria-hidden="true">#</a> stylelint</h2>
<p>css格式规范和校验</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> sass-loader sass stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">'stylelint-config-standard'</span><span class="token punctuation">,</span>
        <span class="token string">'stylelint-config-html/vue'</span><span class="token punctuation">,</span><span class="token comment">// template样式格式化</span>
        <span class="token string">'stylelint-config-standard-scss'</span><span class="token punctuation">,</span><span class="token comment">//scss插件</span>
        <span class="token string">'stylelint-config-recommend-vue/scss'</span><span class="token punctuation">,</span><span class="token comment">// vue中scss格式化</span>
        <span class="token string">'stylelint-config-recess-order'</span><span class="token punctuation">,</span>
        <span class="token string">'stylelint-config-prettier'</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">overrides</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">files</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'**/*.(scss|css|vue|html)'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token literal-property property">customSyntax</span><span class="token operator">:</span> <span class="token string">'postcss-scss'</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">files</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'**/*.(html|vue)'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token literal-property property">customSyntax</span><span class="token operator">:</span> <span class="token string">'postcss-html'</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">ignoreFiles</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">'**/*.js'</span><span class="token punctuation">,</span>
        <span class="token string">'**/*.jsx'</span><span class="token punctuation">,</span>
        <span class="token string">'**/*.ts'</span><span class="token punctuation">,</span>
        <span class="token string">'**/*.tsx'</span><span class="token punctuation">,</span>
        <span class="token string">'**/*.json'</span><span class="token punctuation">,</span>
        <span class="token string">'**/*.yaml'</span><span class="token punctuation">,</span>
        <span class="token string">'**/*.md'</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">'value-keyword-case'</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token string-property property">'no-descending-specificity'</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token string-property property">'function-url-quotes'</span><span class="token operator">:</span> <span class="token string">'always'</span><span class="token punctuation">,</span>
        <span class="token string-property property">'no-empty-source'</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token string-property property">'selector-class-pattern'</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token string-property property">'property-no-unknow'</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token string-property property">'block-opening-brace-sapce-before'</span><span class="token operator">:</span> <span class="token string">'always'</span><span class="token punctuation">,</span>
        <span class="token string-property property">'value-no-vendor-prefix'</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token string-property property">'selector-pseudo-class-no-unknow'</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">ignorePseudoClasses</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'global'</span><span class="token punctuation">,</span> <span class="token string">'v-deep'</span><span class="token punctuation">,</span> <span class="token string">'deeps'</span><span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>脚本配置</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code>  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"format"</span><span class="token operator">:</span><span class="token string">"prettier --write \"./**/*/{html,vue,ts,js.json,md}\""</span><span class="token punctuation">,</span>
    <span class="token property">"lint:eslint"</span><span class="token operator">:</span><span class="token string">"eslint src/**/*.{ts,vue} --cache --fix"</span><span class="token punctuation">,</span>
    <span class="token property">"lint:style"</span><span class="token operator">:</span><span class="token string">"stylelint src/**/*.{css,scss,vue} --cache --fix"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="husky配置" tabindex="-1"><a class="header-anchor" href="#husky配置" aria-hidden="true">#</a> husky配置</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> husky

npx husky-init   
<span class="token comment"># Activate hooks</span>
npx husky <span class="token function">install</span>
<span class="token comment"># 添加钩子</span>
npx husky <span class="token function">add</span> .husky/commit-msg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后可以在生成的文件中去配置运行命令</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token hashbang comment">#!/usr/bin/env sh</span>
<span class="token punctuation">.</span> <span class="token string">"$(dirname -- "</span>$0<span class="token string">")/_/husky.sh"</span>

pnpm run format
pnpm run commitlint
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="commitlint" tabindex="-1"><a class="header-anchor" href="#commitlint" aria-hidden="true">#</a> commitlint</h2>
<p>git commit 规范</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">install</span>  <span class="token parameter variable">-D</span>  @commitlint/config-conventional @commitlint/cli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置</p>
<div class="language-commitlint.config.cjs line-numbers-mode" data-ext="commitlint.config.cjs"><pre v-pre class="language-commitlint.config.cjs"><code>module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'docs',
                'style',
                'refactor',
                'perf',
                'test',
                'chore',
                'revert',
                'build'
            ]
        ],
        'type-case': [0],
        'type-empty': [0],
        'scope-empty': [0],
        'scope-case': [0],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never'],
        'header-max-length': [0, 'always', 72],

    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code>  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"commitlint"</span><span class="token operator">:</span><span class="token string">"commitlint --config commitlint.config.cjs -e -V"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="统一包管理工具" tabindex="-1"><a class="header-anchor" href="#统一包管理工具" aria-hidden="true">#</a> 统一包管理工具</h2>
<p>写一个判断脚本</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">pnpm</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span>npm_execpath <span class="token operator">||</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">'you must use pnpm as the package manager'</span><span class="token punctuation">)</span>
    process<span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在package.json中配置install钩子执行该脚本</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token property">"sciprt"</span><span class="token operator">:</span><span class="token punctuation">{</span>
     <span class="token property">"preinstall"</span><span class="token operator">:</span> <span class="token string">"node preinstall.js"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="生产环境优化" tabindex="-1"><a class="header-anchor" href="#生产环境优化" aria-hidden="true">#</a> 生产环境优化</h2>
<h3 id="代码分割和代码压缩" tabindex="-1"><a class="header-anchor" href="#代码分割和代码压缩" aria-hidden="true">#</a> 代码分割和代码压缩</h3>
<p><a href="https://github.com/nonzzz/vite-plugin-compression" target="_blank" rel="noopener noreferrer">代码压缩<ExternalLinkIcon/></a></p>
<p><a href="https://github.com/sanyuan0704/vite-plugin-chunk-split" target="_blank" rel="noopener noreferrer">代码分割<ExternalLinkIcon/></a></p>
<p>vite项目</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">install</span><span class="token string">'vite-plugin-compression2'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vite'</span>
<span class="token keyword">import</span> vue <span class="token keyword">from</span> <span class="token string">'@vitejs/plugin-vue'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> chunkSplitPlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vite-plugin-chunk-split'</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> compression <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vite-plugin-compression2'</span>
<span class="token comment">// https://vitejs.dev/config/</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>

  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function">compression</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">exclude</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.html$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function">chunkSplitPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">strategy</span><span class="token operator">:</span> <span class="token string">'single-vendor'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">customSplitting</span><span class="token operator">:</span> <span class="token punctuation">{</span>

      <span class="token string-property property">'vue-vendor'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'vue'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token string-property property">'vue-utils'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'pinia'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token comment">// Any file that includes `utils` in src dir will be bundled in the `utils` chunk</span>
      <span class="token string-property property">'utils'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">src\/utils</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><CommentService/></div></template>


