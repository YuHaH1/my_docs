<template><div><h1 id="babel" tabindex="-1"><a class="header-anchor" href="#babel" aria-hidden="true">#</a> babel</h1>
<p><a href="https://babel.dev/docs/" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a></p>
<p>**babel是什么？**babel是转移器（高级代码编译成高级代码），转译 esnext、typescript、flow 等到目标环境支持的 js</p>
<p><strong>使用场景：</strong></p>
<ul>
<li>代码转换，例如小程序转译工具 taro，就是基于 babel 的 api 来实现的。</li>
<li>例如，函数插桩，在代码中插入一些其他代码（埋点，自动国际化）</li>
</ul>
<h2 id="babel的编译流程" tabindex="-1"><a class="header-anchor" href="#babel的编译流程" aria-hidden="true">#</a> babel的编译流程</h2>
<ol>
<li>parse：遍历源码转成AST</li>
<li>transform：遍历AST，调用各种transform对AST增删改</li>
<li>generate：将AST打印成目标代码并生成sourcemap</li>
</ol>
<h2 id="ast结点" tabindex="-1"><a class="header-anchor" href="#ast结点" aria-hidden="true">#</a> AST结点</h2>
<p>babel的AST结点很多例如：</p>
<ul>
<li>Literal：字面量的意思，例如<code v-pre>const a = false</code>这个false就是一个布尔字面量。字面量分很多类，例如模板字面量（模板字符串），数字字面量，字符串字面量等等</li>
<li>identifier：标识符，例如变量名属性名和参数名等</li>
<li>statement：语句例如循环，条件语句都是</li>
<li>Declaration：执行逻辑在声明遍历，函数，class，import，export。</li>
<li>experssion：表达式，例如<code v-pre>1+2</code></li>
<li>class: 就是专门为类服务的AST结点。</li>
<li>Modules，esm的模块。包括import export</li>
</ul>
<h2 id="babelapi" tabindex="-1"><a class="header-anchor" href="#babelapi" aria-hidden="true">#</a> babelAPI</h2>
<p>babel 的编译流程分为三步：parse、transform、generate，每一步都暴露了一些 api 出来。</p>
<ul>
<li>parse 阶段有<code v-pre>@babel/parser</code>，功能是把源码转成 AST</li>
<li>transform 阶段有 <code v-pre>@babel/traverse</code>，可以遍历 AST，并调用 visitor 函数修改 AST，修改 AST 自然涉及到 AST 的判断、创建、修改等，这时候就需要 <code v-pre>@babel/types</code> 了，当需要批量创建 AST 的时候可以使用 <code v-pre>@babel/template</code> 来简化 AST 创建逻辑。</li>
<li>generate 阶段会把 AST 打印为目标代码字符串，同时生成 sourcemap，需要 <code v-pre>@babel/generator</code> 包</li>
<li>中途遇到错误想打印代码位置的时候，使用 <code v-pre>@babel/code-frame</code> 包</li>
<li>babel 的整体功能通过 <code v-pre>@babel/core</code> 提供，基于上面的包完成 babel 整体的编译流程，并应用 plugin 和 preset。</li>
</ul>
<h3 id="babel-parse" tabindex="-1"><a class="header-anchor" href="#babel-parse" aria-hidden="true">#</a> @babel/parse</h3>
<p>主要基于acorn和acorn-jsx，扩展了很多语法，可以支持 es next（现在支持到 es2020）、jsx、flow、typescript 等语法的解析。</p>
<p>它提供了有两个 api：parse 和 parseExpression。两者都是把源码转成 AST，不过 parse 返回的 AST 根节点是 File（整个 AST），parseExpression 返回的 AST 根节点是是 Expression（表达式的 AST），粒度不同。</p>
<ul>
<li>
<p><code v-pre>babelParser.parse(code,[options])</code></p>
</li>
<li>
<p><code v-pre>babelParser.parseExpression(code,[options])</code></p>
</li>
</ul>
<p>options参数</p>
<ul>
<li><strong>allowImportExportEverywhere</strong>：允许import和export不出现在顶层</li>
<li><strong>plugins</strong>数组类型，接收希望启用的插件</li>
</ul>
<CommentService/></div></template>


