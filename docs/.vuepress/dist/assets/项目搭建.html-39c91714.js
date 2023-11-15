import{_ as i,M as p,p as l,q as c,R as n,t as s,N as a,a1 as t}from"./framework-f7ec573f.js";const r={},u=t(`<h1 id="项目初始化" tabindex="-1"><a class="header-anchor" href="#项目初始化" aria-hidden="true">#</a> 项目初始化</h1><p>常用工程化工具</p><ul><li>eslint</li><li>prettier</li><li>husky</li><li>lint-staged</li><li>commitlint</li><li>commitizen</li></ul><h2 id="前端项目基建" tabindex="-1"><a class="header-anchor" href="#前端项目基建" aria-hidden="true">#</a> 前端项目基建</h2><h3 id="安装项目依赖" tabindex="-1"><a class="header-anchor" href="#安装项目依赖" aria-hidden="true">#</a> 安装项目依赖</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> create vite <span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token parameter variable">--template</span> react-swc-ts
<span class="token function">pnpm</span> <span class="token function">install</span> 
<span class="token comment"># 安装eslint </span>
<span class="token comment"># 这个脚手架帮我们安装过了 pnpm add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-hooks eslint-plugin-react-refres</span>
<span class="token comment"># 安装prettier onchange自动检测代码并格式化</span>
<span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> prettier onchange 
<span class="token comment"># 对改变的文件做eslint</span>
<span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> lint-staged
<span class="token comment"># eslint-config-prettier关闭可能干扰prettier的eslint规则 eslint-plugin-prettier将prettier规则转为eslint规则</span>
<span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> eslint-config-prettier eslint-plugin-prettier

<span class="token comment"># node类型库，vite.config.ts中需要用path模块</span>
<span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> @types/node 
<span class="token comment"># 状态管理库</span>
<span class="token function">pnpm</span> <span class="token function">install</span> zustand
<span class="token comment"># 自动导包</span>
<span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> unplugin-auto-import
<span class="token comment"># 请求</span>
<span class="token function">pnpm</span> <span class="token function">add</span> axios
<span class="token comment"># 路由</span>
<span class="token function">pnpm</span> <span class="token function">install</span> react-router-dom 
<span class="token comment"># git提交规范</span>
<span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> husky @commitlint/cli @commitlint/config-conventional
<span class="token comment"># 统一包管理器的使用</span>
<span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span>  only-allow

<span class="token comment"># UI组件</span>
<span class="token function">pnpm</span> <span class="token function">add</span> antd <span class="token parameter variable">--save</span>
<span class="token comment"># 清除默认样式</span>
<span class="token function">pnpm</span> <span class="token function">add</span> @unocss/reset
<span class="token comment"># unocss集成</span>
<span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> unocss  @unocss/preset-attributify  @unocss/eslint-config @unocss/preset-uno
<span class="token comment"># icon图标</span>
<span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> @iconify/json @unocss/preset-icons
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="清除默认样式" tabindex="-1"><a class="header-anchor" href="#清除默认样式" aria-hidden="true">#</a> 清除默认样式</h3><p>main.tsx</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">import</span> <span class="token string">&#39;normalize.css/normalize.css&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="eslint和prettier配置" tabindex="-1"><a class="header-anchor" href="#eslint和prettier配置" aria-hidden="true">#</a> eslint和prettier配置</h3><p><code>.eslintrc.cjs</code>配置（pnpm脚手架帮我们创建好了）</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 该配置项主要用于指示此.eslintrc文件是Eslint在项目内使用的根级别文件，并且 ESLint 不应在该目录之外搜索配置文件</span>
  <span class="token literal-property property">root</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">browser</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">es2020</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// eslint:recommended ：该配置集是 ESLint 内置的“推荐”，它打开一组小的、合理的规则，用于检查众所周知的最佳实践</span>
  <span class="token comment">// @typescript-eslint/recommended：该配置集是typescript-eslint的推荐，它与eslint:recommended相似，但它启用了特定于ts的规则</span>
  <span class="token comment">// @typescript-eslint/eslint-recommended ：该配置集禁用 eslint:recommended 配置集中已经由 typeScript 处理的规则，防止eslint和typescript之间的冲突。</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&#39;eslint:recommended&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;plugin:@typescript-eslint/recommended&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;plugin:react-hooks/recommended&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;prettier&#39;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">ignorePatterns</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;dist&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.eslintrc.cjs&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// 默认情况下，Eslint使用其内置的 Espree 解析器，该解析器与标准 JavaScript 运行时和版本兼容，</span>
  <span class="token comment">//而我们需要将ts代码解析为eslint兼容的AST，所以此处我们使用 @typescript-eslint / parser。</span>
  <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token string">&#39;@typescript-eslint/parser&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&#39;react-refresh&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;prettier&#39;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;prettier/prettier&quot;</span><span class="token operator">:</span> <span class="token string">&quot;error&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 打开prettier插件提供的规则，该插件从 ESLint 内运行 Prettier</span>
    <span class="token comment">// 关闭这两个 ESLint 核心规则，这两个规则和prettier插件一起使用会出现问题，具体可参阅</span>
    <span class="token comment">// https://github.com/prettier/eslint-plugin-prettier/blob/master/README.md#arrow-body-style-and-prefer-arrow-callback-issue</span>
    <span class="token string-property property">&quot;arrow-body-style&quot;</span><span class="token operator">:</span> <span class="token string">&quot;off&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;prefer-arrow-callback&quot;</span><span class="token operator">:</span> <span class="token string">&quot;off&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;@typescript-eslint/no-explicit-any&quot;</span><span class="token operator">:</span> <span class="token string">&quot;off&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;react-refresh/only-export-components&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&#39;warn&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">allowConstantExport</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),d=n("code",null,".prettierrc.cjs",-1),k={href:"https://prettier.io/docs/en/option",target:"_blank",rel:"noopener noreferrer"},v=t(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 一行最多 150 字符</span>
  <span class="token literal-property property">printWidth</span><span class="token operator">:</span> <span class="token number">150</span><span class="token punctuation">,</span>
  <span class="token comment">// 使用 4 个空格缩进</span>
  <span class="token literal-property property">tabWidth</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
  <span class="token comment">// 不使用缩进符，而使用空格</span>
  <span class="token literal-property property">useTabs</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// 行尾需要有分号</span>
  <span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token comment">// 使用单引号</span>
  <span class="token literal-property property">singleQuote</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token comment">// 对象的 key 仅在必要时用引号</span>
  <span class="token literal-property property">quoteProps</span><span class="token operator">:</span> <span class="token string">&#39;as-needed&#39;</span><span class="token punctuation">,</span>
  <span class="token comment">// jsx 不使用单引号，而使用双引号</span>
  <span class="token literal-property property">jsxSingleQuote</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// 末尾是否需要逗号</span>
  <span class="token literal-property property">trailingComma</span><span class="token operator">:</span> <span class="token string">&#39;es5&#39;</span><span class="token punctuation">,</span>
  <span class="token comment">// 大括号内的首尾需要空格</span>
  <span class="token literal-property property">bracketSpacing</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token comment">// jsx 标签的反尖括号需要换行</span>
  <span class="token literal-property property">jsxBracketSameLine</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// 箭头函数，只有一个参数的时候，也需要括号</span>
  <span class="token literal-property property">arrowParens</span><span class="token operator">:</span> <span class="token string">&#39;always&#39;</span><span class="token punctuation">,</span>
  <span class="token comment">// 每个文件格式化的范围是文件的全部内容</span>
  <span class="token literal-property property">rangeStart</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token literal-property property">rangeEnd</span><span class="token operator">:</span> <span class="token number">Infinity</span><span class="token punctuation">,</span>
  <span class="token comment">// 不需要写文件开头的 @prettier</span>
  <span class="token literal-property property">requirePragma</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// 不需要自动在文件开头插入 @prettier</span>
  <span class="token literal-property property">insertPragma</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// 使用默认的折行标准</span>
  <span class="token literal-property property">proseWrap</span><span class="token operator">:</span> <span class="token string">&#39;preserve&#39;</span><span class="token punctuation">,</span>
  <span class="token comment">// 换行符使用 lf</span>
  <span class="token literal-property property">endOfLine</span><span class="token operator">:</span> <span class="token string">&#39;lf&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>packge.json</code></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
     <span class="token property">&quot;lint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0 --fix&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;format&quot;</span><span class="token operator">:</span> <span class="token string">&quot;prettier --config .prettierrc.cjs --write ./src&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;format-watch&quot;</span><span class="token operator">:</span> <span class="token string">&quot;onchange -d 1000 &#39;**/*&#39; -- prettier --config .prettierrc.cjs --write {{changed}}&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="husky-git提交规范" tabindex="-1"><a class="header-anchor" href="#husky-git提交规范" aria-hidden="true">#</a> husky-git提交规范</h3><p>一. 启用git hook</p><p>在<code>package.json</code>的script中配置脚本</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code> <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;prepare&quot;</span><span class="token operator">:</span><span class="token string">&quot;husky install&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后运行该脚本启用githook</p><p>二.创建git提交前的hooks命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>npx husky <span class="token function">add</span> .husky/pre-commit <span class="token string">&quot;pnpm lint&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>三.创建<code>.commitlintrc.json</code>文件</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;extends&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&quot;@commitlint/config-conventional&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;rules&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">&quot;scope-empty&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token string">&quot;never&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(自定义commitlint规则)</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;@commitlint/config-conventional&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">&#39;type-enum&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token number">2</span><span class="token punctuation">,</span>
            <span class="token string">&#39;always&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">[</span>
                <span class="token string">&#39;feat&#39;</span><span class="token punctuation">,</span>
                <span class="token string">&#39;fix&#39;</span><span class="token punctuation">,</span>
                <span class="token string">&#39;docs&#39;</span><span class="token punctuation">,</span>
                <span class="token string">&#39;style&#39;</span><span class="token punctuation">,</span>
                <span class="token string">&#39;refactor&#39;</span><span class="token punctuation">,</span>
                <span class="token string">&#39;perf&#39;</span><span class="token punctuation">,</span>
                <span class="token string">&#39;test&#39;</span><span class="token punctuation">,</span>
                <span class="token string">&#39;chore&#39;</span><span class="token punctuation">,</span>
                <span class="token string">&#39;revert&#39;</span><span class="token punctuation">,</span>
                <span class="token string">&#39;build&#39;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;type-case&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;type-empty&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;scope-empty&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;scope-case&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;subject-full-stop&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&#39;never&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;subject-case&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&#39;never&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;header-max-length&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&#39;always&#39;</span><span class="token punctuation">,</span> <span class="token number">72</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>四.创建husky验证钩子</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> npx husky <span class="token function">add</span> .husky/commit-msg <span class="token string">&#39;npx --no -- commitlint --edit &quot;$1&quot;&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="自动导包的配置" tabindex="-1"><a class="header-anchor" href="#自动导包的配置" aria-hidden="true">#</a> 自动导包的配置</h3><p><code>vite.config.ts</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// vite.config.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span>
<span class="token keyword">import</span> AutoImport <span class="token keyword">from</span> <span class="token string">&#39;unplugin-auto-import/vite&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">AutoImport</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      include<span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.[tj]sx?$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token comment">// .ts, .tsx, .js, .jsx</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      dirs<span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&#39;./src/store/**&#39;</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      imports<span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&#39;react&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token string-property property">&#39;axios&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token comment">// default imports</span>
            <span class="token punctuation">[</span><span class="token string">&#39;default&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;axios&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// import { default as axios } from &#39;axios&#39;,</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      dts<span class="token operator">:</span> <span class="token string">&#39;./auto-imports.d.ts&#39;</span><span class="token punctuation">,</span>
      eslintrc<span class="token operator">:</span> <span class="token punctuation">{</span>
        enabled<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// Default \`false\`</span>
        filepath<span class="token operator">:</span> <span class="token string">&#39;./.eslintrc-auto-import.json&#39;</span><span class="token punctuation">,</span> <span class="token comment">// Default \`./.eslintrc-auto-import.json\`</span>
        globalsPropValue<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// Default \`true\`, (true | false | &#39;readonly&#39; | &#39;readable&#39; | &#39;writable&#39; | &#39;writeable&#39;)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>tsconfig.json</code></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;include&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;src&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;auto-imports.d.ts&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vscode配置" tabindex="-1"><a class="header-anchor" href="#vscode配置" aria-hidden="true">#</a> .vscode配置</h3><ol><li><p>创建<code>.vscode</code>文件夹</p></li><li><p>创建<code>extensions.json</code>文件，该文件为推荐插件安装</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;recommendations&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;esbenp.prettier-vscode&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;dbaeumer.vscode-eslint&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>创建<code>settings.json</code>文件，该文件为推荐该项目的setting配置</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;typescript.tsdk&quot;</span><span class="token operator">:</span> <span class="token string">&quot;node_modules/typescript/lib&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;editor.formatOnSave&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">&quot;editor.defaultFormatter&quot;</span><span class="token operator">:</span> <span class="token string">&quot;esbenp.prettier-vscode&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;editor.codeActionsOnSave&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;source.organizeImports&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">&quot;source.fixAll.eslint&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;editor.formatOnSaveMode&quot;</span><span class="token operator">:</span> <span class="token string">&quot;file&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;editor.formatOnType&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">&quot;editor.formatOnPaste&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token property">&quot;[typescript]&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;editor.formatOnSave&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">&quot;editor.defaultFormatter&quot;</span><span class="token operator">:</span> <span class="token string">&quot;esbenp.prettier-vscode&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;editor.codeActionsOnSave&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;source.organizeImports&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token property">&quot;source.fixAll.eslint&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;editor.formatOnSaveMode&quot;</span><span class="token operator">:</span> <span class="token string">&quot;file&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;editor.formatOnType&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">&quot;editor.formatOnPaste&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="配置路径别名" tabindex="-1"><a class="header-anchor" href="#配置路径别名" aria-hidden="true">#</a> 配置路径别名</h3><p><code> vite.config.ts</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// vite.config.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> resolve <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;path&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  resolve<span class="token operator">:</span> <span class="token punctuation">{</span>
    alias<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&#39;@&#39;</span><span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;./src&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>tsconfig.json</code></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//tsconfig.json</span>
<span class="token punctuation">{</span>
    <span class="token property">&quot;compilerOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;baseUrl&quot;</span><span class="token operator">:</span> <span class="token string">&quot;.&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;paths&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;@/*&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;src/*&quot;</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="统一包管理工具" tabindex="-1"><a class="header-anchor" href="#统一包管理工具" aria-hidden="true">#</a> 统一包管理工具</h3><p>写一个判断脚本</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">pnpm</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span>npm_execpath <span class="token operator">||</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">&#39;you must use pnpm as the package manager&#39;</span><span class="token punctuation">)</span>
    process<span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在package.json中配置install钩子执行该脚本</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;sciprt&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token property">&quot;preinstall&quot;</span><span class="token operator">:</span> <span class="token string">&quot;node preinstall.js&quot;</span>
    <span class="token comment">//或者下面这样</span>
    <span class="token property">&quot;preinstall&quot;</span><span class="token operator">:</span> <span class="token string">&quot;npx only-allow pnpm&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="unocss配置" tabindex="-1"><a class="header-anchor" href="#unocss配置" aria-hidden="true">#</a> Unocss配置</h3><p>uno.config.ts</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// uno.config.ts</span>
<span class="token keyword">import</span> presetAttributify <span class="token keyword">from</span> <span class="token string">&#39;@unocss/preset-attributify&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> presetUno <span class="token keyword">from</span> <span class="token string">&#39;@unocss/preset-uno&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;unocss&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    presets<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">presetAttributify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">presetUno</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>eslint.rc</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;extends&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;@unocss&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;commitlint&quot;</span><span class="token operator">:</span><span class="token string">&quot;commitlint --config commitlint.config.cjs -e -V&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="生产环境优化" tabindex="-1"><a class="header-anchor" href="#生产环境优化" aria-hidden="true">#</a> 生产环境优化</h3><h4 id="代码分割和代码压缩" tabindex="-1"><a class="header-anchor" href="#代码分割和代码压缩" aria-hidden="true">#</a> 代码分割和代码压缩</h4>`,41),m={href:"https://github.com/nonzzz/vite-plugin-compression",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/sanyuan0704/vite-plugin-chunk-split",target:"_blank",rel:"noopener noreferrer"},g=t(`<p>vite项目</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">install</span><span class="token string">&#39;vite-plugin-compression2&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span>
<span class="token keyword">import</span> vue <span class="token keyword">from</span> <span class="token string">&#39;@vitejs/plugin-vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> chunkSplitPlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite-plugin-chunk-split&#39;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> compression <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite-plugin-compression2&#39;</span>
<span class="token comment">// https://vitejs.dev/config/</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>

  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function">compression</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">exclude</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.html$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function">chunkSplitPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">strategy</span><span class="token operator">:</span> <span class="token string">&#39;single-vendor&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">customSplitting</span><span class="token operator">:</span> <span class="token punctuation">{</span>

      <span class="token string-property property">&#39;vue-vendor&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;vue&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token string-property property">&#39;vue-utils&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;pinia&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token comment">// Any file that includes \`utils\` in src dir will be bundled in the \`utils\` chunk</span>
      <span class="token string-property property">&#39;utils&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">src\\/utils</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nest项目基建" tabindex="-1"><a class="header-anchor" href="#nest项目基建" aria-hidden="true">#</a> Nest项目基建</h2><h3 id="_1-安装项目依赖" tabindex="-1"><a class="header-anchor" href="#_1-安装项目依赖" aria-hidden="true">#</a> 1.安装项目依赖</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nest new <span class="token punctuation">[</span>project<span class="token punctuation">]</span> <span class="token parameter variable">-p</span> <span class="token function">pnpm</span>
<span class="token comment"># 环境变量配置</span>
<span class="token function">pnpm</span> <span class="token function">install</span> js-yaml @nestjs/config  cross-env
<span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> @types/js-yaml
<span class="token comment"># 安装orm，数据库</span>
<span class="token function">pnpm</span> <span class="token function">install</span> <span class="token parameter variable">--save</span> @nestjs/typeorm typeorm mysql2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h2><h3 id="解决报delete-␍eslint-prettier-prettier-问题" tabindex="-1"><a class="header-anchor" href="#解决报delete-␍eslint-prettier-prettier-问题" aria-hidden="true">#</a> 解决报Delete <code>␍</code>eslint(prettier/prettier)问题</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> <span class="token function">git</span> config <span class="token parameter variable">--global</span> core.autocrlf <span class="token boolean">false</span>
 <span class="token function">git</span> config <span class="token parameter variable">--global</span> core.autocrlf input
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,9);function y(f,h){const e=p("ExternalLinkIcon"),o=p("CommentService");return l(),c("div",null,[u,n("p",null,[d,s(":"),n("a",k,[s("参考文档"),a(e)])]),v,n("p",null,[n("a",m,[s("代码压缩"),a(e)])]),n("p",null,[n("a",b,[s("代码分割"),a(e)])]),g,a(o)])}const x=i(r,[["render",y],["__file","项目搭建.html.vue"]]);export{x as default};
